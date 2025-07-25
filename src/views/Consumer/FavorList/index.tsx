import React, { useRef, useEffect, memo, useState } from 'react'
import type { FC, ReactNode } from 'react'
import { Button, Space, App } from 'antd'
import { ProTable, ProColumns } from '@ant-design/pro-components'
import type { FormInstance, ActionType } from '@ant-design/pro-components'
import { useLayout } from '@/hooks/useLayout';
import { ROUTE_KEY, ROUTE_PARAM_NAME } from '@/constants'
import { useAppSelector } from '@/hooks/useAppStore'
import { IFavorList, IFavorListRequest } from '@/api/type'
import dayjs from 'dayjs'
import { useFieldProps } from '@/hooks/useFieldProps'

interface IProps {
    children?: ReactNode
}

const FavorList: FC<IProps> = (_props) => {
    const {
        staff: {
            staffList
        },
        user: {
            userRole,
            permissions
        }
    } = useAppSelector((state) => state)
    const { message, modal } = App.useApp();
    const { navigateTo, getRouteRole } = useLayout();
    const {
        dateRangePlaceholder,
    } = useFieldProps()

    // 是否正在加载
    // const [isLoading, setIsLoading] = useState(true);

    const actionRef = useRef<ActionType>();
    const formRef = useRef<FormInstance>();

    // 用户列表列数据
    const columns: ProColumns<IFavorList>[] = [
        {
            dataIndex: 'index',
            valueType: 'index',
            title: '序号',
            width: 48,
            fixed: 'left',
            align: 'center',
        },
        {
            dataIndex: 'openid',
            title: '用户编号',
            width: 200,
            //   fixed: 'left',
            ellipsis: true,
            align: 'center',
        },
        {
            dataIndex: 'nickname',
            title: '用户昵称',
            width: 100,
            align: 'center',
        },
        {
            dataIndex: 'mobile',
            title: '手机号',
            width: 120,
            copyable: true,
            align: 'center',
        },
        {
            dataIndex: 'compareCompany',
            title: '关联企业',
            width: 180,
            align: 'center',
            search: false,
        },
        {
            dataIndex: 'question',
            title: '问题',
            width: 180,
            align: 'center',
            search: false,
            ellipsis: true,
        },
        {
            dataIndex: 'answer',
            title: '回答',
            width: 180,
            align: 'center',
            ellipsis: true,
            formItemProps: {
                label: '内容'
            },
        },
        {
            dataIndex: 'createTime',
            title: '收藏时间',
            valueType: 'dateRange',
            width: 150,
            align: 'center',
            render: (_, record) => dayjs(record.createTime).format('YYYY-MM-DD HH:mm:ss'),
            fieldProps: {
                placeholder: dateRangePlaceholder,
            },
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
                        // console.log('record: ', record);
                        navigateTo(ROUTE_KEY.FAVOR_DETAIL,
                            {
                                [ROUTE_PARAM_NAME.FAVOR_ID]: record.id,
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
            {/* <Spin
        spinning={true}
        tip="加载中..."
        style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
      /> */}
            <ProTable<IFavorList>
                scroll={{ x: 1500 }}
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
                    return {
                        data: [
                            {
                                id: 1,
                                openid: 'oB7RFvsZjYXi1IsY_VjPTXZwCrX4',
                                nickname: '测试用户',
                                avatar: 'https://i-avatar.csdnimg.cn/587736a80af847d2a1275bc78bac6118_m0_58988036.jpg!1',
                                mobile: '15898989898',
                                compareCompany: '上海测试公司',
                                question: '问题1',
                                answer: '答案答案答案答案答案答案答案答案答案答案答案答案答案答案答案答案答案答案答案答案答案答案答案答案答案答案答案答案答案答案答案答案答案答案答案答案答案答案答案答案答案答案答案答案答案答案答案答案答案答案答案答案答案答案答案答案答案答案答案答案答案答案答案答案答案答案答案答案答案答案答案答案答案答案答案答案答案答案答案答案答案答案答案答案答案答案答案答案答案答案答案答案答案答案答案答案',
                                createTime: 1672531200000,
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
                    // if (res.errMsg) {
                    //     message.error(res.errMsg)
                    // }
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
                    // onChange(value) {
                    //   console.log('value: ', value);
                    // },
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
                headerTitle="收藏列表"
            // toolBarRender={() => [
            //   <PermissionWrapper
            //     requiredRole={getRouteRole(ROUTE_KEY.ADD_CONSUMER, 3)}
            //     requiredPermissions={[ROUTE_PERMISSION.ADD_CONSUMER]}
            //   >
            //     <Button
            //       key="add-staff"
            //       icon={<PlusOutlined />}
            //       onClick={() => {
            //         // actionRef.current?.reload();
            //         const encodedRedirectInfo = encodeRedirectInfo({
            //           pathname: ROUTE_KEY.CONSUMER_LIST,
            //           search: '',
            //           hash: '',
            //           state: null,
            //           key: ''
            //         })
            //         navigateTo(
            //           ROUTE_KEY.ADD_CONSUMER,
            //           {
            //             [ROUTE_PARAM_NAME.PAGE_TYPE]: '1',
            //             [ROUTE_PARAM_NAME.REDIRECT_INFO]: encodedRedirectInfo,
            //           });
            //       }}
            //       type="primary"
            //     >
            //       新建用户
            //     </Button>
            //   </PermissionWrapper>
            // ]}
            />
        </>
    )
}

export default memo(FavorList)
