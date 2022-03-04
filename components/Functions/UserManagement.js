import AsyncStorage from '@react-native-async-storage/async-storage'
import ErrorMessage from '../ErrorMessage'

/* global fetch */

export async function getProfilePicture(userID) {
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
        throw new ErrorMessage('Unauthorized', 401)
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
      return error
    })
}

export async function logout() {
  const token = await AsyncStorage.getItem('@session_token')
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
        return response
      } else if (response.status === 401) {
        throw new ErrorMessage('Unauthorized', 401)
      } else {
        throw new ErrorMessage('Something went wrong', 500)
      }
    })
    .catch((error) => {
      return error
    })
}

export async function login() {
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
      await AsyncStorage.setItem('@session_token', responseJson.token)
      await AsyncStorage.setItem('@user_id', responseJson.id.toString())
      this.props.navigation.navigate('Feed')
    })
    .catch((error) => {
      return error
    })
}

export async function uploadPicture(data) {
  const userID = await AsyncStorage.getItem('@user_id')
  const token = await AsyncStorage.getItem('@session_token')

  const res = await fetch(data.base64)
  const blob = await res.blob()

  return fetch(
    'http://localhost:3333/api/1.0.0/user/'.concat(userID, '/photo'),
    {
      method: 'post',
      headers: {
        'Content-Type': 'image/png',
        'X-Authorization': token
      },
      body: blob
    }
  )
    .then((response) => {
      console.log('Picture Added', response)
    })
    .catch((error) => {
      console.log(error)
    })
}
