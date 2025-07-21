import { createAsyncThunk } from '@reduxjs/toolkit'
import { IThunkUserState } from '../types/user'
import { message } from 'antd'
import { getLoginInfoAPI, getLoginPermissionInfoAPI } from '@/api/login'
import { setUserLoadingAction, setUserInfoAction, setUserRoleAction } from '../modules/user'
import { STAFF_ROLE_NAME } from '@/utils/constants'

// 修改泛型类型：第一个参数是返回数据的类型，而不是void
export const getLoginInfoAsync = createAsyncThunk<
    void, // 返回的数据类型，你可以根据实际API返回类型调整
    undefined,
    IThunkUserState
>('staff/getLoginInfoAsync', async (_, { dispatch }) => {
    dispatch(setUserLoadingAction(true))
    // 在此请求接口获取数据
    const res = await getLoginInfoAPI()
    if (res.success) {
        // 请求成功
        // 设置数据
        dispatch(setUserInfoAction(res.data))
        // 设置等待状态
        dispatch(setUserLoadingAction(false))
    } else {
        // 请求失败
        // 弹出错误信息
        message.error(res.errMsg)
        // 设置数据
        dispatch(setUserInfoAction(null))
        // 设置等待状态
        dispatch(setUserLoadingAction(false))
    }
})

export const getLoginPermissionInfoAsync = createAsyncThunk<
    void, // 返回的数据类型，你可以根据实际API返回类型调整
    undefined,
    IThunkUserState
>('staff/getLoginPermissionInfoAsync', async (_, { dispatch }) => {
    dispatch(setUserLoadingAction(true))
    // 在此请求接口获取数据
    const res = await getLoginPermissionInfoAPI()
    if (res.success) {
        // 请求成功
        const roleData = res.data.roles.length > 1 ? res.data.roles.filter(role => role !== STAFF_ROLE_NAME.SUPER) : res.data.roles
        // 设置数据
        dispatch(setUserRoleAction(roleData))
        // 设置等待状态
        dispatch(setUserLoadingAction(false))
    } else {
        // 请求失败
        // 弹出错误信息
        message.error(res.errMsg)
        // 设置数据
        dispatch(setUserInfoAction(null))
        // 设置等待状态
        dispatch(setUserLoadingAction(false))
    }
})
