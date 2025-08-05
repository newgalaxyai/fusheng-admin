import React, { useRef, useEffect, memo, useState } from 'react'
import type { FC, ReactNode } from 'react'
import { Button, Space, Progress, App, Modal } from 'antd'
import { ProTable, ProColumns } from '@ant-design/pro-components'
import type { FormInstance, ActionType } from '@ant-design/pro-components'
import { useFieldProps } from '@/hooks/useFieldProps'
import { IComFeedbackList } from '@/api/type'
import ContactsComponent from '@/components/contacts'
import { BUSINESS_SCOPE, COMPANY_STATUS, FEED_TYPE, INDUSTRY, PERSON_SCALE, ROUTE_KEY, ROUTE_PARAM_NAME } from '@/constants'

interface IProps {
    children?: ReactNode
}

const ComFeedbackList: FC<IProps> = (_props) => {
    const {
        cascaderOptions,
        cascaderLoadData,
        dateRangePlaceholder,
        dateFormat,
    } = useFieldProps()

    const actionRef = useRef<ActionType>();
    const formRef = useRef<FormInstance>();

    const { message } = App.useApp()

    // 列表列数据
    const columns: ProColumns<IComFeedbackList>[] = [
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
            width: 200,
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
            dataIndex: 'feedType',
            title: '反馈情况',
            width: 150,
            align: 'center',
            valueType: 'select',
            valueEnum: FEED_TYPE,
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
            dataIndex: 'address',
            title: '详细地址',
            width: 200,
            align: 'center',
            ellipsis: true,
            search: false,
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
            valueType: 'select',
            valueEnum: PERSON_SCALE,
            search: false,
        },
        {
            dataIndex: 'registerTime',
            title: '注册时间',
            valueType: 'date',
            width: 150,
            align: 'center',
            fieldProps: {
                format: dateFormat,
            },
            search: false,
        },
        {
            dataIndex: 'registerTime',
            title: '注册时间',
            valueType: 'dateRange',
            fieldProps: {
                placeholder: dateRangePlaceholder,
            },
            hidden: true,
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
            valueType: 'select',
            valueEnum: INDUSTRY,
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
            render: (_, record) =>
                <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href={record.website.startsWith('http') ? record.website : `//${record.website}`}
                    style={{ color: '#1890ff' }}
                >{record.website}</a>,
            search: false,
        },
        {
            dataIndex: 'status',
            title: '公司登记状态',
            width: 150,
            align: 'center',
            valueType: 'select',
            valueEnum: COMPANY_STATUS,
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
            render: (_, record) => <Progress percent={record.matchScore} />
        },
        {
            dataIndex: 'businessScope',
            title: '经营范围',
            width: 150,
            align: 'center',
            valueType: 'select',
            valueEnum: BUSINESS_SCOPE,
            search: false,
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
                            setCompanyID(record.id);
                            setIsContactsModalOpen(true);
                        }}
                    >
                        联系人
                    </Button>,
                    <Button
                        key="view"
                        color="primary"
                        variant="text"
                        size='small'
                        onClick={() => {
                            // message.info('暂未开放')
                            setIsFeedbackModalOpen(true);
                        }}
                    >
                        反馈结果
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
    const [companyID, setCompanyID] = useState<number>(0);

    // 查看反馈结果弹窗
    const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState<boolean>(false);

    return (
        <>
            <ProTable<IComFeedbackList>
                scroll={{ x: 3700 }}
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
                                companyNo: 'COM000000000001',
                                companyName: '测试企业5',
                                taxNo: '91310000MA00000000',
                                taxType: 1,
                                companyType: 1,
                                companyIntroduction: '简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介',
                                provinceId: 33,
                                provinceName: '浙江省',
                                cityId: 3301,
                                cityName: '杭州市',
                                districtId: 330101,
                                districtName: '西湖区',
                                address: '西湖风景区',
                                legalPersonName: '张三',
                                personScale: 1,
                                registerTime: 1772531200000,
                                registeredCapital: 47560000,
                                actualCapital: 39800000,
                                industry: 1,
                                productLabel: 1,
                                website: 'www.baidu.com',
                                status: 1,
                                employeeNum: 90,
                                insuredNum: 80,
                                matchScore: 87,
                                businessScope: 1,
                                operateTermStart: 1772531200000,
                                operateTermEnd: 1772531200000,
                                tags: ['存续', '电子企业'],
                                creditCode: '91310000MA00000000',
                                businessLicenseNo: '4401080000000021',
                                orgCode: '1000006899',
                                importExportCode: '44011000006899',
                                seaRegisterCode: '44011000006899',
                                approvalDate: 1772531200000,
                                registerOffice: '杭州市市场监督管理局',
                                oldNames: ['测试企业1', '测试企业2'],
                                englishName: 'Test Company',
                                feedType: 1,
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
                headerTitle="企业反馈列表"
            />
            <ContactsComponent
                companyID={companyID}
                isModalOpen={isContactsModalOpen}
                handleCancel={() => setIsContactsModalOpen(false)}
            />
            {/* 反馈结果 */}
            <Modal
                title="反馈结果"
                closable={{ 'aria-label': 'Custom Close Button' }}
                open={isFeedbackModalOpen}
                onCancel={() => setIsFeedbackModalOpen(false)}
                footer={null}
            >
                <p>反馈结果</p>
            </Modal>
        </>
    )
}

export default memo(ComFeedbackList)

