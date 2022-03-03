import { useFocusEffect, useNavigation } from '@react-navigation/native'
import React, { useEffect, useRef, useState } from 'react'
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { getProfilePicture } from './Functions/UserManagement'
import { search } from './Functions/FunctionStorage'

const TopBar = (props) => {
  const [query, setQuery] = useState('')
  const [userProfilePicture, setPicture] = useState('')
  const [isLoading, setLoading] = useState(true)

  const navigation = useNavigation()
  const isInitialMount = useRef(true)

  const handleSideNav = () => {
    navigation.openDrawer()
  }

  const handleQuery = (text) => {
    setQuery(text)
  }

  const handleSearch = async () => {
    const response = await search(query)
    if (response.code === 401) {
      navigation.navigate('Main Menu')
    } else {
      navigation.navigate('Search', {
        output: response.users,
        userIDs: response.userIDs
      })
    }
  }

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false
    } else {
      setLoading(false)
    }
  }, [userProfilePicture])

  useFocusEffect(
    React.useCallback(() => {
      const setup = async () => {
        const userID = await AsyncStorage.getItem('@user_id')
        const profilePicture = await getProfilePicture(userID)

        if (profilePicture.code === 401) {
          navigation.navigate('Main Menu')
        } else {
          setPicture(profilePicture)
        }
      }

      setup()
    }, [])
  )

  if (!isLoading) {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={handleSideNav}>
          <Image
            source={{ uri: userProfilePicture }}
            style={{
              width: 50,
              height: 50,
              borderWidth: 2,
              borderRadius: 25,
              borderColor: '#B4869F'
            }}
          />
        </TouchableOpacity>
        <TextInput
          placeholder='Search...'
          style={{ width: 150 }}
          onChangeText={handleQuery}
          value={query}
        />
        <TouchableOpacity
          style={{ justifyContent: 'center' }}
          onPress={handleSearch}
        >
          <Text
            style={{
              padding: 10,
              backgroundColor: '#B4869F',
              borderRadius: 10
            }}
          >
            Search
          </Text>
        </TouchableOpacity>
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
  container: {
    flexDirection: 'row',
    backgroundColor: '#A6B1E1',
    justifyContent: 'space-around',
    padding: 20,
    borderBottomWidth: 2,
    borderColor: '#985F6F'
  }
})

export default TopBar
