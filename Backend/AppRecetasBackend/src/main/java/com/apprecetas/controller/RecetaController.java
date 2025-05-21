package com.apprecetas.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.apprecetas.dto.RecetaCardDTO;
import com.apprecetas.dto.RecetaDetalleResponseDTO;
import com.apprecetas.security.JwtUtil;
import com.apprecetas.service.RecetasService;
import com.apprecetas.service.UsuarioService;

@RestController
@RequestMapping("/api/recetas")
public class RecetaController {
	
	@Autowired
	private RecetasService recetasService;

	@Autowired
	private UsuarioService usuarioService;


    @Autowired
    private JwtUtil jwtUtil;
	
	/**
	 * Busca recetas con información extendida según la consulta.
	 *
	 * @param query               Término de búsqueda.
	 * @param resultadosPorPagina Número de resultados por página.
	 * @param offset              Desplazamiento para paginación.
	 * @param lenguaje            Idioma de los resultados (por defecto, "en").
	 * @return Lista de recetas detalladas o estado sin contenido si no hay resultados.
	 */
    @GetMapping("/extendidas")
    public ResponseEntity<List<RecetaDetalleResponseDTO>> buscarRecetasExtendidas(
            @RequestHeader("Authorization") String authHeader,
            @RequestParam String query,
            @RequestParam(defaultValue = "15") int resultadosPorPagina,
            @RequestParam(defaultValue = "0") int offset){

        
        String nombreUser = jwtUtil.extraerUsuarioId(authHeader.replace("Bearer ", ""));
        String idioma = usuarioService.getIdiomaUser(nombreUser);

        
        List<RecetaDetalleResponseDTO> respuesta = recetasService.buscarRecetasExtendidas(query, resultadosPorPagina, offset, idioma);
        if (respuesta.isEmpty()) {
            return ResponseEntity.noContent().build();
        }

        return ResponseEntity.ok(respuesta);
    }

	/**
	 * Obtiene los detalles de una receta por su ID, para obtener los detalles de esta.
	 *
	 * @param id       ID de la receta.
	 * @return Detalles de la receta o estado 404 si no se encuentra.
	 */
    @GetMapping("/{id}")
    public ResponseEntity<RecetaDetalleResponseDTO> buscarRecetaPorId(
            @RequestHeader("Authorization") String authHeader,
            @PathVariable int id){

        String nombreUser = jwtUtil.extraerUsuarioId(authHeader.replace("Bearer ", ""));
        String idioma = usuarioService.getIdiomaUser(nombreUser);
        
        RecetaDetalleResponseDTO receta = recetasService.obtenerDetallesRecetaPorId(id, idioma);

        if (receta == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(receta);
    }
	
    /**
     * Devuelve recetas recomendadas basadas en los alimentos favoritos del usuario autenticado.
     */
    @GetMapping("/recomendadas")
    public ResponseEntity<List<RecetaCardDTO>> getRecomendadas(@RequestHeader("Authorization") String authHeader) {
        String nombreUsuario = jwtUtil.extraerUsuarioId(authHeader.replace("Bearer ", ""));

        List<String> alimentos = usuarioService.getAlimentosFavoritos(nombreUsuario);
        String idioma = usuarioService.getIdiomaUser(nombreUsuario);
        
        if (alimentos.isEmpty()) {
            return ResponseEntity.ok(List.of());
        }

        List<RecetaCardDTO> recetas = recetasService.buscarPorIngredientes(alimentos, idioma);

        return ResponseEntity.ok(recetas);
    }

}
