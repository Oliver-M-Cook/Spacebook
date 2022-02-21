import { Component } from "react";
import { Image, Text, View } from "react-native";
import FriendButton from "./FriendButton";

class OtherUserProfile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userData: {},
    };
  }

  componentDidMount() {
    console.log(this.props.route.params.userData);
    console.log(this.props.route.params.profilePicture);
    this.setState({
      userData: this.props.route.params.userData,
    });
  }

  render() {
    return (
      <View>
        <Image
          source={{ uri: this.props.route.params.profilePicture }}
          style={{
            width: 150,
            height: 150,
            borderWidth: 2,
            borderRadius: 75,
          }}
        />

        <Text>
          {this.state.userData.user_givenname +
            " " +
            this.state.userData.user_familyname}
        </Text>
        <FriendButton></FriendButton>
      </View>
    );
  }
}

export default OtherUserProfile;
