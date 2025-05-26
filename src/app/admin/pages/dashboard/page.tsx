'use client'

import { Card, Row, Col, Statistic } from 'antd'
import {
  UserOutlined,
  ShopOutlined,
  DollarOutlined,
  FileOutlined,
} from '@ant-design/icons'

export default function DashboardPage() {
  return (
    <div>
      <Row gutter={16}>
        <Col span={6}>
          <Card>
            <Statistic
              title="总用户数"
              value={112893}
              prefix={<UserOutlined />}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="产品数量"
              value={93}
              prefix={<ShopOutlined />}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="订单总额"
              value={112893}
              precision={2}
              prefix={<DollarOutlined />}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="订单数量"
              value={1128}
              prefix={<FileOutlined />}
            />
          </Card>
        </Col>
      </Row>
    </div>
  )
} 