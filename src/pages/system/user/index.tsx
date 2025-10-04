import { AddOne } from '@icon-park/react'
import { useAntdTable } from 'ahooks'
import { Button, Card, Form, message, Popconfirm, Space, Table, TableProps, Tag } from 'antd'
import React, { useState } from 'react'
import { tenantApi, userApi } from '~/api'
import InfoModal, { GenerateFormValues, InfoModalFieldType } from '~/components/InfoModal'
import QueryForm, { QueryFormField } from '~/components/QueryForm'
import type { TreeDataNode } from 'antd'
import { filterChildKeys, generatePermissionByBizRoutes } from '~/utils'
import AssignPermission from '~/components/AssignPermission'
import { useAtomValue } from 'jotai'
import { authJotai } from '~/store'

const queryFormFields: QueryFormField[] = [
  {
    name: 'nickname',
    label: '联系人',
    type: 'input'
  },
  {
    name: 'status',
    label: '状态',
    type: 'select',
    options: [
      {
        label: '停用',
        value: '0'
      },
      {
        label: '启用',
        value: '1'
      }
    ]
  }
]

const User: React.FC = () => {
  const [messageApi, contextHolder] = message.useMessage()
  const authInfo = useAtomValue(authJotai.authInfoAtom)

  const [form] = Form.useForm()
  const [infoVisible, setInfoVisible] = useState<boolean>(false)
  const [initialValues, setInitialValues] = useState<Record<string, unknown> | undefined>()
  const [tenantOptions, setTenantOptions] = useState<
    Array<{ label: string; value: string | number }>
  >([])
  const [assignPermissionVisible, setAssignPermissionVisible] = useState<boolean>(false)
  const [permissionTreeData, setPermissionTreeData] = useState<TreeDataNode[]>([])
  const [selectedRowId, setSelectedRowId] = useState<number | undefined>()
  const [defaultPermCheckedKeys, setDefaultPermCheckedKeys] = useState<string[]>([])

  // * 数据表格项
  const tableColumns: TableProps<ApiType.User.Info>['columns'] = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width: 50,
      fixed: 'left',
      align: 'center',
      render: text => <a>{text}</a>
    },
    {
      title: '联系人',
      dataIndex: 'nickname',
      key: 'nickname',
      width: 100
    },
    {
      title: '手机号',
      dataIndex: 'phone',
      key: 'phone',
      width: 100
    },
    {
      title: '管理员',
      dataIndex: 'isMaster',
      key: 'isMaster',
      width: 100,
      render: text => (text === 1 ? <Tag color="green">是</Tag> : <Tag color="red">否</Tag>)
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      width: 100,
      align: 'center',
      render: text => (text === 1 ? <Tag color="green">启用</Tag> : <Tag color="red">停用</Tag>)
    },
    {
      title: '备注',
      dataIndex: 'remark',
      key: 'remark',
      width: 100,
      ellipsis: true
    },
    {
      title: 'Action',
      key: 'action',
      fixed: 'right',
      align: 'center',
      width: 150,
      render: (_, record) => (
        <Space size="small">
          <Button color="blue" variant="link" onClick={() => record.id && modifyData(record.id)}>
            编辑
          </Button>
          <Popconfirm
            title="删除数据!!!"
            description="确认删除当前数据？"
            onConfirm={() => record.id && removeData(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <Button color="red" variant="link">
              删除
            </Button>
          </Popconfirm>
          <Button
            variant="link"
            color="primary"
            size="small"
            onClick={() => record.id && openAssignPermission(record.id)}
          >
            分配权限
          </Button>
        </Space>
      )
    }
  ]

  // * 编辑表单项
  const infoFields: InfoModalFieldType[] = [
    {
      name: 'id',
      label: 'ID',
      type: 'input',
      span: 0
    },
    ...(authInfo?.isPlatformAdmin
      ? [
          {
            name: 'tenantID',
            label: '租户',
            type: 'select' as const,
            options: tenantOptions,
            span: 24,
            rules: [{ required: true, message: '租户不能为空' }]
          }
        ]
      : []),
    {
      name: 'nickname',
      label: '联系人',
      type: 'input',
      rules: [{ required: true, message: '联系人不能为空' }]
    },
    {
      name: 'phone',
      label: '手机号',
      type: 'input',
      rules: [{ required: true, message: '手机号不能为空' }]
    },
    {
      name: 'status',
      label: '状态',
      type: 'select',
      options: [
        {
          label: '启用',
          value: '1'
        },
        {
          label: '停用',
          value: '0'
        }
      ],
      rules: [{ required: true, message: '状态不能为空' }]
    },
    {
      name: 'dataScope',
      label: '数据权限',
      type: 'select',
      options: [
        {
          label: '全部数据权限',
          value: '1'
        },
        {
          label: '个人数据权限',
          value: '2'
        }
      ],
      rules: [{ required: true, message: '数据权限不能为空' }]
    },
    {
      name: 'remark',
      label: '备注',
      type: 'input'
    }
  ]

  const getTableData = async (
    { current, pageSize }: UtilType.AhookRequestParam,
    formData: Object
  ): Promise<{
    total: number
    list: ApiType.User.Info[]
  }> => {
    const { total, records } = await userApi.page({
      page: current,
      pageSize,
      ...formData
    })
    return {
      total,
      list: records
    }
  }
  const { tableProps, refresh, search } = useAntdTable(getTableData, {
    defaultPageSize: 10,
    form
  })

  const handleSubmitInfo = async (values: GenerateFormValues<typeof infoFields>) => {
    let msg = '添加成功'
    if (values.id) {
      msg = '修改成功'
      await userApi.modify(values)
    } else {
      await userApi.create(values)
    }
    message.success(msg)
    setInfoVisible(false)
    refresh()
  }

  const createData = async () => {
    const tenantList = await tenantApi.list()

    setTenantOptions(
      tenantList
        .filter(item => item.id)
        .map(item => {
          return {
            label: `${item.id}: ${item.companyName ?? ''}`,
            value: item.id as number
          }
        })
    )

    setInitialValues(undefined)
    setInfoVisible(true)
  }

  const modifyData = async (id: number) => {
    const res = await userApi.info(id)
    const tenantList = await tenantApi.list()

    setTenantOptions(
      tenantList
        .filter(item => item.id)
        .map(item => {
          return {
            label: item.companyName ?? '',
            value: item.id as number
          }
        })
    )

    const formattedData = {
      ...res,
      status: res.status?.toString()
    }
    setInitialValues(formattedData)
    setInfoVisible(true)
  }

  const removeData = async (id: number) => {
    await userApi.remove(id)
    message.success('删除成功')
    refresh()
  }

  const openAssignPermission = async (selectedRowId: number) => {
    const permissionsData = generatePermissionByBizRoutes()
    setPermissionTreeData(permissionsData)
    setSelectedRowId(selectedRowId)
    const { perms } = (await userApi.perms(selectedRowId)) ?? {}
    const filteredPerms = filterChildKeys(perms ?? [])
    setDefaultPermCheckedKeys(filteredPerms)
    setAssignPermissionVisible(true)
  }

  const handleAssignPermission = async (checkedVal: string[]) => {
    await userApi.assignPerms({
      ownerId: selectedRowId,
      perms: checkedVal
    })
    messageApi.success('分配权限成功')
    setAssignPermissionVisible(false)
  }

  return (
    <React.Fragment>
      {contextHolder}
      <Card style={{ marginBottom: 20 }}>
        <QueryForm
          fields={queryFormFields}
          onSearch={search.submit}
          form={form}
          onReset={search.reset}
        />
      </Card>

      <Card
        title="用户列表"
        extra={
          <Space>
            <Button
              type="primary"
              icon={<AddOne theme="outline" size="16" fill="#fff" />}
              onClick={createData}
            >
              新增
            </Button>
          </Space>
        }
      >
        <Table columns={tableColumns} {...tableProps} scroll={{ x: 800 }} rowKey="id" />
      </Card>

      <InfoModal<typeof infoFields>
        fields={infoFields}
        visible={infoVisible}
        onSubmit={handleSubmitInfo}
        initialValues={initialValues}
        onClose={() => setInfoVisible(false)}
        title="用户信息"
      />

      <AssignPermission
        open={assignPermissionVisible}
        dataSource={permissionTreeData}
        onCancel={() => setAssignPermissionVisible(false)}
        onSubmit={handleAssignPermission}
        defaultCheckedKeys={defaultPermCheckedKeys}
      />
    </React.Fragment>
  )
}

export default User
