import React from 'react'
import type { FC, ReactNode } from 'react'

interface IProps {
  children?: ReactNode
}

const NotFound: FC<IProps> = (_props) => {
  return (
    <>
      <div className="not_found">404</div>
    </>
  )
}

export default NotFound
