import { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import TopBar from "./TopBar";

class Home extends Component {
  render() {
    return (
      <View style={styles.container}>
        <TopBar></TopBar>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Home;
