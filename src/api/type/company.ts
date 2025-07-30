export type ICompanyListRequest = {
    pageNo: number // 页码
    pageSize: number // 每页条数
    companyNo?: string // 公司编号
    companyName?: string // 公司名称
    taxNo?: string // 税号
    areaId?: number // 地区
    registerStartTime?: number // 注册时间
    registerEndTime?: number // 注册时间
    matchScoreStart?: number // 匹配度
    matchScoreEnd?: number // 匹配度
}

export type ICompanyList = {
    id: number // 公司ID
    companyNo: string // 公司编号
    companyName: string // 公司名称 
    taxNo: string // 纳税人识别号
    taxType: number // 纳税人资质
    companyType: number // 企业类型
    companyIntroduction: string // 企业简介
    provinceId: number // 省
    provinceName: string // 省名称
    cityId: number // 市
    cityName: string // 市名称
    districtId: number // 区/县
    districtName: string // 区/县名称
    address: string // 详细地址
    legalPersonName: string // 法人
    personScale: number // 人员规模
    registerTime: number // 注册时间
    registeredCapital: number // 注册资本
    actualCapital: number // 实缴资本
    industry: number // 行业
    productLabel: number // 产品应用标签
    website: string // 公司网站
    status: number // 公司登记状态
    employeeNum: number // 员工人数
    insuredNum: number // 参保人数
    matchScore: number // 匹配度
    businessScope: number // 经营范围
    operateTermStart: number // 经营期限开始
    operateTermEnd: number // 经营期限结束
    tags: string[] // 标签
    creditCode: string // 统一社会信用代码
    businessLicenseNo: string // 工商注册号
    orgCode: string // 组织机构代码
    importExportCode: string // 进出口企业代码
    seaRegisterCode: string // 海关注册编码
    approvalDate: number // 核准日期
    registerOffice: string // 登记机关
    oldNames: string[] // 曾用名
    englishName: string // 英文名
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
