import { Component } from "react";
import { Button, StyleSheet, TextInput, View } from "react-native";

class SignUp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      first_name: "",
      last_name: "",
      email: "",
      password: "",
    };
  }

  signUp = () => {
    //Validation eventually

    //Change the IP to localhost when at uni/find IP Address
    return fetch("http://10.182.67.77:3333/api/1.0.0/user", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(this.state),
    })
      .then((response) => {
        if (response.status === 201) {
          return response.json();
        } else if (response.status === 400) {
          throw "Failed Validation";
        } else {
          throw "Something went wrong";
        }
      })
      .then((responseJson) => {
        console.log("User created with ID: ", responseJson);
        this.props.navigation.navigate("Main Menu");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  handleFirstname = (firstname) => {
    this.setState({ first_name: firstname });
  };

  handleLastname = (lastname) => {
    this.setState({ last_name: lastname });
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
          placeholder="Firstname..."
          style={styles.textInput}
          onChangeText={this.handleFirstname}
          value={this.state.firstname}
        />
        <TextInput
          placeholder="Lastname..."
          style={styles.textInput}
          onChangeText={this.handleLastname}
          value={this.state.lastname}
        />
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
        <Button title="Sign Up" onPress={this.signUp} />
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

export default SignUp;
