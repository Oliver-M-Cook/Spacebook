import AsyncStorage from '@react-native-async-storage/async-storage'
import ErrorMessage from '../ErrorMessage'

/* global fetch */

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
        throw new ErrorMessage('Unauthorized', 401)
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
      return error
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
        return { code: 200, message: 'Added Friend' }
      } else if (response.status === 401) {
        throw new ErrorMessage('Unauthorized', 401)
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
      return error
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
        throw new ErrorMessage('Unauthorized', 401)
      } else {
        throw new ErrorMessage('Something went wrong', 500)
      }
    })
    .catch((error) => {
      console.log(error)
      return error
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
        throw new ErrorMessage('Unauthorized', 401)
      } else if (response.status === 404) {
        throw new ErrorMessage('Not Found', 404)
      } else {
        throw new ErrorMessage('Something went wrong', 500)
      }
    })
    .catch((error) => {
      console.log(error)
      return error
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
        throw new ErrorMessage('Unauthorized', 401)
      } else if (response.status === 404) {
        throw new ErrorMessage('Not Found', 404)
      } else {
        throw new ErrorMessage('Something went wrong', 500)
      }
    })
    .catch((error) => {
      console.log(error)
      return error
    })
}

export async function search (query, offset) {
  const token = await AsyncStorage.getItem('@session_token')
  const userID = await AsyncStorage.getItem('@user_id')
  return fetch(
    'http://localhost:3333/api/1.0.0/search?q='.concat(
      query,
      '&search_in=all',
      '&offset=',
      offset
    ),
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
      } else if (response.status === 400) {
        throw new ErrorMessage('Bad Request', 400)
      } else if (response.status === 401) {
        throw new ErrorMessage('Unauthorized', 401)
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
      const users = JSON.stringify(responseJson)
      const userIDs = []

      responseJson.forEach((user) => {
        userIDs.push(user.user_id)
      })

      return { users: users, userIDs: userIDs }
    })
    .catch((error) => {
      return error
    })
}
