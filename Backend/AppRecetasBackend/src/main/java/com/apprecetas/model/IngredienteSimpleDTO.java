package com.apprecetas.model;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class IngredienteSimpleDTO {

    private int id;

    @JsonProperty("name")
    private String nombre;

    @JsonProperty("amount")
    private double cantidad;

    @JsonProperty("unit")
    private String unidad;
}
