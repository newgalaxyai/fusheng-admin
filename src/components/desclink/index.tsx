import React from 'react'
import type { FC, ReactNode } from 'react'
import { Typography } from 'antd'

interface IProps {
    children?: ReactNode,
    descText: any,
    linkText: string,
}

const { Link } = Typography

const DescLinkComponent: FC<IProps> = ({ children, descText, linkText }) => {
    return (
        <>
            <span
                style={{
                    marginRight: 5
                }}
            >{descText}</span>
            <Link href={linkText} target="_blank">
                查看
            </Link>
        </>
    )
}

export default DescLinkComponent
