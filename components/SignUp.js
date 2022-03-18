import { useNavigation } from '@react-navigation/native'
import React, { useState } from 'react'
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native'
import CustomHeader from './CustomHeader'
import { signUp } from './Functions/UserManagement'

const SignUp = (props) => {
  // States to be used by the screen
  const [firstname, setFirstname] = useState('')
  const [lastname, setLastname] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showFirstname, setShowFirstname] = useState(false)
  const [showLastname, setShowLastname] = useState(false)
  const [showEmail, setShowEmail] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const navigation = useNavigation()

  const handleFirstname = (firstname) => {
    setFirstname(firstname)
  }

  const handleLastname = (lastname) => {
    setLastname(lastname)
  }

  const handleEmail = (email) => {
    setEmail(email)
  }

  const handlePassword = (password) => {
    setPassword(password)
  }

  // Sends details after validation
  const sendSignUp = async () => {
    let showFirstname
    let showLastname
    let showEmail
    let showPassword

    // Tenary statements to check what the user has entered
    firstname.length === 0 ? (showFirstname = true) : (showLastname = false)
    lastname.length === 0 ? (showLastname = true) : (showLastname = false)
    // Uses RegEx to check the email is valid
    email.match(/\S+@\S+\.\S+/) ? (showEmail = false) : (showEmail = true)
    password.length <= 5 ? (showPassword = true) : (showPassword = false)

    setShowFirstname(showFirstname)
    setShowLastname(showLastname)
    setShowEmail(showEmail)
    setShowPassword(showPassword)

    // Only sends data if all data passes validation
    if (!showFirstname && !showLastname && !showEmail && !showPassword) {
      const postBody = {
        first_name: firstname,
        last_name: lastname,
        email: email,
        password: password
      }

      const response = await signUp(postBody)

      response.code === 201
        ? navigation.navigate('Main Menu')
        : console.log(response)
    }
  }

  const RenderFirstname = () => {
    return (
      <Text style={{ fontSize: 15, color: 'red' }}>
        Firstname cannot be Blank
      </Text>
    )
  }

  const RenderLastname = () => {
    return (
      <Text style={{ fontSize: 15, color: 'red' }}>
        Lastname cannot be Blank
      </Text>
    )
  }

  const RenderEmail = () => {
    return (
      <Text style={{ fontSize: 15, color: 'red' }}>
        Email must follow email standards
      </Text>
    )
  }

  const RenderPassword = () => {
    return (
      <Text style={{ fontSize: 15, color: 'red' }}>
        Password must be longer than 5 characters
      </Text>
    )
  }

  return (
    <View style={{ flex: 1 }}>
      <CustomHeader />
      <View style={styles.container}>
        <TextInput
          placeholder='Firstname...'
          style={styles.textInput}
          onChangeText={handleFirstname}
          value={firstname}
        />
        {/* Only shows if validation failed */}
        {showFirstname && <RenderFirstname />}
        <TextInput
          placeholder='Lastname...'
          style={styles.textInput}
          onChangeText={handleLastname}
          value={lastname}
        />
        {/* Only shows if validation failed */}
        {showLastname && <RenderLastname />}
        <TextInput
          placeholder='Email...'
          style={styles.textInput}
          onChangeText={handleEmail}
          value={email}
        />
        {/* Only shows if validation failed */}
        {showEmail && <RenderEmail />}
        <TextInput
          placeholder='Password...'
          style={styles.textInput}
          onChangeText={handlePassword}
          value={password}
          secureTextEntry
        />
        {/* Only shows if validation failed */}
        {showPassword && <RenderPassword />}
        <TouchableOpacity>
          <Text style={styles.button} onPress={sendSignUp}>
            Sign Up
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#DCD6F7',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1
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

export default SignUp
