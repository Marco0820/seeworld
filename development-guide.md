# 🚀 使用 MCP 工具开发网站指南

## 📋 可用的 MCP 开发工具

### 1. **代码分析和搜索工具**
- `codebase_search` - 语义搜索，理解代码功能
- `grep` - 精确文本搜索，查找特定代码
- `read_file` - 读取文件内容
- `list_dir` - 浏览项目结构

### 2. **代码编辑工具**
- `write` - 创建新文件
- `search_replace` - 单个文件编辑
- `MultiEdit` - 批量编辑同一文件
- `delete_file` - 删除文件

### 3. **开发辅助工具**
- `run_terminal_cmd` - 执行命令行操作
- `todo_write` - 任务管理和进度跟踪
- `create_diagram` - 生成 Mermaid 图表
- `read_lints` - 检查代码错误

### 4. **测试和质量保证**
- `@playwright/test` - 端到端自动化测试
- 性能测试、可访问性测试、功能测试

## 🎯 实际开发场景

### 场景1: 添加新功能页面

1. **规划功能**
```bash
# 使用 todo_write 创建任务列表
- 设计页面结构
- 创建组件
- 添加路由
- 编写测试
```

2. **创建页面文件**
```bash
# 使用 write 工具创建新页面
src/app/new-feature/page.tsx
```

3. **开发组件**
```bash
# 使用 codebase_search 查找相似组件
# 使用 MultiEdit 批量修改
```

### 场景2: 功能调试和优化

1. **查找问题**
```bash
# 使用 grep 搜索错误信息
# 使用 codebase_search 理解代码逻辑
```

2. **性能优化**
```bash
# 运行 Playwright 性能测试
npm run test:crepal:extended
```

3. **代码重构**
```bash
# 使用 search_replace 批量重命名
# 使用 read_lints 检查语法错误
```

### 场景3: 集成第三方服务

1. **API 集成**
```bash
# 查看现有 API 集成方式
# 使用 codebase_search 搜索 "API" 或 "axios"
```

2. **环境配置**
```bash
# 使用 run_terminal_cmd 安装依赖
npm install new-package
```

## 💡 开发最佳实践

### 1. **使用语义搜索理解代码**
```bash
# 好的搜索查询示例：
- "How does user authentication work?"
- "Where is payment processing handled?"
- "How are video uploads managed?"
```

### 2. **利用任务管理**
```bash
# 复杂功能开发时使用 todo_write
- 分解大任务为小步骤
- 跟踪开发进度
- 标记完成状态
```

### 3. **自动化测试驱动开发**
```bash
# 为新功能编写测试
npm run test:crepal:ui  # 可视化调试
npm run test:crepal:debug  # 详细调试
```

### 4. **代码质量保证**
```bash
# 开发过程中持续检查
npm run lint     # 代码规范检查
npm run format   # 自动格式化
```

## 🔧 常用开发命令

### 启动和构建
```bash
npm run dev      # 开发服务器
npm run build    # 生产构建
npm run start    # 生产服务器
```

### 测试和质量
```bash
npm run test:crepal           # 完整测试套件
npm run test:crepal:core      # 核心功能测试
npm run test:crepal:report    # 查看测试报告
```

### 代码维护
```bash
npm run lint     # 检查代码问题
npm run format   # 格式化代码
```

## 🌟 高级开发技巧

### 1. **组件开发模式**
- 使用 Radix UI 作为基础组件
- 结合 Tailwind CSS 进行样式定制
- 利用 TypeScript 确保类型安全

### 2. **状态管理**
- React Context (已有 AuthContext)
- React Hook Form 处理表单状态
- Zod 进行数据验证

### 3. **API 集成**
- 使用 Axios 进行 HTTP 请求
- Next.js API Routes 处理后端逻辑
- PayPal SDK 处理支付功能

### 4. **性能优化**
- Next.js 自动代码分割
- 图片优化 (next/image)
- Playwright 性能监控

## 🎨 UI/UX 开发

### 设计系统
- Tailwind CSS 原子化样式
- Shadcn/ui 组件库
- Lucide React 图标系统
- 响应式设计支持

### 用户体验
- 可访问性测试 (a11y.spec.ts)
- 移动端适配
- 加载状态和错误处理

## 📊 项目监控

### 测试覆盖
- 功能测试 (forms, video-generation)
- 页面测试 (homepage, navigation)  
- 性能测试 (performance.spec.ts)
- 可访问性测试 (a11y.spec.ts)

### 代码质量
- TypeScript 类型检查
- ESLint 规则检查
- Biome 代码格式化
- Playwright 端到端测试

---

**通过合理使用这些 MCP 工具，你可以高效地开发、测试和维护网站功能！** 🎉
