export interface VideoModel {
    id: string;
    name: string;
    provider: string;
    description: string;
    features: string[];
    maxDuration: number; // seconds
    resolutions: string[];
    price: string;
    category: 'standard' | 'pro' | 'master';
  }
  
  export interface VideoGenerationRequest {
    modelId: string;
    prompt: string;
    imageUrl?: string;
    duration?: number;
    resolution?: string;
    aspectRatio?: string;
    motionStrength?: number;
    seed?: number;
    negativePrompt?: string;
  }
  
  export interface VideoGenerationResponse {
    id: string;
    status: 'pending' | 'processing' | 'completed' | 'failed';
    videoUrl?: string;
    thumbnailUrl?: string;
    duration?: number;
    createdAt: string;
    modelUsed: string;
    error?: string;
    progress?: number;
  }
  
  export interface ApiProvider {
    name: string;
    baseUrl: string;
    supportedModels: string[];
    apiKeyRequired: boolean;
  }
  
  export const VIDEO_MODELS: VideoModel[] = [
// Updated models based on model-selector.tsx
{
  id: 'wan-2.2-flash',
  name: 'Wan 2.2 Flash',
  provider: 'Alibaba',
  description: 'Fast generation and better reliability',
  features: ['Text-to-Video', 'Image-to-Video', 'Fast Generation'],
  maxDuration: 6,
  resolutions: ['720p', '1080p'],
  price: '$0.32/video',
  category: 'standard'
},
{
  id: 'wan-2.2-plus',
  name: 'Wan 2.2 Plus',
  provider: 'Alibaba',
  description: 'Stable fluid motion and lifelike dynamics',
  features: ['Text-to-Video', 'Image-to-Video', 'High Quality'],
  maxDuration: 6,
  resolutions: ['720p', '1080p'],
  price: '$0.42/video',
  category: 'pro'
},
{
  id: 'hailuo-02',
  name: 'Hailuo 02',
  provider: 'MiniMax',
  description: 'Extreme physics simulations',
  features: ['Text-to-Video', 'Image-to-Video', 'Physics Simulation', 'Cinematic Quality'],
  maxDuration: 6,
  resolutions: ['768p', '1080p'],
  price: '$0.48/video',
  category: 'pro'
},
{
  id: 'kling-2.1',
  name: 'Kling 2.1',
  provider: 'Kling AI',
  description: 'Enhanced visual realism and motion fluidity',
  features: ['Text-to-Video', 'Image-to-Video', 'High Quality'],
  maxDuration: 10,
  resolutions: ['720p', '1080p'],
  price: '$1.60/video',
  category: 'pro'
},
{
  id: 'kling-2.1-master',
  name: 'Kling 2.1 Master',
  provider: 'Kling AI',
  description: 'Enhanced visual realism and motion fluidity',
  features: ['Text-to-Video', 'Image-to-Video', 'Premium Quality', 'Enhanced Stability'],
  maxDuration: 10,
  resolutions: ['1080p', '4K'],
  price: '$8.00/video',
  category: 'master'
},
{
  id: 'google-veo-3-fast',
  name: 'Google Veo 3 Fast',
  provider: 'Google',
  description: '30% Faster than standard Veo 3 model',
  features: ['Text-to-Video', 'Fast Generation', 'Audio Generation'],
  maxDuration: 8,
  resolutions: ['720p', '1080p'],
  price: '$12.00/video',
  category: 'master'
},
{
  id: 'google-veo-3',
  name: 'Google Veo 3',
  provider: 'Google',
  description: 'Realistic outputs with natural audio',
  features: ['Text-to-Video', 'Audio Generation', 'Premium Quality', '8K Support'],
  maxDuration: 8,
  resolutions: ['720p', '1080p', '4K', '8K'],
  price: '$22.40/video',
  category: 'master'
},
{
  id: 'seedance-1.0-lite',
  name: 'Seedance 1.0 Lite',
  provider: 'ByteDance',
  description: 'Accurate motion and camera control',
  features: ['Text-to-Video', 'Multi-shot', 'Fast Generation'],
  maxDuration: 4,
  resolutions: ['540p', '720p'],
  price: '$0.40/video',
  category: 'standard'
},
{
  id: 'seedance-1.0-pro',
  name: 'Seedance 1.0 Pro',
  provider: 'ByteDance',
  description: 'Fluid, cohesive multi-shot video outputs',
  features: ['Text-to-Video', 'Image-to-Video', 'Multi-shot', 'Motion Control'],
  maxDuration: 10,
  resolutions: ['720p', '1080p'],
  price: '$1.20/video',
  category: 'pro'
},
{
  id: 'pixverse-v4.5',
  name: 'Pixverse V4.5',
  provider: 'PixVerse',
  description: 'Enhanced realism and camera motions',
  features: ['Text-to-Video', 'Image-to-Video', 'Motion Strength Control'],
  maxDuration: 8,
  resolutions: ['540p', '720p', '1080p'],
  price: '$0.80/video',
  category: 'standard'
},
{
  id: 'vidu-q1',
  name: 'Vidu Q1',
  provider: 'Vidu Studio',
  description: 'Precise control over video motion',
  features: ['Text-to-Video', 'Image-to-Video', 'Chinese Support', 'High Quality'],
  maxDuration: 8,
  resolutions: ['720p', '1080p'],
  price: '$2.00/video',
  category: 'pro'
},
{
  id: 'runway-gen-4-turbo',
  name: 'Runway Gen-4 Turbo',
  provider: 'Runway',
  description: 'Efficient, consistent video creation',
  features: ['Text-to-Video', 'Image-to-Video', 'Photorealistic', 'Fast Generation'],
  maxDuration: 10,
  resolutions: ['720p', '1080p'],
  price: '$3.20/video',
  category: 'pro'
},
{
  id: 'luma-ray-2',
  name: 'Luma Ray 2',
  provider: 'Luma AI',
  description: 'Large scale model for realistic visuals',
  features: ['Text-to-Video', 'Image-to-Video', 'Artistic Styles', 'High Quality'],
  maxDuration: 5,
  resolutions: ['720p', '1080p'],
  price: '$4.80/video',
  category: 'pro'
},
{
  id: 'luma-ray-2-flash',
  name: 'Luma Ray 2 Flash',
  provider: 'Luma AI',
  description: 'Faster outputs with coherent motion',
  features: ['Text-to-Video', 'Image-to-Video', 'Fast Generation'],
  maxDuration: 5,
  resolutions: ['720p', '1080p'],
  price: '$1.60/video',
  category: 'standard'
},
{
  id: 'pika-2.2',
  name: 'Pika 2.2',
  provider: 'Pika Labs',
  description: 'Better transition and transformation',
  features: ['Text-to-Video', 'Image-to-Video', 'Motion Control', 'Style Transfer'],
  maxDuration: 4,
  resolutions: ['720p', '1080p'],
  price: '$2.40/video',
  category: 'pro'
},
{
  id: 'kling-2.0',
  name: 'Kling 2.0',
  provider: 'Kling AI',
  description: 'Better motion dynamics and aesthetics',
  features: ['Text-to-Video', 'Image-to-Video', 'High Quality'],
  maxDuration: 10,
  resolutions: ['720p', '1080p'],
  price: '$8.00/video',
  category: 'master'
},
{
  id: 'kling-1.6',
  name: 'Kling 1.6',
  provider: 'Kling AI',
  description: 'More realistic motions',
  features: ['Text-to-Video', 'Image-to-Video'],
  maxDuration: 10,
  resolutions: ['720p', '1080p'],
  price: '$1.60/video',
  category: 'standard'
},
{
  id: 'pixverse-v4',
  name: 'Pixverse V4',
  provider: 'PixVerse',
  description: 'Improved motion and coherence',
  features: ['Text-to-Video', 'Image-to-Video'],
  maxDuration: 8,
  resolutions: ['540p', '720p', '1080p'],
  price: '$0.80/video',
  category: 'standard'
},
{
  id: 'pixverse-v3.5',
  name: 'Pixverse V3.5',
  provider: 'PixVerse',
  description: 'Improved motion and coherence',
  features: ['Text-to-Video', 'Image-to-Video'],
  maxDuration: 8,
  resolutions: ['540p', '720p'],
  price: '$0.80/video',
  category: 'standard'
},
{
  id: 'google-veo-2',
  name: 'Google Veo 2',
  provider: 'Google',
  description: 'HD outputs with visually rich content',
  features: ['Text-to-Video', 'Audio Generation'],
  maxDuration: 8,
  resolutions: ['720p', '1080p'],
  price: '$14.40/video',
  category: 'master'
},
{
  id: 'runway-gen-3',
  name: 'Runway Gen-3',
  provider: 'Runway',
  description: 'Multimodal, professional model',
  features: ['Text-to-Video', 'Image-to-Video', 'Photorealistic'],
  maxDuration: 10,
  resolutions: ['720p', '1080p'],
  price: '$3.20/video',
  category: 'pro'
},
{
  id: 'vidu-2.0',
  name: 'Vidu 2.0',
  provider: 'Vidu Studio',
  description: 'Enhanced quality and speed',
  features: ['Text-to-Video', 'Image-to-Video', 'Chinese Support'],
  maxDuration: 8,
  resolutions: ['720p', '1080p'],
  price: '$0.80/video',
  category: 'standard'
},
{
  id: 'hailuo',
  name: 'Hailuo',
  provider: 'MiniMax',
  description: 'Highest video quality',
  features: ['Text-to-Video', 'Image-to-Video', 'Physics Simulation'],
  maxDuration: 6,
  resolutions: ['768p', '1080p'],
  price: '$2.80/video',
  category: 'pro'
},
{
  id: 'luma-ray-1.6',
  name: 'Luma Ray 1.6',
  provider: 'Luma AI',
  description: 'Realistic and detailed videos',
  features: ['Text-to-Video', 'Image-to-Video'],
  maxDuration: 5,
  resolutions: ['720p', '1080p'],
  price: '$4.80/video',
  category: 'pro'
},
{
  id: 'wanx-2.1',
  name: 'Wanx 2.1',
  provider: 'Alibaba',
  description: 'Alibaba\'s model with realistic outputs',
  features: ['Text-to-Video', 'Image-to-Video', 'Chinese Support'],
  maxDuration: 8,
  resolutions: ['720p', '1080p'],
  price: '$1.60/video',
  category: 'pro'
},
{
  id: 'hunyuan',
  name: 'Hunyuan',
  provider: 'Tencent',
  description: 'Tencent\'s 13B-parameter video model',
  features: ['Text-to-Video', 'Image-to-Video', 'Chinese Support'],
  maxDuration: 6,
  resolutions: ['720p', '1080p'],
  price: '$1.60/video',
  category: 'pro'
},
{
  id: 'hailuo-live2d',
  name: 'Hailuo Live2D',
  provider: 'MiniMax',
  description: 'Good for 2D animation',
  features: ['Text-to-Video', '2D Animation'],
  maxDuration: 6,
  resolutions: ['768p', '1080p'],
  price: '$2.80/video',
  category: 'pro'
},
{
  id: 'pika-2.1',
  name: 'Pika 2.1',
  provider: 'Pika Labs',
  description: 'Crystal-clear and immersive outputs',
  features: ['Text-to-Video', 'Image-to-Video', 'Motion Control'],
  maxDuration: 4,
  resolutions: ['720p', '1080p'],
  price: '$4.80/video',
  category: 'pro'
},
{
  id: 'kling-1.5',
  name: 'Kling 1.5',
  provider: 'Kling AI',
  description: 'Suitable for complex scenes',
  features: ['Text-to-Video', 'Image-to-Video'],
  maxDuration: 10,
  resolutions: ['720p', '1080p'],
  price: '$1.60/video',
  category: 'standard'
},
{
  id: 'kling-1.0',
  name: 'Kling 1.0',
  provider: 'Kling AI',
  description: 'Suitable for short videos',
  features: ['Text-to-Video'],
  maxDuration: 5,
  resolutions: ['720p'],
  price: '$0.80/video',
  category: 'standard'
}
];
  
  export const API_PROVIDERS: Record<string, ApiProvider> = {
// Official API providers with correct endpoints
alibaba: {
  name: 'Alibaba Cloud DashScope',
  baseUrl: 'https://dashscope.aliyuncs.com/api/v1',
  supportedModels: ['wan-2.2-flash', 'wan-2.2-plus', 'wanx-2.1'],
  apiKeyRequired: true
},
minimax: {
  name: 'MiniMax',
  baseUrl: 'https://api.minimaxi.com/v1',
  supportedModels: ['hailuo-02', 'hailuo', 'hailuo-live2d'],
  apiKeyRequired: true
},
kling: {
  name: 'Kling AI',
  baseUrl: 'https://api.klingai.com/v1',
  supportedModels: ['kling-2.1', 'kling-2.1-master', 'kling-2.0', 'kling-1.6', 'kling-1.5', 'kling-1.0'],
  apiKeyRequired: true
},
google: {
  name: 'Google Gemini API',
  baseUrl: 'https://generativelanguage.googleapis.com/v1beta',
  supportedModels: ['google-veo-3-fast', 'google-veo-3'],
  apiKeyRequired: true
},
google_vertex: {
  name: 'Google Vertex AI',
  baseUrl: 'https://us-central1-aiplatform.googleapis.com/v1',
  supportedModels: ['google-veo-2'],
  apiKeyRequired: true
},
volcengine: {
  name: 'ByteDance Volcengine',
  baseUrl: 'https://ark.cn-beijing.volces.com/api/v3',
  supportedModels: ['seedance-1.0-lite', 'seedance-1.0-pro'],
  apiKeyRequired: true
},
pixverse: {
  name: 'PixVerse Official',
  baseUrl: 'https://api.pixverse.ai/v1',
  supportedModels: ['pixverse-v4.5', 'pixverse-v4', 'pixverse-v3.5'],
  apiKeyRequired: true
},
vidu: {
  name: 'Vidu Studio',
  baseUrl: 'https://api.vidu.studio/v1',
  supportedModels: ['vidu-q1', 'vidu-2.0'],
  apiKeyRequired: true
},
runway: {
  name: 'Runway ML',
  baseUrl: 'https://api.runwayml.com/v1',
  supportedModels: ['runway-gen-4-turbo', 'runway-gen-3'],
  apiKeyRequired: true
},
luma: {
  name: 'Luma Labs',
  baseUrl: 'https://api.lumalabs.ai/dream-machine/v1',
  supportedModels: ['luma-ray-2', 'luma-ray-2-flash', 'luma-ray-1.6'],
  apiKeyRequired: true
},
pika: {
  name: 'Pika Labs',
  baseUrl: 'https://api.pika.art/v1',
  supportedModels: ['pika-2.2', 'pika-2.1'],
  apiKeyRequired: true
},
hunyuan: {
  name: 'Tencent Hunyuan',
  baseUrl: 'https://hunyuan.tencentcloudapi.com',
  supportedModels: ['hunyuan'],
  apiKeyRequired: true
},
// Third-party API aggregators
aimlapi: {
  name: 'AI/ML API',
  baseUrl: 'https://api.aimlapi.com/v1',
  supportedModels: ['kling-2.1', 'kling-2.1-master', 'hailuo-02', 'seedance-1.0-lite', 'seedance-1.0-pro', 'luma-ray-2'],
  apiKeyRequired: true
},
fal: {
  name: 'fal.ai',
  baseUrl: 'https://fal.run',
  supportedModels: ['kling-2.1', 'hailuo-02', 'google-veo-3-fast', 'google-veo-3'],
  apiKeyRequired: true
},
eachlabs: {
  name: 'Each Labs',
  baseUrl: 'https://api.eachlabs.ai/v1',
  supportedModels: ['seedance-1.0-pro', 'pixverse-v4.5'],
  apiKeyRequired: true
},
replicate: {
  name: 'Replicate',
  baseUrl: 'https://api.replicate.com/v1',
  supportedModels: ['luma-ray-1.6'],
  apiKeyRequired: true
}
};
  