import { adminRequest } from "@/service"
import { getAreaTreeURL } from '@/api/url/common'
import { IResponse, IResponseData } from "../type"
import { IAreaTree } from "../type/common"

// 地区树列表
export const getAreaTreeAPI = async (): Promise<IResponse<IAreaTree[]>> => {
    const response = await adminRequest.get<IResponseData<IAreaTree[]>>({
        url: getAreaTreeURL,
    })

    return response
}
