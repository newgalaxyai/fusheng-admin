import React, { useEffect } from 'react'
import { Suspense } from 'react'
import { useRoutesHook } from '@/hooks/useRoutes'
import LayoutComponent from '@/components/layout'
import { useAppSelector } from '@/hooks/useAppStore'
import { useLocation } from 'react-router-dom'
import { Spin } from 'antd'

function App() {
  const { routes } = useAppSelector(state => state.route);
  const { addTab } = useRoutesHook();
  // 获取路由
  const location = useLocation();
  useEffect(() => {
    // 根据路由地址获取路由信息
    const route = routes.find(item => item.routePath === location.pathname);
    if (route) {
      addTab(route);
    }
  }, [location.pathname, routes, addTab]);

  return (
    <>
      <Suspense fallback={
        <div>
          <Spin />
        </div>
      }>
        <div className="App">
          <LayoutComponent>
          </LayoutComponent>
        </div>
      </Suspense>
    </>
  )
}

export default App
