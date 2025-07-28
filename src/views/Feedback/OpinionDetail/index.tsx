import React from 'react'
import type { FC, ReactNode } from 'react'
import { Tag } from 'antd'
import { ROUTE_PARAM_NAME } from '@/constants'
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
import dayjs from 'dayjs'

interface IProps {
    children?: ReactNode
}

const OpinionDetail: FC<IProps> = (_props) => {
    const location = useLocation();
    const opinionId = getLocationParamsByName(location, ROUTE_PARAM_NAME.OPINION_ID);

    // 描述列表column
    const descColumn: ProDescriptionsItemProps<IOpinionList>[] = [
        {
            title: '提交时间',
            key: 'createTime',
            dataIndex: 'createTime',
            valueType: 'dateTime',
            render: (_, record) => dayjs(record.createTime).format('YYYY-MM-DD HH:mm:ss'),
        },
        {
            title: '意见内容',
            key: 'opinionContent',
            dataIndex: 'opinionContent',
        },
        {
            title: '图片附件',
            key: 'imageList',
            dataIndex: 'imageList',
            render: (_, record) => {
                return (
                    <Image.PreviewGroup
                        preview={{
                            onChange: (current, prev) => console.log(`current index: ${current}, prev index: ${prev}`),
                        }}
                    >
                        {record.imageList?.map((item) => (
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

    return (
        <>
            <ProDescriptions
                title="意见反馈详情"
                column={1}
                request={async () => {
                    return Promise.resolve({
                        success: true,
                        data: {
                            id: 1,
                            opinionNo: '1',
                            consumerName: '1',
                            mobile: '1',
                            opinionContent: '1',
                            imageList: [
                                'https://minio-dev.imissniu.com/xfn/assets%2Fvip%2Flevel1%402x.png',
                                'https://minio-dev.imissniu.com/xfn/assets%2Fvip%2Flevel2%402x.png'
                            ],
                            createTime: 1790000000000,
                        },
                    });
                    // 详情接口
                    // const res = await getOpinionDetailAPI({
                    //     id: Number(opinionId)
                    // })
                    // if (res.success) {
                    //     // 角色接口
                    //     const rolesRes = await getStaffRolesAPI({
                    //         userId: res.data.id,
                    //     })
                    //     if (rolesRes.success) {
                    //         // 角色接口返回值处理
                    //         res.data.staffRole = getIDStaffRole(rolesRes.data) as any;
                    //         return Promise.resolve({
                    //             success: true,
                    //             data: res.data,
                    //         });
                    //     }
                    // }
                    // return Promise.reject({
                    //     success: false,
                    //     data: null,
                    // });
                }}
                emptyText={'-'}
                columns={descColumn}
            />
        </>
    )
}

export default OpinionDetail
