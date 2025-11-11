import { ProTable, type ActionType, type ProColumns } from '@ant-design/pro-components'
import { useRef, useState } from 'react'
import { accountApi } from '~/api'
import AccountModalForm from './AccountModalForm'
import { Button } from 'antd'
import { PlusOutlined } from '@ant-design/icons'

export type AccountInfoItem = {
  id: string
  phone: string
  role: number
  status: number
  isPremium: number
  startDate: Date
  endDate: Date
  contact: string
  shopName: string
  creditCode: string
  address: string
  domain: string
  birthday: Date
  email: string
  loginIp: string
  loginDate: Date
  remark: string
}

export default function Account() {
  const actionRef = useRef<ActionType>()
  const [accountFormOpen, setAccountFormOpen] = useState<boolean>(false)
  const [editId, setEditId] = useState<number | undefined>(undefined)

  const columns: ProColumns<AccountInfoItem>[] = [
    {
      title: '账户ID',
      dataIndex: 'id',
      search: false
    },
    {
      title: '店铺名称',
      dataIndex: 'shopName'
    },
    {
      title: '联系人',
      dataIndex: 'contact',
      search: false
    },
    {
      title: '联系电话',
      dataIndex: 'phone',
      search: false
    },
    {
      title: 'Premium',
      dataIndex: 'isPremium',
      valueType: 'select',
      valueEnum: {
        0: { text: '否' },
        1: { text: '是' }
      }
    },
    {
      title: '状态',
      dataIndex: 'status',
      search: false
    },
    {
      title: '操作',
      valueType: 'option',
      key: 'option',
      render: (_, record) => [
        <a key="editable" onClick={() => handleEditAccountForm(Number(record.id))}>
          编辑
        </a>,
        <a target="_blank" rel="noopener noreferrer" key="view">
          设置Premium
        </a>
      ]
    }
  ]

  function handleAddAccountForm() {
    setEditId(undefined)
    setAccountFormOpen(true)
  }

  function handleEditAccountForm(id: number) {
    setEditId(id)
    setAccountFormOpen(true)
  }

  return (
    <>
      <ProTable<AccountInfoItem>
        actionRef={actionRef}
        columns={columns}
        rowKey="id"
        search={{
          labelWidth: 'auto'
        }}
        cardBordered
        revalidateOnFocus
        headerTitle="账户列表"
        pagination={{
          pageSize: 10
        }}
        request={async params => {
          const { records, total } = await accountApi.page(params)
          return {
            data: records,
            total
          }
        }}
        options={{
          setting: {
            listsHeight: 400
          }
        }}
        dateFormatter="string"
        toolBarRender={() => [
          <Button
            key="button"
            icon={<PlusOutlined />}
            type="primary"
            onClick={handleAddAccountForm}
          >
            新增
          </Button>
        ]}
      />
      <AccountModalForm
        actionRef={actionRef}
        open={accountFormOpen}
        onOpenChange={setAccountFormOpen}
        editId={editId}
      />
    </>
  )
}
