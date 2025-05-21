package com.apprecetas.dto;

import java.util.List;
import lombok.Data;

/**
 * DTO que representa los detalles completos de una receta
 * utilizado para mostrar la vista detallada de una receta en el frontend.
 */
@Data
public class RecetaDetalleResponseDTO {

    private int id;

    private String titulo;

    private String resumen;

    private String imagenUrl;

    private int minutosPreparacion;

    private int raciones;

    private double puntuacion;

    private List<String> tiposPlato;

    private List<String> dietas;

    private String urlFuente;

    private String urlSpoonacular;

    private List<String> pasos;

    private boolean vegetariana;

    private boolean vegana;

    private boolean sinGluten;

    private boolean sinLacteos;

    private int puntuacionSalud;

    private int numeroMeGusta;

    private double precioPorRacion;

    private String fuente;
}
