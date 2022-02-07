import { Component } from "react";
import { Button, TextInput, View } from "react-native";

class SignUp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      firstname: "",
      lastname: "",
      email: "",
      password: "",
    };
  }

  render() {
    return (
      <View>
        <TextInput placeholder="Firstname..." />
        <TextInput placeholder="Lastname..." />
        <TextInput placeholder="Email..." />
        <TextInput placeholder="Password" />
        <Button title="Sign Up" />
      </View>
    );
  }
}

export default SignUp;
