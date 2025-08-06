import axios, { AxiosResponse } from "axios"
import { seniorRequest, adminRequest } from "@/service"
import {
    SENIOR_TOKEN,
    SENIOR_TENANT_ID,
    VITE_BASE_URL
} from "@/service/config"
import type {
    IResponseData,
    IResponse,
    ILoginResponse,
    ILoginRequest,
    ILoginInfo,
    ILoginPermissionInfo,
    ISendMobileCodeRequest,
    IVerifyMobileCodeRequest,
    IResetPasswordRequest,
    IPhoneLoginRequest
} from "../type"
import {
    refreshTokenURL,
    loginURL,
    loginInfoURL,
    loginPermissionInfoURL,
    sendMobileCodeURL,
    verifyMobileCodeURL,
    resetPasswordURL,
    phoneLoginURL
} from "../url"


/**
 * 刷新令牌接口，直接使用axios，避免使用baseRequest导致循环
 * @param {string} refreshToken 刷新令牌
 * @returns {Promise<IResponse<IRefreshTokenResponse>>} 刷新令牌
 */
export const refreshTokenAPI = async (refreshToken: string): Promise<IResponse<ILoginResponse>> => {
    const response: AxiosResponse<IResponseData<ILoginResponse>> = await axios(`${VITE_BASE_URL}${refreshTokenURL}`, {
        method: 'POST',
        data: { refreshToken },
        headers: {
            'Authorization': `Bearer ${SENIOR_TOKEN}`,
            'tenant-id': SENIOR_TENANT_ID,
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    })

    if (response.status !== 200) {
        throw new Error('刷新令牌失败')
    }

    if (response.data.code !== 0) {
        return {
            success: false,
            errMsg: response.data.msg || '刷新令牌失败',
            data: response.data.data
        }
    }

    return {
        success: true,
        data: response.data.data
    }
}

/**
 * 账号密码登录接口
 * @param {ILoginRequest} data 登录请求数据
 * @returns {Promise<IResponse<ILoginResponse>>} 登录
 */
export const loginAPI = async (data: ILoginRequest): Promise<IResponse<ILoginResponse>> => {
    const response = await seniorRequest.post<IResponse<ILoginResponse>>({
        url: loginURL,
        data
    })

    return response
}

/**
 * 
 * @returns 用户信息
 */
export const getLoginInfoAPI = async (): Promise<IResponse<ILoginInfo>> => {
    const response = await adminRequest.get<IResponse<ILoginInfo>>({
        url: loginInfoURL,
    })

    return response
}

/**
 * 
 * @returns 用户权限信息
 */
export const getLoginPermissionInfoAPI = async (): Promise<IResponse<ILoginPermissionInfo>> => {
    const response = await adminRequest.get<IResponse<ILoginPermissionInfo>>({
        url: loginPermissionInfoURL,
    })

    return response
}

// 发送手机验证码
export const sendMobileCodeAPI = async (data: ISendMobileCodeRequest): Promise<IResponse<boolean>> => {
    const response = await seniorRequest.post<IResponse<boolean>>({
        url: sendMobileCodeURL,
        data
    })

    return response
}

// 校验手机验证码
export const verifyMobileCodeAPI = async (data: IVerifyMobileCodeRequest): Promise<IResponse<boolean>> => {
    const response = await seniorRequest.post<IResponse<boolean>>({
        url: verifyMobileCodeURL,
        data
    })

    return response
}

// 重置密码
export const resetPasswordAPI = async (data: IResetPasswordRequest): Promise<IResponse<boolean>> => {
    const response = await seniorRequest.post<IResponse<boolean>>({
        url: resetPasswordURL,
        data
    })

    return response
}

// 手机号登录
export const phoneLoginAPI = async (data: IPhoneLoginRequest): Promise<IResponse<ILoginResponse>> => {
    const response = await seniorRequest.post<IResponse<ILoginResponse>>({
        url: phoneLoginURL,
        data
    })

    return response
}
