import React, { useEffect, useMemo, useState } from 'react';
import type { MenuProps } from 'antd';
import { Breadcrumb, ConfigProvider, Layout, Menu, Tabs, theme, Button, Avatar, Dropdown } from 'antd';
import { useAppSelector } from '@/hooks/useAppStore';
import { useRoutesHook } from '@/hooks/useRoutes';
import { Outlet } from 'react-router-dom';
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';
// 右上角用户信息
import LayoutUser from './layoutUser';
import { ITabsItem } from '@/redux/types/route';
import { ROUTE_KEY } from '@/utils/constants';

// 卡片标签类型
type TargetKey = React.MouseEvent | React.KeyboardEvent | string;

const { Header, Content, Sider } = Layout;

const LayoutComponent: React.FC = () => {
    const {
        getMenuItems,
        getBreadcrumb,
        removeTab,
        navigateTo,
        setCollapsed,
        authRoutes,
        closeLeftOrRightTabs,
        closeOtherTabs,
        closeAllTabs,
        getLevelKeys,
        getRoutePath
    } = useRoutesHook();
    const { tabsList, activeKey, collapsed } = useAppSelector(state => state.route);
    // 标签页下拉菜单项
    const tabMenuItems = (tabItem: ITabsItem): MenuProps['items'] => tabItem.key === ROUTE_KEY.HOME ? [] : [
        {
            key: 'closeCurrent',
            label: '关闭当前页面',
            onClick: (e) => {
                e.domEvent.stopPropagation();
                removeTab(tabItem.key);
            }
        },
        {
            type: 'divider',
        },
        {
            key: 'closeLeft',
            label: '关闭左侧页面',
            onClick: (e) => {
                e.domEvent.stopPropagation();
                closeLeftOrRightTabs(tabItem.key, true);
            }
        },
        {
            key: 'closeRight',
            label: '关闭右侧页面',
            onClick: (e) => {
                e.domEvent.stopPropagation();
                closeLeftOrRightTabs(tabItem.key, false);
            }
        },
        {
            type: 'divider',
        },
        {
            key: 'closeOther',
            label: '关闭其他页面',
            onClick: (e) => {
                e.domEvent.stopPropagation();
                closeOtherTabs(tabItem.key);
            }
        },
        {
            key: 'closeAll',
            label: '全部关闭',
            onClick: (e) => {
                e.domEvent.stopPropagation();
                closeAllTabs();
            }
        },
    ]
    // 渲染标签页
    const renderTabs = tabsList.map((tabItem) => {
        return {
            ...tabItem,
            label: (
                <Dropdown
                    menu={{ items: tabMenuItems(tabItem) }}
                    trigger={['contextMenu']}
                >
                    {tabItem.label}
                </Dropdown>
            )
        }
    })

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
    const levelKeys = getLevelKeys(menuItems as any)
    // 展开当前父级菜单
    const [stateOpenKeys, setStateOpenKeys] = useState<string[]>([]);
    useEffect(() => {
        if (activeKey !== ROUTE_KEY.HOME) {
            const routePath = getRoutePath(activeKey, authRoutes, '')
            const openKeys = routePath.split('/').slice(1)
            setStateOpenKeys(openKeys)
        }
    }, [activeKey])
    const onOpenChange: MenuProps['onOpenChange'] = (openKeys) => {
        // console.log('openKeys', openKeys);
        const currentOpenKey = openKeys.find((key) => stateOpenKeys.indexOf(key) === -1);
        // open
        if (currentOpenKey !== undefined) {
            const repeatIndex = openKeys
                .filter((key) => key !== currentOpenKey)
                .findIndex((key) => levelKeys[key] === levelKeys[currentOpenKey]);

            setStateOpenKeys(
                openKeys
                    // remove repeat key
                    .filter((_, index) => index !== repeatIndex)
                    // remove current level all child
                    .filter((key) => levelKeys[key] <= levelKeys[currentOpenKey]),
            );
        } else {
            // close
            setStateOpenKeys(openKeys);
        }
    };
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
                    openKeys={stateOpenKeys}
                    onOpenChange={onOpenChange}
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
                                style={{
                                    background: colorBgContainer,
                                    padding: 0,
                                }}
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
                                <LayoutUser />
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
                                                items={renderTabs as any}
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