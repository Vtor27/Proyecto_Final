package com.apprecetas.service.feing;

import java.util.List;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;

import com.apprecetas.model.ComplexSearchResponse;
import com.apprecetas.model.DetalleRecetaDTO;
import com.apprecetas.model.RecetaDTO;

@FeignClient(name = "spoonacular", url = "${spoonacular.url}")
public interface SpoonClient {

	@GetMapping("/findByIngredients")
	List<RecetaDTO> getRecetas(
			@RequestParam("ingredients") String ingredientes, 
			@RequestParam("number") int resultadosPorPagina,
			@RequestParam("offset") int offset,
			@RequestParam("apiKey") String apiKey
		);
	
	@GetMapping("/{id}/information")
	DetalleRecetaDTO getRecetaPorId(
			@PathVariable("id") int id,
			@RequestParam("apiKey") String apiKey
		);
	
	@GetMapping("/complexSearch")
	ComplexSearchResponse getRecetasComplejas(
			@RequestParam("query") String query,
			@RequestParam("number") int resultadosPorPagina,
			@RequestParam("offset") int offset,
			@RequestParam("addRecipeInformation") boolean addInformacion,
			@RequestParam("apiKey") String apiKey
			);
}
