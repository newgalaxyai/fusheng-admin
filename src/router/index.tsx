import React from 'react'
import { Navigate } from 'react-router-dom'
import type { RouteObject } from 'react-router-dom'
import Lazy from './lazy'

const routes: RouteObject[] = [
  {
    path: '*',
    element: Lazy(() => /* @vite-ignore */ import('@/views/NotFound'))
  }
]

export default routes
