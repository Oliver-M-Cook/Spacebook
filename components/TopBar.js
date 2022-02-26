import { Component } from 'react'
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { getProfilePicture, search } from './Functions/FunctionStorage'

class TopBar extends Component {
  constructor (props) {
    super(props)

    this.state = {
      query: '',
      output: '',
      userIDs: [],
      userProfilePicture: ''
    }
  }

  handleSideNav = () => {
    this.props.navigation.openDrawer()
  }

  handleQuery = (query) => {
    this.setState({ query: query })
  }

  async componentDidMount () {
    const userID = await AsyncStorage.getItem('@user_id')
    getProfilePicture(userID).then((imageURI) => {
      this.setState({
        userProfilePicture: imageURI
      })
    })
  }

  render () {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={this.handleSideNav}>
          <Image
            source={{ uri: this.state.userProfilePicture }}
            style={{
              width: 50,
              height: 50,
              borderWidth: 2,
              borderRadius: 25,
              borderColor: '#B4869F'
            }}
          />
        </TouchableOpacity>
        <TextInput
          placeholder='Search...'
          style={{ width: 150 }}
          onChangeText={this.handleQuery}
          value={this.state.query}
        />
        <TouchableOpacity
          style={{ justifyContent: 'center' }}
          onPress={search.bind(this)}
        >
          <Text
            style={{
              padding: 10,
              backgroundColor: '#B4869F',
              borderRadius: 10
            }}
          >
            Search
          </Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#A6B1E1',
    justifyContent: 'space-around',
    padding: 20,
    borderBottomWidth: 2,
    borderColor: '#985F6F'
  }
})

export default TopBar
