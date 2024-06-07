import { configureStore } from '@reduxjs/toolkit'

const store = configureStore({
  reducer: {
  }
})

export type IRootState = ReturnType<typeof store.getState>
export type DispatchType = typeof store.dispatch

export default store
