import React from 'react'
import type { FC, ReactNode } from 'react'
import { Result, Button } from 'antd'
import { useLayout } from '@/hooks/useLayout';

interface IProps {
  children?: ReactNode
}

const NotFound: FC<IProps> = (_props) => {
  const { navigateTo } = useLayout();

  return (
    <>
      <Result
        status="404"
        title="404"
        subTitle="抱歉，您访问的页面不存在。"
        extra={<Button
          type="primary"
          onClick={() => {
            navigateTo('home');
          }}
        >
          返回首页
        </Button>}
      />
    </>
  )
}

export default NotFound
