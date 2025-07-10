import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { getAccessToken } from '@/utils/storge'
import { App } from 'antd'
import { getLocationParamsByName } from '@/utils/location'
import { ROUTE_PARAM_NAME, ROUTE_PATH } from '@/utils/constants'

// 验证登录 token 是否有效的函数
const checkAuth = () => {
    const token = getAccessToken()
    if (!token) return false
    return true
}

export function useAuth(requiresAuth: boolean, redirect?: string) {
    const navigate = useNavigate()
    const location = useLocation()
    const { modal } = App.useApp()

    useEffect(() => {
        const isAuthenticated = checkAuth()

        // 未登录时访问需要登录的路由
        if (requiresAuth && !isAuthenticated) {
            // console.log('登录已过期，跳转到登录页')
            modal.info({
                title: '登录已过期',
                content: '登录已过期，请重新登录',
                cancelText: null,
                okText: '确定',
                onOk: () => {
                    navigate(ROUTE_PATH.LOGIN + (location.pathname === '/' ? '' : '?' + ROUTE_PARAM_NAME.REDIRECT + '=' + location.pathname), { replace: true })
                }
            })
        }

        // 已经登录时访问公共路由
        if (!requiresAuth && isAuthenticated) {
            const paramsRedirect = getLocationParamsByName(ROUTE_PARAM_NAME.REDIRECT)
            if (paramsRedirect) {
                // console.log('paramsRedirect', paramsRedirect)
                // 如果路由参数存在重定向，则跳转到重定向页面
                navigate(paramsRedirect, { replace: true })
            } else if (redirect) {
                // console.log('redirect', redirect)
                // 如果路由配置存在重定向，则跳转到重定向页面
                navigate(redirect, { replace: true })
            } else {
                // 如果不存在重定向，则跳转到首页
                navigate(ROUTE_PATH.HOME, { replace: true })
            }
        }

        // 未登录时访问公共路由
        if (!requiresAuth && !isAuthenticated) {
            navigate(ROUTE_PATH.LOGIN + (location.pathname === '/' ? '' : '?' + ROUTE_PARAM_NAME.REDIRECT + '=' + location.pathname), { replace: true })
        }
    }, [requiresAuth, navigate, location])

    return null
}