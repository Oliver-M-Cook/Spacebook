import AsyncStorage from '@react-native-async-storage/async-storage'
import ErrorMessage from '../ErrorMessage'

/* global fetch */

// getFriends function fetches friends list from the server and returns the JSON response
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
      return error
    })
}

// addFriend function sends a POST to the server to send a friend request
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
      return error
    })
}

// getFriendRequests fetches all requests from the server
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
      return error
    })
}

// acceptFriendRequest sends a POST to accept the friend request
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
        return { code: 201 }
      } else if (response.status === 401) {
        throw new ErrorMessage('Unauthorized', 401)
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

// rejectFriendRequest deletes the request from the server
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
        return { code: 200 }
      } else if (response.status === 401) {
        throw new ErrorMessage('Unauthorized', 401)
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

// search function searches the database for certain users
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
      // This section of code takes out the logged user so they don't appear in thier own searches
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
