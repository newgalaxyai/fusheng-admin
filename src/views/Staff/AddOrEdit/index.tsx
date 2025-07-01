import React from 'react'
import type { FC, ReactNode } from 'react'
import { Result, Button } from 'antd'

interface IProps {
  children?: ReactNode
}

const AddOrEdit: FC<IProps> = (_props) => {
  return (
    <>
      <div>
        <h1>新增/编辑</h1>
      </div>
    </>
  )
}

export default AddOrEdit
