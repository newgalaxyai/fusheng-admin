import { LOCAL_STORAGE_NAME } from "./constants"

// 获取accessToken
export const getAccessToken = () => {
    return localStorage.getItem(LOCAL_STORAGE_NAME.ACCESS_TOKEN)
}

// 设置accessToken
export const setAccessToken = (token: string) => {
    localStorage.setItem(LOCAL_STORAGE_NAME.ACCESS_TOKEN, token)
}

// 删除accessToken
export const removeAccessToken = () => {
    localStorage.removeItem(LOCAL_STORAGE_NAME.ACCESS_TOKEN)
}

// 获取refreshToken
export const getRefreshToken = () => {
    return localStorage.getItem(LOCAL_STORAGE_NAME.REFRESH_TOKEN)
}

// 设置refreshToken

export const setRefreshToken = (refreshToken: string) => {
    localStorage.setItem(LOCAL_STORAGE_NAME.REFRESH_TOKEN, refreshToken)
}

// 删除refreshToken
export const removeRefreshToken = () => {
    localStorage.removeItem(LOCAL_STORAGE_NAME.REFRESH_TOKEN)
}

// 获取记住我
export const getRememberMe = () => {
    return localStorage.getItem(LOCAL_STORAGE_NAME.REMEMBER_ME)
}

// 设置记住我
export const setRememberMe = (rememberMe: boolean) => {
    localStorage.setItem(LOCAL_STORAGE_NAME.REMEMBER_ME, rememberMe.toString())
}
