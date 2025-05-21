package com.apprecetas.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.apprecetas.filter.JwtAuthFilter;

/**
 * Configuración de seguridad de la aplicación.
 * 
 * Esta clase define la configuración de seguridad utilizando Spring Security.
 * Se establece una política sin estado (stateless) para las sesiones y se
 * configura un filtro personalizado para el manejo de autenticación JWT.
 * 
 */
@Configuration
@EnableWebSecurity
public class SecurityConfig {

    private final JwtAuthFilter jwtAuthFilter;
    
    /**
     * Constructor que recibe el filtro de autenticación JWT.
     * 
     * @param jwtAuthFilter filtro personalizado para procesar tokens JWT
     */

    public SecurityConfig(JwtAuthFilter jwtAuthFilter) {
        this.jwtAuthFilter = jwtAuthFilter;
    }

    /**
     * Configura la cadena de filtros de seguridad.
     * 
     * - Desactiva CSRF (ya que se utiliza JWT).
     * - Permite el acceso público a los endpoints de autenticación y recuperación de contraseña.
     * - Requiere autenticación para cualquier otro endpoint.
     * - Establece la política de sesiones.
     * - Agrega el filtro JWT antes del filtro de autenticación por nombre de usuario y contraseña.
     * 
     */
    @Bean
    SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        return http
                .csrf(csrf -> csrf.disable())
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/auth/login", "/auth/register", "/auth/recu-pass").permitAll()
                        .anyRequest().authenticated()            
                )
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class)
                .build();
    }
}

