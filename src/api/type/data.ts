export type IPageAnalysisListRequest = {
    pageNo: number // 页码
    pageSize: number // 每页条数
    pageName?: string // 页面名称
    pagePath?: string // 页面路径
    dateStart?: string // 日期
    dateEnd?: string // 日期
}

export type IPageAnalysisList = {
    id: number // 记录ID
    pageName: string // 页面名称
    pagePath: string // 页面路径
    visitPeopleNo: number // 访问人数
    visitPageNo: number // 访问页面数
    perPeopleAvg: number // 人均停留时长（秒）
    perVisitAvg: number // 次均停留时长（秒）
    date: number // 日期
}

export type IPageAnalysisListResponse = {
    list: IPageAnalysisList[],
    total: number
}

export type IPageFlowListRequest = {
    pageNo: number // 页码
    pageSize: number // 每页条数
    flowDirection?: string // 页面名称
    pagePath?: string // 页面路径
    dateStart?: string // 日期
    dateEnd?: string // 日期
}

export type IPageFlowList = {
    id: number // 记录ID
    pageName: string // 页面名称
    flowDirection: number // 页面流向 0：流入；1：流出
    visitPeopleNo: number // 访问人数
    visitPageNo: number // 访问页面数
    date: number // 日期
}

export type IPageFlowListResponse = {
    list: IPageFlowList[],
    total: number
}

export type IQARecordListRequest = {
    pageNo: number // 页码
    pageSize: number // 每页条数
    sessionName?: string // 会话标题
    consumerName?: string // 用户名称
    createStartTime?: number // 创建时间
    createEndTime?: number // 创建时间
}

export type IQARecordList = {
    id: number // 会话ID
    sessionName: string // 会话标题
    openid: string // 用户编号
    consumerName: string // 用户名称
    createTime: number // 创建时间
}

export type IQARecordListResponse = {
    list: IQARecordList[],
    total: number
}
