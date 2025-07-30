import React, { useRef, memo } from 'react'
import type { FC, ReactNode } from 'react'
import { Button, Space, Tag } from 'antd'
import { ProTable, ProColumns } from '@ant-design/pro-components'
import type { FormInstance, ActionType } from '@ant-design/pro-components'
import { useFieldProps } from '@/hooks/useFieldProps'
import {
    IOpinionList,
    IOpinionListRequest,
} from '@/api/type'
import {
    ROUTE_KEY,
    ROUTE_PARAM_NAME,
} from '@/constants'
import { useLayout } from '@/hooks/useLayout'
import { getOpinionListAPI } from '@/api/feedback'
import {
    FEED_CATEGORY,
    FEED_STATUS,
} from '@/constants'

interface IProps {
    children?: ReactNode
}

const OpinionList: FC<IProps> = (_props) => {
    const {
        dateRangePlaceholder,
        dateTimeFormat
    } = useFieldProps()

    const { navigateTo } = useLayout();

    const actionRef = useRef<ActionType>();
    const formRef = useRef<FormInstance>();

    // 用户列表列数据
    const columns: ProColumns<IOpinionList>[] = [
        {
            dataIndex: 'index',
            valueType: 'index',
            title: '序号',
            width: 48,
            fixed: 'left',
            align: 'center',
        },
        {
            dataIndex: 'userId',
            title: '用户ID',
            width: 80,
            align: 'center',
        },
        {
            dataIndex: 'contactMsg',
            title: '用户手机号',
            width: 120,
            align: 'center',
        },
        {
            dataIndex: 'category',
            title: '反馈类型',
            width: 80,
            align: 'center',
            valueType: 'select',
            valueEnum: FEED_CATEGORY,
        },
        {
            dataIndex: 'content',
            title: '反馈内容',
            width: 200,
            align: 'center',
            ellipsis: true,
        },
        {
            dataIndex: 'status',
            title: '处理状态',
            width: 80,
            align: 'center',
            valueType: 'select',
            valueEnum: FEED_STATUS,
        },
        {
            dataIndex: 'priority',
            title: '优先级',
            width: 80,
            align: 'center',
            search: false,
            sorter: true,
        },
        {
            dataIndex: 'tags',
            title: '标签',
            width: 80,
            align: 'center',
            search: false,
            render: (_, record) => {
                const tags = record.tags?.split(',');
                return tags?.map((tag) => {
                    return <Tag style={{ margin: 5 }} key={tag} color='#87d068'>{tag}</Tag>
                })
            }
        },
        {
            dataIndex: 'createTime',
            title: '创建时间',
            valueType: 'dateTime',
            width: 150,
            align: 'center',
            fieldProps: {
                format: dateTimeFormat,
            },
            search: false,
        },
        {
            dataIndex: 'createTime',
            title: '创建时间',
            valueType: 'dateRange',
            fieldProps: {
                placeholder: dateRangePlaceholder,
            },
            hidden: true,
        },
        {
            title: '操作',
            align: 'center',
            valueType: 'option',
            key: 'option',
            fixed: 'right',
            width: 80,
            render: (text, record, _, action) => (
                <Button
                    key="view"
                    color="primary"
                    variant="text"
                    size='small'
                    onClick={() => {
                        // console.log('查看会话: ', record);
                        navigateTo(ROUTE_KEY.OPINION_DETAIL,
                            {
                                [ROUTE_PARAM_NAME.OPINION_ID]: record.id,
                            });
                    }}
                >
                    查看
                </Button>
            ),
        },
    ]

    return (
        <>
            <ProTable<IOpinionList>
                scroll={{ x: 1000 }}
                bordered
                columns={columns}
                rowSelection={{
                    // 注释该行则默认不显示下拉选项
                    // selections: [Table.SELECTION_ALL, Table.SELECTION_INVERT],
                    defaultSelectedRowKeys: [],
                }}
                tableAlertRender={({
                    selectedRowKeys,
                    selectedRows,
                    onCleanSelected,
                }) => {
                    // console.log('selectedRowKeys: ', selectedRowKeys);
                    // console.log('selectedRows: ', selectedRows);
                    return (
                        <Space size={24}>
                            <span>
                                已选 {selectedRows.length} 项
                                <a style={{ marginInlineStart: 8 }} onClick={onCleanSelected}>
                                    取消选择
                                </a>
                            </span>
                        </Space>
                    );
                }}
                tableAlertOptionRender={() => {
                    return (
                        <Space size={16}>
                            <a>导出数据</a>
                        </Space>
                    );
                }}
                actionRef={actionRef}
                cardBordered
                request={async (params, sort, filter) => {
                    // console.log('params: ', params);
                    // console.log('sort: ', sort);
                    // console.log('filter: ', filter);
                    let queryParams: IOpinionListRequest = {
                        ...params,
                        pageNo: params.current!,
                        pageSize: params.pageSize!,
                    }
                    const res = await getOpinionListAPI(queryParams)
                    return {
                        data: [
                            {
                                id: 1,
                                userId: 1,
                                contactMsg: '13800000000',
                                content: '测试反馈内容',
                                status: 'PENDING',
                                statusDesc: '待处理',
                                replyContent: '测试回复内容',
                                replyTime: 1785958000000,
                                replyUserId: 1,
                                category: 'GENERAL',
                                categoryDesc: '一般',
                                priority: 1,
                                tags: '测试标签,测试标签2,测试标签3',
                                images: ['https://example.com/image1.jpg', 'https://example.com/image2.jpg'],
                                createTime: 1785958000000,
                                updateTime: 1785958000000
                            }
                        ],
                        total: res.data.total,
                        success: res.success,
                    }
                }
                }
                editable={{
                    type: 'multiple',
                }}
                columnsState={{
                    persistenceKey: 'pro-table-singe-demos',
                    persistenceType: 'localStorage',
                    defaultValue: {
                        option: { fixed: 'right', disable: true },
                    },
                }}
                rowKey="id"
                // 搜索表单配置
                search={{
                    labelWidth: 'auto',
                    defaultCollapsed: false,
                }}
                // 搜索表单实例
                formRef={formRef}
                options={{
                    setting: {
                        listsHeight: 400,
                    },
                }}
                form={{
                    // 由于配置了 transform，提交的参数与定义的不同这里需要转化一下
                    syncToUrl: (values, type) => {
                        if (type === 'get') {
                            return {
                                ...values,
                            };
                        }
                        // 解决protable搜索表单参数会同步到url，导致不点重置按钮直接刷新页面时会将上次搜索表单中的数据当作默认数据，重置按钮失效的问题
                        return {};
                    },
                }}
                pagination={{
                    showSizeChanger: true,
                    defaultPageSize: 10,
                    pageSizeOptions: [10, 20, 30, 40, 50],
                }}
                dateFormatter="string"
                headerTitle="意见反馈列表"
            />
        </>
    )
}

export default memo(OpinionList)

