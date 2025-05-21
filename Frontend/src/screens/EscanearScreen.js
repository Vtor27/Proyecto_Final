import React, { useState, useEffect, useRef } from "react";

import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Pressable,
} from "react-native";
import { Camera, CameraView } from "expo-camera";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import ModalProducto from "./ProductoScreen";
import { buscarProductoPorCodigo } from "../services/productoService";
import PantallaCarga from "./utils/PantallaCarga"
import PantallaError from "../components/PantallaError";

export default function EscanearScreen() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [codigo, setCodigo] = useState("");
  const [manual, setManual] = useState("");
  const [flash, setFlash] = useState("off");
  const [modalVisible, setModalVisible] = useState(false);
  const [producto, setProducto] = useState(null);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState(false);

  const cameraRef = useRef(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const manejarEscaneo = async ({ type, data }) => {
    setScanned(true);
    setCodigo(data);
    setCargando(true);
    try {
      const productoEncontrado = await buscarProductoPorCodigo(data);
      setProducto(productoEncontrado);
      setModalVisible(true);
    } catch (error) {
      console.error("Error al recibir el producto:", error);
      setError(true);
      setScanned(false);
      setCodigo("");
    } finally{
      setCargando(false);
    }
  };

  const manejarBusquedaManual = async () => {
    setCargando(true);
    try {
      const productoEncontrado = await buscarProductoPorCodigo(manual);
      setProducto(productoEncontrado);
      setModalVisible(true);
    } catch (error) {
      console.error("Error al recibir el producto:", error);
      setError(true);
      setScanned(false);
      setCodigo("");
    } finally{
      setCargando(false);
    }
  };

  // //NO FUNCIONA
  // const toggleFlash = () => {
  //   setFlash((prev) => (prev === "torch" ? "off" : "torch"));
  // };

  if (hasPermission === null) return <Text>Solicitando permisos...</Text>;
  if (hasPermission === false) return <Text>Permiso denegado.</Text>;

  if (error) {
      return (
        <PantallaError mensaje="Producto no encontrado o código erroneo." 
        onCerrar={() => setError(false)}/>
      );
    }

  return (
    <View style={styles.container}>
      <View style={styles.camaraContainer}>
        <View style={styles.enfoque} pointerEvents="none" />
        <CameraView
          ref={cameraRef}
          onBarcodeScanned={scanned ? undefined : manejarEscaneo}
          style={styles.camara}
          flash={flash}
          facing="back"
          barcodeScannerSettings={{
            barcodeTypes: ["ean13", "ean8"],
          }}
        />
        {/* <TouchableOpacity style={styles.flashButton} onPress={toggleFlash}>
          <Ionicons
            name={flash === "torch" ? "flash" : "flash-off"}
            size={28}
            color="white"
          />
        </TouchableOpacity> */}
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Introduce el código manualmente</Text>
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Buscar un producto"
            value={manual}
            onChangeText={setManual}
            placeholderTextColor="#aaa"
          />

          <Pressable
            onPress={() => setManual("")}
            style={styles.clearButton}
          >
            <Ionicons name="close" size={18} color="black" />
          </Pressable>

          <TouchableOpacity
            style={styles.searchButton}
            onPress={manejarBusquedaManual}
          >
            <Ionicons name="search" size={20} color="black" />
          </TouchableOpacity>
        </View>
      </View>
      <ModalProducto
        visible={modalVisible}
        onClose={() => {
          setModalVisible(false);
          setProducto(null);
          setScanned(false);
          setCodigo("");
        }}
        producto={producto}
      />
      {cargando && <PantallaCarga />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#FFF6F0",
  },
  camaraContainer: {
    height: "60%",
    width: "95%",
    borderWidth: 2,
    borderColor: "#E8DCC9",
    borderRadius: 15,
    overflow: "hidden",
    marginHorizontal: 10,
    position: "relative",
    backgroundColor: "#000",
  },
  camara: {
    flex: 1,
  },
  flashButton: {
    position: "absolute",
    bottom: 15,
    right: 15,
    backgroundColor: "rgba(0,0,0,0.5)",
    padding: 10,
    borderRadius: 30,
  },
  enfoque: {
    position: "absolute",
    top: "25%",
    left: "10%",
    width: "80%",
    height: "50%",
    borderWidth: 3,
    borderColor: "rgba(255,255,255,0.6)",
    backgroundColor: "rgba(255,255,255,0.08)",
    borderRadius: 12,
    zIndex: 10,
  },
  card: {
    backgroundColor: "##FFF6F0",
    borderWidth: 2,
    borderColor: "#E8DCC9",
    marginHorizontal: 16,
    marginVertical: 10,
    padding: 20,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  label: {
    fontSize: 20,
    fontFamily: "Siracha-Regular",
    marginBottom: 8,
    fontWeight: "600",
    textAlign: "center",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 30,
    overflow: "hidden",
    backgroundColor: "#F8F8F8",
    marginTop: 10,
    borderWidth: 2,
    borderBlockColor: "black"
  },
  searchInput: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 16,
    fontSize: 16,
    color: "#000",
    
  },
  searchButton: {
    backgroundColor: "#A4D4AE",
    padding: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  clearButton: {
    backgroundColor: "#B79C7F",
    width: 22,
    height: 22,
    borderRadius: 11,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 4,
    borderWidth: 2,
    borderBlockColor: "black"
  },
});
