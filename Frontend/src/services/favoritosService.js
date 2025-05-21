import AsyncStorage from "@react-native-async-storage/async-storage";

const API_URL = "http://192.168.1.135:8080/api/favoritos";

export const guardarRecetaFavorita = async (receta) => {
  try {
    const token = await AsyncStorage.getItem("token");

    const response = await fetch(`${API_URL}/receta`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(receta),
    });

    if (!response.ok) {
      throw new Error("Error al guardar receta");
    }

    return await response.text();
  } catch (error) {
    console.error("Error al guardar receta:", error);
    throw error;
  }
};



export const obtenerRecetasFavoritas = async () => {
  try {
    const token = await AsyncStorage.getItem("token");
    const response = await fetch(`${API_URL}/recetas`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status === 204) {
      console.log("⚪ Lista vacía");
      return [];
    }

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Error del backend:", errorText);
      throw new Error("Error al obtener recetas favoritas");
    }

    return await response.json();
  } catch (error) {
    console.error("Error al obtener recetas favoritas:", error);
    return [];
  }
};




export const eliminarRecetaFavorita = async (id) => {
  try {
    const token = await AsyncStorage.getItem("token");
    const response = await fetch(
      `${API_URL}/receta/${id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) throw new Error("No se pudo eliminar la receta");

    return true;
  } catch (error) {
    console.error("Error al eliminar la receta:", error);
    return false;
  }
};




// PRODUCTOS

export const guardarProductoFavorito = async (producto) => {
  const token = await AsyncStorage.getItem("token");
  await fetch(`${API_URL}/producto`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(producto),
  });
};

export const obtenerProductosFavoritos = async () => {
  const token = await AsyncStorage.getItem("token");
  const res = await fetch(`${API_URL}/productos`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (res.status === 204) return [];

  if (!res.ok) {
    throw new Error("Error al obtener productos favoritos");
  }

  return await res.json();
};


export const eliminarProductoFavorito = async (nombre) => {
  const token = await AsyncStorage.getItem("token");
  await fetch(`${API_URL}/producto/${encodeURIComponent(nombre)}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });
};