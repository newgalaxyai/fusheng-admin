import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { getToken } from '@/utils/storge'
import { App } from 'antd'

// 验证登录 token 是否有效的函数
const checkAuth = () => {
    const token = getToken()
    if (!token) return false
    return true
}

export function useAuth(requiresAuth: boolean) {
    const navigate = useNavigate()
    const location = useLocation()
    const { modal } = App.useApp()

    useEffect(() => {
        const isAuthenticated = checkAuth()

        if (requiresAuth && !isAuthenticated) {
            console.log('登录已过期，跳转到登录页')
            modal.info({
                title: '登录已过期',
                content: '登录已过期，请重新登录',
                cancelText: null,
                okText: '确定',
                onOk: () => {
                    navigate('/login', {
                        state: { redirect: location.pathname },
                        replace: true
                    })
                }
            })
        }

        if (!requiresAuth && isAuthenticated) {
            const state = location.state as { redirect: string }
            console.log('重定向页面', state.redirect)
            if (state.redirect) {
                // 如果存在重定向，则跳转到重定向页面
                navigate(state.redirect, { replace: true })
            } else {
                // 如果不存在重定向，则跳转到首页
                navigate('/home', { replace: true })
            }
        }
    }, [requiresAuth, navigate, location])

    return null
}