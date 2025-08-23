# SeeWorld AI 视频生成网站说明文档

## 项目概述

SeeWorld AI 是一个功能强大的AI视频生成平台，集成了23个主流AI视频生成模型，为用户提供专业级的文本到视频和图像到视频生成服务。网站采用现代化的技术栈构建，提供直观的用户界面和完整的视频生成工作流。

## 🏗️ 技术架构

### 技术栈
- **前端框架**: Next.js 15.4.6 + React 18
- **样式系统**: Tailwind CSS + shadcn/ui组件库
- **开发语言**: TypeScript (完整类型安全)
- **状态管理**: React Hooks + Context API
- **HTTP客户端**: Axios
- **UI组件**: Lucide React Icons
- **构建工具**: Next.js内置构建系统

### 项目结构
```
seeworld-ai/
├── src/
│   ├── app/                     # Next.js应用目录
│   │   ├── page.tsx            # 主页
│   │   ├── studio/             # 视频生成工作室
│   │   ├── generate/           # 视频生成页面
│   │   ├── pricing/            # 价格页面
│   │   ├── projects/           # 项目管理
│   │   ├── pollo-demo/         # Pollo AI演示界面
│   │   └── api/                # API路由
│   │       └── video/          # 视频生成API
│   ├── components/             # React组件
│   ├── lib/                    # 工具库
│   │   └── videoApi.ts         # 视频API管理器
│   ├── types/                  # TypeScript类型定义
│   │   └── video.ts            # 视频相关类型
│   └── contexts/               # React上下文
├── public/                     # 静态资源
├── tests/                      # 自动化测试
└── docs/                       # 文档文件
```

## 🎯 核心功能

### 1. 视频生成引擎

#### 支持的AI模型 (23个模型)

**官方API提供商 (12个)**：
1. **阿里云万相系列**
   - wan-2.2-flash: ¥0.32/视频 (快速生成)
   - wan-2.2-plus: ¥0.42/视频 (高质量)
   - wanx-2.1: ¥1.60/视频 (专业版)

2. **MiniMax海螺系列**
   - hailuo-02: ¥0.48/视频 (物理仿真)
   - hailuo: ¥2.80/视频 (顶级质量)
   - hailuo-live2d: ¥2.80/视频 (2D动画)

3. **Kling AI系列**
   - kling-2.1: ¥1.60/视频 (标准版)
   - kling-2.1-master: ¥8.00/视频 (大师版)
   - kling-2.0: ¥8.00/视频 (专业版)
   - kling-1.6/1.5/1.0: ¥1.60-0.80/视频

4. **Google Veo系列**
   - google-veo-3-fast: ¥12.00/视频 (快速版)
   - google-veo-3: ¥22.40/视频 (标准版)
   - google-veo-2: ¥14.40/视频 (经典版)

5. **字节跳动Seedance系列**
   - seedance-1.0-lite: ¥0.40/视频 (轻量版)
   - seedance-1.0-pro: ¥1.20/视频 (专业版)

6. **其他顶级模型**
   - pixverse-v4.5/v4/v3.5: ¥0.80/视频
   - vidu-q1: ¥2.00/视频, vidu-2.0: ¥0.80/视频
   - runway-gen-4-turbo/gen-3: ¥3.20/视频
   - luma-ray-2: ¥4.80/视频, luma-ray-2-flash: ¥1.60/视频
   - pika-2.2: ¥2.40/视频, pika-2.1: ¥4.80/视频
   - hunyuan: ¥1.60/视频 (腾讯)

**第三方API聚合器 (4个)**：
- AI/ML API, fal.ai, Each Labs, Replicate

#### 视频生成流程

1. **用户输入**
   - 文本描述 (Prompt)
   - 图像上传 (可选，用于图像到视频)
   - 参数配置 (分辨率、时长、运动强度等)

2. **API调用管理** (`src/lib/videoApi.ts`)
   ```typescript
   class VideoApiManager {
     // 单例模式管理所有API调用
     async generateVideo(request: VideoGenerationRequest): Promise<VideoGenerationResponse>
     async getVideoStatus(id: string, provider: string): Promise<VideoGenerationResponse>
   }
   ```

3. **请求处理** (`src/app/api/video/generate/route.ts`)
   - 验证输入参数
   - 路由到对应的API提供商
   - 错误处理和状态管理

4. **状态跟踪**
   - 实时状态查询 (pending → processing → completed/failed)
   - 轮询机制监控生成进度
   - 错误重试和恢复机制

### 2. 用户界面系统

#### 主页 (`src/app/page.tsx`)
- **导航栏** (NavBar): 品牌标识、导航菜单、用户认证
- **英雄区** (Hero): 主要价值主张和CTA按钮
- **品牌展示** (BrandsSection): 合作伙伴和技术支持
- **模型展示** (ModelsSection): 支持的AI模型介绍
- **功能介绍** (FeaturesSection): 核心功能和特色
- **效果展示** (EffectsSection): 生成效果示例
- **文本到视频** (TextToVideoSection): 功能演示
- **移动应用** (MobileAppSection): 移动端支持
- **用户反馈** (UsersSection): 用户评价和案例
- **常见问题** (FAQSection): FAQ和帮助信息
- **页脚** (FinalFooter): 联系信息和法律条款

#### 视频生成工作室 (`src/app/studio/page.tsx`)

**核心功能组件**：

1. **图像上传** (ImageUpload.tsx)
   - 支持JPG, PNG, WEBP格式
   - 批量上传 (最多10张)
   - 文件大小限制: 单文件最大10MB
   - 最小尺寸: 300×300px
   - 拖拽上传支持
   - 实时预览和错误处理

2. **智能提示输入** (PromptInput.tsx)
   - 智能联想和建议
   - 示例提示词库
   - 多语言支持 (中英文)
   - 实时字符计数
   - 分类筛选和随机生成

3. **参数配置**
   - **分辨率选择** (ResolutionSelector.tsx): 720p, 1080p, 2K, 4K
   - **时长设置** (DurationSettings.tsx): 1-60秒精确调节
   - **种子设置** (SeedSettings.tsx): 随机种子或自定义
   - **运动强度** (PromptStrengthControl.tsx): 0-100%精确控制

4. **生成界面** (GenerationInterface.tsx)
   - 实时进度监控
   - 详细状态日志
   - 暂停/恢复功能
   - 错误处理和重试

5. **结果展示**
   - **视频播放器** (VideoPlayer.tsx): 完整播放控制
   - **分享下载** (ShareDownload.tsx): 多格式下载和平台分享

#### Pollo AI克隆界面 (`src/app/pollo-demo/page.tsx`)
- 完全复制Pollo.ai的用户界面
- 侧边栏导航和工具图标
- 左侧控制面板和高级设置
- 响应式设计和交互动画

#### 通用视频生成页面 (`src/app/generate/page.tsx`)
- 模型选择器 (ModelSelector)
- 生成表单 (VideoGenerationForm)
- 结果展示 (VideoGenerationResult)

### 3. 模型管理系统 (`src/types/video.ts`)

#### 模型定义结构
```typescript
interface VideoModel {
  id: string;           // 唯一标识
  name: string;         // 显示名称
  provider: string;     // 提供商
  description: string;  // 功能描述
  features: string[];   // 支持特性
  maxDuration: number;  // 最大时长(秒)
  resolutions: string[]; // 支持分辨率
  price: string;        // 价格信息
  category: 'standard' | 'pro' | 'master'; // 分类
}
```

#### API提供商配置
```typescript
interface ApiProvider {
  name: string;         // 提供商名称
  baseUrl: string;      // API基础URL
  supportedModels: string[]; // 支持的模型列表
  apiKeyRequired: boolean;   // 是否需要API密钥
}
```

### 4. 状态管理和数据流

#### 前端状态管理
- React Hooks (useState, useEffect, useContext)
- 本地存储用户设置和历史记录
- 错误边界和异常处理

#### API调用流程
1. **用户操作** → 前端组件状态更新
2. **参数验证** → 构建API请求
3. **路由分发** → 根据模型ID选择提供商
4. **API调用** → 发送请求到对应的AI服务
5. **状态跟踪** → 轮询检查生成状态
6. **结果处理** → 返回视频URL或错误信息

## 🔧 API集成详解

### API密钥管理

所有API密钥通过环境变量配置：
```bash
# 官方API提供商
NEXT_PUBLIC_ALIBABA_KEY=your_alibaba_api_key
NEXT_PUBLIC_MINIMAX_KEY=your_minimax_api_key
NEXT_PUBLIC_KLING_KEY=your_kling_api_key
NEXT_PUBLIC_GOOGLE_API_KEY=your_google_api_key
NEXT_PUBLIC_GOOGLE_VERTEX_KEY=your_google_vertex_api_key
NEXT_PUBLIC_VOLCENGINE_KEY=your_volcengine_api_key
NEXT_PUBLIC_PIXVERSE_KEY=your_pixverse_api_key
NEXT_PUBLIC_VIDU_KEY=your_vidu_api_key
NEXT_PUBLIC_RUNWAY_KEY=your_runway_api_key
NEXT_PUBLIC_LUMA_KEY=your_luma_api_key
NEXT_PUBLIC_PIKA_KEY=your_pika_api_key
NEXT_PUBLIC_HUNYUAN_KEY=your_hunyuan_api_key

# 第三方聚合器 (可选)
NEXT_PUBLIC_AIMLAPI_KEY=your_aimlapi_key
NEXT_PUBLIC_FAL_KEY=your_fal_key
NEXT_PUBLIC_EACHLABS_KEY=your_eachlabs_key
NEXT_PUBLIC_REPLICATE_KEY=your_replicate_key
```

### API调用实现

每个提供商都有专门的调用方法：

```typescript
// 阿里云万相API调用示例
private async callAlibabaApi(request: VideoGenerationRequest): Promise<VideoGenerationResponse> {
  const endpoint = request.modelId.startsWith('wan-2.2') 
    ? '/services/aigc/text2image/generation'
    : '/services/aigc/text2video/generation';
    
  const response = await axios.post(`${API_PROVIDERS.alibaba.baseUrl}${endpoint}`, {
    model: this.getModelName(request.modelId),
    input: {
      prompt: request.prompt,
      ref_img: request.imageUrl,
    },
    parameters: {
      duration: request.duration || 6,
      resolution: request.resolution || '1280*720',
      seed: request.seed,
    }
  }, {
    headers: {
      'Authorization': `Bearer ${this.apiKeys.alibaba}`,
      'Content-Type': 'application/json',
      'X-DashScope-Async': 'enable',
    },
  });
  
  return this.formatResponse(response.data);
}
```

## 🎨 用户体验设计

### 设计原则
- **现代化界面**: 使用Tailwind CSS和shadcn/ui
- **响应式设计**: 完美适配桌面、平板、手机
- **暗色主题**: 统一的深色配色方案
- **流畅动画**: 平滑的过渡和交互效果
- **无障碍支持**: 遵循WCAG标准

### 交互体验
- **直观操作**: 步骤式引导和实时反馈
- **错误处理**: 详细的错误信息和修复建议
- **加载状态**: 精确的进度指示和状态更新
- **快捷操作**: 键盘快捷键和右键菜单

### 性能优化
- **懒加载**: 组件和图片按需加载
- **代码分割**: 按页面和功能模块分割
- **缓存策略**: 静态资源和API响应缓存
- **SEO优化**: 完整的元数据和结构化数据

## 🧪 测试和质量保证

### 自动化测试 (`tests/`)
- **功能测试**: Playwright端到端测试
- **性能测试**: 页面加载和API响应时间
- **可访问性测试**: 无障碍访问验证
- **跨浏览器测试**: Chrome, Firefox, Safari, Edge

### 代码质量
- **TypeScript**: 完整的类型安全
- **ESLint**: 代码风格和质量检查
- **错误边界**: React错误捕获和处理
- **日志记录**: 详细的操作和错误日志

## 🚀 部署和运维

### 构建流程
```bash
npm run build      # 生产构建
npm run start      # 生产启动
npm run dev        # 开发模式
npm run lint       # 代码检查
```

### 环境配置
- **开发环境**: 本地开发服务器
- **测试环境**: 自动化测试和集成
- **生产环境**: 优化构建和CDN部署

### 监控和分析
- **错误监控**: 实时错误跟踪和报警
- **性能监控**: 页面性能和API响应监控
- **用户分析**: 使用行为和转化漏斗分析

## 📈 商业模式

### 定价策略
- **免费版本**: ¥0/月 - 基础功能和有限额度
- **Lite版本**: ¥1,498/月 - 更多功能和额度
- **Pro版本**: ¥2,171/月 - 专业功能和无限额度

### 积分系统
- 不同模型消耗不同积分
- 积分购买和订阅模式
- 使用统计和成本控制

## 🔮 未来规划

### 短期计划
- [ ] 完善用户认证和权限管理
- [ ] 添加更多AI模型支持
- [ ] 优化移动端体验
- [ ] 增加视频编辑功能

### 长期愿景
- [ ] 实时协作功能
- [ ] AI视频编辑工具
- [ ] 企业版本和API服务
- [ ] 多语言国际化支持

## 📞 技术支持

### 文档资源
- `API_KEYS_SETUP.md`: API密钥配置指南
- `MODEL_UPDATE_SUMMARY.md`: 模型更新摘要
- `USER_MANUAL_TASKS.md`: 用户配置任务清单
- `VIDEO_STUDIO_FEATURES.md`: 工作室功能说明

### 联系方式
- 技术问题: 查看GitHub Issues
- 功能建议: 提交Feature Request
- 商务合作: 联系商务团队

---

**版本**: v1.0.0  
**最后更新**: 2024年12月  
**维护团队**: SeeWorld AI开发团队

此文档涵盖了SeeWorld AI网站的完整技术架构、功能实现、用户体验和商业模式。网站已具备完整的视频生成能力，只需配置相应的API密钥即可投入使用。
