import { baseRequest } from '@/service'
import type { IExampleRequest, IExampleResponse } from '@/api/type/example'
import { IResponse, IResponseData } from '../type'

export const getExampleAPI = (params: IExampleRequest) => {
  return baseRequest.get<IResponse<IExampleResponse>>({
    url: '/example',
    params
  })
}