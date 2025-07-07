import { Navigate } from 'react-router-dom'
import Lazy from './lazy'
import { IRoute } from '@/redux/types/route'
import { HomeOutlined } from '@ant-design/icons'

const routes: IRoute[] = [
  {
    key: 'notFound',
    parentKey: '',
    order: -1,
    type: -1,
    path: '*',
    hideInMenu: true,
    element: <Navigate to="/" replace />
  },
  {
    key: 'notFound',
    parentKey: '',
    order: -1,
    type: -1,
    path: '/',
    hideInMenu: true,
    element: <Navigate to="/home" replace />
  },
  // 首页
  {
    name: '首页',
    key: 'home',
    icon: <HomeOutlined />,
    parentKey: '',
    order: 0,
    type: 2,
    hideInMenu: false,
    path: '/home',
    element: Lazy(() => import('@/views/Home'))
  },
]

export default routes
