import { configureStore } from '@reduxjs/toolkit'
import routeReducer from './modules/route'
import exampleReducer from './modules/example'
import userReducer from './modules/user'
import { IRequest } from '@/api/type'

const store = configureStore({
  reducer: {
    route: routeReducer,
    example: exampleReducer,
    user: userReducer
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
