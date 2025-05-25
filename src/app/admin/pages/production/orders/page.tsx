'use client'

import { Table, Button, Space, Tag, Card, Modal, Form, Input, InputNumber, DatePicker, Select } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import { PlusOutlined } from '@ant-design/icons'
import { useState } from 'react'

interface ProductionOrder {
  id: string
  orderNo: string
  productName: string
  quantity: number
  status: 'pending' | 'in_production' | 'completed' | 'cancelled'
  startDate: string
  endDate: string
  customer: string
}

const mockData: ProductionOrder[] = [
  {
    id: '1',
    orderNo: 'PO20240301001',
    productName: '男士衬衫',
    quantity: 1000,
    status: 'in_production',
    startDate: '2024-03-01',
    endDate: '2024-03-15',
    customer: '优衣库',
  },
  {
    id: '2',
    orderNo: 'PO20240301002',
    productName: '女士连衣裙',
    quantity: 500,
    status: 'pending',
    startDate: '2024-03-10',
    endDate: '2024-03-25',
    customer: 'ZARA',
  },
]

export default function ProductionOrderPage() {
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [form] = Form.useForm()

  const columns: ColumnsType<ProductionOrder> = [
    {
      title: '订单编号',
      dataIndex: 'orderNo',
      key: 'orderNo',
    },
    {
      title: '产品名称',
      dataIndex: 'productName',
      key: 'productName',
    },
    {
      title: '数量',
      dataIndex: 'quantity',
      key: 'quantity',
    },
    {
      title: '客户',
      dataIndex: 'customer',
      key: 'customer',
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => {
        const statusMap = {
          pending: { color: 'orange', text: '待生产' },
          in_production: { color: 'blue', text: '生产中' },
          completed: { color: 'green', text: '已完成' },
          cancelled: { color: 'red', text: '已取消' },
        }
        return <Tag color={statusMap[status as keyof typeof statusMap].color}>
          {statusMap[status as keyof typeof statusMap].text}
        </Tag>
      },
    },
    {
      title: '开始日期',
      dataIndex: 'startDate',
      key: 'startDate',
    },
    {
      title: '结束日期',
      dataIndex: 'endDate',
      key: 'endDate',
    },
    {
      title: '操作',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <a>编辑</a>
          <a>查看</a>
          <a>工艺单</a>
        </Space>
      ),
    },
  ]

  // 统计卡片数据
  const statistics = [
    { title: '待生产', value: 5, color: 'orange' },
    { title: '生产中', value: 8, color: 'blue' },
    { title: '已完成', value: 12, color: 'green' },
    { title: '已取消', value: 2, color: 'red' },
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
        <Space size="large">
          {statistics.map(stat => (
            <Card key={stat.title} style={{ width: 200 }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 24, fontWeight: 'bold', color: stat.color }}>
                  {stat.value}
                </div>
                <div style={{ color: '#666' }}>{stat.title}</div>
              </div>
            </Card>
          ))}
        </Space>
      </div>
      
      <div style={{ marginBottom: 16 }}>
        <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>
          新增生产单
        </Button>
      </div>

      <Table columns={columns} dataSource={mockData} rowKey="id" />

      <Modal
        title="新增生产单"
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
            name="productName"
            label="产品名称"
            rules={[{ required: true, message: '请输入产品名称' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="quantity"
            label="数量"
            rules={[{ required: true, message: '请输入数量' }]}
          >
            <InputNumber min={1} style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item
            name="customer"
            label="客户"
            rules={[{ required: true, message: '请输入客户名称' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="dates"
            label="生产日期"
            rules={[{ required: true, message: '请选择生产日期' }]}
          >
            <DatePicker.RangePicker style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item
            name="status"
            label="状态"
            initialValue="pending"
          >
            <Select>
              <Select.Option value="pending">待生产</Select.Option>
              <Select.Option value="in_production">生产中</Select.Option>
              <Select.Option value="completed">已完成</Select.Option>
              <Select.Option value="cancelled">已取消</Select.Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
} 