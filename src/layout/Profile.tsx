import { Descriptions, Drawer } from 'antd'
import { useAtomValue } from 'jotai'
import React, { useContext } from 'react'
import ProfileContext from '~/context/ProfileContext'
import { authStore } from '~/store'
import type { DescriptionsProps } from 'antd'

const Profile: React.FC = () => {
  const profileContext = useContext(ProfileContext)
  if (!profileContext) throw new Error('profile context is undefined')

  const { visible, closeProfile } = profileContext
  const authInfo = useAtomValue(authStore.authInfoAtom)

  const { nickname, phone, isMaster, email } = authInfo ?? {}
  const items: DescriptionsProps['items'] = [
    {
      key: 'nickname',
      label: '名称',
      children: nickname
    },
    {
      key: 'phone',
      label: '手机号',
      children: phone
    },
    {
      key: 'email',
      label: '邮箱',
      children: email
    },
    {
      key: 'isMaster',
      label: '是否管理员',
      children: isMaster ? '是' : '否'
    }
  ]

  return (
    <Drawer title="个人信息" onClose={closeProfile} open={visible}>
      <Descriptions title="基本信息" layout="vertical" items={items} column={1} />
    </Drawer>
  )
}

export default Profile
