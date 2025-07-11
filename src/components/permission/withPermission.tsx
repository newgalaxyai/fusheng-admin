import React from 'react';
import PermissionWrapper from './PermissionWrapper';

interface WithPermissionOptions {
    requiredRole?: string[];
    requiredPermissions?: string[];
    fallback?: React.ReactNode;
    disableOnly?: boolean;
}

// 高阶组件方式
export const withPermission = (options: WithPermissionOptions) => {
    return <P extends object>(Component: React.ComponentType<P>) => {
        const WrappedComponent = (props: P) => {
            return (
                <PermissionWrapper {...options}>
                    <Component {...props} />
                </PermissionWrapper>
            );
        };

        WrappedComponent.displayName = `withPermission(${Component.displayName || Component.name})`;
        return WrappedComponent;
    };
};

// 预定义的权限按钮组件
export const AdminButton = withPermission({ requiredRole: ['admin'] })(
    (props: React.ButtonHTMLAttributes<HTMLButtonElement>) => <button {...props} />
);

export const DeleteButton = withPermission({ 
    requiredPermissions: ['user:delete'],
    disableOnly: true 
})(
    (props: React.ButtonHTMLAttributes<HTMLButtonElement>) => 
        <button className="btn-danger" {...props} />
); 