import React, { useEffect, useState } from "react";
import {
  Modal,
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { obtenerRecetaPorId } from "../services/recetasService";

export default function ModalReceta(props) {
  const [detalles, setDetalles] = useState(null);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    console.log("ModalReceta")
    if (props.visible && props.idReceta) {
      const cargarDetalles = async () => {
        console.log("Detalles para receta ID:", props.idReceta);
        setCargando(true);
        setError(false);
        try {
          const data = await obtenerRecetaPorId(props.idReceta);
          console.log("Receta recibida:", data);
          setDetalles(data);
        } catch (error) {
          console.error("Error al cargar receta:", error);
          setError(true);
        } finally {
          setCargando(false);
        }
      };

      cargarDetalles();
    } else {
      setError(true);
      setDetalles(null);
    }
  }, [props.idReceta, props.visible]);

  if (error) {
      return (
        <PantallaError mensaje="No se pudo mostrar la receta." />
      );
    }

  return (
    <Modal
      animationType="slide"
      visible={props.visible}
      transparent={true}
      onRequestClose={props.onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <TouchableOpacity
            style={styles.cerrar}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="close-circle" size={28} color="#444" />
          </TouchableOpacity>

          {cargando ? (
            <ActivityIndicator size="large" color="#6c7a89" />
          ) : detalles ? (
            <ScrollView contentContainerStyle={styles.content}>
              <Image
                source={{ uri: detalles.imagenUrl }}
                style={styles.imagen}
              />
              <Text style={styles.titulo}>{detalles.titulo}</Text>
              <View style={styles.subinfoRow}>
                <Ionicons name="time-outline" size={18} color="#666" />
                <Text style={styles.subinfo}>
                  {detalles.readyInMinutes} min
                </Text>
                <Ionicons
                  name="restaurant-outline"
                  size={18}
                  color="#666"
                  style={{ marginLeft: 12 }}
                />
                <Text style={styles.subinfo}>{detalles.servings} raciones</Text>
              </View>

              <Text style={styles.seccion}>Pasos</Text>
              {detalles.pasos && detalles.pasos.length > 0 ? (
                detalles.pasos.map((pasos, i) => (
                  <Text key={i} style={styles.textoPaso}>
                    • {pasos}
                  </Text>
                ))
              ) : (
                <Text style={styles.texto}>
                  No hay instrucciones disponibles.
                </Text>
              )}

              <Text style={styles.seccion}>Más información</Text>
              <Text style={styles.link}>Fuente: {detalles.urlFuente}</Text>
              <Text style={styles.link}>
                Spoonacular: {detalles.urlSpoonacular}
              </Text>
            </ScrollView>
          ) : (
            <View style={{ padding: 20 }}>
              <Text style={styles.texto}>
                No se pudo cargar la receta. Verifica tu conexión o inténtalo de
                nuevo.
              </Text>
            </View>
          )}
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    padding: 20,
  },
  modal: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 20,
    maxHeight: "90%",
  },
  cerrar: {
    alignSelf: "flex-end",
  },
  imagen: {
    width: "100%",
    height: 180,
    borderRadius: 12,
    marginBottom: 12,
  },
  titulo: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 4,
    color: "#333",
  },
  subinfo: {
    fontSize: 14,
    color: "#666",
    marginBottom: 10,
  },
  seccion: {
    fontSize: 16,
    fontWeight: "600",
    marginTop: 10,
    marginBottom: 4,
    color: "#444",
  },
  texto: {
    fontSize: 14,
    color: "#333",
    marginBottom: 8,
  },
  textoPaso: {
    fontSize: 14,
    color: "#333",
    marginBottom: 6,
    paddingLeft: 6,
  },
  link: {
    fontSize: 13,
    color: "#0077cc",
    textDecorationLine: "underline",
    marginBottom: 4,
  },
  content: {
    paddingBottom: 20,
  },
  subinfoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  subinfo: {
    fontSize: 14,
    color: "#666",
    marginLeft: 4,
  },
});
