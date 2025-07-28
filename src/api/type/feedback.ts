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
    opinionNo: string // 意见编号
    consumerName: string // 用户名称
    mobile: string // 用户手机号
    opinionContent: string // 意见内容
    imageList?: string[] // 图片附件
    createTime: number // 创建时间
}

export type IOpinionListResponse = {
    list: IOpinionList[],
    total: number
}

