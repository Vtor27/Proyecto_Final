package com.apprecetas.dto;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Representa los detalles básicos de una receta, incluyendo ingredientes.
 */
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class DetalleRecetaDTO {

	private int id;

	@JsonProperty("title")
	private String titulo;

	/**
	 * Lista de ingredientes completos de la receta.
	 */
	@JsonProperty("extendedIngredients")
	private List<IngredienteSimpleDTO> ingredientes;

	/**
	 * Lista de ingredientes que faltan según lo que tiene el usuario.
	 */
	@JsonProperty("missedIngredients")
	private List<IngredienteSimpleDTO> ingredFaltantes;
}
