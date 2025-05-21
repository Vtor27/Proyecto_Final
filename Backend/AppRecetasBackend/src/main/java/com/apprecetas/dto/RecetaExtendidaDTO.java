package com.apprecetas.dto;

import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * DTO que representa una receta extendida con información detallada
 * utilizada para respuestas del backend.
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RecetaExtendidaDTO {

    private int id;

    @JsonProperty("title")
    private String titulo;

    @JsonProperty("image")
    private String imagenUrl;

    @JsonProperty("summary")
    private String summary;

    private int readyInMinutes;

    private int servings;

    private List<String> dishTypes;

    private List<String> diets;

    private double spoonacularScore;

    @JsonProperty("sourceUrl")
    private String urlFuente;

    @JsonProperty("spoonacularSourceUrl")
    private String urlSpoonacular;

    private List<String> pasos;

    @JsonProperty("instructions")
    private String instruccionesTextoPlano;

    @JsonProperty("extendedIngredients")
    private List<IngredienteSimpleDTO> ingredientesExtendidos;

    private boolean vegetarian;

    private boolean vegan;

    private boolean glutenFree;

    private boolean dairyFree;

    private int healthScore;

    private int aggregateLikes;

    private double pricePerServing;

    private String sourceName;

    /**
     * Setter personalizado que procesa las instrucciones analizadas de una receta.
     * 
     * Este método se encarga de convertir una lista de objetos {@link Instruccion} (obtenidos
     * del JSON como "analyzedInstructions") en una lista de pasos en texto plano.
     * 
     * Si la lista de instrucciones no está vacía, se toman los primeros pasos.
     * 
     * @param instrucciones lista de instrucciones estructuradas obtenidas del JSON
     */
    @JsonProperty("analyzedInstructions")
    public void setInstrucciones(List<Instruccion> instrucciones) {
        pasos = new ArrayList<>();
        if (instrucciones != null && !instrucciones.isEmpty()) {
            List<Step> listaSteps = instrucciones.get(0).getSteps();
            if (listaSteps != null) {
                for (Step step : listaSteps) {
                    pasos.add(step.getStep());
                }
            }
        } else if (instruccionesTextoPlano != null && !instruccionesTextoPlano.isBlank()) {
            pasos.add(instruccionesTextoPlano);
        }
    }

    @Data
    public static class Instruccion {
        private List<Step> steps;
    }

    @Data
    public static class Step {
        private String step;
    }

    public int getCantidadIngredientes() {
        return ingredientesExtendidos != null ? ingredientesExtendidos.size() : 0;
    }
}
