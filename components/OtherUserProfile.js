import { Component } from 'react'
import { Image, Text, View } from 'react-native'
import CustomHeader from './CustomHeader'
import FriendButton from './FriendButton'
import PostComponent from './PostComponent'

class OtherUserProfile extends Component {
  constructor (props) {
    super(props)

    this.state = {
      userData: {}
    }
  }

  // On mount sets userData
  componentDidMount () {
    this.setState({
      userData: this.props.route.params.userData
    })
  }

  render () {
    return (
      <View style={{ flex: 1, backgroundColor: '#DCD6F7' }}>
        {/* Renders the custom header to the screen */}
        <CustomHeader />
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            padding: 10,
            borderBottomWidth: 2,
            borderColor: '#985F6F'
          }}
        >
          {/* Adds an image that was sent through props from the previous screen */}
          <Image
            source={{ uri: this.props.route.params.profilePicture }}
            style={{
              width: 150,
              height: 150,
              borderWidth: 2,
              borderRadius: 75,
              borderColor: '#985F6F'
            }}
          />
          <View
            style={{
              flexDirection: 'column',
              alignItems: 'center',
              flex: 1
            }}
          >
            <Text>
              {this.state.userData.user_givenname +
                ' ' +
                this.state.userData.user_familyname}
            </Text>
            <FriendButton userID={this.state.userData.user_id} />
          </View>
        </View>
        {/* Renders the users posts */}
        <PostComponent userID={this.state.userData.user_id} />
      </View>
    )
  }
}

export default OtherUserProfile
