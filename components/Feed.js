import React, { useEffect, useRef, useState } from 'react'
import PostComponent from './PostComponent'
import TopBar from './TopBar'
import { StyleSheet, Text, View } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useFocusEffect } from '@react-navigation/native'

const Feed = (props) => {
  const [userID, setUserID] = useState(-1)
  const [isLoading, setLoading] = useState(true)

  const isInitialMount = useRef(true)

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false
    } else {
      setLoading(false)
    }
  }, [userID])

  useFocusEffect(
    React.useCallback(() => {
      const fetchFriends = async () => {
        const userIDLocal = parseInt(await AsyncStorage.getItem('@user_id'))
        setUserID(userIDLocal)
      }

      fetchFriends()
    }, [])
  )
  if (!isLoading) {
    return (
      <View style={styles.container}>
        <TopBar navigation={props.navigation} />
        <PostComponent userID={userID} loggedIn />
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
    flex: 1,
    backgroundColor: '#DCD6F7'
  }
})

export default Feed
