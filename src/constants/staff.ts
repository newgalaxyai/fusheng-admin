import {
    IRecord,
} from './type'

// 员工角色名
export const STAFF_ROLE_NAME = {
    SUPER: 'super_admin',
    ADMIN: 'admin',
    STAFF: 'staff',
}

// 员工角色
export const STAFF_ROLE: Record<string, IRecord> = {
    [STAFF_ROLE_NAME.SUPER]: {
        text: '超级管理员',
        color: 'success',
        id: 1
    },
    [STAFF_ROLE_NAME.ADMIN]: {
        text: '管理员',
        color: 'processing',
        id: 160
    },
    [STAFF_ROLE_NAME.STAFF]: {
        text: '员工',
        color: 'default',
        id: 161
    },
}
