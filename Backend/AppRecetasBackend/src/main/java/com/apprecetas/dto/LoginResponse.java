package com.apprecetas.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

/**
 * DTO que representa la respuesta de una solicitud de inicio de sesión.
 * 
 * Contiene el token JWT generado tras una autenticación exitosa.
*/

@Data
@AllArgsConstructor
public class LoginResponse {
	
	/**
     * Token JWT que devuelve tras la autenticación del usuario. Se usa para autorizar las peticiones.
     */
	private String token;
	
	private String nombreUsuario;
}
