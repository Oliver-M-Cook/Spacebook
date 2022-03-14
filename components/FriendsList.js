import { useFocusEffect, useNavigation } from '@react-navigation/native'
import React, { useEffect, useRef, useState } from 'react'
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native'
import TopBar from './TopBar'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { getProfilePicture } from './Functions/UserManagement'
import { getFriends } from './Functions/FriendManagement'

const RenderFlatListHeader = () => {
  return <Text style={{ fontSize: 25, fontWeight: 'bold' }}>Friends List</Text>
}

const RenderFlatList = (props) => {
  const [isLoading, setIsLoading] = useState(true)
  const [friendListArray, setFriends] = useState([])
  const [profilePictureArray, setPictures] = useState([])

  const isInitialMount = useRef(true)
  const isInitialMount2 = useRef(true)

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false
    } else {
      fetchPictures()
    }
  }, [friendListArray])

  useEffect(() => {
    if (isInitialMount2.current) {
      isInitialMount2.current = false
    } else {
      setIsLoading(false)
    }
  }, [profilePictureArray])

  useFocusEffect(
    React.useCallback(() => {
      const fetchFriends = async () => {
        const loggedUserID = await AsyncStorage.getItem('@user_id')
        const friends = await getFriends(loggedUserID)
        setFriends(friends)
      }

      fetchFriends()
    }, [])
  )

  const fetchPictures = async () => {
    const pictures = await Promise.all(
      friendListArray.map(async (user) => {
        return getProfilePicture(user.user_id)
      })
    )
    setPictures(pictures)
  }

  const navigation = useNavigation()

  const openUserProfile = (item, index) => {
    navigation.navigate('TempHeader', {
      userData: item,
      profilePicture: profilePictureArray[index]
    })
  }

  if (!isLoading) {
    return (
      <FlatList
        data={friendListArray}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            onPress={() => {
              openUserProfile(item, index)
            }}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              flex: 1,
              margin: 5
            }}
          >
            <Image
              source={{ uri: profilePictureArray[index] }}
              style={{
                width: 50,
                height: 50,
                borderWidth: 2,
                borderRadius: 25,
                borderColor: '#B4869F'
              }}
            />
            <Text style={{ paddingLeft: 10 }}>
              {item.user_givenname + ' ' + item.user_familyname}
            </Text>
          </TouchableOpacity>
        )}
        ListHeaderComponent={RenderFlatListHeader}
        StickyHeaderComponent={[0]}
        keyExtractor={(item) => item.user_id}
      />
    )
  } else {
    return <Text>Loading...</Text>
  }
}

const FriendsList = (props) => {
  return (
    <View style={styles.container}>
      <TopBar navigation={props.navigation} />
      <View
        style={{
          borderBottomWidth: 2,
          borderColor: '#985F6F'
        }}
      >
        <TouchableOpacity
          onPress={() => props.navigation.navigate('Friend Requests')}
          style={{
            margin: 5,
            alignSelf: 'flex-start'
          }}
        >
          <Text
            style={{
              padding: 5,
              backgroundColor: '#B4869F',
              borderRadius: 10
            }}
          >
            Friend Requests
          </Text>
        </TouchableOpacity>
      </View>
      <RenderFlatList />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#DCD6F7'
  }
})

export default FriendsList
