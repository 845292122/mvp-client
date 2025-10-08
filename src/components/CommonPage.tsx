import { Typography } from 'antd'
import { createStyles } from 'antd-style'
import { useRouteMeta } from '~/hooks/useRouteMeta'

const useStyles = createStyles(() => ({
  wrapper: {
    display: 'flex',
    alignItems: 'center'
  }
}))

export default function CommonPage({ children }: { children: React.ReactNode }) {
  const routeMeta = useRouteMeta()
  const { styles } = useStyles()

  return (
    <>
      <div className={styles.wrapper}>
        <div
          style={{
            borderRadius: '0.5rem',
            height: '20px',
            width: '5px',
            marginRight: '5px',
            backgroundColor: '#1d1db7'
          }}
        />
        <Typography.Text strong style={{ fontSize: '16px' }}>
          {routeMeta.title}
        </Typography.Text>
      </div>
      <div style={{ marginTop: '30px' }}>{children}</div>
    </>
  )
}
