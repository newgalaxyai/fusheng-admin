import { refreshTokenURL, loginURL } from "@/api/url/login"
import { VITE_BASE_URL } from "@/service/config"
import axios, { AxiosResponse } from "axios"
import { IResponse, IResponseData } from "../type"
import { IRefreshTokenResponse, ILoginResponse } from "../type/login"
import { adminRequest } from "@/service"


/**
 * 刷新令牌接口，直接使用axios，避免使用baseRequest导致循环
 * @param {string} refreshToken 刷新令牌
 * @returns {Promise<IResponse<IRefreshTokenResponse>>} 刷新令牌
 */
export const refreshTokenAPI = async (refreshToken: string): Promise<IResponse<IRefreshTokenResponse>> => {
    const response: AxiosResponse<IResponseData<IRefreshTokenResponse>> = await axios(`${VITE_BASE_URL}${refreshTokenURL}`, {
        method: 'POST',
        headers: {
        },
        data: { refreshToken }
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
 * @param {string} username 用户名
 * @param {string} password 密码
 * @returns {Promise<IResponse<ILoginResponse>>} 登录
 */
export const loginAPI = async (username: string, password: string): Promise<IResponse<ILoginResponse>> => {
    const response = await adminRequest.post<IResponse<ILoginResponse>>({
        url: loginURL,
        data: {
            username,
            password
        }
    })

    return response
}
