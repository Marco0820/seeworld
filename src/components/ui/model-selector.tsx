'use client';

import { useState, useRef, useEffect } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { cn } from '@/lib/utils';
import Image from 'next/image';

export interface AIModel {
  id: string;
  name: string;
  description: string;
  icon: string;
  provider: string;
  credits: number;
}

export const AI_MODELS: AIModel[] = [
  {
    id: 'pollo-1.5',
    name: 'Pollo 1.5',
    description: 'better, faster and cheaper',
    icon: '/icons/com_logo_runway_ad6a460300.png',
    provider: 'Pollo AI',
    credits: 1,
  },
  {
    id: 'runway-gen2',
    name: 'Runway AI Video Generator',
    description: 'Professional video generation',
    icon: '/icons/com_logo_runway_ad6a460300.png',
    provider: 'Runway',
    credits: 5,
  },
  {
    id: 'hailuo-minimax',
    name: 'Hailuo AI Video Generator (MiniMax)',
    description: 'High-quality Chinese AI model',
    icon: '/icons/com_logo_hailuo_3bc9b31a8a.png',
    provider: 'MiniMax',
    credits: 3,
  },
  {
    id: 'kling-ai',
    name: 'Kling AI Video Generator',
    description: 'Advanced video synthesis',
    icon: '/icons/com_logo_kling_1b6878741b.png',
    provider: 'Kling AI',
    credits: 4,
  },
  {
    id: 'luma-dream',
    name: 'Luma AI Video Generator (Luma Dream Machine)',
    description: 'Realistic video generation',
    icon: '/icons/com_logo_luma_8542d55fb5.png',
    provider: 'Luma AI',
    credits: 6,
  },
  {
    id: 'pika-labs',
    name: 'Pika Art AI Video Generator (Pika Labs)',
    description: 'Creative video effects',
    icon: '/icons/com_logo_pika_13fbdc24b9.png',
    provider: 'Pika Labs',
    credits: 4,
  },
  {
    id: 'haiper-ai',
    name: 'Haiper AI Video Generator',
    description: 'Fast video processing',
    icon: '/icons/Haiper_d822de7449.png',
    provider: 'Haiper AI',
    credits: 3,
  },
  {
    id: 'vidu-studio',
    name: 'Vidu AI Video Generator (Vidu Studio)',
    description: 'Professional editing suite',
    icon: '/icons/com_logo_vidu_9166e0cac9.png',
    provider: 'Vidu Studio',
    credits: 5,
  },
  {
    id: 'sora-ai',
    name: 'Sora AI Video Generator',
    description: 'OpenAI video model',
    icon: '/icons/com_logo_chatgpt_color_038b183785.png',
    provider: 'OpenAI',
    credits: 8,
  },
  {
    id: 'pixverse-ai',
    name: 'PixVerse AI Video Generator',
    description: 'Anime and cartoon style',
    icon: '/icons/com_logo_pixverse_a93e08c3ac.png',
    provider: 'PixVerse',
    credits: 3,
  },
  {
    id: 'krea-ai',
    name: 'Krea AI Video Generator',
    description: 'Real-time generation',
    icon: '/icons/Krea_32ae82db6b.png',
    provider: 'Krea AI',
    credits: 4,
  },
  {
    id: 'veo-ai',
    name: 'Veo AI Video Generator',
    description: 'Google AI video model',
    icon: '/icons/com_logo_google_09_48f9ff99e2.png',
    provider: 'Google',
    credits: 7,
  },
  {
    id: 'seedance-ai',
    name: 'Seedance AI Video Generator (ByteDance)',
    description: 'ByteDance video AI',
    icon: '/icons/Pixel_Dance_c5db323079.png',
    provider: 'ByteDance',
    credits: 5,
  },
  {
    id: 'video-ocean',
    name: 'Video Ocean',
    description: 'Advanced video synthesis',
    icon: '/icons/Video_Ocean_07bb9b5867.png',
    provider: 'Video Ocean',
    credits: 4,
  },
  {
    id: 'stable-video',
    name: 'Stable Video Diffusion AI Video Generator',
    description: 'Stability AI video model',
    icon: '/icons/com_logo_stable_d43e452756.png',
    provider: 'Stability AI',
    credits: 6,
  },
  {
    id: 'hunyuan-ai',
    name: 'Hunyuan AI Video Generator (Tencent)',
    description: 'Tencent video AI',
    icon: '/icons/com_logo_hunyuan_d9096a0de1.png',
    provider: 'Tencent',
    credits: 4,
  },
  {
    id: 'wanx-ai',
    name: 'Wanx AI Video Generator (Wan 2.1)',
    description: 'Alibaba video AI',
    icon: '/icons/Wanx_AI_a03a7dcbf4.png',
    provider: 'Alibaba',
    credits: 3,
  },
  {
    id: 'midjourney-ai',
    name: 'Midjourney AI Video Generator',
    description: 'Creative video generation',
    icon: '/icons/midjourney_icon_9a2abffe0b.png',
    provider: 'Midjourney',
    credits: 7,
  }
];

interface ModelSelectorProps {
  selectedModel: AIModel;
  onModelSelect: (model: AIModel) => void;
  className?: string;
}

export default function ModelSelector({
  selectedModel,
  onModelSelect,
  className
}: ModelSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // 点击外部关闭下拉菜单
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleModelSelect = (model: AIModel) => {
    onModelSelect(model);
    setIsOpen(false);
  };

  return (
    <div className={cn("relative", className)} ref={dropdownRef}>
      {/* 选择器按钮 */}
      <button
        onClick={handleToggle}
        className="w-full flex items-center justify-between p-3 bg-gray-800 hover:bg-gray-700 border border-gray-600 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
      >
        <div className="flex items-center gap-3">
          <div className="relative w-6 h-6 rounded overflow-hidden bg-gray-700 flex-shrink-0">
            <Image
              src={selectedModel.icon}
              alt={selectedModel.name}
              fill
              className="object-cover"
              onError={(e) => {
                // 图标加载失败时显示首字母
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
                const parent = target.parentElement;
                if (parent) {
                  parent.innerHTML = `<div class="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-xs font-bold">${selectedModel.name.charAt(0)}</div>`;
                }
              }}
            />
          </div>
          <div className="text-left">
            <div className="font-medium text-white text-sm truncate max-w-[200px]">
              {selectedModel.name}
            </div>
            <div className="text-xs text-gray-400 truncate max-w-[200px]">
              {selectedModel.description}
            </div>
          </div>
        </div>
        {isOpen ? (
          <ChevronUp className="w-4 h-4 text-gray-400 flex-shrink-0" />
        ) : (
          <ChevronDown className="w-4 h-4 text-gray-400 flex-shrink-0" />
        )}
      </button>

      {/* 下拉菜单 */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-gray-800 border border-gray-600 rounded-lg shadow-xl z-50 max-h-80 overflow-y-auto">
          {AI_MODELS.map((model) => (
            <button
              key={model.id}
              onClick={() => handleModelSelect(model)}
              className={cn(
                "w-full flex items-center gap-3 p-3 hover:bg-gray-700 transition-colors duration-200 border-b border-gray-700 last:border-b-0 text-left",
                selectedModel.id === model.id && "bg-gray-700 border-l-4 border-l-red-500"
              )}
            >
              <div className="relative w-6 h-6 rounded overflow-hidden bg-gray-700 flex-shrink-0">
                <Image
                  src={model.icon}
                  alt={model.name}
                  fill
                  className="object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    const parent = target.parentElement;
                    if (parent) {
                      parent.innerHTML = `<div class="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-xs font-bold">${model.name.charAt(0)}</div>`;
                    }
                  }}
                />
              </div>
              <div className="text-left flex-1 min-w-0">
                <div className="font-medium text-white text-sm truncate">
                  {model.name}
                </div>
                <div className="text-xs text-gray-400 truncate">
                  {model.description}
                </div>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xs text-orange-400">
                    🔥 {model.credits} credits
                  </span>
                  <span className="text-xs text-gray-500">
                    • {model.provider}
                  </span>
                </div>
              </div>
              {selectedModel.id === model.id && (
                <div className="w-2 h-2 bg-red-500 rounded-full flex-shrink-0"></div>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
