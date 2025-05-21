package com.apprecetas.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.apprecetas.dto.RecetaDB;

/**
 * Repositorio para acceder a los documentos de la colección "Recetas" en MongoDB.
 *
 * Extiende {@link MongoRepository} para proporcionar operaciones CRUD sobre objetos {@link RecetaDB}.
 * Este repositorio permite guardar, buscar, actualizar y eliminar recetas almacenadas en la base de datos.
 */
public interface RecetaRepository extends MongoRepository<RecetaDB, String> {

}
