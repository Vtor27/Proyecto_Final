package com.apprecetas.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * DTO que representa un ingrediente en su forma más simple, con ID, nombre, cantidad y unidad.
 * 
 * Esta clase es utilizada para mapear los ingredientes provenientes de una API externa como Spoonacular.
 * Usa anotaciones de Jackson para asignar correctamente los campos durante la deserialización JSON.
 * 
 * Anotaciones:
 * - @JsonProperty: Especifica el nombre del campo esperado en el JSON.
 */

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class IngredienteSimpleDTO {

    @JsonProperty("name")
    private String nombre;

    @JsonProperty("original")
    private String descripcionOriginal;
}
