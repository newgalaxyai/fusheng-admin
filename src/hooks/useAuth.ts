import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { getAccessToken } from '@/utils/storge'
import { getLocationParamsByName } from '@/utils/location'
import { ROUTE_PARAM_NAME, ROUTE_PATH } from '@/constants'
import { encodeRedirectInfo, decodeRedirectInfo } from '@/utils/auth'

// 验证登录 token 是否有效的函数
const checkAuth = () => {
    const token = getAccessToken()
    if (!token) return false
    return true
}

export function useAuth(requiresAuth: boolean, redirect?: string) {
    const navigate = useNavigate()
    const location = useLocation()

    useEffect(() => {
        const isAuthenticated = checkAuth()

        // 未登录时访问需要登录的路由
        if (requiresAuth && !isAuthenticated) {
            // console.log('登录已过期，跳转到登录页')
            const encodedRedirectInfo = encodeRedirectInfo(location)
            navigate(ROUTE_PATH.LOGIN + '?' + ROUTE_PARAM_NAME.REDIRECT_INFO + '=' + encodedRedirectInfo, { replace: true })
        }

        // 已经登录时访问公共路由
        if (!requiresAuth && isAuthenticated) {
            const encodedRedirectInfo = getLocationParamsByName(location, ROUTE_PARAM_NAME.REDIRECT_INFO)
            const paramsRedirect = encodedRedirectInfo ? decodeRedirectInfo(encodedRedirectInfo) : null
            if (paramsRedirect) {
                // console.log('paramsRedirect', paramsRedirect)
                // 如果路由参数存在重定向，则跳转到重定向页面
                navigate(paramsRedirect.pathname + (paramsRedirect.search || '') + (paramsRedirect.hash || ''), { replace: true, state: paramsRedirect.state })
            } else {
                // 如果不存在重定向，则跳转到首页
                navigate(ROUTE_PATH.HOME, { replace: true })
            }
        }

        // 未登录时访问公共路由
        if (!requiresAuth && !isAuthenticated) {
            if (redirect) {
                const encodedRedirectInfo = encodeRedirectInfo(location)
                navigate(ROUTE_PATH.LOGIN + '?' + ROUTE_PARAM_NAME.REDIRECT_INFO + '=' + encodedRedirectInfo, { replace: true })
            } else {
                navigate(ROUTE_PATH.LOGIN, { replace: true })
            }
        }
    }, [requiresAuth, location])

    return null
}