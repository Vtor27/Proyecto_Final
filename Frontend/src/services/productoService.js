import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = 'http://192.168.1.135:8080/api/producto/buscar?codigo=';

export const buscarProductoPorCodigo = async (codigo) => {
  try {
    const token = await AsyncStorage.getItem('token');
    const response = await fetch(`${API_URL}${codigo}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Producto no encontrado');
    }

    return await response.json();
  } catch (error) {
    throw error;
  }
};
