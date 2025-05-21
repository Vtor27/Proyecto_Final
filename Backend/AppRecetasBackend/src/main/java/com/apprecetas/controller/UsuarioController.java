package com.apprecetas.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.apprecetas.dto.UsuarioDTO;
import com.apprecetas.security.JwtUtil;
import com.apprecetas.service.UsuarioService;

/**
 * Controlador REST para gestionar operaciones relacionadas con el usuario
 * autenticado, como los alimentos favoritos que influyen en las recomendaciones
 * personalizadas.
 */
@RestController
@RequestMapping("/api/users")
public class UsuarioController {

	@Autowired
	private UsuarioService usuarioService;

	@Autowired
	private JwtUtil jwtUtil;

	/**
	 * Obtiene la lista de alimentos favoritos del usuario autenticado.
	 *
	 * @param authHeader Cabecera de autorización con el token JWT.
	 * @return Lista de alimentos favoritos del usuario.
	 */
	@GetMapping("/favoritos")
	public ResponseEntity<List<String>> getFavoritos(@RequestHeader("Authorization") String authHeader) {
		String nombreUser = jwtUtil.extraerUsuarioId(authHeader.replace("Bearer ", ""));
		return ResponseEntity.ok(usuarioService.getAlimentosFavoritos(nombreUser));
	}

	/**
	 * Guarda o actualiza la lista de alimentos favoritos del usuario autenticado.
	 *
	 * @param authHeader Cabecera de autorización con el token JWT.
	 * @param favoritos  Lista de alimentos favoritos a establecer.
	 * @return Respuesta con estado OK si se guarda correctamente.
	 */
	@PostMapping("/favoritos")
	public ResponseEntity<Void> guardarFavoritos(@RequestHeader("Authorization") String authHeader,
			@RequestBody List<String> favoritos) {
		String nombreUser = jwtUtil.extraerUsuarioId(authHeader.replace("Bearer ", ""));
		usuarioService.setAlimentosFavoritos(nombreUser, favoritos);
		return ResponseEntity.ok().build();
	}

	@GetMapping("/perfil")
	public ResponseEntity<UsuarioDTO> getPerfilUsuario(@RequestHeader("Authorization") String authHeader) {
		String nombreUser = jwtUtil.extraerUsuarioId(authHeader.replace("Bearer ", ""));

		Optional<UsuarioDTO> usuario = usuarioService.buscarPorNombreUsuario(nombreUser);

		if (usuario.isPresent()) {
			return ResponseEntity.ok(usuario.get());
		} else {

			return ResponseEntity.notFound().build();
		}
	}

	/**
	 * Actualiza el perfil de un usuario autenticado.
	 * 
	 * Este endpoint permite al usuario modificar sus datos del perfil.
	 *
	 * @param authHeader        Token JWT incluido en la cabecera Authorization.
	 * @param datosActualizados Objeto UsuarioDTO con los campos a modificar.
	 * @return Mensaje de éxito o error en caso de que el usuario no exista.
	 */
	@PutMapping("/perfil")
	public ResponseEntity<String> actualizarPerfil(@RequestHeader("Authorization") String authHeader,
			@RequestBody UsuarioDTO datosActualizados) {
		try {
			String nombreUser = jwtUtil.extraerUsuarioId(authHeader.replace("Bearer ", ""));
			Optional<UsuarioDTO> usuario = usuarioService.buscarPorNombreUsuario(nombreUser);

			if (usuario.isPresent()) {
				usuarioService.actualizarPerfil(nombreUser, datosActualizados);
				return ResponseEntity.ok("Perfil actualizado correctamente");
			} else {
				return ResponseEntity.status(404).body("Usuario no encontrado");
			}
		} catch (Exception e) {
			return ResponseEntity.status(500).body("Error al actualizar el perfil." + e.getMessage());
		}

	}

}
