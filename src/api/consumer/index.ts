import { adminRequest } from '@/service'
import type {
  IRequest,
  IResponse,
  IConsumerChangeStatusRequest,
  IConsumerDetailRequest,
  IConsumerList,
  IConsumerListRequest,
  IConsumerListResponse,
  ILoginListRequest,
  ILoginListResponse,
} from '../type'
import {
  consumerListURL,
  consumerDetailURL,
  consumerLoginLogURL,
  consumerEditURL,
  consumerChangeStatusURL,
} from '../url'

/**
 * 获取用户列表
 * @param params 用户列表请求参数
 * @returns 用户列表响应
 */
export const getConsumerListAPI = async (params: IRequest<IConsumerListRequest>): Promise<IResponse<IConsumerListResponse>> => {
  const response = await adminRequest.get<IResponse<IConsumerListResponse>>({
    url: consumerListURL,
    params
  })

  return response
}

/**
 * 获取用户详情
 * @param params 用户ID
 * @returns 用户详情
 */
export const getConsumerDetailAPI = async (params: IRequest<IConsumerDetailRequest>): Promise<IResponse<IConsumerList>> => {
  const response = await adminRequest.get<IResponse<IConsumerList>>({
    url: consumerDetailURL,
    params
  })

  return response
}

// 编辑用户
export const consumerEditAPI = async (params: IRequest<IConsumerList>): Promise<IResponse<boolean>> => {
  const response = await adminRequest.put<IResponse<boolean>>({
    url: consumerEditURL,
    data: params
  })

  return response
}

// 修改用户状态
export const consumerChangeStatusAPI = async (params: IRequest<IConsumerChangeStatusRequest>): Promise<IResponse<boolean>> => {
  const response = await adminRequest.put<IResponse<boolean>>({
    url: consumerChangeStatusURL,
    data: params
  })

  return response
}

// 获取用户登录日志
export const getConsumerLoginLogAPI = async (params: IRequest<ILoginListRequest>): Promise<IResponse<ILoginListResponse>> => {
  const response = await adminRequest.get<IResponse<ILoginListResponse>>({
    url: consumerLoginLogURL,
    params,
  })

  return response
}
