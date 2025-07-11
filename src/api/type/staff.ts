export type IStaffListRequest = {
    page: number // 页码
    pageSize: number // 每页条数
    staffNumber: string // 员工编号
    staffMobile: string // 员工手机号
    staffStatusId: number // 员工状态ID
    staffName: string // 员工姓名
    staffRole: string // 员工角色
    staffCreateTime: number // 员工创建时间戳
}

export type IStaffListResponse = {
    id: number // 员工ID
    staffNumber: string // 员工编号
    staffName: string // 员工姓名
    staffStatus: boolean // 员工状态
    staffStatusName: string // 员工状态名称
    staffMobile: string // 员工手机号
    staffDepartmentId: number // 员工部门ID
    staffDepartmentName: string // 员工部门名称
    staffPositionId: number // 员工职位ID
    staffPositionName: string // 员工职位名称
    staffRole: string // 员工角色
    staffRoleName: string // 员工角色名称
    staffCreateTime: number // 员工创建时间戳
    staffUpdateTime: number // 员工更新时间戳
    staffDeleteTime: number // 员工删除时间戳
}