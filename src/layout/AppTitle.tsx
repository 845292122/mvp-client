import { createStyles } from 'antd-style'
import AppLogo from '~/assets/react.svg'

const useStyles = createStyles(() => ({
  wrapper: {
    display: 'flex',
    padding: '10px 0',
    alignItems: 'center',
    height: '56px'
  },
  collapsedWrapper: {
    justifyContent: 'center'
  },
  unCollapsedWrapper: {
    marginLeft: '20px'
  },
  title: {
    marginLeft: '8px',
    maxWidth: '120px',
    flexShrink: '0',
    fontSize: '16px',
    fontWeight: 'bold'
  }
}))

export default function AppTitle({ collapsed }: { collapsed: boolean }) {
  const title = import.meta.env.VITE_APP_TITLE
  const { styles } = useStyles()

  return (
    <div
      className={`${styles.wrapper} ${collapsed ? styles.unCollapsedWrapper : styles.collapsedWrapper}`}
    >
      <img src={AppLogo} alt="logo" />
      {collapsed && <span className={styles.title}>{title}</span>}
    </div>
  )
}
