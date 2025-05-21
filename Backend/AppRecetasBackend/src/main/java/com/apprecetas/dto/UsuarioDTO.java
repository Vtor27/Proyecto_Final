package com.apprecetas.dto;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Representa un documento de usuario dentro de la colección "Users" de MongoDB.
 */
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Document(collection = "Users")
public class UsuarioDTO {
	
	/** Identificador único del usuario en la base de datos. */
    @Id
    private String id;

    /** Nombre de usuario elegido para iniciar sesión o mostrar en la app. */
    private String nombreUsuario;

    /** Dirección de correo electrónico del usuario. */
    private String email;

    /** Contraseña encriptada del usuario. */
    private String contraseña;
    
    /** Campo por si la contraseña se cambia desde el perfil. */
    private String nuevaContraseña;

    /** Lista de IDs de recetas marcadas como favoritas por el usuario. */
    private List<RecetaDetalleResponseDTO> recetasFavoritas;

    /** Fecha y hora en la que el usuario se registró. */
    @JsonFormat(pattern = "dd/MM/yyyy HH:mm")
    private LocalDateTime fechaRegistro;
    
    /** Lista de códigos o IDs de productos escaneados que el usuario ha marcado como favoritos. */
    private List<ProductoResponseDTO> productosEscaneadosFavoritos;

    /** Estado actual del usuario (por ejemplo, "activo", "pendiente", "borrado"). */
    private String estado;

    /** Lista de alimentos favoritos del usuario, para personalizar recomendaciones. */
    private List<String> alimentosFavoritos;
    
    /** Idioma elegido para la aplicación. */
    private String idioma;
}
