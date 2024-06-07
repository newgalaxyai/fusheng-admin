import { createSlice } from '@reduxjs/toolkit'
import { IExampleState } from '../types/example'

const initialState: IExampleState = {
  data: {}
}

const exampleSlice = createSlice({
  name: 'example',
  initialState,
  reducers: {
    initDataAction: (state, { payload }) => {
      state.data = { ...payload }
    }
  }
})

export const { initDataAction } = exampleSlice.actions
export default exampleSlice.reducer
