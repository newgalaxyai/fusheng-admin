import { createSlice } from '@reduxjs/toolkit'

const corpLoginUserSlice = createSlice({
  name: 'corpLoginUser',
  initialState: {
    LoginUserInfo: {
      UserId: 'ZhangShiJie',
      UserName: '张世杰'
      // UserId: "",
      // UserName: "",
    }
  },
  reducers: {
    initLoginInfo: (state, { payload }) => {
      state.LoginUserInfo.UserId = payload.userid_params
      state.LoginUserInfo.UserName = payload.name_params
    }
  }
})

export const { initLoginInfo } = corpLoginUserSlice.actions
export default corpLoginUserSlice.reducer
