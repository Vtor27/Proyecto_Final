package com.apprecetas.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * DTO utilizado para representar los datos necesarios en una solicitud de inicio de sesión.
*/
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class LoginDTO {
	
	/**
     * Identificador del usuario. Puede ser un nombre de usuario o un email.
     * Este campo es obligatorio.
     */
	@NotBlank(message = "El identificador es obligatorio.")
	private String identificador;
	
	/**
     * Contraseña del usuario. Este campo también es obligatorio.
     */
	@NotBlank(message = "Es obligatorio poner una contraseña.")
	private String contraseña;
}
