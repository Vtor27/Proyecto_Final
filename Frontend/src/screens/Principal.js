import React, { useState, useEffect, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Keyboard,
  ScrollView,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";

import { obtenerRecetasRecomendadas } from "../services/recetasService";
import CardReceta from "../components/CardReceta";
import PantallaCarga from "./utils/PantallaCarga";
import PantallaError from "../components/PantallaError";

export default function PantallaPrincipal({ navigation }) {
  const [usuario, setUsuario] = useState("");
  const [input, setInput] = useState("");
  const [ingredientes, setIngredientes] = useState([]);
  const [recetasRecomendadas, setRecetasRecomendadas] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(false);

  const agregarIngrediente = () => {
    const limpio = input.trim().toLowerCase();
    if (limpio && !ingredientes.includes(limpio)) {
      setIngredientes([...ingredientes, limpio]);
    }
    setInput("");
    Keyboard.dismiss();
  };

  const eliminarIngrediente = (item) => {
    setIngredientes(ingredientes.filter((ing) => ing !== item));
  };

  const buscarRecetas = () => {
    if (ingredientes.length === 0) return;
    navigation.navigate("Resultados", { ingredientes });
  };

  useFocusEffect(
    useCallback(() => {
      const cargarDatos = async () => {
        setCargando(true);
        setError(false);
        try {
          const recetas = await obtenerRecetasRecomendadas();
          console.log("Datos recibidos del backend:", recetas);

          setRecetasRecomendadas(recetas);

          const nombre = await AsyncStorage.getItem("nombreUsuario");
          setUsuario(nombre);
        } catch (error) {
          console.error("Error al cargar datos:", error);
          setError(true);
        } finally {
          setCargando(false);
        }
      };
      cargarDatos();
    }, [])
  );

  if (error) {
    return (
      <PantallaError
        mensaje="No se pudieron cargar las recetas. Revisa tu conexión."
        onCerrar={() => navigation.goBack()}
      />
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.hola}>
          Hola, <Text style={styles.username}>{usuario}</Text>
        </Text>
        <TouchableOpacity onPress={() => navigation.navigate("PerfilScreen")}>
          <Ionicons name="person-circle-outline" size={60} color="#444" />
        </TouchableOpacity>
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Añadir ingrediente"
          value={input}
          onChangeText={setInput}
          placeholderTextColor="#999"
          onSubmitEditing={agregarIngrediente}
        />
        <TouchableOpacity onPress={agregarIngrediente}  style={[styles.addButton, {backgroundColor: "#F8AFA6"}]}>
          <Ionicons name="add" size={20} color="black" />
        </TouchableOpacity>
      </View>

      <View style={styles.tagContainer}>
        {ingredientes.map((item) => (
          <View key={item} style={styles.tag}>
            <Text style={styles.tagText}>{item}</Text>
            <TouchableOpacity onPress={() => eliminarIngrediente(item)}>
              <Ionicons name="close" size={14} color="#fff" />
            </TouchableOpacity>
          </View>
        ))}
      </View>

      <TouchableOpacity style={[styles.buscarButton, {backgroundColor: "#F8AFA6"}]} onPress={buscarRecetas}>
        <Text style={styles.buscarText}>Buscar recetas</Text>
      </TouchableOpacity>

      <ScrollView style={styles.scroll} nestedScrollEnabled={true}>
        <Text style={styles.seccion}>Recetas recomendadas</Text>
        <FlatList
          data={recetasRecomendadas}
          keyExtractor={(item, index) => index.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.flatList}
          renderItem={({ item }) => (
            <CardReceta
              titulo={item.titulo}
              imagenUrl={item.imagenUrl}
              minutosPreparacion={item.minutosPreparacion}
              raciones={item.raciones}
              onPress={() => {
                navigation.navigate("DetalleReceta", { idReceta: item.id });
              }}
            />
          )}
        />

        <Text style={styles.seccion}>Vistas recientemente</Text>
        <Text style={styles.recientes}>Proximamente...</Text>
      </ScrollView>

      {cargando && <PantallaCarga />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF6F0",
    paddingTop: 20,
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  hola: {
    fontSize: 40,
    fontWeight: "500",
    fontFamily: "Siracha-Regular",
    color: "#555",
  },
  username: {
    fontFamily: "Siracha-Regular",
    color: "black",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f1f1f1",
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginBottom: 16,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: "#333",
  },
  addButton: {
    padding: 8,
    borderRadius: 8,
    marginLeft: 8,
    borderWidth: 2,
    borderBlockColor: "black"
  },
  tagContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 20,
  },
  tag: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#777",
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 16,
    marginRight: 6,
    marginBottom: 6,
  },
  tagText: {
    color: "#fff",
    marginRight: 6,
  },
  buscarButton: {
    fontFamily: "FugazOne-Regular",
    padding: 14,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 24,
    borderWidth: 2,
    borderBlockColor: "black"
  },
  buscarText: {
    color: "black",
    fontFamily: "FugazOne-Regular",
    fontSize: 25,
    
  },
  seccion: {
    fontSize: 35,
    fontFamily: "Siracha-Regular",
    marginBottom: 12,
  },
  flatList: {
    paddingLeft: 2,
    paddingRight: 12,
    paddingBottom: 12,
  },
  scroll: {
    marginBottom: 70,
  },
  recientes: {
    fontSize: 20,
    color: "lightgrey",
  },
});
