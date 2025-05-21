import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";

export default function TarjetaProducto({ producto, onPress }) {
  return (
    <TouchableOpacity style={styles.card} onPress={() => onPress(producto)}>
      <Image source={{ uri: producto.imagen }} style={styles.imagen} />
      <View style={styles.info}>
        <Text style={styles.titulo}>{producto.nombre}</Text>
        <Text style={styles.infoAdicional}>
          {producto.marca} • {producto.cantidad}
        </Text>
        <Text style={styles.infoAdicional}>
        {producto.paises
            ? producto.paises.replace(/<[^>]+>/g, "").replace("es:", "").replace("en:", "")
            : "Unknown"}
            </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    backgroundColor: "#fff",
    marginBottom: 12,
    padding: 12,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  imagen: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginRight: 12,
  },
  info: {
    flex: 1,
    justifyContent: "center",
  },
  titulo: {
    fontSize: 20,
    fontFamily: "Alkatra-Regular",
    marginBottom: 6,
  },
  infoAdicional: {
    color: "#555",
    fontSize: 13,
  },
});
