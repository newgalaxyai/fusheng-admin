import { LOGIN_TOKEN_NAME } from "./constants"

export const getToken = () => {
    return localStorage.getItem(LOGIN_TOKEN_NAME)
}

export const setToken = (token: string) => {
    localStorage.setItem(LOGIN_TOKEN_NAME, token)
}

export const removeToken = () => {
    localStorage.removeItem(LOGIN_TOKEN_NAME)
}