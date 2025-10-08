import AppLayout from '~/layout'
import Home from '~/pages/common/home'
import { HomeTwo, SettingTwo } from '@icon-park/react'
import React, { lazy } from 'react'
import { Spin } from 'antd'

const Loading = () => {
  return (
    <div className="flex items-center justify-center">
      <Spin />
    </div>
  )
}

const lazyLoad = (importFunc: () => Promise<{ default: React.ComponentType }>) => {
  const Component = lazy(importFunc)
  return (
    <React.Suspense fallback={<Loading />}>
      <Component />
    </React.Suspense>
  )
}

const BizRoutes: RouteType.RouteInfo[] = [
  // * 通用路由
  {
    element: <AppLayout />,
    children: [
      {
        path: '/',
        element: <Home />,
        meta: {
          title: '首页',
          key: '/',
          icon: <HomeTwo theme="outline" size="18" strokeLinecap="square" />
        }
      }
    ]
  },

  // * 系统业务路由
  {
    element: <AppLayout />,
    meta: {
      key: '/system',
      title: '系统管理',
      perm: 'system',
      icon: <SettingTwo theme="outline" size="18" strokeLinecap="square" />
    },
    children: [
      {
        path: '/system/tenant',
        element: lazyLoad(() => import('~/pages/system/tenant')),
        meta: {
          title: '租户管理',
          key: '/system/tenant',
          perm: 'system:tenant'
        }
      },
      {
        path: '/system/user',
        element: lazyLoad(() => import('~/pages/system/user')),
        meta: {
          title: '用户管理',
          key: '/system/user',
          perm: 'system:user'
        }
      },
      {
        path: '/system/account',
        element: lazyLoad(() => import('~/pages/system/account')),
        meta: {
          title: '账号管理',
          key: '/system/account',
          perm: 'system:account'
        }
      },
      {
        path: '/system/log',
        element: lazyLoad(() => import('~/pages/system/log')),
        meta: {
          title: '操作日志',
          key: '/system/log',
          perm: 'system:log'
        }
      }
    ]
  },

  // * 错误页面路由
  {
    element: <AppLayout />,
    children: [
      {
        path: '/403',
        element: lazyLoad(() => import('~/pages/error/Unauthorized')),
        meta: {
          title: '未授权',
          key: '403',
          hidden: true,
          requireAuth: true
        }
      },
      {
        path: '/404',
        element: lazyLoad(() => import('~/pages/error/NotFound')),
        meta: {
          title: '页面飞走了~',
          hidden: true,
          key: '404'
        }
      }
    ]
  }
]

export default BizRoutes
