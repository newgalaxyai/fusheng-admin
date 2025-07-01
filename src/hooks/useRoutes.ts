import { useAppDispatch, useAppSelector } from "./useAppStore";
import type { IRoute } from "@/redux/types/route";
import { activeKeyAction, tabsListAction } from "@/redux/modules/route";
import { useNavigate, type RouteObject } from "react-router-dom";
import Lazy from "@/router/lazy";
import originalRoutes from "@/router";
import type { MenuProps } from "antd";

export type IBreadcrumb = {
  title: string
  key: string
}

export const useRoutesHook = () => {
  const { routes } = useAppSelector(state => state.route);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  // 添加标签页
  const addTab = (route: IRoute) => {
    dispatch(tabsListAction({ type: 'add', data: route }))
  }

  // 删除标签页
  const removeTab = (key: string) => {
    dispatch(tabsListAction({ type: 'remove', data: key }))
  }

  // 跳转路由
  const navigateTo = (key: string) => {
    const route = routes.find(item => item.key === key);
    if (route) {
      navigate(route.routePath);
    }
  }

  // 一维数组转多维路由
  const getRoutes = (routes: IRoute[], parentKey: string, result: RouteObject[]) => {
    for (const route of routes) {
      if (route.parentKey === parentKey) {
        result.push({
          path: route.parentKey === '' ? '/' + route.key : route.key,
          element: route.elementPath !== '' ? Lazy(() => {
            // 将路径别名 @ 转换为相对路径
            const importPath = route.elementPath.replace('@/', '../');
            return import(/* @vite-ignore */ importPath);
          }) : null,
          children: getRoutes(routes, route.key, []),
        });
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
            icon: route.icon,
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

  return {
    getRoutes: [
      ...originalRoutes,
      ...getRoutes(routes, '', [])
    ],
    getMenuItems: getMenuItems(routes, '', []),
    addTab,
    removeTab,
    getBreadcrumb,
    navigateTo,
  };
}