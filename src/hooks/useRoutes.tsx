import { useAppDispatch, useAppSelector } from "./useAppStore";
import type { IRoute } from "@/redux/types/route";
import { tabsListAction, collapsedAction, activeKeyAction, isLoginAction, isNotFoundAction } from "@/redux/modules/route";
import { useNavigate, type RouteObject, Outlet, useLocation } from "react-router-dom";
import Lazy from "@/router/lazy";
import originalRoutes from "@/router";
import type { MenuProps } from "antd";
import Icon from "@ant-design/icons";
import type { GetProps } from "antd";
import { usePermissionCheck } from "./usePermission";

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
  const location = useLocation();

  // 跳转路由
  const navigateTo = (key: string) => {
    const route = routes.find(item => item.key === key);
    if (route) {
      const path = getRoutePath(key, routes.filter(item => item.key === key));
      navigate(path);
    }

    // 如果路由存在
    // if (route) {
    //   // 获取当前路径的列表
    //   const pathList = location.pathname.split('/');
    //   // 获取当前路径的key索引
    //   const keyIndex = pathList.findIndex(item => item === key);
    //   // 获取父级key
    //   const parentKey = route.parentKey;
    //   if (parentKey === '') {
    //     navigate('/' + key);
    //     return;
    //   }
    //   // 获取当前路径的父级key索引
    //   const parentKeyIndex = pathList.findIndex(item => item === route.parentKey);
    //   // 如果当前路径的key索引和父级key索引都为-1，则说明当前路径不存在，需要跳转
    //   if (keyIndex === -1 && parentKeyIndex === -1) {
    //     // 获取当前key的路径
    //     const path = getRoutePath(key, routes.filter(item => item.key === key));
    //     // 跳转
    //     navigate(path);
    //     return;
    //   } else 
    //   // 如果当前路径的key为-1，父级路径key不为-1，则跳转到当前路径
    //   if (keyIndex === -1 && parentKeyIndex !== -1) {
    //     // 直接跳转
    //     navigate(key);
    //     return;
    //   }

    //   // 如果当前路径在末尾，则跳转到父级路径
    // }
  }

  // 设置登录状态
  const setLoginStatus = (status: boolean) => {
    dispatch(isLoginAction({ type: 'set', data: status }))
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

  // 设置未找到页面
  const setIsNotFound = (isNotFound: boolean) => {
    dispatch(isNotFoundAction({ type: 'set', data: isNotFound }))
  }

  // 数组转路由
  const getRoutes = (routes: IRoute[], parentKey: string, result: RouteObject[]) => {
    for (const route of routes) {
      if (route.parentKey === parentKey) {
        result.push({
          // id: route.key,
          path: route.routePath,
          element: route.elementPath ? Lazy(() => {
            const importPath = route.elementPath?.replace('@/', '../') || '';
            return import(/* @vite-ignore */ importPath)
          }) : null,
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
          title: route.name,
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
    if (!result?.elementPath) {
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
      ...originalRoutes,
      ...getRoutes(routes.filter(item => item.type !== 3 && hasRole(item.requiredRole)), '', []),
    ],
    getMenuItems: getMenuItems(routes.filter(item => item.type !== 3 && hasRole(item.requiredRole)), '', []),
    addTab,
    removeTab,
    getBreadcrumb,
    navigateTo,
    setCollapsed,
    setLoginStatus,
    setIsNotFound,
    getCurrentRoute,
    getRoutePath,
  };
}