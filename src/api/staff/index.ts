import { baseRequest, adminRequest } from '@/service'
import type {
  IStaffListRequest,
  IStaffListResponse,
  IStaffList,
  IStaffDetailRequest,
  IStaffAssignRoleRequest,
  IStaffRoleRequest,
} from '@/api/type'
import { IRequest, IResponse } from '../type'
import {
  staffListURL,
  staffDetailURL,
  staffEditURL,
  staffAddURL,
  staffDeleteURL,
  staffGiveRoleURL,
  staffGetRolesURL,
} from '../url/staff'

/**
 * 获取员工列表
 * @param params 员工列表请求参数
 * @returns 员工列表响应
 */
export const getStaffListAPI = async (params: IRequest<IStaffListRequest>): Promise<IResponse<IStaffListResponse>> => {
  const response = await adminRequest.get<IResponse<IStaffListResponse>>({
    url: staffListURL,
    params
  })

  return response
}

/**
 * 获取员工详情
 * @param params 员工ID
 * @returns 员工详情
 */
export const getStaffDetailAPI = async (params: IRequest<IStaffDetailRequest>): Promise<IResponse<IStaffList>> => {
  const response = await adminRequest.get<IResponse<IStaffList>>({
    url: staffDetailURL,
    params
  })

  return response
}

/**
 * 新增员工
 * @param params 员工信息
 * @returns 结果
 */
export const addStaffAPI = async (params: IRequest<IStaffList>): Promise<IResponse<IStaffList>> => {
  const response = await adminRequest.post<IResponse<any>>({
    url: staffAddURL,
    data: params
  })

  return response
}

/**
 * 编辑员工
 * @param params 员工信息
 * @returns 结果
 */
export const editStaffAPI = async (params: IRequest<IStaffList>): Promise<IResponse<IStaffList>> => {
  const response = await adminRequest.put<IResponse<any>>({
    url: staffEditURL,
    data: params
  })

  return response
}

/**
 * 删除员工
 * @param params 员工ID
 * @returns 结果
 */
export const deleteStaffAPI = async (params: IRequest<IStaffDetailRequest>): Promise<IResponse<IStaffList>> => {
  const response = await adminRequest.delete<IResponse<any>>({
    url: staffDeleteURL,
    params
  })

  return response
}

// 赋予员工角色
export const assignStaffRoleAPI = async (params: IRequest<IStaffAssignRoleRequest>): Promise<IResponse<boolean>> => {
  const response = await adminRequest.post<IResponse<boolean>>({
    url: staffGiveRoleURL,
    data: params
  })

  return response
}

// 获取员工的角色
export const getStaffRolesAPI = async (params: IRequest<IStaffRoleRequest>): Promise<IResponse<number[]>> => {
  const response = await adminRequest.get<IResponse<number[]>>({
    url: staffGetRolesURL,
    params
  })

  return response
}
