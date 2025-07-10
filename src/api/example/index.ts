import { baseRequest } from '@/service'
import type { IExampleRequest, IExampleResponse } from '@/api/type/example'
import { IRequest, IResponse, IResponseData } from '../type'

export const getExampleAPI = async (params: IRequest<IExampleRequest>): Promise<IResponse<IExampleResponse>> => {
  const response = await baseRequest.get<IResponseData<IExampleResponse>>({
    url: '/example',
    params
  })

  if (response.code === 0) {
    return {
      success: true,
      data: response.data
    }
  }

  return {
    success: false,
    errMsg: response.msg || '获取示例失败',
    data: response.data
  }
}