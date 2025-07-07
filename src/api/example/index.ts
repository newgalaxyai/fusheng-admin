import { baseRequest } from '@/service'
import type { IExampleRequest, IExampleResponse } from '@/api/type/example'
import { IRequest, IResponse } from '../type'

export const getExampleAPI = (params: IRequest<IExampleRequest>) => {
  return baseRequest.get<IResponse<IExampleResponse>>({
    url: '/example',
    params
  })
}