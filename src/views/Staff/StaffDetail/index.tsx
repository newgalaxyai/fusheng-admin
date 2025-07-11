import React from 'react'
import type { FC, ReactNode } from 'react'
import { Result, Button } from 'antd'
import { useRoutesHook } from '@/hooks/useRoutes'
import { ROUTE_KEY, ROUTE_PARAM_NAME } from '@/utils/constants'
import { getLocationParamsByName } from '@/utils/location'
import { useLocation } from 'react-router-dom'

interface IProps {
  children?: ReactNode
}

const StaffDetail: FC<IProps> = (_props) => {
  const { navigateTo } = useRoutesHook();
  const location = useLocation();
  const staffId = getLocationParamsByName(location, ROUTE_PARAM_NAME.STAFF_ID);
  console.log('staffId: ', staffId);

  return (
    <>
      <div>
        <Button type="primary" onClick={() => {
          navigateTo(ROUTE_KEY.STAFF_LIST)
        }}>返回员工列表</Button>
        <h1>员工详情</h1>
      </div>
    </>
  )
}

export default StaffDetail
