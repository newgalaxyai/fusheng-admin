export type IConsumerListRequest = {
    pageNo: number // 页码
    pageSize: number // 每页条数
    id?: number // 用户ID
    username?: string // 用户编号
    nickname?: string // 用户昵称
    consumerStatus?: boolean // 用户状态 true:启用 false:禁用
    mobile?: string // 用户手机号
    waterMark?: number // 水印编号
    registerStartTime?: number // 注册开始时间
    registerEndTime?: number // 注册结束时间
}

export type IConsumerList = {
    id: number // 用户ID
    username: string // 用户编号
    nickname: string // 用户昵称
    consumerStatus: boolean // 用户状态 true:启用 false:禁用
    mobile: string // 用户手机号
    compareCompany: string // 关联企业
    consumerPositionName: string // 用户职位名称
    registerSource: number // 注册来源 1：小程序 
    registerTime: number // 注册时间戳
    waterMark: number // 水印编号
    createTime: number // 创建时间戳
    updateTime: number // 更新时间戳
    sex?: number // 用户性别 0:保密 1:男 2:女
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
