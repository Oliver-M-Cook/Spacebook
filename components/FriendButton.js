import { Component } from "react";
import { Text, View } from "react-native";

class FriendButton extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
    };
  }

  componentDidMount() {
    this.setState({
      isLoading: false,
    });
  }

  render() {
    if (!this.state.isLoading) {
      return (
        <View>
          <Text>Text Text</Text>
        </View>
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

export default FriendButton;
