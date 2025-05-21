package com.apprecetas;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;

/**
 * Clase principal de la aplicación backend de YummyGo.
 * 
 * Esta clase inicia la aplicación Spring Boot y habilita el uso de clientes Feign
 * para consumir servicios externos, especificando el paquete base donde se encuentran
 * los clientes declarados.

 */
@SpringBootApplication
@EnableFeignClients(basePackages="com.apprecetas.service.feing")
public class AppRecetasBackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(AppRecetasBackendApplication.class, args);
	}

}
