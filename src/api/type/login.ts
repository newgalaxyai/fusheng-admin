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

export type ISendMobileCodeRequest = {
    mobile: string // 手机号
    scene: number // 场景
    captchaVerification?: string // 验证码
}

export type IVerifyMobileCodeRequest = {
    mobile: string // 手机号
    scene: number // 场景 23:重置密码 21:登录
    code: string // 验证码
}

export type IResetPasswordRequest = {
    mobile: string // 手机号
    code: string // 验证码
    password: string // 新密码
}

export type IPhoneLoginRequest = {
    mobile: string // 手机号
    code: string // 验证码
}
