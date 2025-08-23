"use client";

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { VideoModel, VideoGenerationRequest, VideoGenerationResponse } from '@/types/video';
import ModelSelector from '@/components/ModelSelector';
import VideoGenerationForm from '@/components/VideoGenerationForm';
import VideoGenerationResult from '@/components/VideoGenerationResult';
import { AlertCircle, Loader2 } from 'lucide-react';

interface VideoGenerationInterfaceProps {
  className?: string;
}

export default function VideoGenerationInterface({ className }: VideoGenerationInterfaceProps) {
  const [selectedModel, setSelectedModel] = useState<VideoModel | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [currentGeneration, setCurrentGeneration] = useState<VideoGenerationResponse | null>(null);
  const [error, setError] = useState<string>('');

  const handleGenerate = async (request: VideoGenerationRequest) => {
    if (!selectedModel) {
      setError('Please select a model first');
      return;
    }

    setIsGenerating(true);
    setError('');
    setCurrentGeneration(null);

    try {
      const response = await fetch('/api/video/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(request),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to generate video');
      }

      setCurrentGeneration(data);

      // Poll for completion if the video is still processing
      if (data.status === 'pending' || data.status === 'processing') {
        pollForCompletion(data.id, getProviderForModel(request.modelId));
      }
    } catch (error) {
      console.error('Video generation error:', error);
      setError(error instanceof Error ? error.message : 'An unknown error occurred');
    } finally {
      setIsGenerating(false);
    }
  };

  const pollForCompletion = async (id: string, provider: string) => {
    const pollInterval = setInterval(async () => {
      try {
        const response = await fetch(`/api/video/generate?id=${id}&provider=${provider}`);
        const data = await response.json();

        if (response.ok) {
          setCurrentGeneration(data);

          if (data.status === 'completed' || data.status === 'failed') {
            clearInterval(pollInterval);
          }
        }
      } catch (error) {
        console.error('Polling error:', error);
        clearInterval(pollInterval);
      }
    }, 3000); // Poll every 3 seconds

    // Stop polling after 10 minutes
    setTimeout(() => {
      clearInterval(pollInterval);
    }, 600000);
  };

  const getProviderForModel = (modelId: string): string => {
    // Updated provider mapping to match new model IDs
    const modelToProvider: Record<string, string> = {
      // Alibaba models
      'wan-2.2-flash': 'alibaba',
      'wan-2.2-plus': 'alibaba',
      'wanx-2.1': 'alibaba',
      
      // MiniMax models
      'hailuo-02': 'minimax',
      'hailuo': 'minimax',
      'hailuo-live2d': 'minimax',
      
      // Kling AI models
      'kling-2.1': 'kling',
      'kling-2.1-master': 'kling',
      'kling-2.0': 'kling',
      'kling-1.6': 'kling',
      'kling-1.5': 'kling',
      'kling-1.0': 'kling',
      
      // Google models
      'google-veo-3-fast': 'google',
      'google-veo-3': 'google',
      'google-veo-2': 'google_vertex',
      
      // ByteDance models
      'seedance-1.0-lite': 'volcengine',
      'seedance-1.0-pro': 'volcengine',
      
      // PixVerse models
      'pixverse-v4.5': 'pixverse',
      'pixverse-v4': 'pixverse',
      'pixverse-v3.5': 'pixverse',
      
      // Vidu models
      'vidu-q1': 'vidu',
      'vidu-2.0': 'vidu',
      
      // Runway models
      'runway-gen-4-turbo': 'runway',
      'runway-gen-3': 'runway',
      
      // Luma AI models
      'luma-ray-2': 'luma',
      'luma-ray-2-flash': 'luma',
      'luma-ray-1.6': 'luma',
      
      // Pika models
      'pika-2.2': 'pika',
      'pika-2.1': 'pika',
      
      // Tencent models
      'hunyuan': 'hunyuan',
    };
    
    return modelToProvider[modelId] || 'alibaba';
  };

  const handleModelSelect = (model: VideoModel) => {
    setSelectedModel(model);
    setError('');
  };

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Error Display */}
      {error && (
        <Alert className="border-red-200 bg-red-50">
          <AlertCircle className="h-4 w-4 text-red-600" />
          <AlertDescription className="text-red-800">
            {error}
          </AlertDescription>
        </Alert>
      )}

      {/* Model Selection */}
      <Card className="p-6 bg-white/10 backdrop-blur-sm border-white/20">
        <ModelSelector
          selectedModel={selectedModel}
          onModelSelect={handleModelSelect}
        />
      </Card>

      {/* Generation Form */}
      {selectedModel && (
        <Card className="p-6 bg-white/10 backdrop-blur-sm border-white/20">
          <VideoGenerationForm
            selectedModel={selectedModel}
            onGenerate={handleGenerate}
            isGenerating={isGenerating}
          />
        </Card>
      )}

      {/* Generation Result */}
      {(currentGeneration || isGenerating) && (
        <Card className="p-6 bg-white/10 backdrop-blur-sm border-white/20">
          {isGenerating && !currentGeneration ? (
            <div className="flex items-center justify-center py-12">
              <div className="text-center">
                <Loader2 className="h-8 w-8 animate-spin text-cyan-400 mx-auto mb-4" />
                <p className="text-white text-lg font-medium">Generating your video...</p>
                <p className="text-white/60 text-sm mt-2">This may take a few minutes</p>
              </div>
            </div>
          ) : currentGeneration ? (
            <VideoGenerationResult
              result={currentGeneration}
              onRegenerate={() => setCurrentGeneration(null)}
            />
          ) : null}
        </Card>
      )}

      {/* Instructions */}
      {!selectedModel && (
        <Card className="p-6 bg-white/5 backdrop-blur-sm border-white/10">
          <div className="text-center">
            <h3 className="text-xl font-semibold text-white mb-2">Get Started</h3>
            <p className="text-white/70">
              Select an AI model above to begin generating your video. Each model has different 
              capabilities and pricing.
            </p>
          </div>
        </Card>
      )}
    </div>
  );
}
