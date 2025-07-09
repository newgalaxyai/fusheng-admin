import React from 'react'
import type { FC, ReactNode } from 'react'
import { useAuth } from '@/hooks/useAuth'

interface IProps {
    children?: ReactNode,
    requiresAuth: boolean,
    redirect?: string
}

const AuthRouteComponent: FC<IProps> = ({ children, requiresAuth, redirect }) => {
    useAuth(requiresAuth, redirect)
    return <>{children}</>
}

export default AuthRouteComponent
