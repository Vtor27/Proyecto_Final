// src/screens/tabFavoritos/RecetasFavoritas.js
import React, { useState, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import {

  FlatList,
  StyleSheet,
} from "react-native";
import { obtenerRecetasFavoritas } from "../../services/favoritosService";
import CardFavReceta from "./../../components/CardFavReceta";
import PantallaCarga from "../../screens/utils/PantallaCarga";
import PantallaError from "../../components/PantallaError";

export default function RecetasFavoritas({ navigation }) {
  const [recetas, setRecetas] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(false);

  useFocusEffect(
    useCallback(() => {
      const cargarFavoritas = async () => {
        setCargando(true);
        try {
          const data = await obtenerRecetasFavoritas();
          setRecetas(data);
        } catch (error) {
          console.error("Error al cargar favoritas:", error);
          setError(true);
        } finally {
          setCargando(false);
        }
      };

      cargarFavoritas();
    }, [])
  );
  const handleRecetaPress = (receta) => {
    navigation.navigate("DetalleReceta", { idReceta: receta.id });
  };

  if (cargando) return <PantallaCarga />;

  if (error) {
    return (
      <PantallaError
        mensaje="No se pudieron cargar los favoritos. Inténtalo de nuevo."
        onClose={() => {
          setError(false);
          setCargando(true);
        }}
      />
    );
  }

  return (
    <FlatList
      data={recetas}
      keyExtractor={(item) => item.titulo}
      contentContainerStyle={styles.lista}
      renderItem={({ item }) => (
        <CardFavReceta receta={item} onPress={handleRecetaPress} />
      )}
    />
  );
}

const styles = StyleSheet.create({
  lista: {
    padding: 16,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  textoVacio: {
    fontSize: 16,
    color: "#777",
  },
});
