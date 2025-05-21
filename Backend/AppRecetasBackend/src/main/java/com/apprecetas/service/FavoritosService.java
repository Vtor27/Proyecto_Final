package com.apprecetas.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.apprecetas.dto.ProductoResponseDTO;
import com.apprecetas.dto.RecetaDetalleResponseDTO;
import com.apprecetas.dto.UsuarioDTO;
import com.apprecetas.repository.UsuarioRepository;

/**
 * Servicio encargado de gestionar las operaciones relacionadas con las recetas
 * favoritas de los usuarios.
 */
@Service
public class FavoritosService {

	@Autowired
	private UsuarioRepository usuarioRepository;

	/**
	 * Guarda una receta en la lista de favoritos del usuario.
	 *
	 * @param nombreUsuario Nombre del usuario autenticado.
	 * @param receta        Objeto {@link RecetaDetalleResponseDTO} con la
	 *                      información completa.
	 * @throws Exception Si la receta ya está en la lista de favoritos.
	 */
	public void guardarRecetaFavorita(String nombreUsuario, RecetaDetalleResponseDTO receta) throws Exception {
		UsuarioDTO usuario = usuarioRepository.findByNombreUsuario(nombreUsuario).orElse(null);

		if (usuario == null) {
			throw new Exception("Usuario no encontrado");
		}

		if (usuario.getRecetasFavoritas() == null) {
			usuario.setRecetasFavoritas(new ArrayList<RecetaDetalleResponseDTO>());
		}

		boolean existe = false;
		for (int i = 0; i < usuario.getRecetasFavoritas().size(); i++) {
			RecetaDetalleResponseDTO actual = usuario.getRecetasFavoritas().get(i);
			if (actual.getTitulo().equals(receta.getTitulo())) {
				existe = true;
				break;
			}
		}

		if (existe) {
			throw new Exception("La receta ya está en favoritos");
		}

		usuario.getRecetasFavoritas().add(receta);
		usuarioRepository.save(usuario);
	}

	/**
	 * Guarda un producto escaneado en la lista de favoritos del usuario.
	 *
	 * @param nombreUsuario Nombre del usuario autenticado.
	 * @param producto      Objeto {@link ProductoResponseDTO} con los datos del
	 *                      producto escaneado.
	 * @throws Exception Si el producto ya está en favoritos.
	 */
	public void guardarProductoFavorito(String nombreUsuario, ProductoResponseDTO producto) throws Exception {
		UsuarioDTO usuario = usuarioRepository.findByNombreUsuario(nombreUsuario).orElse(null);

		if (usuario == null) {
			throw new Exception("Usuario no encontrado");
		}

		if (usuario.getProductosEscaneadosFavoritos() == null) {
			usuario.setProductosEscaneadosFavoritos(new ArrayList<ProductoResponseDTO>());
		}

		boolean existe = false;
		for (int i = 0; i < usuario.getProductosEscaneadosFavoritos().size(); i++) {
			ProductoResponseDTO actual = usuario.getProductosEscaneadosFavoritos().get(i);
			if (actual.getNombre().equals(producto.getNombre()) && actual.getMarca().equals(producto.getMarca())) {
				existe = true;
				break;
			}
		}

		if (existe) {
			throw new Exception("El producto ya está en favoritos");
		}

		usuario.getProductosEscaneadosFavoritos().add(producto);
		usuarioRepository.save(usuario);
	}

	/**
	 * Devuelve la lista de recetas favoritas del usuario.
	 *
	 * @param nombreUsuario Nombre del usuario autenticado.
	 * @return Lista de recetas favoritas guardadas.
	 */
	public List<RecetaDetalleResponseDTO> obtenerRecetasFavoritas(String nombreUsuario) {
		Optional<UsuarioDTO> usuarioOptional = usuarioRepository.findByNombreUsuario(nombreUsuario);

		if (!usuarioOptional.isPresent()) {
			throw new RuntimeException("Usuario no encontrado");
		}

		UsuarioDTO usuario = usuarioOptional.get();
		List<RecetaDetalleResponseDTO> favoritas = usuario.getRecetasFavoritas();

		if (favoritas == null) {
			return new ArrayList<RecetaDetalleResponseDTO>();
		}

		return favoritas;
	}

	/**
	 * Devuelve la lista de productos favoritos del usuario.
	 *
	 * @param nombreUsuario Nombre del usuario autenticado.
	 * @return Lista de productos escaneados guardados como favoritos.
	 */
	public List<ProductoResponseDTO> obtenerProductosFavoritos(String nombreUsuario) {
		UsuarioDTO usuario = usuarioRepository.findByNombreUsuario(nombreUsuario).orElse(null);

		if (usuario != null && usuario.getProductosEscaneadosFavoritos() != null) {
			return usuario.getProductosEscaneadosFavoritos();
		}

		return new ArrayList<ProductoResponseDTO>();
	}

	/**
	 * Elimina una receta de la lista de recetas favoritas de un usuario.
	 * 
	 * Busca al usuario por su nombre de usuario, localiza la receta con el ID
	 * proporcionado y la elimina de su lista de favoritas si existe. Si el usuario
	 * no existe, no tiene recetas favoritas o la receta no se encuentra, lanza una
	 * excepción.
	 * 
	 * @param nombreUsuario el nombre del usuario que desea eliminar la receta
	 * @param id            el identificador de la receta a eliminar
	 * @throws RuntimeException si el usuario no existe, no tiene recetas favoritas
	 *                          o la receta no se encuentra
	 */
	public void eliminarRecetaFavorita(String nombreUsuario, int id) {
		Optional<UsuarioDTO> optionalUsuario = usuarioRepository.findByNombreUsuario(nombreUsuario);

		if (!optionalUsuario.isPresent()) {
			throw new RuntimeException("Usuario no encontrado");
		}

		UsuarioDTO usuario = optionalUsuario.get();
		List<RecetaDetalleResponseDTO> favoritas = usuario.getRecetasFavoritas();

		if (favoritas == null || favoritas.isEmpty()) {
			throw new RuntimeException("No hay recetas favoritas para eliminar");
		}

		RecetaDetalleResponseDTO recetaAEliminar = null;

		for (RecetaDetalleResponseDTO receta : favoritas) {
			if (receta.getId() == id) {
				recetaAEliminar = receta;
				break;
			}
		}

		if (recetaAEliminar != null) {
			favoritas.remove(recetaAEliminar);
			usuario.setRecetasFavoritas(favoritas);
			usuarioRepository.save(usuario);
		} else {
			throw new RuntimeException("No se pudo eliminar la receta: ID no encontrado");
		}
	}

	/**
	 * Elimina un producto de la lista de productos escaneados favoritos de un
	 * usuario.
	 * 
	 * Busca al usuario por su nombre de usuario, localiza el producto por nombre
	 * (ignorando mayúsculas y minúsculas) y lo elimina si existe. Si el usuario no
	 * existe, no tiene productos favoritos o el producto no se encuentra, lanza una
	 * excepción.
	 * 
	 * @param nombreUsuario  el nombre del usuario que desea eliminar el producto
	 * @param nombreProducto el nombre del producto a eliminar
	 * @throws RuntimeException si el usuario no existe, no tiene productos
	 *                          favoritos o el producto no se encuentra
	 */
	public void eliminarProductoFavorito(String nombreUsuario, String nombreProducto) {
		Optional<UsuarioDTO> optionalUsuario = usuarioRepository.findByNombreUsuario(nombreUsuario);

		if (!optionalUsuario.isPresent()) {
			throw new RuntimeException("Usuario no encontrado");
		}

		UsuarioDTO usuario = optionalUsuario.get();
		List<ProductoResponseDTO> favoritos = usuario.getProductosEscaneadosFavoritos();

		if (favoritos == null || favoritos.isEmpty()) {
			throw new RuntimeException("No hay productos favoritos para eliminar");
		}

		ProductoResponseDTO productoAEliminar = null;

		for (ProductoResponseDTO producto : favoritos) {
			if (producto.getNombre().equalsIgnoreCase(nombreProducto)) {
				productoAEliminar = producto;
				break;
			}
		}

		if (productoAEliminar != null) {
			favoritos.remove(productoAEliminar);
			usuario.setProductosEscaneadosFavoritos(favoritos);
			usuarioRepository.save(usuario);
		} else {
			throw new RuntimeException("No se pudo eliminar el producto: nombre no encontrado");
		}
	}

}
