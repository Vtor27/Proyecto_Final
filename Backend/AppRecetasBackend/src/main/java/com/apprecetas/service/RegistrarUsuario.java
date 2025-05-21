package com.apprecetas.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.stereotype.Service;

import com.apprecetas.dto.LoginResponse;
import com.apprecetas.dto.UsuarioDTO;
import com.apprecetas.repository.UsuarioRepository;
import com.apprecetas.security.JwtUtil;

/**
 * Servicio encargado de gestionar el registro y autenticación de usuarios.
 * 
 * Este servicio valida si el usuario ya existe, hashea la contraseña usando
 * BCrypt y genera un token JWT al iniciar sesión correctamente.
 */
@Service
public class RegistrarUsuario {

	@Autowired
	private UsuarioRepository usuarioRepository;

	@Autowired
	private JwtUtil jwtUtil;

	/**
	 * Registra un nuevo usuario en la base de datos, validando que el email y el
	 * nombre de usuario no existan. La contraseña se almacena hasheada usando
	 * BCrypt.
	 *
	 * @param nuevoUsuario Objeto {@link UsuarioDTO} con los datos del nuevo
	 *                     registro.
	 * @return Mensaje de éxito si el usuario fue creado correctamente.
	 * @throws Exception Si el email o el nombre de usuario ya existen.
	 */
	public String registrarUsuario(UsuarioDTO nuevoUsuario) throws Exception {
		if (usuarioRepository.existsByEmail(nuevoUsuario.getEmail())) {
			throw new Exception("El email que intentas utilizar ya existe.");
		}

		if (usuarioRepository.existsByNombreUsuario(nuevoUsuario.getNombreUsuario())) {
			throw new Exception("El nombre de usuario ya existe.");
		}

		String passHashed = hashPassword(nuevoUsuario.getContraseña());
		nuevoUsuario.setContraseña(passHashed);

		usuarioRepository.save(nuevoUsuario);
		return "Usuario registrado con éxito.";
	}

	/**
	 * Realiza el proceso de login para un usuario validando su email o nombre de
	 * usuario y su contraseña. Si las credenciales son válidas, devuelve un
	 * LoginResponse con el token JWT y el nombre de usuario.
	 *
	 * @param identificador Email o nombre de usuario.
	 * @param contraseña    Contraseña sin encriptar proporcionada por el usuario.
	 * @return LoginResponse con token y nombre de usuario.
	 * @throws Exception Si el usuario no existe o la contraseña es incorrecta.
	 */
	public LoginResponse login(String identificador, String contraseña) throws Exception {
		Optional<UsuarioDTO> user = usuarioRepository.findByEmail(identificador);

		if (user.isEmpty()) {
			user = usuarioRepository.findByNombreUsuario(identificador);
		}

		if (!user.isPresent()) {
			throw new Exception("Usuario no encontrado.");
		}

		UsuarioDTO usuario = user.get();

		if (!BCrypt.checkpw(contraseña, usuario.getContraseña())) {
			throw new Exception("Contraseña incorrecta.");
		}

		String token = jwtUtil.generarToken(usuario);

		return new LoginResponse(token, usuario.getNombreUsuario());
	}

	/**
	 * Modifica la contraseña que se le pasa desde el front según en nombre de
	 * usuario qu ese le pase. Si el nombre no está en la base de datos no se podrá
	 * cambiar.
	 *
	 * @param nombreUsuario   Nombre del usuario que quiere cambiar la contraseña.
	 * @param nuevaContraseña Nueva contraseña sin encriptar proporcionada por el
	 *                        usuario.
	 * 
	 * @throws Exception Si el usuario no existe o está mal escrito.
	 */
	public void actualizarContraseña(String nombreUsuario, String nuevaContraseña) throws Exception {
		Optional<UsuarioDTO> userBuscado = usuarioRepository.findByNombreUsuario(nombreUsuario);
		if (!userBuscado.isPresent()) {
			throw new Exception("Usuario no encontrado");
		}

		UsuarioDTO usuario = userBuscado.get();

		if (nuevaContraseña != null && !nuevaContraseña.isBlank()) {
			usuario.setContraseña(hashPassword(nuevaContraseña));
			usuarioRepository.save(usuario);
		}

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
}
