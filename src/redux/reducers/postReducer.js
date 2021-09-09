import { createSlice } from '@reduxjs/toolkit'
import {
  getPosts as getPostsAPI,
  getPost as getPostAPI,
  postNewPost as postNewPostAPI,
  editPost as editPostAPI,
  deletePost as deletePostAPI
} from '../../WebAPI'

const initialState = {
  isLoadingPosts: false,
  posts: [],
  totalPosts: 0,
  isLoadingPost: false,
  post: null,
  isLoadingNewPost: false,
  newPostResponse: null,
  isLoadingEditPost: false,
  editedPostResponse: null,
  isLoadingDeletePost: false,
  deletePostResponse: null
}

export const postReducer = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setIsLoadingPosts: (state, action) => {
      state.isLoadingPosts = action.payload
    },

    setPosts: (state, action) => {
      state.posts = action.payload
    },

    setTotalPosts: (state, action) => {
      state.totalPosts = action.payload
    },

    setIsLoadingPost: (state, action) => {
      state.isLoadingPost = action.payload
    },

    setPost: (state, action) => {
      state.post = action.payload
    },

    setIsLoadingNewPost: (state, action) => {
      state.isLoadingNewPost = action.payload
    },

    setNewPostResponse: (state, action) => {
      state.newPostResponse = action.payload
    },

    setIsLoadingEditPost: (state, action) => {
      state.isLoadingEditPost = action.payload
    },

    setEditedPostResponse: (state, action) => {
      state.editedPostResponse = action.payload
    },

    setIsLoadingDeletePost: (state, action) => {
      state.isLoading = action.payload
    },

    setDeletePostResponse: (state, action) => {
      state.deletePostResponse = action.payload
    }
  }
})

export const {
  setIsLoadingPosts,
  setPosts,
  setTotalPosts,
  setIsLoadingPost,
  setPost,
  setIsLoadingNewPost,
  setNewPostResponse,
  setIsLoadingEditPost,
  setEditedPostResponse,
  setIsLoadingDeletePost,
  setDeletePostResponse
} = postReducer.actions

export const getPosts = (page) => (dispatch) => {
  dispatch(setIsLoadingPosts(true))
  getPostsAPI(page)
    .then((data) => {
      dispatch(setIsLoadingPosts(false))
      dispatch(setTotalPosts(data.totalPosts))
      return data.posts
    })
    .then((posts) => {
      dispatch(setPosts(posts))
    })
}

export const getPost = (id) => (dispatch) => {
  dispatch(setIsLoadingPost(true))
  getPostAPI(id).then((article) => {
    dispatch(setPost(article))
    dispatch(setIsLoadingPost(false))
  })
}

export const postNewPost = (data) => (dispatch) => {
  dispatch(setIsLoadingNewPost(true))
  postNewPostAPI(data).then((res) => {
    dispatch(setNewPostResponse(res))
    dispatch(setIsLoadingNewPost(false))
  })
}

export const editPost = (data) => (dispatch) => {
  dispatch(setIsLoadingEditPost(true))
  editPostAPI(data).then((res) => {
    dispatch(setEditedPostResponse(res))
    dispatch(setIsLoadingEditPost(false))
  })
}

export const deletePost = (id) => (dispatch) => {
  dispatch(setIsLoadingDeletePost(true))
  deletePostAPI(id).then((res) => {
    dispatch(setDeletePostResponse(res))
    dispatch(setIsLoadingDeletePost(false))
    let page = 1
    getPostsAPI(page)
      .then((data) => {
        dispatch(setIsLoadingPosts(false))
        dispatch(setTotalPosts(data.totalPosts))
        return data.posts
      })
      .then((posts) => {
        dispatch(setPosts(posts))
      })
  })
}

export default postReducer.reducer
