package com.apprecetas.dto;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Representa la respuesta de una búsqueda al endpiont de Spoonacular(/complexSearch=true).
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ComplexSearchResponse {
	
	/**
     * Lista de recetas encontradas.
     */
	private List<RecetaExtendidaDTO> results;
	
	/**
     * Posición inicial de los resultados.
     */
	private int offset;
	
	/**
     * Número de resultados devueltos en esta página.
     */
	private int number;
	
	/**
     * Total de resultados disponibles.
     */
	private int totalResults;
}
