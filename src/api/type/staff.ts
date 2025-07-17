export type IStaffListRequest = {
    pageNo: number // 页码
    pageSize: number // 每页条数
    staffNumber?: string // 员工编号
    mobile?: string // 员工手机号
    staffStatus?: boolean // 员工状态 true:启用 false:禁用
    username?: string // 员工姓名
    staffRole?: string // 员工角色
    staffCreateTime?: number // 员工创建时间戳
}

export type IStaffList = {
    id: number // 员工ID
    username: string // 员工编号
    nickname: string // 员工姓名
    staffStatus: boolean // 员工状态 true:启用 false:禁用
    mobile: string // 员工手机号
    deptName: string // 员工部门名称
    staffPositionName: string // 员工职位名称
    staffRole: string // 员工角色 super:超级管理员 admin:管理员 user:普通用户
    certificateType: number // 证件类型 1:身份证 2:护照 3:驾驶证 4:军官证 5:港澳居民来往内地通行证 6:台湾居民来往内地通行证 7:外国人永久居留身份证
    certificateNumber: string // 证件号码
    inTime: number // 入职时间
    createTime: number // 员工创建时间戳
    staffUpdateTime: number // 员工更新时间戳
    staffDeleteTime: number // 员工删除时间戳
    sex?: number // 员工性别 0:未知 1:男 2:女
    education?: number // 学历 0:未知 1:博士 2:硕士 3:本科 4:专科 5:高中 6:初中 7:小学
    marriageStatus?: number // 婚姻状态 0:未知 1:未婚 2:已婚
    email?: string // 邮箱
    remark?: string // 备注
    password?: string // 密码
}

export type IStaffListResponse = {
    list: IStaffList[],
    total: number
}

export type IStaffDetailRequest = {
    id: number // 员工ID
}
