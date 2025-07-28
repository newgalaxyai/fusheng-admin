import {
    IStaffRole
} from '@/api/type';
import { STAFF_ROLE, STAFF_ROLE_NAME } from '@/constants';

export const getStaffRole = (roleList: IStaffRole[] = []) => {
    // 角色列表中有超管角色
    if (roleList.some(role => role.code === STAFF_ROLE_NAME.SUPER)) {
        // 只有超管角色
        if (roleList.length === 1) {
            return STAFF_ROLE_NAME.SUPER;
        }
        // 除了超管角色，还有别的角色
        else {
            // 取出其他角色
            const role = roleList.filter(role => role.code !== STAFF_ROLE_NAME.SUPER);
            // 校验角色
            // 角色权限大于等于管理员角色权限
            if (role.some(role => role.code === STAFF_ROLE_NAME.ADMIN)) {
                return STAFF_ROLE_NAME.ADMIN;
            }
            // 角色权限大于等于普通用户角色权限
            else if (role.some(role => role.code === STAFF_ROLE_NAME.STAFF)) {
                return STAFF_ROLE_NAME.STAFF;
            }
            // 角色权限小于普通用户角色权限，即没有设置角色
            else {
                return ''
            }
        }
    }
    // 没有超管角色
    else {
        return ''
    }
};

export const getStringStaffRole = (roleList: string[] = []) => {
    // 角色列表中有超管角色
    if (roleList.some(role => role === STAFF_ROLE_NAME.SUPER)) {
        // 只有超管角色
        if (roleList.length === 1) {
            return STAFF_ROLE_NAME.SUPER;
        }
        // 除了超管角色，还有别的角色
        else {
            // 取出其他角色
            const role = roleList.filter(role => role !== STAFF_ROLE_NAME.SUPER);
            // 校验角色
            // 角色权限大于等于管理员角色权限
            if (role.some(role => role === STAFF_ROLE_NAME.ADMIN)) {
                return STAFF_ROLE_NAME.ADMIN;
            }
            // 角色权限大于等于普通用户角色权限
            else if (role.some(role => role === STAFF_ROLE_NAME.STAFF)) {
                return STAFF_ROLE_NAME.STAFF;
            }
            // 角色权限小于普通用户角色权限，即没有设置角色
            else {
                return ''
            }
        }
    }
    // 没有超管角色
    else {
        return ''
    }
};

export const getIDStaffRole = (roleList: number[] = []) => {
    // 角色列表中有超管角色
    if (roleList.some(role => role === STAFF_ROLE[STAFF_ROLE_NAME.SUPER].id)) {
        // 只有超管角色
        if (roleList.length === 1) {
            return STAFF_ROLE_NAME.SUPER;
        }
        // 除了超管角色，还有别的角色
        else {
            // 取出其他角色
            const role = roleList.filter(role => role !== STAFF_ROLE[STAFF_ROLE_NAME.SUPER].id);
            // 校验角色
            // 角色权限大于等于管理员角色权限
            if (role.some(role => role === STAFF_ROLE[STAFF_ROLE_NAME.ADMIN].id)) {
                return STAFF_ROLE_NAME.ADMIN;
            }
            // 角色权限大于等于普通用户角色权限
            else if (role.some(role => role === STAFF_ROLE[STAFF_ROLE_NAME.STAFF].id)) {
                return STAFF_ROLE_NAME.STAFF;
            }
            // 角色权限小于普通用户角色权限，即没有设置角色
            else {
                return ''
            }
        }
    }
    // 没有超管角色
    else {
        return ''
    }
};
