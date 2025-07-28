import {
    HomeOutlined,
    UserOutlined,
    SolutionOutlined,
    BarChartOutlined,
    AppstoreOutlined,
    BookOutlined,
} from "@ant-design/icons";

// 路由拼接参数名的常量
export const ROUTE_PARAM_NAME = {
    REDIRECT: 'redirect', // 重定向参数名
    SEARCH_PARAMS: 'searchParams', // 搜索参数
    STATE_PARAMS: 'stateParams', // 状态参数
    STAFF_ID: 'staffId', // 员工id
    CONSUMER_ID: 'consumerId', //用户id
    FAVOR_ID: 'favorId', //收藏id
    ANALYSIS_ID: 'analysisId', //页面分析id
    OPINION_ID: 'opinionId', // 意见id
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
    FAVOR_DETAIL: 'favorDetail', // 收藏详情
    LOGIN_LIST: 'loginList', // 用户登录日志
    DATA_MANAGE: '/dataManage', // 数据管理 
    PAGE_ANALYSIS: 'pageAnalysis', // 页面分析 
    PAGE_FLOW: 'pageFlow', // 页面流向 
    QA_RECORD: 'qaRecord', // 问答记录 
    EVALUATE_LIST: 'evaluateList', // AI问答评价列表
    SYS_ABNORMAL_LIST: 'sysAbnormalList', // 系统异常列表
    COMPANY_MANAGE: '/companyManage', // 企业名单管理
    COMPANY_LIST: 'companyList', // 企业列表
    COM_FEEDBACK_LIST: 'comFeedbackList', // 企业反馈列表
    FEEDBACK_MANAGE: 'feedbackManage', // 反馈管理
    OPINION_LIST: 'opinionList', // 意见列表
    OPINION_DETAIL: 'opinionDetail', // 意见详情
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
    LOGIN_LIST: 'loginList', // 用户登录日志
    DATA_MANAGE: 'dataManage', // 数据管理 
    PAGE_ANALYSIS: 'pageAnalysis', // 页面分析 
    PAGE_FLOW: 'pageFlow', // 页面流向 
    QA_RECORD: 'qaRecord', // 问答记录 
    EVALUATE_LIST: 'evaluateList', // AI问答评价列表
    SYS_ABNORMAL_LIST: 'sysAbnormalList', // 系统异常列表
    COMPANY_MANAGE: 'companyManage', // 企业名单管理
    COMPANY_LIST: 'companyList', // 企业列表
    COM_FEEDBACK_LIST: 'comFeedbackList', // 企业反馈列表
    FEEDBACK_MANAGE: 'feedbackManage', // 反馈管理
    OPINION_LIST: 'opinionList', // 意见列表
    OPINION_DETAIL: 'opinionDetail', // 意见详情
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
    LOGIN_LIST: '登录日志', // 用户登录日志
    DATA_MANAGE: '数据管理', // 数据管理 
    PAGE_ANALYSIS: '页面分析', // 页面分析 
    PAGE_FLOW: '页面流向', // 页面流向 
    QA_RECORD: '问答记录', // 问答记录 
    EVALUATE_LIST: 'AI问答评价', // AI问答评价列表
    SYS_ABNORMAL_LIST: '系统异常', // 系统异常列表
    COMPANY_MANAGE: '企业名单管理', // 企业名单管理
    COMPANY_LIST: '企业列表', // 企业列表
    COM_FEEDBACK_LIST: '企业反馈列表', // 企业反馈列表
    FEEDBACK_MANAGE: '反馈管理', // 反馈管理
    OPINION_LIST: '意见反馈列表', // 意见列表
    OPINION_DETAIL: '意见反馈详情', // 意见详情
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
    LOGIN_LIST: ':consumer:manage:login', // 用户登录日志
    DATA_MANAGE: ':data:manage', // 数据管理 
    PAGE_ANALYSIS: 'data:manage:analysis', // 页面分析 
    PAGE_FLOW: 'data:manage:flow', // 页面流向 
    QA_RECORD: 'data:manage:record', // 问答记录 
    EVALUATE_LIST: 'data:manage:evaluate', // AI问答评价列表
    SYS_ABNORMAL_LIST: 'data:manage:abnormal', // 系统异常列表
    COMPANY_MANAGE: 'company:manage', // 企业名单管理
    COMPANY_LIST: 'company:manage:list', // 企业名单列表
    COM_FEEDBACK_LIST: 'company:manage:feedback', // 企业反馈列表
    FEEDBACK_MANAGE: 'feedback:manage', // 反馈管理
    OPINION_LIST: 'feedback:manage:opinion', // 意见列表
    OPINION_DETAIL: 'feedback:manage:opinion:detail', // 意见详情
}

// 路由组件地址的常量
export const ROUTE_ELEMENT_PATH = {
    HOME: 'Home', // 首页
    NOT_FOUND: 'NotFound', // 404
    LOGIN: 'Login', // 登录
    RESET: 'Reset', // 重置密码
    STAFF_LIST: 'Staff/StaffList', // 员工列表
    ADD_STAFF: 'Staff/StaffDetail', // 新增员工
    EDIT_STAFF: 'Staff/StaffDetail', // 编辑员工
    STAFF_DETAIL: 'Staff/StaffDetail', // 员工详情
    CONSUMER_LIST: 'Consumer/ConsumerList', // 用户列表
    ADD_CONSUMER: 'Consumer/ConsumerDetail', // 新增用户
    EDIT_CONSUMER: 'Consumer/ConsumerDetail', // 编辑用户
    CONSUMER_DETAIL: 'Consumer/ConsumerDetail', // 用户详情
    FAVOR_LIST: 'Consumer/FavorList', // 收藏列表
    FAVOR_DETAIL: 'Consumer/FavorDetail', //收藏详情
    LOGIN_LIST: 'Consumer/LoginList', // 用户登录日志
    PAGE_ANALYSIS: 'Data/PageAnalysis', // 页面分析 
    PAGE_FLOW: 'Data/PageFlow', // 页面流向 
    QA_RECORD: 'Data/QARecord', // 问答记录 
    EVALUATE_LIST: 'Data/EvaluateList', // AI问答评价列表
    SYS_ABNORMAL_LIST: 'Data/SystemAbnormal', // 系统异常列表
    COMPANY_LIST: 'Company/CompanyList', // 企业列表
    COM_FEEDBACK_LIST: 'Company/ComFeedbackList', // 企业反馈列表
    OPINION_LIST: 'Feedback/OpinionList', // 意见列表
    OPINION_DETAIL: 'Feedback/OpinionDetail', // 意见详情
}

// 路由图标的常量
export const ROUTE_ICON: Record<string, React.ComponentType | React.ReactNode> = {
    [ROUTE_KEY.HOME]: HomeOutlined, // 首页
    [ROUTE_KEY.STAFF_MANAGE]: SolutionOutlined, // 员工管理
    [ROUTE_KEY.CONSUMER_MANAGE]: UserOutlined, // 用户管理
    [ROUTE_KEY.DATA_MANAGE]: BarChartOutlined, // 数据管理
    [ROUTE_KEY.COMPANY_MANAGE]: AppstoreOutlined, // 企业名单管理   
    [ROUTE_KEY.FEEDBACK_MANAGE]: BookOutlined, // 反馈管理
}
