import { createSlice } from '@reduxjs/toolkit'
import { IRouteState } from '../types/route'

const initialState: IRouteState = {
  // 路由列表
  routes: [
    {
      name: '首页',
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
        case 'remove':
          // 获取要移除的标签索引
          const targetIndex = state.tabsList.findIndex(item => item.key === data)
          // 移除标签
          const newTabsList = state.tabsList.filter(item => item.key !== data)
          // 更新标签列表
          state.tabsList = newTabsList
          // 如果移除的标签是当前激活的标签，则切换到上一个标签
          if (newTabsList.length && data === state.activeKey) {
            const { key } = newTabsList[targetIndex === newTabsList.length ? targetIndex - 1 : targetIndex]
            state.activeKey = key
          }
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
  }
})

export const { tabsListAction, activeKeyAction } = routeSlice.actions
export default routeSlice.reducer
