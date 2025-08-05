import { Tag } from "antd"
import { IRecord } from "./type"

// 处理状态枚举
export const FEED_STATUS_NAME = {
    PENDING: 'PENDING',
    PROCESSING: 'PROCESSING',
    PROCESSED: 'PROCESSED',
    CLOSED: 'CLOSED',
}
export const FEED_STATUS: Record<string, IRecord> = {
    [FEED_STATUS_NAME.PENDING]: {
        text: '待处理',
        status: 'warning',
        step: 0,
    },
    [FEED_STATUS_NAME.PROCESSING]: {
        text: '处理中',
        status: 'processing',
        step: 0,
    },
    [FEED_STATUS_NAME.PROCESSED]: {
        text: '已处理',
        status: 'success',
        step: 1,
    },
    [FEED_STATUS_NAME.CLOSED]: {
        text: '已关闭',
        status: 'default',
        step: 1,
    },
}

// 反馈类型枚举
export const FEED_CATEGORY_NAME = {
    GENERAL: 'GENERAL',
    BUG: 'BUG',
    FEATURE: 'FEATURE',
    COMPLAINT: 'COMPLAINT',
    OTHER: 'OTHER',
}
export const FEED_CATEGORY: Record<string, IRecord> = {
    [FEED_CATEGORY_NAME.GENERAL]: {
        text: <Tag
            bordered={false}
            color='success'
        >
            一般建议
        </Tag>,
    },
    [FEED_CATEGORY_NAME.BUG]: {
        text: <Tag
            bordered={false}
            color='error'
        >
            Bug
        </Tag>,
    },
    [FEED_CATEGORY_NAME.FEATURE]: {
        text: <Tag
            bordered={false}
            color='warning'
        >
            功能
        </Tag>,
    },
    [FEED_CATEGORY_NAME.COMPLAINT]: {
        text: <Tag
            bordered={false}
            color='error'
        >
            投诉
        </Tag>, 
    },
    [FEED_CATEGORY_NAME.OTHER]: {
        text: <Tag
            bordered={false}
            color='processing'
        >
            其他
        </Tag>,
    },
}
