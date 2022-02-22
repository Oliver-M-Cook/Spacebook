import { Component } from "react";
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getProfilePicture } from "./Functions/FunctionStorage";

class TopBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      query: "",
      output: "",
      userIDs: [],
      userProfilePicture: "",
    };
  }
  toggleSideNav = () => {
    this.props.navigation.openDrawer();
  };

  search = async () => {
    let token = await AsyncStorage.getItem("@session_token");
    return fetch(
      "http://localhost:3333/api/1.0.0/search?q=".concat(
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
        let userIDs = [];
        responseJson.forEach((user) => {
          userIDs.push(user.user_id);
        });
        this.props.navigation.navigate("Search", {
          output: this.state.output,
          userIDs: userIDs,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  handleQuery = (query) => {
    this.setState({ query: query });
  };

  async componentDidMount() {
    let userID = await AsyncStorage.getItem("@user_id");
    getProfilePicture(userID).then((imageURI) => {
      this.setState({
        userProfilePicture: imageURI,
      });
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={this.toggleSideNav}>
          <Image
            source={{ uri: this.state.userProfilePicture }}
            style={{
              width: 50,
              height: 50,
              borderWidth: 2,
              borderRadius: 25,
              borderColor: "#B4869F",
            }}
          />
        </TouchableOpacity>
        <TextInput
          placeholder="Search..."
          style={{ width: 150 }}
          onChangeText={this.handleQuery}
          value={this.state.query}
        />
        <TouchableOpacity
          style={{ justifyContent: "center" }}
          onPress={this.search}
        >
          <Text
            style={{
              padding: 10,
              backgroundColor: "#B4869F",
              borderRadius: 10,
            }}
          >
            Search
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "#A6B1E1",
    justifyContent: "space-around",
    padding: 20,
    borderBottomWidth: 2,
    borderColor: "#985F6F",
  },
});

export default TopBar;
