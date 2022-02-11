import "react-native-gesture-handler";

import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MainMenu from "./components/MainMenu";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import Home from "./components/Home";
import StartStackNavigator from "./components/navigators/StartStackNavigator";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <StartStackNavigator />
    </NavigationContainer>
  );
}
