export type IRefreshTokenResponse = {
    userId: number
    accessToken: string
    refreshToken: string
    expiresTime: number
}

export type ILoginResponse = {
    userId: number
    accessToken: string
    refreshToken: string
    expiresTime: number
}
