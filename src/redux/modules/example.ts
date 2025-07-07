import { createSlice } from '@reduxjs/toolkit'
import { IExampleState } from '../types/example'

const initialState: IExampleState = {
  loading: false,
  data: null
}

const exampleSlice = createSlice({
  name: 'example',
  initialState,
  reducers: {
    // 等待状态
    setExampleLoading: (state, { payload }) => {
      state.loading = payload
    },
    // 修改数据
    setExampleData: (state, { payload }) => {
      state.data = payload
    }
  },
})

export const { setExampleData, setExampleLoading } = exampleSlice.actions
export default exampleSlice.reducer
