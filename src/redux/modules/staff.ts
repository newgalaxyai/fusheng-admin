import { createSlice } from '@reduxjs/toolkit'
import { IStaffState } from '../types/staff'

const initialState: IStaffState = {
  staffList: [
    {
      id: 1,
      staffNumber: '1234567890',
      staffName: '张三',
      staffStatus: true,
      staffMobile: '1234567890',
      staffDepartmentName: '技术部',
      staffPositionName: '技术员',
      staffRole: 'super_admin',
      staffCreateTime: 1715404800,
      staffUpdateTime: 1715404800,
      staffDeleteTime: 1715404800,
      certificateType: 1,
      certificateNumber: '1234567890'
    },
    {
      id: 2,
      staffNumber: '1234567890',
      staffName: '王五',
      staffStatus: false,
      staffMobile: '1234567891',
      staffDepartmentName: '技术部',
      staffPositionName: '技术员',
      staffRole: 'admin',
      staffCreateTime: 1715404800,
      staffUpdateTime: 1715404800,
      staffDeleteTime: 1715404800,
      certificateType: 1,
      certificateNumber: '1234567890'
    },
    {
      id: 3,
      staffNumber: '1234567890',
      staffName: '李四',
      staffStatus: false,
      staffMobile: '1234567892',
      staffDepartmentName: '技术部',
      staffPositionName: '技术员',
      staffRole: 'staff',
      staffCreateTime: 1715404800,
      staffUpdateTime: 1715404800,
      staffDeleteTime: 1715404800,
      certificateType: 1,
      certificateNumber: '1234567890'
    },
  ],
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
