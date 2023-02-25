import { lazy } from 'react'
import { type RouteObject } from 'react-router-dom'

import { ROUTES } from '~/main/types'

const Home = lazy(async () => import('../presentation/screens/home/home'))

export const notesRoutes: RouteObject[] = [
  {
    path: ROUTES.HOME,
    element: <Home />
  }
]
