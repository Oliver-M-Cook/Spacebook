import * as React from "react";
import { Component } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Feed from "../Feed";
import Search from "../Search";

const Stack = createNativeStackNavigator();

class AuthStackNavigator extends Component {
  render() {
    return (
      <Stack.Navigator initialRouteName="Feed">
        <Stack.Screen
          name="Feed"
          component={Feed}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Search"
          component={Search}
          options={{ gestureEnabled: false }}
        />
      </Stack.Navigator>
    );
  }
}

export default AuthStackNavigator;
