package com.apprecetas.mapper;

import com.apprecetas.dto.RecetaDTO;
import com.apprecetas.dto.RecetaDetalleResponseDTO;
import com.apprecetas.dto.RecetaExtendidaDTO;
import com.apprecetas.dto.RecetaCardDTO;

/**
 * Clase que proporciona métodos para mapear objetos entre diferentes tipos de
 * DTO relacionados con las recetas.
 */
public class RecetaMapper {

	/**
	 * Convierte un objeto {@link RecetaDTO} en un {@link RecetaCardDTO}, útil para
	 * vistas resumidas de recetas.
	 * 
	 * @param receta Objeto de tipo {@code RecetaDTO} con la información original.
	 * @return Un nuevo objeto {@code RecetaCardDTO} con título, imagen, minutos y
	 *         cantidad de ingredientes.
	 */
	public static RecetaCardDTO mapearACard(RecetaDTO receta) {
		RecetaCardDTO card = new RecetaCardDTO();
		card.setTitulo(receta.getTitulo());
		card.setImagenUrl(receta.getImagenUrl());
		card.setMinutosPreparacion(receta.getMinutosPreparacion());
		card.setRaciones(receta.getRaciones());
		return card;
	}

	/**
	 * Convierte un objeto {@link RecetaExtendidaDTO} en un
	 * {@link RecetaDetalleResponseDTO}, extrayendo todos los detalles relevantes
	 * para la visualización completa de una receta.
	 * 
	 * @param dto Objeto {@code RecetaExtendidaDTO} que contiene la información
	 *            detallada de la receta.
	 * @return Un objeto {@code RecetaDetalleResponseDTO} con título, imagen,
	 *         puntuación, pasos, dietas, etc.
	 */
	public static RecetaDetalleResponseDTO mapearDesdeExtendida(RecetaExtendidaDTO dto) {
		RecetaDetalleResponseDTO detalle = new RecetaDetalleResponseDTO();
		detalle.setId(dto.getId());
		detalle.setTitulo(dto.getTitulo());
		detalle.setResumen(dto.getSummary());
		detalle.setImagenUrl(dto.getImagenUrl());
		detalle.setMinutosPreparacion(dto.getReadyInMinutes());
		detalle.setRaciones(dto.getServings());
		detalle.setPuntuacion(dto.getSpoonacularScore());
		detalle.setTiposPlato(dto.getDishTypes());
		detalle.setDietas(dto.getDiets());
		detalle.setUrlFuente(dto.getUrlFuente());
		detalle.setUrlSpoonacular(dto.getUrlSpoonacular());
		detalle.setPasos(dto.getPasos());
		detalle.setVegetariana(dto.isVegetarian());
		detalle.setVegana(dto.isVegan());
		detalle.setSinGluten(dto.isGlutenFree());
		detalle.setSinLacteos(dto.isDairyFree());
		detalle.setPuntuacionSalud(dto.getHealthScore());
		detalle.setNumeroMeGusta(dto.getAggregateLikes());
		detalle.setPrecioPorRacion(dto.getPricePerServing());
		detalle.setFuente(dto.getSourceName());
		return detalle;
	}

}
