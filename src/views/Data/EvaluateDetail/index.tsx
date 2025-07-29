import React, { useState } from 'react'
import type { FC, ReactNode } from 'react'
import { useLocation } from 'react-router-dom';
import {
    List,
} from 'antd'
import {
    IEvaluateList,
} from '@/api/type'
import dayjs from 'dayjs'
import {
    ROUTE_PARAM_NAME
} from '@/constants'
import { getLocationParamsByName } from '@/utils/location'

interface IProps {
    children?: ReactNode
}

const EvaluateDetail: FC<IProps> = (_props) => {
    const location = useLocation();

    const evaluateId = getLocationParamsByName(location, ROUTE_PARAM_NAME.EVALUATE_ID);

    const [evaluateInfo, setEvaluateInfo] = useState<IEvaluateList>({
        id: 1,
        entry: 1,
        question: '问题1',
        questionTime: 1672531200000,
        think: '思考思考思考思考思考思考思考思考思考思考思考思考思考思考思考思考思考思考思考思考思考思考思考思考思考思考思考思考思考思考思考思考思考思考思考思考思考思考思考思考思考思考思考思考思考思考思考思考思考思考',
        thinkTime: 1672531200000,
        answer: '答案答案答案答案答案答案答案答案答案答案答案答案答案答案答案答案答案答案答案答案答案答案答案答案答案答案答案答案答案答案答案答案答案答案答案答案答案答案答案答案答案答案答案答案答案答案答案答案答案答案答案答案答案答案答案答案答案答案答案答案答案答案答案答案答案答案答案答案答案答案答案答案答案答案答案答案答案答案答案答案答案答案答案答案答案答案答案答案',
        answerTime: 1672531200000,
        evaluate: 1,
        openid: 'oB7RFvsZjYXi1IsY_VjPTXZwCrX4',
        nickname: '测试用户',
        createTime: 1672531200000,
    })

    const listData = [
        {
            role: '问题内容',
            color: '#108ee9',
            creatTime: dayjs(evaluateInfo.questionTime).format('YYYY-MM-DD HH:mm:ss'),
            content: evaluateInfo.question,
        },
        {
            role: '思考内容',
            color: '#f50',
            creatTime: dayjs(evaluateInfo.thinkTime).format('YYYY-MM-DD HH:mm:ss'),
            content: evaluateInfo.think,
        },
        {
            role: '回答内容',
            color: '#87d068',
            creatTime: dayjs(evaluateInfo.answerTime).format('YYYY-MM-DD HH:mm:ss'),
            content: evaluateInfo.answer,
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
                            title={(
                                <>
                                    <span
                                        style={{
                                            color: item.color,
                                        }}
                                    >
                                        {item.role}
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

export default EvaluateDetail   
