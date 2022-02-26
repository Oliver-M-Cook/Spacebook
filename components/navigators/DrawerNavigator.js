import { Component } from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer'
import CustomDrawerContent from '../CustomDrawerContent'
import AuthStackNavigator from './AuthStackNavigator'
import FriendStackNavigator from './FriendStackNavigator'

const Drawer = createDrawerNavigator()

class DrawerNavigator extends Component {
	render() {
		return (
			<Drawer.Navigator
				drawerContent={(props) => <CustomDrawerContent {...props} />}
			>
				<Drawer.Screen
					name='Profile'
					component={AuthStackNavigator}
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
