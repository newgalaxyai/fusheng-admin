import React from 'react'
import type { FC, ReactNode } from 'react'
import { Result, Button } from 'antd'
import { useRoutesHook } from '@/hooks/useRoutes'

interface IProps {
  children?: ReactNode
}

const AddOrEdit: FC<IProps> = (_props) => {
  const { navigateTo } = useRoutesHook();

  return (
    <>
      <div>
        <Button type="primary" onClick={() => {
          navigateTo('staffList')
        }}>返回员工列表</Button>
        <h1>新增/编辑</h1>
      </div>
    </>
  )
}

export default AddOrEdit
