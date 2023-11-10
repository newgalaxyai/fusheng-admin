import { configureStore } from '@reduxjs/toolkit'
import corpLoginUserReducer from './modules/corpLoginUser'

const store = configureStore({
  reducer: {
    corpLoginUser: corpLoginUserReducer
  }
})

export type IRootState = ReturnType<typeof store.getState>
export type DispatchType = typeof store.dispatch

export default store
