import {
    IRecord
} from './type'

// 公共常量
// 性别
export const SEX_NAME = {
    SEX_SECRET: 0,
    SEX_MAN: 1,
    SEX_WOMAN: 2,
}
export const SEX: Record<number, IRecord> = {
    [SEX_NAME.SEX_SECRET]: {
        text: '保密',
    },
    [SEX_NAME.SEX_MAN]: {
        text: '男',
    },
    [SEX_NAME.SEX_WOMAN]: {
        text: '女',
    },
}

// 学历
export const EDUCATION_NAME = {
    EDUCATION_DOCTOR: 'DOCTOR',
    EDUCATION_MASTER: 'MASTER',
    EDUCATION_BACHELOR: 'BACHELOR',
    EDUCATION_COLLEGE: 'COLLEGE',
    EDUCATION_HIGH_SCHOOL: 'HIGH_SCHOOL',
    EDUCATION_OTHER: 'OTHER',
}
export const EDUCATION: Record<string, IRecord> = {
    [EDUCATION_NAME.EDUCATION_DOCTOR]: {
        text: '博士',
    },
    [EDUCATION_NAME.EDUCATION_MASTER]: {
        text: '硕士',
    },
    [EDUCATION_NAME.EDUCATION_BACHELOR]: {
        text: '本科',
    },
    [EDUCATION_NAME.EDUCATION_COLLEGE]: {
        text: '专科',
    },
    [EDUCATION_NAME.EDUCATION_HIGH_SCHOOL]: {
        text: '高中',
    },
    [EDUCATION_NAME.EDUCATION_OTHER]: {
        text: '其他',
    },
}

// 婚姻状态
export const MARRIAGE_NAME = {
    MARRIAGE_SINGLE: 'SINGLE',
    MARRIAGE_MARRIED: 'MARRIED',
    MARRIAGE_DIVORCED: 'DIVORCED',
    MARRIAGE_WIDOWED: 'WIDOWED',
}
export const MARRIAGE: Record<string, IRecord> = {
    [MARRIAGE_NAME.MARRIAGE_SINGLE]: {
        text: '未婚',
    },
    [MARRIAGE_NAME.MARRIAGE_MARRIED]: {
        text: '已婚',
    },
    [MARRIAGE_NAME.MARRIAGE_DIVORCED]: {
        text: '离异',
    },
    [MARRIAGE_NAME.MARRIAGE_WIDOWED]: {
        text: '丧偶',
    },
}

// 身份证件
export const CERTIFICATE_TYPE_NAME = {
    CERTIFICATE_TYPE_ID_CARD: 'ID_CARD',
    CERTIFICATE_TYPE_PASSPORT: 'PASSPORT',
    CERTIFICATE_TYPE_MILITARY_ID: 'MILITARY_ID',
    CERTIFICATE_TYPE_OTHER: 'OTHER',
}
export const CERTIFICATE_TYPE: Record<string, IRecord> = {
    [CERTIFICATE_TYPE_NAME.CERTIFICATE_TYPE_ID_CARD]: {
        text: '居民身份证',
    },
    [CERTIFICATE_TYPE_NAME.CERTIFICATE_TYPE_PASSPORT]: {
        text: '护照',
    },
    [CERTIFICATE_TYPE_NAME.CERTIFICATE_TYPE_MILITARY_ID]: {
        text: '军官证',
    },
    [CERTIFICATE_TYPE_NAME.CERTIFICATE_TYPE_OTHER]: {
        text: '其他',
    },
}

// 登录方式
export const LOGIN_TYPE_NAME = {
    MINIPROGRAM: 1,
}
export const LOGIN_TYPE: Record<number, IRecord> = {
    [LOGIN_TYPE_NAME.MINIPROGRAM]: {
        text: '小程序登录',
    },
}

// 流向
export const FLOW_DIRECTION_NAME = {
    FLOW_DIRECTION_IN: 0,
    FLOW_DIRECTION_OUT: 1,
}
export const FLOW_DIRECTION: Record<number, IRecord> = {
    [FLOW_DIRECTION_NAME.FLOW_DIRECTION_IN]: {
        text: '流入',
    },
    [FLOW_DIRECTION_NAME.FLOW_DIRECTION_OUT]: {
        text: '流出',
    },
}

// 消息
export const MESSAGE_ROLE_NAME = {
    MESSAGE_ROLE_USER: 'user',
    MESSAGE_ROLE_AI: 'ai',
}
export const MESSAGE_ROLE: Record<string, IRecord> = {
    [MESSAGE_ROLE_NAME.MESSAGE_ROLE_USER]: {
        text: '用户',
        color: '#87d068',
    },
    [MESSAGE_ROLE_NAME.MESSAGE_ROLE_AI]: {
        text: 'AI',
        color: '#108ee9',
    },
}

// 状态
export const STATUS_NAME = {
    ENABLE: 0,
    DISABLE: 1,
}
export const STATUS: Record<number, IRecord> = {
    [STATUS_NAME.ENABLE]: {
        text: '启用',
        status: 'Success',
        boolean: true,
    },
    [STATUS_NAME.DISABLE]: {
        text: '禁用',
        status: 'Error',
        boolean: false,
    },
}
