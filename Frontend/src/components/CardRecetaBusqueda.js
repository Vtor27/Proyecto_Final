import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";


export default function CardRecetaBusqueda({
  titulo,
  imagenUrl,
  minutosPreparacion,
  cantidadIngredientes,
  onPress,
}) {
 return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Image source={{ uri: imagenUrl }} style={styles.imagen} />
      <View style={styles.info}>
        <Text style={styles.titulo} numberOfLines={2}>{titulo}</Text>
        <View style={styles.detalleRow}>
          <Icon name="time-outline" size={16} color="#555" />
          <Text style={styles.detalle}>  {minutosPreparacion} min</Text>
          <Text style={styles.dot}> · </Text>
          <Icon name="restaurant-outline" size={16} color="#555" />
          <Text style={styles.detalle}>  {cantidadIngredientes} ingredientes</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    overflow: "hidden",
    marginRight: 12,
    width: "100%",
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    marginBottom: 20,
  },
  imagen: {
    width: "100%",
    height: 120,
  },
  info: {
    padding: 10,
  },
  titulo: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 4,
  },
  detalleRow: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
  },
  detalle: {
    fontSize: 13,
    color: "#777",
  },
  dot: {
    fontSize: 13,
    color: "#777",
    marginHorizontal: 4,
  },
});