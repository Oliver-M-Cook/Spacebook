import AsyncStorage from '@react-native-async-storage/async-storage'
import ErrorMessage from '../ErrorMessage'

/* global fetch */

// sends user data to create an account
export async function signUp (postBody) {
  return fetch('http://localhost:3333/api/1.0.0/user', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(postBody)
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
      return { code: 201 }
    })
    .catch((error) => {
      return error
    })
}

// sends login details and returns session token and userID
export async function login (postBody) {
  return fetch('http://localhost:3333/api/1.0.0/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(postBody)
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
      // saves the details into async storage for later use
      await AsyncStorage.setItem('@session_token', responseJson.token)
      await AsyncStorage.setItem('@user_id', responseJson.id.toString())
      return { code: 200 }
    })
    .catch((error) => {
      return error
    })
}

// logs user out and empties async storage for a new user
export async function logout () {
  const token = await AsyncStorage.getItem('@session_token')
  await AsyncStorage.removeItem('@session_token')
  await AsyncStorage.removeItem('@user_id')
  await AsyncStorage.removeItem('@drafts')

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

// gets a singular user details given a userID
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

// updates a users details using PATCH given userID and request body
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

// gets profile picture from server given userID
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

// uploads a new picture to the server
export async function uploadPicture (data) {
  const userID = await AsyncStorage.getItem('@user_id')
  const token = await AsyncStorage.getItem('@session_token')

  // converts data to base64 and converts that to a blob to be sent
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
