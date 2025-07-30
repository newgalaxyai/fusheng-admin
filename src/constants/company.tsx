import { Tag } from "antd"
import { IRecord } from "./type"

// 企业经营状态
export const COMPANY_STATUS_NAME = {
    EXIST: 1,
    REVOKE: 2,
}
export const COMPANY_STATUS: Record<number, IRecord> = {
    [COMPANY_STATUS_NAME.EXIST]: {
        text: '存续',
    },
    [COMPANY_STATUS_NAME.REVOKE]: {
        text: '吊销',
    },
}

// 企业类型
export const COMPANY_TYPE_NAME = {
    STATE_OWNED: 1,
    FOREIGN_OWNED: 2,
}
export const COMPANY_TYPE: Record<number, IRecord> = {
    [COMPANY_TYPE_NAME.STATE_OWNED]: {
        text: '国有企业',
    },
    [COMPANY_TYPE_NAME.FOREIGN_OWNED]: {
        text: '外资企业',
    },
}

// 所属行业
export const INDUSTRY_NAME = {
    MANUFACTURING: 1,
}
export const INDUSTRY: Record<number, IRecord> = {
    [INDUSTRY_NAME.MANUFACTURING]: {
        text: '制造业',
    },
}

// 纳税人资质
export const TAX_TYPE_NAME = {
    ADDED_GENERAL: 1,
}
export const TAX_TYPE: Record<number, IRecord> = {
    [TAX_TYPE_NAME.ADDED_GENERAL]: {
        text: '增值税一般纳税人',
    },
}

// 经营范围
export const BUSINESS_SCOPE_NAME = {
    MANUFACTURING: 1,
}
export const BUSINESS_SCOPE: Record<number, IRecord> = {
    [BUSINESS_SCOPE_NAME.MANUFACTURING]: {
        text: '制造业',
    },
}

// 企业规模
export const PERSON_SCALE_NAME = {
    SMALL: 1,
    MIDDLE: 2,
    LARGE: 3,
}
export const PERSON_SCALE: Record<number, IRecord> = {
    [PERSON_SCALE_NAME.SMALL]: {
        text: '0-20人',
    },
    [PERSON_SCALE_NAME.MIDDLE]: {
        text: '20-99人',
    },
    [PERSON_SCALE_NAME.LARGE]: {
        text: '100人以上',
    },
}

// 反馈类型
export const FEED_TYPE_NAME = {
    EFFECTIVE: 1,
    INEFFECTIVE: 2,
}
export const FEED_TYPE: Record<number, IRecord> = {
    [FEED_TYPE_NAME.EFFECTIVE]: {
        text: <Tag
            color='processing'>
            有效线索
        </Tag>,
    },
    [FEED_TYPE_NAME.INEFFECTIVE]: {
        text: <Tag
            color='error'>
            无效线索
        </Tag>,
    },
}
