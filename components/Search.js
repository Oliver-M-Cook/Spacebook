import { Component } from "react";
import {
  Button,
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

class Search extends Component {
  constructor(props) {
    super(props);

    this.state = {
      profilePictures: [],
      isLoading: true,
    };
  }
  getProfilePicture = async (userIDs) => {
    let token = await AsyncStorage.getItem("@session_token");
    userIDs.forEach((userID) => {
      fetch(
        "http://192.168.1.31:3333/api/1.0.0/user/".concat(userID, "/photo"),
        {
          method: "GET",
          headers: {
            "X-Authorization": token,
          },
        }
      )
        .then((response) => {
          if (response.status === 200) {
            return response.blob();
          } else if (response.status === 401) {
            this.props.navigation.navigate("Login");
          } else if (response.status === 404) {
            throw "Not Found";
          } else {
            throw "Something went wrong";
          }
        })
        .then((resblob) => {
          let imageURI = URL.createObjectURL(resblob);
          let tempArray = this.state.profilePictures;
          tempArray.push(imageURI);
          this.setState({
            profilePictures: tempArray,
          });
        })
        .catch((error) => {
          console.log(error);
        });
    });
    this.setState({
      isLoading: false,
    });
  };

  componentDidMount() {
    this.getProfilePicture(this.props.route.params.userIDs);
  }

  render() {
    if (!this.state.isLoading) {
      return (
        <SafeAreaView>
          <FlatList
            data={JSON.parse(this.props.route.params.output)}
            renderItem={({ item, index }) => (
              <TouchableOpacity
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginBottom: 5,
                }}
              >
                <Image
                  source={{ uri: this.state.profilePictures[index] }}
                  style={{
                    width: 50,
                    height: 50,
                    borderWidth: 2,
                    borderRadius: 25,
                  }}
                />
                <Text style={{ paddingLeft: 10 }}>
                  {item.user_givenname.concat(" ", item.user_familyname)}
                </Text>
              </TouchableOpacity>
            )}
            keyExtractor={(item) => item.user_id}
          />
        </SafeAreaView>
      );
    } else {
      return (
        <View>
          <Text>Loading...</Text>
        </View>
      );
    }
  }
}

export default Search;
