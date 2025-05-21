package com.apprecetas.dto;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * DTO que representa una receta obtenida desde una API externa como Spoonacular,
 * incluyendo información básica, ingredientes y pasos de preparación.
 * 
 * Utiliza anotaciones de Jackson para mapear correctamente los campos del JSON.
 */

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RecetaDTO {

	/** Identificador único de la receta según la fuente externa. */
    private int id;

    /** Título de la receta (mapeado desde el campo "title"). */
    @JsonProperty("title")
    private String titulo;

    /** URL de la imagen de la receta (mapeado desde el campo "image"). */
    @JsonProperty("image")
    private String imagenUrl;

    /** Lista de ingredientes que faltan, según los ingredientes disponibles (mapeado desde "missedIngredients"). */
    @JsonProperty("missedIngredients")
    private List<IngredienteSimpleDTO> ingredientes;

    /** Resumen o descripción corta de la receta (mapeado desde "summary"). */
    @JsonProperty("summary")
    private String resumen;

    /** Lista de instrucciones paso a paso para preparar la receta. */
    private List<String> instrucciones;

    /** Tiempo estimado de preparación en minutos (mapeado desde "readyInMinutes"). */
    @JsonProperty("readyInMinutes")
    private int minutosPreparacion;

    /** Lista completa de ingredientes (mapeado desde "extendedIngredients"). */
    @JsonProperty("extendedIngredients")
    private List<IngredienteSimpleDTO> ingredientesExtendidos;
    
    /** Lista completa de raciones (mapeado desde "servings"). */
    @JsonProperty("servings")
    private int raciones;
}