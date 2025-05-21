package com.apprecetas.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.apprecetas.dto.ProductoResponseDTO;
import com.apprecetas.exception.ProductoNoEncontradoException;
import com.apprecetas.security.JwtUtil;
import com.apprecetas.service.OpenFoodFactsService;

@RestController
@RequestMapping("/api/producto")
public class ProductoController {

	@Autowired
	private JwtUtil jwtUtil;
	
    private final OpenFoodFactsService openFoodFactsService;

    public ProductoController(OpenFoodFactsService openFoodFactsService) {
        this.openFoodFactsService = openFoodFactsService;
    }
    
    /**
     * Busca un producto en la API de Open Food Facts por su código de barras.
     *
     * @param codigo   Código de barras del producto.
     * @param lenguaje Idioma preferido para los resultados (por defecto, "en").
     * @return Información del producto o error si no se encuentra.
     */
    @GetMapping("/buscar")
    public ResponseEntity<ProductoResponseDTO> getProducto(@RequestParam("codigo") String codigo,
    		@RequestParam(name = "lenguaje", defaultValue = "en") String lenguaje, @RequestHeader("Authorization")String authHeader) {
        try {
        	String nombreUser = jwtUtil.extraerUsuarioId(authHeader.replace("Bearer ", ""));
            ProductoResponseDTO dto = openFoodFactsService.buscarProductoPorCodigo(codigo, lenguaje);
            return ResponseEntity.ok(dto);
        } catch (ProductoNoEncontradoException e) {
            return ResponseEntity.status(404).build();
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).build();
        }
    }
}