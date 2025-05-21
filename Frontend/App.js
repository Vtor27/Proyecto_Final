import React from "react";
import { StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import AppNavigator from "./src/navigation/AppNavigator";
import { useFonts } from "expo-font";

export default function App() {
  const [fontsLoaded] = useFonts({
    "Siracha-Regular": require("./assets/fonts/Sriracha-Regular.ttf"),
    "KiteOne-Regular": require("./assets/fonts/KiteOne-Regular.ttf"),
    "Alkatra-Regular": require("./assets/fonts/Alkatra-Regular.ttf"),
    "Alkatra-SemiBold": require("./assets/fonts/Alkatra-SemiBold.ttf"),
    "AncizarSans-Medium": require("./assets/fonts/AncizarSans-Medium.ttf"),
    "AncizarSans-MediumItalic": require("./assets/fonts/AncizarSans-MediumItalic.ttf"),
    "AncizarSans-ExtraBoldItalic": require("./assets/fonts/AncizarSans-ExtraBoldItalic.ttf"),
    "FugazOne-Regular": require("./assets/fonts/FugazOne-Regular.ttf"),
    "PlaywriteCO-Regular": require("./assets/fonts/PlaywriteCO-Regular.ttf"),
  });
  return (
    <>
      <StatusBar
        backgroundColor="black"
        barStyle="light-content"
        translucent={false}
      />
      <NavigationContainer>
        <AppNavigator fonts={fontsLoaded} />
      </NavigationContainer>
    </>
  );
}
