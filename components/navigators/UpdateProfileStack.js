import * as React from 'react'
import { Component } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Search from '../Search'
import OtherUserProfile from '../OtherUserProfile'
import UpdateProfile from '../UpdateProfile'
import CameraScreen from '../CameraScreen'

const Stack = createNativeStackNavigator()

class UpdateProfileStack extends Component {
  render () {
    return (
      // Builds stack used to hold the update profile screens
      <Stack.Navigator initialRouteName='Change Profile'>
        {/* Adds a screen to the stack that can be navigated to */}
        <Stack.Screen
          name='Change Profile'
          component={UpdateProfile}
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
          name='Camera'
          component={CameraScreen}
          options={{ gestureEnabled: false, headerShown: false }}
        />
      </Stack.Navigator>
    )
  }
}

export default UpdateProfileStack
