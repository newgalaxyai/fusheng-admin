import { refreshTokenURL } from "@/api/url/login"
import { VITE_BASE_URL } from "@/service/config"
import axios from "axios"

// 刷新令牌接口，直接使用axios，避免使用baseRequest导致循环
export const refreshTokenAPI = async (refreshToken: string) => {
    const response = await axios(`${VITE_BASE_URL}${refreshTokenURL}`, {
        method: 'POST',
        headers: {
        },
        data: { refreshToken }
    })

    if (response.status !== 200) {
        throw new Error('刷新令牌失败')
    }

    return response.data
}