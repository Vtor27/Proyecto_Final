package com.apprecetas.model;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RecetaDTO {

	private int id;

	@JsonProperty("title")
	private String titulo;

	@JsonProperty("image")
	private String imagenUrl;

	@JsonProperty("missedIngredients")
	private List<IngredienteSimpleDTO> ingredientes;
}
