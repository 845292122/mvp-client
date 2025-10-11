import { InfoCircleFilled, QuestionCircleFilled } from '@ant-design/icons'
import { PageContainer, ProLayout } from '@ant-design/pro-components'
import type { ProLayoutProps } from '@ant-design/pro-components'
import { useAtomValue } from 'jotai'
import { Suspense } from 'react'
import { Link, Outlet, useLocation, useNavigate } from 'react-router'
import AppLogo from '~/assets/react.svg'
import { authStore } from '~/store'
import { buildProLayoutMenu } from '~/utils'

export default function AppLayout() {
  const location = useLocation()
  const navigate = useNavigate()
  const tokenVal = useAtomValue(authStore.tokenAtom)

  // TODO role暂时写死
  const proRoute: ProLayoutProps['route'] = buildProLayoutMenu({
    token: tokenVal,
    role: 'admin'
  })

  console.log(proRoute)

  return (
    <ProLayout
      title="管理后台"
      logo={AppLogo}
      fixSiderbar
      siderWidth={216}
      bgLayoutImgList={[
        {
          src: 'https://img.alicdn.com/imgextra/i2/O1CN01O4etvp1DvpFLKfuWq_!!6000000000279-2-tps-609-606.png',
          left: 85,
          bottom: 100,
          height: '303px'
        },
        {
          src: 'https://img.alicdn.com/imgextra/i2/O1CN01O4etvp1DvpFLKfuWq_!!6000000000279-2-tps-609-606.png',
          bottom: -68,
          right: -45,
          height: '303px'
        },
        {
          src: 'https://img.alicdn.com/imgextra/i3/O1CN018NxReL1shX85Yz6Cx_!!6000000005798-2-tps-884-496.png',
          bottom: 0,
          left: 0,
          width: '331px'
        }
      ]}
      avatarProps={{
        src: 'https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg',
        title: '七妮妮',
        size: 'small'
      }}
      actionsRender={props => {
        if (props.isMobile) return []
        return [
          <InfoCircleFilled key="InfoCircleFilled" />,
          <QuestionCircleFilled key="QuestionCircleFilled" />
        ]
      }}
      route={proRoute}
      menuItemRender={(item, dom) => (item.path ? <Link to={item.path}>{dom}</Link> : dom)}
      location={{ pathname: location.pathname }}
      onMenuHeaderClick={() => navigate('/')}
    >
      <PageContainer>
        <Suspense fallback={<div style={{ padding: 40 }}>Loading...</div>}>
          <Outlet />
        </Suspense>
      </PageContainer>
    </ProLayout>
  )
}
