import { createSlice } from '@reduxjs/toolkit'
import { IStaffState } from '../types/staff'

const initialState: IStaffState = {
  staffList: [],
  loading: false
}

const staffSlice = createSlice({
  name: 'staff',
  initialState,
  reducers: {
    // 等待状态
    setStaffLoading: (state, { payload }) => {
      state.loading = payload
    },
    // 修改数据
    setStaffList: (state, { payload }) => {
      state.staffList = payload
    }
  },
})

export const { setStaffList, setStaffLoading } = staffSlice.actions
export default staffSlice.reducer
