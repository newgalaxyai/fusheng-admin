import axios from "axios"
import { VITE_BASE_URL } from "@/service/config"
import { getToken, setToken } from "./storge"
import { refreshTokenURL } from "@/api/url/login"
import { refreshTokenAPI } from "@/api/login"

// 刷新token的API调用
export const refreshToken = async () => {
    const refreshToken = getToken()
    if (!refreshToken) {
        throw new Error('没有刷新令牌')
    }

    try {
        const result = await refreshTokenAPI(refreshToken)

        if (result.code === 0) {
            // 保存新的token
            setToken(result.data.accessToken)
            return result.data.accessToken
        } else {
            throw new Error(result.msg || '刷新令牌失败')
        }
    } catch (error) {
        console.error('刷新token失败:', error)
        throw error
    }
}
