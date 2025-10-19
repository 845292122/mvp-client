import {
  ActionType,
  ModalForm,
  ProForm,
  ProFormSelect,
  ProFormText
} from '@ant-design/pro-components'
import { Button, Form, message } from 'antd'
import { AccountInfoItem } from '.'
import { PlusOutlined } from '@ant-design/icons'
import { accountApi } from '~/api'

export default function AccountModalForm({
  actionRef
}: {
  actionRef?: React.MutableRefObject<ActionType | undefined>
}) {
  const [form] = Form.useForm<AccountInfoItem>()

  return (
    <ModalForm
      form={form}
      autoFocusFirstInput
      title="新增账户"
      modalProps={{
        destroyOnHidden: true,
        onCancel: () => console.log('run')
      }}
      onFinish={async values => {
        await accountApi.add(values)
        message.success('提交成功')
        form.resetFields()
        await actionRef?.current?.reload()
        return true
      }}
      submitTimeout={2000}
      trigger={
        <Button key="button" icon={<PlusOutlined />} type="primary">
          新增
        </Button>
      }
    >
      <ProForm.Group>
        <ProFormText
          width="md"
          name="shopName"
          label="店铺名称"
          tooltip="最长为 24 位"
          placeholder="请输入店铺名称"
          formItemProps={{ rules: [{ required: true, message: '请输入店铺名称' }] }}
        />
        <ProFormText
          width="md"
          name="contact"
          label="联系人"
          placeholder="请输入联系人"
          formItemProps={{ rules: [{ required: true, message: '请输入联系人' }] }}
        />
      </ProForm.Group>
      <ProForm.Group>
        <ProFormText
          width="md"
          name="phone"
          label="联系电话"
          placeholder="请输入联系电话"
          formItemProps={{ rules: [{ required: true, message: '请输入联系电话' }] }}
        />
        <ProFormText width="md" name="email" label="邮箱" placeholder="请输入邮箱" />
      </ProForm.Group>
      <ProForm.Group>
        <ProFormText width="md" name="address" label="地址" placeholder="请输入地址" />
        <ProFormText
          width="md"
          name="creditCode"
          label="统一社会信用代码"
          placeholder="请输入统一社会信用代码"
        />
      </ProForm.Group>
      <ProFormSelect
        width="md"
        options={[
          {
            value: '1',
            label: '启用'
          },
          {
            value: '0',
            label: '禁用'
          }
        ]}
        name="status"
        label="状态"
        placeholder="请选择状态"
        formItemProps={{ rules: [{ required: true, message: '请选择状态' }] }}
      />
    </ModalForm>
  )
}
