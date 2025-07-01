import React from 'react'
import type { FC, ReactNode } from 'react'
import { Result, Button } from 'antd'

interface IProps {
  children?: ReactNode
}

const Login: FC<IProps> = (_props) => {
  return (
    <>
      <div>
        <h1>登录</h1>
      </div>
    </>
  )
}

export default Login
