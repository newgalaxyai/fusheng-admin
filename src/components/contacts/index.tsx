import React, { memo, useState, useRef } from 'react'
import type { FC, ReactNode } from 'react'
import { Modal, Avatar, Card, Tabs, Row, Col, Empty } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import CopyComponent from '../copy'
import './index.scss'
import equal from 'fast-deep-equal'
import { IConcatMsg } from '@/api/type'

interface IProps {
    children?: ReactNode
    isModalOpen: boolean
    concatMsg: IConcatMsg[] // 联系人信息List
    handleCancel: () => void
}

const ContactsComponent: FC<IProps> = ({ isModalOpen, concatMsg, handleCancel }) => {
    const [activeKey, setActiveKey] = useState<string>('phone');
    // 标签页item
    const tabItems = [
        {
            key: 'phone',
            label: '业务人员',
        },
        {
            key: 'fixedPhone',
            label: '固定电话',
        },
        {
            key: 'email',
            label: '企业邮箱',
        },
        {
            key: 'wechat',
            label: '微信',
        },
        {
            key: 'qq',
            label: 'QQ',
        },
        {
            key: 'fax',
            label: '传真',
        },
    ]

    // 获取展示的联系方式
    const getContactList = (contact: IConcatMsg[]) => {
        switch (activeKey) {
            case 'phone':
                return contact.filter((item) => item.phone != null).map((item) => ({
                    ...item,
                    contact: item.phone,
                }))
            case 'email':
                return contact.filter((item) => item.email != null).map((item) => ({
                    ...item,
                    contact: item.email,
                }))
            default:
                return []
        }

    }


    return (
        <>
            <Modal
                title={null}
                open={isModalOpen}
                destroyOnHidden
                footer={null}
                width={{
                    xs: 265,
                    sm: 500,
                    md: 500,
                    lg: 750,
                    xl: 750,
                    xxl: 750,
                }}
                closable={true}
                onCancel={handleCancel}
            >
                <Tabs
                    defaultActiveKey={activeKey}
                    items={tabItems}
                    onChange={(value) => { setActiveKey(value) }}
                />
                <Row
                    gutter={[16, 16]}
                    style={{
                        marginTop: 16
                    }}
                >
                    {
                        getContactList(concatMsg).length > 0 ?
                            getContactList(concatMsg).map((concatMsgItem) => {
                                return (
                                    <Col xs={24} sm={12} lg={8} key={concatMsgItem.phone}>
                                        <Card
                                        >
                                            <Card.Meta
                                                avatar={<Avatar icon={<UserOutlined />} shape='square' src="" />}
                                                title={<CopyComponent copyText={concatMsgItem.contact} />}
                                                description={
                                                    <>
                                                        <p>{concatMsgItem.name} {concatMsgItem.position}</p>
                                                    </>
                                                }
                                            />
                                        </Card>
                                    </Col>
                                )
                            }) :
                            <div
                                style={{
                                    width: '100%',
                                    textAlign: 'center',
                                }}
                            >
                                <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                            </div>
                    }
                </Row>
            </Modal>
        </>
    )
}

export default memo(ContactsComponent, (prevProps, nextProps) => {
    if (prevProps.isModalOpen !== nextProps.isModalOpen) {
        return false
    }
    if (!equal(prevProps.concatMsg, nextProps.concatMsg)) {
        return false
    }
    if (!equal(prevProps.handleCancel, nextProps.handleCancel)) {
        return false
    }
    return true
})
