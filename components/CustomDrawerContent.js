import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList
} from '@react-navigation/drawer'
import { Component } from 'react'
import { logout } from './Functions/FunctionStorage'

class CustomDrawerContent extends Component {
  render () {
    return (
      <DrawerContentScrollView {...this.props}>
        <DrawerItemList {...this.props} />
        <DrawerItem label='Logout' onPress={logout.bind(this)} />
      </DrawerContentScrollView>
    )
  }
}

export default CustomDrawerContent
