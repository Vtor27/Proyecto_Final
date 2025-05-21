import React, { useRef, useEffect, useState } from "react";
import {
  Animated,
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Pressable,
  Image,
  Alert,
  ScrollView,
} from "react-native";

import { RecuperarPassword } from "../services/authService";

export default function RecuperarPasswordScreen({
  setMostrarRecuPass,
  setMostrarLogin,
}) {
  const [nombreUser, setNombreUser] = useState("");
  const [nuevaPassword, setNuevaPassword] = useState("");
  const [repetirPassword, setRepetirPassword] = useState("");
  const [errorCoincidencia, setErrorCoincidencia] = useState(false);
  const slideAnim = useRef(new Animated.Value(800)).current;

  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 700,
      useNativeDriver: true,
    }).start();
  }, []);

  const handleGuardar = async () => {
    if (nuevaPassword !== repetirPassword) {
      setErrorCoincidencia(true);
      return;
    }

    setErrorCoincidencia(false);
    try {
      console.log("Datos del usuario que recupera contraseña", {
        nombreUser,
        nuevaPassword,
      });
      const respuesta = await RecuperarPassword(nombreUser, nuevaPassword);
      setMostrarRecuPass(false);
      setMostrarLogin(true);
      Alert.alert("Contraseña cambiada correctamente");
    } catch (error) {
      Alert.alert("No se puedo cambiar la contraseña");
    }
  };

  return (
    <View style={styles.overlay}>
      <Animated.View
        style={[styles.modal, { transform: [{ translateY: slideAnim }] }]}
      >
        <ImageBackground
          source={require("../../assets/images/food_image.jpg")}
          style={styles.background}
          imageStyle={{ opacity: 0.35 }}
        >
          <View style={styles.viewTitle}>
            <Pressable
              style={styles.icon}
              onPress={() => setMostrarRecuPass(false)}
            >
              <Image
                source={require("../../assets/icons/icono_X.png")}
                style={{ width: 35, height: 35 }}
              />
            </Pressable>
            <Text style={styles.title}>Restablecer Contraseña</Text>
          </View>
          <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <View style={styles.view}>
              <Text style={styles.text}>Nombre de usuario</Text>
              <TextInput
                style={styles.input}
                placeholder="Nombre usuario"
                value={nombreUser}
                onChangeText={setNombreUser}
              />

              <Text style={styles.text}>Nueva contraseña</Text>
              <TextInput
                style={styles.input}
                placeholder="********"
                secureTextEntry
                value={nuevaPassword}
                onChangeText={setNuevaPassword}
              />

              <Text style={styles.text}>Repetir contraseña</Text>
              <TextInput
                style={styles.input}
                placeholder="********"
                secureTextEntry
                value={repetirPassword}
                onChangeText={setRepetirPassword}
              />
              {errorCoincidencia && (
                <Text style={styles.error}>Las contraseñas no coinciden.</Text>
              )}
            </View>

            <TouchableOpacity
              style={[styles.button, { backgroundColor: "#F8AFA6" }]}
              onPress={handleGuardar}
            >
              <Text style={styles.buttonText}>Cambiar contraseña</Text>
            </TouchableOpacity>
          </ScrollView>
        </ImageBackground>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "flex-end",
  },
  modal: {
    backgroundColor: "white",
    width: "100%",
    height: "65%",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    overflow: "hidden",
  },
  background: {
    flex: 1,
    paddingHorizontal: 10,
    paddingTop: 10,
  },
  viewTitle: {
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    position: "absolute",
    right: 5,
    top: 0,
  },
  title: {
    fontSize: 30,
    fontFamily: "Siracha-Regular",
    marginBottom: 10,
    textAlign: "center",
  },
  view: {
    padding: 10,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: 10,
    marginTop: 10,
  },
  text: {
    fontSize: 25,
    fontFamily: "Alkatra-Regular",
    color: "#333",
    paddingLeft: 8,
  },
  input: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    height: 50,
    fontSize: 20,
    fontFamily: "Siracha-Regular",
  },
  error: {
    color: "#d32f2f",
    marginLeft: 10,
    fontSize: 14,
  },
  button: {
    marginTop: 20,
    alignSelf: "center",
    justifyContent: "center",
    backgroundColor: "#575144",
    padding: 12,
    borderRadius: 20,
    width: "60%",
    height: 60,
    alignItems: "center",
    borderWidth: 2,
    borderBlockColor: "black",
  },
  buttonText: {
    fontSize: 20,
    fontFamily: "FugazOne-Regular",
    color: "black",
  },
});
