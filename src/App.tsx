import { useEffect } from 'react'
import { Suspense } from 'react'
import { useRoutes, useLocation } from 'react-router-dom'
import { Spin } from 'antd'
import { useRoutesHook } from './hooks/useRoutes';
import routes from './router';
import { ROUTE_KEY } from './utils/constants';
import { useAppSelector } from '@/hooks/useAppStore';

function App() {
  const { addTab, getCurrentRoute, getRoutes, authRoutes } = useRoutesHook();
  const allRoutes = getRoutes;
  const { activeKey } = useAppSelector(state => state.route);

  // 获取登录用户信息

  // console.log('所有路由:', allRoutes);

  // 获取路由
  const location = useLocation();

  useEffect(() => {
    // 根据路由地址获取路由信息
    const keyList = location.pathname.split('/');
    const params = location.search;
    const state = location.state;
    const route = getCurrentRoute(keyList.slice(1), authRoutes.filter(item => item.parentKey === ROUTE_KEY.AUTH), null);
    // console.log('route', route);
    if (route) {
      // console.log('params: ', params);
      // console.log('state: ', state);
      addTab(route, params, state);
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
          {/* {useRoutes(routes)} */}
        </div>
      </Suspense>
    </>
  )
}

export default App
