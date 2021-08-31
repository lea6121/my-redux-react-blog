import { getAuthToken } from './utils'

const BASE_URL = 'https://student-json-api.lidemy.me'

export const getPosts = (page) => {
  return fetch(
    `${BASE_URL}/posts?_sort=createdAt&_order=desc&_page=${page}&_limit=5`
  ).then((res) => {
    let totalPosts = res.headers.get('x-total-count')
    let posts = res.json()
    return { totalPosts, posts }
  })
}

export const getPost = (id) => {
  return fetch(`${BASE_URL}/posts/${id}`).then((res) => res.json())
}

export const login = ({ username, password }) => {
  return fetch(`${BASE_URL}/login`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify({
      username,
      password
    })
  }).then((res) => res.json())
}

export const getMe = () => {
  const token = getAuthToken()
  return fetch(`${BASE_URL}/me`, {
    headers: {
      authorization: `Bearer ${token}`
    }
  }).then((res) => res.json())
}

export const register = ({ nickname, username, password }) => {
  return fetch(`${BASE_URL}/register`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify({
      nickname,
      username,
      password
    })
  }).then((res) => res.json())
}

export const postNewPost = ({ title, body }) => {
  const token = getAuthToken()
  return fetch(`${BASE_URL}/posts`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      authorization: `Bearer ${token}`
    },
    body: JSON.stringify({
      title,
      body
    })
  }).then((res) => res.json())
}

export const deletePost = (id) => {
  const token = getAuthToken()
  return fetch(`${BASE_URL}/posts/${id}`, {
    method: 'DELETE',
    headers: {
      'content-type': 'application/json',
      authorization: `Bearer ${token}`
    }
  }).then((res) => res.json())
}

export const editPost = ({ id, title, body }) => {
  return fetch(`${BASE_URL}/posts/${id}`, {
    method: 'PATCH',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify({
      title,
      body
    })
  }).then((res) => res.json())
}
