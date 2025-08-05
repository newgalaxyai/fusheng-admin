import React, { useRef, memo } from 'react'
import type { FC, ReactNode } from 'react'
import { Space, Cascader } from 'antd'
import { ProTable, ProColumns } from '@ant-design/pro-components'
import type { FormInstance, ActionType } from '@ant-design/pro-components'
import { LOGIN_TYPE } from '@/constants'
import {
    IAreaTree,
    ILoginList,
    ILoginListRequest,
} from '@/api/type'
import { useFieldProps } from '@/hooks/useFieldProps'
import { getConsumerLoginLogAPI } from '@/api/consumer'

interface IProps {
    children?: ReactNode
}

const LoginList: FC<IProps> = (_props) => {
    const {
        areaFieldNames,
        areaTreeOptions,
        selectPlaceholder,
        dateRangePlaceholder,
        dateTimeFormat,
        startTimeFormat,
        endTimeFormat,
    } = useFieldProps()

    // 是否正在加载
    // const [isLoading, setIsLoading] = useState(true);

    const actionRef = useRef<ActionType>();
    const formRef = useRef<FormInstance>();

    // 用户列表列数据
    const columns: ProColumns<ILoginList>[] = [
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
            //   fixed: 'left',
            ellipsis: true,
            align: 'center',
            search: false,
        },
        {
            dataIndex: 'nickname',
            title: '用户昵称',
            width: 120,
            align: 'center',
        },
        {
            dataIndex: 'username',
            title: '手机号',
            width: 120,
            copyable: true,
            align: 'center',
        },
        {
            dataIndex: 'userIp',
            title: 'IP',
            width: 120,
            align: 'center',
        },
        {
            dataIndex: 'createTime',
            title: '登录时间',
            valueType: 'dateTime',
            width: 120,
            align: 'center',
            fieldProps: {
                format: dateTimeFormat,
            },
            search: false,
        },
        {
            dataIndex: 'createTime',
            title: '登录时间',
            valueType: 'dateRange',
            fieldProps: {
                placeholder: dateRangePlaceholder,
            },
            hidden: true,
        },
        {
            dataIndex: 'area',
            title: '地区',
            width: 100,
            align: 'center',
            valueType: 'cascader',
            fieldProps: (form) => {
                return {
                    placeholder: selectPlaceholder,
                    options: areaTreeOptions,
                    fieldNames: {
                        ...areaFieldNames,
                        value: 'name',
                    },
                    // showCheckedStrategy: Cascader.SHOW_CHILD,
                    changeOnSelect: true,
                }
            }
        },
        {
            dataIndex: 'loginType',
            title: '登录方式',
            width: 100,
            align: 'center',
            valueType: 'select',
            valueEnum: LOGIN_TYPE,
        },
    ]

    return (
        <>
            {/* <Spin
        spinning={true}
        tip="加载中..."
        style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
      /> */}
            <ProTable<ILoginList>
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
                    let queryParams: ILoginListRequest = {
                        ...params,
                        userType: 1,
                        pageNo: params.current!,
                        pageSize: params.pageSize!,
                        area: params.area?.join(' '),
                    }
                    if (params.createTime) {
                        queryParams.createTime = [params.createTime?.[0] + ' ' + startTimeFormat, params.createTime?.[1] + ' ' + endTimeFormat]
                    }
                    const res = await getConsumerLoginLogAPI(queryParams)
                    return {
                        data: res.data.list.map((item) => ({
                            ...item,
                            loginType: 1,
                        })),
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
                headerTitle="登录日志"
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

export default memo(LoginList)
