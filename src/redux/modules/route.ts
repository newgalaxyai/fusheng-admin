import { createSlice } from '@reduxjs/toolkit'
import { IRouteState } from '../types/route'
import { SolutionOutlined, UserOutlined } from '@ant-design/icons';
import { ROUTE_KEY, ROUTE_NAME, ROUTE_PATH, ROUTE_PERMISSION, ROUTE_ELEMENT_PATH } from '@/utils/constants';

const initialState: IRouteState = {
  // 路由列表
  routes: [
    // 员工管理
    {
      name: ROUTE_NAME.STAFF_MANAGE,
      icon: UserOutlined,
      key: ROUTE_KEY.STAFF_MANAGE,
      parentKey: ROUTE_KEY.AUTH,
      hideInMenu: false,
      path: ROUTE_PATH.STAFF_MANAGE,
      redirect: ROUTE_PATH.STAFF_LIST,
      requiredRole: ['super', 'admin', 'staff'],
      requiredPermission: ROUTE_PERMISSION.STAFF_MANAGE,  // 员工管理
      order: 1,
      type: 1, // 目录
    },
    {
      name: ROUTE_NAME.STAFF_LIST,
      key: ROUTE_KEY.STAFF_LIST,
      parentKey: ROUTE_KEY.STAFF_MANAGE,
      path: ROUTE_PATH.STAFF_LIST,
      hideInMenu: false,
      elementPath: ROUTE_ELEMENT_PATH.STAFF_LIST,
      requiredRole: ['super', 'admin', 'staff'],
      requiredPermission: ROUTE_PERMISSION.STAFF_LIST,  // 员工列表
      order: 1,
      type: 2, // 菜单
    },
    {
      name: ROUTE_NAME.ADD_STAFF,
      key: ROUTE_KEY.ADD_STAFF,
      parentKey: ROUTE_KEY.STAFF_LIST,
      requiredRole: ['super', 'admin'],
      requiredPermission: ROUTE_PERMISSION.ADD_STAFF,  // 新增员工
      type: 3, // 按钮
    },
    {
      name: ROUTE_NAME.EDIT_STAFF,
      key: ROUTE_KEY.EDIT_STAFF,
      parentKey: ROUTE_KEY.STAFF_LIST,
      requiredRole: ['super', 'admin'],
      requiredPermission: ROUTE_PERMISSION.EDIT_STAFF,  // 编辑员工
      type: 3, // 按钮
    },
    {
      name: ROUTE_NAME.STAFF_DETAIL,
      key: ROUTE_KEY.STAFF_DETAIL,
      parentKey: ROUTE_KEY.STAFF_LIST,
      requiredRole: ['super', 'admin', 'staff'],
      requiredPermission: ROUTE_PERMISSION.STAFF_DETAIL,  // 员工详情
      type: 3, // 按钮
    },
    {
      name: ROUTE_NAME.DELETE_STAFF,
      key: ROUTE_KEY.DELETE_STAFF,
      parentKey: ROUTE_KEY.STAFF_LIST,
      hideInMenu: true,
      requiredRole: ['super', 'admin'],
      requiredPermission: ROUTE_PERMISSION.DELETE_STAFF,  // 删除员工
      type: 3, // 按钮
    },
    {
      name: ROUTE_NAME.ADD_STAFF,
      key: ROUTE_KEY.ADD_STAFF,
      path: ROUTE_PATH.ADD_STAFF,
      elementPath: ROUTE_ELEMENT_PATH.ADD_STAFF,
      parentKey: ROUTE_KEY.STAFF_MANAGE,
      hideInMenu: true,
      requiredRole: ['super', 'admin'],
      requiredPermission: ROUTE_PERMISSION.ADD_STAFF,  // 新增员工
      type: 2, // 菜单
    },
    {
      name: ROUTE_NAME.EDIT_STAFF,
      key: ROUTE_KEY.EDIT_STAFF,
      path: ROUTE_PATH.EDIT_STAFF,
      elementPath: ROUTE_ELEMENT_PATH.EDIT_STAFF,
      parentKey: ROUTE_KEY.STAFF_MANAGE,
      hideInMenu: true,
      requiredRole: ['super', 'admin'],
      requiredPermission: ROUTE_PERMISSION.EDIT_STAFF,  // 编辑员工
      type: 2, // 菜单
    },
    {
      name: ROUTE_NAME.STAFF_DETAIL,
      key: ROUTE_KEY.STAFF_DETAIL,
      path: ROUTE_PATH.STAFF_DETAIL,
      elementPath: ROUTE_ELEMENT_PATH.STAFF_DETAIL,
      parentKey: ROUTE_KEY.STAFF_MANAGE,
      hideInMenu: true,
      requiredRole: ['super', 'admin', 'staff'],
      requiredPermission: ROUTE_PERMISSION.STAFF_DETAIL,  // 员工详情
      type: 2, // 菜单
    },
    // 用户管理
    {
      name: ROUTE_NAME.CONSUMER_MANAGE,
      icon: SolutionOutlined,
      key: ROUTE_KEY.CONSUMER_MANAGE,
      parentKey: ROUTE_KEY.AUTH,
      hideInMenu: false,
      path: ROUTE_PATH.CONSUMER_MANAGE,
      redirect: ROUTE_PATH.CONSUMER_LIST,
      requiredRole: ['super', 'admin', 'staff'],
      requiredPermission: ROUTE_PERMISSION.CONSUMER_MANAGE,  // 用户管理
      order: 1,
      type: 1,
    },
    {
      name: ROUTE_NAME.CONSUMER_LIST,
      key: ROUTE_KEY.CONSUMER_LIST,
      parentKey: ROUTE_KEY.CONSUMER_MANAGE,
      path: ROUTE_PATH.CONSUMER_LIST,
      hideInMenu: false,
      elementPath: ROUTE_ELEMENT_PATH.CONSUMER_LIST,
      requiredRole: ['super', 'admin', 'staff'],
      requiredPermission: ROUTE_PERMISSION.CONSUMER_LIST,  // 用户列表
      order: 1,
      type: 2,
    },
    {
      name: ROUTE_NAME.ADD_CONSUMER,
      key: ROUTE_KEY.ADD_CONSUMER,
      parentKey: ROUTE_KEY.CONSUMER_LIST,
      requiredRole: ['super', 'admin', 'staff'],
      requiredPermission: ROUTE_PERMISSION.ADD_CONSUMER,  // 新增用户
      order: 3,
      type: 3,
    },
    {
      name: ROUTE_NAME.ADD_CONSUMER,
      key: ROUTE_KEY.ADD_CONSUMER,
      path: ROUTE_PATH.ADD_CONSUMER,
      elementPath: ROUTE_ELEMENT_PATH.ADD_CONSUMER,
      parentKey: ROUTE_KEY.CONSUMER_LIST,
      hideInMenu: true,
      requiredRole: ['super', 'admin', 'staff'],
      requiredPermission: ROUTE_PERMISSION.ADD_CONSUMER,  // 新增用户
      order: 1,
      type: 2,
    },
    {
      name: ROUTE_NAME.EDIT_CONSUMER,
      key: ROUTE_KEY.EDIT_CONSUMER,
      parentKey: ROUTE_KEY.CONSUMER_LIST,
      requiredRole: ['super', 'admin', 'staff'],
      requiredPermission: ROUTE_PERMISSION.EDIT_CONSUMER,  // 编辑用户
      order: 4,
      type: 3,
    },
    {
      name: ROUTE_NAME.EDIT_CONSUMER,
      key: ROUTE_KEY.EDIT_CONSUMER,
      path: ROUTE_PATH.EDIT_CONSUMER,
      elementPath: ROUTE_ELEMENT_PATH.EDIT_CONSUMER,
      parentKey: ROUTE_KEY.CONSUMER_LIST,
      hideInMenu: true,
      requiredRole: ['super', 'admin', 'staff'],
      requiredPermission: ROUTE_PERMISSION.EDIT_CONSUMER,  // 编辑用户
      order: 2,
      type: 2,
    },
  ],
  // 标签列表
  tabsList: [
    {
      key: 'home',
      label: '首页',
      closable: false,

    }
  ],
  // 激活标签
  activeKey: 'home',
  // 侧边栏是否折叠
  collapsed: false,
}

const routeSlice = createSlice({
  name: 'route',
  initialState,
  reducers: {
    tabsListAction: (state, { payload: { type, data } }) => {
      switch (type) {
        case 'set':
          state.tabsList = data
          break
        case 'add':
          // 如果标签不存在，则添加标签
          if (!state.tabsList.find(item => item.key === data.key)) {
            state.tabsList.push({
              key: data.key,
              label: data.name,
              closable: data.type === 2 ? true : false,
            })
          }
          // 设置激活标签
          state.activeKey = data.key
          break
        default:
          break
      }
    },
    activeKeyAction: (state, { payload: { type, data } }) => {
      switch (type) {
        case 'set':
          state.activeKey = data
          break
      }
    },
    collapsedAction: (state, { payload: { type, data } }) => {
      switch (type) {
        case 'set':
          state.collapsed = data
          break
      }
    },
  }
})

export const { tabsListAction, activeKeyAction, collapsedAction } = routeSlice.actions
export default routeSlice.reducer
