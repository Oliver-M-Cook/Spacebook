import * as React from 'react'
import { Component } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Feed from '../Feed'
import Search from '../Search'
import OtherUserProfile from '../OtherUserProfile'
import SinglePost from '../SinglePost'

const Stack = createNativeStackNavigator()

class AuthStackNavigator extends Component {
  render () {
    return (
      // Builds stack navigator and sets the initial route to be loaded
      <Stack.Navigator initialRouteName='Feed'>
        {/* Adds a screen to the stack that can be navigated to */}
        <Stack.Screen
          name='Feed'
          component={Feed}
          // Disables header and gesture becuase a custom header is used
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

export default AuthStackNavigator
