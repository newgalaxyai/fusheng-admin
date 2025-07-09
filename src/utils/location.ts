// 获取当前路由的所有参数
export const getLocationParams = () => {
    const searchParams = new URLSearchParams(location.search)
    return searchParams
}

// 获取当前路由的指定参数值
export const getLocationParamsByName = (name: string) => {
    const searchParams = new URLSearchParams(location.search)
    return searchParams.get(name)
}
