import { Component } from "react";
import { Button, StyleSheet, TextInput, View } from "react-native";

class TopBar extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Button title="Temp" />
        <TextInput placeholder="Search..." />
        <Button title="Search" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "stretch",
    backgroundColor: "#ccccff",
    justifyContent: "space-around",
    paddingTop: 40,
  },
});

export default TopBar;
