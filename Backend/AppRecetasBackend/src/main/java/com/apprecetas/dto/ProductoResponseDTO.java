package com.apprecetas.dto;

import lombok.Data;

/**
 * DTO que representa la información detallada de un producto alimenticio
 * obtenido desde la base de datos o API de Open Food Facts.
 * 
 */

@Data
public class ProductoResponseDTO {
    private String nombre;
    private String nombreGenerico;
    private String marca;
    private String cantidad;
    private String categoria;
    private String paises;
    private String ingredientes;
    private String imagen;

    private Double energiaKcal;
    private Double grasas;
    private Double grasasSaturadas;
    private Double carbohidratos;
    private Double azucares;
    private Double proteinas;
    private Double sal;

    private String nutriscore;
    private Integer nivelProcesadoNova;

    private String idiomaOriginal;
}
