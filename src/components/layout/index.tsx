import React, { useEffect, useMemo } from 'react';
import type { MenuProps } from 'antd';
import { Breadcrumb, ConfigProvider, Layout, Menu, Tabs, theme } from 'antd';
import { useAppSelector } from '@/hooks/useAppStore';
import { useRoutesHook } from '@/hooks/useRoutes';
import { useRoutes } from 'react-router-dom';

// 卡片标签类型
type TargetKey = React.MouseEvent | React.KeyboardEvent | string;

const { Header, Content, Sider } = Layout;

const LayoutComponent: React.FC = () => {
    const { getMenuItems, getBreadcrumb, removeTab, getRoutes, navigateTo } = useRoutesHook();
    const { tabsList, activeKey,routes } = useAppSelector(state => state.route);
    // layout主题token
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    // 菜单列表
    const menuItems: MenuProps['items'] = useMemo(() => {
        return getMenuItems;
    }, []);
    // 编辑卡片标签
    const onEdit = (targetKey: TargetKey, action: 'add' | 'remove') => {
        if (action === 'remove') {
            removeTab(targetKey.toString());
        }
    };

    return (
        <Layout
            className='layout-component'
        >
            <Header style={{ display: 'flex', alignItems: 'center' }}>
                <div className="demo-logo" />
            </Header>
            <Layout>
                <Sider
                    breakpoint="lg"
                    collapsedWidth="0"
                    onBreakpoint={(broken) => {
                        console.log(broken);
                    }}
                    onCollapse={(collapsed, type) => {
                        console.log(collapsed, type);
                    }}
                    style={{ background: colorBgContainer }}
                >
                    <Menu
                        mode="inline"
                        selectedKeys={[activeKey]}
                        style={{ height: '100%', borderRight: 0 }}
                        items={menuItems}
                        onSelect={(e) => {
                            navigateTo(e.key);
                        }}
                    />
                </Sider>
                <Layout style={{ padding: '0 24px 24px' }}>
                    {
                        tabsList.length > 0 && (
                            <ConfigProvider
                                theme={{
                                    components: {
                                        Tabs: {
                                            horizontalMargin: '10px 0 0 0',
                                            cardBg: colorBgContainer,
                                        },
                                    },
                                }}
                            >
                                <Tabs
                                    hideAdd
                                    onChange={(key) => {
                                        navigateTo(key);
                                    }}
                                    activeKey={activeKey}
                                    type="editable-card"
                                    onEdit={onEdit}
                                    items={tabsList as any}
                                    size='small'
                                />
                            </ConfigProvider>
                        )
                    }
                    <Breadcrumb
                        items={getBreadcrumb(routes, activeKey, [])}
                        style={{ margin: '16px 0' }}
                    />
                    <Content
                        style={{
                            padding: 24,
                            margin: 0,
                            minHeight: 280,
                            background: colorBgContainer,
                            borderRadius: borderRadiusLG,
                        }}
                    >
                        {useRoutes(getRoutes)}
                    </Content>
                </Layout>
            </Layout>
        </Layout>
    );
};

export default LayoutComponent;