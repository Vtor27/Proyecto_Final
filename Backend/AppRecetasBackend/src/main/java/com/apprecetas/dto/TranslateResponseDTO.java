package com.apprecetas.dto;

import lombok.Data;
import java.util.List;

/**
 * DTO que representa la respuesta del servicio de traducción de Google Translate API.
 * 
 * La estructura sigue el formato típico del JSON devuelto por dicha API, con el campo data
 * que contiene la lista de traducciones.
 */

@Data
public class TranslateResponseDTO {
	
	/** Contenedor principal de los datos devueltos por el servicio de traducción. */
    private DataContent data;

    /**
     * Clase interna que encapsula la lista de traducciones que viene del campo data.
     */
    @Data
    public static class DataContent {
    	
    	/** Lista de objetos que contienen los textos traducidos. */
        private List<Translation> translations;
    }

    /**
     * Clase interna que representa un único resultado de traducción.
     */
    @Data
    public static class Translation {
    	
    	/** Texto traducido generado por el servicio de traducción. */
        private String translatedText;
    }
}
