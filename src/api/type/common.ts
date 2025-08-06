// 地区树
export type IAreaTree = {
    id: string
    name: string
    children: IAreaTree[]
}

// 获取详情
export type IDetailRequest = {
    id: number // 主键ID
}

