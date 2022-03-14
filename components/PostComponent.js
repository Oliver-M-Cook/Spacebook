import { useFocusEffect, useNavigation } from '@react-navigation/native'
import React, { useEffect, useRef, useState } from 'react'
import {
  Alert,
  FlatList,
  Image,
  Modal,
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
  return (
    <Text
      style={{
        fontSize: 25,
        fontWeight: 'bold',
        borderBottomWidth: 2,
        borderColor: '#985F6F'
      }}
    >
      Posts
    </Text>
  )
}

const PostComponent = (props) => {
  const [isLoading, setLoading] = useState(true)
  const [isFriends, setFriends] = useState(true)
  const [postText, setPostText] = useState('')
  const [posts, setPosts] = useState([])
  const [refresh, setRefresh] = useState(true)
  const [userState, setUser] = useState()
  const [modalVisible, setModalVisible] = useState(false)

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

  const handleDraft = async () => {
    const newDraft = { text: postText, userID: props.userID }
    const draftsString = await AsyncStorage.getItem('@drafts')
    if (draftsString) {
      const draft = JSON.parse(draftsString)
      draft.push(newDraft)
      await AsyncStorage.setItem('@drafts', JSON.stringify(draft))
      console.log(draft)
    } else {
      await AsyncStorage.setItem('@drafts', JSON.stringify([newDraft]))
    }
  }

  if (!isLoading) {
    if (isFriends || props.loggedIn) {
      return (
        <View
          style={{
            margin: 10,
            backgroundColor: '#DCD6F7',
            borderWidth: 2,
            borderColor: '#985F6F',
            flex: 1
          }}
        >
          <Modal
            animationType='slide'
            transparent
            visible={modalVisible}
            onRequestClose={() => {
              setModalVisible(false)
            }}
          >
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              <View
                style={{ backgroundColor: '#DCD6F7', margin: 20, padding: 35 }}
              >
                <Text>Hello World</Text>
                <TouchableOpacity onPress={() => setModalVisible(false)}>
                  <Text>Close</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
          <View
            style={{
              padding: 10,
              borderBottomWidth: 2,
              borderColor: '#985F6F'
            }}
          >
            <TextInput
              placeholder='Enter Post Text...'
              multiline
              style={{ height: 100 }}
              onChangeText={handlePostText}
              value={postText}
            />

            <TouchableOpacity
              onPress={handleDraft}
              style={{ alignSelf: 'center', marginTop: 10 }}
            >
              <Text
                style={{
                  backgroundColor: '#B4869F',
                  alignSelf: 'center',
                  fontSize: 15,
                  padding: 10,
                  borderRadius: 10
                }}
              >
                Save To Drafts
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setModalVisible(true)}
              style={{ alignSelf: 'center', marginTop: 10 }}
            >
              <Text
                style={{
                  backgroundColor: '#B4869F',
                  alignSelf: 'center',
                  fontSize: 15,
                  padding: 10,
                  borderRadius: 10
                }}
              >
                Drafts
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={sendPostText}
              style={{ alignSelf: 'center', marginTop: 10 }}
            >
              <Text
                style={{
                  backgroundColor: '#B4869F',
                  alignSelf: 'center',
                  fontSize: 15,
                  padding: 10,
                  borderRadius: 10
                }}
              >
                Post
              </Text>
            </TouchableOpacity>
          </View>
          <RenderFlatListHeader />
          <FlatList
            data={posts}
            style={{ flex: 1 }}
            renderItem={({ item, index }) => (
              <TouchableOpacity
                style={{
                  paddingBottom: 10,
                  paddingLeft: 10,
                  borderBottomWidth: 1,
                  paddingTop: 5,
                  borderColor: '#985F6F'
                }}
                onPress={() =>
                  navigation.navigate('Single Post', {
                    postID: item.post_id,
                    userID: userState
                  })}
              >
                <Text>
                  Posted By:{' '}
                  {item.author.first_name + ' ' + item.author.last_name}
                </Text>
                <Text style={{ fontSize: 15, marginTop: 5 }}>{item.text}</Text>
                <View style={{ flexDirection: 'row', marginTop: 5 }}>
                  <TouchableOpacity
                    onPress={() => handleLike(props.userID, item.post_id)}
                    style={{ alignSelf: 'flex-start' }}
                  >
                    <Text
                      style={{
                        backgroundColor: '#B4869F',
                        padding: 5,
                        borderRadius: 10,
                        fontSize: 15
                      }}
                    >
                      Like/Unlike
                    </Text>
                  </TouchableOpacity>
                  <Text style={{ alignSelf: 'center', paddingLeft: 10 }}>
                    Number of Likes: {item.numLikes}
                  </Text>
                </View>
              </TouchableOpacity>
            )}
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
