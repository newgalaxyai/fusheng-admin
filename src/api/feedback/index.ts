import { adminRequest } from '@/service'
import { IRequest, IResponse } from '../type'
import {
    feedbackListURL,
    feedbackDetailURL
} from '../url/feedback'
import {
    IOpinionListRequest,
    IOpinionListResponse,
    IOpinionDetailRequest,
    IOpinionList,
} from '../type/feedback'

// 获取公司反馈分页列表
export const getOpinionListAPI = async (params: IRequest<IOpinionListRequest>): Promise<IResponse<IOpinionListResponse>> => {
  const response = await adminRequest.get<IResponse<IOpinionListResponse>>({
    url: feedbackListURL,
    params
  })

  return response
}

// 获取反馈详情
export const getOpinionDetailAPI = async (params: IRequest<IOpinionDetailRequest>): Promise<IResponse<IOpinionList>> => {
  const response = await adminRequest.get<IResponse<IOpinionList>>({
    url: feedbackDetailURL,
    params
  })

  return response
}
