import { useAppDispatch, useAppSelector } from "./useAppStore";
import type { IRoute } from "@/redux/types/route";
import { tabsListAction, collapsedAction } from "@/redux/modules/route";
import { useNavigate, type RouteObject, Navigate } from "react-router-dom";
import Lazy from "@/router/lazy";
import publicRoutes from "@/router";
import type { MenuProps } from "antd";
import Icon from "@ant-design/icons";
import type { GetProps } from "antd";
import { usePermissionCheck } from "./usePermission";
import LayoutComponent from "@/components/layout";
import AuthRouteComponent from "@/components/auth";
import { HomeOutlined } from "@ant-design/icons";

export type IBreadcrumb = {
  title: string
  key: string
}

type CustomIconComponentProps = GetProps<typeof Icon>;

export const useRoutesHook = () => {
  const { routes, tabsList, activeKey } = useAppSelector(state => state.route);
  const { hasRole } = usePermissionCheck();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const authRoutes = [
    // 首页
    {
      name: '首页',
      key: 'home',
      icon: HomeOutlined,
      parentKey: 'auth',
      order: 0,
      type: 2,
      hideInMenu: false,
      path: '/home',
      element: Lazy(() => import('@/views/Home'))
    },
    ...routes.filter(item => item.type !== 3 && hasRole(item.requiredRole)),
  ];

  // 跳转路由
  const navigateTo = (key: string) => {
    const route = authRoutes.find(item => item.key === key);
    if (route) {
      const path = getRoutePath(key, authRoutes.filter(item => item.key === key));
      navigate(path);
    }
  }
  // 添加标签页
  const addTab = (route: IRoute) => {
    dispatch(tabsListAction({ type: 'add', data: route }))
  }

  // 删除标签页
  const removeTab = (key: string) => {
    const targetIndex = tabsList.findIndex(item => item.key === key);
    const newTabsList = tabsList.filter(item => item.key !== key);
    // 如果移除的标签是当前激活的标签，则切换到上一个标签
    if (newTabsList.length && key === activeKey) {
      const { key } = newTabsList[targetIndex === newTabsList.length ? targetIndex - 1 : targetIndex]
      navigateTo(key)
    }
    dispatch(tabsListAction({ type: 'set', data: newTabsList }))
  }

  // 折叠侧边栏
  const setCollapsed = (collapsed: boolean) => {
    dispatch(collapsedAction({ type: 'set', data: collapsed }))
  }

  // 数组转路由
  const getRoutes = (routes: IRoute[], parentKey: string, result: RouteObject[]) => {
    for (const route of routes) {
      if (route.parentKey === parentKey) {
        result.push({
          // id: route.key,
          path: route.path,
          element: route.elementPath ? Lazy(() => {
            const importPath = route.elementPath?.replace('@/', '../') || '';
            return import(/* @vite-ignore */ importPath)
          }) : route.redirect ? <Navigate to={route.redirect} /> : null,
          children: getRoutes(routes, route.key, []),
        })
      }
    }
    return result;
  }
  // 一维数组转多维菜单
  const getMenuItems = (routes: IRoute[], parentKey: string, result: MenuProps['items'] = []) => {
    for (const route of routes) {
      if (route.parentKey === parentKey) {
        if (!route.hideInMenu) {
          result.push({
            key: route.key,
            label: route.name,
            icon: route.icon ? <Icon component={route.icon as CustomIconComponentProps['component']} /> : null,
            children: getMenuItems(routes, route.key, []).length === 0 ? undefined : getMenuItems(routes, route.key, []),
          });
        }
      }
    }
    return result;
  }

  // 获取面包屑数据
  const getBreadcrumb = (routes: IRoute[], currentKey: string, result: IBreadcrumb[]) => {
    if (currentKey === '') {
      return result;
    }
    for (const route of routes) {
      if (route.key === currentKey) {
        result.unshift({
          title: route.name!,
          key: route.key,
        })
        getBreadcrumb(routes, route.parentKey, result)
        break;
      }
    }
    return result;
  }

  // 获取当前地址的路由
  const getCurrentRoute = (keyList: string[], realRoutes: IRoute[], result: IRoute | null): IRoute | null => {
    const route = realRoutes.find(item => item.key === keyList[0]);
    // console.log('route', route);
    if (route) {
      if (keyList.length === 1) {
        result = route;
      } else {
        result = getCurrentRoute(keyList.slice(1), routes.filter(item => item.parentKey === route.key), route);
      }
    }
    if (result?.type !== 2) {
      return null;
    }
    return result;
  }

  // 获取制定key的路由地址
  const getRoutePath = (key: string, realRoutes: IRoute[], result: string = '') => {
    const route = realRoutes.find(item => item.key === key);
    if (route) {
      if (route.parentKey !== '') {
        result = getRoutePath(route.parentKey, routes.filter(item => item.key === route.parentKey), '/' + route.key + result);
      } else {
        result = '/' + route.key + result;
      }
    }
    return result;
  }

  // console.log('getRoutes', getRoutes(routes.filter(item => item.type !== 3 && hasRole(item.requiredRole)), '', []));

  return {
    getRoutes: [
      ...publicRoutes,
      {
        key: 'auth',
        parentKey: '',
        order: -1,
        type: -1,
        path: '',
        hideInMenu: true,
        element: <AuthRouteComponent requiresAuth={true}>
          <LayoutComponent />
        </AuthRouteComponent>,
        children: [
          ...getRoutes(authRoutes, 'auth', []),
        ]
      }
    ],
    getMenuItems: getMenuItems(authRoutes, 'auth', []),
    addTab,
    removeTab,
    getBreadcrumb,
    navigateTo,
    setCollapsed,
    getCurrentRoute,
    getRoutePath,
    authRoutes,
  };
}