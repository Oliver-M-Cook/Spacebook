import { Component } from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer'
import CustomDrawerContent from '../CustomDrawerContent'
import AuthStackNavigator from './AuthStackNavigator'
import FriendStackNavigator from './FriendStackNavigator'
import UpdateProfileStack from './UpdateProfileStack'

const Drawer = createDrawerNavigator()

class DrawerNavigator extends Component {
  render () {
    return (
      // Builds drawer navigator
      <Drawer.Navigator
        // Adds custom drawer content to the draw
        drawerContent={(props) => <CustomDrawerContent {...props} />}
      >
        {/* Adds a screen to the drawer that can be navigated to */}
        <Drawer.Screen
          name='Profile'
          component={AuthStackNavigator}
          // Disables header and gesture becuase a custom header is used
          options={{ headerShown: false, swipeEnabled: false }}
        />

        <Drawer.Screen
          name='Update Profile'
          component={UpdateProfileStack}
          options={{ headerShown: false, swipeEnabled: false }}
        />

        <Drawer.Screen
          name='Friends'
          component={FriendStackNavigator}
          options={{ headerShown: false, swipeEnabled: false }}
        />
      </Drawer.Navigator>
    )
  }
}

export default DrawerNavigator
