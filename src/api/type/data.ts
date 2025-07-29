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
    flowDirection: 0 | 1 // 页面流向 0：流入；1：流出
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

export type IMessageListRequest = {
    id: number // 会话ID
}

export type IMessageList = {
    id: number // 消息ID
    role: 'user' | 'ai' // 角色 user：用户；ai：ai助手
    content: string // 消息内容
    createTime: number // 创建时间
}

export type IMessageListResponse = {
    list: IMessageList[],
    total: number
}

export type IEvaluateListRequest = {
    id: number // 评价ID
}

export type IEvaluateList = {
    id: number // 评价ID
    entry: number // 问答入口 1：追踪大赢家
    openid: string // 用户编号
    nickname: string // 用户昵称
    question: string // 问题
    questionTime: number // 问题时间
    think: string // 思考
    thinkTime: number // 思考时间
    answer: string // 回答
    answerTime: number // 回答时间
    evaluate: number // 评价 1：满意 2：不满意
    createTime: number // 创建时间
}

export type IEvaluateListResponse = {
    list: IEvaluateList[],
    total: number
}
