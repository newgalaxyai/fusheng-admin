import { LOGIN_TOKEN_NAME, REMEMBER_ME_NAME } from "./constants"

// 获取token
export const getToken = () => {
    return localStorage.getItem(LOGIN_TOKEN_NAME)
}

// 设置token
export const setToken = (token: string) => {
    localStorage.setItem(LOGIN_TOKEN_NAME, token)
}

// 删除token
export const removeToken = () => {
    localStorage.removeItem(LOGIN_TOKEN_NAME)
}

// 获取记住我
export const getRememberMe = () => {
    return localStorage.getItem(REMEMBER_ME_NAME)
}

// 设置记住我
export const setRememberMe = (rememberMe: boolean) => {
    localStorage.setItem(REMEMBER_ME_NAME, rememberMe.toString())
}
