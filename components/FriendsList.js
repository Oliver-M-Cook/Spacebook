import { useFocusEffect, useNavigation } from '@react-navigation/native'
import React, { useState } from 'react'
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native'
import { getFriends, getProfilePicture } from './Functions/FunctionStorage'
import TopBar from './TopBar'
import AsyncStorage from '@react-native-async-storage/async-storage'

const RenderFlatListHeader = () => {
  return <Text style={{ fontSize: 25, fontWeight: 'bold' }}>Friends List</Text>
}

const RenderFlatList = (props) => {
  const [isLoading, setIsLoading] = useState(true)
  const [friendListArray, setFriends] = useState([])
  const [profilePictureArray] = useState([])

  // useFocusEffect(
  //   React.useCallback(() => {
  //     AsyncStorage.getItem('@user_id').then((userID) => {
  //       getFriends(userID).then((responseJson) => {
  //         responseJson.forEach((user) => {
  //           friendListArray.push(user)

  //           getProfilePicture(user.user_id).then((imageURI) => {
  //             profilePictureArray.push(imageURI)
  //             if (friendListArray.length === profilePictureArray.length) {
  //               setIsLoading(false)
  //             }
  //           })
  //         })
  //         if (responseJson.length === 0) {
  //           setIsLoading(false)
  //         }
  //       })
  //     })
  //   }, [])
  // )

  useFocusEffect(
    React.useCallback(() => {
      const fetchData = async () => {
        const loggedUserID = await AsyncStorage.getItem('@user_id')
        console.log(loggedUserID)
        const friends = await getFriends(loggedUserID)
        console.log(friends)
        await setFriends(friends)
        setIsLoading(false)
      }

      fetchData()
    }, [])
  )

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
                borderRadius: 25
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
