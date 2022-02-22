import { Component } from "react";
import { Button, StyleSheet, TextInput, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
    };
  }

  login = async () => {
    //Validation eventually

    //Change the IP to localhost when at uni/find IP Address
    return fetch("http://localhost:3333/api/1.0.0/login", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(this.state),
    })
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        } else if (response.status === 400) {
          throw "Invalid email or password";
        } else {
          throw "Something went wrong";
        }
      })
      .then(async (responseJson) => {
        console.log(responseJson);
        await AsyncStorage.setItem("@session_token", responseJson.token);
        await AsyncStorage.setItem("@user_id", responseJson.id.toString());
        this.props.navigation.navigate("Home");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  handleEmail = (email) => {
    this.setState({ email: email });
  };

  handlePassword = (password) => {
    this.setState({ password: password });
  };

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          placeholder="Email..."
          style={styles.textInput}
          onChangeText={this.handleEmail}
          value={this.state.email}
        />
        <TextInput
          placeholder="Password..."
          style={styles.textInput}
          onChangeText={this.handlePassword}
          value={this.state.password}
        />
        <Button title="Login" onPress={this.login} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },

  textInput: {
    padding: 10,
  },
});

export default Login;
