import {
  ActionType,
  ModalForm,
  ProForm,
  ProFormSelect,
  ProFormText
} from '@ant-design/pro-components'
import { Form, message, Spin } from 'antd'
import { AccountInfoItem } from '.'
import { accountApi } from '~/api'
import { useEffect, useMemo, useState } from 'react'

export default function AccountModalForm({
  actionRef,
  editId = undefined,
  open,
  onOpenChange
}: {
  actionRef?: React.MutableRefObject<ActionType | undefined>
  editId?: number
  open: boolean
  onOpenChange: (open: boolean) => void
}) {
  const [form] = Form.useForm<AccountInfoItem>()
  const [loading, setLoading] = useState(false)
  const isEdit = useMemo(() => !!editId, [editId])

  useEffect(() => {
    async function fetchDetail() {
      if (open && isEdit) {
        try {
          setLoading(true)
          const detail = await accountApi.info(Number(editId))
          form.resetFields()
          form.setFieldsValue({ ...(detail || {}) })
        } catch (e) {
          console.log(e)
          message.error('加载账户详情失败')
        } finally {
          setLoading(false)
        }
      } else if (open && !isEdit) {
        form.resetFields()
        form.setFieldsValue({})
      }
    }
    fetchDetail()
  }, [open, isEdit, editId])

  async function handleSubmit(values: AccountInfoItem) {
    try {
      if (isEdit) {
        await accountApi.modify({ ...values, id: editId })
        message.success('编辑成功')
      } else {
        const { id, ...rest } = values as any
        console.log(id)
        await accountApi.add(rest)
        message.success('新增成功')
      }
      await actionRef?.current?.reload()
      onOpenChange(false)
      form.resetFields()
      return true
    } catch (e) {
      console.log(e)
      message.error(isEdit ? '编辑失败' : '新增失败')
      return false
    }
  }

  return (
    <ModalForm
      form={form}
      open={open}
      onOpenChange={onOpenChange}
      autoFocusFirstInput
      title="新增账户"
      modalProps={{
        destroyOnHidden: true,
        destroyOnClose: true,
        onCancel: () => console.log('run')
      }}
      onFinish={handleSubmit}
      submitTimeout={2000}
    >
      {loading ? (
        <div style={{ textAlign: 'center', padding: 40 }}>
          <Spin />
        </div>
      ) : (
        <>
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
                value: 1,
                label: '启用'
              },
              {
                value: 0,
                label: '禁用'
              }
            ]}
            name="status"
            label="状态"
            placeholder="请选择状态"
            formItemProps={{ rules: [{ required: true, message: '请选择状态' }] }}
          />
        </>
      )}
    </ModalForm>
  )
}
