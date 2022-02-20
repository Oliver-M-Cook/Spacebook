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
import { getProfilePicture } from "./Functions/FunctionStorage";

class Search extends Component {
  constructor(props) {
    super(props);

    this.state = {
      profilePictures: [],
      isLoading: true,
      loadingCounter: 0,
    };
  }

  componentDidMount() {
    let userIDs = this.props.route.params.userIDs;
    userIDs.forEach((userID) => {
      getProfilePicture(userID).then((imageURI) => {
        let tempArray = this.state.profilePictures;
        let counter = this.state.loadingCounter;
        counter += 1;
        tempArray.push(imageURI);
        this.setState({
          profilePictures: tempArray,
          loadingCounter: counter,
        });
        if (counter == userIDs.length) {
          this.setState({
            isLoading: false,
          });
        }
      });
    });
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
