import { useAppDispatch, useAppSelector } from "./useAppStore";
import type { IRoute } from "@/redux/types/route";
import { tabsListAction, collapsedAction, activeKeyAction } from "@/redux/modules/route";
import { useNavigate, type RouteObject } from "react-router-dom";
import Lazy from "@/router/lazy";
import originalRoutes from "@/router";
import type { MenuProps } from "antd";
import Icon from "@ant-design/icons";
import type { GetProps } from "antd";

export type IBreadcrumb = {
  title: string
  key: string
}

type CustomIconComponentProps = GetProps<typeof Icon>;

export const useRoutesHook = () => {
  const { routes, tabsList, activeKey } = useAppSelector(state => state.route);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  // 跳转路由
  const navigateTo = (key: string) => {
    const route = routes.find(item => item.key === key);
    if (route) {
      navigate(route.routePath);
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
            icon: <Icon component={route.icon as CustomIconComponentProps['component']} />,
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
    setCollapsed,
  };
}