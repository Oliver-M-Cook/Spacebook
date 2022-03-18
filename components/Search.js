import { Component } from 'react'
import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native'
import CustomHeader from './CustomHeader'
import { search } from './Functions/FriendManagement'
import { getProfilePicture } from './Functions/UserManagement'

class Search extends Component {
  constructor (props) {
    super(props)

    this.state = {
      profilePictures: [],
      isLoading: true,
      loadingCounter: 0,
      data: [],
      query: ''
    }

    this.offset = 0
  }

  // Runs the functions when the component is mounted to the screen
  componentDidMount () {
    const userIDs = this.props.route.params.userIDs

    const setup = async () => {
      // Gets the profile pictures of the users
      const profilePictures = await Promise.all(
        userIDs.map(async (userID) => {
          return getProfilePicture(userID)
        })
      )

      // Sets the offset used in pagination
      this.offset = this.offset + 20

      // Sets the state to hold the data for the screen
      this.setState({
        profilePictures: profilePictures,
        data: JSON.parse(this.props.route.params.output),
        query: this.props.route.params.query,
        isLoading: false
      })
    }

    setup()
  }

  // This function gets more data when load more is pushed
  handleMoreData = async () => {
    const response = await search(this.state.query, this.offset)
    const extraData = JSON.parse(response.users)
    const profilePictures = await Promise.all(
      response.userIDs.map(async (userID) => {
        return getProfilePicture(userID)
      })
    )
    this.offset = this.offset + 20

    this.setState({
      data: [...this.state.data, ...extraData],
      profilePictures: [...this.state.profilePictures, ...profilePictures]
    })
  }

  // Navigates to the user profile
  openUserProfile = (item, index) => {
    this.props.navigation.navigate('TempHeader', {
      userData: item,
      profilePicture: this.state.profilePictures[index]
    })
  }

  // Used to render the footer of the flatlist
  renderFooter () {
    return (
      <View style={{ flex: 1, alignSelf: 'center', marginTop: 5 }}>
        <TouchableOpacity onPress={this.handleMoreData}>
          <Text
            style={{
              backgroundColor: '#B4869F',
              fontSize: 15,
              padding: 15,
              borderRadius: 20
            }}
          >
            Load More
          </Text>
        </TouchableOpacity>
      </View>
    )
  }

  render () {
    if (!this.state.isLoading) {
      return (
        <View style={{ backgroundColor: '#DCD6F7', flex: 1 }}>
          <CustomHeader />
          {/* Flatlist for the users from the search */}
          <FlatList
            style={{ margin: 10 }}
            data={this.state.data}
            renderItem={({ item, index }) => (
              <TouchableOpacity
                onPress={() => this.openUserProfile(item, index)}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginBottom: 5
                }}
              >
                <Image
                  source={{ uri: this.state.profilePictures[index] }}
                  style={{
                    width: 50,
                    height: 50,
                    borderWidth: 2,
                    borderRadius: 25,
                    borderColor: '#B4869F'
                  }}
                />
                <Text style={{ paddingLeft: 10, fontSize: 15 }}>
                  {item.user_givenname.concat(' ', item.user_familyname)}
                </Text>
              </TouchableOpacity>
            )}
            keyExtractor={(item) => item.user_id}
            // Adds the footer to the flatlist
            ListFooterComponent={this.renderFooter.bind(this)}
          />
        </View>
      )
    } else {
      return (
        <View>
          <Text>Loading...</Text>
        </View>
      )
    }
  }
}

export default Search
