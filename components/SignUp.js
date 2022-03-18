import { useNavigation } from '@react-navigation/native'
import React, { useEffect, useRef, useState } from 'react'
import { Button, StyleSheet, Text, TextInput, View } from 'react-native'
import { set } from 'react-native-reanimated'
import CustomHeader from './CustomHeader'
import { signUp } from './Functions/UserManagement'

const SignUp = (props) => {
  const [firstname, setFirstname] = useState('')
  const [lastname, setLastname] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showFirstname, setShowFirstname] = useState(true)
  const [showLastname, setShowLastname] = useState(true)
  const [showEmail, setShowEmail] = useState(true)
  const [showPassword, setShowPassword] = useState(true)

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

  const sendSignUp = async () => {
    let showFirstname
    let showLastname
    let showEmail
    let showPassword

    firstname.length === 0 ? (showFirstname = true) : (showLastname = false)
    lastname.length === 0 ? (showLastname = true) : (showLastname = false)
    email.match(/\S+@\S+\.\S+/) ? (showEmail = false) : (showEmail = true)
    password.length <= 5 ? (showPassword = true) : (showPassword = false)

    setShowFirstname(showFirstname)
    setShowLastname(showLastname)
    setShowEmail(showEmail)
    setShowPassword(showPassword)

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
        {showFirstname && <RenderFirstname />}
        <TextInput
          placeholder='Lastname...'
          style={styles.textInput}
          onChangeText={handleLastname}
          value={lastname}
        />
        {showLastname && <RenderLastname />}
        <TextInput
          placeholder='Email...'
          style={styles.textInput}
          onChangeText={handleEmail}
          value={email}
        />
        {showEmail && <RenderEmail />}
        <TextInput
          placeholder='Password...'
          style={styles.textInput}
          onChangeText={handlePassword}
          value={password}
          secureTextEntry
        />
        {showPassword && <RenderPassword />}
        <Button title='Sign Up' onPress={sendSignUp} />
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

  textInput: {
    padding: 10
  }
})

export default SignUp
