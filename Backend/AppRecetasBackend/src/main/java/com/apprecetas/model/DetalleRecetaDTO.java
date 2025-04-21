package com.apprecetas.model;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class DetalleRecetaDTO {
	
	private int id;
	
	@JsonProperty("title")
    private String titulo;

    @JsonProperty("extendedIngredients")
    private List<IngredienteSimpleDTO> ingredientes;

    @JsonProperty("missedIngredients")
    private List<IngredienteSimpleDTO> ingredFaltantes;
}
