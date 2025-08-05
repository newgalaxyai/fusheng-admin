import { useEffect, useState } from 'react'
import { useRoutes, useLocation, useNavigate } from 'react-router-dom'
import { useLayout } from './hooks/useLayout';
import { useRoutesHook } from './hooks/useRoutes';
import { ROUTE_KEY, ROUTE_PATH_COMMON, ROUTE_PATH } from './constants';
import { useAppDispatch, useAppSelector } from '@/hooks/useAppStore';
import { getLoginInfoAsync, getLoginPermissionInfoAsync } from './redux/asyncs/login';
import { ConfigProvider, Spin } from 'antd';
import enUS from 'antd/locale/en_US';
import zhCN from 'antd/locale/zh_CN';
import { useAntdTheme } from './hooks/useAntdTheme';
import { setUserLoadingAction } from './redux/modules/user';

function App() {
  const { loading, userInfo } = useAppSelector(state => state.user);
  // 语言
  const [locale, setLocale] = useState(zhCN);

  const dispatch = useAppDispatch();
  const { getRoutes, authRoutes } = useRoutesHook();
  const { configTheme } = useAntdTheme();
  const { addTab, getCurrentRoute } = useLayout();

  // console.log('所有路由:', allRoutes);

  // 获取路由
  const location = useLocation();
  const navigate = useNavigate();

  // 获取登录用户信息
  useEffect(() => {
    const pathname = location.pathname;
    if (!ROUTE_PATH_COMMON.includes(pathname) && pathname !== ROUTE_PATH.DEFAULT) {
      if (!userInfo) {
        dispatch(setUserLoadingAction(true));
        dispatch(getLoginInfoAsync());
        dispatch(getLoginPermissionInfoAsync());
      }
    } else {
      dispatch(setUserLoadingAction(false));
    }
  }, [userInfo, location.pathname]);

  // 根据路由地址获取路由信息
  useEffect(() => {
    const pathname = location.pathname;
    if (!ROUTE_PATH_COMMON.includes(pathname) && authRoutes.length > 1) {
      const keyList = pathname.split('/');
      const params = location.search;
      const state = location.state;
      const route = getCurrentRoute(keyList.slice(1), authRoutes.filter(item => item.parentKey === ROUTE_KEY.AUTH), null);
      // console.log('route', authRoutes);
      if (route) {
        // console.log('params: ', params);
        // console.log('state: ', state);
        addTab(route, params, state);
      } else {
        navigate(ROUTE_PATH.NOT_FOUND);
      }
    }
  }, [location.pathname, authRoutes]);

  return (
    <ConfigProvider
      locale={locale}
      theme={configTheme}
    >
      {loading ? <Spin
        spinning={true}
        style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
      /> : (
        <div className="App">
          {useRoutes(getRoutes)}
        </div>
      )}
      {/* <div className="App">
        {useRoutes(getRoutes)}
      </div> */}
    </ConfigProvider>
  )
}

export default App
