package com.apprecetas.repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.apprecetas.dto.Favoritos;

/**
 * Repositorio para acceder a los documentos de la colección "favoritos" en MongoDB.
 */
public interface FavoritosRepository extends MongoRepository<Favoritos, String> {

	/**
     * Obtiene la lista de recetas favoritas de un usuario específico.
     * 
     * @param usuarioId ID del usuario.
     * @return Lista de objetos {@link Favoritos} asociados al usuario.
     */
	List<Favoritos> findByUsuarioId(String usuarioId);

	/**
     * Verifica si una receta ya ha sido guardada como favorita por un usuario.
     * 
     * @param usuarioId ID del usuario.
     * @param recetaId ID de la receta.
     * @return {@code true} si el favorito existe, o {@code false} en caso contrario.
     */
	boolean existsByUsuarioIdAndReceta_Id(String usuarioId, int recetaId);

	/**
     * Elimina una receta de la lista de favoritos de un usuario.
     * 
     * @param usuarioId ID del usuario.
     * @param recetaId ID de la receta a eliminar.
     */
	void deleteByUsuarioIdAndReceta_Id(String usuarioId, int recetaId);
}
