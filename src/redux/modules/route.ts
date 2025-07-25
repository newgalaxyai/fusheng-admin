import { createSlice } from '@reduxjs/toolkit'
import { IRouteState } from '../types/route'
import {
  ROUTE_KEY,
  ROUTE_NAME,
  ROUTE_PATH,
  ROUTE_PERMISSION,
  ROUTE_ELEMENT_PATH,
  STAFF_ROLE_NAME
} from '@/constants';

const initialState: IRouteState = {
  // 路由列表
  routes: [
    // 员工管理
    {
      name: ROUTE_NAME.STAFF_MANAGE,
      key: ROUTE_KEY.STAFF_MANAGE,
      parentKey: ROUTE_KEY.AUTH,
      hideInMenu: false,
      path: ROUTE_PATH.STAFF_MANAGE,
      redirect: ROUTE_PATH.STAFF_LIST,
      requiredRole: [STAFF_ROLE_NAME.SUPER, STAFF_ROLE_NAME.ADMIN, STAFF_ROLE_NAME.STAFF],
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
      requiredRole: [STAFF_ROLE_NAME.SUPER, STAFF_ROLE_NAME.ADMIN, STAFF_ROLE_NAME.STAFF],
      requiredPermission: ROUTE_PERMISSION.STAFF_LIST,  // 员工列表
      order: 1,
      type: 2, // 菜单
    },
    {
      name: ROUTE_NAME.ADD_STAFF,
      key: ROUTE_KEY.ADD_STAFF,
      parentKey: ROUTE_KEY.STAFF_LIST,
      requiredRole: [STAFF_ROLE_NAME.SUPER, STAFF_ROLE_NAME.ADMIN],
      requiredPermission: ROUTE_PERMISSION.ADD_STAFF,  // 新增员工
      type: 3, // 按钮
    },
    {
      name: ROUTE_NAME.EDIT_STAFF,
      key: ROUTE_KEY.EDIT_STAFF,
      parentKey: ROUTE_KEY.STAFF_LIST,
      requiredRole: [STAFF_ROLE_NAME.SUPER, STAFF_ROLE_NAME.ADMIN],
      requiredPermission: ROUTE_PERMISSION.EDIT_STAFF,  // 编辑员工
      type: 3, // 按钮
    },
    {
      name: ROUTE_NAME.STAFF_DETAIL,
      key: ROUTE_KEY.STAFF_DETAIL,
      parentKey: ROUTE_KEY.STAFF_LIST,
      requiredRole: [STAFF_ROLE_NAME.SUPER, STAFF_ROLE_NAME.ADMIN, STAFF_ROLE_NAME.STAFF],
      requiredPermission: ROUTE_PERMISSION.STAFF_DETAIL,  // 员工详情
      type: 3, // 按钮
    },
    {
      name: ROUTE_NAME.DELETE_STAFF,
      key: ROUTE_KEY.DELETE_STAFF,
      parentKey: ROUTE_KEY.STAFF_LIST,
      hideInMenu: true,
      requiredRole: [STAFF_ROLE_NAME.SUPER, STAFF_ROLE_NAME.ADMIN],
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
      requiredRole: [STAFF_ROLE_NAME.SUPER, STAFF_ROLE_NAME.ADMIN],
      requiredPermission: ROUTE_PERMISSION.ADD_STAFF,  // 新增员工
      order: 11,
      type: 2, // 菜单
    },
    {
      name: ROUTE_NAME.EDIT_STAFF,
      key: ROUTE_KEY.EDIT_STAFF,
      path: ROUTE_PATH.EDIT_STAFF,
      elementPath: ROUTE_ELEMENT_PATH.EDIT_STAFF,
      parentKey: ROUTE_KEY.STAFF_MANAGE,
      hideInMenu: true,
      requiredRole: [STAFF_ROLE_NAME.SUPER, STAFF_ROLE_NAME.ADMIN],
      requiredPermission: ROUTE_PERMISSION.EDIT_STAFF,  // 编辑员工
      order: 21,
      type: 2, // 菜单
    },
    {
      name: ROUTE_NAME.STAFF_DETAIL,
      key: ROUTE_KEY.STAFF_DETAIL,
      path: ROUTE_PATH.STAFF_DETAIL,
      elementPath: ROUTE_ELEMENT_PATH.STAFF_DETAIL,
      parentKey: ROUTE_KEY.STAFF_MANAGE,
      hideInMenu: true,
      requiredRole: [STAFF_ROLE_NAME.SUPER, STAFF_ROLE_NAME.ADMIN, STAFF_ROLE_NAME.STAFF],
      requiredPermission: ROUTE_PERMISSION.STAFF_DETAIL,  // 员工详情
      order: 31,
      type: 2, // 菜单
    },
    // 用户管理
    {
      name: ROUTE_NAME.CONSUMER_MANAGE,
      key: ROUTE_KEY.CONSUMER_MANAGE,
      parentKey: ROUTE_KEY.AUTH,
      hideInMenu: false,
      path: ROUTE_PATH.CONSUMER_MANAGE,
      redirect: ROUTE_PATH.CONSUMER_LIST,
      requiredRole: [STAFF_ROLE_NAME.SUPER, STAFF_ROLE_NAME.ADMIN, STAFF_ROLE_NAME.STAFF],
      requiredPermission: ROUTE_PERMISSION.CONSUMER_MANAGE,  // 用户管理
      order: 11,
      type: 1,
    },
    {
      name: ROUTE_NAME.CONSUMER_LIST,
      key: ROUTE_KEY.CONSUMER_LIST,
      parentKey: ROUTE_KEY.CONSUMER_MANAGE,
      path: ROUTE_PATH.CONSUMER_LIST,
      hideInMenu: false,
      elementPath: ROUTE_ELEMENT_PATH.CONSUMER_LIST,
      requiredRole: [STAFF_ROLE_NAME.SUPER, STAFF_ROLE_NAME.ADMIN, STAFF_ROLE_NAME.STAFF],
      requiredPermission: ROUTE_PERMISSION.CONSUMER_LIST,  // 用户列表
      order: 1,
      type: 2,
    },
    {
      name: ROUTE_NAME.ADD_CONSUMER,
      key: ROUTE_KEY.ADD_CONSUMER,
      parentKey: ROUTE_KEY.CONSUMER_MANAGE,
      requiredRole: [STAFF_ROLE_NAME.SUPER, STAFF_ROLE_NAME.ADMIN, STAFF_ROLE_NAME.STAFF],
      requiredPermission: ROUTE_PERMISSION.ADD_CONSUMER,  // 新增用户
      type: 3,
    },
    {
      name: ROUTE_NAME.EDIT_CONSUMER,
      key: ROUTE_KEY.EDIT_CONSUMER,
      parentKey: ROUTE_KEY.CONSUMER_MANAGE,
      requiredRole: [STAFF_ROLE_NAME.SUPER, STAFF_ROLE_NAME.ADMIN, STAFF_ROLE_NAME.STAFF],
      requiredPermission: ROUTE_PERMISSION.EDIT_CONSUMER,  // 编辑用户
      type: 3,
    },
    {
      name: ROUTE_NAME.CONSUMER_DETAIL,
      key: ROUTE_KEY.CONSUMER_DETAIL,
      parentKey: ROUTE_KEY.STAFF_LIST,
      requiredRole: [STAFF_ROLE_NAME.SUPER, STAFF_ROLE_NAME.ADMIN, STAFF_ROLE_NAME.STAFF],
      requiredPermission: ROUTE_PERMISSION.CONSUMER_DETAIL,  // 用户详情
      type: 3, // 按钮
    },
    {
      name: ROUTE_NAME.DELETE_CONSUMER,
      key: ROUTE_KEY.DELETE_CONSUMER,
      parentKey: ROUTE_KEY.STAFF_LIST,
      hideInMenu: true,
      requiredRole: [STAFF_ROLE_NAME.SUPER, STAFF_ROLE_NAME.ADMIN],
      requiredPermission: ROUTE_PERMISSION.DELETE_CONSUMER,  // 删除用户
      type: 3, // 按钮
    },
    {
      name: ROUTE_NAME.ADD_CONSUMER,
      key: ROUTE_KEY.ADD_CONSUMER,
      path: ROUTE_PATH.ADD_CONSUMER,
      elementPath: ROUTE_ELEMENT_PATH.ADD_CONSUMER,
      parentKey: ROUTE_KEY.CONSUMER_MANAGE,
      hideInMenu: true,
      requiredRole: [STAFF_ROLE_NAME.SUPER, STAFF_ROLE_NAME.ADMIN, STAFF_ROLE_NAME.STAFF],
      requiredPermission: ROUTE_PERMISSION.ADD_CONSUMER,  // 新增用户
      order: 11,
      type: 2,
    },
    {
      name: ROUTE_NAME.EDIT_CONSUMER,
      key: ROUTE_KEY.EDIT_CONSUMER,
      path: ROUTE_PATH.EDIT_CONSUMER,
      elementPath: ROUTE_ELEMENT_PATH.EDIT_CONSUMER,
      parentKey: ROUTE_KEY.CONSUMER_MANAGE,
      hideInMenu: true,
      requiredRole: [STAFF_ROLE_NAME.SUPER, STAFF_ROLE_NAME.ADMIN, STAFF_ROLE_NAME.STAFF],
      requiredPermission: ROUTE_PERMISSION.EDIT_CONSUMER,  // 编辑用户
      order: 21,
      type: 2,
    },
    {
      name: ROUTE_NAME.CONSUMER_DETAIL,
      key: ROUTE_KEY.CONSUMER_DETAIL,
      path: ROUTE_PATH.CONSUMER_DETAIL,
      elementPath: ROUTE_ELEMENT_PATH.CONSUMER_DETAIL,
      parentKey: ROUTE_KEY.CONSUMER_MANAGE,
      hideInMenu: true,
      requiredRole: [STAFF_ROLE_NAME.SUPER, STAFF_ROLE_NAME.ADMIN, STAFF_ROLE_NAME.STAFF],
      requiredPermission: ROUTE_PERMISSION.CONSUMER_DETAIL,  // 用户详情
      order: 31,
      type: 2,
    },
    {
      name: ROUTE_NAME.FAVOR_LIST,
      key: ROUTE_KEY.FAVOR_LIST,
      parentKey: ROUTE_KEY.CONSUMER_MANAGE,
      path: ROUTE_PATH.FAVOR_LIST,
      hideInMenu: false,
      elementPath: ROUTE_ELEMENT_PATH.FAVOR_LIST,
      requiredRole: [STAFF_ROLE_NAME.SUPER, STAFF_ROLE_NAME.ADMIN, STAFF_ROLE_NAME.STAFF],
      requiredPermission: ROUTE_PERMISSION.FAVOR_LIST,  // 用户收藏列表
      order: 41,
      type: 2,
    },
    {
      name: ROUTE_NAME.FAVOR_DETAIL,
      key: ROUTE_KEY.FAVOR_DETAIL,
      path: ROUTE_PATH.FAVOR_DETAIL,
      elementPath: ROUTE_ELEMENT_PATH.FAVOR_DETAIL,
      parentKey: ROUTE_KEY.CONSUMER_MANAGE,
      hideInMenu: true,
      requiredRole: [STAFF_ROLE_NAME.SUPER, STAFF_ROLE_NAME.ADMIN, STAFF_ROLE_NAME.STAFF],
      requiredPermission: ROUTE_PERMISSION.FAVOR_DETAIL,  // 收藏详情
      order: 51,
      type: 2, // 菜单
    },
    {
      name: ROUTE_NAME.LOGIN_LIST,
      key: ROUTE_KEY.LOGIN_LIST,
      parentKey: ROUTE_KEY.CONSUMER_MANAGE,
      path: ROUTE_PATH.LOGIN_LIST,
      hideInMenu: false,
      elementPath: ROUTE_ELEMENT_PATH.LOGIN_LIST,
      requiredRole: [STAFF_ROLE_NAME.SUPER, STAFF_ROLE_NAME.ADMIN, STAFF_ROLE_NAME.STAFF],
      requiredPermission: ROUTE_PERMISSION.LOGIN_LIST,  // 用户登录日志
      order: 61,
      type: 2,
    },
    // 数据管理
    {
      name: ROUTE_NAME.DATA_MANAGE,
      key: ROUTE_KEY.DATA_MANAGE,
      parentKey: ROUTE_KEY.AUTH,
      hideInMenu: false,
      path: ROUTE_PATH.DATA_MANAGE,
      redirect: ROUTE_PATH.PAGE_ANALYSIS,
      requiredRole: [STAFF_ROLE_NAME.SUPER, STAFF_ROLE_NAME.ADMIN, STAFF_ROLE_NAME.STAFF],
      requiredPermission: ROUTE_PERMISSION.DATA_MANAGE,  // 数据管理
      order: 21,
      type: 1, // 目录
    },
    {
      name: ROUTE_NAME.PAGE_ANALYSIS,
      key: ROUTE_KEY.PAGE_ANALYSIS,
      parentKey: ROUTE_KEY.DATA_MANAGE,
      path: ROUTE_PATH.PAGE_ANALYSIS,
      hideInMenu: false,
      elementPath: ROUTE_ELEMENT_PATH.PAGE_ANALYSIS,
      requiredRole: [STAFF_ROLE_NAME.SUPER, STAFF_ROLE_NAME.ADMIN, STAFF_ROLE_NAME.STAFF],
      requiredPermission: ROUTE_PERMISSION.PAGE_ANALYSIS,  // 页面分析
      order: 1,
      type: 2,
    },
    {
      name: ROUTE_NAME.PAGE_FLOW,
      key: ROUTE_KEY.PAGE_FLOW,
      parentKey: ROUTE_KEY.DATA_MANAGE,
      path: ROUTE_PATH.PAGE_FLOW,
      hideInMenu: true,
      elementPath: ROUTE_ELEMENT_PATH.PAGE_FLOW,
      requiredRole: [STAFF_ROLE_NAME.SUPER, STAFF_ROLE_NAME.ADMIN, STAFF_ROLE_NAME.STAFF],
      requiredPermission: ROUTE_PERMISSION.PAGE_FLOW,  // 页面流向
      order: 10,
      type: 2,
    },
    {
      name: ROUTE_NAME.QA_RECORD,
      key: ROUTE_KEY.QA_RECORD,
      parentKey: ROUTE_KEY.DATA_MANAGE,
      path: ROUTE_PATH.QA_RECORD,
      hideInMenu: false,
      elementPath: ROUTE_ELEMENT_PATH.QA_RECORD,
      requiredRole: [STAFF_ROLE_NAME.SUPER, STAFF_ROLE_NAME.ADMIN, STAFF_ROLE_NAME.STAFF],
      requiredPermission: ROUTE_PERMISSION.QA_RECORD,  // 问答记录
      order: 11,
      type: 2,
    },
    {
      name: ROUTE_NAME.EVALUATE_LIST,
      key: ROUTE_KEY.EVALUATE_LIST,
      parentKey: ROUTE_KEY.DATA_MANAGE,
      path: ROUTE_PATH.EVALUATE_LIST,
      hideInMenu: false,
      elementPath: ROUTE_ELEMENT_PATH.EVALUATE_LIST,
      requiredRole: [STAFF_ROLE_NAME.SUPER, STAFF_ROLE_NAME.ADMIN, STAFF_ROLE_NAME.STAFF],
      requiredPermission: ROUTE_PERMISSION.EVALUATE_LIST,  //AI问答评价
      order: 21,
      type: 2,
    },
    {
      name: ROUTE_NAME.SYS_ABNORMAL_LIST,
      key: ROUTE_KEY.SYS_ABNORMAL_LIST,
      parentKey: ROUTE_KEY.DATA_MANAGE,
      path: ROUTE_PATH.SYS_ABNORMAL_LIST,
      hideInMenu: false,
      elementPath: ROUTE_ELEMENT_PATH.SYS_ABNORMAL_LIST,
      requiredRole: [STAFF_ROLE_NAME.SUPER, STAFF_ROLE_NAME.ADMIN, STAFF_ROLE_NAME.STAFF],
      requiredPermission: ROUTE_PERMISSION.SYS_ABNORMAL_LIST,  //系统异常
      order: 31,
      type: 2,
    },
    // 企业名单管理
    {
      name: ROUTE_NAME.COMPANY_MANAGE,
      key: ROUTE_KEY.COMPANY_MANAGE,
      parentKey: ROUTE_KEY.AUTH,
      hideInMenu: false,
      path: ROUTE_PATH.COMPANY_MANAGE,
      redirect: ROUTE_PATH.COMPANY_LIST,
      requiredRole: [STAFF_ROLE_NAME.SUPER, STAFF_ROLE_NAME.ADMIN, STAFF_ROLE_NAME.STAFF],
      requiredPermission: ROUTE_PERMISSION.COMPANY_MANAGE,  // 企业名单管理
      order: 31,
      type: 1, // 目录
    },
    {
      name: ROUTE_NAME.COMPANY_LIST,
      key: ROUTE_KEY.COMPANY_LIST,
      parentKey: ROUTE_KEY.COMPANY_MANAGE,
      path: ROUTE_PATH.COMPANY_LIST,
      hideInMenu: false,
      elementPath: ROUTE_ELEMENT_PATH.COMPANY_LIST,
      requiredRole: [STAFF_ROLE_NAME.SUPER, STAFF_ROLE_NAME.ADMIN, STAFF_ROLE_NAME.STAFF],
      requiredPermission: ROUTE_PERMISSION.COMPANY_LIST,  //企业列表
      order: 1,
      type: 2,
    },
    {
      name: ROUTE_NAME.COM_FEEDBACK_LIST,
      key: ROUTE_KEY.COM_FEEDBACK_LIST,
      parentKey: ROUTE_KEY.COMPANY_MANAGE,
      path: ROUTE_PATH.COM_FEEDBACK_LIST,
      hideInMenu: false,
      elementPath: ROUTE_ELEMENT_PATH.COM_FEEDBACK_LIST,
      requiredRole: [STAFF_ROLE_NAME.SUPER, STAFF_ROLE_NAME.ADMIN, STAFF_ROLE_NAME.STAFF],
      requiredPermission: ROUTE_PERMISSION.COM_FEEDBACK_LIST,  //企业反馈列表
      order: 11,
      type: 2,
    },
    // 反馈管理
    {
      name: ROUTE_NAME.FEEDBACK_MANAGE,
      key: ROUTE_KEY.FEEDBACK_MANAGE,
      parentKey: ROUTE_KEY.AUTH,
      hideInMenu: false,
      path: ROUTE_PATH.FEEDBACK_MANAGE,
      redirect: ROUTE_PATH.OPINION_LIST,
      requiredRole: [STAFF_ROLE_NAME.SUPER, STAFF_ROLE_NAME.ADMIN, STAFF_ROLE_NAME.STAFF],
      requiredPermission: ROUTE_PERMISSION.FEEDBACK_MANAGE,  // 反馈管理
      order: 41,
      type: 1, // 目录
    },
    {
      name: ROUTE_NAME.OPINION_LIST,
      key: ROUTE_KEY.OPINION_LIST,
      parentKey: ROUTE_KEY.FEEDBACK_MANAGE,
      path: ROUTE_PATH.OPINION_LIST,
      hideInMenu: false,
      elementPath: ROUTE_ELEMENT_PATH.OPINION_LIST,
      requiredRole: [STAFF_ROLE_NAME.SUPER, STAFF_ROLE_NAME.ADMIN, STAFF_ROLE_NAME.STAFF],
      requiredPermission: ROUTE_PERMISSION.OPINION_LIST,  //意见列表
      order: 1,
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
              params: data.params,
              state: data.state,
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
    resetRouteAction: (state) => {
      state.tabsList = [
        {
          key: 'home',
          label: '首页',
          closable: false,

        }
      ]
      state.activeKey = 'home'
      state.collapsed = false
    },
  }
})

export const {
  tabsListAction,
  activeKeyAction,
  collapsedAction,
  resetRouteAction
} = routeSlice.actions
export default routeSlice.reducer
