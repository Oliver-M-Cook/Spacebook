import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList
} from '@react-navigation/drawer'
import React from 'react'
import { logout } from './Functions/UserManagement'

const CustomDrawerContent = (props) => {
  const handleLogout = async () => {
    await logout()
    props.navigation.navigate('Main Menu')
  }

  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <DrawerItem label='Logout' onPress={handleLogout} />
    </DrawerContentScrollView>
  )
}

export default CustomDrawerContent
