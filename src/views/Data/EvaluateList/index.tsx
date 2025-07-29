import React, { useRef, useEffect, memo, useState } from 'react'
import type { FC, ReactNode } from 'react'
import { Button, Space } from 'antd'
import { ProTable, ProColumns } from '@ant-design/pro-components'
import type { FormInstance, ActionType } from '@ant-design/pro-components'
import { useFieldProps } from '@/hooks/useFieldProps'
import { IEvaluateList } from '@/api/type'
import {
    ROUTE_KEY,
    ROUTE_PARAM_NAME,
    EVALUATE,
    QA_ENTRY
} from '@/constants'
import { useLayout } from '@/hooks/useLayout'

interface IProps {
    children?: ReactNode
}

const EvaluateList: FC<IProps> = (_props) => {
    const {
        dateRangePlaceholder,
        dateTimeFormat
    } = useFieldProps()

    const {
        navigateTo
    } = useLayout()

    const actionRef = useRef<ActionType>();
    const formRef = useRef<FormInstance>();

    // 用户列表列数据
    const columns: ProColumns<IEvaluateList>[] = [
        {
            dataIndex: 'index',
            valueType: 'index',
            title: '序号',
            width: 48,
            fixed: 'left',
            align: 'center',
        },
        {
            dataIndex: 'entry',
            title: '问答入口',
            width: 150,
            align: 'center',
            valueType: 'select',
            valueEnum: QA_ENTRY
        },
        {
            dataIndex: 'openid',
            title: '用户编号',
            width: 200,
            ellipsis: true,
            align: 'center',
        },
        {
            dataIndex: 'nickname',
            title: '用户昵称',
            width: 150,
            align: 'center',
            ellipsis: true,
        },
        {
            dataIndex: 'question',
            title: '问题内容',
            width: 200,
            align: 'center',
            ellipsis: true,
        },
        {
            dataIndex: 'answer',
            title: '回答内容',
            width: 200,
            align: 'center',
            ellipsis: true,
        },
        {
            dataIndex: 'evaluate',
            title: '评价',
            width: 120,
            align: 'center',
            valueType: 'select',
            valueEnum: EVALUATE,
        },
        {
            dataIndex: 'createTime',
            title: '评价时间',
            valueType: 'dateTime',
            width: 200,
            align: 'center',
            fieldProps: {
                format: dateTimeFormat,
            },
            search: false,
        },
        {
            dataIndex: 'createTime',
            title: '评价时间',
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
                        navigateTo(ROUTE_KEY.EVALUATE_DETAIL,
                            {
                                [ROUTE_PARAM_NAME.EVALUATE_ID]: record.id,
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
            <ProTable<IEvaluateList>
                scroll={{ x: 1300 }}
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
                    return {
                        data: [
                            {
                                id: 1,
                                entry: 1,
                                openid: 'oB7RFvsZjYXi1IsY_VjPTXZwCrX4',
                                nickname: '测试用户',
                                question: '问题1',
                                think: '思考1',
                                answer: '回答1',
                                createTime: 1672531200000,
                                questionTime: 1672531200000,
                                thinkTime: 1672531200000,
                                answerTime: 1672531200000,
                                evaluate: 3,
                            }
                        ],
                        success: true,
                        total: 0
                    }
                    // console.log('params: ', params);
                    // console.log('sort: ', sort);
                    // console.log('filter: ', filter);
                    // let queryParams: IFavorListRequest = {
                    //     ...params,
                    //     pageNo: params.current!,
                    //     pageSize: params.pageSize!,
                    // }
                    // if (params.createTime) {
                    //     queryParams = {
                    //         ...queryParams,
                    //         createStartTime: params.createTime[0], // 注册开始时间
                    //         createEndTime: params.createTime[1], // 注册结束时间
                    //     }
                    // }
                    // const res = await getConsumerListAPI(queryParams)
                    // return {
                    //     data: res.data.list,
                    //     total: res.data.total,
                    //     success: res.success,
                    // }
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
                headerTitle="AI回答评价"
            />
        </>
    )
}

export default memo(EvaluateList)

