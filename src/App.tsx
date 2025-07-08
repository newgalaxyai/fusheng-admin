import { useEffect } from 'react'
import { Suspense } from 'react'
import { useRoutes, useLocation } from 'react-router-dom'
import { Spin } from 'antd'
import { useRoutesHook } from './hooks/useRoutes';

function App() {
  const { addTab, getCurrentRoute, getRoutes, authRoutes } = useRoutesHook();
  const allRoutes = getRoutes;

  // 获取路由
  const location = useLocation();

  useEffect(() => {
    // 根据路由地址获取路由信息
    const keyList = location.pathname.split('/');
    const route = getCurrentRoute(keyList.slice(1), authRoutes.filter(item => item.parentKey === 'auth'), null);
    if (route) {
      addTab(route);
    }
  }, [location.pathname]);

  return (
    <>
      <Suspense fallback={
        <div>
          <Spin />
        </div>
      }>
        <div className="App">
          {useRoutes(allRoutes)}
        </div>
      </Suspense>
    </>
  )
}

export default App
