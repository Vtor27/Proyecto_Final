import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import WelcomeScreen from "../screens/WelcomeScreen";
import TabNavigator from "./TabNavigator";
import Login from "../screens/Login";
import Registro from "../screens/Registro";
import ProductoScreen from "../screens/ProductoScreen";
import RecetaScreen from "../screens/RecetaScreen";
import ModalProductFav from "../components/ModalProductFav";
import BusquedaRecetasScreen from "../screens/BusquedaRecetasScreen";
import PerfilScreen from "../screens/PerfilScreen";
import RecuperarPasswordScreen from "../screens/RecuperarPasswordScreen";

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="WelcomeScreen"
        component={WelcomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{
          presentation: "modal",
          title: "Iniciar sesión",
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Registro"
        component={Registro}
        options={{
          presentation: "modal",
          title: "Registrar usuario",
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="App"
        component={TabNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Resultados"
        component={BusquedaRecetasScreen}
        options={{ title: "Resultados de recetas", headerShown: false}}
      />
      <Stack.Screen name="Producto" component={ProductoScreen} />
      <Stack.Screen
        name="DetalleReceta"
        component={RecetaScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="DetalleProductoFavorito"
        component={ModalProductFav}
        options={{ title: "Detalle del producto", headerShown: false }}
      />
      <Stack.Screen
        name="PerfilScreen"
        component={PerfilScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="RecuperarPasswordScreen"
        component={RecuperarPasswordScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
