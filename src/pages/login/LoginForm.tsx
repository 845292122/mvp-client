import { Key, Phone, Wechat } from '@icon-park/react'
import { Button, Checkbox, Divider, Form, FormProps, Input, message, Tooltip } from 'antd'
import { createStyles } from 'antd-style'
import { useSetAtom } from 'jotai'
import React from 'react'
import { useNavigate } from 'react-router'
import { authApi } from '~/api'
import { authJotai } from '~/store'
import { _localStorage } from '~/utils'

const useStyles = createStyles(() => {
  return {
    loginForm: {
      marginBottom: '0'
    }
  }
})

const LoginForm: React.FC = () => {
  const { styles } = useStyles()
  const [form] = Form.useForm()
  const navigate = useNavigate()
  const setToken = useSetAtom(authJotai.tokenAtom)
  const setAuthInfo = useSetAtom(authJotai.authInfoAtom)
  const setPerm = useSetAtom(authJotai.permAtom)

  const handleLogin: FormProps<ApiType.Auth.Login>['onFinish'] = async values => {
    const tokenVal = await authApi.login(values)
    setToken(tokenVal)
    const authInfo = await authApi.getInfo()
    setAuthInfo(authInfo)
    const { perms } = await authApi.getPermissions()
    setPerm(perms)
    navigate('/')
    message.success('登录成功')
  }

  return (
    <div style={{ minWidth: '300px' }}>
      <h2>欢迎使用</h2>
      <Form
        name="login"
        form={form}
        autoComplete="off"
        onFinish={handleLogin}
        className={styles.loginForm}
      >
        <Form.Item name="phone" rules={[{ required: true, message: '请输入手机号' }]}>
          <Input
            placeholder="请输入手机号"
            prefix={<Phone theme="outline" size="16" fill="#333" />}
          />
        </Form.Item>
        <Form.Item name="password" rules={[{ required: true, message: '请输入密码' }]}>
          <Input.Password
            placeholder="请输入密码"
            prefix={<Key theme="outline" size="16" fill="#333" />}
          />
        </Form.Item>
        <Form.Item name="remember" style={{ margin: '0' }}>
          <Checkbox>
            <Tooltip title="保存账号密码30天" placement="right">
              记住我
            </Tooltip>
          </Checkbox>
        </Form.Item>
        <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
          登录
        </Button>
      </Form>
      <Divider plain style={{ margin: 10 }}>
        其他登录方式
      </Divider>
      <Button
        block
        icon={<Wechat theme="outline" size="18" fill="#17a332" strokeWidth={4} />}
        disabled
      >
        使用微信登录
      </Button>
    </div>
  )
}

export default LoginForm
