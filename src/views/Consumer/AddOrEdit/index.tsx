import React from 'react'
import type { FC, ReactNode } from 'react'
import { Result, Button } from 'antd'
import { useRoutesHook } from '@/hooks/useRoutes'
import { ROUTE_KEY, ROUTE_PARAM_NAME } from '@/utils/constants'

interface IProps {
  children?: ReactNode
}

const AddOrEdit: FC<IProps> = (_props) => {
  const { navigateTo } = useRoutesHook();

  return (
    <>
      <div>
        <Button type="primary" onClick={() => {
          navigateTo(ROUTE_KEY.CONSUMER_LIST)
        }}>返回用户列表</Button>
        <h1>新增/编辑用户</h1>
      </div>
    </>
  )
}

export default AddOrEdit
