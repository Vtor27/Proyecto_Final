import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

const CardReceta = (props) => {
  return (
    <TouchableOpacity style={styles.card} onPress={props.onPress}>
      <Image
        source={{ uri: props.imagenUrl }}
        style={styles.imagen}
        resizeMode="cover"
      />
      <View style={styles.info}>
        <Text style={styles.titulo} numberOfLines={2}>
          {props.titulo}
        </Text>
        <View style={styles.detallesRow}>
          <Icon name="time-outline" size={16} color="#555" />
          <Text style={styles.detalles}> {props.minutosPreparacion} min</Text>
        </View>
        <View style={styles.detallesRow}>
          <Icon name="restaurant-outline" size={16} color="#555" />
          <Text style={styles.detalles}> {props.raciones} raciones</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    marginRight: 12,
    width: 160,
    height: 250,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    overflow: "hidden",
    borderWidth: 0.8,
    borderColor: "#e3e3e3",
  },
  imagen: {
    width: 160,
    height: 100,
  },
  info: {
    padding: 10,
  },
  titulo: {
    matginTop: 5,
    fontSize: 17,
    fontWeight: "600",
    marginBottom: 4,
    color: "#333",
  },
  detallesRow:{
    flexDirection: "row",
    alignItems: "center"
  },
  detalles: {
    fontSize: 13,
    color: "#666",
    marginTop: 7,
  },

});

export default CardReceta;
