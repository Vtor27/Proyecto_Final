import React, { useEffect, useState, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
} from "react-native";
import { obtenerProductosFavoritos } from "../../services/favoritosService";
import TarjetaProducto from "./../../components/CardFavProducto";
import PantallaCarga from "../../screens/utils/PantallaCarga";
import PantallaError from "../../components/PantallaError";

export default function ProductosFavoritos({ navigation }) {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(false);

  useFocusEffect(
    useCallback(() => {
      const cargarFavoritos = async () => {
        setCargando(true);
        try {
          const data = await obtenerProductosFavoritos();
          setProductos(data);
        } catch (error) {
          console.error("Error al cargar favoritos:", error);
          setError(true);
        } finally {
          setCargando(false);
        }
      };

      cargarFavoritos();
    }, [])
  );

  const handleProductoPress = (producto) => {
    navigation.navigate("DetalleProductoFavorito", { producto });
  };

  if (cargando) return <PantallaCarga />;

  if (error) {
    return (
      <PantallaError
        mensaje="No se pudieron cargar los favoritos."
        onClose={() => {
          setError(false);
          setCargando(true);
        }}
      />
    );
  }

  return (
    <FlatList
      data={productos}
      keyExtractor={(item) => item.nombre}
      contentContainerStyle={styles.lista}
      renderItem={({ item }) => (
        <TarjetaProducto producto={item} onPress={handleProductoPress} />
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
