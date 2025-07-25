import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'
import equal from 'fast-deep-equal'
import { IMessageList, IQARecordList } from '@/api/type'
import { List, Avatar } from 'antd';
import { MESSAGE_ROLE_NAME, MESSAGE_ROLE } from '@/constants/common';
import dayjs from 'dayjs';

interface IProps {
    children?: ReactNode
    messages?: IMessageList[]
    session?: IQARecordList
}

const Message: FC<IProps> = ({ messages, session }) => {
    return (
        <>
            <List
                itemLayout="vertical"
                size="default"
                dataSource={messages}
                renderItem={(messageItem) => (
                    <List.Item
                        key={messageItem.id}
                    >
                        <List.Item.Meta
                            title={(
                                <>
                                    <span
                                        style={{
                                            color: MESSAGE_ROLE[messageItem.role].color,
                                        }}
                                    >
                                        {messageItem.role === MESSAGE_ROLE_NAME.MESSAGE_ROLE_USER ? session?.consumerName : MESSAGE_ROLE[messageItem.role].text}
                                    </span>
                                    <span
                                    style={{
                                        marginLeft: 10,
                                        color: '#999',
                                        fontSize: '12px',
                                        fontWeight: 'normal',
                                    }}
                                    >
                                        {dayjs(messageItem.createTime).format('YYYY-MM-DD HH:mm:ss')}
                                    </span>
                                </>
                            )}
                        />
                        <div>
                            {messageItem.content}
                        </div>
                    </List.Item>
                )}
            />
        </>
    )
}

export default memo(Message, (prevProps, nextProps) => {
    if (!equal(prevProps.messages, nextProps.messages)) {
        return false
    }
    return true
})
