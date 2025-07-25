import React, { useRef, memo } from 'react'
import type { FC, ReactNode } from 'react'
import { Button, Space, Progress } from 'antd'
import { ProTable, ProColumns } from '@ant-design/pro-components'
import type { FormInstance, ActionType } from '@ant-design/pro-components'
import { useLayout } from '@/hooks/useLayout';
import { ROUTE_KEY, ROUTE_PARAM_NAME } from '@/constants'
import { ICompanyList } from '@/api/type'
import dayjs from 'dayjs'
import { useFieldProps } from '@/hooks/useFieldProps'

interface IProps {
    children?: ReactNode
}

const CompanyList: FC<IProps> = (_props) => {
    const { navigateTo } = useLayout();
    const {
        dateRangePlaceholder,
        cascaderOptions,
        cascaderLoadData,
    } = useFieldProps()

    // 是否正在加载
    // const [isLoading, setIsLoading] = useState(true);

    const actionRef = useRef<ActionType>();
    const formRef = useRef<FormInstance>();

    // 用户列表列数据
    const columns: ProColumns<ICompanyList>[] = [
        {
            dataIndex: 'index',
            valueType: 'index',
            title: '序号',
            width: 48,
            fixed: 'left',
            align: 'center',
        },
        {
            dataIndex: 'companyNo',
            title: '编号',
            width: 120,
            align: 'center',
        },
        {
            dataIndex: 'companyName',
            title: '企业名称',
            width: 200,
            align: 'center',
            ellipsis: true,
        },
        {
            dataIndex: 'taxNo',
            title: '税号',
            width: 200,
            align: 'center',
        },
        {
            dataIndex: 'companyIntroduction',
            title: '企业简介',
            width: 200,
            align: 'center',
            ellipsis: true,
            search: false,
        },
        {
            dataIndex: 'provinceName',
            title: '省',
            width: 120,
            align: 'center',
            search: false,
        },
        {
            dataIndex: 'cityName',
            title: '市',
            width: 120,
            align: 'center',
            search: false,
        },
        {
            dataIndex: 'districtName',
            title: '区/县',
            width: 120,
            align: 'center',
            search: false,
        },
        {
            title: '地区',
            hidden: true,
            valueType: 'cascader',
            fieldProps: {
                options: cascaderOptions,
                loadData: cascaderLoadData,
            },
        },
        {
            dataIndex: 'legalPersonName',
            title: '法人',
            width: 150,
            align: 'center',
            search: false,
        },
        {
            dataIndex: 'personScale',
            title: '人员规模',
            width: 150,
            align: 'center',
            search: false,
        },
        {
            dataIndex: 'registerTime',
            title: '注册时间',
            valueType: 'dateRange',
            width: 150,
            align: 'center',
            fieldProps: {
                placeholder: dateRangePlaceholder,
            },
            render: (_, record) => dayjs(record.registerTime).format('YYYY-MM-DD'),
        },
        {
            dataIndex: 'registeredCapital',
            title: '注册资本',
            width: 150,
            align: 'center',
            valueType: 'money',
            search: false,
        },
        {
            dataIndex: 'industry',
            title: '行业',
            width: 150,
            align: 'center',
            search: false,
        },
        {
            dataIndex: 'productLabel',
            title: '产品应用标签',
            width: 150,
            align: 'center',
            search: false,
        },
        {
            dataIndex: 'website',
            title: '公司网站',
            width: 150,
            align: 'center',
            ellipsis: true,
            render: (_, record) => <a href={record.website} target="_blank">{_}</a>,
            search: false,
        },
        {
            dataIndex: 'status',
            title: '公司登记状态',
            width: 150,
            align: 'center',
            valueType: 'select',
            search: false,
        },
        {
            dataIndex: 'insuredNum',
            title: '参保人数',
            width: 150,
            align: 'center',
            search: false,
        },
        {
            dataIndex: 'matchScore',
            title: '匹配度',
            width: 200,
            align: 'center',
            valueType: 'slider',
            fieldProps: {
                min: 0,
                max: 100,
                range: true,
            },
            render:(_,record) =>  <Progress percent={record.matchScore} />
        },
        {
            dataIndex: 'businessScope',
            title: '经营范围',
            width: 150,
            align: 'center',
            search: false,
        },
        {
            title: '操作',
            align: 'center',
            valueType: 'option',
            key: 'option',
            fixed: 'right',
            width: 150,
            render: (text, record, _, action) => [
                <Button
                    key="view"
                    color="primary"
                    variant="text"
                    size='small'
                    onClick={() => {
                        // console.log('record: ', record);
                        navigateTo(ROUTE_KEY.PAGE_FLOW,
                            {
                                [ROUTE_PARAM_NAME.ANALYSIS_ID]: record.id,
                            });
                    }}
                >
                    查看详情
                </Button>,
                <Button
                    key="view"
                    color="primary"
                    variant="text"
                    size='small'
                    onClick={() => {
                        // console.log('record: ', record);
                        navigateTo(ROUTE_KEY.PAGE_FLOW,
                            {
                                [ROUTE_PARAM_NAME.ANALYSIS_ID]: record.id,
                            });
                    }}
                >
                    联系人
                </Button>
            ]
        },
    ]

    return (
        <>
            {/* <Spin
        spinning={true}
        tip="加载中..."
        style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
      /> */}
            <ProTable<ICompanyList>
                scroll={{ x: 3500 }}
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
                                companyNo: '123',
                                companyName: '123',
                                taxNo: '123',
                                companyIntroduction: '999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999',
                                provinceId: 1,
                                provinceName: '123',
                                cityId: 1,
                                cityName: '123',
                                districtId: 1,
                                districtName: '123',
                                address: '123',
                                legalPersonName: '123',
                                personScale: 123,
                                registerTime: 1753409768000,
                                registeredCapital: 123,
                                industry: 123,
                                productLabel: 123,
                                website: '123',
                                status: 123,
                                insuredNum: 123,
                                matchScore: 95,
                                businessScope: 123,
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
                headerTitle="企业列表"
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

export default memo(CompanyList)
