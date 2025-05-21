import React from "react";
import { StyleSheet } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Principal from "../screens/Principal";
import FavoritosScreen from "../screens/FavoritosScreen";
import EscanearScreen from "../screens/EscanearScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "transparent",
          position: "absolute",
          height: 60,
          borderTopWidth: 0,
          elevation: 0,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "bold",
          color: 'white'
        },
        tabBarBackground: () => (
          <LinearGradient
            colors={["#5c6e6e", "#333e50", "#331b3b"]}
            style={{ flex: 1 }}
          />
        ),
        tabBarActiveTintColor: "#7cc95c",
        tabBarInactiveTintColor: "white",
      }}
    >
      <Tab.Screen
        name="Inicio"
        component={Principal}
        options={{
          tabBarIcon: ({ focused }) => (
            <Ionicons name="home" size={30} color={focused ? "#8bc34a" : "white"} />
          ),
        }}
      />
      <Tab.Screen
        name="Favoritos"
        component={FavoritosScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <Ionicons name="star-half" size={30} color={focused ? "yellow" : "white"} />
          ),
        }}
      />
      <Tab.Screen
        name="Escanear"
        component={EscanearScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <Ionicons name="search" size={30} color={focused ? "#56ccf2" : "white"} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
