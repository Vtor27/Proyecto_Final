package com.apprecetas.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import com.apprecetas.dto.UsuarioDTO;

import java.nio.charset.StandardCharsets;
import java.util.Date;

import javax.crypto.SecretKey;

/**
 * Clase de utilidad para la generación y validación de tokens JWT (JSON Web
 * Token).
 *
 * Esta clase se encarga de firmar y verificar los tokens usando una clave
 * secreta definida en el archivo de propiedades.
 */
@Component
public class JwtUtil {

	/**
	 * Clave secreta utilizada para firmar y validar el token JWT. Se inyecta desde
	 * application.properties.
	 */
	@Value("${jwt.secret}")
	private String secret;

	/**
	 * Tiempo de expiración del token (en milisegundos). Se inyecta desde
	 * application.properties.
	 */
	@Value("${jwt.expiration}")
	private long expirationTime;

	/**
	 * Genera un token JWT firmado con el ID del usuario como sujeto.
	 *
	 * @param usuarioId ID único del usuario autenticado.
	 * @return Cadena JWT firmada que contiene el ID del usuario y la fecha de
	 *         expiración.
	 */
	public String generarToken(UsuarioDTO usuario) {
	    SecretKey key = Keys.hmacShaKeyFor(secret.getBytes(StandardCharsets.UTF_8));

	    return Jwts.builder()
	            .setSubject(usuario.getNombreUsuario()) // <- usamos el nombreUsuario en el subject
	            .setIssuedAt(new Date())
	            .setExpiration(new Date(System.currentTimeMillis() + expirationTime))
	            .signWith(key, SignatureAlgorithm.HS512)
	            .compact();
	}


	/**
	 * Extrae el ID del usuario desde el token JWT.
	 *
	 * @param token Token JWT firmado que contiene el ID del usuario.
	 * @return ID del usuario extraído del campo "subject" del token.
	 */
	public String extraerUsuarioId(String token) {
		SecretKey key = Keys.hmacShaKeyFor(secret.getBytes(StandardCharsets.UTF_8));
		Claims claims = Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token).getBody();
		return claims.getSubject();
	}

	public boolean estaExpirado(String token) {
	    Claims claims = getClaims(token);
	    Date fechaExpiracion = claims.getExpiration();
	    return fechaExpiracion.before(new Date());
	}
	
	public String obtenerNombreUsuario(String token) {
	    return getClaims(token).getSubject();
	}
	
	private Claims getClaims(String token) {
	    SecretKey key = Keys.hmacShaKeyFor(secret.getBytes(StandardCharsets.UTF_8));
	    return Jwts.parserBuilder()
	            .setSigningKey(key)
	            .build()
	            .parseClaimsJws(token)
	            .getBody();
	}
	
	/**
	 * Valida un token JWT comparando el nombre de usuario extraído del token
	 * con el nombre de usuario del objeto {@link UserDetails}, y comprobando que el token no haya expirado.
	 * 
	 * @param token el token JWT a validar
	 * @param userDetails los detalles del usuario autenticado
	 * @return {@code true} si el token es válido y no ha expirado, {@code false} en caso contrario
	 */
	public boolean validarToken(String token, UserDetails userDetails) {
	    final String username = extraerUsuarioId(token);
	    return username.equals(userDetails.getUsername()) && !estaExpirado(token);
	}

}
