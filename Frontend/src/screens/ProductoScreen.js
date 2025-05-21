import React, { useEffect, useState } from "react";
import {
  Modal,
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import {
  guardarProductoFavorito,
  obtenerProductosFavoritos,
  eliminarProductoFavorito,
} from "../services/favoritosService";
import PantallaCarga from "./utils/PantallaCarga";
import PantallaError from "../components/PantallaError";

const ModalProducto = ({ visible, onClose, producto }) => {
  const [esFavorito, setEsFavorito] = useState(false);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const verificarFavorito = async () => {
      if (!producto) return;
      setCargando(true);
      try {
        const favoritos = await obtenerProductosFavoritos();
        for (let i = 0; i < favoritos.length; i++) {
          if (favoritos[i].nombre === producto.nombre) {
            setEsFavorito(true);
            return;
          }
        }
        setEsFavorito(false);
      } catch (error) {
        console.error("Error al ver favoritos:", error);
        setError(true);
      } finally {
        setCargando(false);
      }
    };

    if (visible) verificarFavorito();
  }, [producto, visible]);

  const toggleFavorito = async () => {
    if (!producto || !producto.nombre) return;
    setCargando(true);
    try {
      if (esFavorito) {
        await eliminarProductoFavorito(producto.nombre);
      } else {
        await guardarProductoFavorito(producto);
      }
      setEsFavorito(!esFavorito);
    } catch (error) {
      console.error("Error al seleccionar/deseleccionar favorito:", error);
      setError(true);
    } finally {
      setCargando(false);
    }
  };

  if (!producto) return null;

  const nutriscoreColors = {
    A: "#008000",
    B: "#7AC100",
    C: "#FFD700",
    D: "#FF8C00",
    E: "#FF3B30",
  };

  if (error) {
    return (
      <PantallaError
        mensaje="Error al procesar la información del producto."
        onClose={() => {
          setError(false);
          onClose();
        }}
      />
    );
  }

  if (cargando) {
    return <PantallaCarga />;
  }

  return (
    <Modal visible={visible} animationType="slide" onRequestClose={onClose}>
      <View style={styles.container}>
        <TouchableOpacity style={styles.closeIcon} onPress={onClose}>
          <Ionicons name="close" size={40} color="#333" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.favoritoIcon} onPress={toggleFavorito}>
          <Ionicons
            name="star"
            size={36}
            color={esFavorito ? "#f5c518" : "#ccc"}
          />
        </TouchableOpacity>

        <ScrollView contentContainerStyle={styles.scroll}>
          <View style={styles.box}>
            <Text style={styles.title}>{producto.nombre}</Text>

            <View style={styles.imageRow}>
              {producto.imagen && (
                <Image
                  source={{ uri: producto.imagen }}
                  style={styles.imageLarge}
                  resizeMode="contain"
                />
              )}

              <View style={styles.infoColumn}>
                <Text style={styles.label}>Marca:</Text>
                <Text style={styles.value}>{producto.marca}</Text>

                <Text style={styles.label}>Cantidad:</Text>
                <Text style={styles.value}>{producto.cantidad}</Text>

                <Text style={styles.label}>Países:</Text>
                <Text style={styles.value}>{producto.paises}</Text>
              </View>
            </View>

            <Text style={styles.sectionTitle}>
              Información nutricional (por 100g):
            </Text>
            <View style={styles.nutritionBlock}>
              <View style={styles.nutriItem}>
                <MaterialCommunityIcons
                  name="lightning-bolt"
                  size={20}
                  color="#fff"
                />
                <Text style={styles.nutriText}>
                  Energía: {producto.energiaKcal} kcal
                </Text>
              </View>
              <View style={styles.nutriItem}>
                <MaterialCommunityIcons name="food" size={20} color="#fff" />
                <Text style={styles.nutriText}>
                  Grasas: {producto.grasas} g (saturadas:{" "}
                  {producto.grasasSaturadas} g)
                </Text>
              </View>
              <View style={styles.nutriItem}>
                <MaterialCommunityIcons name="noodles" size={20} color="#fff" />
                <Text style={styles.nutriText}>
                  Carbohidratos: {producto.carbohidratos} g (azúcares:{" "}
                  {producto.azucares} g)
                </Text>
              </View>
              <View style={styles.nutriItem}>
                <MaterialCommunityIcons
                  name="food-steak"
                  size={20}
                  color="#fff"
                />
                <Text style={styles.nutriText}>
                  Proteínas: {producto.proteinas} g
                </Text>
              </View>
              <View style={styles.nutriItem}>
                <MaterialCommunityIcons name="shaker" size={20} color="#fff" />
                <Text style={styles.nutriText}>Sal: {producto.sal} g</Text>
              </View>
            </View>

            <Text style={styles.sectionTitle}>Nutri-Score:</Text>
            <View style={styles.nutriscoreContainer}>
              {["A", "B", "C", "D", "E"].map((letra) => (
                <View
                  key={letra}
                  style={[
                    styles.nutriscoreBox,
                    letra === producto.nutriscore?.toUpperCase() &&
                      styles.nutriscoreSelected,
                    { backgroundColor: nutriscoreColors[letra] },
                  ]}
                >
                  <Text style={styles.nutriscoreLetter}>{letra}</Text>
                </View>
              ))}
            </View>

            <Text style={styles.sectionTitle}>Ingredientes:</Text>
            <Text style={styles.ingredients}>
              {producto.ingredientes
                .replace(/\b[a-z]{2,3}:/g, "")
                .replace(/,/g, ", ")
                .trim()}
            </Text>
          </View>
        </ScrollView>
      </View>
    </Modal>
  );
};

export default ModalProducto;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#c1c1c1",
    position: "relative",
  },
  closeIcon: {
    position: "absolute",
    top: 30,
    right: 25,
    zIndex: 10,
  },
  scroll: {
    paddingBottom: 40,
    backgroundColor: "#d4d4d4",
    paddingTop: 20,
    paddingHorizontal: 10,
    minHeight: "100%",
  },
  box: {
    backgroundColor: "#e8e8e8",
    borderRadius: 16,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#333",
  },
  imageRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    marginBottom: 20,
  },
  imageLarge: {
    width: 160,
    height: 160,
    borderRadius: 12,
  },
  infoColumn: {
    flex: 1,
    justifyContent: "center",
    gap: 8,
    marginLeft: 10,
  },
  label: {
    fontWeight: "bold",
    color: "#444",
  },
  value: {
    marginLeft: 4,
    color: "#555",
  },
  sectionTitle: {
    fontWeight: "bold",
    fontSize: 18,
    marginTop: 20,
    marginBottom: 6,
    color: "#222",
  },
  nutritionBlock: {
    backgroundColor: "#444",
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
  },
  nutriItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 6,
  },
  nutriText: {
    fontSize: 14,
    color: "#fff",
  },
  nutriscoreContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  nutriscoreBox: {
    flex: 1,
    paddingVertical: 10,
    alignItems: "center",
    borderRadius: 4,
    marginHorizontal: 2,
    opacity: 0.5,
  },
  nutriscoreSelected: {
    opacity: 1,
    borderWidth: 2,
    borderColor: "#333",
  },
  nutriscoreLetter: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  ingredients: {
    fontStyle: "italic",
    color: "#444",
    marginTop: 6,
    marginBottom: 30,
  },
  favoritoIcon: {
    position: "absolute",
    top: 30,
    left: 25,
    zIndex: 10,
  },
});
