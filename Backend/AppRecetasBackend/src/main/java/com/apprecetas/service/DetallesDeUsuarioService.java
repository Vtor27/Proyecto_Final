package com.apprecetas.service;

import java.util.Collections;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.*;
import org.springframework.stereotype.Service;

import com.apprecetas.dto.UsuarioDTO;
import com.apprecetas.repository.UsuarioRepository;

/**
 * Servicio para cargar los detalles del usuario desde la base de datos.
 */
@Service
public class DetallesDeUsuarioService implements UserDetailsService {

	@Autowired
	private UsuarioRepository usuarioRepository;

	/**
	 * Carga los detalles de un usuario por su nombre de usuario.
	 * 
	 * Este método es llamado por Spring Security durante el proceso de autenticación.
	 * Busca al usuario en la base de datos a través del repositorio y, si lo encuentra,
	 * construye un objeto {@link UserDetails} con sus credenciales y autoridad.
	 * 
	 * Si el usuario no existe, lanza una excepción {@link UsernameNotFoundException}.
	 * 
	 * @param nombreUsuario el nombre de usuario ingresado en el login
	 * @return un objeto {@link UserDetails} con la información del usuario
	 * @throws UsernameNotFoundException si no se encuentra el usuario en la base de datos
	 */
	@Override
	public UserDetails loadUserByUsername(String nombreUsuario) throws UsernameNotFoundException {
		UsuarioDTO user = usuarioRepository.findByNombreUsuario(nombreUsuario)
				.orElseThrow(() -> new UsernameNotFoundException("Usuario no encontrado: " + nombreUsuario));
		System.out.println("Usuario cargado desde la DB: " + nombreUsuario);

		return User.builder().username(user.getNombreUsuario()).password(user.getContraseña())
				.authorities(Collections.singletonList(new SimpleGrantedAuthority("USER"))).build();
	}
}
