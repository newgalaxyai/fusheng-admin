import React, { useState, useEffect } from 'react'
import type { FC, ReactNode } from 'react'
import { Button } from 'antd'
import { Outlet, useLocation } from 'react-router-dom'
import { usePermissionCheck } from '@/hooks/usePermission'
import { useAppSelector } from '@/hooks/useAppStore'
import { useRoutesHook } from '@/hooks/useRoutes'
import { ROUTE_KEY, ROUTE_PARAM_NAME } from '@/utils/constants'
import { getLocationParamsByName } from '@/utils/location'

interface IProps {
  children?: ReactNode
}

const ConsumerList: FC<IProps> = (_props) => {
  const location = useLocation();
  const { getCurrentRoute, navigateTo, authRoutes } = useRoutesHook();
  const { hasRole, hasPermission } = usePermissionCheck();
  const [pageType, setPageType] = useState(ROUTE_KEY.CONSUMER_LIST);

  useEffect(() => {
    const route = getCurrentRoute(location.pathname.split('/').slice(1), authRoutes.filter(item => item.parentKey === ROUTE_KEY.AUTH), null);
    // console.log('route', route);
    if (route) {
      setPageType(route.key);
    }
  }, [location.pathname]);

  return (
    <>
      <div>
        {
          pageType === ROUTE_KEY.CONSUMER_LIST ? (
            <>
              <h1>用户列表</h1>
              <Button type="primary" onClick={() => {
                navigateTo(ROUTE_KEY.ADD_CONSUMER)
              }}>新增用户</Button>
              <Button type="primary" onClick={() => {
                navigateTo(ROUTE_KEY.EDIT_CONSUMER)
              }}>编辑用户</Button>
            </>
          ) : (
            <Outlet />
          )
        }
      </div>
    </>
  )
}

export default ConsumerList
