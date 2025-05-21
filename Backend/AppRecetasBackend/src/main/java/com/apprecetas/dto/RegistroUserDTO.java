package com.apprecetas.dto;

import java.util.List;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import lombok.Data;

@Data
public class RegistroUserDTO {

    @NotBlank(message = "El nombre de usuario es obligatorio.")
    private String nombreUsuario;

    @Email(message = "El email debe ser válido.")
    private String email;

    @NotBlank(message = "La contraseña es obligatoria.")
    private String contraseña;
    
    private List<String> recetasFavoritas;
    
    private List<String> productosEscaneadosFavoritos;

    @NotEmpty(message = "Al menos debe haber un alimento.")
    private List<String> alimentosFavoritos;
    
    @NotBlank(message = "Tienes que eleegir un idioma.")
    private String idioma;
}
