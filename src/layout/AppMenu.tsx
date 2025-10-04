import { HamburgerButton } from '@icon-park/react'
import { Menu, MenuProps } from 'antd'
import { useAtomValue } from 'jotai'
import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router'
import BizRoutes from '~/router/routes'
import { authStore } from '~/store'

type MenuItem = Required<MenuProps>['items'][number]

const getOpenKeys = (path: string) => {
  let newStr: string = ''
  const newArr = []
  const arr = path.split('/').map(i => '/' + i)
  for (let i = 1; i < arr.length - 1; i++) {
    newStr += arr[i]
    newArr.push(newStr)
  }
  return newArr
}

export default function AppMenu({ collapsed }: { collapsed: boolean }) {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const perms = useAtomValue(authStore.permAtom)
  const [menuList, setMenuList] = useState<MenuItem[]>([])
  const [openKeys, setOpenKeys] = useState<string[]>([])
  const [selectedKeys, setSelectedKeys] = useState<string[]>([pathname])
  const clickMenu = ({ key }: { key: string }) => {
    navigate(key)
  }

  const onOpenChange = (openKeys: string[]) => {
    if (openKeys.length === 0 || openKeys.length === 1) return setOpenKeys(openKeys)
    const latestOpenKey = openKeys[openKeys.length - 1]
    if (latestOpenKey.includes(openKeys[0])) return setOpenKeys(openKeys)
    setOpenKeys([latestOpenKey])
  }

  useEffect(() => {
    setSelectedKeys([pathname])
    if (collapsed) {
      setOpenKeys(getOpenKeys(pathname))
    }
  }, [pathname, collapsed])

  useEffect(() => {
    const filterAndConvertMenuByPerms = (
      routes: RouteType.RouteInfo[],
      perms: string[]
    ): MenuItem[] => {
      return routes.flatMap(route => {
        if (route.children) {
          const filteredChildren = filterAndConvertMenuByPerms(route.children, perms)
          if (filteredChildren.length > 0 && route.meta?.key) {
            return [
              {
                key: route.meta.key,
                label: route.meta.title,
                icon: route.meta.icon,
                children: filteredChildren
              }
            ]
          }
          return filteredChildren
        }
        if (
          (route.meta?.perm && perms.includes(route.meta.perm) && !route.meta.hidden) ||
          (!route.meta.perm && !route.meta.hidden)
        ) {
          return [
            {
              key: route.meta.key,
              label: route.meta.title,
              icon: route.meta.icon ?? <HamburgerButton theme="outline" size="14" />
            }
          ]
        }
        return []
      })
    }

    const filterMenuList = filterAndConvertMenuByPerms(BizRoutes, perms)
    console.log(perms)
    console.log(filterMenuList)
    setMenuList(filterMenuList)
  }, [perms])

  return (
    <Menu
      items={menuList}
      mode="inline"
      selectedKeys={selectedKeys}
      openKeys={openKeys}
      triggerSubMenuAction="click"
      inlineIndent={24}
      onClick={clickMenu}
      onOpenChange={onOpenChange}
      style={{
        borderRight: 0
      }}
    />
  )
}
