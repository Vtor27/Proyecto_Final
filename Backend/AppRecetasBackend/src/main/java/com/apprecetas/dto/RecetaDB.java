package com.apprecetas.dto;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Representa una receta almacenada en la base de datos MongoDB, dentro de la colección "Recetas".
 */

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "Recetas")
public class RecetaDB {
	
	/** Identificador único del documento en MongoDB. */
	@Id
	private String id;
	
	private String titulo;
	
	private List<String> ingredientes;
	
	private String instrucciones;
	
	private int tiempoPreparación;
	
	private String dificultad;
	
	private String imagenURL;
	
	private String autor;
	
	private LocalDateTime fechaCreacion;
	
	/** Fuente de la receta: puede ser "Spoon" (API externa) o "propia". */
	private String fuente;
}
