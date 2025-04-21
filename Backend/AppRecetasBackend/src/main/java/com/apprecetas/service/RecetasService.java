package com.apprecetas.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.apprecetas.model.ComplexSearchResponse;
import com.apprecetas.model.DetalleRecetaDTO;
import com.apprecetas.model.RecetaDTO;
import com.apprecetas.service.feing.SpoonClient;

@Service
public class RecetasService {

	@Autowired
	private SpoonClient spoonClient;

	@Value("${spoonacular.api.key}")
	private String apiKey;

	public RecetasService(SpoonClient spoonClient) {
		this.spoonClient = spoonClient;
	}

	public List<RecetaDTO> buscarRecetasPorIngredientes(String ingredientes, int resultadosPorPagina, int offset) {
		return spoonClient.getRecetas(ingredientes, resultadosPorPagina, offset, apiKey);
	}

	public DetalleRecetaDTO obtenerDetallesRecetaPorId(int id) {
		return spoonClient.getRecetaPorId(id, apiKey);
	}
	
	public ComplexSearchResponse buscarRecetasExtendidas(String query, int resultadosPorPagina, int offset) {
		return spoonClient.getRecetasComplejas(query, resultadosPorPagina, offset, true, apiKey);
	}
}
