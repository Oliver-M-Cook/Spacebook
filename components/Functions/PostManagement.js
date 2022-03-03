import AsyncStorage from '@react-native-async-storage/async-storage'
import ErrorMessage from '../ErrorMessage'

/* global fetch */

export async function getPosts (userID) {
  const token = await AsyncStorage.getItem('@session_token')
  return fetch(
    'http://localhost:3333/api/1.0.0/user/'.concat(userID, '/post'),
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

export async function sendPost (postBody, userID) {
  const token = await AsyncStorage.getItem('@session_token')
  return fetch(
    'http://localhost:3333/api/1.0.0/user/'.concat(userID, '/post'),
    {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        'X-Authorization': token
      },
      body: JSON.stringify(postBody)
    }
  )
    .then((response) => {
      if (response.status === 201) {
        console.log('Posted')
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

export async function getPost (userID, postID) {
  const token = await AsyncStorage.getItem('@session_token')
  return fetch(
    'http://localhost:3333/api/1.0.0/user/'.concat(userID, '/post/', postID),
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

export async function deletePost (userID, postID) {
  const token = await AsyncStorage.getItem('@session_token')
  return fetch(
    'http://localhost:3333/api/1.0.0/user/'.concat(userID, '/post/', postID),
    {
      method: 'delete',
      headers: {
        'X-Authorization': token
      }
    }
  )
    .then((response) => {
      if (response.status === 200) {
        console.log('Deleted')
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

export async function updatePost (userID, postID, postBody) {
  const token = await AsyncStorage.getItem('@session_token')
  return fetch(
    'http://localhost:3333/api/1.0.0/user/'.concat(userID, '/post/', postID),
    {
      method: 'patch',
      headers: {
        'Content-Type': 'application/json',
        'X-Authorization': token
      },
      body: JSON.stringify(postBody)
    }
  )
    .then((response) => {
      if (response.status === 200) {
        console.log('Updated')
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
      method: 'post',
      headers: {
        'X-Authorization': token
      }
    }
  )
    .then((response) => {
      if (response.status === 200) {
        console.log('Liked')
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
      method: 'delete',
      headers: {
        'X-Authorization': token
      }
    }
  )
    .then((response) => {
      if (response.status === 200) {
        console.log('Unliked')
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
