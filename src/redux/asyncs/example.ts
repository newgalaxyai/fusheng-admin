import { createAsyncThunk } from '@reduxjs/toolkit'
import { IThunkExampleState } from '../types/example'
import { IExampleRequest, IExampleResponse } from '@/api/type/example'
import { getExampleAPI } from '@/api/example'

// 修改泛型类型：第一个参数是返回数据的类型，而不是void
export const getExampleAsync = createAsyncThunk<
  IExampleResponse | null, // 返回的数据类型，你可以根据实际API返回类型调整
  IExampleRequest,
  IThunkExampleState
>('example/getExampleAsync', async (payload) => {
  // 在此请求接口获取数据
  const res = await getExampleAPI(payload)
  if (res.success) {
    return res.data
  } else {
    return null
  }
})
