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
  badge?: 'New' | 'Hot' | '';
}

export const AI_MODELS: AIModel[] = [

  {
    id: 'wan-2.2-flash',
    name: 'Wan 2.2 Flash',
    description: 'Fast generation and better reliability',
    icon: '/icons/Group.svg',
    provider: 'Alibaba',
    credits: 4,
    badge: 'New',
  },
  {
    id: 'wan-2.2-plus',
    name: 'Wan 2.2 Plus',
    description: 'Stable fluid motion and lifelike dynamics',
    icon: '/icons/Group.svg',
    provider: 'Alibaba',
    credits: 5,
    badge: 'New',
  },
  {
    id: 'hailuo-02',
    name: 'Hailuo 02',
    description: 'Extreme physics simulations',
    icon: '/icons/com_logo_hailuo_3bc9b31a8a.png',
    provider: 'MiniMax',
    credits: 5,
    badge: 'Hot',
  },
  {
    id: 'kling-2.1',
    name: 'Kling 2.1',
    description: 'Enhanced visual realism and motion fluidity',
    icon: '/icons/com_logo_kling_1b6878741b.png',
    provider: 'Kling AI',
    credits: 20,
  },
  {
    id: 'kling-2.1-master',
    name: 'Kling 2.1 Master',
    description: 'Enhanced visual realism and motion fluidity',
    icon: '/icons/com_logo_kling_1b6878741b.png',
    provider: 'Kling AI',
    credits: 100,
  },
  {
    id: 'google-veo-3-fast',
    name: 'Google Veo 3 Fast',
    description: '30% Faster than standard Veo 3 model',
    icon: '/icons/com_logo_google_09_48f9ff99e2.png',
    provider: 'Google',
    credits: 150,
    badge: 'New',
  },
  {
    id: 'google-veo-3',
    name: 'Google Veo 3',
    description: 'Realistic outputs with natural audio',
    icon: '/icons/com_logo_google_09_48f9ff99e2.png',
    provider: 'Google',
    credits: 280,
    badge: 'New',
  },
  {
    id: 'seedance-1.0-lite',
    name: 'Seedance 1.0 Lite',
    description: 'Accurate motion and camera control',
    icon: '/icons/Pixel_Dance_c5db323079.png',
    provider: 'ByteDance',
    credits: 5,
  },
  {
    id: 'seedance-1.0-pro',
    name: 'Seedance 1.0 Pro',
    description: 'Fluid, cohesive multi-shot video outputs',
    icon: '/icons/Pixel_Dance_c5db323079.png',
    provider: 'ByteDance',
    credits: 15,
  },
  {
    id: 'pixverse-v4.5',
    name: 'Pixverse V4.5',
    description: 'Enhanced realism and camera motions',
    icon: '/icons/com_logo_pixverse_a93e08c3ac.png',
    provider: 'PixVerse',
    credits: 10,
  },
  {
    id: 'vidu-q1',
    name: 'Vidu Q1',
    description: 'Precise control over video motion',
    icon: '/icons/com_logo_vidu_9166e0cac9.png',
    provider: 'Vidu Studio',
    credits: 25,
  },
  {
    id: 'runway-gen-4-turbo',
    name: 'Runway Gen-4 Turbo',
    description: 'Efficient, consistent video creation',
    icon: '/icons/com_logo_runway_ad6a460300.png',
    provider: 'Runway',
    credits: 40,
  },
  {
    id: 'luma-ray-2',
    name: 'Luma Ray 2',
    description: 'Large scale model for realistic visuals',
    icon: '/icons/com_logo_luma_8542d55fb5.png',
    provider: 'Luma AI',
    credits: 60,
  },
  {
    id: 'luma-ray-2-flash',
    name: 'Luma Ray 2 Flash',
    description: 'Faster outputs with coherent motion',
    icon: '/icons/com_logo_luma_8542d55fb5.png',
    provider: 'Luma AI',
    credits: 20,
  },
  {
    id: 'pika-2.2',
    name: 'Pika 2.2',
    description: 'Better transition and transformation',
    icon: '/icons/com_logo_pika_13fbdc24b9.png',
    provider: 'Pika Labs',
    credits: 30,
  },
  {
    id: 'kling-2.0',
    name: 'Kling 2.0',
    description: 'Better motion dynamics and aesthetics',
    icon: '/icons/com_logo_kling_1b6878741b.png',
    provider: 'Kling AI',
    credits: 100,
  },
  {
    id: 'kling-1.6',
    name: 'Kling 1.6',
    description: 'More realistic motions',
    icon: '/icons/com_logo_kling_1b6878741b.png',
    provider: 'Kling AI',
    credits: 20,
  },
  {
    id: 'pixverse-v4',
    name: 'Pixverse V4',
    description: 'Improved motion and coherence',
    icon: '/icons/com_logo_pixverse_a93e08c3ac.png',
    provider: 'PixVerse',
    credits: 10,
  },
  {
    id: 'pixverse-v3.5',
    name: 'Pixverse V3.5',
    description: 'Improved motion and coherence',
    icon: '/icons/com_logo_pixverse_a93e08c3ac.png',
    provider: 'PixVerse',
    credits: 10,
  },
  {
    id: 'google-veo-2',
    name: 'Google Veo 2',
    description: 'HD outputs with visually rich content',
    icon: '/icons/com_logo_google_09_48f9ff99e2.png',
    provider: 'Google',
    credits: 180,
  },
  {
    id: 'runway-gen-3',
    name: 'Runway Gen-3',
    description: 'Multimodal, professional model',
    icon: '/icons/com_logo_runway_ad6a460300.png',
    provider: 'Runway',
    credits: 40,
  },
  {
    id: 'vidu-2.0',
    name: 'Vidu 2.0',
    description: 'Enhanced quality and speed',
    icon: '/icons/com_logo_vidu_9166e0cac9.png',
    provider: 'Vidu Studio',
    credits: 10,
  },
  {
    id: 'hailuo',
    name: 'Hailuo',
    description: 'Highest video quality',
    icon: '/icons/com_logo_hailuo_3bc9b31a8a.png',
    provider: 'MiniMax',
    credits: 35,
  },
  {
    id: 'luma-ray-1.6',
    name: 'Luma Ray 1.6',
    description: 'Realistic and detailed videos',
    icon: '/icons/com_logo_luma_8542d55fb5.png',
    provider: 'Luma AI',
    credits: 60,
  },
  {
    id: 'wanx-2.1',
    name: 'Wanx 2.1',
    description: 'Alibaba\'s model with realistic outputs',
    icon: '/icons/Group.svg',
    provider: 'Alibaba',
    credits: 20,
  },
  {
    id: 'hunyuan',
    name: 'Hunyuan',
    description: 'Tencent\'s 13B-parameter video model',
    icon: '/icons/com_logo_hunyuan_d9096a0de1.png',
    provider: 'Tencent',
    credits: 20,
  },
  {
    id: 'hailuo-live2d',
    name: 'Hailuo Live2D',
    description: 'Good for 2D animation',
    icon: '/icons/com_logo_hailuo_3bc9b31a8a.png',
    provider: 'MiniMax',
    credits: 35,
  },
  {
    id: 'pika-2.1',
    name: 'Pika 2.1',
    description: 'Crystal-clear and immersive outputs',
    icon: '/icons/com_logo_pika_13fbdc24b9.png',
    provider: 'Pika Labs',
    credits: 60,
  },
  {
    id: 'kling-1.5',
    name: 'Kling 1.5',
    description: 'Suitable for complex scenes',
    icon: '/icons/com_logo_kling_1b6878741b.png',
    provider: 'Kling AI',
    credits: 20,
  },
  {
    id: 'kling-1.0',
    name: 'Kling 1.0',
    description: 'Suitable for short videos',
    icon: '/icons/com_logo_kling_1b6878741b.png',
    provider: 'Kling AI',
    credits: 10,
  },

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
            <div className="flex items-center gap-2 mb-1">
              <div className="font-medium text-white text-sm truncate max-w-[150px]">
                {selectedModel.name}
              </div>
              {selectedModel.badge && (
                <span className={`text-xs px-1.5 py-0.5 rounded-full font-medium ${
                  selectedModel.badge === 'New' 
                    ? 'bg-green-500 text-white' 
                    : selectedModel.badge === 'Hot'
                    ? 'bg-red-500 text-white'
                    : ''
                }`}>
                  {selectedModel.badge}
                </span>
              )}
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
                <div className="flex items-center gap-2 mb-1">
                  <div className="font-medium text-white text-sm truncate">
                    {model.name}
                  </div>
                  {model.badge && (
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                      model.badge === 'New' 
                        ? 'bg-green-500 text-white' 
                        : model.badge === 'Hot'
                        ? 'bg-red-500 text-white'
                        : ''
                    }`}>
                      {model.badge}
                    </span>
                  )}
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
