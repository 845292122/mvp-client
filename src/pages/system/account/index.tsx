import { ProTable, type ActionType, type ProColumns } from '@ant-design/pro-components'
import { useRef } from 'react'
import { accountApi } from '~/api'
import AccountModalForm from './AccountModalForm'

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
      render: () => [
        <a key="editable">编辑</a>,
        <a target="_blank" rel="noopener noreferrer" key="view">
          查看
        </a>
      ]
    }
  ]

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
        toolBarRender={() => [<AccountModalForm actionRef={actionRef} />]}
      />
    </>
  )
}
