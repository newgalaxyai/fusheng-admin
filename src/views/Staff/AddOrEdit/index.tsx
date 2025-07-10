import React from 'react'
import type { FC, ReactNode } from 'react'
import { Result, Button } from 'antd'
import { useRoutesHook } from '@/hooks/useRoutes'
import { ROUTE_KEY } from '@/utils/constants'

interface IProps {
  children?: ReactNode
}

const AddOrEdit: FC<IProps> = (_props) => {
  const { navigateTo } = useRoutesHook();

  return (
    <>
      <div>
        <Button type="primary" onClick={() => {
          navigateTo(ROUTE_KEY.STAFF_LIST)
        }}>返回员工列表</Button>
        <h1>新增/编辑</h1>
      </div>
    </>
  )
}

export default AddOrEdit
