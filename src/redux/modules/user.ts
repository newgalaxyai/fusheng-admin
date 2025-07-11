import { createSlice } from '@reduxjs/toolkit'
import { IUserState } from '../types/user'

// 用户状态
const initialState: IUserState = {
  loading: false,
  userRole: 'super',
  permissions: ['*:*:*']
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // 普通的同步reducers可以放在这里
  },
})

export const {  } = userSlice.actions
export default userSlice.reducer
