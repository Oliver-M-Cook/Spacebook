import { Component } from 'react'
import { Button, StyleSheet, TextInput, View } from 'react-native'
import { signUp } from './Functions/FunctionStorage'

class SignUp extends Component {
  constructor (props) {
    super(props)

    this.state = {
      first_name: '',
      last_name: '',
      email: '',
      password: ''
    }
  }

  handleFirstname = (firstname) => {
    this.setState({ first_name: firstname })
  }

  handleLastname = (lastname) => {
    this.setState({ last_name: lastname })
  }

  handleEmail = (email) => {
    this.setState({ email: email })
  }

  handlePassword = (password) => {
    this.setState({ password: password })
  }

  render () {
    return (
      <View style={styles.container}>
        <TextInput
          placeholder='Firstname...'
          style={styles.textInput}
          onChangeText={this.handleFirstname}
          value={this.state.firstname}
        />
        <TextInput
          placeholder='Lastname...'
          style={styles.textInput}
          onChangeText={this.handleLastname}
          value={this.state.lastname}
        />
        <TextInput
          placeholder='Email...'
          style={styles.textInput}
          onChangeText={this.handleEmail}
          value={this.state.email}
        />
        <TextInput
          placeholder='Password...'
          style={styles.textInput}
          onChangeText={this.handlePassword}
          value={this.state.password}
        />
        <Button title='Sign Up' onPress={signUp.bind(this)} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },

  textInput: {
    padding: 10
  }
})

export default SignUp
