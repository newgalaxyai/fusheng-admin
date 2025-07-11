import { baseRequest } from '@/service'
import type { IExampleRequest, IExampleResponse } from '@/api/type/example'
import { IRequest, IResponse } from '../type'

export const getExampleAPI = async (params: IRequest<IExampleRequest>): Promise<IResponse<IExampleResponse>> => {
  const response = await baseRequest.get<IResponse<IExampleResponse>>({
    url: '/example',
    params
  })

  return response
}