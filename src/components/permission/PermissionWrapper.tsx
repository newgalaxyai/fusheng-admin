import React, { ReactNode } from 'react';
import { usePermissionCheck } from '@/hooks/usePermission';

interface PermissionWrapperProps {
    children: ReactNode;
    requiredRole?: string[];
    requiredPermissions?: string[];
    fallback?: ReactNode; // 没有权限时显示的内容
    disableOnly?: boolean; // 是否仅禁用而不隐藏
}

const PermissionWrapper: React.FC<PermissionWrapperProps> = ({
    children,
    requiredRole,
    requiredPermissions,
    fallback = null,
    disableOnly = false
}) => {
    const { hasRole, hasPermission } = usePermissionCheck();

    // 检查角色权限
    const rolePermitted = requiredRole ? hasRole(requiredRole) : false;
    
    // 检查操作权限
    // const permissionPermitted = requiredPermissions ? hasPermission(requiredPermissions) : false;
    
    // 最终权限检查结果
    // const hasAccess = rolePermitted || permissionPermitted;
    const hasAccess = rolePermitted //暂时先只检查角色权限

    // 如果没有权限
    if (!hasAccess) {
        // 如果只是禁用，返回禁用状态的子组件
        if (disableOnly) {
            return React.cloneElement(children as React.ReactElement, {
                disabled: true,
                className: `${(children as React.ReactElement).props.className || ''} opacity-50 cursor-not-allowed`
            });
        }
        
        // 否则返回fallback内容或null
        return <>{fallback}</>;
    }

    return <>{children}</>;
};

export default PermissionWrapper; 