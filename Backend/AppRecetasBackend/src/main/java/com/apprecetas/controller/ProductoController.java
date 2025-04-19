package com.apprecetas.controller;

import java.util.ArrayList;
import java.util.List;

import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.apprecetas.exception.ProductoNoEncontradoException;
import com.apprecetas.service.OpenFoodFactsService;

@RestController
@RequestMapping("/api/producto")
public class ProductoController {

	private OpenFoodFactsService openFoodFactsService;
	
	public ProductoController(OpenFoodFactsService openFoodFactsService) {
		this.openFoodFactsService = openFoodFactsService;
	}
	
	@GetMapping("/buscar")
	public ResponseEntity<Object> getProducto(@RequestParam("codigo") String codigo) {
		try {
			String jsonResponse = openFoodFactsService.buscarProductoPorCodigo(codigo);
			List<String> listaIngredientes = new ArrayList<>();

			JSONObject json = new JSONObject(jsonResponse);
			JSONObject result = json.getJSONObject("product");

			JSONArray ingredientes = result.getJSONArray("ingredients");
			for (int i = 0; i < ingredientes.length(); i++) {
				JSONObject ingrediente = ingredientes.getJSONObject(i);

				if (ingrediente.has("id")) {
					String nombre = ingrediente.getString("id");
					listaIngredientes.add(nombre);
				}
			}

			JSONObject newJson = new JSONObject();

			newJson.put("nombre", result.optString("generic_name", "Unknown"));
			newJson.put("marca", result.optString("brand_owner", "Unknown"));
			newJson.put("ingredientes", listaIngredientes);
			newJson.put("imagen", result.optString("image_url", "No image"));

			return ResponseEntity.ok(newJson.toString());
		} catch (ProductoNoEncontradoException e) {
			return ResponseEntity.status(404)
					.body("{\"error\": \"Producto no encontrado con código: " + codigo + "\"}");
		} catch (Exception e) {
			return ResponseEntity.status(500).body("{\"error\": \"Error interno: " + e.getMessage() + "\"}");
		}

	}
}
