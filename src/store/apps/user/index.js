import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// ** Axios Imports
import { authConfig } from 'src/configs/urls'
import axios from "axios"
// ** Fetch Users
export const fetchData = createAsyncThunk('appUsers/fetchData', async params => {
  const response = await axios.get(window.localStorage.getItem("baseUrl") + "/api" + '/admin/userlist', {
    headers: {
      Authorization: `Bearer ${window.localStorage.getItem(authConfig.storageTokenKeyName)}`
    },
    params
  })
  return response.data
})

// ** Add User
export const addUser = createAsyncThunk('appUsers/addUser', async (data, { getState, dispatch }) => {

  const response = await axios.post(window.localStorage.getItem("baseUrl") + "/api" + '/apps/users/add-user', {
    headers: {
      Authorization: `Bearer ${window.localStorage.getItem(authConfig.storageTokenKeyName)}`
    },
    data
  })
  dispatch(fetchData(getState().user.params))

  return response.data
})

export const updateUser = createAsyncThunk('appUsers/updateUser', async (data, { getState, dispatch }) => {
  const response = await axios.put(window.localStorage.getItem("baseUrl") + "/api" + '/admin/user-action', data, {
    headers: {
      Authorization: `Bearer ${window.localStorage.getItem(authConfig.storageTokenKeyName)}`
    },
  })

  await dispatch(fetchData(getState().user.params))

  return response.data
})

// ** Delete User
export const deleteUser = createAsyncThunk('appUsers/deleteUser', async (data, { getState, dispatch }) => {
  const response = await axios.delete(window.localStorage.getItem("baseUrl") + "/api" + '/admin/user-action', {
    headers: {
      Authorization: `Bearer ${window.localStorage.getItem(authConfig.storageTokenKeyName)}`
    },
    data
  })
  await dispatch(fetchData(getState().user.params))

  return response.data
})

export const appUsersSlice = createSlice({
  name: 'appUsers',
  initialState: {
    data: [],
  },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchData.fulfilled, (state, action) => {
      state.data = action.payload.data
    })
  }
})

export default appUsersSlice.reducer
