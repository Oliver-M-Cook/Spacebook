import { Component } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { addFriend, getFriends } from './Functions/FriendManagement'

class FriendButton extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isLoading: true,
      isFriends: false
    }
  }

  componentDidMount() {
    const fetchData = async () => {
      const loggedUserID = await AsyncStorage.getItem('@user_id')
      const friends = await getFriends(loggedUserID)
      const friendIDs = friends.map((user) => {
        return user.user_id
      })
      const result = friendIDs.includes(this.props.userID)
      this.setState({
        isLoading: false,
        isFriends: result
      })
    }

    fetchData()
  }

  render() {
    if (!this.state.isLoading) {
      if (this.state.isFriends) {
        return (
          <View style={{ marginTop: 5 }}>
            <Text
              style={{
                backgroundColor: '#B4869F',
                padding: 10,
                textAlign: 'center',
                borderRadius: 10
              }}
            >
              Friends
            </Text>
          </View>
        )
      } else {
        return (
          <TouchableOpacity
            onPress={() => addFriend(this.props.userID)}
            style={{ marginTop: 5 }}
          >
            <Text
              style={{
                backgroundColor: '#B4869F',
                padding: 10,
                textAlign: 'center',
                borderRadius: 10
              }}
            >
              Add
            </Text>
          </TouchableOpacity>
        )
      }
    } else {
      return (
        <View>
          <Text>Loading...</Text>
        </View>
      )
    }
  }
}

export default FriendButton
