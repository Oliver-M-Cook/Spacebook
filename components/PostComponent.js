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
import {
  getPosts,
  likePost,
  sendPost,
  unlikePost
} from './Functions/PostManagement'

const RenderFlatListHeader = () => {
  return <Text style={{ fontSize: 25, fontWeight: 'bold' }}>Posts</Text>
}

const PostComponent = (props) => {
  const [isLoading, setLoading] = useState(true)
  const [isFriends, setFriends] = useState(true)
  const [postText, setPostText] = useState('')
  const [posts, setPosts] = useState([])
  const [refresh, setRefresh] = useState(true)
  const [userState, setUser] = useState()

  const isInitialMount = useRef(true)

  const navigation = useNavigation()

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false
    } else {
      fetchPosts()
    }
  }, [userState])

  useFocusEffect(
    React.useCallback(() => {
      const setup = async () => {
        if (props.loggedIn) {
          const user = await AsyncStorage.getItem('@user_id')
          setUser(user)
        } else {
          if (props.userID !== undefined) {
            setUser(props.userID)
          }
        }
      }

      setup()

      return () => setUser()
    }, [props.userID])
  )

  const fetchPosts = async () => {
    const response = await getPosts(props.userID)
    if (response.code === 401) {
      navigation.navigate('Main Menu')
    } else if (response.code === 403) {
      setFriends(false)
      setLoading(false)
    } else {
      console.log(response)
      setPosts(response)
      setRefresh(!refresh)
      setLoading(false)
    }
  }

  const handlePostText = (text) => {
    setPostText(text)
  }

  const sendPostText = async () => {
    const response = await sendPost({ text: postText }, props.userID)
    if (response.code === 401) {
      navigation.navigate('Main Menu')
    } else {
      setPostText('')
      fetchPosts()
    }
  }

  const handleLike = async (userID, postID) => {
    const response = await likePost(userID, postID)

    if (response.code === 403 || response.code === 500) {
      await unlikePost(userID, postID)
      fetchPosts()
    } else {
      fetchPosts()
    }
  }

  if (!isLoading) {
    if (isFriends || props.loggedIn) {
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
              onChangeText={handlePostText}
              value={postText}
            />
            <TouchableOpacity
              style={{ backgroundColor: 'green' }}
              onPress={sendPostText}
            >
              <Text>Post</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={posts}
            renderItem={({ item, index }) => (
              <View style={{ marginBottom: 10 }}>
                <Text>
                  Posted By:{' '}
                  {item.author.first_name + ' ' + item.author.last_name}
                </Text>
                <Text>{item.text}</Text>
                <TouchableOpacity
                  onPress={() => handleLike(props.userID, item.post_id)}
                >
                  <Text>Like/Unlike</Text>
                </TouchableOpacity>
                <Text>Number of Likes: {item.numLikes}</Text>
              </View>
            )}
            ListHeaderComponent={RenderFlatListHeader}
            StickyHeaderComponent={[0]}
            keyExtractor={(item) => item.post_id}
            extraData={refresh}
          />
        </View>
      )
    } else {
      return (
        <View>
          <Text>Only Friends Can See/Post Posts</Text>
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

export default PostComponent
