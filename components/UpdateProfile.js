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
import { getProfilePicture } from './Functions/UserManagement'

const UpdateProfile = (props) => {
  const [profilePicture, setProfilePicture] = useState()
  const [firstname, setFirstname] = useState()
  const [lastname, setLastname] = useState()
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const [isLoading, setLoading] = useState(true)

  useFocusEffect(
    React.useCallback(() => {
      const setup = async () => {
        const userID = await AsyncStorage.getItem('@user_id')
        const imageURI = await getProfilePicture(userID)
        setProfilePicture(imageURI)
      }

      setup()
    }, [])
  )

  return (
    <View>
      <TopBar navigation={props.navigation} />
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
      <TouchableOpacity onPress={() => props.navigation.navigate('Camera')}>
        <Text>Change Photo</Text>
      </TouchableOpacity>
      <Text>Firstname:</Text>
      <TextInput placeholder='Firstname...' value={firstname} />
      <Text>Lastname:</Text>
      <TextInput placeholder='Lastname...' value={lastname} />
      <Text>Email:</Text>
      <TextInput placeholder='Email...' value={email} />
      <Text>password:</Text>
      <TextInput placeholder='Password...' value={password} />
    </View>
  )
}

export default UpdateProfile
