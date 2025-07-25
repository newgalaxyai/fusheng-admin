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
    taxNo: string // 税号
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
    industry: number // 行业
    productLabel: number // 产品应用标签
    website: string // 公司网站
    status: number // 公司登记状态
    insuredNum: number // 参保人数
    matchScore: number // 匹配度
    businessScope: number // 经营范围
}

export type ICompanyListResponse = {
    list: ICompanyList[] // 公司列表
    total: number // 总条数
}