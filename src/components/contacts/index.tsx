import React, { memo, useState, useRef } from 'react'
import type { FC, ReactNode } from 'react'
import { Modal, Avatar, Card, Tabs, Row, Col } from 'antd'
import CopyComponent from '../copy'
import './index.scss'
import equal from 'fast-deep-equal'

interface IProps {
    children?: ReactNode
    companyID: number // 公司ID
    isModalOpen: boolean
    handleCancel: () => void
}

const ContactsComponent: FC<IProps> = ({ companyID, isModalOpen, handleCancel }) => {
    const [activeKey, setActiveKey] = useState<string | undefined>('contact');
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
                    items={[
                        {
                            key: 'contact',
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

                    ]}
                    onChange={(value) => { setActiveKey(value) }}
                />
                <Row
                    gutter={[16, 16]}
                    style={{
                        marginTop: 16
                    }}
                >
                    <Col xs={24} sm={12} lg={8}>
                        <Card

                        >
                            <Card.Meta
                                avatar={<Avatar shape='square' src="https://api.dicebear.com/7.x/miniavs/svg?seed=1" />}
                                title={<CopyComponent copyText="19653536969" />}
                                description={
                                    <>
                                        <p>张三 董事长</p>
                                    </>
                                }
                            />
                        </Card>
                    </Col>
                    <Col xs={24} sm={12} lg={8}>
                        <Card

                        >
                            <Card.Meta
                                avatar={<Avatar shape='square' src="https://api.dicebear.com/7.x/miniavs/svg?seed=1" />}
                                title={<CopyComponent copyText="19653536969" />}
                                description={
                                    <>
                                        <p>张三 董事长</p>
                                    </>
                                }
                            />
                        </Card>
                    </Col>
                </Row>
            </Modal>
        </>
    )
}

export default memo(ContactsComponent, (prevProps, nextProps) => {
    if (prevProps.companyID !== nextProps.companyID) {
        return false
    }
    if (prevProps.isModalOpen !== nextProps.isModalOpen) {
        return false
    }
    if (!equal(prevProps.handleCancel, nextProps.handleCancel)) {
        return false
    }
    return true
})
