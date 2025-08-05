export type IStaffListRequest = {
    pageNo: number // 页码
    pageSize: number // 每页条数
    staffNumber?: string // 员工编号
    mobile?: string // 员工手机号
    status?: number // 员工状态 0:启用 1:禁用
    username?: string // 员工姓名
    staffRole?: string // 员工角色
    staffCreateStartTime?: number // 员工创建开始时间
    staffCreateEndTime?: number // 员工创建结束时间
}

export type IStaffList = {
    id: number // 员工ID
    employeeNo: string // 员工编号
    username: string // 员工编号
    nickname: string // 员工姓名
    status: 0 | 1 // 员工状态 0:启用 1:禁用
    mobile: string // 员工手机号
    deptName: string // 员工部门名称
    staffPositionName: string // 员工职位名称
    staffRole: 'super_admin' | 'admin' | 'staff' // 员工角色 super:超级管理员 admin:管理员 staff:普通用户
    idType: 'ID_CARD' | 'PASSPORT' | 'MILITARY_ID' | 'OTHER' // 证件类型 ID_CARD:身份证 PASSPORT:护照 MILITARY_ID:军官证 OTHER:其他
    idNumber: string // 证件号码
    hireDate: number[] // 入职时间
    hireTime: number | undefined // 入职时间戳
    createTime: number // 员工创建时间戳
    staffUpdateTime: number // 员工更新时间戳
    staffDeleteTime: number // 员工删除时间戳
    sex?: 0 | 1 | 2 // 员工性别 0:保密 1:男 2:女
    education?: 'DOCTOR' | 'MASTER' | 'BACHELOR' | 'COLLEGE' | 'HIGH_SCHOOL' | 'OTHER' // 学历 DOCTOR:博士 MASTER:硕士 BACHELOR:本科 COLLEGE:专科 HIGH_SCHOOL:高中 OTHER：其他
    marriageStatus?: 'SINGLE' | 'MARRIED' | 'DIVORCED' | 'WIDOWED' // 婚姻状态 STAFF_MARRIAGE_STATUS
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

export type IStaffAssignRoleRequest = {
    userId: number // 员工ID
    roleIds: number[] // 角色IDs
}

// 角色
export type IStaffRole = {
    id: number // 角色ID
    name: string // 角色名称
    code: string // 角色编码
    description?: string // 角色描述
}

export type IStaffRoleRequest = {
    userId: number // 员工ID
}

export type IStaffAddOrEditRequest = Omit<IStaffList, 'hireDate'> & {
    hireDate: number | undefined // 入职时间
}

// 修改员工状态
export type IStaffChangeStatusRequest = {
    id: number // 员工ID
    status: number // 员工状态 0:启用 1:禁用
}
