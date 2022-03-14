import AsyncStorage from '@react-native-async-storage/async-storage'
import ErrorMessage from '../ErrorMessage'

/* global fetch */

export async function signUp () {
  return fetch('http://localhost:3333/api/1.0.0/user', {
    method: 'POST',
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
      return error
    })
}

export async function login () {
  return fetch('http://localhost:3333/api/1.0.0/login', {
    method: 'POST',
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

export async function logout () {
  const token = await AsyncStorage.getItem('@session_token')
  await AsyncStorage.removeItem('@session_token')
  await AsyncStorage.removeItem('@user_id')
  return fetch('http://localhost:3333/api/1.0.0/logout', {
    method: 'POST',
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

export async function getUser (userID) {
  const token = await AsyncStorage.getItem('@session_token')

  return fetch('http://localhost:3333/api/1.0.0/user/'.concat(userID), {
    method: 'GET',
    headers: {
      'X-Authorization': token
    }
  })
    .then((response) => {
      if (response.status === 200) {
        return response.json()
      } else if (response.status === 401) {
        throw new ErrorMessage('Unauthorised', 401)
      } else if (response.status === 404) {
        throw new ErrorMessage('Not Found', 404)
      } else {
        throw new ErrorMessage('Something went wrong', 500)
      }
    })
    .catch((error) => {
      return error
    })
}

export async function updateUser (userID, data) {
  const token = await AsyncStorage.getItem('@session_token')

  return fetch('http://localhost:3333/api/1.0.0/user/'.concat(userID), {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'X-Authorization': token
    },
    body: JSON.stringify(data)
  })
    .then((response) => {
      if (response.status === 200) {
        return { code: 200 }
      } else if (response.status === 400) {
        throw new ErrorMessage('Bad Request', 400)
      } else if (response.status === 401) {
        throw new ErrorMessage('Unauthorised', 401)
      } else if (response.status === 403) {
        throw new ErrorMessage('Forbidden', 403)
      } else if (response.status === 404) {
        throw new ErrorMessage('Not Found', 404)
      } else {
        throw new ErrorMessage('Something went wrong', 500)
      }
    })
    .catch((error) => {
      return error
    })
}

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

export async function uploadPicture (data) {
  const userID = await AsyncStorage.getItem('@user_id')
  const token = await AsyncStorage.getItem('@session_token')

  const res = await fetch(data.base64)
  const blob = await res.blob()

  return fetch(
    'http://localhost:3333/api/1.0.0/user/'.concat(userID, '/photo'),
    {
      method: 'POST',
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
