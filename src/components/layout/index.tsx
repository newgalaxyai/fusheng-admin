import React, { useEffect, useMemo } from 'react';
import type { MenuProps } from 'antd';
import { Breadcrumb, ConfigProvider, Layout, Menu, Tabs, theme, Button } from 'antd';
import { useAppSelector } from '@/hooks/useAppStore';
import { useRoutesHook } from '@/hooks/useRoutes';
import { Outlet } from 'react-router-dom';
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';

// 卡片标签类型
type TargetKey = React.MouseEvent | React.KeyboardEvent | string;

const { Header, Content, Sider } = Layout;

const LayoutComponent: React.FC = () => {
    const { getMenuItems, getBreadcrumb, removeTab, navigateTo, setCollapsed, authRoutes } = useRoutesHook();
    const { tabsList, activeKey, collapsed } = useAppSelector(state => state.route);
    // layout主题token
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    // 菜单列表
    const menuItems: MenuProps['items'] = useMemo(() => {
        const menuItems = getMenuItems;
        // console.log('menuItems', menuItems);
        return menuItems;
    }, []);
    // 编辑卡片标签
    const onEdit = (targetKey: TargetKey, action: 'add' | 'remove') => {
        if (action === 'remove') {
            removeTab(targetKey.toString());
        }
    };

    return (
        <Layout
            hasSider
            className='layout-component'
        // style={{
        //     // 首页设置最大高度
        //     maxHeight: activeKey !== 'home' ? '' : '100vh',
        // }}
        >
            {/* 侧边栏 */}
            <Sider
                // 首页显示侧边栏底部折叠按钮
                // trigger={activeKey !== 'home' && null}
                trigger={null}
                collapsible
                collapsed={collapsed}
                onCollapse={(value) => {
                    setCollapsed(value);
                }}
                className='layout-sider'
            >
                <div className="demo-logo-vertical" />
                {/* 菜单 */}
                <Menu
                    theme='dark'
                    mode="inline"
                    defaultSelectedKeys={[activeKey]}
                    selectedKeys={[activeKey]}
                    style={{ height: '100%', borderRight: 0 }}
                    items={menuItems}
                    onSelect={(e) => {
                        navigateTo(e.key);
                    }}
                />
            </Sider>
            <Layout>
                {/* 首页不显示头部 */}
                {
                    // activeKey !== 'home' && (
                    activeKey !== '' && (
                        <>
                            {/* 顶部 */}
                            <Header
                                className='layout-header'
                                style={{ background: colorBgContainer, padding: 0 }}
                            >
                                <Button
                                    type="text"
                                    icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                                    onClick={() => setCollapsed(!collapsed)}
                                    style={{
                                        fontSize: '16px',
                                        width: 64,
                                        height: 64,
                                    }}
                                />
                            </Header>
                            <div
                                className='layout-tabs'
                            >
                                {/* 卡片标签 */}
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
                                                    // console.log('key', key);
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
                                {/* 面包屑 */}
                                <Breadcrumb
                                    items={getBreadcrumb(authRoutes, activeKey, [])}
                                    style={{ margin: '16px 0' }}
                                />
                            </div>
                        </>
                    )
                }
                {/* 内容区域 */}
                <Layout
                    style={{
                        // 首页四周都显示padding
                        // padding: activeKey !== 'home' ? '0 24px 24px' : '24px'
                        padding: '0 24px 24px'
                    }}
                >
                    <Content
                        className='layout-content'
                        style={{
                            // 首页内容区域添加滚动条
                            // overflow: activeKey !== 'home' ? 'initial' : 'auto',
                            overflow: 'initial',
                            padding: 10,
                            background: colorBgContainer,
                            borderRadius: borderRadiusLG,
                        }}
                    >
                        <Outlet />
                    </Content>
                </Layout>
            </Layout>
        </Layout>
    );
};

export default LayoutComponent;