import { DownOutlined, LogoutOutlined, ProfileTwoTone, UpOutlined } from '@ant-design/icons'
import { MenuFoldOne, MenuUnfoldOne } from '@icon-park/react'
import { Avatar, Button, Dropdown, MenuProps, message } from 'antd'
import { createStyles } from 'antd-style'
import { useAtom, useSetAtom } from 'jotai'
import { useState } from 'react'
import { useNavigate } from 'react-router'
import { appStore, authStore } from '~/store'

const useStyles = createStyles(() => ({
  wrapper: {
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12
  },
  profileTrigger: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    padding: '6px 8px',
    borderRadius: 8,
    cursor: 'pointer',
    transition: 'background-color .2s',
    userSelect: 'none',
    ':hover': {
      background: 'rgba(0,0,0,0.04)'
    }
  },
  avatar: {
    flexShrink: 0,
    marginRight: 10
  },
  textBlock: {
    display: 'flex',
    flexDirection: 'column',
    lineHeight: 1.15,
    flex: 1,
    overflow: 'hidden'
  },
  name: {
    fontSize: 13,
    fontWeight: 600,
    color: '#111',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    overflow: 'hidden'
  },
  sub: {
    marginTop: 4,
    fontSize: 12,
    color: '#888',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    overflow: 'hidden'
  },
  arrow: {
    marginLeft: 6,
    fontSize: 10,
    color: '#666'
  },
  toggleWrap: {
    display: 'flex',
    alignItems: 'center',
    gap: 6
  }
}))

export default function AppAction() {
  const { styles } = useStyles()
  const navigate = useNavigate()
  const setToken = useSetAtom(authStore.tokenAtom)
  const setAuthInfo = useSetAtom(authStore.authInfoAtom)
  const setPerms = useSetAtom(authStore.permAtom)
  const [collapseMenu, setCollapseMenu] = useAtom(appStore.navCollapsedAtom)
  const [menuOpen, setMenuOpen] = useState(false) // 新增：控制下拉打开状态

  const toggleCollapseMenu = () => {
    setCollapseMenu(!collapseMenu)
  }

  const logout = () => {
    setToken(undefined)
    setAuthInfo(undefined)
    setPerms([])
    navigate('/login')
    message.success('注销成功')
  }

  const items: MenuProps['items'] = [
    {
      key: 'profile',
      label: '个人信息',
      icon: <ProfileTwoTone style={{ fontSize: '16px' }} />
      // onClick: openProfile
    },

    {
      key: 'logout',
      icon: <LogoutOutlined style={{ fontSize: '16px' }} />,
      danger: true,
      onClick: logout,
      label: '注销登录'
    }
  ]

  return (
    <div className={styles.wrapper}>
      {collapseMenu ? (
        <Dropdown
          menu={{ items }}
          placement="top"
          trigger={['click']}
          overlayStyle={{ minWidth: 160 }}
          open={menuOpen}
          onOpenChange={setMenuOpen}
        >
          <div className={styles.profileTrigger}>
            <Avatar shape="square" style={{ marginRight: '10px' }} className={styles.avatar} />
            <div className={styles.textBlock}>
              <span className={styles.name}>超级管理员</span>
              <span className={styles.sub}>运营控制台</span>
            </div>
            {menuOpen ? (
              <UpOutlined className={styles.arrow} />
            ) : (
              <DownOutlined className={styles.arrow} />
            )}
          </div>
        </Dropdown>
      ) : null}

      <div className={styles.toggleWrap}>
        <Button
          type="text"
          icon={
            collapseMenu ? (
              <MenuUnfoldOne
                theme="outline"
                size="24"
                fill="#020202"
                strokeWidth={3}
                strokeLinecap="square"
              />
            ) : (
              <MenuFoldOne
                theme="outline"
                size="24"
                fill="#020202"
                strokeWidth={3}
                strokeLinecap="square"
              />
            )
          }
          onClick={toggleCollapseMenu}
        />
      </div>
    </div>
  )
}
