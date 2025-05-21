import AsyncStorage from "@react-native-async-storage/async-storage";

const API_URL = "http://192.168.1.135:8080/auth";

export const loginUsuario = async (identificador, contraseña) => {
  const response = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ identificador, contraseña }),
  });

const texto = await response.text();

  if (!response.ok) throw new Error(texto);

  const data = JSON.parse(texto);
  return data;
};

export const registrarUsuario = async (
  nombreUsuario,
  email,
  contraseña,
  alimentosFavoritos,
  idioma
) => {
  const response = await fetch(`${API_URL}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      nombreUsuario,
      email,
      contraseña,
      alimentosFavoritos,
      idioma
    }),
  });

  const data = await response.text();
  if (!response.ok) throw new Error(data);
  return data;
};

export const cerrarSesion = async () => {
  await AsyncStorage.removeItem("token");
};


export const RecuperarPassword = async (nombreUser, nuevaPassword) => {
  const payload = { nombreUser, nuevaPassword };

  const response = await fetch(`${API_URL}/recu-pass`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const texto = await response.text();
  console.log("🔍 Respuesta backend:", texto); 

  if (!response.ok) {
    console.error("ERROR al hacer el fetch:", texto); 
    throw new Error(texto);
  }

  return texto;
};


