import { configureStore } from '@reduxjs/toolkit'
import routeReducer from './modules/route'
import exampleReducer from './modules/example'

const store = configureStore({
  reducer: {
    route: routeReducer,
    example: exampleReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      // 开启thunk
      thunk: true,
      // 关闭序列化检查
      serializableCheck: false
    })
})

export type IRootState = ReturnType<typeof store.getState>
export type DispatchType = typeof store.dispatch

export default store
