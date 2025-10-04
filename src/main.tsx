import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import Router from './router'
import AuthGuard from './router/guard'
import { ConfigProvider, ThemeConfig } from 'antd'
import zhCN from 'antd/locale/zh_CN'
import './main.css'
import '@icon-park/react/styles/index.css'
import { App } from 'antd'

const antdTheme: ThemeConfig = {
  token: {
    colorPrimary: '#0251bf'
  },
  components: {
    Layout: {
      lightSiderBg: '#f5f5f5'
    },
    Menu: {
      itemBg: '#f3f4f4',
      subMenuItemBg: '#f5f5f5',
      itemColor: '#575757',
      itemHoverBg: '#eaeaea',
      popupBg: '#eaeaea',
      itemSelectedBg: '#eaeaea',
      itemSelectedColor: '#0c0c0c',
      itemMarginInline: 10,
      // itemHeight: 38,
      itemBorderRadius: 6
      // collapsedIconSize: 28
    }
  }
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ConfigProvider locale={zhCN} theme={antdTheme}>
      <BrowserRouter>
        <AuthGuard>
          <App>
            <Router />
          </App>
        </AuthGuard>
      </BrowserRouter>
    </ConfigProvider>
  </StrictMode>
)
