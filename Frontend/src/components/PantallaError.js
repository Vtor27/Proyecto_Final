import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function PantallaError({
  mensaje = "No se pudo cargar la información.",
  onCerrar,
}) {
  return (
    <View style={styles.container}>
      {onCerrar && (
        <TouchableOpacity style={styles.botonCerrar} onPress={onCerrar}>
          <Ionicons name="close" size={60} color="#333" />
        </TouchableOpacity>
      )}
      <Ionicons name="warning-outline" size={100} color="#ff5e57" />
      <Text style={styles.textoPrincipal}>¡VAYA...!</Text>
      <Text style={styles.mensaje}>{mensaje}</Text>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
    backgroundColor: 'white'
  },
  textoPrincipal: {
    fontSize: 28,
    fontWeight: "bold",
    marginTop: 16,
  },
  mensaje: {
    fontSize: 16,
    color: "#555",
    textAlign: "center",
    marginVertical: 16,
  },
  botonCerrar: {
    position: "absolute",
    top: 40,
    right: 20,
    zIndex: 10,
  },
});
