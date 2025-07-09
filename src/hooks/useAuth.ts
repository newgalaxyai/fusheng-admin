import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { getToken } from '@/utils/storge'
import { App } from 'antd'
import { getLocationParamsByName } from '@/utils/location'
import { REDIRECT_NAME, LOGIN_PATH, HOME_PATH } from '@/utils/constants'

// 验证登录 token 是否有效的函数
const checkAuth = () => {
    const token = getToken()
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
                    navigate(LOGIN_PATH + (location.pathname === '/' ? '' : '?' + REDIRECT_NAME + '=' + location.pathname), { replace: true })
                }
            })
        }

        // 已经登录时访问公共路由
        if (!requiresAuth && isAuthenticated) {
            const paramsRedirect = getLocationParamsByName(REDIRECT_NAME)
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
                navigate(HOME_PATH, { replace: true })
            }
        }

        // 未登录时访问公共路由
        if (!requiresAuth && !isAuthenticated) {
            navigate(LOGIN_PATH + (location.pathname === '/' ? '' : '?' + REDIRECT_NAME + '=' + location.pathname), { replace: true })
        }
    }, [requiresAuth, navigate, location])

    return null
}