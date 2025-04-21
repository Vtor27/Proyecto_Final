package com.apprecetas;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;

@SpringBootApplication
@EnableFeignClients(basePackages = "com.apprecetas.service.feing")
public class AppRecetasBackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(AppRecetasBackendApplication.class, args);
	}

}
