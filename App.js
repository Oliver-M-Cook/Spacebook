import 'react-native-gesture-handler'

import * as React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import StartStackNavigator from './components/navigators/StartStackNavigator'

export default function App () {
  return (
    <NavigationContainer>
      <StartStackNavigator />
    </NavigationContainer>
  )
}
