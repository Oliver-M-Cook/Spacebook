import AsyncStorage from '@react-native-async-storage/async-storage'
import ErrorMessage from '../ErrorMessage'

/* global fetch */

// fetches posts given a userID and returns the JSON response
export async function getPosts (userID) {
  const token = await AsyncStorage.getItem('@session_token')
  return fetch(
    'http://localhost:3333/api/1.0.0/user/'.concat(userID, '/post'),
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
          'Can only view the posts of yourself or your friends',
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

// sends the post to the server given the request body and userID
export async function sendPost (postBody, userID) {
  const token = await AsyncStorage.getItem('@session_token')

  return fetch(
    'http://localhost:3333/api/1.0.0/user/'.concat(userID, '/post'),
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Authorization': token
      },
      body: JSON.stringify(postBody)
    }
  )
    .then((response) => {
      if (response.status === 201) {
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

// gets a singular post given userID and postID
export async function getPost (userID, postID) {
  const token = await AsyncStorage.getItem('@session_token')
  return fetch(
    'http://localhost:3333/api/1.0.0/user/'.concat(userID, '/post/', postID),
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
          'Can only view the posts of yourself or your friends',
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

// deletes a post from the server given userID and postID
export async function deletePost (userID, postID) {
  const token = await AsyncStorage.getItem('@session_token')
  return fetch(
    'http://localhost:3333/api/1.0.0/user/'.concat(userID, '/post/', postID),
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
      } else if (response.status === 403) {
        throw new ErrorMessage('You can only delete your own posts', 403)
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

// updates post using PATCH given userID, postID and request body
export async function updatePost (userID, postID, postBody) {
  const token = await AsyncStorage.getItem('@session_token')
  return fetch(
    'http://localhost:3333/api/1.0.0/user/'.concat(userID, '/post/', postID),
    {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'X-Authorization': token
      },
      body: JSON.stringify(postBody)
    }
  )
    .then((response) => {
      if (response.status === 200) {
        return { code: 200 }
      } else if (response.status === 400) {
        throw new ErrorMessage('Bad Request', 400)
      } else if (response.status === 401) {
        throw new ErrorMessage('Unauthorized', 401)
      } else if (response.status === 403) {
        throw new ErrorMessage('You can only update your own posts', 403)
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

// sends a POST to the server that adds a like a post given userID and postID
export async function likePost (userID, postID) {
  const token = await AsyncStorage.getItem('@session_token')
  return fetch(
    'http://localhost:3333/api/1.0.0/user/'.concat(
      userID,
      '/post/',
      postID,
      '/like'
    ),
    {
      method: 'POST',
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
      } else if (response.status === 403) {
        throw new ErrorMessage('You have already liked this post', 403)
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

// deletes a like from a post using DELETE given userID and postID
export async function unlikePost (userID, postID) {
  const token = await AsyncStorage.getItem('@session_token')
  return fetch(
    'http://localhost:3333/api/1.0.0/user/'.concat(
      userID,
      '/post/',
      postID,
      '/like'
    ),
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
      } else if (response.status === 403) {
        throw new ErrorMessage('You have not liked this post', 403)
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
