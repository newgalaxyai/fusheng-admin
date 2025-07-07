import Lazy from './lazy'
import { RouteObject, Navigate, Outlet } from 'react-router-dom'

const routes: RouteObject[] = [
  {
    path: '*',
    element: <Navigate to="/404" />
  },
  {
    path: '/404',
    element: Lazy(() => /* @vite-ignore */ import('@/views/NotFound'))
  },
  {
    path: '/login',
    element: Lazy(() => /* @vite-ignore */ import('@/views/Login'))
  },
  {
    path: '/resetPassword',
    element: Lazy(() => /* @vite-ignore */ import('@/views/Reset'))
  },
  {
    path: '/',
    element: <Navigate to="/home" replace />
  },
]

export default routes
