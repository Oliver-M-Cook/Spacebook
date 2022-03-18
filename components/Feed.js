import React, { useEffect, useRef, useState } from 'react'
import PostComponent from './PostComponent'
import TopBar from './TopBar'
import { StyleSheet, Text, View } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useFocusEffect } from '@react-navigation/native'

const Feed = (props) => {
  // Sets the states to be used by the screen
  const [userID, setUserID] = useState(-1)
  const [isLoading, setLoading] = useState(true)

  // Stops useEffect from running on the first mount
  const isInitialMount = useRef(true)

  // This would run twice, had to wait for userID to be updated before loading
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false
    } else {
      setLoading(false)
    }
  }, [userID])

  // Runs the functions inside when screen comes into focus
  useFocusEffect(
    React.useCallback(() => {
      const setup = async () => {
        const userIDLocal = parseInt(await AsyncStorage.getItem('@user_id'))
        setUserID(userIDLocal)
      }

      setup()
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
