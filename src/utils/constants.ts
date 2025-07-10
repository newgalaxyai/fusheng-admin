// 本地存储的常量
export const LOCAL_STORAGE_NAME = {
    ACCESS_TOKEN: 'access_token', // 登录 token
    REFRESH_TOKEN: 'refresh_token', // 刷新令牌
    REMEMBER_ME: 'rememberMe', // 记住我
}

// 路由拼接参数名的常量
export const ROUTE_PARAM_NAME = {
    REDIRECT: 'redirect', // 重定向参数名
}

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
}

// 路由key的常量
export const ROUTE_KEY = {
    AUTH: 'auth', // 认证
    HOME: 'home', // 首页
    LOGIN: 'login', // 登录
    RESET: 'reset', // 重置密码
    NOT_FOUND: 'not_found', // 404
    STAFF_MANAGE: 'staffManage', // 员工管理
    STAFF_LIST: 'staffList', // 员工列表
    ADD_STAFF: 'addStaff', // 新增员工
    EDIT_STAFF: 'editStaff', // 编辑员工
}

// 路由name的常量
export const ROUTE_NAME = {
    STAFF_MANAGE: '员工管理',
    STAFF_LIST: '员工列表',
    ADD_STAFF: '新增员工',
    EDIT_STAFF: '编辑员工',
}

// 路由权限的常量
export const ROUTE_PERMISSION = {
    STAFF_MANAGE: ':staff:manage', // 员工管理
    STAFF_LIST: ':staff:manage:list', // 员工列表
    ADD_STAFF: ':staff:manage:list:add', // 新增员工
    EDIT_STAFF: ':staff:manage:list:edit', // 编辑员工
}

// 路由组件地址的常量
export const ROUTE_ELEMENT_PATH = {
    NOT_FOUND: '@/views/NotFound', // 404
    LOGIN: '@/views/Login', // 登录
    RESET: '@/views/Reset', // 重置密码
    STAFF_LIST: '@/views/Staff/StaffList', // 员工列表
    ADD_STAFF: '@/views/Staff/AddOrEdit', // 新增员工
    EDIT_STAFF: '@/views/Staff/AddOrEdit', // 编辑员工
}
