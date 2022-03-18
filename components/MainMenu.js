import { Component } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import * as React from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

class MainMenu extends Component {
  // Checks if the user is logged in
  componentDidMount () {
    this.checkLoggedIn()
  }

  // Checks to see if AsyncStorage is empty before navigating home
  checkLoggedIn = async () => {
    const userID = await AsyncStorage.getItem('@user_id')
    const sessionToken = await AsyncStorage.getItem('@session_token')

    if (userID && sessionToken) {
      this.props.navigation.navigate('Home')
    }
  }

  render () {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Spacebook</Text>
        <Text style={styles.title}>By Oliver Cook</Text>
        <Text style={styles.title}>19041856</Text>

        <TouchableOpacity
          style={{ marginBottom: 20, marginTop: 20 }}
          onPress={() => this.props.navigation.navigate('Sign Up')}
        >
          <Text style={styles.button}>Sign Up</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text
            style={styles.button}
            onPress={() => this.props.navigation.navigate('Login')}
          >
            Login
          </Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#DCD6F7',
    alignItems: 'center',
    justifyContent: 'center'
  },

  button: {
    backgroundColor: '#B4869F',
    padding: 5,
    borderRadius: 10,
    fontSize: 20
  },
  title: {
    fontSize: 30
  }
})

export default MainMenu
