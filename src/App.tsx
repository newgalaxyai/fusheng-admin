import { useEffect, useState } from 'react'
import { Suspense } from 'react'
import { useRoutes, useLocation } from 'react-router-dom'
import { Spin } from 'antd'
import { useLayout } from './hooks/useLayout';
import { useRoutesHook } from './hooks/useRoutes';
import { ROUTE_KEY, ROUTE_PATH_COMMON } from './utils/constants';
import { useAppDispatch, useAppSelector } from '@/hooks/useAppStore';
import { getLoginInfoAsync, getLoginPermissionInfoAsync } from './redux/asyncs/login';

function App() {
  const {
    user: {
      loading
    }
  } = useAppSelector((state) => state);
  const dispatch = useAppDispatch();
  const { getRoutes, authRoutes } = useRoutesHook();
  const { addTab, getCurrentRoute } = useLayout();

  // 获取登录用户信息
  useEffect(() => {
    const pathname = location.pathname;
    if (ROUTE_PATH_COMMON.includes(pathname)) {
      // console.log('pathname', pathname);
    } else {
      dispatch(getLoginInfoAsync())
      dispatch(getLoginPermissionInfoAsync())
    }
  }, []);
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
      <div className="App">
        {useRoutes(getRoutes)}
      </div>
    </>
  )
}

export default App
