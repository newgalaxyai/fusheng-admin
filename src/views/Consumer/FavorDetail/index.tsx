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

interface IProps {
    children?: ReactNode
}

const FavorDetail: FC<IProps> = (_props) => {
    const [favorInfo, setFavorInfo] = useState<IFavorList>({
        id: 1,
        openid: 'oB7RFvsZjYXi1IsY_VjPTXZwCrX4',
        nickname: '测试用户',
        avatar: 'https://i-avatar.csdnimg.cn/587736a80af847d2a1275bc78bac6118_m0_58988036.jpg!1',
        mobile: '15898989898',
        compareCompany: '上海测试公司',
        question: '问题1',
        answer: '答案答案答案答案答案答案答案答案答案答案答案答案答案答案答案答案答案答案答案答案答案答案答案答案答案答案答案答案答案答案答案答案答案答案答案答案答案答案答案答案答案答案答案答案答案答案答案答案答案答案答案答案答案答案答案答案答案答案答案答案答案答案答案答案答案答案答案答案答案答案答案答案答案答案答案答案答案答案答案答案答案答案答案答案答案答案答案答案答案答案答案答案答案答案答案答案',
        createTime: 1672531200000,
    } as IFavorList)

    const listData = [
        {
            title: favorInfo.nickname,
            avatar: favorInfo.avatar,
            description: dayjs(favorInfo.createTime).format('YYYY-MM-DD HH:mm:ss'),
            content: favorInfo.question,
        },
        {
            title: 'AI回复',
            avatar: favorInfo.avatar,
            description: dayjs(favorInfo.createTime).format('YYYY-MM-DD HH:mm:ss'),
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
                        key={item.title}
                    >
                        <List.Item.Meta
                            avatar={<Avatar src={item.avatar} />}
                            title={item.title}
                            description={item.description}
                        />
                        {item.content}
                    </List.Item>
                )}
            />
        </>
    )
}

export default FavorDetail
