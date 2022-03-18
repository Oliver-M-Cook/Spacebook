import { useFocusEffect, useNavigation } from '@react-navigation/native'
import React, { useEffect, useRef, useState } from 'react'
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native'
import { deletePost, getPost, updatePost } from './Functions/PostManagement'
import AsyncStorage from '@react-native-async-storage/async-storage'
import CustomHeader from './CustomHeader'

const SinglePost = (props) => {
  // States used by the screen
  const [postData, setData] = useState()
  const [isLoading, setLoading] = useState(true)
  const [postText, setText] = useState('')
  const [blankPost, setBlankPost] = useState(false)

  const isInitialMount = useRef(true)

  const navigation = useNavigation()

  const handleNewText = (text) => {
    setText(text)
  }

  // Deletes the post from the server
  const handleDelete = async () => {
    const userID = props.route.params.userID
    const response = await deletePost(userID, postData.id)
    if (response.code === 200) {
      navigation.goBack()
    }
  }

  // Sends new post data to be updated
  const handleUpdate = async () => {
    if (postText.length !== 0) {
      setBlankPost(false)
      const userID = props.route.params.userID
      const reqBody = {
        text: postText
      }
      const response = await updatePost(userID, postData.id, reqBody)

      if (response.code === 200) {
        navigation.goBack()
      }
    } else {
      setBlankPost(true)
    }
  }

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false
    } else {
      setLoading(false)
    }
  }, [postData])

  useFocusEffect(
    React.useCallback(() => {
      // Sets up the screen so all the data needed is saved to states
      const setup = async () => {
        const userID = props.route.params.userID
        const postID = props.route.params.postID

        const loggedUser = await AsyncStorage.getItem('@user_id')

        const response = await getPost(userID, postID)
        const dateAndTime = response.timestamp.split('T')
        const time = dateAndTime[1].split('.')[0]

        // Checks if the author is logged in
        const isAuthor = parseInt(loggedUser) === response.author.user_id

        // Only takes data that is needed by the screen
        const postData = {
          id: response.post_id,
          author: response.author,
          date: dateAndTime[0],
          time: time,
          text: response.text,
          numLikes: response.numLikes,
          isAuthor: isAuthor
        }

        setText(postData.text)

        setData(postData)
      }

      setup()
    }, [])
  )

  const RenderNoPost = () => {
    return (
      <Text style={{ color: 'red', fontSize: 15 }}>Post Cannot Be Blank</Text>
    )
  }

  if (!isLoading) {
    // Allows the text to be changed and deleted if user is the author
    if (postData.isAuthor) {
      return (
        <View style={styles.container}>
          <CustomHeader />
          <Text>You Posted:</Text>
          <TextInput
            placeholder='New Post Text...'
            multiline
            style={{ height: 100 }}
            value={postText}
            onChangeText={handleNewText}
          />
          {blankPost && <RenderNoPost />}
          <Text style={styles.text}>
            At {postData.time} on {postData.date}
          </Text>
          <Text style={styles.text}>And has {postData.numLikes} likes</Text>
          <View
            style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}
          >
            <TouchableOpacity
              style={{ marginBottom: 5 }}
              onPress={handleDelete}
            >
              <Text style={styles.button}>Delete</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleUpdate}>
              <Text style={styles.button}>Update</Text>
            </TouchableOpacity>
          </View>
        </View>
      )
    } else {
      return (
        // Only shows the data and cannot be changed
        <View style={styles.container}>
          <CustomHeader />
          <Text style={styles.text}>
            {postData.author.first_name} {postData.author.last_name} Posted:
          </Text>
          <Text style={styles.text}>{postData.text}</Text>
          <Text style={styles.text}>
            At {postData.time} on {postData.date}
          </Text>
          <Text style={styles.text}>And has {postData.numLikes} likes</Text>
        </View>
      )
    }
  } else {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#B4869F',
    padding: 5,
    borderRadius: 10,
    fontSize: 20
  },
  container: {
    backgroundColor: '#DCD6F7',
    flex: 1
  },
  text: {
    fontSize: 15
  }
})

export default SinglePost
