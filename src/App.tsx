import { useEffect, useState } from 'react'
import { useRoutes, useLocation } from 'react-router-dom'
import { useLayout } from './hooks/useLayout';
import { useRoutesHook } from './hooks/useRoutes';
import { ROUTE_KEY, ROUTE_PATH_COMMON } from './constants';
import { useAppDispatch } from '@/hooks/useAppStore';
import { getLoginInfoAsync, getLoginPermissionInfoAsync } from './redux/asyncs/login';
import { ConfigProvider } from 'antd';
import enUS from 'antd/locale/en_US';
import zhCN from 'antd/locale/zh_CN';
import { useAntdTheme } from './hooks/useAntdTheme';

function App() {
  // 语言
  const [locale, setLocale] = useState(zhCN);

  const dispatch = useAppDispatch();
  const { getRoutes, authRoutes } = useRoutesHook();
  const { configTheme } = useAntdTheme();
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
    <ConfigProvider
      locale={locale}
      theme={configTheme}
    >
      <div className="App">
        {useRoutes(getRoutes)}
      </div>
    </ConfigProvider>
  )
}

export default App
