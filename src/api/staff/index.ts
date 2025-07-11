import { baseRequest } from '@/service'
import type { IStaffListRequest, IStaffListResponse } from '@/api/type/staff'
import { IRequest, IResponse } from '../type'
import { staffListURL } from '../url/staff'

export const getStaffListAPI = async (params: IRequest<IStaffListRequest>): Promise<IResponse<IStaffListResponse[]>> => {
  const response = await baseRequest.get<IResponse<IStaffListResponse[]>>({
    url: staffListURL,
    params
  })

  return response
}