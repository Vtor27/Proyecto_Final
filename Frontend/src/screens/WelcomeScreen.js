import React, { useState } from "react";
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  Image,
  Linking,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import Login from "./Login";
import Registro from "./Registro";
import RecuperarPasswordScreen from "./RecuperarPasswordScreen";

export default function WelcomeScreen({ navigation }) {
  const [mostrarLogin, setMostrarLogin] = useState(false);
  const [mostrarRegistro, setMostrarRegistro] = useState(false);
  const [mostrarRecuPass, setMostrarRecuPass] = useState(false);

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../../assets/images/welScreen_Back.jpg")}
        style={styles.background}
        resizeMode="cover"
      >
        <View style={styles.overlayClaro} />

        <View style={styles.titleBox}>
          <Text style={styles.title}>¡Bienvenid@ a YummyGo!</Text>
        </View>

        <View style={styles.botonera}>
          <TouchableOpacity style={styles.button} onPress={() => setMostrarLogin(true)}>
            <Text style={[styles.buttonText]}>Iniciar Sesión</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.button, {backgroundColor: "#F8AFA6"}]} onPress={() => setMostrarRegistro(true)}>
            <Text style={styles.buttonText}>Registrarse</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.iconos}>
          <Pressable onPress={() => Linking.openURL("https://spoonacular.com/")}>
            <Image source={require("../../assets/icons/icono_spoon.png")} style={{ width: 80, height: 80 }} />
          </Pressable>

          <Pressable onPress={() => Linking.openURL("https://world.openfoodfacts.org/")}>
            <Image source={require("../../assets/icons/icono_open.webp")} style={{ width: 90, height: 90 }} />
          </Pressable>
        </View>
      </ImageBackground>
      {mostrarLogin && (
        <Login
          navigation={navigation}
          setMostrarLogin={setMostrarLogin}
          setMostrarRegistro={setMostrarRegistro}
          setMostrarRecuperar={setMostrarRecuPass}
        />
      )}

      {mostrarRegistro && (
        <Registro
          navigation={navigation}
          setMostrarRegistro={setMostrarRegistro}
          setMostrarLogin={setMostrarLogin}
        />
      )}

      {mostrarRecuPass && (
        <RecuperarPasswordScreen setMostrarRecuPass={setMostrarRecuPass} setMostrarLogin={setMostrarLogin}/>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
    justifyContent: "center",
  },
  overlayClaro: {
    position: "absolute",
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
    backgroundColor: "rgba(255, 255, 255, 0.4)",
  },
  titleBox: {
    paddingBottom: 40,
  },
  title: {
    fontSize: 60,
    fontFamily: "Siracha-Regular",
    marginBottom: 60,
    color: "#333",
    textAlign: "center",
  },
  botonera: {
    alignItems: "center",
    paddingHorizontal: 20,
  },
  button: {
    backgroundColor: "#A4D4AE",
    padding: 15,
    borderRadius: 10,
    width: "80%",
    marginVertical: 10,
    alignItems: "center",
    borderWidth: 2,
    borderBlockColor: "black"
  },
  buttonText: {
    color: "black",
    fontSize: 25,
    fontFamily: "FugazOne-Regular",
    
  },
  iconos: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    paddingTop: 70,
  },
});
