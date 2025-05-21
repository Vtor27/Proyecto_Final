package com.apprecetas.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

/**
 * Excepción personalizada que se lanza cuando un producto no se encuentra en la base de datos
 * o en la api consultada.
 */
@ResponseStatus(HttpStatus.NOT_FOUND)
public class ProductoNoEncontradoException extends RuntimeException {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	/**
     * Construye una nueva excepción con el mensaje especificado.
     * 
     * @param mensaje Mensaje descriptivo del error.
     */
	public ProductoNoEncontradoException(String mensaje) {
		super(mensaje);
	}
}
