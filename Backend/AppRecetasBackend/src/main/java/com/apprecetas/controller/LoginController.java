package com.apprecetas.controller;

import java.time.LocalDateTime;
import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.apprecetas.dto.LoginDTO;
import com.apprecetas.dto.LoginResponse;
import com.apprecetas.dto.RecuperarContraseñaDTO;
import com.apprecetas.dto.RegistroUserDTO;
import com.apprecetas.dto.UsuarioDTO;
import com.apprecetas.service.RegistrarUsuario;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/auth")
public class LoginController {

	@Autowired
	private RegistrarUsuario registrarUsuario;

	/**
	 * Registra un nuevo usuario en la base de datos.
	 *
	 * @param nuevoUsuario Datos del usuario a registrar.
	 * @return Nombre de usuario registrado o mensaje de error.
	 */
	@PostMapping("/register")
    public ResponseEntity<?> registrar(@RequestBody RegistroUserDTO dto) {
        try {
            UsuarioDTO nuevoUsuario = UsuarioDTO.builder()
                .nombreUsuario(dto.getNombreUsuario())
                .email(dto.getEmail())
                .contraseña(dto.getContraseña())
                .alimentosFavoritos(dto.getAlimentosFavoritos())
                .recetasFavoritas(new ArrayList<>())
                .productosEscaneadosFavoritos(new ArrayList<>())
                .estado("activo")
                .fechaRegistro(LocalDateTime.now())
                .idioma(dto.getIdioma())
                .build();

            String mensaje = registrarUsuario.registrarUsuario(nuevoUsuario);
            System.out.println(mensaje);
            return ResponseEntity.ok(mensaje);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

	/**
	 * Autentica a un usuario y devuelve un token JWT.
	 *
	 * @param request Datos de inicio de sesión.
	 * @return Token JWT o mensaje de error.
	 * @throws Exception Si ocurre un error durante la autenticación.
	 */
	/**
	 * Autentica a un usuario y devuelve un token JWT junto al nombre de usuario.
	 *
	 * @param request Datos de inicio de sesión.
	 * @return Objeto con token y nombre de usuario o mensaje de error.
	 */
	@PostMapping("/login")
	public ResponseEntity<?> login(@Valid @RequestBody LoginDTO request) {
	    try {
	        LoginResponse response = registrarUsuario.login(
	            request.getIdentificador(),
	            request.getContraseña()
	        );
	        return ResponseEntity.ok(response);
	    } catch (Exception e) {
	        return ResponseEntity.badRequest().body(e.getMessage());
	    }
	}
	
	/**
	 * Endpoint para restablecer la contraseña de un usuario.
	 * 
	 * Este método recibe un objeto {@link RecuperarContraseñaDTO} que contiene el nombre de usuario
	 * y la nueva contraseña, e intenta actualizarla en la base de datos. Si la operación es exitosa,
	 * devuelve un mensaje de confirmación; de lo contrario, devuelve un error con el motivo.
	 * 
	 * Método accesible sin autenticación JWT, según la configuración de seguridad.
	 * 
	 * @param dto objeto con los datos necesarios para restablecer la contraseña
	 * @return {@link ResponseEntity} con un mensaje de éxito o error
	 */
	@PutMapping("/recu-pass")
	public ResponseEntity<?> resetPassword(@RequestBody RecuperarContraseñaDTO dto) {
		 	System.out.println("ResetPassword: ");
		    System.out.println("Usuario: " + dto.getNombreUser());
		    System.out.println("Nueva contraseña: " + dto.getNuevaPassword());
		try {
	        registrarUsuario.actualizarContraseña(dto.getNombreUser(), dto.getNuevaPassword());
	        return ResponseEntity.ok("Contraseña actualizada correctamente.");
	    } catch (Exception e) {
	        return ResponseEntity.badRequest().body("Error al actualizar contraseña: " + e.getMessage());
	    }
	}

}
