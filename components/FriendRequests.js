import { useFocusEffect } from '@react-navigation/native'
import React, { useState } from 'react'
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native'
import {
  acceptFriendRequest,
  getFriendRequests,
  rejectFriendRequest
} from './Functions/FriendManagement'
import TopBar from './TopBar'

// Header used at the top of the flatlist
const RenderFlatListHeader = () => {
  return (
    <Text style={{ fontSize: 25, fontWeight: 'bold' }}>Friend Requests</Text>
  )
}

// Renders the flatlist to the screen
const RenderFlatList = (props) => {
  // Sets the states to be used by the component
  const [isLoading, setIsLoading] = useState(true)
  const [friendRequestArray, setArray] = useState([])
  const [refresh, setRefresh] = useState(true)

  const handleAccept = (userID, index) => {
    removeElement(index)
    acceptFriendRequest(userID)
  }

  const handleReject = (userID, index) => {
    removeElement(index)
    rejectFriendRequest(userID)
  }

  const removeElement = (index) => {
    const tempArray = friendRequestArray
    // Uses splice to remove element from array
    tempArray.splice(index, 1)
    setArray(tempArray)
    // Inverts refresh so flatlist re-renders with new data
    setRefresh(!refresh)
  }

  // Sets up the screen when the screen comes into focus
  useFocusEffect(
    React.useCallback(() => {
      getFriendRequests().then((responseJson) => {
        setArray(responseJson)
        setIsLoading(false)
      })
    }, [])
  )

  if (!isLoading) {
    return (
      <FlatList
        data={friendRequestArray}
        // RenderItem loops through and creates an item from the data
        renderItem={({ item, index }) => (
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              flex: 1,
              margin: 10
            }}
          >
            <Text>{item.first_name + ' ' + item.last_name}</Text>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'flex-end',
                flex: 1
              }}
            >
              <TouchableOpacity
                onPress={() => handleAccept(item.user_id, index)}
              >
                <Text
                  style={{
                    backgroundColor: '#00b33c',
                    padding: 5,
                    borderRadius: 10,
                    marginRight: 15
                  }}
                >
                  Accept
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => handleReject(item.user_id, index)}
              >
                <Text
                  style={{
                    backgroundColor: '#ff6666',
                    padding: 5,
                    borderRadius: 10
                  }}
                >
                  Reject
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        ListHeaderComponent={RenderFlatListHeader}
        StickyHeaderComponent={[0]}
        // Key extractor sets a unique key for each item
        keyExtractor={(item) => item.user_id}
        extraData={refresh}
      />
    )
  } else {
    return <Text>Loading...</Text>
  }
}

const FriendRequests = (props) => {
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
          onPress={() => props.navigation.navigate('Friends List')}
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
            Your Friends
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

export default FriendRequests
