import { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import TopBar from "./TopBar";

class Feed extends Component {
  render() {
    return (
      <View style={styles.container}>
        <TopBar navigation={this.props.navigation}></TopBar>
        <Text>Test Text</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Feed;
