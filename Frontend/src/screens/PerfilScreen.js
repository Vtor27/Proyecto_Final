import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import DropDownPicker from "react-native-dropdown-picker";
import { useNavigation } from "@react-navigation/native";

import PantallaCarga from "./utils/PantallaCarga";

import {
  obtenerPerfilUsuario,
  actualizarPerfilUsuario,
} from "../services/usuarioService";

export default function PerfilScreen() {
  const navigation = useNavigation();

  const [perfil, setPerfil] = useState(null);
  const [editandoCampo, setEditandoCampo] = useState(null);

  const [editandoIngredientes, setEditandoIngredientes] = useState(false);
  const [openIngredientes, setOpenIngredientes] = useState(false);
  const [nuevaContraseña, setNuevaContraseña] = useState("");

  const [alimentosFavoritos, setAlimentosFavoritos] = useState([]);
  const [ingredientes, setIngredientes] = useState([
    { label: "Tomate", value: "tomatoe" },
    { label: "Pollo", value: "chicken" },
    { label: "Ternera", value: "veal" },
    { label: "Arroz", value: "rice" },
    { label: "Pasta", value: "pasta" },
    { label: "Queso", value: "cheese" },
    { label: "Leche", value: "milk" },
    { label: "Huevo", value: "egg" },
    { label: "Pan", value: "bread" },
    { label: "Legumbres", value: "legumes" },
    { label: "Pimiento", value: "pepper" },
    { label: "Verduras", value: "vegetables" },
    { label: "Jamón", value: "ham" },
  ]);

  const ingredientesTraducidos = {
    tomatoe: "Tomate",
    chicken: "Pollo",
    veal: "Ternera",
    rice: "Arroz",
    pasta: "Pasta",
    cheese: "Queso",
    milk: "Leche",
    egg: "Huevo",
    bread: "Pan",
    legumes: "Legumbres",
    pepper: "Pimiento",
    vegetables: "Verduras",
    ham: "Jamón",
  };

  useEffect(() => {
    const cargarPerfil = async () => {
      try {
        const data = await obtenerPerfilUsuario();
        setPerfil(data);
        setAlimentosFavoritos(data.alimentosFavoritos);
      } catch (error) {
        Alert.alert("Error", "No se pudo cargar el perfil.");
      }
    };

    cargarPerfil();
  }, []);

  const guardarCambios = async () => {
    if (
      !alimentosFavoritos ||
      alimentosFavoritos.length < 1 ||
      alimentosFavoritos.length > 3
    ) {
      Alert.alert(
        "Error",
        "Debes seleccionar entre 1 y 3 ingredientes favoritos."
      );
      return;
    }

    try {
      const datosActualizados = {
        ...perfil,
        nuevaContraseña,
        alimentosFavoritos,
      };

      await actualizarPerfilUsuario(datosActualizados);
      setPerfil(datosActualizados);
      setEditandoCampo(null);
      setEditandoIngredientes(false);
      setNuevaContraseña("");
      Alert.alert("Perfil actualizado correctamente");
    } catch (error) {
      Alert.alert("Error", "No se pudo actualizar el perfil.");
    }
  };

  const cerrarSesion = () => {
    navigation.reset({ index: 0, routes: [{ name: "WelcomeScreen" }] });
  };
  if (!perfil) {
    return <PantallaCarga />;
  }

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}
          >
            <Ionicons name="arrow-back" size={40} color="#333" />
          </TouchableOpacity>

          <View style={styles.centerHeader}>
            <Ionicons
              name="person-circle-outline"
              size={40}
              color="#444"
              style={{ marginRight: 6, marginTop: 15 }}
            />
            <Text style={styles.title}>Perfil</Text>
          </View>
        </View>

        <View style={styles.row}>
          <Ionicons
            name="person-outline"
            size={20}
            color="#444"
            style={{ marginRight: 6 }}
          />
          <TextInput
            style={[styles.input, { flex: 1 }]}
            placeholder="Nombre de usuario"
            value={perfil.nombreUsuario}
            onChangeText={(text) =>
              setPerfil({ ...perfil, nombreUsuario: text })
            }
          />
        </View>

        <View style={styles.row}>
          <Ionicons
            name="mail-outline"
            size={20}
            color="#444"
            style={{ marginRight: 6 }}
          />
          <TextInput
            style={[styles.input, { flex: 1 }]}
            placeholder="Correo electrónico"
            value={perfil.email}
            onChangeText={(text) => setPerfil({ ...perfil, email: text })}
          />
        </View>

        <View style={styles.row}>
          <Ionicons
            name="lock-closed-outline"
            size={20}
            color="#444"
            style={{ marginRight: 6 }}
          />
          <TextInput
            style={[styles.input, { flex: 1 }]}
            placeholder="********"
            value={nuevaContraseña}
            onChangeText={setNuevaContraseña}
            secureTextEntry
          />
        </View>

        <Text style={styles.label}>Ingredientes favoritos:</Text>
        {editandoIngredientes ? (
          <DropDownPicker
            open={openIngredientes}
            value={alimentosFavoritos}
            items={ingredientes}
            setOpen={setOpenIngredientes}
            setValue={setAlimentosFavoritos}
            setItems={setIngredientes}
            multiple={true}
            min={1}
            max={3}
            mode="BADGE"
            placeholder="Selecciona alimentos favoritos"
            badgeDotColors={["red", "green", "orange"]}
            listMode="MODAL"
            modalTitle="Elige tus ingredientes favoritos"
            modalProps={{
              animationType: "slide",
              presentationStyle: "overFullScreen",
              transparent: true,
            }}
            modalContentContainerStyle={styles.modalContent}
            style={styles.dropdown}
            dropDownContainerStyle={styles.dropdownContainer}
          />
        ) : (
          <View style={styles.chipContainer}>
            {perfil.alimentosFavoritos.map((item, idx) => (
              <View key={idx} style={styles.chip}>
                <Text style={styles.chipText}>
                  {ingredientesTraducidos[item]}
                </Text>
              </View>
            ))}
          </View>
        )}

        <TouchableOpacity
          onPress={() => setEditandoIngredientes(!editandoIngredientes)}
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 20,
          }}
        >
          <Ionicons
            name={editandoIngredientes ? "checkmark" : "create-outline"}
            size={20}
            color="#007AFF"
          />
          <Text style={{ color: "#007AFF", marginLeft: 6 }}>
            {editandoIngredientes
              ? "Guardar ingredientes"
              : "Editar ingredientes"}
          </Text>
        </TouchableOpacity>

        <Text style={styles.label}>Fecha de registro:</Text>
        <Text style={styles.fecha}>{perfil.fechaRegistro}</Text>

        <Text style={styles.label}>Idioma de traducción:</Text>
        <Text style={styles.fecha}>Español</Text>

        <TouchableOpacity style={styles.button} onPress={guardarCambios}>
          <View style={styles.buttonContent}>
            <Ionicons name="save-outline" size={22} color="black" />
            <Text style={styles.buttonText}>Guardar cambios</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.logoutButton} onPress={cerrarSesion}>
          <View style={styles.buttonContent}>
            <Ionicons name="log-out-outline" size={22} color="black" />
            <Text style={styles.buttonText}>Cerrar sesión</Text>
          </View>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#FFF6F0",
    flexGrow: 1,
  },
  header: {
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  marginBottom: 30,
  position: "relative",
  height: 50,
},

backButton: {
  position: "absolute",
  left: 0,
  top: 0,
  padding: 10,
  zIndex: 10,
},

centerHeader: {
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
  flex: 1,
},

  title: {
    fontSize: 40,
    fontFamily: "Siracha-Regular",
    textAlign: "center",
    marginBottom: -10,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 12,
    marginBottom: 12,
    borderRadius: 8,
    borderColor: "#ccc",
    borderWidth: 1,
    gap: 10,
  },
  input: {
    flex: 1,
    fontSize: 20,
    color: "#333",
  },
  text: {
    flex: 1,
    fontSize: 16,
    color: "#333",
  },
  iconProfile: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 30,
  },
  label: {
    fontSize: 20,
    fontFamily: "Siracha-Regular",
    fontWeight: "600",
    marginBottom: 5,
    color: "#333",
  },
  fecha: {
    backgroundColor: "#eee",
    padding: 10,
    borderRadius: 8,
    marginBottom: 20,
    fontSize: 16,
    color: "#555",
  },
  dropdown: {
    borderColor: "#ccc",
    backgroundColor: "#fff",
  },
  dropdownContainer: {
    borderColor: "#ccc",
  },
  modalContent: {
    padding: 20,
    backgroundColor: "#fff9f2",
  },
  chipContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 10,
  },
  chip: {
    backgroundColor: "#E8DCC9",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  chipText: {
    fontSize: 14,
    color: "#333",
    fontWeight: "500",
  },
  button: {
    backgroundColor: "#B79C7F",
    padding: 12,
    borderRadius: 8,
    marginTop: 20,
    borderWidth: 2,
    borderBlockColor: "black"
  },
  logoutButton: {
    backgroundColor: "#A75D5D",
    padding: 12,
    borderRadius: 8,
    marginTop: 10,
    borderWidth: 2,
    borderBlockColor: "black"
  },
  buttonText: {
    color: "black",
    textAlign: "center",
    fontFamily: "FugazOne-Regular",
    fontSize: 20,
    marginLeft: 5,
  },
  buttonContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    
  },
});
