package com.apprecetas.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.apprecetas.dto.ProductoResponseDTO;
import com.apprecetas.dto.RecetaDetalleResponseDTO;
import com.apprecetas.security.JwtUtil;
import com.apprecetas.service.FavoritosService;

@RestController
@RequestMapping("/api/favoritos")
public class FavoritosController {

	@Autowired
	private FavoritosService favoritosService;
	
	@Autowired
	private JwtUtil jwtUtil;
	
	/**
     * Guarda una receta como favorita para el usuario autenticado.
     *
     * @param receta    Receta a guardar.
     * @param authHeader Encabezado de autorización con el token JWT.
     * @return Mensaje de éxito o error.
     */
    @PostMapping("/receta")
    public ResponseEntity<?> guardarRecetaFavorita(@RequestBody RecetaDetalleResponseDTO receta,
                                                   @RequestHeader("Authorization") String authHeader) {
        try {
        	System.out.println("Receta recibida: " + receta);
            String usuario = jwtUtil.extraerUsuarioId(authHeader.replace("Bearer ", ""));
            favoritosService.guardarRecetaFavorita(usuario, receta);
            return ResponseEntity.ok("Receta agregada a favoritos.");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
	
    /**
     * Guarda un producto escaneado como favorito para el usuario autenticado.
     *
     * @param producto  Producto escaneado a guardar.
     * @param authHeader Encabezado de autorización con el token JWT.
     * @return Mensaje de éxito o error.
     */
    @PostMapping("/producto")
    public ResponseEntity<?> guardarProductoFavorito(@RequestBody ProductoResponseDTO producto,
                                                     @RequestHeader("Authorization") String authHeader) {
        try {
            String usuario = jwtUtil.extraerUsuarioId(authHeader.replace("Bearer ", ""));
            favoritosService.guardarProductoFavorito(usuario, producto);
            return ResponseEntity.ok("Producto agregado a favoritos.");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
	
    /**
     * Devuelve la lista de recetas favoritas del usuario autenticado.
     *
     * @param authHeader Encabezado de autorización con el token JWT.
     * @return Lista de recetas favoritas.
     */
    @GetMapping("/recetas")
    public ResponseEntity<List<RecetaDetalleResponseDTO>> obtenerRecetasFavoritas(
            @RequestHeader("Authorization") String authHeader) {
        try {
            String nombreUsuario = jwtUtil.extraerUsuarioId(authHeader.replace("Bearer ", ""));
            List<RecetaDetalleResponseDTO> recetas = favoritosService.obtenerRecetasFavoritas(nombreUsuario);
            return ResponseEntity.ok(recetas);
        } catch (Exception e) {
            System.err.println("❌ Error al obtener favoritas: " + e.getMessage());
            return ResponseEntity.ok(new ArrayList<>());
        }
    }


    
    /**
     * Devuelve la lista de productos favoritos del usuario autenticado.
     *
     * @param authHeader Encabezado de autorización con el token JWT.
     * @return Lista de productos escaneados favoritos.
     */
    @GetMapping("/productos")
    public ResponseEntity<List<ProductoResponseDTO>> obtenerProductosFavoritos(
            @RequestHeader("Authorization") String authHeader) {
        String usuario = jwtUtil.extraerUsuarioId(authHeader.replace("Bearer ", ""));
        List<ProductoResponseDTO> productos = favoritosService.obtenerProductosFavoritos(usuario);
        return ResponseEntity.ok(productos);
    }
    
    @DeleteMapping("/receta/{id}")
    public ResponseEntity<?> eliminarRecetaFavorita(@PathVariable int id,
                                                    @RequestHeader("Authorization") String authHeader) {
        try {
            String usuario = jwtUtil.extraerUsuarioId(authHeader.replace("Bearer ", ""));
            favoritosService.eliminarRecetaFavorita(usuario, id);
            return ResponseEntity.ok("Receta eliminada de favoritos.");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
    
    @DeleteMapping("/producto/{nombre}")
    public ResponseEntity<?> eliminarProductoFavorito(@PathVariable String nombre,
                                                      @RequestHeader("Authorization") String authHeader) {
        try {
            String nombreUsuario = jwtUtil.extraerUsuarioId(authHeader.replace("Bearer ", ""));
            favoritosService.eliminarProductoFavorito(nombreUsuario, nombre);
            return ResponseEntity.ok("Producto eliminado de favoritos.");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }


}
