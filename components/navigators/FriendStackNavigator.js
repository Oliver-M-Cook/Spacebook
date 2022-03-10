import * as React from 'react'
import { Component } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import FriendsList from '../FriendsList'
import FriendRequests from '../FRusingFunctional'
import Search from '../Search'
import OtherUserProfile from '../OtherUserProfile'
import SinglePost from '../SinglePost'

const Stack = createNativeStackNavigator()

class FriendStackNavigator extends Component {
  render() {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name='Friend Requests'
          component={FriendRequests}
          options={{ headerShown: false, gestureEnabled: false }}
        />
        <Stack.Screen
          name='Friends List'
          component={FriendsList}
          options={{ headerShown: false, gestureEnabled: false }}
        />
        <Stack.Screen
          name='Search'
          component={Search}
          options={{ gestureEnabled: false, headerShown: false }}
        />
        <Stack.Screen
          name='TempHeader'
          component={OtherUserProfile}
          options={{ gestureEnabled: false, headerShown: false }}
        />
        <Stack.Screen
          name='Single Post'
          component={SinglePost}
          options={{ gestureEnabled: false, headerShown: false }}
        />
      </Stack.Navigator>
    )
  }
}

export default FriendStackNavigator
