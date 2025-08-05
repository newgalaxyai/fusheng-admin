import React, { useState, useEffect } from 'react'
import type { FC, ReactNode } from 'react'
import { Steps, Skeleton, Empty } from 'antd'
import { FEED_STATUS, FEED_STATUS_NAME, ROUTE_PARAM_NAME } from '@/constants'
import { getLocationParamsByName } from '@/utils/location'
import { useLocation } from 'react-router-dom'
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
    const opinionId = getLocationParamsByName(location, ROUTE_PARAM_NAME.OPINION_ID);

    // 骨架屏loading
    const [loading, setLoading] = useState(true)
    // 反馈详情
    const [opinionDetail, setOpinionDetail] = useState<IOpinionList | null>(null)
    // 获取反馈详情
    const getOpinionDetail = async (opinionId: number) => {
        const res = await getOpinionDetailAPI({
            id: Number(opinionId)
        })
        if (res.success) {
            setOpinionDetail(res.data)
            // setTimeout(() => {
            //     setLoading(false)
            // }, 1000)
            setLoading(false)
        }
    }
    useEffect(() => {
        if (opinionId) {
            getOpinionDetail(Number(opinionId))
        }
    }, [])

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

    return (
        <>
            {loading ? (
                <Skeleton active loading={true}>
                </Skeleton>
            ) : opinionDetail ? (
                <Steps
                    progressDot
                    current={FEED_STATUS[opinionDetail.statusEnum].step}
                    direction="vertical"
                    items={[
                        {
                            title: '用户反馈',
                            description: (
                                <ProDescriptions
                                    title={null}
                                    column={2}
                                    dataSource={opinionDetail}
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
                                    dataSource={FEED_STATUS[opinionDetail.statusEnum]?.step === FEED_STATUS[FEED_STATUS_NAME.PROCESSED].step ? opinionDetail : {} as IOpinionList}
                                    emptyText={'-'}
                                    columns={replyDescColumn}
                                />
                            ),
                        },
                    ]}
                />
            ) : (
                <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
            )}
        </>
    )
}

export default OpinionDetail
