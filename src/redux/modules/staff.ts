import { createSlice } from '@reduxjs/toolkit'
import { IStaffState } from '../types/staff'

const initialState: IStaffState = {
  staffList: [
    {
      id: 1,
      staffNumber: '1234567890',
      staffName: '张三',
      staffStatus: true,
      staffStatusName: '启用',
      staffMobile: '1234567890',
      staffDepartmentId: 1,
      staffDepartmentName: '技术部',
      staffPositionId: 1,
      staffPositionName: '技术员',
      staffRole: 'super',
      staffRoleName: '超级管理员',
      staffCreateTime: 1715404800,
      staffUpdateTime: 1715404800,
      staffDeleteTime: 1715404800
    },
    {
      id: 2,
      staffNumber: '1234567890',
      staffName: '王五',
      staffStatus: false,
      staffStatusName: '禁用',
      staffMobile: '1234567891',
      staffDepartmentId: 1,
      staffDepartmentName: '技术部',
      staffPositionId: 1,
      staffPositionName: '技术员',
      staffRole: 'admin',
      staffRoleName: '管理员',
      staffCreateTime: 1715404800,
      staffUpdateTime: 1715404800,
      staffDeleteTime: 1715404800
    },
    {
      id: 3,
      staffNumber: '1234567890',
      staffName: '李四',
      staffStatus: false,
      staffStatusName: '禁用',
      staffMobile: '1234567892',
      staffDepartmentId: 1,
      staffDepartmentName: '技术部',
      staffPositionId: 1,
      staffPositionName: '技术员',
      staffRole: 'staff',
      staffRoleName: '员工',
      staffCreateTime: 1715404800,
      staffUpdateTime: 1715404800,
      staffDeleteTime: 1715404800
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
