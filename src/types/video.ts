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
    {
      id: 'kling-2.1',
      name: 'KLING 2.1',
      provider: 'KuaiShou',
      description: 'Advanced AI video generation with realistic motion',
      features: ['Text-to-Video', 'Image-to-Video', 'High Quality'],
      maxDuration: 10,
      resolutions: ['720p', '1080p'],
      price: '$0.45/video',
      category: 'standard'
    },
    {
      id: 'kling-2.1-master',
      name: 'KLING 2.1 Master',
      provider: 'KuaiShou',
      description: 'Premium version with enhanced quality and stability',
      features: ['Text-to-Video', 'Image-to-Video', 'Premium Quality', 'Enhanced Stability'],
      maxDuration: 10,
      resolutions: ['1080p', '4K'],
      price: '$1.20/video',
      category: 'master'
    },
    {
      id: 'hailuo-02',
      name: 'Hailuo-02',
      provider: 'MiniMax',
      description: 'Cinematic quality video generation with realistic physics',
      features: ['Text-to-Video', 'Image-to-Video', 'Physics Simulation', 'Cinematic Quality'],
      maxDuration: 6,
      resolutions: ['768p', '1080p'],
      price: '$0.48/video',
      category: 'pro'
    },
    {
      id: 'seedance-1-lite',
      name: 'Seedance-1 Lite',
      provider: 'ByteDance',
      description: 'Efficient video generation for quick results',
      features: ['Text-to-Video', 'Multi-shot', 'Fast Generation'],
      maxDuration: 4,
      resolutions: ['540p', '720p'],
      price: '$0.25/video',
      category: 'standard'
    },
    {
      id: 'seedance-1-pro',
      name: 'Seedance-1 Pro',
      provider: 'ByteDance',
      description: 'Professional grade video generation with advanced controls',
      features: ['Text-to-Video', 'Image-to-Video', 'Multi-shot', 'Motion Control'],
      maxDuration: 10,
      resolutions: ['720p', '1080p'],
      price: '$0.65/video',
      category: 'pro'
    },
    {
      id: 'pixverse-4.5',
      name: 'Pixverse 4.5',
      provider: 'PixVerse',
      description: 'High-quality video generation with motion control',
      features: ['Text-to-Video', 'Image-to-Video', 'Motion Strength Control'],
      maxDuration: 8,
      resolutions: ['540p', '720p', '1080p'],
      price: '$0.35/video',
      category: 'standard'
    },
    {
      id: 'veo-3-fast-plus',
      name: 'Google Veo 3 Fast Plus',
      provider: 'Google',
      description: 'Fast video generation with Google\'s latest model',
      features: ['Text-to-Video', 'Fast Generation', 'Audio Generation'],
      maxDuration: 8,
      resolutions: ['720p', '1080p'],
      price: '$0.75/video',
      category: 'pro'
    },
    {
      id: 'veo-3-plus',
      name: 'Google Veo 3 Plus',
      provider: 'Google',
      description: 'Premium video generation with highest quality',
      features: ['Text-to-Video', 'Audio Generation', 'Premium Quality', '8K Support'],
      maxDuration: 8,
      resolutions: ['720p', '1080p', '4K', '8K'],
      price: '$1.50/video',
      category: 'master'
    }
  ];
  
  export const API_PROVIDERS: Record<string, ApiProvider> = {
    aimlapi: {
      name: 'AI/ML API',
      baseUrl: 'https://api.aimlapi.com/v1',
      supportedModels: ['kling-2.1', 'kling-2.1-master', 'hailuo-02', 'seedance-1-lite', 'seedance-1-pro'],
      apiKeyRequired: true
    },
    fal: {
      name: 'fal.ai',
      baseUrl: 'https://fal.run',
      supportedModels: ['kling-2.1', 'hailuo-02', 'veo-3-fast-plus', 'veo-3-plus'],
      apiKeyRequired: true
    },
    pixverse: {
      name: 'PixVerse Official',
      baseUrl: 'https://api.pixverse.ai/v1',
      supportedModels: ['pixverse-4.5'],
      apiKeyRequired: true
    },
    google: {
      name: 'Google Gemini API',
      baseUrl: 'https://generativelanguage.googleapis.com/v1beta',
      supportedModels: ['veo-3-fast-plus', 'veo-3-plus'],
      apiKeyRequired: true
    }
  };
  