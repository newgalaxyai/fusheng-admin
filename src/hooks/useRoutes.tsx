import { useAppDispatch, useAppSelector } from "./useAppStore";
import type { IRoute } from "@/redux/types/route";
import { tabsListAction, collapsedAction, activeKeyAction } from "@/redux/modules/route";
import { useNavigate, type RouteObject, Navigate, Outlet } from "react-router-dom";
import Lazy from "@/router/lazy";
import publicRoutes from "@/router";
import type { MenuProps } from "antd";
import Icon from "@ant-design/icons";
import type { GetProps } from "antd";
import { usePermissionCheck } from "./usePermission";
import LayoutComponent from "@/components/layout";
import AuthRouteComponent from "@/components/auth";
import { HomeOutlined } from "@ant-design/icons";
import { ROUTE_ELEMENT_PATH, ROUTE_KEY, ROUTE_NAME, ROUTE_PATH } from "@/utils/constants";

export type IBreadcrumb = {
  title: string
  key: string
}

type CustomIconComponentProps = GetProps<typeof Icon>;

interface LevelKeysProps {
  key?: string;
  children?: LevelKeysProps[];
}

export const useRoutesHook = () => {
  const { routes, tabsList, activeKey } = useAppSelector(state => state.route);
  const { hasRole } = usePermissionCheck();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const authRoutes = [
    // 首页
    {
      name: ROUTE_NAME.HOME,
      key: ROUTE_KEY.HOME,
      icon: HomeOutlined,
      parentKey: ROUTE_KEY.AUTH,
      order: 0,
      type: 2,
      hideInMenu: false,
      path: ROUTE_PATH.HOME,
      elementPath: ROUTE_ELEMENT_PATH.HOME
    },
    ...routes.filter(item => item.type !== 3 && hasRole(item.requiredRole)),
  ];

  // 跳转路由
  const navigateTo = (key: string, params?: any, state?: any) => {
    const route = authRoutes.find(item => item.key === key);
    if (route) {
      let path = getRoutePath(key, authRoutes.filter(item => item.key === key));
      if (params) {
        path = path + '?' + Object.entries(params).map(([key, value]) => `${key}=${value}`).join('&');
      }
      if (state) {
        navigate(path, {
          state
        });
      } else {
        navigate(path);
      }
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

  // 关闭左侧/右侧标签页
  const closeLeftOrRightTabs = (key: string, isLeft: boolean) => {
    const targetIndex = tabsList.findIndex(item => item.key === key);
    if (targetIndex === -1) {
      return;
    }
    if (!isLeft && targetIndex === tabsList.length - 1) {
      return;
    }
    const newTabsList = tabsList.filter((item, index) => {
      if (item.key === ROUTE_KEY.HOME) {
        return true;
      }
      if (isLeft) {
        return index >= targetIndex;
      } else {
        return index <= targetIndex;
      }
    });
    if (isLeft) {
      navigateTo(newTabsList[newTabsList.length - 1].key)
    } else {
      navigateTo(key)
    }
    dispatch(tabsListAction({ type: 'set', data: newTabsList }))
  }

  // 关闭其他标签页
  const closeOtherTabs = (key: string) => {
    const targetIndex = tabsList.findIndex(item => item.key === key);
    if (targetIndex === -1) {
      return;
    }
    const newTabsList = tabsList.filter((item, index) => item.key === ROUTE_KEY.HOME || index === targetIndex);
    if (activeKey !== key) {
      navigateTo(key)
    }
    dispatch(tabsListAction({ type: 'set', data: newTabsList }))
  }

  // 关闭所有标签页
  const closeAllTabs = () => {
    const newTabsList = tabsList.filter(item => item.key === ROUTE_KEY.HOME);
    dispatch(tabsListAction({ type: 'set', data: newTabsList }))
    navigateTo(ROUTE_KEY.HOME)
  }

  // 折叠侧边栏
  const setCollapsed = (collapsed: boolean) => {
    dispatch(collapsedAction({ type: 'set', data: collapsed }))
  }

  // 数组转路由
  const getRoutes = (routes: IRoute[], parentKey: string, parentType: number, result: RouteObject[]) => {
    for (const route of routes) {
      if (route.parentKey === parentKey) {
        if (route.type === 2) {
          result.push({
            // id: route.key,
            path: parentType === 2 ? route.path : getRoutePath(route.key, authRoutes, ''),
            element: Lazy(() => import(/* @vite-ignore */ route.elementPath!)),
            children: getRoutes(routes, route.key, route.type, []),
          })
        } else {
          getRoutes(routes, route.key, route.type, result)
        }
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

  // 获取菜单的层级
  const getLevelKeys = (items1: LevelKeysProps[]) => {
    const key: Record<string, number> = {};
    const func = (items2: LevelKeysProps[], level = 1) => {
      items2.forEach((item) => {
        if (item.key) {
          key[item.key] = level;
        }
        if (item.children) {
          func(item.children, level + 1);
        }
      });
    };
    func(items1);
    return key;
  };

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
    if (route) {
      if (keyList.length === 1) {
        result = route;
      } else {
        result = getCurrentRoute(keyList.slice(1), authRoutes.filter(item => item.parentKey === route.key), route);
      }
    }
    if (result?.type !== 2) {
      return null;
    }
    return result;
  }

  // 获取指定key的路由地址
  const getRoutePath = (key: string, realRoutes: IRoute[], result: string = '') => {
    const route = realRoutes.find(item => item.key === key);
    if (route) {
      if (route.parentKey !== '') {
        result = getRoutePath(route.parentKey, authRoutes.filter(item => item.key === route.parentKey), '/' + route.key + result);
      } else {
        result = '/' + route.key + result;
      }
    }
    return result;
  }

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
        children: getRoutes(authRoutes, 'auth', -1, [])
      }
    ],
    getMenuItems: getMenuItems(authRoutes, 'auth', []),
    getLevelKeys,
    addTab,
    removeTab,
    getBreadcrumb,
    navigateTo,
    setCollapsed,
    getCurrentRoute,
    getRoutePath,
    authRoutes,
    closeLeftOrRightTabs,
    closeOtherTabs,
    closeAllTabs,
  };
}