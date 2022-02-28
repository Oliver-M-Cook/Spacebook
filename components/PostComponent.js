import { useFocusEffect, useNavigation } from '@react-navigation/native'
import React, { useEffect, useRef, useState } from 'react'
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'

const PostComponent = (props) => {
  return (
    <View
      style={{
        margin: 10,
        backgroundColor: 'yellow',
        borderWidth: 2,
        borderColor: '#985F6F'
      }}
    >
      <View style={{ padding: 10, borderBottomWidth: 2 }}>
        <TextInput
          placeholder='Enter Post Text...'
          multiline
          style={{ height: 100 }}
        />
        <TouchableOpacity>
          <Text>Post</Text>
        </TouchableOpacity>
      </View>
      <Text>Posts will show here</Text>
    </View>
  )
}

export default PostComponent
