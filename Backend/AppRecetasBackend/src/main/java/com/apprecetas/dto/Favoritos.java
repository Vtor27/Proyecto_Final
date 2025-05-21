package com.apprecetas.dto;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Representa un documento de receta favorita almacenado en la colección "favoritos" de MongoDB.
 * 
 * Cada instancia de esta clase contiene la referencia al usuario que ha marcado la receta como favorita
 * y los detalles completos de la receta guardada.
 * 
 * Anotaciones:
 * - @Document: Indica que esta clase corresponde a un documento en la colección "favoritos".
 */
@Document(collection="favoritos")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Favoritos {

	@Id
	private String id;
	
	private String usuarioId;
	
	/**
     * Objeto que contiene los datos completos de la receta favorita.
     */
	private RecetaExtendidaDTO receta;
}
