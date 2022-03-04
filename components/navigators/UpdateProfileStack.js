import * as React from 'react'
import { Component } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Feed from '../Feed'
import Search from '../Search'
import OtherUserProfile from '../OtherUserProfile'
import UpdateProfile from '../UpdateProfile'
import CameraScreen from '../CameraScreen'

const Stack = createNativeStackNavigator()

class UpdateProfileStack extends Component {
  render () {
    return (
      <Stack.Navigator initialRouteName='Change Profile'>
        <Stack.Screen
          name='Change Profile'
          component={UpdateProfile}
          options={{ headerShown: false, gestureEnabled: false }}
        />
        <Stack.Screen
          name='Search'
          component={Search}
          options={{ gestureEnabled: false }}
        />
        <Stack.Screen
          name='TempHeader'
          component={OtherUserProfile}
          options={{ gestureEnabled: false }}
        />
        <Stack.Screen
          name='Camera'
          component={CameraScreen}
          options={{ gestureEnabled: false }}
        />
      </Stack.Navigator>
    )
  }
}

export default UpdateProfileStack
