import React, { useRef, useEffect, useState } from "react";
import {
  Animated,
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Pressable,
  Image,
  ImageBackground,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { registrarUsuario } from "../services/authService";

export default function Registro({
  navigation,
  setMostrarRegistro,
  setMostrarLogin,
}) {
  const slideAnim = useRef(new Animated.Value(800)).current;
  const [email, setEmail] = useState("");
  const [usuario, setUsuario] = useState("");
  const [contraseña, setContraseña] = useState("");
  const [confirmar, setConfirmar] = useState("");
  const [error, setError] = useState(false);

  const [open, setOpen] = useState(false);
  const [ingredientes, setIngredientes] = useState([]);
  const [items, setItems] = useState([
    { label: "Pollo", value: "chicken" },
    { label: "Tomate", value: "tomato" },
    { label: "Pasta", value: "pasta" },
    { label: "Queso", value: "cheese" },
    { label: "Arroz", value: "rice" },
    { label: "Huevo", value: "egg" },
  ]);

  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 700,
      useNativeDriver: true,
    }).start();
  }, []);

  const handleRegistro = async () => {
    if (contraseña !== confirmar) {
      setError(true);
      return;
    }

    if (ingredientes.length < 1 || ingredientes.length > 3) {
      Alert.alert(
        "Error",
        "Debes seleccionar entre 1 y 3 ingredientes favoritos."
      );
      return;
    }

    setError(false);

    try {
      const respuesta = await registrarUsuario(
        usuario,
        email,
        contraseña,
        ingredientes,
        "es"
      );

      Alert.alert("Registro exitoso", respuesta);
      setMostrarRegistro(false);
      setMostrarLogin(true);
    } catch (error) {
      console.error("Error en el registro:", error);
      Alert.alert("Error", error || "No se pudo registrar.");
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
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={{ flex: 1 }}
          >
            <View style={styles.viewTitle}>
              <Pressable
                style={styles.icon}
                onPress={() => setMostrarRegistro(false)}
              >
                <Image
                  source={require("../../assets/icons/icono_X.png")}
                  style={{ width: 35, height: 35 }}
                />
              </Pressable>
              <Text style={styles.title}>Registro</Text>
            </View>

            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
              <View style={[styles.view, { zIndex: 1000 }]}>
                <Text style={styles.label}>Usuario</Text>
                <TextInput
                  style={styles.input}
                  value={usuario}
                  onChangeText={setUsuario}
                  placeholder="UserName / ejemplo@ejemplo.com"
                />

                <Text style={styles.label}>Email</Text>
                <TextInput
                  style={styles.input}
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  placeholder="ejemplo@ejemplo.com"
                />

                <Text style={styles.label}>Contraseña</Text>
                <TextInput
                  style={styles.input}
                  value={contraseña}
                  onChangeText={setContraseña}
                  secureTextEntry
                  placeholder="***********"
                />

                <Text style={styles.label}>Repetir contraseña</Text>
                <TextInput
                  style={styles.input}
                  value={confirmar}
                  onChangeText={setConfirmar}
                  secureTextEntry
                  placeholder="***********"
                />

                <Text style={styles.label}>Ingredientes favoritos</Text>
                <DropDownPicker
                  open={open}
                  value={ingredientes}
                  items={items}
                  setOpen={setOpen}
                  setValue={setIngredientes}
                  setItems={setItems}
                  multiple={true}
                  min={1}
                  max={3}
                  mode="BADGE"
                  placeholder="Selecciona ingredientes favoritos"
                  badgeDotColors={["#F1948A", "#85C1E9", "#82E0AA"]}
                  listMode="MODAL"
                  modalTitle="Elige tus ingredientes favoritos"
                  modalProps={{
                    animationType: "slide",
                    presentationStyle: "overFullScreen",
                    transparent: true,
                  }}
                  modalContentContainerStyle={{
                    backgroundColor: "#fffdf7",
                    padding: 15,
                    borderRadius: 10,
                  }}
                  style={{
                    borderColor: "#ccc",
                    marginBottom: open ? 150 : 20,
                    backgroundColor: "#fff",
                    zIndex: 1000,
                  }}
                  dropDownContainerStyle={{
                    borderColor: "#ccc",
                    backgroundColor: "#fff",
                    zIndex: 1000,
                  }}
                />

                {error && (
                  <Text style={styles.error}>
                    Las contraseñas no coinciden.
                  </Text>
                )}
              </View>

              <TouchableOpacity
                style={[styles.button, { backgroundColor: "#F8AFA6" }]}
                onPress={handleRegistro}
              >
                <Text style={styles.buttonText}>Registrarse</Text>
              </TouchableOpacity>
            </ScrollView>
          </KeyboardAvoidingView>
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
    height: "75%",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    overflow: "hidden",
  },
  background: {
    flex: 1,
    paddingHorizontal: 10,
    paddingTop: 10,
  },
  icon: {
    position: "absolute",
    right: 5,
    top: 0,
  },
  title: {
    fontSize: 45,
    fontFamily: "Siracha-Regular",
    textAlign: "center",
  },
  viewTitle: {
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  view: {
    padding: 10,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: 10,
  },
  label: {
    fontSize: 25,
    fontFamily: "Alkatra-Regular",
    marginTop: 8,
    color: "#333",
  },
  input: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 10,
    marginBottom: 6,
    height: 50,
    fontSize: 20,
    fontFamily: "Siracha-Regular",
  },
  error: {
    color: "#d32f2f",
    marginTop: 5,
    marginLeft: 6,
  },
  button: {
    marginTop: 5,
    alignSelf: "center",
    backgroundColor: "#575144",
    padding: 12,
    borderRadius: 20,
    width: 250,
    alignItems: "center",
    borderWidth: 2,
    borderBlockColor: "black",
  },
  buttonText: {
    fontSize: 30,
    fontFamily: "FugazOne-Regular",
    color: "black",
  },
});
