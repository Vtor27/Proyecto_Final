package com.apprecetas.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.apprecetas.model.ComplexSearchResponse;
import com.apprecetas.model.DetalleRecetaDTO;
import com.apprecetas.model.RecetaDTO;
import com.apprecetas.service.RecetasService;

@RestController
@RequestMapping("/api/recetas")
public class RecetaController {
	@Autowired
	private RecetasService recetasService;

	@GetMapping
	public ResponseEntity<List<RecetaDTO>> buscarPorIngredientes(@RequestParam String ingredientes,
			@RequestParam(defaultValue = "5", required = true) int resultadosPorPagina,
			@RequestParam(defaultValue = "0", required = true) int offset) {

		if (ingredientes == null || ingredientes.trim().isEmpty()) {
			return ResponseEntity.badRequest().build();
		}
		List<RecetaDTO> listaRecetas = recetasService.buscarRecetasPorIngredientes(ingredientes, resultadosPorPagina,
				offset);

		if (listaRecetas.isEmpty()) {
			return ResponseEntity.noContent().build();
		}
		return ResponseEntity.ok(listaRecetas);
	}

	@GetMapping("/{id}")
	public ResponseEntity<DetalleRecetaDTO> buscarRecetaPorId(@PathVariable int id) {
		DetalleRecetaDTO receta = recetasService.obtenerDetallesRecetaPorId(id);

		if (receta == null) {
			return ResponseEntity.notFound().build();
		}
		return ResponseEntity.ok(receta);
	}

	@GetMapping("extendidas")
	public ResponseEntity<ComplexSearchResponse> buscarRecetasExtendidas(@RequestParam String query,
			@RequestParam(defaultValue = "10", required = true) int resultadosPorPagina,
			@RequestParam(defaultValue = "0", required = true) int offset) {
		
		ComplexSearchResponse respuesta = recetasService.buscarRecetasExtendidas(query, resultadosPorPagina, offset);
		
		if(respuesta.getResults().isEmpty()) {
			return ResponseEntity.noContent().build();
		}
		
		return ResponseEntity.ok(respuesta);
	}
}
