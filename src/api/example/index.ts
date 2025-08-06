import { baseRequest } from '@/service'
import type { 
  IRequest, 
  IResponse,
  IExampleRequest,
  IExampleResponse,
} from '../type'

export const getExampleAPI = async (params: IRequest<IExampleRequest>): Promise<IResponse<IExampleResponse>> => {
  const response = await baseRequest.get<IResponse<IExampleResponse>>({
    url: '/example',
    params
  })

  return response
}