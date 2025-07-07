import React, { useEffect, useMemo, FC } from 'react'
import { Suspense } from 'react'
import LayoutComponent from '@/components/layout'
import { useAppSelector } from '@/hooks/useAppStore'
import { Route, Routes, Navigate, useRoutes, useLocation } from 'react-router-dom'
import { Spin } from 'antd'
import { LOGIN_TOKEN_NAME } from '@/utils/constants'
import Login from '@/views/Login'
import NotFound from '@/views/NotFound';
import Reset from '@/views/Reset';
import { useRoutesHook } from './hooks/useRoutes';
import publicRoutes from './router'

function App() {
  const { isLogin, isNotFound, routes } = useAppSelector(state => state.route);
  const { addTab, getCurrentRoute, setIsNotFound } = useRoutesHook();
  // 获取登录状态，初始化设置redux中的登录状态
  // useEffect(() => {
  //   const loginStatus = localStorage.getItem(LOGIN_TOKEN_NAME);
  //   setLoginStatus(loginStatus == null ? false : true);
  // }, []);
  // 获取路由
  const location = useLocation();
  useEffect(() => {
    // 如果路由地址为公共路由，则不进行路由处理
    if (publicRoutes.some(item => item.path === location.pathname)) {
      const route = publicRoutes.find(item => item.path === location.pathname)!;
      if (route.type > 0) {
        // 设置当前激活的菜单、标签页和面包屑
        addTab(route);
      }
      return;
    }
    // 根据路由地址获取路由信息
    const keyList = location.pathname.split('/');
    const route = getCurrentRoute(keyList.slice(1), routes.filter(item => item.parentKey === ''), null);
    // console.log('route', route);
    if (route) {
      addTab(route);
    } else {
      setIsNotFound(true);
    }
  }, [location.pathname]);

  // 获取渲染内容
  // 如果isLogin为null，则显示加载中
  // 如果isLogin为true，则显示页面内容
  // 如果isLogin为false，则显示登录页面
  const renderContent = useMemo(() => {
    if (isLogin === null) {
      return <div><Spin spinning={true} fullscreen /></div>
    }
    if (isLogin) {
      if (isNotFound) {
        return (
          <Routes>
            <Route path="*" element={<Navigate to="/404" />} />
            <Route path="/" element={<Navigate to="/404" />} />
            <Route path="/404" element={<NotFound />} />
          </Routes>
        )
      } else {
        return <LayoutComponent />
      }
    } else {
      return (
        <Routes>
          <Route path="*" element={<Navigate to="/login" />} />
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/resetPassword" element={<Reset />} />
        </Routes>
      )
    }
  }, [isLogin, isNotFound]);

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
