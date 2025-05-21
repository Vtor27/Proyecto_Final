import AsyncStorage from '@react-native-async-storage/async-storage';

const BASE_URL = "http://192.168.1.135:8080/api/recetas";

export const buscarRecetasPorIngredientes = async (
  ingredientes,
  resultadosPorPagina = 15,
  offset = 0,
  lenguaje = "es"
) => {
  try {
    const token = await AsyncStorage.getItem("token");

    const query = ingredientes.join(",");
    console.log("🧪 Query generada:", query);
    const response = await fetch(
      `${BASE_URL}/extendidas?query=${encodeURIComponent(
        query
      )}&resultadosPorPagina=${resultadosPorPagina}&offset=${offset}&lenguaje=${lenguaje}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.status === 204) {
      return [];
    }

    if (!response.ok) {
      throw new Error("Error al obtener recetas del servidor");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("❌ Error al buscar recetas:", error);
    return [];
  }
};





export const obtenerRecetasRecomendadas = async () => {
  console.log("🔍 Llamando a obtenerRecetasRecomendadas...");

  try {
    const token = await AsyncStorage.getItem("token");
    console.log("🔐 Token recuperado:", token);

    const response = await fetch(`${BASE_URL}/recomendadas`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log("📡 Status de respuesta:", response.status);

    if (!response.ok) {
      throw new Error("Error al obtener recetas recomendadas");
    }

    const data = await response.json();
    console.log("📦 Datos recibidos del backend:", data);
    return data;

  } catch (error) {
    console.error("❌ Error en fetch recetas recomendadas:", error);
    return [];
  }
};

export const obtenerRecetaPorId = async (id, idioma = "en") => {
  try {
    const token = await AsyncStorage.getItem("token");
    console.log("Token en obtenerRecetaPorId:", token);
    const response = await fetch(
      `http://192.168.1.135:8080/api/recetas/${id}?lenguaje=${idioma}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log("📡 Respuesta:", response.status);

    if (!response.ok) {
      throw new Error("Error al obtener detalles de la receta");
    }

    const json = await response.json();
    console.log("Detalles recibidos:", json);
    return json;
  } catch (error) {
    console.error("Error en obtenerRecetaPorId:", error);
    return null;
  }
};


