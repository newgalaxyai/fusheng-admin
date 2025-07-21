import { createAsyncThunk } from '@reduxjs/toolkit'
import { IThunkStaffState } from '../types/staff'
import { IStaffListRequest, IStaffListResponse } from '@/api/type/staff'
import { getStaffListAPI } from '@/api/staff'
import { setStaffList, setStaffLoading } from '../modules/staff'
import { message } from 'antd'
import { IResponse } from '@/api/type'

// 修改泛型类型：第一个参数是返回数据的类型，而不是void
export const getExampleAsync = createAsyncThunk<
  void, // 返回的数据类型，你可以根据实际API返回类型调整
  IStaffListRequest,
  IThunkStaffState
>('staff/getStaffListAsync', async (queryData, { dispatch }) => {
  dispatch(setStaffLoading(true))
  // 在此请求接口获取数据
  // const res = await getStaffListAPI(queryData)
  const res:IResponse<IStaffListResponse[]> = {
    success: true,
    data: [],
    errMsg: 'test'
  }
  if (res.success) {
    // 请求成功
    // 设置数据
    dispatch(setStaffList(res.data))
    // 设置等待状态
    dispatch(setStaffLoading(false))
  } else {
    // 请求失败
    // 弹出错误信息
    message.error(res.errMsg)
    // 设置数据
    dispatch(setStaffList([]))
    // 设置等待状态
    dispatch(setStaffLoading(false))
  }
})
