import AsyncStorage from "@react-native-async-storage/async-storage";

const API_URL = "http://192.168.1.135:8080/api";

export const obtenerPerfilUsuario = async () => {
  try {
    const token = await AsyncStorage.getItem("token");
    console.log("Token cargado:", token);
    const response = await fetch(`${API_URL}/users/perfil`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const texto = await response.text();

    if (!response.ok) throw new Error(texto);
    return JSON.parse(texto);
  } catch (error) {
    console.error("Error al obtener el perfil:", error);
    throw error;
  }
};

export const actualizarPerfilUsuario = async (datosActualizados) => {
  try {
    const token = await AsyncStorage.getItem("token");
    const response = await fetch(`${API_URL}/users/perfil`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(datosActualizados),
    });

    const texto = await response.text();

    if (!response.ok) throw new Error(texto);
    return texto;
  } catch (error) {
    console.error("Error al actualizar el perfil:", error);
    throw error;
  }
};
