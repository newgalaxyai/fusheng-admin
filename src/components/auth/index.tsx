import React from 'react'
import type { FC, ReactNode } from 'react'
import { useAuth } from '@/hooks/useAuth'

interface IProps {
    children?: ReactNode,
    requiresAuth: boolean,
}

const AuthRouteComponent: FC<IProps> = ({ children, requiresAuth }) => {
    useAuth(requiresAuth)
    return <>{children}</>
}

export default AuthRouteComponent
