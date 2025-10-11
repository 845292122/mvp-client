import { Navigate, useRoutes } from 'react-router'
import Login from '~/pages/login'
import BizRoutes from './routes'

export type RouteMeta = {
  title: string
  key: string
  needAuth?: boolean
  needRoles?: string[]
  hidden?: boolean
  icon?: React.ReactNode
}

export type RouteInfo = {
  path?: string
  element?: React.ReactNode
  meta?: RouteMeta
  children?: RouteInfo[]
}

export const routes: RouteInfo[] = [
  {
    path: '/login',
    element: <Login />,
    meta: {
      title: '登录',
      key: 'login'
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
