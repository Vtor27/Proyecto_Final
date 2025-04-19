package com.apprecetas.service;

import org.json.JSONObject;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.apprecetas.exception.ProductoNoEncontradoException;

@Service
public class OpenFoodFactsService {
	public String buscarProductoPorCodigo(String codigo) {
		String url = "https://world.openfoodfacts.org/api/v0/product/" + codigo + ".json";
		RestTemplate restTemplate = new RestTemplate();

		try {
			String respuesta = restTemplate.getForObject(url, String.class);

			JSONObject json = new JSONObject(respuesta);
			int status = json.getInt("status");

			if (status == 0) {
				throw new ProductoNoEncontradoException("Producto con código: " + codigo + ". No encontrado.");
			}
			return respuesta;
		} catch (ProductoNoEncontradoException e) {
			throw e;
		} catch (Exception e) {
			throw new RuntimeException("Error al consultar con la API de Open Food Facts. " + e.getMessage());
		}
	}
}
