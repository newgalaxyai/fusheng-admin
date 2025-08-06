export type ICompanyListRequest = {
    pageNo: number // 页码
    pageSize: number // 每页条数
    id?: number // 公司编号
    name?: string // 公司名称
    regStatus?: string // 登记状态
    creditCode?: string // 统一社会信用代码
    legalPerson?: string // 法定代表人
    establishTime?: string[] // 成立日期
    provinceName?: string // 省份名称
    cityName?: string // 城市名称
    districtName?: string // 区县名称
    taxpayerId?: string // 纳税人识别号
    orgType?: string // 企业(机构)类型
}

export type ICompanyList = {
    id: number // 主键ID
    name: string // 企业名称
    regStatus: string // 登记状态
    creditCode: string // 统一社会信用代码
    legalPerson: string // 法定代表人
    establishTime: string // 成立日期
    regCapital: string // 注册资本
    paidInCapital: string // 实缴资本
    approvedDate: string // 核准日期
    businessTerm: string // 营业期限
    provinceName: string // 所属省份
    cityName: string // 所属城市
    districtName: string // 所属区县
    regLocation: string // 企业地址
    contactName: string // 联系人名称
    contactPosition: string // 联系人职位
    contactPhone: string // 联系电话
    contactEmail: string // 邮箱
    taxpayerId: string // 纳税人识别号
    regNumber: string // 注册号
    orgNumber: string // 组织机构代码
    socialSecurityStaffNum: number // 参保人数
    staffNumReportYear: string // 参保人数所属年报
    orgType: string // 企业(机构)类型
    categoryNameLv1: string // 国行一级分类
    categoryNameLv2: string // 国行二级分类
    categoryNameLv3: string // 国行三级分类
    latestAnnualReport: string // 最新年报年份
    historyNames: string // 曾用名
    englishName: string // 英文名
    websites: string // 官网
    abstractsBaseInfo: string // 企业简介
    businessScope: string // 经营范围
    judicialDocuments: number // 裁判文书
    dishonestPersons: number // 失信被执行人
    executedPersons: number // 被执行人
    highConsumptionRestrictions: number // 限制高消费
    administrativePenalties: number // 行政处罚
    mainProductTags: string // 主营产品标签
    industryTags: string // 行业赛道标签
    patentCount: number // 专利数量
    inventionPatentCount: number // 发明专利数量
    utilityModelPatentCount: number // 实用新型专利数量
    designPatentCount: number // 外观设计专利数量
    trademarkCount: number // 商标数量
    copyrightCount: number // 作品著作权数量
    softwareCopyrightCount: number // 软件著作权数量
    subsidyCount: number // 获补贴数量
    subsidyAmount: string // 补贴金额(万元)
    honors: string // 荣誉资质
    biddingProjects: number // 中标项目
    judicialDocumentsLink: string // 裁判文书超链接
    dishonestPersLink: string // 失信被执行人超链接
    executedPersonsLink: string // 被执行人超链接
    trademarkCountLink: string // 商标数量超链接
    highConsumptionRestrictionsLink: string // 限制高消费超级链接
    administrativePenaltiesLink: string // 行政处罚超链接
    patentCountLink: string // 专利数量超链接
    copyrightCountLink: string // 作品著作权数量超链接
    softwareCopyrightCountLink: string // 软件著作权数量超链接
    subsidyCountLink: string // 获补贴数量超链接
    biddingProjectsLink: string // 中标项目超链接
    createTime: string // 创建时间
    concatMsg: IConcatMsg[] // 联系人信息List
}

export type IConcatMsg = {
    name: string // 联系人名称
    position: string // 联系人职位
    phone: string // 联系电话
    email: string // 邮箱
}

export type ICompanyListResponse = {
    list: ICompanyList[] // 公司列表
    total: number // 总条数
}

export type IComFeedbackListRequest = ICompanyListRequest & {
    feedType?: number // 反馈类型 1：有效；2：无效
}

export type IComFeedbackList = ICompanyList & {
    id: number // 反馈ID
    feedType: number // 反馈类型 1：有效；2：无效
}

export type IComFeedbackListResponse = {
    list: IComFeedbackList[],
    total: number
}
