import{
    IRecord
} from './type'

// 消费者来源
export const CONSUMER_SOURCE_NAME = {
    UNKNOWN: 0,
    MINIPROGRAM: 1,
}
export const CONSUMER_SOURCE: Record<number, IRecord> = {
    [CONSUMER_SOURCE_NAME.UNKNOWN]: {
        text: '未知来源',
    },
    [CONSUMER_SOURCE_NAME.MINIPROGRAM]: {
        text: '小程序',
    },
}

// 操作类型
export const CONSUMER_OPERATION_NAME = {
    REGISTER: 1,
    LOGOFF: 2,
    UPDATE: 3,
}
export const CONSUMER_OPERATION: Record<number, IRecord> = {
    [CONSUMER_OPERATION_NAME.REGISTER]: {
        text: '注册',
    },
    [CONSUMER_OPERATION_NAME.LOGOFF]: {
        text: '注销',
    },
    [CONSUMER_OPERATION_NAME.UPDATE]: {
        text: '修改',
    },
}
