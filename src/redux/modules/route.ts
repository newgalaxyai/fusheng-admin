import { createSlice } from '@reduxjs/toolkit'
import { IRouteState } from '../types/route'
import { HomeOutlined, UserOutlined, UnorderedListOutlined } from '@ant-design/icons';

const initialState: IRouteState = {
  // 路由列表
  routes: [
    {
      name: '首页',
      icon: HomeOutlined,
      key: 'home',
      routePath: '/home',
      closable: false,
      elementPath: '@/views/Home',
      parentKey: '',
      hideInMenu: false,
      permission: 'user',
      order: 0,
    },
    // 员工管理
    {
      name: '员工管理',
      icon: UserOutlined,
      key: 'staffManage',
      routePath: '/staffManage',
      closable: true,
      elementPath: '',
      parentKey: '',
      hideInMenu: false,
      permission: 'user',
      order: 1,
    },
    {
      name: '员工列表',
      icon: UnorderedListOutlined,
      key: 'staffList',
      routePath: '/staffManage/staffList',
      closable: true,
      elementPath: '@/views/Staff/StaffList',
      parentKey: 'staffManage',
      hideInMenu: false,
      permission: 'user',
      order: 1,
    },
    {
      name: '新增/编辑',
      key: 'addOrEdit',
      routePath: '/staffManage/addOrEdit/:id?',
      closable: true,
      elementPath: '@/views/Staff/AddOrEdit',
      parentKey: 'staffManage',
      hideInMenu: true,
      permission: 'admin',
      order: 2,
    }
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
  activeKey: '',
  // 侧边栏是否折叠
  collapsed: false,
  // 是否登录
  isLogin: null,
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
              closable: data.closable,
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
  }
})

export const { tabsListAction, activeKeyAction, collapsedAction, isLoginAction } = routeSlice.actions
export default routeSlice.reducer
