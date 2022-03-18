import { useFocusEffect, useNavigation } from '@react-navigation/native'
import React, { useEffect, useRef, useState } from 'react'
import {
  FlatList,
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
  // States used by the screen
  const [isLoading, setLoading] = useState(true)
  const [isFriends, setFriends] = useState(true)
  const [postText, setPostText] = useState('')
  const [posts, setPosts] = useState([])
  const [refresh, setRefresh] = useState(true)
  const [userState, setUser] = useState()
  const [modalVisible, setModalVisible] = useState(false)
  const [drafts, setDrafts] = useState([])
  const [scheduleTimer, setScheduleTimer] = useState([])
  const [refreshDrafts, setDraftRefresh] = useState(true)
  const [blankPost, setBlankPost] = useState(false)

  // Stops useEffect from running on the first mount
  const isInitialMount = useRef(true)

  // Allows navigation on the screen
  const navigation = useNavigation()

  // Only runs when userState is updated
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
        // Checks to see if the user is logged in
        if (props.loggedIn) {
          const user = await AsyncStorage.getItem('@user_id')
          setUser(user)
        } else {
          // Stops undefined values from being set
          if (props.userID !== undefined) {
            setUser(props.userID)
          }
        }
      }

      setup()

      // This is called when the screen is out of focus
      return () => setUser()
    }, [props.userID])
  )

  // Fetches posts and filters through response
  const fetchPosts = async () => {
    const response = await getPosts(props.userID)
    if (response.code === 401) {
      navigation.navigate('Main Menu')
    } else if (response.code === 403) {
      setFriends(false)
      setLoading(false)
    } else {
      setPosts(response)
      setRefresh(!refresh)
      setLoading(false)
    }
  }

  const handlePostText = (text) => {
    setPostText(text)
  }

  // Opens modal drafts
  const handleModal = async () => {
    const data = await AsyncStorage.getItem('@drafts')
    setDrafts(JSON.parse(data))
    setModalVisible(true)
  }

  const handleScheduleTimer = (index, value) => {
    // Array is used to hold times becuase multiple drafts can exist
    const tempArray = scheduleTimer
    // Only accepts integers
    tempArray[index] = value.replace(/[^0-9]/g, '')
    setScheduleTimer(tempArray)
  }

  // Sends post to the server after some validation
  const sendPostText = async () => {
    if (postText.length !== 0) {
      setBlankPost(false)
      const response = await sendPost({ text: postText }, props.userID)
      if (response.code === 401) {
        // Navigates to main menu if user is unauthorized
        navigation.navigate('Main Menu')
      } else {
        setPostText('')
        fetchPosts()
      }
    } else {
      setBlankPost(true)
    }
  }

  // Likes and Unlikes Post
  const handleLike = async (userID, postID) => {
    // Tries to like the post
    const response = await likePost(userID, postID)

    // If it fails then it tries to unlike the post
    if (response.code === 403 || response.code === 500) {
      await unlikePost(userID, postID)
      fetchPosts()
    } else {
      fetchPosts()
    }
  }

  // Adds the draft to async strorage after validation
  const handleDraft = async () => {
    if (postText.length !== 0) {
      setBlankPost(false)
      const newDraft = { text: postText, userID: props.userID }
      const draftsString = await AsyncStorage.getItem('@drafts')
      setPostText('')

      // If array is already created then push new elements, else create the array
      if (draftsString) {
        const draft = JSON.parse(draftsString)
        draft.push(newDraft)
        await AsyncStorage.setItem('@drafts', JSON.stringify(draft))
      } else {
        await AsyncStorage.setItem('@drafts', JSON.stringify([newDraft]))
      }
    } else {
      setBlankPost(true)
    }
  }

  // Closes the modal
  const handleCloseModal = () => {
    setScheduleTimer([])
    setModalVisible(false)
  }

  const handleSchedule = async (index) => {
    if (index >= 0) {
      // Gets timer at specific index
      const timer = scheduleTimer[index]

      // Gets the data to be scheduled
      let dataArray = await AsyncStorage.getItem('@drafts')
      dataArray = JSON.parse(dataArray)
      const data = dataArray[index]

      // Formats the data
      const fomattedText = { text: data.text }

      // Sets Timeout so the post is posted after a certain delay
      setTimeout(sendPost, timer * 60 * 1000, fomattedText, data.userID)

      handleDeleteDraft(index)
    }
  }

  // Uses Splice to delete element from array
  const handleDeleteDraft = async (index) => {
    const newDrafts = drafts
    newDrafts.splice(index, 1)
    setDrafts(newDrafts)
    setScheduleTimer([])
    setDraftRefresh(!refreshDrafts)
    await AsyncStorage.setItem('@drafts', JSON.stringify(newDrafts))
  }

  const RenderNoPost = () => {
    return (
      <Text style={{ color: 'red', fontSize: 15 }}>Post Cannot Be Blank</Text>
    )
  }

  // Checks if the user is loggedIn or friends
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
          {/* Creates a modal */}
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
                style={{
                  backgroundColor: '#DCD6F7',
                  margin: 10,
                  padding: 20,
                  borderWidth: 2,
                  borderColor: '#985F6F',
                  borderRadius: 20
                }}
              >
                {/* Flatlist for the drafts */}
                <FlatList
                  data={drafts}
                  renderItem={({ item, index }) => (
                    <View>
                      <Text>{item.text}</Text>
                      <View style={{ flexDirection: 'row', marginTop: 5 }}>
                        <TouchableOpacity
                          onPress={() => handleDeleteDraft(index)}
                          style={{ marginRight: 5 }}
                        >
                          <Text style={styles.button}>Delete</Text>
                        </TouchableOpacity>
                        <TextInput
                          placeholder='Enter time in minutes...'
                          onChangeText={(value) =>
                            handleScheduleTimer(index, value)}
                          value={scheduleTimer[index]}
                        />
                        <TouchableOpacity
                          onPress={() => handleSchedule(index)}
                          style={{ marginRight: 5 }}
                        >
                          <Text style={styles.button}>Schedule</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  )}
                  extraData={refreshDrafts}
                />
                <TouchableOpacity
                  onPress={handleCloseModal}
                  style={{ alignSelf: 'flex-start', marginTop: 5 }}
                >
                  <Text style={styles.button}>Close</Text>
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
            {/* Tells the user that they can't enter a blank post */}
            {blankPost && <RenderNoPost />}
            <View
              style={{ flexDirection: 'row', justifyContent: 'space-around' }}
            >
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
                onPress={handleModal}
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
          </View>
          {/* Render the header for the flatlist */}
          <RenderFlatListHeader />
          {/* Flatlist for the posts */}
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

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#B4869F',
    padding: 5,
    borderRadius: 10,
    fontSize: 15
  }
})

export default PostComponent
