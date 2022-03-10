import { useFocusEffect } from '@react-navigation/native'
import React, { useEffect, useRef, useState } from 'react'
import { Text, TextInput, TouchableOpacity, View } from 'react-native'
import { deletePost, getPost, updatePost } from './Functions/PostManagement'
import AsyncStorage from '@react-native-async-storage/async-storage'
import CustomHeader from './CustomHeader'

const SinglePost = (props) => {
  const [postData, setData] = useState()
  const [isLoading, setLoading] = useState(true)
  const [postText, setText] = useState('')

  const isInitialMount = useRef(true)

  const handleNewText = (text) => {
    setText(text)
  }

  const handleDelete = async () => {
    const userID = props.route.params.userID
    const response = await deletePost(userID, postData.id)
    console.log(response)
  }

  const handleUpdate = async () => {
    const userID = props.route.params.userID
    const reqBody = {
      text: postText
    }
    const response = await updatePost(userID, postData.id, reqBody)

    console.log(response)
  }

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false
    } else {
      console.log(postData)
      setLoading(false)
    }
  }, [postData])

  useFocusEffect(
    React.useCallback(() => {
      const setup = async () => {
        const userID = props.route.params.userID
        const postID = props.route.params.postID

        const loggedUser = await AsyncStorage.getItem('@user_id')

        const response = await getPost(userID, postID)
        const dateAndTime = response.timestamp.split('T')
        const time = dateAndTime[1].split('.')[0]

        const isAuthor = parseInt(loggedUser) === response.author.user_id

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
  if (!isLoading) {
    if (postData.isAuthor) {
      return (
        <View>
          <CustomHeader />
          <Text>You Posted:</Text>
          <TextInput
            placeholder='New Post Text...'
            value={postText}
            onChangeText={handleNewText}
          />
          <Text>
            At {postData.time} on {postData.date}
          </Text>
          <Text>And has {postData.numLikes} likes</Text>
          <TouchableOpacity style={{ marginBottom: 5 }} onPress={handleDelete}>
            <Text>Delete</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleUpdate}>
            <Text>Update</Text>
          </TouchableOpacity>
        </View>
      )
    } else {
      return (
        <View>
          <CustomHeader />

          <Text>
            {postData.author.first_name} {postData.author.last_name} Posted:
          </Text>
          <Text>{postData.text}</Text>
          <Text>
            At {postData.time} on {postData.date}
          </Text>
          <Text>And has {postData.numLikes} likes</Text>
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

export default SinglePost
