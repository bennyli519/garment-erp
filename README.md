# Garment ERP System

基于 Next.js 14 构建的现代化服装企业资源管理系统。

## 技术栈

- **Frontend**:
  - Next.js 15.3.2 (App Router)
  - React 18
  - TypeScript
  - Ant Design 5.x
  - Zustand (状态管理)
  - React Query (数据获取)
  - React Hook Form (表单管理)
  - Zod (数据验证)

- **Backend**:
  - Next.js API Routes
  - Prisma ORM
  - PostgreSQL
  - NextAuth.js (认证)

## 项目结构

```
src/
├── app/                    # Next.js App Router
│   ├── (portal)/          # 公共门户
│   ├── admin/             # 管理后台
│   │   ├── components/    # 管理后台组件
│   │   ├── hooks/        # 自定义 Hooks
│   │   └── stores/       # 状态管理
│   └── api/              # API 路由
├── backend/               # 后端核心逻辑
│   ├── core/             # 业务逻辑
│   ├── domain/           # 领域模型
│   └── infrastructure/   # 基础设施
└── shared/               # 共享工具和类型
```

## 开始使用

1. **安装依赖**

```bash
pnpm install
```

2. **环境配置**

创建 `.env` 文件并配置以下环境变量：

```env
DATABASE_URL="postgresql://..."
NEXTAUTH_SECRET="your-secret"
NEXTAUTH_URL="http://localhost:3000"
```

3. **数据库迁移**

```bash
pnpm prisma migrate dev
```

4. **启动开发服务器**

```bash
pnpm dev
```

访问 [http://localhost:3000](http://localhost:3000) 查看应用。

## 主要功能

- **多级菜单管理**
  - 动态路由和权限控制
  - 面包屑导航
  - 标签页管理

- **用户管理**
  - 用户认证和授权
  - 角色和权限管理
  - 部门管理

- **系统管理**
  - 基础数据维护
  - 系统配置
  - 日志管理

## 开发指南

- 遵循 [Admin Frontend Guidelines](./.cursor/rules/admin-frontend.mdc) 进行开发
- 使用 `pnpm lint` 进行代码检查
- 使用 `pnpm build` 构建生产版本

## 部署

1. **构建应用**

```bash
pnpm build
```

2. **启动生产服务器**

```bash
pnpm start
```

## 贡献指南

1. Fork 项目
2. 创建功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启 Pull Request

## License

[MIT](LICENSE)
