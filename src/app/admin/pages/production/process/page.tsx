'use client'

import { Table, Button, Space, Tag, InputNumber, Form, Modal, Input, Select } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import { PlusOutlined } from '@ant-design/icons'
import { useState } from 'react'

interface Process {
  id: string
  code: string
  name: string
  category: string
  standardTime: number
  price: number
  unit: string
  description: string
  status: 'active' | 'inactive'
}

const mockData: Process[] = [
  {
    id: '1',
    code: 'P001',
    name: '裁剪',
    category: '前道工序',
    standardTime: 5,
    price: 2.5,
    unit: '件',
    description: '根据纸样裁剪面料',
    status: 'active',
  },
  {
    id: '2',
    code: 'P002',
    name: '缝制',
    category: '车缝工序',
    standardTime: 8,
    price: 3.0,
    unit: '件',
    description: '使用缝纫机缝制衣片',
    status: 'active',
  },
  {
    id: '3',
    code: 'P003',
    name: '整烫',
    category: '后道工序',
    standardTime: 3,
    price: 1.5,
    unit: '件',
    description: '使用蒸汽熨斗整烫成品',
    status: 'active',
  },
]

const categories = ['前道工序', '车缝工序', '后道工序', '特殊工序']

export default function ProcessPage() {
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [form] = Form.useForm()

  const columns: ColumnsType<Process> = [
    {
      title: '工序编码',
      dataIndex: 'code',
      key: 'code',
    },
    {
      title: '工序名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '工序类别',
      dataIndex: 'category',
      key: 'category',
      filters: categories.map(cat => ({ text: cat, value: cat })),
      onFilter: (value, record) => record.category === value,
    },
    {
      title: '标准工时(分钟)',
      dataIndex: 'standardTime',
      key: 'standardTime',
      sorter: (a, b) => a.standardTime - b.standardTime,
    },
    {
      title: '单价(元)',
      dataIndex: 'price',
      key: 'price',
      render: (price) => `¥${price.toFixed(2)}`,
    },
    {
      title: '计量单位',
      dataIndex: 'unit',
      key: 'unit',
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <Tag color={status === 'active' ? 'green' : 'red'}>
          {status === 'active' ? '启用' : '禁用'}
        </Tag>
      ),
    },
    {
      title: '操作',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <a>编辑</a>
          <a>工艺要求</a>
          <a>删除</a>
        </Space>
      ),
    },
  ]

  const handleAdd = () => {
    setIsModalVisible(true)
  }

  const handleOk = async () => {
    try {
      const values = await form.validateFields()
      console.log('Success:', values)
      setIsModalVisible(false)
      form.resetFields()
    } catch (errorInfo) {
      console.log('Failed:', errorInfo)
    }
  }

  const handleCancel = () => {
    setIsModalVisible(false)
    form.resetFields()
  }

  return (
    <div>
      <div style={{ marginBottom: 16 }}>
        <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>
          新增工序
        </Button>
      </div>

      <Table 
        columns={columns} 
        dataSource={mockData} 
        rowKey="id"
        expandable={{
          expandedRowRender: (record) => (
            <p style={{ margin: 0 }}>
              工序说明：{record.description}
            </p>
          ),
        }}
      />

      <Modal
        title="新增工序"
        open={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        width={600}
      >
        <Form
          form={form}
          layout="vertical"
        >
          <Form.Item
            name="code"
            label="工序编码"
            rules={[{ required: true, message: '请输入工序编码' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="name"
            label="工序名称"
            rules={[{ required: true, message: '请输入工序名称' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="category"
            label="工序类别"
            rules={[{ required: true, message: '请选择工序类别' }]}
          >
            <Select>
              {categories.map(cat => (
                <Select.Option key={cat} value={cat}>{cat}</Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="standardTime"
            label="标准工时(分钟)"
            rules={[{ required: true, message: '请输入标准工时' }]}
          >
            <InputNumber min={0} precision={1} style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item
            name="price"
            label="单价(元)"
            rules={[{ required: true, message: '请输入单价' }]}
          >
            <InputNumber min={0} precision={2} style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item
            name="unit"
            label="计量单位"
            rules={[{ required: true, message: '请输入计量单位' }]}
          >
            <Select>
              <Select.Option value="件">件</Select.Option>
              <Select.Option value="套">套</Select.Option>
              <Select.Option value="米">米</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="description"
            label="工序说明"
          >
            <Input.TextArea rows={4} />
          </Form.Item>
          <Form.Item
            name="status"
            label="状态"
            initialValue="active"
          >
            <Select>
              <Select.Option value="active">启用</Select.Option>
              <Select.Option value="inactive">禁用</Select.Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
} 