export type ILoginRequest = {
    username: string // 用户名
    password: string // 密码
}

export type ILoginResponse = {
    userId: number // 用户ID
    accessToken: string // 访问令牌
    refreshToken: string // 刷新令牌
    expiresTime: number // 过期时间
}
