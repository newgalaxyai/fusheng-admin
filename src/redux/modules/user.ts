import { createSlice } from '@reduxjs/toolkit'
import { IUserState } from '../types/user'

// 用户状态
const initialState: IUserState = {
  loading: true,
  // userRole: ['super_admin'],
  // permissions: ['*:*:*'],
  userRole: [],
  permissions: [],
  userInfo: null,
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // 普通的同步reducers可以放在这里
    setUserLoadingAction(state, { payload }) {
      state.loading = payload
    },
    setUserInfoAction(state, { payload }) {
      state.userInfo = payload
    },
    setUserRoleAction(state, { payload }) {
      state.userRole = payload
    },
    resetUserAction(state) {
      state.userInfo = null
      state.userRole = []
    },
  },
})

export const {
  setUserLoadingAction,
  setUserInfoAction,
  setUserRoleAction,
  resetUserAction,
} = userSlice.actions
export default userSlice.reducer
