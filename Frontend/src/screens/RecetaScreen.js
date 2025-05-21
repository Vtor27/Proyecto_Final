import React, { useEffect, useState } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  Image,
  ScrollView,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import {
  guardarRecetaFavorita,
  obtenerRecetasFavoritas,
  eliminarRecetaFavorita,
} from "../services/favoritosService";
import { obtenerRecetaPorId } from "../services/recetasService";
import PantallaError from "../components/PantallaError";
import PantallaCarga from "./utils/PantallaCarga";

import mockImage from "../../assets/images/food_image.jpg";

export default function PantallaDetalleReceta({ route, navigation }) {
  const { idReceta } = route.params || {};
  const [detalle, setDetalle] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [esFavorita, setEsFavorita] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const cargarReceta = async () => {
      if (!idReceta) {
        console.error("No se recibió ID de receta");
        setError(true);
        setCargando(false);
        return;
      }

      try {
        const receta = await obtenerRecetaPorId(idReceta, "es");
        if (receta) {
          setDetalle(receta);
        } else {
          setError(true);
        }
      } catch (error) {
        console.error("Error al obtener la receta:", error);
        setError(true);
      } finally {
        setCargando(false);
      }
    };

    cargarReceta();
  }, [idReceta]);

  useEffect(() => {
    const verificarFavorita = async () => {
      try {
        const favoritas = await obtenerRecetasFavoritas();
        if (favoritas && detalle) {
          const yaGuardada = favoritas.some((receta) => receta.id === detalle.id);
          setEsFavorita(yaGuardada);
        }
      } catch (error) {
        console.error("Error al verificar favoritas:", error);
        setError(true);
      }
    };

    if (detalle) {
      verificarFavorita();
    }
  }, [detalle]);

  const toggleFavorito = async () => {
    try {
      if (!detalle || !detalle.id) return;

      if (esFavorita) {
        await eliminarRecetaFavorita(detalle.id);
      } else {
        await guardarRecetaFavorita(detalle);
      }

      setEsFavorita(!esFavorita);
    } catch (error) {
      console.error("Error al alternar favorito:", error);
    }
  };

  if (cargando || !detalle) {
    return <PantallaCarga />;
  }

  if (error) {
    return (
      <PantallaError
        mensaje="No se pudo cargar la receta."
        onCerrar={() => navigation.goBack()}
      />
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TouchableOpacity
        style={styles.backIcon}
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="arrow-back" size={36} color="#333" />
      </TouchableOpacity>

      <TouchableOpacity
        onPress={toggleFavorito}
        style={{ position: "absolute", top: 20, right: 20 }}
      >
        <Ionicons
          name="star"
          size={30}
          color={esFavorita ? "#f5c518" : "#ccc"}
        />
      </TouchableOpacity>

      <Image source={{ uri: detalle.imagenUrl }} style={styles.imagen} />

      <Text style={styles.titulo}>{detalle.titulo}</Text>

      <View style={styles.iconoInfo}>
        <View style={styles.iconoItem}>
          <Ionicons name="time-outline" size={20} color="#555" />
          <Text style={styles.info}>{detalle.minutosPreparacion} min</Text>
        </View>
        <View style={styles.iconoItem}>
          <Ionicons name="restaurant-outline" size={20} color="#555" />
          <Text style={styles.info}>{detalle.raciones} raciones</Text>
        </View>
      </View>

      <View style={styles.infoAdicional}>
        <Text style={styles.seccion}>Información adicional</Text>

        {detalle.vegetariana && <Text style={styles.text}>Es vegetariana</Text>}
        {!detalle.vegetariana && (
          <Text style={styles.text}>No es vegetariana</Text>
        )}

        {detalle.vegana && <Text style={styles.text}>Es vegana</Text>}
        {!detalle.vegana && <Text style={styles.text}>No es vegana</Text>}

        {detalle.sinGluten && <Text style={styles.text}>Sin gluten</Text>}
        {!detalle.sinGluten && <Text style={styles.text}>Contiene gluten</Text>}

        {detalle.sinLacteos && (
          <Text style={styles.text}>No contiene lácteos</Text>
        )}
        {!detalle.sinLacteos && (
          <Text style={styles.text}>Contiene lácteos</Text>
        )}

        <Text style={styles.text}>
          Puntuación de salud: {detalle.puntuacionSalud}
        </Text>
        <Text style={styles.text}>
          Fuente: {detalle.fuente ? detalle.fuente : "No disponible"}
        </Text>
      </View>
      <View style={{ paddingVertical: 30 }}>
        <Text style={styles.seccion}>Resumen</Text>
        <Text style={styles.text}>
          {detalle.summary
            ? detalle.summary.replace(/<[^>]+>/g, "")
            : "Resumen no disponible."}
        </Text>
      </View>
      <Text style={styles.seccion}>Pasos</Text>
      {detalle.pasos && detalle.pasos.length > 0 ? (
        <View>
          {detalle.pasos.map((paso, index) => (
            <Text style={styles.text} key={index}>
              • {paso + "\n"}
            </Text>
          ))}
        </View>
      ) : (
        <Text>No hay instrucciones disponibles.</Text>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  imagen: {
    width: "100%",
    height: 200,
    borderRadius: 12,
    marginBottom: 12,
    marginTop: 50,
  },
  titulo: {
    fontSize: 30,
    fontFamily: "Siracha-Regular",
  },
  info: {
    fontFamily: "KiteOne-Regular",
    fontSize: 14,
    color: "#555",
  },
  seccion: {
    fontFamily: "AncizarSans-ExtraBoldItalic",
    fontSize: 20,
    fontWeight: "600",
  },
  backIcon: {
    position: "absolute",
    top: 30,
    left: 20,
    zIndex: 10,
  },
  iconoInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  infoAdicional: {
    marginTop: 10,
    backgroundColor: "#f5f5f5",
    padding: 10,
    borderRadius: 8,
    gap: 4,
  },
  text: {
    fontFamily: "AncizarSans-Medium",
    fontSize: 17,
  },
  iconoItem: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 16,
  },
});
