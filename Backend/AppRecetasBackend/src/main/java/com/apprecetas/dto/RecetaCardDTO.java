package com.apprecetas.dto;

import lombok.Data;

/**
 * DTO que representa una tarjeta visual de una receta,
 * usado para mostrar una lista de recetas en el frontend.
 */

@Data
public class RecetaCardDTO {
	private int id;
	private String titulo;
    private String imagenUrl;
    private int minutosPreparacion;
    private int raciones;
}
