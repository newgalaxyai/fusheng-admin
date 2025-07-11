import { Navigate } from 'react-router-dom'
import Lazy from './lazy'
import { IRoute } from '@/redux/types/route'
import AuthRouteComponent from '@/components/auth'
import { ROUTE_KEY, ROUTE_PATH, ROUTE_ELEMENT_PATH } from '@/utils/constants'
import LayoutComponent from '@/components/layout'

const routes: IRoute[] = [
  {
    key: ROUTE_KEY.NOT_FOUND,
    parentKey: '',
    order: -1,
    type: -1,
    path: '*',
    hideInMenu: true,
    element: (
      <AuthRouteComponent requiresAuth={false} redirect={ROUTE_PATH.NOT_FOUND}>
        <Navigate to={ROUTE_PATH.NOT_FOUND} replace />
      </AuthRouteComponent>
    )
  },
  {
    key: ROUTE_KEY.NOT_404,
    parentKey: '',
    order: -1,
    type: -1,
    path: ROUTE_PATH.NOT_FOUND,
    hideInMenu: true,
    element: Lazy(() => import( /* @vite-ignore */ ROUTE_ELEMENT_PATH.NOT_FOUND))
  },
  {
    key: ROUTE_KEY.LOGIN,
    parentKey: '',
    order: -1,
    type: -1,
    path: ROUTE_PATH.LOGIN,
    hideInMenu: true,
    element: Lazy(() => import( /* @vite-ignore */ ROUTE_ELEMENT_PATH.LOGIN))
  },
  {
    key: ROUTE_KEY.RESET,
    parentKey: '',
    order: -1,
    type: -1,
    path: ROUTE_PATH.RESET,
    hideInMenu: true,
    element: Lazy(() => import( /* @vite-ignore */ ROUTE_ELEMENT_PATH.RESET))
  },
  {
    key: ROUTE_KEY.DEFAULT,
    parentKey: '',
    order: -1,
    type: -1,
    path: '/',
    hideInMenu: true,
    element: (
      <AuthRouteComponent requiresAuth={false}>
        <Navigate to={ROUTE_PATH.HOME} replace />
      </AuthRouteComponent>
    )
  },
]

export default routes
