import { useFocusEffect, useNavigation } from '@react-navigation/native'
import React, { useEffect, useRef, useState } from 'react'
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import TopBar from './TopBar'
import {
  getProfilePicture,
  getUser,
  updateUser
} from './Functions/UserManagement'

const UpdateProfile = (props) => {
  const [profilePicture, setProfilePicture] = useState()
  const [firstname, setFirstname] = useState('')
  const [lastname, setLastname] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setLoading] = useState(true)
  const [userData, setUserData] = useState()

  const isInitialMount = useRef(true)

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false
    } else {
      if (userData !== undefined) {
        console.log(userData)
        setLoading(false)
      }
    }
  }, [userData])

  const unload = () => {
    setUserData()
    setEmail('')
    setFirstname('')
    setLastname('')
    setPassword('')
    setLoading(true)
  }

  useFocusEffect(
    React.useCallback(() => {
      const setup = async () => {
        const userID = await AsyncStorage.getItem('@user_id')
        const imageURI = await getProfilePicture(userID)
        setProfilePicture(imageURI)
        const userData = await getUser(userID)
        setUserData(userData)
      }

      setup()

      return unload
    }, [])
  )

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

  const submitChanges = async () => {
    const formatData = {}
    const newData = [firstname, lastname, email, password]
    const keys = ['first_name', 'last_name', 'email', 'password']

    newData.forEach((dataPiece, index) => {
      if (dataPiece !== '') {
        formatData[keys[index]] = dataPiece
      }
    })

    console.log(formatData)

    const response = await updateUser(userData.user_id, formatData)

    console.log(response)
  }

  if (!isLoading) {
    return (
      <View style={{ backgroundColor: '#DCD6F7', flex: 1 }}>
        <TopBar navigation={props.navigation} />
        <View style={{ margin: 15 }}>
          <View style={{ flexDirection: 'row' }}>
            <Image
              source={{ uri: profilePicture }}
              style={{
                width: 150,
                height: 150,
                borderWidth: 2,
                borderRadius: 75,
                borderColor: '#B4869F'
              }}
            />
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              <TouchableOpacity
                onPress={() => props.navigation.navigate('Camera')}
              >
                <Text
                  style={{
                    backgroundColor: '#B4869F',
                    padding: 10,
                    fontSize: 15,
                    borderRadius: 20
                  }}
                >
                  Change Photo
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.textBox}>
            <Text style={styles.text}>Firstname: {userData.first_name}</Text>
            <TextInput
              placeholder='New Firstname...'
              value={firstname}
              onChangeText={handleFirstname}
              style={styles.text}
            />
          </View>
          <View style={styles.textBox}>
            <Text style={styles.text}>Lastname: {userData.last_name}</Text>
            <TextInput
              placeholder='New Lastname...'
              value={lastname}
              onChangeText={handleLastname}
              style={styles.text}
            />
          </View>
          <View style={styles.textBox}>
            <Text style={styles.text}>Email: {userData.email}</Text>
            <TextInput
              placeholder='New Email...'
              value={email}
              onChangeText={handleEmail}
              style={styles.text}
            />
          </View>
          <View style={styles.textBox}>
            <Text style={styles.text}>Password:</Text>
            <TextInput
              placeholder='New Password...'
              value={password}
              onChangeText={handlePassword}
              style={styles.text}
            />
          </View>
          <TouchableOpacity
            onPress={submitChanges}
            style={{ marginTop: 30, alignSelf: 'center' }}
          >
            <Text
              style={{
                padding: 15,
                fontSize: 15,
                backgroundColor: '#B4869F',
                borderRadius: 20
              }}
            >
              Submit Changes
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  } else {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  textBox: {
    flex: 1,
    marginTop: 20
  },
  text: {
    fontSize: 15
  }
})

export default UpdateProfile
