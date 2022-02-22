import { Component } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import TopBar from "./TopBar";

class FriendRequests extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <TopBar navigation={this.props.navigation}></TopBar>
        <View
          style={{
            borderBottomWidth: 2,
            borderColor: "#985F6F",
          }}
        >
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate("Friends List")}
            style={{
              margin: 5,
              alignSelf: "flex-start",
            }}
          >
            <Text
              style={{
                padding: 5,
                backgroundColor: "#B4869F",
                borderRadius: 10,
              }}
            >
              Your Friends
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#DCD6F7",
  },
});

export default FriendRequests;
