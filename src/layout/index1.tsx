import { Layout } from 'antd'
import { createStyles } from 'antd-style'
import { Outlet } from 'react-router'
import AppTitle from './AppTitle'
import { useAtomValue } from 'jotai'
import { appStore } from '~/store'
import AppMenu from './AppMenu'
import AppAction from './AppAction'

const useStyles = createStyles(() => ({
  appWrapper: {
    display: 'flex',
    width: '100vw',
    height: '100vh'
  },
  sider: {
    '& > .ant-layout-sider-children': {
      display: 'flex',
      flexDirection: 'column',
      height: '100%'
    }
  },
  menuWrapper: {
    flex: 1,
    minHeight: 0,
    overflowY: 'auto',
    overflowX: 'hidden'
  },
  actionWrapper: {
    marginTop: 'auto',
    height: '72px',
    borderTop: '1px solid #f0f0f0',
    padding: '10px 12px',
    display: 'flex',
    alignItems: 'center'
  },
  content: {
    padding: '25px'
  }
}))

export default function AppLayout() {
  const { Sider, Content } = Layout
  const { styles } = useStyles()
  const navCollapsed = useAtomValue(appStore.navCollapsedAtom)

  return (
    <Layout className={styles.appWrapper}>
      <Sider
        theme="light"
        collapsed={!navCollapsed}
        collapsible
        className={styles.sider}
        trigger={null}
        width={220}
        collapsedWidth={60}
      >
        <AppTitle collapsed={navCollapsed} />
        <div className={styles.menuWrapper}>
          <AppMenu collapsed={navCollapsed} />
        </div>
        <div className={styles.actionWrapper}>{<AppAction />}</div>
      </Sider>
      <Layout>
        <Content className={styles.content}>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  )
}
