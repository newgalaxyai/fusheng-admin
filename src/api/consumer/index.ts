import { baseRequest, adminRequest } from '@/service'
import { IRequest, IResponse } from '../type'
import {
  IConsumerDetailRequest,
  IConsumerList,
  IConsumerListRequest,
  IConsumerListResponse
} from '../type/consumer'
import {
  consumerListURL,
  consumerDetailURL,
} from '../url/consumer'

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
