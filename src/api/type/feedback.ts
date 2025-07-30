export type IOpinionListRequest = {
    pageNo: number // 页码
    pageSize: number // 每页条数
    opinionNo?: string // 意见编号
    mobile?: string // 用户手机号
    createStartTime?: number // 创建时间
    createEndTime?: number // 创建时间
}

export type IOpinionList = {
    id: number // 意见ID
    userId: number // 用户ID
    contactMsg: string // 用户联系信息
    content: string // 反馈内容
    status: string // 状态
    statusDesc: string // 状态描述
    replyContent?: string // 回复内容
    replyTime?: number // 回复时间
    replyUserId?: number // 回复人id
    category: string // 分类
    categoryDesc: string // 分类描述
    priority: number // 优先级
    tags?: string // 标签
    images?: string[] // 图片附件
    createTime: number // 创建时间
    updateTime?: number // 更新时间
}

export type IOpinionListResponse = {
    list: IOpinionList[],
    total: number
}

export type IOpinionDetailRequest = {
    id: number // 意见ID
}

