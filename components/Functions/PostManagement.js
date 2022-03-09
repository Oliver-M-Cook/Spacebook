import AsyncStorage from '@react-native-async-storage/async-storage'
import ErrorMessage from '../ErrorMessage'

/* global fetch */

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
