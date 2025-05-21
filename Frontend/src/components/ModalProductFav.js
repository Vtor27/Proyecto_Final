import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import {
  guardarProductoFavorito,
  eliminarProductoFavorito,
  obtenerProductosFavoritos,
} from "../services/favoritosService";

export default function ModalProductFav({ route, navigation }) {
  const { producto } = route.params;
  const [esFavorito, setEsFavorito] = useState(false);

  const nutriscoreColors = {
    A: "#008000",
    B: "#7AC100",
    C: "#FFD700",
    D: "#FF8C00",
    E: "#FF3B30",
  };

  useEffect(() => {
    const verificarFavorito = async () => {
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
        console.error("Error al ver favorito:", error);
      }
    };

    if (producto) verificarFavorito();
  }, [producto]);

  const toggleFavorito = async () => {
    try {
      if (esFavorito) {
        await eliminarProductoFavorito(producto.nombre);
      } else {
        await guardarProductoFavorito(producto);
      }
      setEsFavorito(!esFavorito);
    } catch (error) {
      console.error("Error alterno favorito:", error);
    }
  };

  if (!producto) return <Text>Producto no disponible</Text>;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TouchableOpacity style={styles.backIcon} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={36} color="#333" />
      </TouchableOpacity>

      <TouchableOpacity style={styles.favoritoIcon} onPress={toggleFavorito}>
        <Ionicons name="star" size={36} color={esFavorito ? "#f5c518" : "#ccc"} />
      </TouchableOpacity>

      <Text style={styles.title}>{producto.nombre}</Text>

      {producto.imagen && (
        <Image source={{ uri: producto.imagen }} style={styles.imagen} />
      )}

      <Text style={styles.sub}>{producto.marca} • {producto.cantidad}</Text>
      <Text style={styles.sub}>{producto.paises}</Text>

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
      <Text style={styles.sectionTitle}>Información nutricional (por 100g):</Text>
      <View style={styles.nutritionBlock}>
        <View style={styles.nutriItem}>
          <MaterialCommunityIcons name="lightning-bolt" size={20} color="#fff" />
          <Text style={styles.nutriText}>Energía: {producto.energiaKcal} kcal</Text>
        </View>
        <View style={styles.nutriItem}>
          <MaterialCommunityIcons name="food" size={20} color="#fff" />
          <Text style={styles.nutriText}>Grasas: {producto.grasas} g (saturadas: {producto.grasasSaturadas} g)</Text>
        </View>
        <View style={styles.nutriItem}>
          <MaterialCommunityIcons name="noodles" size={20} color="#fff" />
          <Text style={styles.nutriText}>Carbohidratos: {producto.carbohidratos} g (azúcares: {producto.azucares} g)</Text>
        </View>
        <View style={styles.nutriItem}>
          <MaterialCommunityIcons name="food-steak" size={20} color="#fff" />
          <Text style={styles.nutriText}>Proteínas: {producto.proteinas} g</Text>
        </View>
        <View style={styles.nutriItem}>
          <MaterialCommunityIcons name="shaker" size={20} color="#fff" />
          <Text style={styles.nutriText}>Sal: {producto.sal} g</Text>
        </View>
      </View>

      <Text style={styles.ingredientesTitle}>Ingredientes:</Text>
      <Text style={styles.ingredientes}>
        {producto.ingredientes
          .replace(/\b[a-z]{2,3}:/g, "")
          .replace(/,/g, ", ")
          .trim()}
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingTop: 60,
    backgroundColor: "#f4f4f4",
    flexGrow: 1,
  },
  backIcon: {
    position: "absolute",
    top: 30,
    left: 20,
    zIndex: 10,
  },
  favoritoIcon: {
    position: "absolute",
    top: 30,
    right: 20,
    zIndex: 10,
  },
  title: {
    fontSize: 40,
    fontFamily: "Alkatra-Regular",
    marginBottom: 0,
    textAlign: "center",
  },
  imagen: {
    width: "100%",
    height: 200,
    borderRadius: 12,
    marginBottom: 20,
  },
  sub: {
    textAlign: "center",
    color: "#555",
    marginBottom: 6,
  },
  ingredientesTitle: {
    fontWeight: "bold",
    fontSize: 18,
    marginTop: 20,
    marginBottom: 6,
    color: "#222",
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
  ingredientes: {
    fontFamily: "AncizarSans-Medium",
    fontSize: 17,
    color: "#444",
    marginTop: 6,
    marginBottom: 10,
  },
  nutritionBlock: {
    backgroundColor: "#444",
    padding: 12,
    borderRadius: 8,
    marginBottom: 30,
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
});
