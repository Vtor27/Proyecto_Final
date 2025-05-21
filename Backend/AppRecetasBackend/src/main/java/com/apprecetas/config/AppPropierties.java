package com.apprecetas.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import lombok.Data;

/**
 * Componente que gestiona las propiedades personalizadas de la aplicación.
 * 
 * Esta clase utiliza la anotación {@code @Value} para inyectar el valor de la clave
 * de la API de Spoonacular desde el archivo de configuración {@code application.properties}
 * o {@code application.yml}.

 */
@Data
@Component
public class AppPropierties {
	
	@Value("${spoonacular.api.key}")
	private String spoonacularApiKey;
}
