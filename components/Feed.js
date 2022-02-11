import { Component } from "react";
import { StyleSheet, View } from "react-native";
import TopBar from "./TopBar";

class Feed extends Component {
  render() {
    return (
      <View style={styles.container}>
        <TopBar navigation={this.props.navigation}></TopBar>
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
