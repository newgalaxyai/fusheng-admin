import { HomeOutlined, UserOutlined, SolutionOutlined } from "@ant-design/icons";

// 本地存储的常量
export const LOCAL_STORAGE_NAME = {
    ACCESS_TOKEN: 'access_token', // 登录 token
    REFRESH_TOKEN: 'refresh_token', // 刷新令牌
    REMEMBER_ME: 'rememberMe', // 记住我
    REMEMBER: 'remember',
}

// 路由拼接参数名的常量
export const ROUTE_PARAM_NAME = {
    REDIRECT: 'redirect', // 重定向参数名
    SEARCH_PARAMS: 'searchParams', // 搜索参数
    STATE_PARAMS: 'stateParams', // 状态参数
    STAFF_ID: 'staffId', // 员工id
    CONSUMER_ID: 'consumerId', //用户id
    FAVOR_ID: 'favorId', //收藏id
    PAGE_TYPE: 'pageType', // 页面类型 1:新增 2:编辑 3:详情
    REDIRECT_INFO: 'redirectInfo', // 完整重定向信息
}

// 公共路由path
export const ROUTE_PATH_COMMON = ['/login', '/reset', '/404']

// 路由路径的常量
export const ROUTE_PATH = {
    HOME: '/home', // 首页
    LOGIN: '/login', // 登录
    RESET: '/reset', // 重置密码
    NOT_FOUND: '/404', // 404
    STAFF_MANAGE: '/staffManage', // 员工管理
    STAFF_LIST: 'staffList', // 员工列表
    ADD_STAFF: 'addStaff', // 新增员工
    EDIT_STAFF: 'editStaff', // 编辑员工
    STAFF_DETAIL: 'staffDetail', // 员工详情
    CONSUMER_MANAGE: '/consumerManage', // 消费者管理
    CONSUMER_LIST: 'consumerList', // 消费者列表
    ADD_CONSUMER: 'addConsumer', // 新增消费者
    EDIT_CONSUMER: 'editConsumer', // 编辑消费者
    CONSUMER_DETAIL: 'consumerDetail', // 消费者详情
    FAVOR_LIST: 'favorList', // 收藏列表
    FAVOR_DETAIL: 'favorDetail', // 收藏列表
}

// 路由key的常量
export const ROUTE_KEY = {
    AUTH: 'auth', // 认证
    HOME: 'home', // 首页
    LOGIN: 'login', // 登录
    RESET: 'reset', // 重置密码
    NOT_FOUND: 'not_found', // notfound
    DEFAULT: 'default', // 默认
    NOT_404: '404', // 404
    STAFF_MANAGE: 'staffManage', // 员工管理
    STAFF_LIST: 'staffList', // 员工列表
    ADD_STAFF: 'addStaff', // 新增员工
    EDIT_STAFF: 'editStaff', // 编辑员工
    STAFF_DETAIL: 'staffDetail', // 员工详情
    DELETE_STAFF: 'deleteStaff', // 删除员工
    CONSUMER_MANAGE: 'consumerManage', // 消费者管理
    CONSUMER_LIST: 'consumerList', // 消费者列表
    ADD_CONSUMER: 'addConsumer', // 新增消费者
    EDIT_CONSUMER: 'editConsumer', // 编辑消费者
    CONSUMER_DETAIL: 'consumerDetail', // 消费者详情
    DELETE_CONSUMER: 'deleteConsumer', // 删除消费者
    FAVOR_LIST: 'favorList', // 收藏列表
    FAVOR_DETAIL: 'favorDetail', // 收藏列表
}

// 路由name的常量
export const ROUTE_NAME = {
    HOME: '首页',
    STAFF_MANAGE: '员工管理',
    STAFF_LIST: '员工列表',
    ADD_STAFF: '新增员工',
    EDIT_STAFF: '编辑员工',
    STAFF_DETAIL: '员工详情',
    DELETE_STAFF: '删除员工',
    CONSUMER_MANAGE: '用户管理',
    CONSUMER_LIST: '用户列表',
    ADD_CONSUMER: '新增用户',
    EDIT_CONSUMER: '编辑用户',
    CONSUMER_DETAIL: '用户详情',
    DELETE_CONSUMER: '删除用户',
    FAVOR_LIST: '收藏列表',
    FAVOR_DETAIL: '收藏详情',
}

// 路由权限的常量
export const ROUTE_PERMISSION = {
    STAFF_MANAGE: ':staff:manage', // 员工管理
    STAFF_LIST: ':staff:manage:list', // 员工列表
    ADD_STAFF: ':staff:manage:list:add', // 新增员工
    EDIT_STAFF: ':staff:manage:list:edit', // 编辑员工
    STAFF_DETAIL: ':staff:manage:list:detail', // 员工详情
    DELETE_STAFF: ':staff:manage:list:delete', // 删除员工
    CONSUMER_MANAGE: ':consumer:manage', // 消费者管理
    CONSUMER_LIST: ':consumer:manage:list', // 消费者列表
    ADD_CONSUMER: ':consumer:manage:list:add', // 新增消费者
    EDIT_CONSUMER: ':consumer:manage:list:edit', // 编辑消费者
    CONSUMER_DETAIL: ':consumer:manage:list:detail', // 消费者详情
    DELETE_CONSUMER: ':consumer:manage:list:delete', // 删除消费者
    FAVOR_LIST: ':consumer:manage:favor', // 收藏列表
    FAVOR_DETAIL: ':consumer:manage:favor:detail', //收藏详情
}

// 路由组件地址的常量
export const ROUTE_ELEMENT_PATH = {
    HOME: '../views/Home', // 首页
    NOT_FOUND: '../views/NotFound', // 404
    LOGIN: '../views/Login', // 登录
    RESET: '../views/Reset', // 重置密码
    STAFF_LIST: '../views/Staff/StaffList', // 员工列表
    ADD_STAFF: '../views/Staff/StaffDetail', // 新增员工
    EDIT_STAFF: '../views/Staff/StaffDetail', // 编辑员工
    STAFF_DETAIL: '../views/Staff/StaffDetail', // 员工详情
    CONSUMER_LIST: '../views/Consumer/ConsumerList', // 用户列表
    ADD_CONSUMER: '../views/Consumer/ConsumerDetail', // 新增用户
    EDIT_CONSUMER: '../views/Consumer/ConsumerDetail', // 编辑用户
    CONSUMER_DETAIL: '../views/Consumer/ConsumerDetail', // 用户详情
    FAVOR_LIST: '../views/Consumer/FavorList', // 收藏列表
    FAVOR_DETAIL: '../views/Consumer/FavorDetail', //收藏详情
}

// 路由图标的常量
export const ROUTE_ICON: Record<string, React.ComponentType | React.ReactNode> = {
    [ROUTE_KEY.HOME]: HomeOutlined, // 首页
    [ROUTE_KEY.STAFF_MANAGE]: SolutionOutlined, // 员工管理
    [ROUTE_KEY.CONSUMER_MANAGE]: UserOutlined, // 用户管理
}

// name-color类型
export type INameColor = {
    name: string;
    color: string;
    id: number
}

export const STAFF_ROLE_NAME = {
    SUPER: 'super_admin',
    ADMIN: 'admin',
    STAFF: 'staff',
}

export const STAFF_ROLE: Record<string, INameColor> = {
    'super_admin': {
        name: '超级管理员',
        color: 'success',
        id: 1
    },
    'admin': {
        name: '管理员',
        color: 'processing',
        id: 160
    },
    'staff': {
        name: '员工',
        color: 'default',
        id: 161
    },
}

export const STAFF_GENDER: Record<number, string> = {
    0: '保密',
    1: '男',
    2: '女',
}

export const STAFF_EDUCATION: Record<string, string> = {
    'DOCTOR': '博士',
    'MASTER': '硕士',
    'BACHELOR': '本科',
    'COLLEGE': '专科',
    'HIGH_SCHOOL': '高中',
    'OTHER': '其他',
}

export const STAFF_MARRIAGE_STATUS: Record<string, string> = {
    'SINGLE': '未婚',
    'MARRIED': '已婚',
    'DIVORCED': '离异',
    'WIDOWED': '丧偶'
}

export const STAFF_CERTIFICATE_TYPE: Record<string, string> = {
    'ID_CARD': '居民身份证',
    'PASSPORT': '护照',
    'MILITARY_ID': '军官证',
    'OTHER': '其他',
}

export const CONSUMER_SOURCE: Record<number, string> = {
    0: '未知来源',
    1: '小程序',
}

export const CONSUMER_OFFOPT: Record<number, string> = {
    1: '注册',
    2: '注销',
    3: '修改',
}
