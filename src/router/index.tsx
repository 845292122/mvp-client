import { Navigate, useRoutes, type RouteObject } from 'react-router'
import Login from '~/pages/login/index'
import BizRoutes from './routes'

export type RouteMeta = {
  title: string
  needAuth?: boolean
  needRoles?: string[]
  hidden?: boolean
  icon?: React.ReactNode
}

export type RouteInfo = RouteObject & {
  meta?: RouteMeta
  children?: RouteInfo[]
}

export const routes: RouteInfo[] = [
  {
    path: '/login',
    element: <Login />,
    meta: {
      title: '登录'
    }
  },
  ...BizRoutes,
  {
    path: '*',
    element: <Navigate to="/404" />
  }
]
const Router = () => useRoutes(routes)

export default Router
