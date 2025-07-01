import type { RouteObject } from 'react-router-dom'

export type IRoute = RouteObject & {
  name: string; // 路由名称
  icon?: React.ComponentType; // 路由图标
  key: string; // 路由key
  parentKey: string; // 父级路由key
  routePath: string; // 路由路径
  elementPath: string; // 路由组件路径
  hideInMenu: boolean; // 是否在菜单中隐藏
  closable: boolean; // 标签页是否可关闭
  redirect?: string; // 重定向路径
  order?: number; // 路由排序
  permission?: string; // 权限标识
};

export type ITabsItem = {
  key: string; // 标签页key
  label: string; // 标签页名称
  closable: boolean; // 标签页是否可关闭
  children?: ITabsItem[]; // 子标签页
}

export interface IRouteState {
  tabsList: ITabsItem[]; // 标签页列表
  activeKey: string; // 激活标签页key
  routes: IRoute[]; // 路由列表
  collapsed: boolean; // 侧边栏是否折叠
}

export interface IThunkRouteState {
  state: IRouteState // 路由状态
}
