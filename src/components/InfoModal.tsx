import { DatePicker, Form, Input, Modal, Radio, Select, Row, Col, InputNumber } from 'antd'
import { Rule } from 'antd/es/form'
import React from 'react'

export type GenerateFormValues<T extends InfoModalFieldType[]> = {
  [K in T[number]['name']]: unknown
}

export type InfoModalFieldType = {
  name: string
  label: string
  type: 'input' | 'select' | 'radio' | 'date' | 'inputNumber'
  options?: Array<{ label: string; value: string | number }>
  rules?: Array<Rule>
  span?: number
  props?: Record<string, unknown>
}

type InfoModalProps<T extends InfoModalFieldType[]> = {
  visible: boolean
  onClose: () => void
  onSubmit: (values: GenerateFormValues<T>) => void
  initialValues?: Record<string, unknown>
  fields: InfoModalFieldType[]
  data?: Record<string, unknown>
  title?: string
}

const InfoModal = <T extends InfoModalFieldType[]>({
  visible,
  initialValues,
  fields,
  onSubmit,
  title,
  onClose
}: InfoModalProps<T>): React.ReactElement => {
  const [form] = Form.useForm()
  const handleOk = () => {
    form.validateFields().then(values => onSubmit(values))
  }

  React.useEffect(() => {
    if (visible && initialValues) {
      form.setFieldsValue(initialValues)
    }
  }, [visible, initialValues, form])

  return (
    <>
      <Modal
        title={title}
        open={visible}
        width={800}
        destroyOnClose
        onOk={handleOk}
        onCancel={onClose}
        maskClosable={false}
        style={{
          top: 30
        }}
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
                  {field.type === 'date' && (
                    <DatePicker style={{ width: '100%' }} {...field.props} />
                  )}
                </Form.Item>
              </Col>
            ))}
          </Row>
        </Form>
      </Modal>
    </>
  )
}

export default InfoModal
