import { RouteInfo } from '~/router'
import BizRoutes from '~/router/routes'

type BuildCtx = {
  token?: string
  role?: string
}

function canDisplay(route: RouteInfo, ctx: BuildCtx): boolean {
  const meta = route.meta
  if (!meta) return true
  if (meta.hidden) return false
  if (meta.needAuth && ctx.token) return false
  if (meta.needRoles && meta.needRoles.length > 0) {
    if (!ctx.role) return false
    return meta.needRoles.includes(ctx.role)
  }
  return true
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function travel(list: RouteInfo[], ctx: BuildCtx): any[] {
  return list
    .map(route => {
      const children = route.children ? travel(route.children, ctx) : []

      const display = canDisplay(route, ctx)

      if (!display) {
        // 父级不显示：把可显示的子节点上浮
        return children.length ? children : null
      }

      // 构造当前节点
      const meta = route.meta

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const node: any = {
        path: route.path || '/',
        name: meta?.title ?? '未知',
        icon: meta?.icon ?? null
      }

      if (children.length) node.routes = children
      return node
    })
    .flat()
    .filter(Boolean)
}

// * 生成 ProLayout 需要的 route 对象
export function buildProLayoutMenu(ctx: BuildCtx) {
  const allRootChildren: RouteInfo[] = []
  BizRoutes.forEach(r => {
    if (r.children && !r.meta) {
      allRootChildren.push(...r.children)
    } else {
      allRootChildren.push(r)
    }
  })

  return {
    routes: travel(allRootChildren, ctx)
  }
}
