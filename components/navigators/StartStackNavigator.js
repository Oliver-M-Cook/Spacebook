import * as React from "react";
import { Component } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MainMenu from "../MainMenu";
import SignUp from "../SignUp";
import Login from "../Login";
import Home from "../Home";

const Stack = createNativeStackNavigator();

class StartStackNavigator extends Component {
  render() {
    return (
      <Stack.Navigator initialRouteName="Main Menu">
        <Stack.Screen name="Main Menu" component={MainMenu} />
        <Stack.Screen name="Sign Up" component={SignUp} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ headerShown: false, gestureEnabled: false }}
        />
      </Stack.Navigator>
    );
  }
}

export default StartStackNavigator;
