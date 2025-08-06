import React, { useRef, memo, useState } from 'react'
import type { FC, ReactNode } from 'react'
import { Button, Space, Progress } from 'antd'
import { ProTable, ProColumns } from '@ant-design/pro-components'
import type { FormInstance, ActionType } from '@ant-design/pro-components'
import { useLayout } from '@/hooks/useLayout';
import { BUSINESS_SCOPE, COMPANY_STATUS, INDUSTRY, PERSON_SCALE, ROUTE_KEY, ROUTE_PARAM_NAME } from '@/constants'
import { ICompanyList, ICompanyListRequest, IConcatMsg } from '@/api/type'
import { useFieldProps } from '@/hooks/useFieldProps'
import ContactsComponent from '@/components/contacts'
import { getCompanyListPageAPI } from '@/api/company'

interface IProps {
    children?: ReactNode
}

const CompanyList: FC<IProps> = (_props) => {
    const { navigateTo } = useLayout();
    const {
        dateRangePlaceholder,
        areaTreeOptions,
        areaFieldNames,
    } = useFieldProps()

    // 是否正在加载
    // const [isLoading, setIsLoading] = useState(true);

    const actionRef = useRef<ActionType>();
    const formRef = useRef<FormInstance>();

    // 列表列数据
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
            dataIndex: 'id',
            title: '企业ID',
            width: 120,
            align: 'center',
        },
        {
            dataIndex: 'name',
            title: '企业名称',
            width: 200,
            align: 'center',
            ellipsis: true,
        },
        {
            dataIndex: 'websites',
            title: '官网',
            width: 200,
            align: 'center',
            ellipsis: true,
            copyable: true,
            search: false,
        },
        {
            dataIndex: 'regStatus',
            title: '登记状态',
            width: 120,
            align: 'center',
            ellipsis: true,
        },
        {
            dataIndex: 'creditCode',
            title: '统一社会信用代码',
            width: 250,
            align: 'center',
        },
        {
            dataIndex: 'legalPerson',
            title: '法定代表人',
            width: 120,
            align: 'center',
            ellipsis: true,
        },
        {
            dataIndex: 'establishTime',
            title: '成立日期',
            width: 150,
            align: 'center',
            search: false,
        },
        {
            dataIndex: 'establishTime',
            title: '成立日期',
            valueType: 'dateRange',
            fieldProps: {
                placeholder: dateRangePlaceholder,
            },
            hidden: true,
        },
        {
            dataIndex: 'regCapital',
            title: '注册资本',
            width: 150,
            align: 'center',
            search: false,
        },
        {
            dataIndex: 'paidInCapital',
            title: '实缴资本',
            width: 150,
            align: 'center',
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
            dataIndex: 'area',
            title: '地区',
            hidden: true,
            valueType: 'cascader',
            fieldProps: {
                options: areaTreeOptions,
                fieldNames: {
                    ...areaFieldNames,
                    value: 'name',
                },
            },
        },
        {
            dataIndex: 'regLocation',
            title: '企业地址',
            width: 200,
            align: 'center',
            ellipsis: true,
            search: false,
        },
        {
            dataIndex: 'taxpayerId',
            title: '纳税人识别号',
            width: 200,
            align: 'center',
        },
        {
            dataIndex: 'regNumber',
            title: '注册号',
            width: 200,
            align: 'center',
            search: false,
        },
        {
            dataIndex: 'orgNumber',
            title: '组织机构代码',
            width: 150,
            align: 'center',
            search: false,
        },
        {
            dataIndex: 'orgType',
            title: '企业(机构)类型',
            width: 200,
            align: 'center',
        },
        {
            dataIndex: 'categoryNameLv1',
            title: '国行一级分类',
            width: 150,
            align: 'center',
            search: false,
        },
        {
            dataIndex: 'categoryNameLv2',
            title: '国行二级分类',
            width: 150,
            align: 'center',
            search: false,
        },
        {
            dataIndex: 'categoryNameLv3',
            title: '国行三级分类',
            width: 150,
            align: 'center',
            search: false,
        },
        // {
        //     dataIndex: 'mainProductTags',
        //     title: '主营产品标签',
        //     width: 150,
        //     align: 'center',
        //     search: false,
        // },
        // {
        //     dataIndex: 'industryTags',
        //     title: '行业赛道标签',
        //     width: 150,
        //     align: 'center',
        //     search: false,
        // },
        {
            dataIndex: 'matchScore',
            title: '匹配度',
            width: 200,
            align: 'center',
            valueType: 'slider',
            search: false,
            fieldProps: {
                min: 0,
                max: 100,
                range: true,
            },
            render: (_, record) => <Progress percent={95} />
        },
        {
            title: '操作',
            align: 'center',
            valueType: 'option',
            key: 'option',
            fixed: 'right',
            width: 150,
            render: (text, record, _, action) => {
                const optList = [
                    <Button
                        key="view"
                        color="primary"
                        variant="text"
                        size='small'
                        onClick={() => {
                            // console.log('record: ', record);
                            navigateTo(ROUTE_KEY.COMPANY_DETAIL,
                                {
                                    [ROUTE_PARAM_NAME.COMPANY_ID]: record.id,
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
                            setConcatMsg(record.concatMsg);
                            setIsContactsModalOpen(true);
                        }}
                    >
                        联系人
                    </Button>
                ]
                return (
                    <Space size="small">
                        {optList}
                    </Space>
                )
            }
        },
    ]

    // 查看联系人弹窗
    const [isContactsModalOpen, setIsContactsModalOpen] = useState<boolean>(false);
    const [concatMsg, setConcatMsg] = useState<IConcatMsg[]>([]);

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
                    // console.log('params: ', params);
                    // console.log('sort: ', sort);
                    // console.log('filter: ', filter);
                    let queryParams: ICompanyListRequest = {
                        ...params,
                        pageNo: params.current!,
                        pageSize: params.pageSize!,
                    }
                    if (params.area) {
                        switch (params.area.length) {
                            case 1:
                                queryParams.provinceName = params.area[0];
                                break;
                            case 2:
                                queryParams.provinceName = params.area[0];
                                queryParams.cityName = params.area[1];
                                break;
                            case 3:
                                queryParams.provinceName = params.area[0];
                                queryParams.cityName = params.area[1];
                                queryParams.districtName = params.area[2];
                                break;
                            default:
                                break;
                        }
                    }
                    const res = await getCompanyListPageAPI(queryParams)
                    return {
                        data: res.data.list,
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
            <ContactsComponent
                isModalOpen={isContactsModalOpen}
                concatMsg={concatMsg}
                handleCancel={() => setIsContactsModalOpen(false)}
            />
        </>
    )
}

export default memo(CompanyList)
