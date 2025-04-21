package com.apprecetas.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import lombok.Data;

@Data
@Component
public class AppPropierties {
	
	@Value("${spoonacular.api.key}")
	private String spoonacularApiKey;
}
