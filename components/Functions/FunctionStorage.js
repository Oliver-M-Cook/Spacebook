import AsyncStorage from '@react-native-async-storage/async-storage'
import ErrorMessage from '../ErrorMessage'

/* global fetch */

export async function getProfilePicture (userID) {
  const token = await AsyncStorage.getItem('@session_token')
  return fetch(
    'http://localhost:3333/api/1.0.0/user/'.concat(userID, '/photo'),
    {
      method: 'GET',
      headers: {
        'X-Authorization': token
      }
    }
  )
    .then((response) => {
      if (response.status === 200) {
        return response.blob()
      } else if (response.status === 401) {
        this.props.navigation.navigate('Main Menu')
      } else if (response.status === 404) {
        throw new ErrorMessage('Not Found', 404)
      } else {
        throw new ErrorMessage('Something went wrong', 500)
      }
    })
    .then((resblob) => {
      const imageURI = URL.createObjectURL(resblob)
      return imageURI
    })
    .catch((error) => {
      console.log(error)
    })
}

export async function addFriend (userID) {
  const token = await AsyncStorage.getItem('@session_token')
  return fetch(
    'http://localhost:3333/api/1.0.0/user/'.concat(userID, '/friends'),
    {
      method: 'POST',
      headers: {
        'X-Authorization': token
      }
    }
  )
    .then((response) => {
      if (response.status === 200 || response.status === 201) {
        return 'Added Friend'
      } else if (response.status === 401) {
        this.props.navigation.navigate('Main Menu')
      } else if (response.status === 403) {
        throw new ErrorMessage('User is already added as friend', 403)
      } else if (response.status === 404) {
        throw new ErrorMessage('Not Found', 404)
      } else {
        throw new ErrorMessage('Something went wrong', 500)
      }
    })
    .catch((error) => {
      console.log(error)
    })
}

export async function getFriendRequests () {
  const token = await AsyncStorage.getItem('@session_token')
  return fetch('http://localhost:3333/api/1.0.0/friendrequests', {
    method: 'GET',
    headers: {
      'X-Authorization': token
    }
  })
    .then((response) => {
      if (response.status === 200) {
        return response.json()
      } else if (response.status === 401) {
        this.props.navigation.navigate('Main Menu')
      } else {
        throw new ErrorMessage('Something went wrong', 500)
      }
    })
    .catch((error) => {
      console.log(error)
    })
}

export async function acceptFriendRequest (userID) {
  const token = await AsyncStorage.getItem('@session_token')
  return fetch(
    'http://localhost:3333/api/1.0.0/friendrequests/'.concat(userID),
    {
      method: 'POST',
      headers: {
        'X-Authorization': token
      }
    }
  )
    .then((response) => {
      if (response.status === 200 || response.status === 201) {
        console.log('Accepted')
      } else if (response.status === 401) {
        this.props.navigation.navigate('Main Menu')
      } else if (response.status === 404) {
        throw new ErrorMessage('Not Found', 404)
      } else {
        throw new ErrorMessage('Something went wrong', 500)
      }
    })
    .catch((error) => {
      console.log(error)
    })
}

export async function rejectFriendRequest (userID) {
  const token = await AsyncStorage.getItem('@session_token')
  return fetch(
    'http://localhost:3333/api/1.0.0/friendrequests/'.concat(userID),
    {
      method: 'DELETE',
      headers: {
        'X-Authorization': token
      }
    }
  )
    .then((response) => {
      if (response.status === 200) {
        console.log('Rejected')
      } else if (response.status === 401) {
        this.props.navigation.navigate('Main Menu')
      } else if (response.status === 404) {
        throw new ErrorMessage('Not Found', 404)
      } else {
        throw new ErrorMessage('Something went wrong', 500)
      }
    })
    .catch((error) => {
      console.log(error)
    })
}

export async function getFriends (userID) {
  const token = await AsyncStorage.getItem('@session_token')
  return fetch(
    'http://localhost:3333/api/1.0.0/user/'.concat(userID, '/friends'),
    {
      method: 'GET',
      headers: {
        'X-Authorization': token
      }
    }
  )
    .then((response) => {
      if (response.status === 200) {
        return response.json()
      } else if (response.status === 401) {
        this.props.navigation.navigate('Main Menu')
      } else if (response.status === 403) {
        throw new ErrorMessage(
          'Can only view the friends of yourself or your friends',
          403
        )
      } else if (response.status === 404) {
        throw new ErrorMessage('Not Found', 404)
      } else {
        throw new ErrorMessage('Something went wrong', 500)
      }
    })
    .catch((error) => {
      console.log(error)
    })
}

export async function logout () {
  const token = await AsyncStorage.getItem('@session_token')
  console.log(token)
  await AsyncStorage.removeItem('@session_token')
  await AsyncStorage.removeItem('@user_id')
  return fetch('http://localhost:3333/api/1.0.0/logout', {
    method: 'post',
    headers: {
      'X-Authorization': token
    }
  })
    .then((response) => {
      if (response.status === 200) {
        this.props.navigation.navigate('Main Menu')
      } else if (response.status === 401) {
        this.props.navigation.navigate('Main Menu')
      } else {
        throw new ErrorMessage('Something went wrong', 500)
      }
    })
    .catch((error) => {
      console.log(error)
    })
}

export async function login () {
  return fetch('http://localhost:3333/api/1.0.0/login', {
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(this.state)
  })
    .then((response) => {
      if (response.status === 200) {
        return response.json()
      } else if (response.status === 400) {
        throw new ErrorMessage('Invalid email or password', 400)
      } else {
        throw new ErrorMessage('Something went wrong', 500)
      }
    })
    .then(async (responseJson) => {
      console.log(responseJson)
      await AsyncStorage.setItem('@session_token', responseJson.token)
      await AsyncStorage.setItem('@user_id', responseJson.id.toString())
      this.props.navigation.navigate('Feed')
    })
    .catch((error) => {
      console.log(error)
    })
}

export async function search () {
  const token = await AsyncStorage.getItem('@session_token')
  const userID = await AsyncStorage.getItem('@user_id')
  return fetch(
    'http://localhost:3333/api/1.0.0/search?q='.concat(
      this.state.query,
      '&search_in=all'
    ),
    {
      method: 'get',
      headers: {
        'X-Authorization': token
      }
    }
  )
    .then((response) => {
      if (response.status === 200) {
        return response.json()
      } else if (response.status === 400) {
        throw new ErrorMessage('Bad Request', 400)
      } else if (response.status === 401) {
        this.props.navigation.navigate('Login')
      } else {
        throw new ErrorMessage('Something went wrong', 500)
      }
    })
    .then((responseJson) => {
      let found = false
      let foundIndex = -1
      responseJson.forEach((user, index) => {
        if (user.user_id === parseInt(userID)) {
          foundIndex = index
          found = true
        }
      })
      if (found) {
        responseJson.splice(foundIndex, 1)
      }
      this.setState({ output: JSON.stringify(responseJson) })
      const userIDs = []
      responseJson.forEach((user) => {
        userIDs.push(user.user_id)
      })
      this.props.navigation.navigate('Search', {
        output: this.state.output,
        userIDs: userIDs
      })
    })
    .catch((error) => {
      console.log(error)
    })
}

export async function signUp () {
  return fetch('http://localhost:3333/api/1.0.0/user', {
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(this.state)
  })
    .then((response) => {
      if (response.status === 201) {
        return response.json()
      } else if (response.status === 400) {
        throw new ErrorMessage('Failed Validation', 400)
      } else {
        throw new ErrorMessage('Something went wrong', 500)
      }
    })
    .then((responseJson) => {
      console.log('User created with ID: ', responseJson)
      this.props.navigation.navigate('Main Menu')
    })
    .catch((error) => {
      console.log(error)
    })
}
