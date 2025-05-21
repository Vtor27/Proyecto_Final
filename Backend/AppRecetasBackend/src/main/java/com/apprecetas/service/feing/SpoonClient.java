package com.apprecetas.service.feing;

import java.util.List;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;

import com.apprecetas.dto.ComplexSearchResponse;
import com.apprecetas.dto.DetalleRecetaDTO;
import com.apprecetas.dto.RecetaDTO;
import com.apprecetas.dto.RecetaExtendidaDTO;

/**
 * Cliente Feign para consumir los endpoints de la API de Spoonacular.
 * 
 * Este cliente permite realizar búsquedas de recetas por ingredientes, por texto o por ID,
 * y obtener información detallada de cada una.
 * 
 */
@FeignClient(name="spoonacular", url="${spoonacular.url}")
public interface SpoonClient {

	/**
     * Busca recetas a partir de una lista de ingredientes.
     *
     * @param ingredientes Lista de ingredientes separados por comas (en inglés).
     * @param resultadosPorPagina Número máximo de resultados a devolver.
     * @param offset Índice de desplazamiento para la paginación.
     * @param apiKey Clave de autenticación para acceder a la API de Spoonacular.
     * @return Lista de objetos {@link RecetaDTO} con información de las recetas encontradas.
     */
	@GetMapping("/findByIngredients")
	List<RecetaDTO> getRecetas(
			@RequestParam("ingredients") String ingredientes, 
			@RequestParam("number") int resultadosPorPagina,
			@RequestParam("offset") int offset,
			@RequestParam("apiKey") String apiKey
		);
	
	/**
     * Obtiene información detallada de una receta a partir de su ID.
     *
     * @param id Identificador de la receta.
     * @param apiKey Clave de autenticación para acceder a la API de Spoonacular.
     * @return Objeto {@link RecetaExtendidaDTO} con todos los detalles de la receta.
     */
	@GetMapping("/{id}/information")
	RecetaExtendidaDTO getRecetaPorId(
			@PathVariable("id") int id,
			@RequestParam("apiKey") String apiKey
		);

	/**
     * Realiza una búsqueda extendida de recetas por texto.
     *
     * @param query Palabra clave o texto a buscar.
     * @param resultadosPorPagina Número de recetas a devolver.
     * @param offset Índice de desplazamiento para paginación.
     * @param addInformacion Si es {@code true}, incluye detalles completos de cada receta.
     * @param apiKey Clave de autenticación para acceder a la API de Spoonacular.
     * @return Un {@link ComplexSearchResponse} con las recetas encontradas.
     */
	@GetMapping("/complexSearch")
    ComplexSearchResponse getRecetasPorIngredientes(
        @RequestParam("includeIngredients") String ingredientes,
        @RequestParam("number") int resultadosPorPagina,
        @RequestParam("offset") int offset,
        @RequestParam("addRecipeInformation") boolean addInfo,
        @RequestParam("apiKey") String apiKey
    );
}