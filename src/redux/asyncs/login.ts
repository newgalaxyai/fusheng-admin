import { createAsyncThunk } from '@reduxjs/toolkit'
import { IThunkUserState } from '../types/user'
import { getLoginInfoAPI, getLoginPermissionInfoAPI } from '@/api/login'
import { setUserLoadingAction, setUserInfoAction, setUserRoleAction } from '../modules/user'
import { getStringStaffRole } from '@/utils/staff'

// 修改泛型类型：第一个参数是返回数据的类型，而不是void
export const getLoginInfoAsync = createAsyncThunk<
    void, // 返回的数据类型，你可以根据实际API返回类型调整
    undefined,
    IThunkUserState
>('staff/getLoginInfoAsync', async (_, { dispatch }) => {
    // 在此请求接口获取数据
    const res = await getLoginInfoAPI()
    if (res.success) {
        // 请求成功
        // 设置数据
        dispatch(setUserInfoAction(res.data))
        // 设置等待状态
    } else {
        // 设置数据
        dispatch(setUserInfoAction(null))
    }
})

export const getLoginPermissionInfoAsync = createAsyncThunk<
    void, // 返回的数据类型，你可以根据实际API返回类型调整
    undefined,
    IThunkUserState
>('staff/getLoginPermissionInfoAsync', async (_, { dispatch }) => {
    // 在此请求接口获取数据
    const res = await getLoginPermissionInfoAPI()
    if (res.success) {
        let userRole: string[] = []
        // 请求成功
        const roleData = getStringStaffRole(res.data.roles)
        if (roleData) {
            userRole = [roleData]
        }
        // 设置数据
        dispatch(setUserRoleAction(userRole))
        // 设置等待状态
        dispatch(setUserLoadingAction(false))
    } else {
        // 设置数据
        dispatch(setUserInfoAction(null))
        // 设置等待状态
        dispatch(setUserLoadingAction(false))
    }
})
