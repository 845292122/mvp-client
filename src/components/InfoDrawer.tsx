import { Col, DatePicker, Drawer, DrawerProps, Input, InputNumber, Radio, Row, Select } from 'antd'
import { Rule } from 'antd/es/form'
import { Form } from 'antd'
import React from 'react'
import InfoDrawerExtra from './InfoDrawerExtra'

export type InfoDrawerFormValues<T extends InfoDrawerFieldType[]> = {
  [K in T[number]['name']]: unknown
}

export type InfoDrawerFieldType = {
  name: string
  label: string
  type: 'input' | 'select' | 'radio' | 'date' | 'inputNumber' | 'dateRange' | 'textarea'
  options?: Array<{ label: string; value: string | number }>
  rules?: Array<Rule>
  span?: number
  props?: Record<string, unknown>
}

type InfoDrawerProps<T extends InfoDrawerFieldType[]> = {
  visible: boolean
  onClose: () => void
  onSubmit: (values: InfoDrawerFormValues<T>) => void
  initialValues?: Record<string, unknown>
  fields: InfoDrawerFieldType[]
  data?: Record<string, unknown>
  title?: string
} & Partial<DrawerProps>

const InfoDrawer = <T extends InfoDrawerFieldType[]>({
  visible,
  initialValues,
  fields,
  onSubmit,
  title,
  onClose,
  ...rest
}: InfoDrawerProps<T>): React.ReactElement => {
  const [form] = Form.useForm()
  const handleOk = () => {
    form.validateFields().then(values => onSubmit(values))
  }

  return (
    <Drawer
      title={title}
      onClose={onClose}
      open={visible}
      destroyOnClose
      maskClosable={false}
      {...rest}
      extra={<InfoDrawerExtra handleOk={handleOk} />}
    >
      <Form
        form={form}
        layout="vertical"
        initialValues={initialValues}
        preserve={false}
        autoComplete="off"
      >
        <Row gutter={24}>
          {fields.map(field => (
            <Col span={field.span ?? 12} key={field.name}>
              <Form.Item name={field.name} label={field.label} rules={field.rules ?? []}>
                {field.type === 'input' && (
                  <Input placeholder={`请输入${field.label}`} {...field.props} />
                )}
                {field.type === 'textarea' && (
                  <Input.TextArea placeholder={`请输入${field.label}`} {...field.props} />
                )}
                {field.type === 'inputNumber' && <InputNumber {...field.props} />}
                {field.type === 'select' && (
                  <Select
                    placeholder={`请选择${field.label}`}
                    allowClear
                    options={field.options}
                    {...field.props}
                  />
                )}
                {field.type === 'radio' && (
                  <Radio.Group {...field.props}>
                    {field.options?.map(option => (
                      <Radio key={option.value} value={option.value}>
                        {option.label}
                      </Radio>
                    ))}
                  </Radio.Group>
                )}
                {field.type === 'date' && <DatePicker style={{ width: '100%' }} {...field.props} />}
                {field.type === 'dateRange' && (
                  <DatePicker.RangePicker style={{ width: '100%' }} {...field.props} />
                )}
              </Form.Item>
            </Col>
          ))}
        </Row>
      </Form>
    </Drawer>
  )
}

export default InfoDrawer
