import { useAppSelector } from "./useAppStore";
import type { IRoute } from "@/redux/types/route";
import type { RouteObject } from "react-router-dom";
import Lazy from "@/router/lazy";
import publicRoutes from "@/router";
import { usePermissionCheck } from "./usePermission";
import LayoutComponent from "@/components/layout";
import AuthRouteComponent from "@/components/auth";
import { ROUTE_ELEMENT_PATH, ROUTE_KEY, ROUTE_NAME, ROUTE_PATH } from "@/utils/constants";
import { useMemo } from "react";

export type IBreadcrumb = {
  title: string
  key: string
}

export const useRoutesHook = () => {
  const {
    route: {
      routes
    },
    user: {
      userRole
    }
  } = useAppSelector(state => state);
  const { hasRole } = usePermissionCheck();
  const authRoutes = useMemo(() => {
    return [
      // 首页
      {
        name: ROUTE_NAME.HOME,
        key: ROUTE_KEY.HOME,
        parentKey: ROUTE_KEY.AUTH,
        order: 0,
        type: 2,
        hideInMenu: false,
        path: ROUTE_PATH.HOME,
        elementPath: ROUTE_ELEMENT_PATH.HOME
      },
      ...routes.filter(item => item.type !== 3 && hasRole(item.requiredRole)),
    ]
  }, [routes, userRole, hasRole]);

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

  const memoizedRoutes = useMemo(() => {
    return [
      ...publicRoutes,
      {
        key: 'auth',
        parentKey: '',
        order: -1,
        type: -1,
        path: '',
        hideInMenu: true,
        element: <AuthRouteComponent requiresAuth={true}><LayoutComponent /></AuthRouteComponent>,
        children: getRoutes(authRoutes, 'auth', -1, [])
      }
    ]
  }, [authRoutes]);

  return {
    getRoutes: memoizedRoutes,
    getRoutePath,
    authRoutes,
  };
}
