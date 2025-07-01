import React from 'react'
import type { FC, ReactNode } from 'react'
import { Result, Button } from 'antd'
import { useNavigate } from 'react-router-dom'

interface IProps {
  children?: ReactNode
}

const NotFound: FC<IProps> = (_props) => {
  const navigate = useNavigate();
  return (
    <>
      <Result
        status="404"
        title="404"
        subTitle="抱歉，您访问的页面不存在。"
        extra={<Button
          type="primary"
          onClick={() => {
            navigate('/home')
          }}
        >
          返回首页
        </Button>}
      />
    </>
  )
}

export default NotFound
