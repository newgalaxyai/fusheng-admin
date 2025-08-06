import { adminRequest } from "@/service"
import { getAreaTreeURL } from '../url'
import type {
    IResponse,
    IAreaTree
} from "../type"

// 地区树列表
export const getAreaTreeAPI = async (): Promise<IResponse<IAreaTree[]>> => {
    const response = await adminRequest.get<IResponse<IAreaTree[]>>({
        url: getAreaTreeURL,
    })

    return response
}
