import {
    IRecord,
} from './type'
import { Tag } from 'antd';

// 员工角色名
export const STAFF_ROLE_NAME = {
    SUPER: 'super_admin',
    ADMIN: 'admin',
    STAFF: 'staff',
}

// 员工角色
export const STAFF_ROLE: Record<string, IRecord> = {
    [STAFF_ROLE_NAME.SUPER]: {
        text: (
            <Tag
                color='success'
            >
                超级管理员
            </Tag>
        ),
        color: 'success',
        id: 1
    },
    [STAFF_ROLE_NAME.ADMIN]: {
        text: (
            <Tag
                color='processing'
            >
                管理员
            </Tag>
        ),
        color: 'processing',
        id: 160
    },
    [STAFF_ROLE_NAME.STAFF]: {
        text: (
            <Tag
                color='default'
            >
                员工
            </Tag>
        ),
        color: 'default',
        id: 161
    },
}
