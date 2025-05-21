package com.apprecetas.dto;

import lombok.Data;

@Data
public class IngredienteResponseDTO {
	
	 /**
     * Nombre del ingrediente.
     */
    private String nombre;
    
    /**
     * Cantidad del ingrediente junto con su unidad (por ejemplo, "200 gramos", "1 cucharada").
     */
    private String cantidadConUnidad;
}
