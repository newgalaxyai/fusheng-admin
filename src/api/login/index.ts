import { refreshTokenURL, loginURL, loginInfoURL, loginPermissionInfoURL } from "@/api/url/login"
import { VITE_BASE_URL } from "@/service/config"
import axios, { AxiosResponse } from "axios"
import { IResponse, IResponseData } from "../type"
import { ILoginResponse, ILoginRequest, ILoginInfo, ILoginPermissionInfo } from "../type/login"
import { seniorRequest, adminRequest } from "@/service"
import { SENIOR_TOKEN, SENIOR_TENANT_ID } from "@/service/config"


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
