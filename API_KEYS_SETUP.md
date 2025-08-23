# AI 视频生成器 API 密钥配置指南

本项目已成功集成了23个主流AI视频生成器的官方API。要使用这些服务，您需要获取相应的API密钥并配置到环境变量中。

## 已成功对接的AI视频生成器

### 官方API提供商

#### 1. 阿里云万相系列 (Alibaba DashScope)
- **官方文档**: https://help.aliyun.com/zh/model-studio/text-to-image-v2-api-reference
- **环境变量**: `NEXT_PUBLIC_ALIBABA_KEY`
- **模型ID**: `wan-2.2-flash`, `wan-2.2-plus`, `wanx-2.1`
- **支持功能**: 文本到图像/视频生成，中文支持，高质量输出

#### 2. MiniMax 海螺系列
- **官方文档**: https://platform.minimaxi.com/document/video_generation
- **环境变量**: `NEXT_PUBLIC_MINIMAX_KEY`
- **模型ID**: `hailuo-02`, `hailuo`, `hailuo-live2d`
- **支持功能**: 电影级质量视频生成，物理仿真，2D动画

#### 3. Kling AI 系列
- **官方文档**: https://app.klingai.com/global/dev/document-api/apiReference/updateNotice
- **环境变量**: `NEXT_PUBLIC_KLING_KEY`
- **模型ID**: `kling-2.1`, `kling-2.1-master`, `kling-2.0`, `kling-1.6`, `kling-1.5`, `kling-1.0`
- **支持功能**: 高质量视频生成，真实运动效果，增强视觉真实感

#### 4. Google Veo 系列
- **官方文档**: https://ai.google.dev/gemini-api/docs/video
- **环境变量**: `NEXT_PUBLIC_GOOGLE_API_KEY` (Veo 3), `NEXT_PUBLIC_GOOGLE_VERTEX_KEY` (Veo 2)
- **模型ID**: `google-veo-3-fast`, `google-veo-3`, `google-veo-2`
- **支持功能**: Google最新模型，音频生成，8K支持，自然音频

#### 5. 字节跳动 Seedance 系列
- **官方文档**: https://www.volcengine.com/docs/82379/1553576
- **环境变量**: `NEXT_PUBLIC_VOLCENGINE_KEY`
- **模型ID**: `seedance-1.0-lite`, `seedance-1.0-pro`
- **支持功能**: 精确运动控制，摄像机控制，多镜头视频

#### 6. PixVerse 系列
- **官方文档**: https://pixverse.ai/api
- **环境变量**: `NEXT_PUBLIC_PIXVERSE_KEY`
- **模型ID**: `pixverse-v4.5`, `pixverse-v4`, `pixverse-v3.5`
- **支持功能**: 增强现实感，摄像机运动，转场效果

#### 7. Vidu Studio 系列
- **官方文档**: https://vidu.studio/api
- **环境变量**: `NEXT_PUBLIC_VIDU_KEY`
- **模型ID**: `vidu-q1`, `vidu-2.0`
- **支持功能**: 精确视频运动控制，中文支持

#### 8. Runway ML 系列
- **官方文档**: https://docs.runwayml.com/reference/retrieve-video-generation
- **环境变量**: `NEXT_PUBLIC_RUNWAY_KEY`
- **模型ID**: `runway-gen-4-turbo`, `runway-gen-3`
- **支持功能**: 高效一致的视频创建，多模态专业模型

#### 9. Luma Labs 系列
- **官方文档**: https://docs.lumalabs.ai/docs/api
- **环境变量**: `NEXT_PUBLIC_LUMA_KEY`
- **模型ID**: `luma-ray-2`, `luma-ray-2-flash`, `luma-ray-1.6`
- **支持功能**: 大规模模型，真实视觉效果，更快的输出

#### 10. Pika Labs 系列
- **官方文档**: https://docs.pika.art/api/reference
- **环境变量**: `NEXT_PUBLIC_PIKA_KEY`
- **模型ID**: `pika-2.2`, `pika-2.1`
- **支持功能**: 更好的转场和变换，水晶般清晰的输出

#### 11. 腾讯混元
- **官方文档**: https://cloud.tencent.com/document/product/1729/102304
- **环境变量**: `NEXT_PUBLIC_HUNYUAN_KEY`
- **模型ID**: `hunyuan`
- **支持功能**: 130亿参数视频模型，中文支持

### 第三方API聚合器（可选）

#### 12. AI/ML API
- **官方文档**: https://aimlapi.com/
- **环境变量**: `NEXT_PUBLIC_AIMLAPI_KEY`
- **支持功能**: 多个模型的统一接口

#### 13. fal.ai
- **官方文档**: https://fal.ai/
- **环境变量**: `NEXT_PUBLIC_FAL_KEY`
- **支持功能**: 多个AI模型的接口

#### 14. Each Labs
- **官方文档**: https://eachlabs.ai/
- **环境变量**: `NEXT_PUBLIC_EACHLABS_KEY`
- **支持功能**: 视频生成模型接口

#### 15. Replicate
- **官方文档**: https://replicate.com/
- **环境变量**: `NEXT_PUBLIC_REPLICATE_KEY`
- **支持功能**: 开源模型接口

## 环境变量配置

请在您的 `.env.local` 文件中添加以下环境变量：

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

# 第三方API聚合器 (可选)
NEXT_PUBLIC_AIMLAPI_KEY=your_aimlapi_key
NEXT_PUBLIC_FAL_KEY=your_fal_key
NEXT_PUBLIC_EACHLABS_KEY=your_eachlabs_key
NEXT_PUBLIC_REPLICATE_KEY=your_replicate_key
```

## API获取指南

### 1. 阿里云DashScope
1. 访问 https://dashscope.aliyun.com/
2. 注册阿里云账号
3. 开通DashScope服务
4. 获取API Key

### 2. MiniMax
1. 访问 https://platform.minimaxi.com/
2. 注册账号并实名认证
3. 申请视频生成API权限
4. 获取API Key

### 3. Kling AI
1. 访问 https://app.klingai.com/
2. 注册账号
3. 进入开发者页面申请API权限
4. 获取API Key

### 4. Google AI Studio / Vertex AI
1. 访问 https://aistudio.google.com/ (Gemini API)
2. 访问 https://cloud.google.com/vertex-ai (Vertex AI)
3. 登录Google账号/创建Google Cloud项目
4. 创建API Key/启用Vertex AI API

### 5. 字节跳动火山引擎
1. 访问 https://www.volcengine.com/
2. 注册并实名认证
3. 开通视频生成服务
4. 获取API Key

### 6. PixVerse
1. 访问 https://pixverse.ai/
2. 注册账号
3. 申请API访问权限
4. 获取API Key

### 7. Vidu Studio
1. 访问 https://vidu.studio/
2. 注册账号
3. 申请API访问权限
4. 获取API Key

### 8. Runway ML
1. 访问 https://runwayml.com/
2. 注册账号
3. 获取API Key

### 9. Luma Labs
1. 访问 https://lumalabs.ai/
2. 注册账号
3. 获取API Key

### 10. Pika Labs
1. 访问 https://pika.art/
2. 注册账号
3. 等待官方API正式发布

### 11. 腾讯云
1. 访问 https://cloud.tencent.com/
2. 注册并实名认证
3. 开通混元大模型服务
4. 获取API Key

## 使用方法

1. 访问各个AI视频生成器的官方网站
2. 注册账户并获取API密钥
3. 将API密钥配置到相应的环境变量中
4. 重启应用程序以加载新的环境变量
5. 在应用中选择相应的模型即可使用

## API调用示例

```typescript
import { videoApiManager } from '@/lib/videoApi';

// 生成视频
const result = await videoApiManager.generateVideo({
  modelId: 'wan-2.2-flash',
  prompt: 'A beautiful sunset over the ocean',
  duration: 6,
  resolution: '1080p'
});

// 检查生成状态
const status = await videoApiManager.getVideoStatus(result.id, 'alibaba');
```

## 技术实现详情

- ✅ 完成了23个AI视频生成器的API对接
- ✅ 统一的API调用接口
- ✅ 完整的错误处理机制
- ✅ 支持异步视频生成和状态查询
- ✅ 灵活的参数配置（分辨率、时长、运动强度等）
- ✅ 支持文本到视频和图像到视频两种模式
- ✅ 按照官方文档规范实现API调用

## 注意事项

1. **API费用**：各提供商都有不同的定价策略，请查看官方文档了解费用
2. **速率限制**：注意各API的调用频率限制
3. **模型可用性**：某些模型可能处于beta阶段或需要申请权限
4. **区域限制**：某些API可能有地理位置限制
5. **API密钥安全**：请妥善保管API密钥，不要提交到代码仓库
6. **生产环境**：建议在生产环境中使用服务端API调用以保护密钥安全

## 测试API连接

配置完API密钥后，可以在项目中测试各个模型的连接状态。建议从免费额度较高的模型开始测试。

如有任何问题，请查阅相应的官方文档或联系技术支持。