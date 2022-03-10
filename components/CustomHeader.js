import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { Text, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'

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
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={{ fontSize: 40, color: '#B4869F' }}>{'\u276E'}</Text>
      </TouchableOpacity>
    </View>
  )
}

export default CustomHeader
