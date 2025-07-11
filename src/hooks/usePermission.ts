import { useAppSelector } from "@/hooks/useAppStore";

// 权限检查
export const usePermissionCheck = () => {
    const { userRole, permissions } = useAppSelector(state => state.user);

    // 检查角色权限
    const hasRole = (requiredRole: string[] | undefined): boolean => {
        const superAdmin = ['super']; // 超级管理员

        if (!requiredRole) {
            throw new Error('请设置角色权限标签值');
        }

        // 超级管理员或者用户权限大于等于所需角色权限
        return superAdmin.includes(userRole) || requiredRole.includes(userRole);
    };

    const hasPermission = (requiredPermissions: string[] | undefined): boolean => {
        const allPermission = "*:*:*"; // 所有权限

        if (!requiredPermissions || requiredPermissions.length === 0) {
            throw new Error('请设置操作权限标签值');
        }

        return permissions.some(permission =>
            allPermission === permission || requiredPermissions.includes(permission)
        );
    };

    return { hasRole, hasPermission };
};