import { IStaffList } from "./staff"

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

export type roles = {
    id: string // 角色标识
    name: string // 角色名称
}

export type ILoginInfo = IStaffList & {
    roles: roles[]
}

export type ILoginPermissionInfo = {
    roles: string[]
}
