export type IConsumerListRequest = {
    pageNo: number // 页码
    pageSize: number // 每页条数
    id?: number // 用户ID
    openid?: string // 用户编号
    nickname?: string // 用户昵称
    consumerStatus?: boolean // 用户状态 true:启用 false:禁用
    mobile?: string // 用户手机号
    waterMark?: number // 水印编号
    createStartTime?: number // 注册开始时间
    createEndTime?: number // 注册结束时间
}

export type IConsumerList = {
    id: number // 用户ID
    openid: string // 用户编号
    nickname: string // 用户昵称
    status: number // 用户状态 0:启用 1:禁用
    mobile: string // 用户手机号
    compareCompany: string // 关联企业
    consumerPositionName: string // 用户职位名称
    registerSource: 0 | 1 // 注册来源 0：未知来源 1：小程序 
    // registerTime: number // 注册时间戳
    waterMark: number // 水印编号
    loginIp: string // 最后登录IP
    loginArea: string // 最后登录城市
    createTime: number // 创建时间戳
    updateTime: number // 更新时间戳
    avatar?: string // 用户头像
    sex?: 0 | 1 | 2 // 用户性别 0:保密 1:男 2:女
    remark?: string // 备注
    // password?: string // 密码
}

export type IConsumerListResponse = {
    list: IConsumerList[],
    total: number
}

export type IConsumerDetailRequest = {
    id: number // 用户ID
}

export type IConsumerOffListRequest = {
    id: number // 用户ID
}

export type IConsumerOffList = {
    id: number // 记录ID
    offTime: number // 注销时间
    operation: 1 | 2 | 3 // 操作 1:注册 2:注销 3:修改
    operator: string // 操作人
}

export type IFavorListRequest = {
    pageNo: number // 页码
    pageSize: number // 每页条数
    openid?: string // 用户编号
    mobile?: string // 用户手机号
    nickname?: string // 用户昵称
    content?: string // 收藏内容
    createStartTime?: number // 收藏开始时间
    createEndTime?: number // 收藏结束时间
}

export type IFavorList = {
    id: number // 收藏记录ID
    openid: string // 用户编号
    nickname: string // 用户昵称
    avatar: string // 用户头像
    mobile: string // 用户手机号
    compareCompany: string // 关联企业
    question: string // 问题: 
    answer: string // 回答:
    createTime: number // 创建时间戳
}

export type IFavorListResponse = {
    list: IFavorList[],
    total: number
}

export type ILoginListRequest = {
    pageNo: number // 页码
    pageSize: number // 每页条数
    userType: number // 用户类型 1：员工 2：用户
    userId?: string // 用户编号
    username?: string // 用户手机号
    nickname?: string // 用户昵称
    area?: string // 登录地区
    createTime?: string[] // 登录时间
    'createTime[0]'?: any // 创建时间
    'createTime[1]'?: any // 创建时间
}

export type ILoginList = {
    id: number // 登录日志id
    userId: string // 用户编号
    nickname: string // 用户昵称
    username: string // 用户手机号
    userIp: string // 登录ip
    createTime: number // 登录时间戳
    area: string // 登录地区
    loginType: 1 | 2 // 登录方式 1：小程序登录2：普通登录
}

export type ILoginListResponse = {
    list: ILoginList[],
    total: number
}

// 修改用户状态
export type IConsumerChangeStatusRequest = {
    id: number // 用户ID
    status: number // 用户状态 0:启用 1:禁用
}
