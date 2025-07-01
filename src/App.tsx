import React, { useEffect, useMemo } from 'react'
import { Suspense } from 'react'
import { useRoutesHook } from '@/hooks/useRoutes'
import LayoutComponent from '@/components/layout'
import { useAppSelector } from '@/hooks/useAppStore'
import { Route, Routes, useLocation, Navigate } from 'react-router-dom'
import { Spin } from 'antd'
import { LOGIN_TOKEN_NAME } from '@/utils/constants'
import Login from '@/views/Login'

function App() {
  const { routes, isLogin } = useAppSelector(state => state.route);
  const { addTab, setLoginStatus } = useRoutesHook();
  // 获取登录状态，初始化设置redux中的登录状态
  useEffect(() => {
    const loginStatus = localStorage.getItem(LOGIN_TOKEN_NAME);
    setLoginStatus(loginStatus == null ? false : true);
  }, []);
  // 获取路由
  const location = useLocation();
  useEffect(() => {
    // 根据路由地址获取路由信息
    const route = routes.find(item => item.routePath === location.pathname);
    if (route) {
      addTab(route);
    }
  }, [location.pathname, routes, addTab]);

  // 获取渲染内容
  // 如果isLogin为null，则显示加载中
  // 如果isLogin为true，则显示页面内容
  // 如果isLogin为false，则显示登录页面
  const renderContent = useMemo(() => {
    if (isLogin === null) {
      return <div><Spin spinning={true} fullscreen /></div>
    }
    return isLogin ? <LayoutComponent /> : <Routes>
      <Route path="*" element={<Navigate to="/login" />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  }, [isLogin]);

  return (
    <>
      <Suspense fallback={
        <div>
          <Spin />
        </div>
      }>
        <div className="App">
          {
            renderContent
          }
        </div>
      </Suspense>
    </>
  )
}

export default App
