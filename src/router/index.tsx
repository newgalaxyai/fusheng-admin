import Lazy from './lazy'
import { RouteObject, Navigate } from 'react-router-dom'

const routes: RouteObject[] = [
  {
    path: '*',
    element: Lazy(() => /* @vite-ignore */ import('@/views/NotFound'))
  },
  {
    path: '/login',
    element: Lazy(() => /* @vite-ignore */ import('@/views/Login'))
  },
  {
    path: '/',
    element: <Navigate to="/home" replace />
  },
]

export default routes
