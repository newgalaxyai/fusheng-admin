import React, { useState, useEffect } from 'react'
import type { FC, ReactNode } from 'react'
import { Button } from 'antd'
import { Outlet, useLocation } from 'react-router-dom'
import { usePermissionCheck } from '@/hooks/usePermission'
import { useAppSelector } from '@/hooks/useAppStore'
import { useRoutesHook } from '@/hooks/useRoutes'
import { ROUTE_KEY } from '@/utils/constants'

interface IProps {
  children?: ReactNode
}

const StaffList: FC<IProps> = (_props) => {
  const location = useLocation();
  const { routes } = useAppSelector(state => state.route);
  const { getCurrentRoute, navigateTo } = useRoutesHook();

  // 1 员工列表 2 新增/编辑员工
  const [pageType, setPageType] = useState(0);
  const { hasRole, hasPermission } = usePermissionCheck();

  useEffect(() => {
    const route = getCurrentRoute(location.pathname.split('/').slice(1), routes.filter(item => item.parentKey === ''), null);
    if (route?.key === 'staffList') {
      setPageType(1);
    } else {
      setPageType(2);
    }
  }, [location.pathname, routes, getCurrentRoute]);

  return (
    <>
      <div>
        {
          pageType === 1 && (
            <>
              <h1>员工列表</h1>
              <Button type="primary" onClick={() => {
                setPageType(2);
                navigateTo(ROUTE_KEY.ADD_STAFF)
              }}>新增员工</Button>
              <Button type="primary" onClick={() => {
                setPageType(2);
                navigateTo(ROUTE_KEY.EDIT_STAFF)
              }}>编辑员工</Button>
            </>
          )
        }
        {
          pageType === 2 && (
            <>
              <Outlet />
            </>
          )
        }
      </div>
    </>
  )
}

export default StaffList
