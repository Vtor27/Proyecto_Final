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
public class RecetaExtendidaDTO {
	private int id;

	@JsonProperty("title")
	private String titulo;

	@JsonProperty("image")
	private String imagenUrl;

	private String summary;

	private int readyInMinutes;

	private int servings;

	private List<String> dishTypes;

	private List<String> diets;

	private double spoonacularScore;

	@JsonProperty("sourceUrl")
	private String urlFuente;

	@JsonProperty("spoonacularSourceUrl")
	private String urlSpoonacular;
}
