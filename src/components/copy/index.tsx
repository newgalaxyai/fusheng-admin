import React from 'react'
import type { FC, ReactNode } from 'react'
import { message, Typography } from 'antd'
import { CopyOutlined, CheckOutlined } from '@ant-design/icons'

interface IProps {
    children?: ReactNode,
    copyText: string
}

const { Paragraph } = Typography

const CopyComponent: FC<IProps> = ({ children, copyText }) => {
    return <Paragraph
        copyable={{
            icon: [<CopyOutlined color='#1677FF' />, <CheckOutlined color='#87d068' />],
            text: copyText,
            tooltips: false,
            onCopy: () => {
                message.success('复制成功');
            }
        }}
        style={{
            margin: 0
        }}
    >{copyText}</Paragraph>
}

export default CopyComponent
