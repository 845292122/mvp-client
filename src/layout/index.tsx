import { Layout } from 'antd'
import { createStyles } from 'antd-style'
import { useAtomValue } from 'jotai'
import { Outlet } from 'react-router'
import { appStore } from '~/store'
import AppNav from './AppNav'
import AppHeader from './AppHeader'
import Profile from './Profile'
import { useState } from 'react'
import ProfileContext from '~/context/ProfileContext'

const useStyles = createStyles(() => {
  return {
    appContainer: {
      display: 'flex',
      width: '100vw',
      height: '100vh'
    }
  }
})

const AppLayout = () => {
  const { Sider, Content } = Layout
  const { styles } = useStyles()
  const navCollapsed = useAtomValue(appStore.navCollapsedAtom)
  const [visible, setVisible] = useState<boolean>(false)
  const closeProfile = () => {
    setVisible(false)
  }
  const openProfile = () => {
    setVisible(true)
  }

  return (
    <Layout className={styles.appContainer}>
      <Sider collapsed={!navCollapsed} width={230}>
        <AppNav collapsed={navCollapsed} />
      </Sider>
      <Layout>
        <ProfileContext.Provider value={{ visible, closeProfile, openProfile }}>
          <AppHeader />
          <Content
            style={{
              padding: '30px',
              height: '100%',
              overflow: 'auto'
            }}
          >
            <Outlet />
          </Content>
          <Profile />
        </ProfileContext.Provider>
      </Layout>
    </Layout>
  )
}

export default AppLayout
