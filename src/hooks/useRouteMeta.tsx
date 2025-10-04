import { useLocation } from 'react-router'
import { findRoute } from '~/router/guard'
import BizRoutes from '~/router/routes'

export const useRouteMeta = (): RouteType.RouteMeta => {
  const { pathname } = useLocation()
  const route = findRoute(pathname, BizRoutes)
  const defaultMeta: RouteType.RouteMeta = {
    title: '',
    key: ''
  }
  return route?.meta || defaultMeta
}
