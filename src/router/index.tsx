import { Navigate } from 'react-router-dom'
import Lazy from './lazy'
import { IRoute } from '@/redux/types/route'
import AuthRouteComponent from '@/components/auth'
import { HOME_PATH, NOT_FOUND_PATH, LOGIN_PATH, RESET_PATH } from '@/utils/constants'

const routes: IRoute[] = [
  {
    key: 'notFound',
    parentKey: '',
    order: -1,
    type: -1,
    path: '*',
    hideInMenu: true,
    element: (
      <AuthRouteComponent requiresAuth={false} redirect={NOT_FOUND_PATH}>
        <Navigate to={NOT_FOUND_PATH} replace />
      </AuthRouteComponent>
    )
  },
  {
    key: '404',
    parentKey: '',
    order: -1,
    type: -1,
    path: NOT_FOUND_PATH,
    hideInMenu: true,
    element: Lazy(() => import('@/views/NotFound'))
  },
  {
    key: 'login',
    parentKey: '',
    order: -1,
    type: -1,
    path: LOGIN_PATH,
    hideInMenu: true,
    element: Lazy(() => import('@/views/Login'))
  },
  {
    key: 'reset',
    parentKey: '',
    order: -1,
    type: -1,
    path: RESET_PATH,
    hideInMenu: true,
    element: Lazy(() => import('@/views/Reset'))
  },
  {
    key: 'default',
    parentKey: '',
    order: -1,
    type: -1,
    path: '/',
    hideInMenu: true,
    element: (
      <AuthRouteComponent requiresAuth={false}>
        <Navigate to={HOME_PATH} replace />
      </AuthRouteComponent>
    )
  },
]

export default routes
