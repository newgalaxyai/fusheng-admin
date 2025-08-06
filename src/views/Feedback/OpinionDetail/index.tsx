import React from 'react'
import type { FC, ReactNode } from 'react'
import { Steps, Tag, Button } from 'antd'
import { FEED_CATEGORY, FEED_STATUS, FEED_STATUS_NAME, ROUTE_PARAM_NAME } from '@/constants'
import { getLocationParamsByName } from '@/utils/location'
import { useLocation, useNavigate } from 'react-router-dom'
import {
    ProDescriptions,
    ProDescriptionsItemProps
} from '@ant-design/pro-components'
import {
    Image,
} from 'antd'
import {
    IOpinionList,
} from '@/api/type'
import { getOpinionDetailAPI } from '@/api/feedback'
import { useFieldProps } from '@/hooks/useFieldProps'

interface IProps {
    children?: ReactNode
}

const OpinionDetail: FC<IProps> = (_props) => {
    const {
        dateTimeFormat
    } = useFieldProps()
    const location = useLocation();
    const navigate = useNavigate();
    const opinionId = getLocationParamsByName(location, ROUTE_PARAM_NAME.OPINION_ID);

    // 描述列表column
    const descColumn: ProDescriptionsItemProps<IOpinionList>[] = [
        {
            title: '提交时间',
            key: 'createTime',
            dataIndex: 'createTime',
            valueType: 'dateTime',
            fieldProps: {
                format: dateTimeFormat
            },
        },
        {
            title: '反馈内容',
            key: 'content',
            dataIndex: 'content',
        },
        {
            title: '图片附件',
            key: 'images',
            dataIndex: 'images',
            render: (_, record) => {
                return (
                    <Image.PreviewGroup
                        preview={{
                            onChange: (current, prev) => console.log(`current index: ${current}, prev index: ${prev}`),
                        }}
                    >
                        {record.images?.map((item) => (
                            <div
                                key={item}
                                style={{
                                    marginRight: 10,
                                }}
                            >
                                <Image
                                    width={200}
                                    src={item}
                                />
                            </div>
                        ))}
                    </Image.PreviewGroup>
                )
            }
        },
    ]

    // 回复描述列表column
    const replyDescColumn: ProDescriptionsItemProps<IOpinionList>[] = [
        {
            title: '客服ID',
            key: 'replyUserId',
            dataIndex: 'replyUserId',
        },
        {
            title: '回复内容',
            key: 'replyContent',
            dataIndex: 'replyContent',
        },
        {
            title: '回复时间',
            key: 'replyTime',
            dataIndex: 'replyTime',
            valueType: 'dateTime',
            fieldProps: {
                format: dateTimeFormat
            },
        },
    ]

    // 反馈详情描述列表column
    const feedDetailDescColumn: ProDescriptionsItemProps<IOpinionList>[] = [
        {
            title: '用户ID',
            key: 'userId',
            dataIndex: 'userId',
        },
        {
            title: '用户昵称',
            key: 'userNickname',
            dataIndex: 'userNickname',
        },
        {
            title: '用户手机号',
            key: 'userMobile',
            dataIndex: 'userMobile',
            copyable: true,
        },
        {
            title: '反馈类型',
            key: 'categoryEnum',
            dataIndex: 'categoryEnum',
            valueType: 'select',
            valueEnum: FEED_CATEGORY,
        },
        {
            title: '处理状态',
            key: 'statusEnum',
            dataIndex: 'statusEnum',
            valueType: 'select',
            valueEnum: FEED_STATUS,
        },
        {
            title: '反馈优先级',
            key: 'priority',
            dataIndex: 'priority',
        },
        {
            title: '标签',
            key: 'tags',
            dataIndex: 'tags',
            span: 3,
            render: (_, record) => {
                const tags = record.tags?.split(',');
                return tags?.map((tag) => {
                    return <Tag style={{ margin: 5 }} key={tag} color='#87d068'>{tag}</Tag>
                })
            }
        },
        {
            title: '反馈进度',
            key: 'feedDetail',
            dataIndex: 'feedDetail',
            span: 3,
            render: (_, record) => {
                if (!record.statusEnum) {
                    return '-'
                }
                return (
                    <Steps
                        progressDot
                        current={FEED_STATUS[record.statusEnum].step}
                        direction="vertical"
                        items={[
                            {
                                title: '用户反馈',
                                description: (
                                    <ProDescriptions
                                        title={null}
                                        column={2}
                                        dataSource={record}
                                        emptyText={'-'}
                                        columns={descColumn}
                                    />
                                ),
                            },
                            {
                                title: '客服处理',
                                description: (
                                    <ProDescriptions
                                        title={null}
                                        column={2}
                                        dataSource={FEED_STATUS[record.statusEnum]?.step === FEED_STATUS[FEED_STATUS_NAME.PROCESSED].step ? record : {} as IOpinionList}
                                        emptyText={'-'}
                                        columns={replyDescColumn}
                                    />
                                ),
                            },
                        ]}
                    />
                )
            }
        },
        {
            title: '操作',
            valueType: 'option',
            render: (_dom, _record, _, action) => {
                const optList = [
                    <Button
                        key="refresh"
                        type='primary'
                        size='small'
                        onClick={() => {
                            action?.reload();
                        }}
                    >
                        刷新
                    </Button>,
                    <Button
                        key="refresh"
                        type='default'
                        size='small'
                        onClick={() => {
                            navigate(-1)
                        }}
                    >
                        返回
                    </Button>
                ]
                return optList
            }
        },
    ]

    return (
        <>
            <ProDescriptions
                title='意见反馈详情'
                column={3}
                emptyText={'-'}
                columns={feedDetailDescColumn}
                request={async () => {
                    if (opinionId) {
                        const res = await getOpinionDetailAPI({
                            id: Number(opinionId)
                        })
                        if (res.success) {
                            return Promise.resolve({
                                success: true,
                                data: res.data,
                            });
                        }
                    }
                    return Promise.reject({
                        success: false,
                        data: null,
                    });
                }}
            />
        </>
    )
}

export default OpinionDetail
