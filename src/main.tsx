import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import Router from './router'
import AuthGuard from './router/guard'
import { ConfigProvider, ThemeConfig } from 'antd'
import { Provider as JotaiProvider } from 'jotai'
import zhCN from 'antd/locale/zh_CN'
import './main.css'
import '@icon-park/react/styles/index.css'
import { App } from 'antd'
import { store } from './store'

const antdTheme: ThemeConfig = {
  token: {
    colorPrimary: '#0251bf'
  }
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <JotaiProvider store={store}>
      <ConfigProvider locale={zhCN} theme={antdTheme}>
        <BrowserRouter>
          <AuthGuard>
            <App>
              <Router />
            </App>
          </AuthGuard>
        </BrowserRouter>
      </ConfigProvider>
    </JotaiProvider>
  </StrictMode>
)
