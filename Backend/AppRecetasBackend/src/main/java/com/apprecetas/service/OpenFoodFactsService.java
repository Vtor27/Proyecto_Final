package com.apprecetas.service;

import java.util.ArrayList;
import java.util.List;

import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.apprecetas.dto.ProductoResponseDTO;
import com.apprecetas.exception.ProductoNoEncontradoException;
import com.apprecetas.utils.Utils;

/**
 * Servicio que consulta la API de Open Food Facts para obtener información
 * detallada de un producto alimenticio.
 * 
 * Realiza una petición a la API pública mediante el código de barras del
 * producto y construye un DTO con los datos.
 */
@Service
public class OpenFoodFactsService {

	@Autowired
	private TraductionService traductionService;

	/**
	 * Busca un producto alimenticio en la API de Open Food Facts a partir de su
	 * código de barras. Si se encuentra, se devuelve un objeto
	 * {@link ProductoResponseDTO} con la información extraída y traducida.
	 *
	 * @param codigo   Código de barras del producto.
	 * @param lenguaje Idioma deseado de la respuesta (ej: "es" para español, "en"
	 *                 para inglés).
	 * @return Un {@link ProductoResponseDTO} con los datos del producto.
	 */
	public ProductoResponseDTO buscarProductoPorCodigo(String codigo, String lenguaje) {
		String url = Utils.OPEN_FOOD_FACTS_URL + codigo + ".json";
		RestTemplate restTemplate = new RestTemplate();

		try {
			System.out.println("[INFO] Consultando Open Food Facts con código: " + codigo);
			String respuesta = restTemplate.getForObject(url, String.class);
			JSONObject json = new JSONObject(respuesta);

			int status = json.getInt("status");
			if (status == 0) {
				throw new ProductoNoEncontradoException("Producto con código: " + codigo + " no encontrado.");
			}

			JSONObject result = json.getJSONObject("product");

			ProductoResponseDTO dto = new ProductoResponseDTO();

			String nombreGenerico = result.optString("generic_name", "").trim();
			String productName = result.optString("product_name", "").trim();
			String brand = result.optString("brand_owner", "").trim();
			String nombreFinal;

			if (!nombreGenerico.isEmpty()) {
				nombreFinal = nombreGenerico;
			} else if (!productName.isEmpty()) {
				nombreFinal = productName;
			} else if (!brand.isEmpty()) {
				nombreFinal = brand;
			} else {
				nombreFinal = "Desconocido";
			}

			dto.setNombre(nombreFinal);
			dto.setNombreGenerico(nombreGenerico);
			dto.setMarca(!brand.isEmpty() ? brand : productName);
			dto.setCantidad(result.optString("quantity", "Desconocido"));
			dto.setCategoria(result.optString("categories", ""));
			dto.setPaises(result.optString("countries", "Desconocido"));
			dto.setImagen(result.optString("image_url", null));
			dto.setIdiomaOriginal(result.optString("categories_lc", "en"));

			List<String> ingredientes = new ArrayList<>();
			if (result.has("ingredients")) {
				JSONArray array = result.getJSONArray("ingredients");
				for (int i = 0; i < array.length(); i++) {
					JSONObject ing = array.getJSONObject(i);
					if (ing.has("id")) {
						ingredientes.add(ing.getString("id"));
					}
				}
			}
			dto.setIngredientes(String.join(", ", ingredientes));

			JSONObject nutriments = result.optJSONObject("nutriments");
			if (nutriments != null) {
				dto.setEnergiaKcal(nutriments.optDouble("energy-kcal_100g", 0));
				dto.setGrasas(nutriments.optDouble("fat_100g", 0));
				dto.setGrasasSaturadas(nutriments.optDouble("saturated-fat_100g", 0));
				dto.setCarbohidratos(nutriments.optDouble("carbohydrates_100g", 0));
				dto.setAzucares(nutriments.optDouble("sugars_100g", 0));
				dto.setProteinas(nutriments.optDouble("proteins_100g", 0));
				dto.setSal(nutriments.optDouble("salt_100g", 0));
			}

			dto.setNutriscore(result.optString("nutriscore_grade", null));
			dto.setNivelProcesadoNova(result.has("nova_group") ? result.optInt("nova_group") : null);

			if (!lenguaje.equalsIgnoreCase("en")) {
				dto = traductionService.traducirProducto(dto);
			}

			return dto;

		} catch (ProductoNoEncontradoException e) {
			throw e;
		} catch (Exception e) {
			System.err.println("[ERROR] Fallo al procesar Open Food Facts:");
			e.printStackTrace();
			throw new RuntimeException("Error al consultar Open Food Facts. " + e.getMessage());
		}
	}
}