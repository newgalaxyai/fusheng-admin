import { Navigate } from 'react-router-dom'
import Lazy from './lazy'
import { IRoute } from '@/redux/types/route'
import { HomeOutlined } from '@ant-design/icons'
import LayoutComponent from '@/components/layout'

const routes: IRoute[] = [
  {
    key: 'notFound',
    parentKey: '',
    order: -1,
    type: -1,
    path: '*',
    hideInMenu: true,
    element: <Navigate to="/404" replace />
  },
  {
    key: '404',
    parentKey: '',
    order: -1,
    type: -1,
    path: '/404',
    hideInMenu: true,
    element: Lazy(() => import('@/views/NotFound'))
  },
  {
    key: 'login',
    parentKey: '',
    order: -1,
    type: -1,
    path: '/login',
    hideInMenu: true,
    element: Lazy(() => import('@/views/Login'))
  },
  {
    key: 'reset',
    parentKey: '',
    order: -1,
    type: -1,
    path: '/reset',
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
    element: <Navigate to="/home" replace />
  },
]

export default routes
