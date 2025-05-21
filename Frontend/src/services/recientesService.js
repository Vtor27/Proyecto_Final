import AsyncStorage from "@react-native-async-storage/async-storage";

export const guardarReciente = async (receta) => {
  try {
    const data = await AsyncStorage.getItem("recientes");
    let recientes = data ? JSON.parse(data) : [];

    // Evitar duplicados por el id o por titulo título
    recientes = recientes.filter((rece) => rece.id !== receta.id && rece.titulo !== receta.titulo);
    recientes.unshift(receta);

    if (recientes.length > 5) {
      recientes = recientes.slice(0, 5);
    }

    await AsyncStorage.setItem("recientes", JSON.stringify(recientes));
  } catch (error) {
    console.error("Error al guardar receta reciente:", error);
  }
};
