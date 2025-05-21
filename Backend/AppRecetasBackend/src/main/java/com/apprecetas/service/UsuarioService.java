package com.apprecetas.service;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.stereotype.Service;

import com.apprecetas.dto.UsuarioDTO;
import com.apprecetas.repository.UsuarioRepository;

/**
 * Servicio encargado de gestionar operaciones relacionadas con los usuarios,
 * especialmente el manejo de alimentos favoritos.
 */
@Service
public class UsuarioService {

	@Autowired
	private UsuarioRepository usuarioRepository;

	/**
	 * Obtiene la lista de alimentos favoritos de un usuario por su nombre de
	 * usuario.
	 *
	 * @param nombreUsuario Nombre del usuario.
	 * @return Lista de alimentos favoritos. Si el usuario no existe, se devuelve
	 *         una lista vacía.
	 */
	public List<String> getAlimentosFavoritos(String nombreUsuario) {
		Optional<UsuarioDTO> usuarioOpt = usuarioRepository.findByNombreUsuario(nombreUsuario);
		if (usuarioOpt.isPresent()) {
			return usuarioOpt.get().getAlimentosFavoritos();
		}
		return Collections.emptyList();
	}

	/**
	 * Establece o actualiza la lista de alimentos favoritos para un usuario.
	 *
	 * @param nombreUsuario   Nombre del usuario.
	 * @param nuevosFavoritos Lista de alimentos a establecer como favoritos.
	 */
	public void setAlimentosFavoritos(String nombreUsuario, List<String> nuevosFavoritos) {
		Optional<UsuarioDTO> usuarioOpt = usuarioRepository.findByNombreUsuario(nombreUsuario);
		if (usuarioOpt.isPresent()) {
			UsuarioDTO usuario = usuarioOpt.get();
			usuario.setAlimentosFavoritos(nuevosFavoritos);
			usuarioRepository.save(usuario);
		}
	}

	/**
	 * Busca un usuario en la base de datos por su nombre de usuario.
	 * 
	 * @param nombreUsuario el nombre del usuario a buscar
	 * @return un {@link Optional} que contiene el {@link UsuarioDTO} si se encuentra, o vacío si no
	 */
	public Optional<UsuarioDTO> buscarPorNombreUsuario(String nombreUsuario) {
		return usuarioRepository.findByNombreUsuario(nombreUsuario);
	}

	/**
	 * Actualiza los datos del perfil de un usuario.
	 * 
	 * Este método permite modificar el email, idioma, alimentos favoritos y contraseña.
	 * Solo se actualizan los campos que estén presentes y no vacíos en el objeto {@link UsuarioDTO} recibido.
	 * La nueva contraseña, si se proporciona, se hashea antes de ser guardada.
	 * 
	 * @param nombreUsuario el nombre del usuario cuyo perfil se desea actualizar
	 * @param dto objeto con los nuevos datos del perfil
	 * @throws Exception si ocurre algún error durante el proceso de actualización
	 */
	public void actualizarPerfil(String nombreUsuario, UsuarioDTO dto) throws Exception {
		Optional<UsuarioDTO> usuario = usuarioRepository.findByNombreUsuario(nombreUsuario);

		UsuarioDTO userActualizado = usuario.get();

		if (dto.getEmail() != null && !dto.getEmail().isBlank()) {
			userActualizado.setEmail(dto.getEmail());
		}

		if (dto.getIdioma() != null && !dto.getIdioma().isBlank()) {
			userActualizado.setIdioma(dto.getIdioma());
		}

		if (dto.getAlimentosFavoritos() != null && !dto.getAlimentosFavoritos().isEmpty()) {
			userActualizado.setAlimentosFavoritos(dto.getAlimentosFavoritos());
		}

		if (dto.getNuevaContraseña() != null && !dto.getNuevaContraseña().isBlank()) {
			userActualizado.setContraseña(hashPassword(dto.getNuevaContraseña()));
		}

		usuarioRepository.save(userActualizado);
	}

	/**
	 * Aplica hashing a la contraseña utilizando el algoritmo BCrypt.
	 *
	 * @param password Contraseña sin encriptar.
	 * @return Hash seguro generado con BCrypt.
	 */
	private String hashPassword(String password) {
		return BCrypt.hashpw(password, BCrypt.gensalt());
	}

	/**
	 * Obtiene el idioma de un usuario. Si no se encuentra el usuario devuelve "en"
	 * por defecto.
	 *
	 * @param nombreUsuario Nombre del usuario del cual se desea obtener el idioma.
	 * @return El idioma preferido del usuario, o "en" si no está definido o el
	 *         usuario no existe.
	 */
	public String getIdiomaUser(String nombreUsuario) {
		Optional<UsuarioDTO> optionalUsuario = usuarioRepository.findByNombreUsuario(nombreUsuario);
		if (optionalUsuario.isPresent()) {
			UsuarioDTO usuario = optionalUsuario.get();
			String idioma = usuario.getIdioma();
			if (idioma != null) {
				return idioma;
			}
		}
		return "en";
	}

}
