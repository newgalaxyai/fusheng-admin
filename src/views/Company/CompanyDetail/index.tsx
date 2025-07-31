import React from 'react'
import type { FC, ReactNode } from 'react'
import { Tag, Typography } from 'antd'
import { BUSINESS_SCOPE, COMPANY_STATUS, COMPANY_TYPE, INDUSTRY, ROUTE_PARAM_NAME, TAX_TYPE } from '@/constants'
import { getLocationParamsByName } from '@/utils/location'
import { useLocation } from 'react-router-dom'
import {
    ProDescriptions,
    ProDescriptionsItemProps
} from '@ant-design/pro-components'
import {
    ICompanyList,
} from '@/api/type'
import dayjs from 'dayjs'
import { useFieldProps } from '@/hooks/useFieldProps'

interface IProps {
    children?: ReactNode
}

const CompanyDetail: FC<IProps> = (_props) => {
    const {
        dateFormat,
    } = useFieldProps();
    const { Paragraph, Title } = Typography;

    const location = useLocation();
    const companyId = getLocationParamsByName(location, ROUTE_PARAM_NAME.COMPANY_ID);

    // 描述列表column
    const descColumn: ProDescriptionsItemProps<ICompanyList>[] = [
        {
            title: null,
            key: 'companyName',
            dataIndex: 'companyName',
            span: 3,
            style: {
                padding: 0
            },
            render: (_, record) => {
                return (
                    <Title level={3}>{record.companyName}</Title>
                )
            }
        },
        {
            title: null,
            key: 'tags',
            dataIndex: 'tags',
            span: 3,
            render: (_, record) => {
                return record.tags.map((tag) => {
                    return <Tag
                        color='processing'
                        key={tag}
                        style={{ marginRight: 5 }}
                    >{tag}</Tag>
                })
            }
        },
        {
            title: null,
            key: 'companyIntroduction',
            dataIndex: 'companyIntroduction',
            span: 3,
            style: {
                padding: 0
            },
            render: (_, record) => {
                return (
                    <Typography.Paragraph
                        ellipsis={{
                            rows: 1,
                            expandable: 'collapsible',
                        }}
                    >
                        {record.companyIntroduction}
                    </Typography.Paragraph>
                )
            }
        },
        {
            title: '法定代表人',
            key: 'legalPersonName',
            dataIndex: 'legalPersonName',
        },
        {
            title: '统一社会信用代码',
            key: 'creditCode',
            dataIndex: 'creditCode',
        },
        {
            title: '工商注册号',
            key: 'businessLicenseNo',
            dataIndex: 'businessLicenseNo',
        },
        {
            title: '成立日期',
            key: 'registerTime',
            dataIndex: 'registerTime',
            valueType: 'date',
            fieldProps: {
                format: dateFormat,
            },
        },
        {
            title: '企业经营状态',
            key: 'status',
            dataIndex: 'status',
            valueType: 'select',
            valueEnum: COMPANY_STATUS
        },
        {
            title: '企业类型',
            key: 'companyType',
            dataIndex: 'companyType',
            valueType: 'select',
            valueEnum: COMPANY_TYPE
        },
        {
            title: '组织机构代码',
            key: 'orgCode',
            dataIndex: 'orgCode',
        },
        {
            title: '注册资本',
            key: 'registeredCapital',
            dataIndex: 'registeredCapital',
            render: (_, record) => {
                return Math.round(record.registeredCapital / 10000) / 100 + '万元人民币'
            }
        },
        {
            title: '实缴资本',
            key: 'actualCapital',
            dataIndex: 'actualCapital',
            render: (_, record) => {
                return Math.round(record.actualCapital / 10000) / 100 + '万元人民币'
            }
        },
        {
            title: '员工人数',
            key: 'employeeNum',
            dataIndex: 'employeeNum',
        },
        {
            title: '参保人数',
            key: 'insuredNum',
            dataIndex: 'insuredNum',
        },
        {
            title: '所属行业',
            key: 'industry',
            dataIndex: 'industry',
            valueType: 'select',
            valueEnum: INDUSTRY
        },
        {
            title: '纳税人识别号',
            key: 'taxNo',
            dataIndex: 'taxNo',
        },
        {
            title: '纳税人资质',
            key: 'taxType',
            dataIndex: 'taxType',
            valueType: 'select',
            valueEnum: TAX_TYPE
        },
        {
            title: '经营期限',
            key: 'operateTerm',
            dataIndex: 'operateTerm',
            valueType: 'dateRange',
            render: (_, record) => {
                return dayjs(record.operateTermStart).format('YYYY-MM-DD') + ' 至 ' + (record.operateTermEnd ? dayjs(record.operateTermEnd).format('YYYY-MM-DD') : '无限期限')
            }
        },
        {
            title: '进出口企业代码',
            key: 'importExportCode',
            dataIndex: 'importExportCode',
        },
        {
            title: '海关注册编码',
            key: 'seaRegisterCode',
            dataIndex: 'seaRegisterCode',
        },
        {
            title: '核准日期',
            key: 'approvalDate',
            dataIndex: 'approvalDate',
            valueType: 'date',
            fieldProps: {
                format: dateFormat,
            },
        },
        {
            title: '登记机关',
            key: 'registerOffice',
            dataIndex: 'registerOffice',
        },
        {
            title: '曾用名',
            key: 'oldNames',
            dataIndex: 'oldNames',
            render: (_, record) => {
                return record.oldNames.join(`,\n`)
            },
        },
        {
            title: '英文名',
            key: 'englishName',
            dataIndex: 'englishName',
        },
        {
            title: '经营范围',
            key: 'businessScope',
            dataIndex: 'businessScope',
            valueType: 'select',
            valueEnum: BUSINESS_SCOPE
        },
    ]

    return (
        <>
            <ProDescriptions
                title={null}
                column={3}
                layout='vertical'
                request={async () => {
                    return Promise.resolve({
                        success: true,
                        data: {
                            id: 1,
                            companyNo: 'COM000000000001',
                            companyName: '测试企业5',
                            taxNo: '91310000MA00000000',
                            taxType: 1,
                            companyType: 1,
                            companyIntroduction: '简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介',
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
                        } as ICompanyList,
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

export default CompanyDetail
