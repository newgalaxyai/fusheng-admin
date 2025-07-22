import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'

interface IProps {
    children?: ReactNode
}

const PageAnalysis: FC<IProps> = (_props) => {
    return (
        <>
            <div>
                <h1>首页</h1>
            </div>
        </>
    )
}

export default memo(PageAnalysis)
