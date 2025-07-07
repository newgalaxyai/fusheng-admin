import { createSlice } from '@reduxjs/toolkit'
import { IRouteState } from '../types/route'
import { HomeOutlined, UserOutlined } from '@ant-design/icons';

const initialState: IRouteState = {
  // 路由列表
  routes: [
    {
      name: '首页',
      icon: HomeOutlined,
      key: 'home',
      parentKey: '',
      routePath: '/home',
      elementPath: '@/views/Home',
      hideInMenu: false,
      order: 0,
      requiredRole: 2, // 普通用户
      requiredPermission: ':home', // 首页
      type: 1,
    },
    // 员工管理
    {
      name: '员工管理',
      icon: UserOutlined,
      key: 'staffManage',
      parentKey: '',
      hideInMenu: false,
      routePath: '/staffManage',
      requiredRole: 1, // 管理员
      requiredPermission: ':staff:manage',  // 员工管理
      order: 1,
      type: 1,
    },
    {
      name: '员工列表',
      key: 'staffList',
      parentKey: 'staffManage',
      routePath: 'staffList',
      hideInMenu: false,
      elementPath: '@/views/Staff/StaffList',
      requiredRole: 1, // 管理员
      requiredPermission: ':staff:manage:list',  // 员工列表
      order: 1,
      type: 2,
    },
    {
      name: '新增员工按钮',
      key: 'addStaffBtn',
      parentKey: 'staffList',
      requiredRole: 1, // 管理员
      requiredPermission: ':staff:manage:list:add',  // 新增员工
      order: 3,
      type: 3,
    },
    {
      name: '新增员工',
      key: 'addStaff',
      routePath: 'addStaff',
      elementPath: '@/views/Staff/AddOrEdit',
      parentKey: 'staffList',
      hideInMenu: true,
      requiredRole: 1, // 管理员
      requiredPermission: ':staff:manage:list:add',  // 新增员工
      order: 1,
      type: 2,
    },
    {
      name: '编辑员工按钮',
      key: 'editStaffBtn',
      parentKey: 'staffList',
      requiredRole: 1, // 管理员
      requiredPermission: ':staff:manage:list:edit',  // 编辑员工
      order: 4,
      type: 3,
    },
    {
      name: '编辑员工',
      key: 'editStaff',
      routePath: 'editStaff',
      elementPath: '@/views/Staff/AddOrEdit',
      parentKey: 'staffList',
      hideInMenu: true,
      requiredRole: 1, // 管理员
      requiredPermission: ':staff:manage:list:edit',  // 编辑员工
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
  // 是否登录
  isLogin: true,
  // 是否未找到页面
  isNotFound: false,
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
    isLoginAction: (state, { payload: { type, data } }) => {
      switch (type) {
        case 'set':
          state.isLogin = data
          break
      }
    },
    isNotFoundAction: (state, { payload: { type, data } }) => {
      switch (type) {
        case 'set':
          state.isNotFound = data
          break
      }
    },
  }
})

export const { tabsListAction, activeKeyAction, collapsedAction, isLoginAction, isNotFoundAction } = routeSlice.actions
export default routeSlice.reducer
