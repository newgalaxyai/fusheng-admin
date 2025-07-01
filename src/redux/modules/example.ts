import { createSlice } from '@reduxjs/toolkit'
import { IExampleState } from '../types/example'
import { getExampleAsync } from '../asyncs/example'

const initialState: IExampleState = {
  loading: false,
  data: null
}

const exampleSlice = createSlice({
  name: 'example',
  initialState,
  reducers: {
    // 普通的同步reducers可以放在这里
    clearExample: (state) => {
      state.data = null
    }
  },
  // 使用extraReducers处理异步thunk
  extraReducers: (builder) => {
    builder
      // 处理pending状态
      .addCase(getExampleAsync.pending, (state) => {
        state.loading = true
      })
      // 处理fulfilled状态 - 这里直接更新数据
      .addCase(getExampleAsync.fulfilled, (state, action) => {
        state.loading = false
        state.data = action.payload // 直接使用thunk返回的数据
      })
      // 处理rejected状态
      .addCase(getExampleAsync.rejected, (state, action) => {
        state.loading = false
        state.data = null
      })
  }
})

export const { clearExample } = exampleSlice.actions
export default exampleSlice.reducer
