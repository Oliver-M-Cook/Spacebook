import { useNavigation } from '@react-navigation/native'
import React, { useState } from 'react'
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  TouchableOpacity
} from 'react-native'
import CustomHeader from './CustomHeader'
import { login } from './Functions/UserManagement'

const Login = (props) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showInvalidLogin, setShowInvalidLogin] = useState(false)

  const navigation = useNavigation()

  const handleEmail = (email) => {
    setEmail(email)
  }

  const handlePassword = (password) => {
    setPassword(password)
  }

  // Sends login details to server
  const sendLogin = async () => {
    const postBody = {
      email: email,
      password: password
    }

    const response = await login(postBody)

    // Filters the response to only navigate to home if code 200 is returned
    if (response.code === 200) {
      navigation.navigate('Home')
    } else if (response.code === 400) {
      setShowInvalidLogin(true)
    }
  }

  // Used to tell the user that their login is wrong
  const RenderInvalidLogin = () => {
    return (
      <Text style={{ fontSize: 15, color: 'red' }}>Invalid Login Details</Text>
    )
  }

  return (
    <View style={{ flex: 1 }}>
      <CustomHeader />
      <View style={styles.container}>
        <TextInput
          placeholder='Email...'
          style={styles.textInput}
          onChangeText={handleEmail}
          value={email}
        />
        <TextInput
          placeholder='Password...'
          style={styles.textInput}
          onChangeText={handlePassword}
          value={password}
          // secure text entry hides the password
          secureTextEntry
        />
        {/* Only shows invalid login if showInvalidLogin is true */}
        {showInvalidLogin && <RenderInvalidLogin />}
        <TouchableOpacity>
          <Text style={styles.button} onPress={sendLogin}>
            Login
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  )
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

  textInput: {
    padding: 10
  }
})

export default Login
