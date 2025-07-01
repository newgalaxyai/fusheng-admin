import axios from "axios"
import { VITE_BASE_URL } from "@/service/config"
import { getToken, setToken } from "./storge"

// 刷新token的API调用
export const refreshTokenAPI = async () => {
    const refreshToken = getToken()
    if (!refreshToken) {
        throw new Error('没有刷新令牌')
    }

    try {
        const response = await axios(`${VITE_BASE_URL}/admin-api/system/auth/refresh-token`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'tenant-id': '1'
            },
            data: { refreshToken }
        })

        if (response.status !== 200) {
            throw new Error('刷新令牌失败')
        }

        const result = response.data
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
