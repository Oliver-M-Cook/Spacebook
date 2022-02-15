import { Component } from "react";
import { Button, StyleSheet, TextInput, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

class TopBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      query: "",
      output: "",
    };
  }
  toggleSideNav = () => {
    this.props.navigation.openDrawer();
  };

  search = async () => {
    // this.props.navigation.navigate("Search");
    let token = await AsyncStorage.getItem("@session_token");
    return fetch(
      "http://10.182.67.77:3333/api/1.0.0/search?q=".concat(
        this.state.query,
        "&search_in=all"
      ),
      {
        method: "get",
        headers: {
          "X-Authorization": token,
        },
      }
    )
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        } else if (response.status === 400) {
          throw "Bad Request";
        } else if (response.status === 401) {
          this.props.navigation.navigate("Login");
        } else {
          throw "Something went wrong";
        }
      })
      .then((responseJson) => {
        this.setState({ output: JSON.stringify(responseJson) });
        this.props.navigation.navigate("Search", {
          output: this.state.output,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  handleQuery = (query) => {
    this.setState({ query: query });
  };

  render() {
    return (
      <View style={styles.container}>
        <Button title="Temp" onPress={this.toggleSideNav} />
        <TextInput
          placeholder="Search..."
          style={{ width: 150 }}
          onChangeText={this.handleQuery}
          value={this.state.query}
        />
        <Button title="Search" onPress={this.search} />
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
