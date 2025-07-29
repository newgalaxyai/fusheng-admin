import React, { useState } from 'react'
import type { FC, ReactNode } from 'react'
import {
    List,
    Avatar,
} from 'antd'
import {
    IFavorList,
} from '@/api/type'
import dayjs from 'dayjs'
import {
    MESSAGE_ROLE_NAME,
    MESSAGE_ROLE
} from '@/constants'

interface IProps {
    children?: ReactNode
}

const FavorDetail: FC<IProps> = (_props) => {
    const [favorInfo, setFavorInfo] = useState<IFavorList>({
        id: 1,
        openid: 'oB7RFvsZjYXi1IsY_VjPTXZwCrX4',
        nickname: '测试用户',
        avatar: 'https://minio-dev.imissniu.com/xfn/assets%2Findex%2Fbg-index.png',
        mobile: '15898989898',
        compareCompany: '上海测试公司',
        question: '问题1',
        answer: '答案答案答案答案答案答案答案答案答案答案答案答案答案答案答案答案答案答案答案答案答案答案答案答案答案答案答案答案答案答案答案答案答案答案答案答案答案答案答案答案答案答案答案答案答案答案答案答案答案答案答案答案答案答案答案答案答案答案答案答案答案答案答案答案答案答案答案答案答案答案答案答案答案答案答案答案答案答案答案答案答案答案答案答案答案答案答案答案答案答案答案答案答案答案答案答案',
        createTime: 1672531200000,
    } as IFavorList)

    const listData = [
        {
            role: MESSAGE_ROLE_NAME.MESSAGE_ROLE_USER,
            avatar: favorInfo.avatar,
            creatTime: dayjs(favorInfo.createTime).format('YYYY-MM-DD HH:mm:ss'),
            content: favorInfo.question,
        },
        {
            role: MESSAGE_ROLE_NAME.MESSAGE_ROLE_AI,
            avatar: favorInfo.avatar,
            creatTime: dayjs(favorInfo.createTime).format('YYYY-MM-DD HH:mm:ss'),
            content: favorInfo.answer,
        },
    ]

    return (
        <>
            <List
                style={{
                    margin: '20px'
                }}
                itemLayout="vertical"
                size="default"
                dataSource={listData}
                renderItem={(item) => (
                    <List.Item
                        key={item.role}
                    >
                        <List.Item.Meta
                            avatar={<Avatar src={item.avatar} />}
                            title={(
                                <>
                                    <span
                                        style={{
                                            color: MESSAGE_ROLE[item.role].color,
                                        }}
                                    >
                                        {item.role === MESSAGE_ROLE_NAME.MESSAGE_ROLE_USER ? favorInfo.nickname : MESSAGE_ROLE[item.role].text}
                                    </span>
                                </>
                            )}
                            description={item.creatTime}
                        />
                        {item.content}
                    </List.Item>
                )}
            />
        </>
    )
}

export default FavorDetail
