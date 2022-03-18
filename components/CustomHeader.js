import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { Text, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'

// Adds a custom header to the screen that matches the colour scheme
const CustomHeader = (props) => {
  const navigation = useNavigation()

  return (
    <View
      style={{
        flexDirection: 'row',
        padding: 10,
        backgroundColor: '#A6B1E1',
        borderBottomWidth: 2,
        borderColor: '#985F6F'
      }}
    >
      {/* Touchable opacity is better than buttons, deal with it */}
      <TouchableOpacity onPress={() => navigation.goBack()}>
        {/* Unicode character used to make the bar look nicer than just a Go back text */}
        <Text style={{ fontSize: 40, color: '#B4869F' }}>{'\u276E'}</Text>
      </TouchableOpacity>
    </View>
  )
}

export default CustomHeader
