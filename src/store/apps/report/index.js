import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// ** Axios Imports
import { authConfig } from 'src/configs/urls'
import axios from "axios"
// ** Fetch Users
export const fetchData = createAsyncThunk('reportImage/fetchData', async () => {
  const response = await axios.get(window.localStorage.getItem("baseUrl") + "/api" + '/image-report', {
    headers: {
      Authorization: `Bearer ${window.localStorage.getItem(authConfig.storageTokenKeyName)}`
    }
  })
  return response.data
})

// ** Delete Report
export const deleteReport = createAsyncThunk('reportImage/actionReport', async (data, { getState, dispatch }) => {
  const response = await axios.delete(window.localStorage.getItem("baseUrl") + "/api" + `/image-report/${data.item.id}`, {
    headers: {
      Authorization: `Bearer ${window.localStorage.getItem(authConfig.storageTokenKeyName)}`
    },
    data
  })
  await dispatch(fetchData(getState().user.params))

  return response.data
})

export const appReportImageSlice = createSlice({
  name: 'reportImage',
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

export default appReportImageSlice.reducer
