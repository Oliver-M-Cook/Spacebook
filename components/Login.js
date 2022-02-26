import { Component } from 'react'
import { Button, StyleSheet, TextInput, View } from 'react-native'
import { login } from './Functions/FunctionStorage'

class Login extends Component {
  constructor (props) {
    super(props)

    this.state = {
      email: '',
      password: ''
    }
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
        <Button title='Login' onPress={login.bind(this)} />
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

export default Login
