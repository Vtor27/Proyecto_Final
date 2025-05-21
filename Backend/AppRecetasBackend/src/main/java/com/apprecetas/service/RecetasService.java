package com.apprecetas.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.apprecetas.dto.ComplexSearchResponse;
import com.apprecetas.dto.RecetaDetalleResponseDTO;
import com.apprecetas.dto.RecetaExtendidaDTO;
import com.apprecetas.dto.RecetaCardDTO;
import com.apprecetas.mapper.RecetaMapper;
import com.apprecetas.service.feing.SpoonClient;

/**
 * Servicio encargado de interactuar con la API de Spoonacular para obtener
 * recetas.
 */
@Service
public class RecetasService {

	@Autowired
	private SpoonClient spoonClient;

	@Autowired
	private TraductionService traductionService;

	/** Clave de API de Spoonacular, inyectada desde el archivo de configuración. */
	@Value("${spoonacular.api.key}")
	private String apiKey;

	/**
	 * Busca recetas utilizando ingredientes como filtro y devuelve una lista de
	 * tarjetas resumidas (DTOs). Traduce los resultados si se solicita en español.
	 *
	 * @param ingredientes        Lista de ingredientes separados por comas (en
	 *                            inglés).
	 * @param resultadosPorPagina Número máximo de recetas a devolver.
	 * @param offset              Desplazamiento para la paginación.
	 * @param idioma              Idioma en que se quiere recibir los resultados.
	 * @return Lista de objetos {@link RecetaCardDTO} con la información resumida de
	 *         cada receta.
	 */
	public List<RecetaCardDTO> buscarRecetasParaCards(String ingredientes, int resultadosPorPagina, int offset,
			String idioma) {
		ComplexSearchResponse respuesta = spoonClient.getRecetasPorIngredientes(ingredientes, resultadosPorPagina,
				offset, true, apiKey);

		List<RecetaCardDTO> resultado = new ArrayList<>();

		for (RecetaExtendidaDTO receta : respuesta.getResults()) {
			RecetaExtendidaDTO recetaTraducida;
			if ("es".equalsIgnoreCase(idioma)) {
				recetaTraducida = traductionService.traducirExtendida(receta);
			} else {
				recetaTraducida = receta;
			}

			RecetaCardDTO card = new RecetaCardDTO();
			card.setId(recetaTraducida.getId());
			card.setTitulo(recetaTraducida.getTitulo());
			card.setImagenUrl(recetaTraducida.getImagenUrl());
			card.setMinutosPreparacion(recetaTraducida.getReadyInMinutes());
			card.setRaciones(recetaTraducida.getServings());

			resultado.add(card);
		}

		return resultado;
	}

	public List<RecetaCardDTO> buscarPorIngredientes(List<String> alimentos, String idioma) {
		String ingredientes = String.join(",", alimentos);
		return buscarRecetasParaCards(ingredientes, 5, 0, idioma);
	}

	/**
	 * Busca recetas detalladas mediante una consulta textual.
	 *
	 * @param query               Texto a buscar (nombre del plato, palabra clave,
	 *                            etc.).
	 * @param resultadosPorPagina Número de recetas a devolver por página.
	 * @param offset              Desplazamiento para la paginación.
	 * @param lenguaje            Idioma en que se quiere recibir los resultados.
	 * @return Lista de objetos {@link RecetaDetalleResponseDTO} con la información
	 *         detallada de cada receta.
	 */
	public List<RecetaDetalleResponseDTO> buscarRecetasExtendidas(String ingredientes, int resultadosPorPagina,
			int offset, String lenguaje) {
		if ("es".equalsIgnoreCase(lenguaje)) {
			ingredientes = traductionService.traducirIngredientes(ingredientes);
		}

		ComplexSearchResponse respuesta = spoonClient.getRecetasPorIngredientes(ingredientes, resultadosPorPagina,
				offset, true, apiKey);
		System.out.print("------" + ingredientes);

		List<RecetaDetalleResponseDTO> resultado = new ArrayList<>();

		int totalMaximo = 50;
		int acumulados = offset + resultadosPorPagina;

		if (offset >= totalMaximo) {
			return resultado;
		}

		int limite = Math.min(respuesta.getResults().size(), totalMaximo - offset);

		for (int i = 0; i < limite; i++) {
			RecetaExtendidaDTO receta = respuesta.getResults().get(i);
			RecetaExtendidaDTO recetaRecibida;

			if ("es".equalsIgnoreCase(lenguaje)) {
				recetaRecibida = traductionService.traducirExtendida(receta);
			} else {
				recetaRecibida = receta;
			}

			resultado.add(RecetaMapper.mapearDesdeExtendida(recetaRecibida));
		}

		return resultado;
	}

	/**
	 * Obtiene los detalles de una receta por su ID.
	 *
	 * @param id       ID numérico de la receta.
	 * @param lenguaje Idioma en que se quiere recibir los resultados.
	 * @return Objeto {@link RecetaDetalleResponseDTO} con todos los detalles de la
	 *         receta.
	 */
	public RecetaDetalleResponseDTO obtenerDetallesRecetaPorId(int id, String lenguaje) {
		RecetaExtendidaDTO receta = spoonClient.getRecetaPorId(id, apiKey);

		RecetaExtendidaDTO recetaRecibida;

		if ("es".equalsIgnoreCase(lenguaje)) {
			recetaRecibida = traductionService.traducirExtendida(receta);
		} else {
			recetaRecibida = receta;
		}

		return RecetaMapper.mapearDesdeExtendida(recetaRecibida);
	}
}
