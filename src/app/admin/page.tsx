import { ArrowUpRight, Users, Package, DollarSign } from 'lucide-react'

const stats = [
  {
    label: 'Total Users',
    value: '2,420',
    change: '+12%',
    icon: Users,
  },
  {
    label: 'Total Products',
    value: '1,210',
    change: '+18%',
    icon: Package,
  },
  {
    label: 'Total Revenue',
    value: '$45,200',
    change: '+8%',
    icon: DollarSign,
  },
]

export default function AdminPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold">欢迎使用服装 ERP 系统</h1>
      <p className="mt-2 text-gray-600">
        选择左侧菜单开始使用系统功能
      </p>
    </div>
  )
} 