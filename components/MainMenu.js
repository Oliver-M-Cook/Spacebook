import { Component } from "react";
import { Button, View } from "react-native";

class MainMenu extends Component {
  render() {
    return (
      <View>
        <Button title="Sign Up" />
        <Button title="Login" />
      </View>
    );
  }
}

export default MainMenu;
