import { adminRequest } from '@/service'
import {
    getCompanyListPageUrl,
    getCompanyDetailUrl,
} from '@/api/url/company'
import {
    IResponse,
    IRequest,
    ICompanyListRequest,
    ICompanyListResponse,
    IDetailRequest,
    ICompanyList,
} from '../type'

// 获取公司分页列表
export const getCompanyListPageAPI = async (params: ICompanyListRequest): Promise<IResponse<ICompanyListResponse>> => {
    const response = await adminRequest.get<IResponse<ICompanyListResponse>>({
        url: getCompanyListPageUrl,
        params
    })

    return response
}

// 获取公司详情
export const getCompanyDetailAPI = async (params: IRequest<IDetailRequest>): Promise<IResponse<ICompanyList>> => {
    const response = await adminRequest.get<IResponse<ICompanyList>>({
        url: getCompanyDetailUrl,
        params
    })

    return response
}
