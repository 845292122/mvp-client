import { PlusOutlined, SearchOutlined } from '@ant-design/icons'
import { Button, Flex, Input, Table } from 'antd'
import { useState } from 'react'
import CommonPage from '~/components/CommonPage'
// import { InfoModalFieldType } from '~/components/InfoModal'

export default function Account() {
  // const [contextHolder] = message.useMessage()
  const [tabelData] = useState([])

  // const infoFields: InfoModalFieldType[] = [
  //   {
  //     name: 'id',
  //     label: 'ID',
  //     type: 'input',
  //     span: 0
  //   },
  //   {
  //     name: 'phone',
  //     label: '手机号',
  //     type: 'input',
  //     rules: [{ required: true, message: '手机号不能为空' }]
  //   }
  // ]

  return (
    <CommonPage>
      {/* {contextHolder} */}

      {/* 操作区域 */}
      <Flex justify="space-between" align="end">
        <div>
          <Input prefix={<SearchOutlined />} placeholder="输入关键字以查询" />
        </div>
        <div>
          <Button icon={<PlusOutlined />} type="primary">
            新增
          </Button>
        </div>
      </Flex>

      {/* 数据表格 */}
      <Table dataSource={tabelData} style={{ marginTop: 16 }} rowKey="id" scroll={{ x: 800 }}>
        <Table.Column title="ID" dataIndex="id" key="id" />
        <Table.Column title="手机号" dataIndex="phone" key="phone" />
        <Table.Column title="角色" dataIndex="role" key="role" />
        <Table.Column title="状态" dataIndex="status" key="status" />
        <Table.Column title="Premium" dataIndex="isPremium" key="isPremium" />
        <Table.Column title="创建时间" dataIndex="createdAt" key="createdAt" />
        <Table.Column title="操作" key="action" render={() => <a>编辑</a>} />
      </Table>
    </CommonPage>
  )
}
