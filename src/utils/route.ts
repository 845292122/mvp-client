import BizRoutes from '~/router/routes'

type PermissionNode = {
  key: string
  title: string
  icon?: string
  children?: PermissionNode[]
}

export function generatePermission(routes: RouteType.RouteInfo[]): PermissionNode[] {
  return routes.flatMap(route => {
    if (route.children) {
      const children = generatePermission(route.children)
      if (children.length > 0 && route.meta?.perm) {
        return [
          {
            key: route.meta.perm,
            title: route.meta.title,
            children
          }
        ]
      }
      return children
    }
    if (route.meta?.perm) {
      return [
        {
          key: route.meta.perm,
          title: route.meta.title
        }
      ]
    }
    return []
  })
}

export function generatePermissionByBizRoutes(): PermissionNode[] {
  return generatePermission(BizRoutes)
}

export function getParentKeys(routes: RouteType.RouteInfo[]): string[] {
  const parentKeys: string[] = []
  routes.forEach(route => {
    if (route?.meta?.key && route?.children && route?.meta?.perm) {
      parentKeys.push(route.meta.key)
    }
    if (route.children) {
      parentKeys.push(...getParentKeys(route.children))
    }
  })
  return parentKeys
}

export function filterChildKeys(keys: string[]): string[] {
  const parentKeys = getParentKeys(BizRoutes)
  return keys.filter(key => !parentKeys.includes(key))
}
