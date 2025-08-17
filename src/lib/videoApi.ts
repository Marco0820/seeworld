import axios from 'axios';
import { VideoGenerationRequest, VideoGenerationResponse, VIDEO_MODELS, API_PROVIDERS } from '@/types/video';
import { v4 as uuidv4 } from 'uuid';

export class VideoApiManager {
  private static instance: VideoApiManager;
  private apiKeys: Record<string, string> = {};

  private constructor() {
    // Load API keys from environment variables
    this.apiKeys = {
      aimlapi: process.env.NEXT_PUBLIC_AIMLAPI_KEY || '',
      fal: process.env.NEXT_PUBLIC_FAL_KEY || '',
      pixverse: process.env.NEXT_PUBLIC_PIXVERSE_KEY || '',
      google: process.env.NEXT_PUBLIC_GOOGLE_API_KEY || '',
    };
  }

  public static getInstance(): VideoApiManager {
    if (!VideoApiManager.instance) {
      VideoApiManager.instance = new VideoApiManager();
    }
    return VideoApiManager.instance;
  }

  public setApiKey(provider: string, key: string): void {
    this.apiKeys[provider] = key;
  }

  private getProviderForModel(modelId: string): string {
    for (const [providerId, provider] of Object.entries(API_PROVIDERS)) {
      if (provider.supportedModels.includes(modelId)) {
        return providerId;
      }
    }
    throw new Error(`No provider found for model: ${modelId}`);
  }

  private async callAimlApi(request: VideoGenerationRequest): Promise<VideoGenerationResponse> {
    const model = VIDEO_MODELS.find(m => m.id === request.modelId);
    if (!model) throw new Error('Model not found');

    const response = await axios.post(`${API_PROVIDERS.aimlapi.baseUrl}/video/generations`, {
      model: request.modelId,
      prompt: request.prompt,
      image_url: request.imageUrl,
      duration: request.duration || model.maxDuration,
      resolution: request.resolution || model.resolutions[0],
      aspect_ratio: request.aspectRatio || '16:9',
      motion_strength: request.motionStrength || 5,
      seed: request.seed,
      negative_prompt: request.negativePrompt,
    }, {
      headers: {
        'Authorization': `Bearer ${this.apiKeys.aimlapi}`,
        'Content-Type': 'application/json',
      },
    });

    return {
      id: response.data.id || uuidv4(),
      status: this.mapStatus(response.data.status),
      videoUrl: response.data.video_url,
      thumbnailUrl: response.data.thumbnail_url,
      duration: response.data.duration,
      createdAt: new Date().toISOString(),
      modelUsed: request.modelId,
      progress: response.data.progress || 0,
    };
  }

  private async callFalApi(request: VideoGenerationRequest): Promise<VideoGenerationResponse> {
    const model = VIDEO_MODELS.find(m => m.id === request.modelId);
    if (!model) throw new Error('Model not found');

    let endpoint = '';
    switch (request.modelId) {
      case 'kling-2.1':
        endpoint = '/fal-ai/kling/v1/standard/text-to-video';
        break;
      case 'hailuo-02':
        endpoint = '/fal-ai/minimax/hailuo-02/standard/text-to-video';
        break;
      case 'veo-3-fast-plus':
        endpoint = '/fal-ai/veo3';
        break;
      case 'veo-3-plus':
        endpoint = '/fal-ai/veo3';
        break;
      default:
        throw new Error('Model not supported by fal.ai');
    }

    const response = await axios.post(`${API_PROVIDERS.fal.baseUrl}${endpoint}`, {
      prompt: request.prompt,
      image_url: request.imageUrl,
      duration: request.duration || model.maxDuration,
      aspect_ratio: request.aspectRatio || '16:9',
      motion_strength: request.motionStrength || 5,
      seed: request.seed,
    }, {
      headers: {
        'Authorization': `Key ${this.apiKeys.fal}`,
        'Content-Type': 'application/json',
      },
    });

    return {
      id: response.data.request_id || uuidv4(),
      status: this.mapStatus(response.data.status),
      videoUrl: response.data.video?.url,
      thumbnailUrl: response.data.video?.thumbnail_url,
      duration: response.data.video?.duration,
      createdAt: new Date().toISOString(),
      modelUsed: request.modelId,
      progress: response.data.progress || 0,
    };
  }

  private async callPixverseApi(request: VideoGenerationRequest): Promise<VideoGenerationResponse> {
    const response = await axios.post(`${API_PROVIDERS.pixverse.baseUrl}/video/generations`, {
      prompt: request.prompt,
      image_url: request.imageUrl,
      duration: request.duration || 8,
      resolution: request.resolution || '720p',
      aspect_ratio: request.aspectRatio || '16:9',
      motion_strength: request.motionStrength || 5,
      seed: request.seed,
      negative_prompt: request.negativePrompt,
    }, {
      headers: {
        'Authorization': `Bearer ${this.apiKeys.pixverse}`,
        'Content-Type': 'application/json',
      },
    });

    return {
      id: response.data.id || uuidv4(),
      status: this.mapStatus(response.data.status),
      videoUrl: response.data.video_url,
      thumbnailUrl: response.data.thumbnail_url,
      duration: response.data.duration,
      createdAt: new Date().toISOString(),
      modelUsed: request.modelId,
      progress: response.data.progress || 0,
    };
  }

  private async callGoogleApi(request: VideoGenerationRequest): Promise<VideoGenerationResponse> {
    const response = await axios.post(`${API_PROVIDERS.google.baseUrl}/models/veo-3.0-generate-preview:generateContent`, {
      contents: [{
        parts: [{
          text: request.prompt
        }]
      }],
      generationConfig: {
        videoConfig: {
          duration: request.duration || 8,
          aspectRatio: request.aspectRatio || '16:9',
        }
      }
    }, {
      headers: {
        'Authorization': `Bearer ${this.apiKeys.google}`,
        'Content-Type': 'application/json',
      },
    });

    return {
      id: response.data.candidates?.[0]?.content?.parts?.[0]?.videoMetadata?.videoId || uuidv4(),
      status: 'processing',
      videoUrl: response.data.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data,
      createdAt: new Date().toISOString(),
      modelUsed: request.modelId,
      progress: 100,
    };
  }

  private mapStatus(status: string): 'pending' | 'processing' | 'completed' | 'failed' {
    const statusMap: Record<string, 'pending' | 'processing' | 'completed' | 'failed'> = {
      'queued': 'pending',
      'processing': 'processing',
      'in_progress': 'processing',
      'completed': 'completed',
      'succeeded': 'completed',
      'failed': 'failed',
      'error': 'failed',
    };
    return statusMap[status.toLowerCase()] || 'pending';
  }

  public async generateVideo(request: VideoGenerationRequest): Promise<VideoGenerationResponse> {
    try {
      const provider = this.getProviderForModel(request.modelId);

      if (!this.apiKeys[provider]) {
        throw new Error(`API key not configured for provider: ${provider}`);
      }

      switch (provider) {
        case 'aimlapi':
          return await this.callAimlApi(request);
        case 'fal':
          return await this.callFalApi(request);
        case 'pixverse':
          return await this.callPixverseApi(request);
        case 'google':
          return await this.callGoogleApi(request);
        default:
          throw new Error(`Provider not implemented: ${provider}`);
      }
    } catch (error) {
      console.error('Video generation error:', error);
      return {
        id: uuidv4(),
        status: 'failed',
        createdAt: new Date().toISOString(),
        modelUsed: request.modelId,
        error: error instanceof Error ? error.message : 'Unknown error occurred',
        progress: 0,
      };
    }
  }

  public async getVideoStatus(id: string, provider: string): Promise<VideoGenerationResponse> {
    try {
      let response;
      switch (provider) {
        case 'aimlapi':
          response = await axios.get(`${API_PROVIDERS.aimlapi.baseUrl}/video/generations/${id}`, {
            headers: { 'Authorization': `Bearer ${this.apiKeys.aimlapi}` }
          });
          break;
        case 'fal':
          response = await axios.get(`${API_PROVIDERS.fal.baseUrl}/status/${id}`, {
            headers: { 'Authorization': `Key ${this.apiKeys.fal}` }
          });
          break;
        case 'pixverse':
          response = await axios.get(`${API_PROVIDERS.pixverse.baseUrl}/video/generations/${id}`, {
            headers: { 'Authorization': `Bearer ${this.apiKeys.pixverse}` }
          });
          break;
        default:
          throw new Error(`Status check not implemented for provider: ${provider}`);
      }

      return {
        id: response.data.id || id,
        status: this.mapStatus(response.data.status),
        videoUrl: response.data.video_url || response.data.video?.url,
        thumbnailUrl: response.data.thumbnail_url || response.data.video?.thumbnail_url,
        duration: response.data.duration || response.data.video?.duration,
        createdAt: response.data.created_at || new Date().toISOString(),
        modelUsed: response.data.model || 'unknown',
        progress: response.data.progress || (this.mapStatus(response.data.status) === 'completed' ? 100 : 50),
      };
    } catch (error) {
      console.error('Status check error:', error);
      return {
        id,
        status: 'failed',
        createdAt: new Date().toISOString(),
        modelUsed: 'unknown',
        error: error instanceof Error ? error.message : 'Failed to check status',
        progress: 0,
      };
    }
  }
}

export const videoApiManager = VideoApiManager.getInstance();
