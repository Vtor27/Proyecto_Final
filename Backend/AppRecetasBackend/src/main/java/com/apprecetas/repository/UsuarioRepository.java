package com.apprecetas.repository;

import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.apprecetas.dto.UsuarioDTO;

/**
 * Repositorio para gestionar el acceso a los documentos de la colección "Users" en MongoDB.
 * 
 * Extiende {@link MongoRepository} para proporcionar operaciones CRUD sobre entidades {@link UsuarioDTO}
 */
public interface UsuarioRepository extends MongoRepository<UsuarioDTO, String> {
	
	 /**
     * Busca un usuario por su dirección de correo electrónico.
     * 
     * @param email Correo electrónico del usuario.
     * @return Un {@link Optional} que puede contener el {@link UsuarioDTO} correspondiente.
     */
	Optional<UsuarioDTO> findByEmail(String email);

	/**
     * Busca un usuario por su nombre de usuario.
     * 
     * @param nombreUsuario Nombre de usuario registrado.
     * @return Un {@link Optional} con el usuario encontrado, si existe.
     */
	Optional<UsuarioDTO> findByNombreUsuario(String nombreUsuario);

	/**
     * Verifica si ya existe un usuario registrado con el correo proporcionado.
     * 
     * @param email Correo electrónico a verificar.
     * @return {@code true} si existe un usuario con ese email, {@code false} en caso contrario.
     */
	boolean existsByEmail(String email);

	/**
     * Verifica si ya existe un usuario registrado con el nombre de usuario proporcionado.
     * 
     * @param nombreUsuario Nombre de usuario a verificar.
     * @return {@code true} si el nombre de usuario ya está en uso, {@code false} en caso contrario.
     */
	boolean existsByNombreUsuario(String nombreUsuario);
}
