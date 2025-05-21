import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { buscarRecetasPorIngredientes } from "../services/recetasService";
import CardRecetaBusqueda from "../components/CardRecetaBusqueda";

import PantallaError from "../components/PantallaError";
import PantallaCarga from "../screens/utils/PantallaCarga";

export default function BusquedaRecetasScreen({ route, navigation }) {
  const { ingredientes } = route.params;

  //BAJADO EL NUMERO DE RECETAS PORQUE NO SE PUEDEN MÁS DE 150 AL DIA
  const recetasPorPagina = 7;
  const maxResultados = 21;

  const [pagina, setPagina] = useState(0);
  const [recetas, setRecetas] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(false);

  const totalPaginas = Math.ceil(maxResultados / recetasPorPagina);

  useEffect(() => {
    const buscar = async () => {
      setCargando(true);
      try {
        const offset = pagina * recetasPorPagina;
        const resultado = await buscarRecetasPorIngredientes(
          ingredientes,
          recetasPorPagina,
          offset
        );
        console.log("🔍 Recetas recibidas:", resultado);

        setRecetas(resultado);
      } catch (error) {
        console.error("Error buscando recetas:", error);
        setError(true);
      } finally {
        setCargando(false);
      }
    };

    buscar();
  }, [ingredientes, pagina]);

  const handleRecetaPress = (item) => {
    navigation.navigate("DetalleReceta", { idReceta: item.id });
  };

  const handleNext = () => {
    const siguienteOffset = (pagina + 1) * recetasPorPagina;
    if (
      recetas.length === recetasPorPagina &&
      siguienteOffset < maxResultados
    ) {
      setPagina(pagina + 1);
    }
  };

  const handlePrev = () => {
    if (pagina > 0) {
      setPagina(pagina - 1);
    }
  };

  const desactivarNext =
    recetas.length < recetasPorPagina ||
    (pagina + 1) * recetasPorPagina >= maxResultados;

  if (error) {
    return (
      <PantallaError
        mensaje="No se pudieron buscar recetas. Comprueba la conexión.."
        onClose={() => {
          setError(false);
          setCargando(true);
        }}
      />
    );
  }

  if (!cargando && recetas.length === 0) {
    return (
      <PantallaError
        mensaje="No se encontraron recetas con esos ingredientes."
        onClose={() => navigation.goBack()}
      />
    );
  }
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.cerrar}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={32} color="#444" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Recetas encontradas</Text>
        <View style={{ width: 24 }} />
      </View>

      <FlatList
        data={recetas}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.lista}
        renderItem={({ item }) => (
          <CardRecetaBusqueda
            titulo={item.titulo}
            imagenUrl={item.imagenUrl}
            minutosPreparacion={item.minutosPreparacion}
            cantidadIngredientes={item.cantidadIngredientes}
            onPress={() => handleRecetaPress(item)}
          />
        )}
      />

      <View style={styles.navButtons}>
        <TouchableOpacity
          onPress={handlePrev}
          style={[styles.button, pagina === 0 && styles.disabled]}
          disabled={pagina === 0}
        >
          <Text style={styles.buttonText}>◀ Anterior</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleNext}
          style={[styles.button, desactivarNext && styles.disabled]}
          disabled={desactivarNext}
        >
          <Text style={styles.buttonText}>Siguiente ▶</Text>
        </TouchableOpacity>
      </View>
      {cargando && <PantallaCarga />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF9F2",
  },
  lista: {
    padding: 16,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFF9F2",
  },
  mensaje: {
    fontSize: 16,
    color: "#555",
  },
  navButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  button: {
    backgroundColor: "#6c7a89",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  disabled: {
    backgroundColor: "#ccc",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 10,
    backgroundColor: "#FFF9F2",
  },

  backArrow: {
    fontSize: 24,
    color: "#333",
    fontWeight: "bold",
  },

  headerTitle: {
    fontSize: 20,
    color: "#333",
    fontWeight: "bold",
    fontFamily: "Poppins-Bold",
  },
});
