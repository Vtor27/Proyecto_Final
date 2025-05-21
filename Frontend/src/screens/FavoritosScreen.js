import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import RecetasFavoritas from "../navigation/tabFavoritos/RecetasFavoritas";
import ProductosFavoritos from "../navigation/tabFavoritos/ProductosFavoritos";

const Tab = createMaterialTopTabNavigator();

export default function FavoritosScreen() {
  return (
      <Tab.Navigator
        screenOptions={{
          tabBarLabelStyle: { fontSize: 18, fontWeight: "bold" },
          tabBarStyle: { backgroundColor: "#f0f0f0" },
          tabBarIndicatorStyle: { backgroundColor: "#f5c518", height: 3 },
          tabBarActiveTintColor: "#000",
          //Desmonta el componente cada vez que salgo de la pantalla
          unmountOnBlur: true,
        }}
      >
        <Tab.Screen name="Recetas" component={RecetasFavoritas} />
        <Tab.Screen name="Productos" component={ProductosFavoritos} />
      </Tab.Navigator>
  );
}

