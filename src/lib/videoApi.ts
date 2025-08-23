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
      google_vertex: process.env.NEXT_PUBLIC_GOOGLE_VERTEX_KEY || '',
      runway: process.env.NEXT_PUBLIC_RUNWAY_KEY || '',
      minimax: process.env.NEXT_PUBLIC_MINIMAX_KEY || '',
      kling: process.env.NEXT_PUBLIC_KLING_KEY || '',
      pika: process.env.NEXT_PUBLIC_PIKA_KEY || '',
      vidu: process.env.NEXT_PUBLIC_VIDU_KEY || '',
      hunyuan: process.env.NEXT_PUBLIC_HUNYUAN_KEY || '',
      alibaba: process.env.NEXT_PUBLIC_ALIBABA_KEY || '',
      volcengine: process.env.NEXT_PUBLIC_VOLCENGINE_KEY || '',
      luma: process.env.NEXT_PUBLIC_LUMA_KEY || '',
      eachlabs: process.env.NEXT_PUBLIC_EACHLABS_KEY || '',
      replicate: process.env.NEXT_PUBLIC_REPLICATE_KEY || '',
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
    let endpoint = '';
    let model = '';
    
    if (request.modelId === 'google-veo-2') {
      // Vertex AI endpoint for Veo 2
      endpoint = `${API_PROVIDERS.google_vertex.baseUrl}/projects/YOUR_PROJECT_ID/locations/us-central1/publishers/google/models/veo-2:generateContent`;
      model = 'veo-2';
    } else {
      // Gemini API for Veo 3
      model = request.modelId === 'google-veo-3-fast' ? 'veo-3.0-fast-generate-preview' : 'veo-3.0-generate-preview';
      endpoint = `${API_PROVIDERS.google.baseUrl}/models/${model}:generateContent`;
    }

    const response = await axios.post(endpoint, {
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

  private async callGoogleVertexApi(request: VideoGenerationRequest): Promise<VideoGenerationResponse> {
    const response = await axios.post(`${API_PROVIDERS.google_vertex.baseUrl}/projects/YOUR_PROJECT_ID/locations/us-central1/publishers/google/models/veo-2:generateContent`, {
      instances: [{
        prompt: request.prompt,
        aspectRatio: request.aspectRatio || '16:9',
        duration: request.duration || 8,
      }]
    }, {
      headers: {
        'Authorization': `Bearer ${this.apiKeys.google_vertex}`,
        'Content-Type': 'application/json',
      },
    });

    return {
      id: response.data.predictions?.[0]?.videoId || uuidv4(),
      status: 'processing',
      videoUrl: response.data.predictions?.[0]?.videoUrl,
      createdAt: new Date().toISOString(),
      modelUsed: request.modelId,
      progress: 0,
    };
  }

  private async callRunwayApi(request: VideoGenerationRequest): Promise<VideoGenerationResponse> {
    const response = await axios.post(`${API_PROVIDERS.runway.baseUrl}/tasks`, {
      taskType: request.imageUrl ? 'gen3a_turbo' : 'gen3a_turbo',
      internal: false,
      options: {
        name: `Video Generation - ${new Date().toISOString()}`,
        seconds: request.duration || 10,
        text_prompt: request.prompt,
        image_prompt: request.imageUrl,
        resolution: request.resolution || '1280x768',
        motion_strength: request.motionStrength || 5,
        seed: request.seed,
      }
    }, {
      headers: {
        'Authorization': `Bearer ${this.apiKeys.runway}`,
        'Content-Type': 'application/json',
      },
    });

    return {
      id: response.data.id || uuidv4(),
      status: this.mapStatus(response.data.status || 'PENDING'),
      createdAt: new Date().toISOString(),
      modelUsed: request.modelId,
      progress: 0,
    };
  }

  private async callMinimaxApi(request: VideoGenerationRequest): Promise<VideoGenerationResponse> {
    let model = 'video-01';
    
    // Map model IDs to MiniMax model names
    switch (request.modelId) {
      case 'hailuo-02':
        model = 'video-01-live';
        break;
      case 'hailuo':
        model = 'video-01';
        break;
      case 'hailuo-live2d':
        model = 'video-01-live2d';
        break;
    }

    const response = await axios.post(`${API_PROVIDERS.minimax.baseUrl}/video_generation`, {
      model: model,
      prompt: request.prompt,
      first_frame_image: request.imageUrl,
      prompt_optimizer: true,
    }, {
      headers: {
        'Authorization': `Bearer ${this.apiKeys.minimax}`,
        'Content-Type': 'application/json',
      },
    });

    return {
      id: response.data.task_id || uuidv4(),
      status: this.mapStatus(response.data.status || 'processing'),
      createdAt: new Date().toISOString(),
      modelUsed: request.modelId,
      progress: 0,
    };
  }

  private async callKlingApi(request: VideoGenerationRequest): Promise<VideoGenerationResponse> {
    // Map model IDs to Kling API model names
    let model = 'kling-v1';
    switch (request.modelId) {
      case 'kling-2.1':
        model = 'kling-v1-5';
        break;
      case 'kling-2.1-master':
        model = 'kling-v1-5';
        break;
      case 'kling-2.0':
        model = 'kling-v1';
        break;
      case 'kling-1.6':
      case 'kling-1.5':
      case 'kling-1.0':
        model = 'kling-v1';
        break;
    }

    const response = await axios.post(`${API_PROVIDERS.kling.baseUrl}/videos/text2video`, {
      model: model,
      prompt: request.prompt,
      image: request.imageUrl,
      duration: request.duration || 5,
      aspect_ratio: request.aspectRatio || '16:9',
      cfg_scale: request.motionStrength || 0.5,
      seed: request.seed,
      mode: request.modelId.includes('master') ? 'pro' : 'std',
    }, {
      headers: {
        'Authorization': `Bearer ${this.apiKeys.kling}`,
        'Content-Type': 'application/json',
      },
    });

    return {
      id: response.data.data?.task_id || uuidv4(),
      status: this.mapStatus(response.data.data?.task_status || 'processing'),
      createdAt: new Date().toISOString(),
      modelUsed: request.modelId,
      progress: 0,
    };
  }

  private async callPikaApi(request: VideoGenerationRequest): Promise<VideoGenerationResponse> {
    const response = await axios.post(`${API_PROVIDERS.pika.baseUrl}/generate`, {
      prompt: request.prompt,
      image: request.imageUrl,
      aspectRatio: request.aspectRatio || '16:9',
      motion: request.motionStrength || 2,
      seed: request.seed,
      options: {
        frameRate: 24,
        camera: {
          pan: 'none',
          tilt: 'none',
          rotate: 'none',
          zoom: 'none'
        }
      }
    }, {
      headers: {
        'Authorization': `Bearer ${this.apiKeys.pika}`,
        'Content-Type': 'application/json',
      },
    });

    return {
      id: response.data.id || uuidv4(),
      status: this.mapStatus(response.data.status || 'processing'),
      createdAt: new Date().toISOString(),
      modelUsed: request.modelId,
      progress: 0,
    };
  }

  private async callHaiperApi(request: VideoGenerationRequest): Promise<VideoGenerationResponse> {
    const response = await axios.post(`${API_PROVIDERS.haiper.baseUrl}/video/generation`, {
      prompt: request.prompt,
      image_url: request.imageUrl,
      duration: request.duration || 4,
      aspect_ratio: request.aspectRatio || '16:9',
      seed: request.seed,
    }, {
      headers: {
        'Authorization': `Bearer ${this.apiKeys.haiper}`,
        'Content-Type': 'application/json',
      },
    });

    return {
      id: response.data.id || uuidv4(),
      status: this.mapStatus(response.data.status || 'processing'),
      createdAt: new Date().toISOString(),
      modelUsed: request.modelId,
      progress: 0,
    };
  }

  private async callViduApi(request: VideoGenerationRequest): Promise<VideoGenerationResponse> {
    const response = await axios.post(`${API_PROVIDERS.vidu.baseUrl}/video/submit`, {
      prompt: request.prompt,
      image: request.imageUrl,
      enhance_prompt: true,
      duration: request.duration || 8,
      style: 'general',
    }, {
      headers: {
        'Authorization': `Bearer ${this.apiKeys.vidu}`,
        'Content-Type': 'application/json',
      },
    });

    return {
      id: response.data.id || uuidv4(),
      status: this.mapStatus(response.data.status || 'processing'),
      createdAt: new Date().toISOString(),
      modelUsed: request.modelId,
      progress: 0,
    };
  }

  private async callKreaApi(request: VideoGenerationRequest): Promise<VideoGenerationResponse> {
    const response = await axios.post(`${API_PROVIDERS.krea.baseUrl}/video/generate`, {
      prompt: request.prompt,
      image_url: request.imageUrl,
      duration: request.duration || 5,
      aspect_ratio: request.aspectRatio || '16:9',
      motion_strength: request.motionStrength || 5,
    }, {
      headers: {
        'Authorization': `Bearer ${this.apiKeys.krea}`,
        'Content-Type': 'application/json',
      },
    });

    return {
      id: response.data.id || uuidv4(),
      status: this.mapStatus(response.data.status || 'processing'),
      createdAt: new Date().toISOString(),
      modelUsed: request.modelId,
      progress: 0,
    };
  }

  private async callVideoOceanApi(request: VideoGenerationRequest): Promise<VideoGenerationResponse> {
    const response = await axios.post(`${API_PROVIDERS.videoocean.baseUrl}/generate`, {
      prompt: request.prompt,
      image_url: request.imageUrl,
      duration: request.duration || 6,
      resolution: request.resolution || '1024x576',
      seed: request.seed,
    }, {
      headers: {
        'Authorization': `Bearer ${this.apiKeys.videoocean}`,
        'Content-Type': 'application/json',
      },
    });

    return {
      id: response.data.id || uuidv4(),
      status: this.mapStatus(response.data.status || 'processing'),
      createdAt: new Date().toISOString(),
      modelUsed: request.modelId,
      progress: 0,
    };
  }

  private async callReplicateApi(request: VideoGenerationRequest): Promise<VideoGenerationResponse> {
    const response = await axios.post(`${API_PROVIDERS.replicate.baseUrl}/predictions`, {
      version: 'd68b6e09eedbac7a49e3d8644999d93579c386a083768235cabca88796d70d82',
      input: {
        image: request.imageUrl,
        cond_aug: 0.02,
        decoding_t: 14,
        video_length: 14,
        sizing_strategy: 'maintain_aspect_ratio',
        motion_bucket_id: request.motionStrength || 127,
        fps_id: 6,
        seed: request.seed,
      }
    }, {
      headers: {
        'Authorization': `Token ${this.apiKeys.replicate}`,
        'Content-Type': 'application/json',
      },
    });

    return {
      id: response.data.id || uuidv4(),
      status: this.mapStatus(response.data.status || 'starting'),
      createdAt: new Date().toISOString(),
      modelUsed: request.modelId,
      progress: 0,
    };
  }

  private async callHunyuanApi(request: VideoGenerationRequest): Promise<VideoGenerationResponse> {
    const response = await axios.post(`${API_PROVIDERS.hunyuan.baseUrl}/video/generations`, {
      prompt: request.prompt,
      image: request.imageUrl,
      duration: request.duration || 6,
      resolution: request.resolution || '720p',
      seed: request.seed,
    }, {
      headers: {
        'Authorization': `Bearer ${this.apiKeys.hunyuan}`,
        'Content-Type': 'application/json',
      },
    });

    return {
      id: response.data.id || uuidv4(),
      status: this.mapStatus(response.data.status || 'processing'),
      createdAt: new Date().toISOString(),
      modelUsed: request.modelId,
      progress: 0,
    };
  }

  private async callAlibabaApi(request: VideoGenerationRequest): Promise<VideoGenerationResponse> {
    let endpoint = '';
    let requestBody: any = {};
    
    if (request.modelId.startsWith('wan-2.2')) {
      // Wan 2.2 Flash/Plus - Text-to-Image API v2
      endpoint = '/services/aigc/text2image/generation';
      requestBody = {
        model: request.modelId === 'wan-2.2-flash' ? 'wanx-v1-flash' : 'wanx-v1',
        input: {
          prompt: request.prompt,
          ref_img: request.imageUrl,
        },
        parameters: {
          style: '<auto>',
          size: request.resolution || '1024*1024',
          n: 1,
          seed: request.seed,
        }
      };
    } else {
      // Wanx 2.1 - Video generation
      endpoint = '/services/aigc/text2video/generation';
      requestBody = {
        model: 'wanx-video-generation-v1',
        input: {
          text: request.prompt,
          image_url: request.imageUrl,
        },
        parameters: {
          duration: request.duration || 6,
          resolution: request.resolution || '1280*720',
          seed: request.seed,
        }
      };
    }

    const response = await axios.post(`${API_PROVIDERS.alibaba.baseUrl}${endpoint}`, requestBody, {
      headers: {
        'Authorization': `Bearer ${this.apiKeys.alibaba}`,
        'Content-Type': 'application/json',
        'X-DashScope-Async': 'enable',
      },
    });

    return {
      id: response.data.output?.task_id || uuidv4(),
      status: this.mapStatus(response.data.output?.task_status || 'PENDING'),
      createdAt: new Date().toISOString(),
      modelUsed: request.modelId,
      progress: 0,
    };
  }

  private async callVolcengineApi(request: VideoGenerationRequest): Promise<VideoGenerationResponse> {
    const response = await axios.post(`${API_PROVIDERS.volcengine.baseUrl}/inference`, {
      model: request.modelId.includes('lite') ? 'Doubao-PixelDance-Lite' : 'Doubao-PixelDance',
      messages: [{
        role: 'user',
        content: [{
          type: 'text',
          text: request.prompt
        }]
      }],
      parameters: {
        duration: request.duration || 4,
        resolution: request.resolution || '720p',
        seed: request.seed,
      }
    }, {
      headers: {
        'Authorization': `Bearer ${this.apiKeys.volcengine}`,
        'Content-Type': 'application/json',
      },
    });

    return {
      id: response.data.id || uuidv4(),
      status: this.mapStatus(response.data.status || 'processing'),
      createdAt: new Date().toISOString(),
      modelUsed: request.modelId,
      progress: 0,
    };
  }

  private async callLumaApi(request: VideoGenerationRequest): Promise<VideoGenerationResponse> {
    const response = await axios.post(`${API_PROVIDERS.luma.baseUrl}/generations`, {
      prompt: request.prompt,
      keyframes: request.imageUrl ? {
        frame0: {
          type: 'image',
          url: request.imageUrl
        }
      } : undefined,
      aspect_ratio: request.aspectRatio || '16:9',
      loop: false,
    }, {
      headers: {
        'Authorization': `Bearer ${this.apiKeys.luma}`,
        'Content-Type': 'application/json',
      },
    });

    return {
      id: response.data.id || uuidv4(),
      status: this.mapStatus(response.data.state || 'queued'),
      createdAt: new Date().toISOString(),
      modelUsed: request.modelId,
      progress: 0,
    };
  }

  private async callEachLabsApi(request: VideoGenerationRequest): Promise<VideoGenerationResponse> {
    const response = await axios.post(`${API_PROVIDERS.eachlabs.baseUrl}/generations`, {
      model: request.modelId,
      prompt: request.prompt,
      image_url: request.imageUrl,
      duration: request.duration || 4,
      aspect_ratio: request.aspectRatio || '16:9',
    }, {
      headers: {
        'Authorization': `Bearer ${this.apiKeys.eachlabs}`,
        'Content-Type': 'application/json',
      },
    });

    return {
      id: response.data.id || uuidv4(),
      status: this.mapStatus(response.data.status || 'processing'),
      createdAt: new Date().toISOString(),
      modelUsed: request.modelId,
      progress: 0,
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
        case 'google_vertex':
          return await this.callGoogleVertexApi(request);
        case 'runway':
          return await this.callRunwayApi(request);
        case 'minimax':
          return await this.callMinimaxApi(request);
        case 'kling':
          return await this.callKlingApi(request);
        case 'pika':
          return await this.callPikaApi(request);
        case 'haiper':
          return await this.callHaiperApi(request);
        case 'vidu':
          return await this.callViduApi(request);
        case 'krea':
          return await this.callKreaApi(request);
        case 'videoocean':
          return await this.callVideoOceanApi(request);
        case 'replicate':
          return await this.callReplicateApi(request);
        case 'hunyuan':
          return await this.callHunyuanApi(request);
        case 'alibaba':
          return await this.callAlibabaApi(request);
        case 'volcengine':
          return await this.callVolcengineApi(request);
        case 'luma':
          return await this.callLumaApi(request);
        case 'eachlabs':
          return await this.callEachLabsApi(request);
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
        case 'runway':
          response = await axios.get(`${API_PROVIDERS.runway.baseUrl}/tasks/${id}`, {
            headers: { 'Authorization': `Bearer ${this.apiKeys.runway}` }
          });
          break;
        case 'minimax':
          response = await axios.get(`${API_PROVIDERS.minimax.baseUrl}/query/video_generation`, {
            headers: { 'Authorization': `Bearer ${this.apiKeys.minimax}` },
            params: { task_id: id }
          });
          break;
        case 'kling':
          response = await axios.get(`${API_PROVIDERS.kling.baseUrl}/videos/${id}`, {
            headers: { 'Authorization': `Bearer ${this.apiKeys.kling}` }
          });
          break;
        case 'pika':
          response = await axios.get(`${API_PROVIDERS.pika.baseUrl}/jobs/${id}`, {
            headers: { 'Authorization': `Bearer ${this.apiKeys.pika}` }
          });
          break;
        case 'haiper':
          response = await axios.get(`${API_PROVIDERS.haiper.baseUrl}/video/generation/${id}`, {
            headers: { 'Authorization': `Bearer ${this.apiKeys.haiper}` }
          });
          break;
        case 'vidu':
          response = await axios.get(`${API_PROVIDERS.vidu.baseUrl}/video/query`, {
            headers: { 'Authorization': `Bearer ${this.apiKeys.vidu}` },
            params: { id }
          });
          break;
        case 'krea':
          response = await axios.get(`${API_PROVIDERS.krea.baseUrl}/video/status/${id}`, {
            headers: { 'Authorization': `Bearer ${this.apiKeys.krea}` }
          });
          break;
        case 'videoocean':
          response = await axios.get(`${API_PROVIDERS.videoocean.baseUrl}/status/${id}`, {
            headers: { 'Authorization': `Bearer ${this.apiKeys.videoocean}` }
          });
          break;
        case 'replicate':
          response = await axios.get(`${API_PROVIDERS.replicate.baseUrl}/predictions/${id}`, {
            headers: { 'Authorization': `Token ${this.apiKeys.replicate}` }
          });
          break;
        case 'hunyuan':
          response = await axios.get(`${API_PROVIDERS.hunyuan.baseUrl}/video/generations/${id}`, {
            headers: { 'Authorization': `Bearer ${this.apiKeys.hunyuan}` }
          });
          break;
        case 'alibaba':
          response = await axios.get(`${API_PROVIDERS.alibaba.baseUrl}/services/aigc/text2video/generation`, {
            headers: { 'Authorization': `Bearer ${this.apiKeys.alibaba}` },
            params: { task_id: id }
          });
          break;
        case 'volcengine':
          response = await axios.get(`${API_PROVIDERS.volcengine.baseUrl}/inference/${id}`, {
            headers: { 'Authorization': `Bearer ${this.apiKeys.volcengine}` }
          });
          break;
        case 'luma':
          response = await axios.get(`${API_PROVIDERS.luma.baseUrl}/generations/${id}`, {
            headers: { 'Authorization': `Bearer ${this.apiKeys.luma}` }
          });
          break;
        case 'eachlabs':
          response = await axios.get(`${API_PROVIDERS.eachlabs.baseUrl}/generations/${id}`, {
            headers: { 'Authorization': `Bearer ${this.apiKeys.eachlabs}` }
          });
          break;
        case 'google_vertex':
          response = await axios.get(`${API_PROVIDERS.google_vertex.baseUrl}/projects/YOUR_PROJECT_ID/locations/us-central1/operations/${id}`, {
            headers: { 'Authorization': `Bearer ${this.apiKeys.google_vertex}` }
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
