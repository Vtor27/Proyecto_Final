import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  View,
  Text,
  StyleSheet,
  Pressable,
  Image,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { TextInput } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { loginUsuario } from "../services/authService";
import PantallaCarga from "./utils/PantallaCarga";
import PantallaError from "../components/PantallaError";

export default function Login({
  navigation,
  setMostrarLogin,
  setMostrarRegistro,
  setMostrarRecuperar,
}) {
  const [emailOUser, setEmailOUser] = useState("");
  const [password, setPassword] = useState("");
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState(false);

  const slideAnimation = useRef(new Animated.Value(800)).current;

  useEffect(() => {
    Animated.timing(slideAnimation, {
      toValue: 0,
      duration: 700,
      useNativeDriver: true,
    }).start();
  }, []);

  const handleLogin = async () => {
    setCargando(true);
    try {
      const respuesta = await loginUsuario(emailOUser, password);
      await AsyncStorage.setItem("token", respuesta.token);
      await AsyncStorage.setItem("nombreUsuario", respuesta.nombreUsuario);
      navigation.navigate("App");
    } catch (error) {
      setError(true);
    } finally {
      setCargando(false);
    }
  };

  return (
    <View style={styles.overlay}>
      {cargando && <PantallaCarga />}
      <Animated.View
        style={[styles.modal, { transform: [{ translateY: slideAnimation }] }]}
      >
        <ImageBackground
          source={require("../../assets/images/food_image.jpg")}
          style={styles.background}
          imageStyle={{ opacity: 0.4 }}
          resizeMode="cover"
        >
          <View style={styles.viewTitle}>
            <Pressable
              style={styles.icon}
              onPress={() => setMostrarLogin(false)}
            >
              <Image
                style={{ width: 35, height: 35 }}
                source={require("../../assets/icons/icono_X.png")}
              />
            </Pressable>
            <Text style={styles.title}>Login</Text>
          </View>

          <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <View style={styles.view}>
              <Text style={styles.text}>Nombre de Usuario / Email</Text>
              <TextInput
                style={styles.input}
                placeholder="UserName / ejemplo@ejemplo.com"
                value={emailOUser}
                onChangeText={setEmailOUser}
                keyboardType="email-address"
              />
              <Text style={styles.text}>Contraseña</Text>
              <TextInput
                style={styles.input}
                placeholder="***********"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={true}
              />
            </View>

            <Pressable
              style={styles.recuPass}
              onPress={() => {
                setMostrarLogin(false);
                setMostrarRecuperar(true);
              }}
            >
              <Text style={styles.textRecu}>¿Has olvidado la contraseña?</Text>
            </Pressable>

            <View style={styles.botonera}>
              <TouchableOpacity
                style={[styles.button, { backgroundColor: "#A4D4AE" }]}
                onPress={handleLogin}
              >
                <Text style={styles.textButton}>Entrar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, { backgroundColor: "#F8AFA6" }]}
                onPress={() => {
                  setMostrarLogin(false);
                  setMostrarRegistro(true);
                }}
              >
                <Text style={styles.textButton}>Registrarse</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </ImageBackground>
      </Animated.View>
      {error && (
        <View style={StyleSheet.absoluteFillObject}>
          <PantallaError
            mensaje="No se pudo iniciar sesión."
            onCerrar={() => setError(false)}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "flex-end",
  },
  background: {
    flex: 1,
    justifyContent: "flex-start",
    paddingHorizontal: 10,
    paddingTop: 10,
  },
  modal: {
    backgroundColor: "white",
    width: "100%",
    height: "65%",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    overflow: "hidden",
  },
  header: {
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    marginBottom: 20,
  },
  title: {
    fontSize: 45,
    textAlign: "center",
    fontFamily: "Siracha-Regular",
    marginBottom: 5,
  },
  closeButton: {
    position: "absolute",
    top: 0,
    right: 10,
  },
  form: {
    marginBottom: 20,
  },
  label: {
    fontWeight: "bold",
    marginBottom: 5,
    paddingLeft: 8,
    fontSize: 20,
  },
  input: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
    height: 50,
    fontSize: 20,
    fontFamily: "Siracha-Regular",
  },
  button: {
    borderRadius: 20,
    alignSelf: "center",
    width: "60%",
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#575144",
    marginVertical: 10,
    borderWidth: 2,
    borderBlockColor: "black",
  },
  textButton: {
    fontSize: 30,
    fontFamily: "FugazOne-Regular",
    color: "black",
  },
  icon: {
    position: "absolute",
    right: 5,
    top: 0,
  },
  view: {
    padding: 10,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: 10,
  },
  viewTitle: {
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 25,
    fontFamily: "Alkatra-Regular",
    color: "Black",
    paddingLeft: 8,
  },
  recuPass: {
    alignSelf: "flex-end",
  },
  textRecu: {
    color: "blue",
    fontSize: 18,
    padding: 10,
    textDecorationLine: "underline",
    fontFamily: "Siracha-Regular",
  },
});
