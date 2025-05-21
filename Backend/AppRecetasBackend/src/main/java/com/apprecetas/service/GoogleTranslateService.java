package com.apprecetas.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.apprecetas.dto.TranslateResponseDTO;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Servicio encargado de traducir texto del inglés al español utilizando la API de Google Translate.
 */
@Service
public class GoogleTranslateService {

	/** Cliente HTTP utilizado para enviar la solicitud a la API de Google Translate. */
    private final RestTemplate restTemplate = new RestTemplate();

    /** Clave de API de Google, inyectada desde el archivo de configuración. */
    @Value("${google.api.key}")
    private String apiKey;

    /**
     * Traduce un texto desde el inglés al español utilizando Google Translate.
     * 
     * @param texto Texto en inglés que se desea traducir.
     * @return El texto traducido al español. Si ocurre un error o el texto está vacío, se retorna el original.
     */
    public String traducirTexto(String texto) {
        if (texto == null || texto.isBlank()) {
            System.out.println("[SKIP] Texto vacío o nulo. No se traduce.");
            return texto;
        }

        try {
            System.out.println("[TRANSLATE] Traduciendo: " + texto);

            String url = "https://translation.googleapis.com/language/translate/v2?key=" + apiKey;

            Map<String, Object> body = new HashMap<>();
            body.put("q", texto);
            body.put("source", "en");
            body.put("target", "es");
            body.put("format", "text");

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            HttpEntity<Map<String, Object>> request = new HttpEntity<>(body, headers);

            ResponseEntity<TranslateResponseDTO> response = restTemplate.postForEntity(
                url, request, TranslateResponseDTO.class
            );

            String resultado = response.getBody()
                    .getData()
                    .getTranslations()
                    .get(0)
                    .getTranslatedText();

            return resultado;

        } catch (Exception e) {
            e.printStackTrace(); 
            return texto;
        }
    }
    /**
     * Traduce un texto entre dos idiomas dados (es → en, en → es, etc.).
     */
    public String traducirTexto(String texto, String source, String target) {
        if (texto == null || texto.isBlank()) {
            System.out.println("[SKIP] Texto vacío o nulo. No se traduce.");
            return texto;
        }

        try {
            String url = "https://translation.googleapis.com/language/translate/v2?key=" + apiKey;

            Map<String, Object> body = new HashMap<>();
            body.put("q", texto);
            body.put("source", source);
            body.put("target", target);
            body.put("format", "text");

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            HttpEntity<Map<String, Object>> request = new HttpEntity<>(body, headers);

            ResponseEntity<TranslateResponseDTO> response = restTemplate.postForEntity(
                url, request, TranslateResponseDTO.class
            );

            String resultado = response.getBody()
                    .getData()
                    .getTranslations()
                    .get(0)
                    .getTranslatedText();

            return resultado;

        } catch (Exception e) {
            e.printStackTrace(); 
            return texto;
        }
    }

    /**
     * Traduce una palabra del español al inglés.
     */
    public String traducirPalabra(String palabra) {
        return traducirTexto(palabra, "es", "en");
    }

    /**
     * Traduce una lista de ingredientes separados por coma del español al inglés.
     */
    public String traducirIngredientes(String ingredientes) {
        String[] lista = ingredientes.split(",");
        List<String> traducidos = new ArrayList<>();

        for (String ing : lista) {
            traducidos.add(traducirPalabra(ing.trim()));
        }

        return String.join(",", traducidos);
    }

}
