package com.apprecetas.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.apprecetas.dto.IngredienteSimpleDTO;
import com.apprecetas.dto.ProductoResponseDTO;
import com.apprecetas.dto.RecetaDTO;
import com.apprecetas.dto.RecetaExtendidaDTO;

import java.util.ArrayList;
import java.util.List;

/**
 * Servicio responsable de traducir contenido de los objetos DTO del inglés al
 * español.
 */

@Service
public class TraductionService {

	@Autowired
	private GoogleTranslateService translateService;

	/**
	 * Traduce los campos de una receta extendida ({@link RecetaExtendidaDTO}) al
	 * español.
	 *
	 * @param receta Objeto {@code RecetaExtendidaDTO} con campos en inglés.
	 * @return El mismo objeto con los campos traducidos al español.
	 */
	public RecetaExtendidaDTO traducirExtendida(RecetaExtendidaDTO receta) {
		if (receta.getTitulo() != null) {
			receta.setTitulo(translateService.traducirTexto(receta.getTitulo()));
		}

		if (receta.getSummary() != null && !receta.getSummary().isBlank()) {
			receta.setSummary(translateService.traducirTexto(receta.getSummary()));
		}

		List<String> pasosOriginales = receta.getPasos();
		List<String> pasosTraducidos = new ArrayList<>();
		if (pasosOriginales != null) {
			for (String paso : pasosOriginales) {
				pasosTraducidos.add(translateService.traducirTexto(paso));
			}
			receta.setPasos(pasosTraducidos);
		}

		return receta;
	}

	/**
	 * Traduce los campos de una receta simple ({@link RecetaDTO}) al español.
	 *
	 * @param receta Objeto {@code RecetaDTO} con información en inglés.
	 * @return El mismo objeto con sus campos traducidos.
	 */
	public RecetaDTO traducirDTO(RecetaDTO receta) {
		if (receta.getTitulo() != null) {
			receta.setTitulo(translateService.traducirTexto(receta.getTitulo()));
		}

		if (receta.getResumen() != null && !receta.getResumen().isBlank()) {
			receta.setResumen(translateService.traducirTexto(receta.getResumen()));
		}

		List<String> instrucciones = receta.getInstrucciones();
		if (instrucciones != null) {
			List<String> instruccionesTraducidas = new ArrayList<>();
			for (String instruccion : instrucciones) {
				instruccionesTraducidas.add(translateService.traducirTexto(instruccion));
			}
			receta.setInstrucciones(instruccionesTraducidas);
		}

		if (receta.getIngredientes() != null) {
			for (IngredienteSimpleDTO ing : receta.getIngredientes()) {
				ing.setNombre(translateService.traducirTexto(ing.getNombre()));
			}
		}

		return receta;
	}

	/**
	 * Traduce campos relevantes de un producto alimenticio
	 * ({@link ProductoResponseDTO}) al español.
	 *
	 * @param dto Objeto {@code ProductoResponseDTO} con texto en inglés.
	 * @return El mismo objeto con los campos traducidos.
	 */
	public ProductoResponseDTO traducirProducto(ProductoResponseDTO dto) {
		System.out.println("[DEBUG] Entrando a traducirProducto...");

		if (dto.getNombre() != null) {
			System.out.println("[TRADUCCIÓN] nombre = " + dto.getNombre());
			dto.setNombre(translateService.traducirTexto(dto.getNombre()));
		}

		if (dto.getCategoria() != null) {
			dto.setCategoria(translateService.traducirTexto(dto.getCategoria()));
		}

		if (dto.getPaises() != null) {
			dto.setPaises(translateService.traducirTexto(dto.getPaises()));
		}

		if (dto.getIngredientes() != null) {
			List<String> traducidos = new ArrayList<>();
			String[] separados = dto.getIngredientes().split(",");
			for (String palabra : separados) {
				traducidos.add(translateService.traducirTexto(palabra.trim()));
			}
			dto.setIngredientes(String.join(", ", traducidos));
		}

		return dto;
	}

	/**
	 * Traduce una cadena de ingredientes al idioma configurado.
	 * 
	 * Este método delega la traducción al servicio {@code translateService},
	 * que se encarga de realizar la traducción mediante una API externa.
	 * 
	 * @param ingredientes los ingredientes a traducir, separados por comas o espacios
	 * @return una cadena con los ingredientes traducidos
	 */
	public String traducirIngredientes(String ingredientes) {
		return translateService.traducirIngredientes(ingredientes);
	}

}
