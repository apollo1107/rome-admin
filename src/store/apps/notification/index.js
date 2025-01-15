import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// ** Axios Imports
import { authConfig } from 'src/configs/urls'
import axios from "axios"
// ** Fetch Users
export const fetchData = createAsyncThunk('notification/fetchData', async () => {
  const response = await axios.get(window.localStorage.getItem("baseUrl") + "/api" + '/admin/cms-notification', {
    headers: {
      Authorization: `Bearer ${window.localStorage.getItem(authConfig.storageTokenKeyName)}`
    }
  })
  return response.data
})

export const addNotification = createAsyncThunk('crm-notification/addNotification', async (data, { getState, dispatch }) => {
  const response = await axios.post(window.localStorage.getItem("baseUrl") + "/api" + "/admin/cms-notification", data, {
    headers: {
      Authorization: `Bearer ${window.localStorage.getItem(authConfig.storageTokenKeyName)}`
    }
  })
  await dispatch(fetchData(getState()))

  return response.data
})

export const updateNotification = createAsyncThunk('crm-notification/updateNotification', async (data, { getState, dispatch }) => {
  const response = await axios.put(window.localStorage.getItem("baseUrl") + "/api" + `/admin/cms-notification/${data.id}`, data, {
    headers: {
      Authorization: `Bearer ${window.localStorage.getItem(authConfig.storageTokenKeyName)}`
    }
  })

  await dispatch(fetchData(getState()))

  return response.data
})

// ** Delete Report
export const deleteNotification = createAsyncThunk('cms-notification/deleteNotification', async (data, { getState, dispatch }) => {
  const response = await axios.delete(window.localStorage.getItem("baseUrl") + "/api" + `/admin/cms-notification/${data.id}`, {
    headers: {
      Authorization: `Bearer ${window.localStorage.getItem(authConfig.storageTokenKeyName)}`
    },
    data
  })
  await dispatch(fetchData(getState()))

  return response.data
})

export const appCMSNotificationSlice = createSlice({
  name: 'cmsNotification',
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

export default appCMSNotificationSlice.reducer
