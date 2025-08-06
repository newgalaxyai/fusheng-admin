import React, { useState, useRef } from 'react'
import type { FC, ReactNode } from 'react'
import { Tag, Typography, Space, Button } from 'antd'
import { ROUTE_PARAM_NAME } from '@/constants'
import { getLocationParamsByName } from '@/utils/location'
import { useLocation, useNavigate } from 'react-router-dom'
import {
    ProDescriptions,
    ProDescriptionsItemProps
} from '@ant-design/pro-components'
import type { ProDescriptionsActionType } from '@ant-design/pro-components';
import {
    ICompanyList,
    IConcatMsg,
} from '@/api/type'
import { getCompanyDetailAPI } from '@/api/company'
import DescLinkComponent from '@/components/desclink'
import ContactsComponent from '@/components/contacts'

interface IProps {
    children?: ReactNode
}

const CompanyDetail: FC<IProps> = (_props) => {
    const { Title } = Typography;

    const location = useLocation();
    const navigate = useNavigate();
    const companyId = getLocationParamsByName(location, ROUTE_PARAM_NAME.COMPANY_ID);

    // 描述列表ref
    const actionRef = useRef<ProDescriptionsActionType>();
    // 企业名称
    const [companyName, setCompanyName] = useState<string>('');
    // 描述列表column
    const descColumn: ProDescriptionsItemProps<ICompanyList>[] = [
        {
            title: '主营产品标签',
            key: 'mainProductTags',
            dataIndex: 'mainProductTags',
            span: 3,
            render: (_, record) => {
                if (!record.mainProductTags) {
                    return '-';
                }
                return record.mainProductTags.split(';').map((tag) => {
                    return <Tag
                        color='processing'
                        key={tag}
                        style={{ marginRight: 5 }}
                    >{tag}</Tag>
                })
            }
        },
        {
            title: '行业赛道标签',
            key: 'industryTags',
            dataIndex: 'industryTags',
            span: 3,
            render: (_, record) => {
                if (!record.industryTags) {
                    return '-';
                }
                return record.industryTags.split(';').map((tag) => {
                    return <Tag
                        color='success'
                        key={tag}
                        style={{ marginRight: 5 }}
                    >{tag}</Tag>
                })
            }
        },
        {
            title: '企业简介',
            key: 'abstractsBaseInfo',
            dataIndex: 'abstractsBaseInfo',
            span: 3,
            render: (_, record) => {
                if (!record.abstractsBaseInfo) {
                    return '-';
                }
                return (
                    <Typography.Paragraph
                        ellipsis={{
                            rows: 1,
                            expandable: 'collapsible',
                        }}
                    >
                        {record.abstractsBaseInfo}
                    </Typography.Paragraph>
                )
            }
        },

        {
            title: '经营范围',
            key: 'businessScope',
            dataIndex: 'businessScope',
            span: 3,
            render: (_, record) => {
                if (!record.businessScope) {
                    return '-';
                }
                return (
                    <Typography.Paragraph
                        ellipsis={{
                            rows: 1,
                            expandable: 'collapsible',
                        }}
                    >
                        {record.businessScope}
                    </Typography.Paragraph>
                )
            }
        },
        {
            title: '登记状态',
            key: 'regStatus',
            dataIndex: 'regStatus',
            render: (_, record) => {
                if (!record.regStatus) {
                    return '-';
                }
                return <Tag
                    color='#108ee9'
                    key={record.regStatus}
                >{record.regStatus}</Tag>
            }
        },
        {
            title: '统一社会信用代码',
            key: 'creditCode',
            dataIndex: 'creditCode',
            copyable: true,
        },
        {
            title: '法定代表人',
            key: 'legalPerson',
            dataIndex: 'legalPerson',
        },
        {
            title: '成立日期',
            key: 'establishTime',
            dataIndex: 'establishTime',
        },
        {
            title: '注册资本',
            key: 'regCapital',
            dataIndex: 'regCapital',
        },
        {
            title: '实缴资本',
            key: 'paidInCapital',
            dataIndex: 'paidInCapital',
        },
        {
            title: '核准日期',
            key: 'approvedDate',
            dataIndex: 'approvedDate',
        },
        {
            title: '营业期限',
            key: 'businessTerm',
            dataIndex: 'businessTerm',
        },
        {
            title: '企业地址',
            key: 'regLocation',
            dataIndex: 'regLocation',
        },
        {
            title: '纳税人识别号',
            key: 'taxpayerId',
            dataIndex: 'taxpayerId',
            copyable: true,
        },
        {
            title: '注册号',
            key: 'regNumber',
            dataIndex: 'regNumber',
            copyable: true,
        },
        {
            title: '组织机构代码',
            key: 'orgNumber',
            dataIndex: 'orgNumber',
            copyable: true,
        },
        {
            title: '参保人数',
            key: 'socialSecurityStaffNum',
            dataIndex: 'socialSecurityStaffNum',
        },
        {
            title: '参保人数所属年报',
            key: 'staffNumReportYear',
            dataIndex: 'staffNumReportYear',
        },
        {
            title: '企业(机构)类型',
            key: 'orgType',
            dataIndex: 'orgType',
        },
        {
            title: '国行一级分类',
            key: 'categoryNameLv1',
            dataIndex: 'categoryNameLv1',
        },
        {
            title: '国行二级分类',
            key: 'categoryNameLv2',
            dataIndex: 'categoryNameLv2',
        },
        {
            title: '国行三级分类',
            key: 'categoryNameLv3',
            dataIndex: 'categoryNameLv3',
        },
        {
            title: '最新年报年份',
            key: 'latestAnnualReport',
            dataIndex: 'latestAnnualReport',
        },
        {
            title: '曾用名',
            key: 'historyNames',
            dataIndex: 'historyNames',
        },
        {
            title: '英文名',
            key: 'englishName',
            dataIndex: 'englishName',
        },
        // {
        //     title: '官网',
        //     key: 'websites',
        //     dataIndex: 'websites',
        //     copyable: true,
        //     render: (_, record) => {
        //         return record.websites && record.websites !== '-' ?
        //             <a
        //                 href={record.websites}
        //                 target="_blank"
        //             >{record.websites}</a>
        //             : '-';
        //     },
        // },
        {
            title: '专利数量',
            key: 'patentCount',
            dataIndex: 'patentCount',
            render: (_, record) => {
                return (
                    record.patentCountLink ?
                        (
                            <DescLinkComponent
                                descText={record.patentCount}
                                linkText={record.patentCountLink}
                            />
                        ) : record.patentCount
                )
            },
        },
        // {
        //     title: '专利数量超链接',
        //     key: 'patentCountLink',
        //     dataIndex: 'patentCountLink',
        //     render: (_, record) => (
        //         <a href={record.patentCountLink} target="_blank" rel="noopener noreferrer">
        //             {record.patentCountLink}
        //         </a>
        //     ),
        // },
        {
            title: '发明专利数量',
            key: 'inventionPatentCount',
            dataIndex: 'inventionPatentCount',
        },
        {
            title: '实用新型专利数量',
            key: 'utilityModelPatentCount',
            dataIndex: 'utilityModelPatentCount',
        },
        {
            title: '外观设计专利数量',
            key: 'designPatentCount',
            dataIndex: 'designPatentCount',
        },
        {
            title: '商标数量',
            key: 'trademarkCount',
            dataIndex: 'trademarkCount',
            render: (_, record) => {
                return (
                    record.trademarkCountLink ?
                        (
                            <DescLinkComponent
                                descText={record.trademarkCount}
                                linkText={record.trademarkCountLink}
                            />
                        ) : record.trademarkCount
                )
            },
        },
        // {
        //     title: '商标数量超链接',
        //     key: 'trademarkCountLink',
        //     dataIndex: 'trademarkCountLink',
        //     render: (_, record) => (
        //         <a href={record.trademarkCountLink} target="_blank" rel="noopener noreferrer">
        //             {record.trademarkCountLink}
        //         </a>
        //     ),
        // },
        {
            title: '作品著作权数量',
            key: 'copyrightCount',
            dataIndex: 'copyrightCount',
            render: (_, record) => {
                return (
                    record.copyrightCountLink ?
                        (
                            <DescLinkComponent
                                descText={record.copyrightCount}
                                linkText={record.copyrightCountLink}
                            />
                        ) : record.copyrightCount
                )
            },
        },
        // {
        //     title: '作品著作权数量超链接',
        //     key: 'copyrightCountLink',
        //     dataIndex: 'copyrightCountLink',
        //     render: (_, record) => (
        //         <a href={record.copyrightCountLink} target="_blank" rel="noopener noreferrer">
        //             {record.copyrightCountLink}
        //         </a>
        //     ),
        // },
        {
            title: '软件著作权数量',
            key: 'softwareCopyrightCount',
            dataIndex: 'softwareCopyrightCount',
            render: (_, record) => {
                return (
                    record.softwareCopyrightCountLink ?
                        (
                            <DescLinkComponent
                                descText={record.softwareCopyrightCount}
                                linkText={record.softwareCopyrightCountLink}
                            />
                        ) : record.softwareCopyrightCount
                )
            },
        },
        // {
        //     title: '软件著作权数量超链接',
        //     key: 'softwareCopyrightCountLink',
        //     dataIndex: 'softwareCopyrightCountLink',
        //     render: (_, record) => (
        //         <a href={record.softwareCopyrightCountLink} target="_blank" rel="noopener noreferrer">
        //             {record.softwareCopyrightCountLink}
        //         </a>
        //     ),
        // },
        {
            title: '获补贴数量',
            key: 'subsidyCount',
            dataIndex: 'subsidyCount',
            render: (_, record) => {
                return (
                    record.subsidyCountLink ?
                        (
                            <DescLinkComponent
                                descText={record.subsidyCount}
                                linkText={record.subsidyCountLink}
                            />
                        ) : record.subsidyCount
                )
            },
        },
        // {
        //     title: '获补贴数量超链接',
        //     key: 'subsidyCountLink',
        //     dataIndex: 'subsidyCountLink',
        //     render: (_, record) => (
        //         <a href={record.subsidyCountLink} target="_blank" rel="noopener noreferrer">
        //             {record.subsidyCountLink}
        //         </a>
        //     ),
        // },
        {
            title: '补贴金额',
            key: 'subsidyAmount',
            dataIndex: 'subsidyAmount',
        },
        {
            title: '荣誉资质',
            key: 'honorQualifications',
            dataIndex: 'honorQualifications',
        },
        {
            title: '中标项目',
            key: 'biddingProjects',
            dataIndex: 'biddingProjects',
            render: (_, record) => {
                return (
                    record.biddingProjectsLink ?
                        (
                            <DescLinkComponent
                                descText={record.biddingProjects}
                                linkText={record.biddingProjectsLink}
                            />
                        ) : record.biddingProjects
                )
            },
        },
        // {
        //     title: '中标项目超链接',
        //     key: 'biddingProjectsLink',
        //     dataIndex: 'biddingProjectsLink',
        //     render: (_, record) => (
        //         <a href={record.biddingProjectsLink} target="_blank" rel="noopener noreferrer">
        //             {record.subsidyCountLink}
        //         </a>
        //     ),
        // },
        {
            title: '裁判文书',
            key: 'judicialDocuments',
            dataIndex: 'judicialDocuments',
            render: (_, record) => {
                return (
                    record.judicialDocumentsLink ?
                        (
                            <DescLinkComponent
                                descText={record.judicialDocuments}
                                linkText={record.judicialDocumentsLink}
                            />
                        ) : record.judicialDocuments
                )
            },
        },
        // {
        //     title: '裁判文书超链接',
        //     key: 'judicialDocumentsLink',
        //     dataIndex: 'judicialDocumentsLink',
        //     render: (_, record) => (
        //         <a href={record.judicialDocumentsLink} target="_blank" rel="noopener noreferrer">
        //             {record.judicialDocumentsLink}
        //         </a>
        //     ),
        // },
        {
            title: '失信被执行人',
            key: 'dishonestPersons',
            dataIndex: 'dishonestPersons',
            render: (_, record) => {
                return (
                    record.dishonestPersLink ?
                        (
                            <DescLinkComponent
                                descText={record.dishonestPersons}
                                linkText={record.dishonestPersLink}
                            />
                        ) : record.dishonestPersons
                )
            },
        },
        // {
        //     title: '失信被执行人超链接',
        //     key: 'dishonestPersLink',
        //     dataIndex: 'dishonestPersLink',
        //     render: (_, record) => (
        //         <a href={record.dishonestPersLink} target="_blank" rel="noopener noreferrer">
        //             {record.dishonestPersLink}
        //         </a>
        //     ),
        // },
        {
            title: '被执行人',
            key: 'executedPersons',
            dataIndex: 'executedPersons',
            render: (_, record) => {
                return (
                    record.executedPersonsLink ?
                        (
                            <DescLinkComponent
                                descText={record.executedPersons}
                                linkText={record.executedPersonsLink}
                            />
                        ) : record.executedPersons
                )
            },
        },
        // {
        //     title: '被执行人超链接',
        //     key: 'executedPersonsLink',
        //     dataIndex: 'executedPersonsLink',
        //     render: (_, record) => (
        //         <a href={record.executedPersonsLink} target="_blank" rel="noopener noreferrer">
        //             {record.executedPersonsLink}
        //         </a>
        //     ),
        // },
        {
            title: '限制高消费',
            key: 'highConsumptionRestrictions',
            dataIndex: 'highConsumptionRestrictions',
            render: (_, record) => {
                return (
                    record.highConsumptionRestrictionsLink ?
                        (
                            <DescLinkComponent
                                descText={record.highConsumptionRestrictions}
                                linkText={record.highConsumptionRestrictionsLink}
                            />
                        ) : record.highConsumptionRestrictions
                )
            },
        },
        // {
        //     title: '限制高消费超链接',
        //     key: 'highConsumptionRestrictionsLink',
        //     dataIndex: 'highConsumptionRestrictionsLink',
        //     render: (_, record) => (
        //         <a href={record.highConsumptionRestrictionsLink} target="_blank" rel="noopener noreferrer">
        //             {record.highConsumptionRestrictionsLink}
        //         </a>
        //     ),
        // },
        {
            title: '行政处罚',
            key: 'administrativePenalties',
            dataIndex: 'administrativePenalties',
            render: (_, record) => {
                return (
                    record.administrativePenaltiesLink ?
                        (
                            <DescLinkComponent
                                descText={record.administrativePenalties}
                                linkText={record.administrativePenaltiesLink}
                            />
                        ) : record.administrativePenalties
                )
            },
        },
        // {
        //     title: '行政处罚超链接',
        //     key: 'administrativePenaltiesLink',
        //     dataIndex: 'administrativePenaltiesLink',
        //     render: (_, record) => (
        //         <a href={record.administrativePenaltiesLink} target="_blank" rel="noopener noreferrer">
        //             {record.administrativePenaltiesLink}
        //         </a>
        //     ),
        // },
        {
            title: '操作',
            valueType: 'option',
            render: (_dom, _record, _, action) => {
                const optList = [
                    <Button
                        key="refresh"
                        type='primary'
                        size='small'
                        onClick={() => {
                            action?.reload();
                        }}
                    >
                        刷新
                    </Button>,
                    <Button
                        key="refresh"
                        type='default'
                        size='small'
                        onClick={() => {
                            navigate(-1)
                        }}
                    >
                        返回
                    </Button>
                ]
                return optList
            }
        },
    ]

    // 公司官网
    const [companyWebsite, setCompanyWebsite] = useState('');
    // 联系人弹窗
    const [isContactsModalOpen, setIsContactsModalOpen] = useState(false);
    // 联系人弹窗标题
    const [concatMsg, setConcatMsg] = useState<IConcatMsg[]>([]);

    return (
        <>
            <ProDescriptions
                title={
                    companyName ? <Title level={3}>{companyName}</Title> : null
                }
                column={3}
                layout='vertical'
                request={async () => {
                    // 详情接口
                    const res = await getCompanyDetailAPI({
                        id: Number(companyId)
                    })
                    if (res.success) {
                        if (res.data.websites && res.data.websites !== '-') {
                            setCompanyWebsite(res.data.websites);
                        }
                        setCompanyName(res.data.name);
                        setConcatMsg(res.data.concatMsg);
                        return Promise.resolve({
                            success: true,
                            data: res.data,
                        });
                    }
                    return Promise.reject({
                        success: false,
                        data: null,
                    });
                }}
                emptyText={'-'}
                columns={descColumn}
            />
            <div
                style={{
                    marginTop: 20,
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <Space>
                    <Button
                        type="primary"
                        onClick={() => setIsContactsModalOpen(true)}
                        disabled={concatMsg.length === 0}
                    >联系人</Button>
                    <Button
                        type="primary"
                        href={companyWebsite}
                        target="_blank"
                        disabled={!companyWebsite}
                    >官网</Button>
                </Space>
            </div>
            <ContactsComponent
                isModalOpen={isContactsModalOpen}
                concatMsg={concatMsg}
                handleCancel={() => setIsContactsModalOpen(false)}
            />
        </>
    )
}

export default CompanyDetail
