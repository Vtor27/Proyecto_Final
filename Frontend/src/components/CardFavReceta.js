// TarjetaReceta.js
import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function TarjetaReceta({ receta, onPress }) {
  return (
    <TouchableOpacity style={styles.card} onPress={() => onPress(receta)}>
  <Image source={{ uri: receta.imagenUrl }} style={styles.imagen} />
  <View style={styles.info}>
    <Text style={styles.titulo}>{receta.titulo}</Text>
    <View style={styles.infoAdicional}>
      <Ionicons name="time-outline" size={16} color="#555" />
      <Text style={[styles.subTexto, {marginRight: 15}]}>
        {` ${receta.minutosPreparacion} min  `}
      </Text>
      <Ionicons name="restaurant-outline" size={16} color="#555" />
      <Text style={styles.subTexto}>
        {` ${receta.raciones} raciones`}
      </Text>
    </View>
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
    fontFamily: "Alkatra-Regular",
    fontSize: 20,
    marginBottom: 6,
  },
  infoAdicional: {
    color: "#555",
    display: "flex",
    flexDirection: "row",
  },
  subTexto:{
    fontFamily: "AncizarSans-MediumItalic",
    fontSize: 15
  }
});
