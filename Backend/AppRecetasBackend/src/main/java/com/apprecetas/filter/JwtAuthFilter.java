package com.apprecetas.filter;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import com.apprecetas.security.JwtUtil;

import java.io.IOException;

/**
 * Filtro de autenticación JWT que intercepta cada petición HTTP para validar
 * el token de acceso incluido en el encabezado "Authorization".
 */
@Component
public class JwtAuthFilter extends OncePerRequestFilter {

	/** Utilidad para validar y extraer datos del token JWT. */
    private final JwtUtil jwtUtil;

    private final UserDetailsService userDetailsService;
    
    public JwtAuthFilter(JwtUtil jwtUtil, UserDetailsService userDetailsService) {
        this.jwtUtil = jwtUtil;
        this.userDetailsService = userDetailsService;
    }

    /**
     * Método que se ejecuta en cada petición HTTP para comprobar la validez del token JWT.
     * Si el token es válido, se configura la autenticación en el contexto de seguridad.
     * 
     * @param request Petición HTTP entrante.
     * @param response Respuesta HTTP.
     * @param filterChain Cadena de filtros para continuar con el procesamiento.
     * @throws ServletException En caso de error en el procesamiento del filtro.
     * @throws IOException En caso de error de entrada/salida.
     */
    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain) throws ServletException, IOException {

        String header = request.getHeader("Authorization");

        if (header != null && header.startsWith("Bearer ")) {
            String token = header.substring(7);
            try {
                String nombreUsuario = jwtUtil.extraerUsuarioId(token);

                if (nombreUsuario != null && SecurityContextHolder.getContext().getAuthentication() == null) {
                    UserDetails userDetails = userDetailsService.loadUserByUsername(nombreUsuario);

                    if (jwtUtil.validarToken(token, userDetails)) {
                        UsernamePasswordAuthenticationToken authentication =
                                new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());

                        authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                        SecurityContextHolder.getContext().setAuthentication(authentication);
                        
                        System.out.println("Usuario autenticado: " + userDetails.getUsername());
                    }
                }

            } catch (Exception e) {
                System.out.println("Error al autenticar token: " + e.getMessage());
            }
        }

        filterChain.doFilter(request, response);
    }
}