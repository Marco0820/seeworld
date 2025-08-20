"use client";

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Zap, 
  Star, 
  Crown,
  Clock,
  Cpu,
  Eye,
  Sparkles,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  Play,
  Pause
} from 'lucide-react';

interface GenerationMode {
  id: string;
  name: string;
  displayName: string;
  description: string;
  features: string[];
  icon: React.ReactNode;
  color: string;
  speed: number; // 1-5 scale
  quality: number; // 1-5 scale
  cost: number; // relative cost multiplier
  estimatedTime: string;
  recommended?: boolean;
  premium?: boolean;
}

interface ModePreview {
  mode: string;
  previewUrl: string;
  thumbnailUrl: string;
  description: string;
}

interface ModeSelectorProps {
  value: string;
  onChange: (mode: string) => void;
  disabled?: boolean;
  showPreview?: boolean;
  showComparison?: boolean;
  className?: string;
}

export default function ModeSelector({
  value,
  onChange,
  disabled = false,
  showPreview = true,
  showComparison = true,
  className = ""
}: ModeSelectorProps) {
  const [previewMode, setPreviewMode] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  // 生成模式配置
  const modes: GenerationMode[] = [
    {
      id: 'fast',
      name: '快速模式',
      displayName: '快速生成',
      description: '优化速度，适合快速预览和测试',
      features: [
        '生成速度最快',
        '资源消耗较低',
        '适合批量生成',
        '基础质量保证',
        '快速迭代测试'
      ],
      icon: <Zap className="w-5 h-5" />,
      color: 'orange',
      speed: 5,
      quality: 3,
      cost: 1,
      estimatedTime: '30-60秒',
      recommended: true
    },
    {
      id: 'standard',
      name: '标准模式',
      displayName: '标准质量',
      description: '平衡速度与质量，适合大多数使用场景',
      features: [
        '速度质量平衡',
        '稳定的输出效果',
        '适合日常使用',
        '良好的细节处理',
        '性价比最优'
      ],
      icon: <Star className="w-5 h-5" />,
      color: 'blue',
      speed: 3,
      quality: 4,
      cost: 2,
      estimatedTime: '2-5分钟',
      recommended: true
    },
    {
      id: 'professional',
      name: '专业模式',
      displayName: '专业品质',
      description: '最高质量输出，适合专业创作和商业用途',
      features: [
        '最高画面质量',
        '精细的动画效果',
        '优秀的色彩还原',
        '流畅的动作表现',
        '专业级输出'
      ],
      icon: <Crown className="w-5 h-5" />,
      color: 'purple',
      speed: 1,
      quality: 5,
      cost: 4,
      estimatedTime: '5-15分钟',
      premium: true
    }
  ];

  // 预览示例
  const modePreviews: ModePreview[] = [
    {
      mode: 'fast',
      previewUrl: '/api/placeholder/400/225',
      thumbnailUrl: '/api/placeholder/200/113',
      description: '快速模式生成效果 - 基础质量，生成迅速'
    },
    {
      mode: 'standard',
      previewUrl: '/api/placeholder/400/225',
      thumbnailUrl: '/api/placeholder/200/113',
      description: '标准模式生成效果 - 平衡质量与速度'
    },
    {
      mode: 'professional',
      previewUrl: '/api/placeholder/400/225',
      thumbnailUrl: '/api/placeholder/200/113',
      description: '专业模式生成效果 - 最高质量输出'
    }
  ];

  // 获取模式信息
  const getMode = (modeId: string) => modes.find(m => m.id === modeId);
  const currentMode = getMode(value);

  // 处理模式选择
  const handleModeSelect = (modeId: string) => {
    if (!disabled) {
      onChange(modeId);
      setPreviewMode(modeId);
    }
  };

  // 获取颜色类名
  const getColorClasses = (color: string, selected: boolean = false) => {
    const baseClasses = {
      orange: selected 
        ? 'bg-orange-500 text-white border-orange-500' 
        : 'text-orange-600 border-orange-300 hover:bg-orange-50',
      blue: selected 
        ? 'bg-blue-500 text-white border-blue-500' 
        : 'text-blue-600 border-blue-300 hover:bg-blue-50',
      purple: selected 
        ? 'bg-purple-500 text-white border-purple-500' 
        : 'text-purple-600 border-purple-300 hover:bg-purple-50'
    };
    return baseClasses[color as keyof typeof baseClasses] || baseClasses.blue;
  };

  // 获取进度条颜色
  const getProgressColor = (color: string) => {
    const colors = {
      orange: 'bg-orange-500',
      blue: 'bg-blue-500',
      purple: 'bg-purple-500'
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  return (
    <div className={`space-y-4 ${className}`}>
      {/* 当前选择显示 */}
      {currentMode && (
        <Card className={`p-4 ${
          currentMode.color === 'orange' ? 'bg-orange-50 dark:bg-orange-900/20 border-orange-200 dark:border-orange-800' :
          currentMode.color === 'blue' ? 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800' :
          'bg-purple-50 dark:bg-purple-900/20 border-purple-200 dark:border-purple-800'
        }`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`${
                currentMode.color === 'orange' ? 'text-orange-600' :
                currentMode.color === 'blue' ? 'text-blue-600' :
                'text-purple-600'
              }`}>
                {currentMode.icon}
              </div>
              <div>
                <h4 className={`font-medium ${
                  currentMode.color === 'orange' ? 'text-orange-900 dark:text-orange-100' :
                  currentMode.color === 'blue' ? 'text-blue-900 dark:text-blue-100' :
                  'text-purple-900 dark:text-purple-100'
                }`}>
                  {currentMode.displayName}
                </h4>
                <p className={`text-sm ${
                  currentMode.color === 'orange' ? 'text-orange-700 dark:text-orange-300' :
                  currentMode.color === 'blue' ? 'text-blue-700 dark:text-blue-300' :
                  'text-purple-700 dark:text-purple-300'
                }`}>
                  预计时间: {currentMode.estimatedTime}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {currentMode.recommended && (
                <Badge variant="secondary" className="bg-green-100 text-green-800 text-xs">
                  推荐
                </Badge>
              )}
              {currentMode.premium && (
                <Badge variant="secondary" className="bg-yellow-100 text-yellow-800 text-xs">
                  <Crown className="w-3 h-3 mr-1" />
                  专业版
                </Badge>
              )}
            </div>
          </div>
        </Card>
      )}

      {/* 模式选择网格 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {modes.map((mode) => (
          <Card
            key={mode.id}
            className={`p-4 cursor-pointer transition-all duration-200 hover:shadow-md ${
              value === mode.id
                ? getColorClasses(mode.color, true)
                : `hover:shadow-lg ${getColorClasses(mode.color, false)}`
            } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
            onClick={() => handleModeSelect(mode.id)}
          >
            <div className="space-y-4">
              {/* 模式头部 */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className={value === mode.id ? 'text-white' : ''}>
                    {mode.icon}
                  </div>
                  <h4 className="font-semibold">{mode.name}</h4>
                </div>
                
                <div className="flex flex-col gap-1">
                  {mode.recommended && (
                    <Badge 
                      variant="secondary" 
                      className={`text-xs ${
                        value === mode.id 
                          ? 'bg-white/20 text-white' 
                          : 'bg-green-100 text-green-800'
                      }`}
                    >
                      推荐
                    </Badge>
                  )}
                  {mode.premium && (
                    <Badge 
                      variant="secondary" 
                      className={`text-xs ${
                        value === mode.id 
                          ? 'bg-white/20 text-white' 
                          : 'bg-yellow-100 text-yellow-800'
                      }`}
                    >
                      专业版
                    </Badge>
                  )}
                </div>
              </div>

              {/* 模式描述 */}
              <p className={`text-sm ${
                value === mode.id ? 'text-white/90' : 'text-gray-600 dark:text-gray-300'
              }`}>
                {mode.description}
              </p>

              {/* 性能指标 */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className={value === mode.id ? 'text-white/80' : 'text-gray-500'}>
                    生成速度
                  </span>
                  <span className={value === mode.id ? 'text-white' : 'text-gray-700'}>
                    {mode.speed}/5
                  </span>
                </div>
                <Progress 
                  value={mode.speed * 20} 
                  className={`h-1 ${value === mode.id ? 'bg-white/20' : ''}`}
                />
                
                <div className="flex items-center justify-between text-xs">
                  <span className={value === mode.id ? 'text-white/80' : 'text-gray-500'}>
                    输出质量
                  </span>
                  <span className={value === mode.id ? 'text-white' : 'text-gray-700'}>
                    {mode.quality}/5
                  </span>
                </div>
                <Progress 
                  value={mode.quality * 20} 
                  className={`h-1 ${value === mode.id ? 'bg-white/20' : ''}`}
                />
              </div>

              {/* 特性列表 */}
              <div className="space-y-1">
                {mode.features.slice(0, 3).map((feature, index) => (
                  <div key={index} className="flex items-center gap-2 text-xs">
                    <CheckCircle className={`w-3 h-3 ${
                      value === mode.id ? 'text-white/70' : 'text-green-500'
                    }`} />
                    <span className={value === mode.id ? 'text-white/90' : 'text-gray-600'}>
                      {feature}
                    </span>
                  </div>
                ))}
              </div>

              {/* 成本信息 */}
              <div className="pt-2 border-t border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between text-xs">
                  <span className={value === mode.id ? 'text-white/80' : 'text-gray-500'}>
                    相对成本
                  </span>
                  <div className="flex items-center gap-1">
                    {Array.from({ length: 5 }, (_, i) => (
                      <div
                        key={i}
                        className={`w-2 h-2 rounded-full ${
                          i < mode.cost
                            ? value === mode.id ? 'bg-white/70' : getProgressColor(mode.color)
                            : value === mode.id ? 'bg-white/20' : 'bg-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* 模式对比预览 */}
      {showComparison && (
        <Card className="p-4">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="font-medium text-gray-900 dark:text-white flex items-center gap-2">
                <Eye className="w-4 h-4" />
                模式对比预览
              </h4>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setPreviewMode(previewMode ? null : value)}
                className="text-blue-600 border-blue-300 hover:bg-blue-50"
              >
                {previewMode ? <Pause className="w-4 h-4 mr-1" /> : <Play className="w-4 h-4 mr-1" />}
                {previewMode ? '停止预览' : '开始预览'}
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {modePreviews.map((preview) => {
                const mode = getMode(preview.mode);
                if (!mode) return null;

                return (
                  <div key={preview.mode} className="space-y-2">
                    <div className={`relative rounded-lg overflow-hidden border-2 ${
                      value === preview.mode ? 'border-blue-500' : 'border-gray-200'
                    }`}>
                      <img
                        src={preview.thumbnailUrl}
                        alt={`${mode.name}预览`}
                        className="w-full h-auto aspect-video object-cover"
                      />
                      
                      {value === preview.mode && (
                        <div className="absolute top-2 right-2">
                          <Badge variant="secondary" className="bg-blue-500 text-white text-xs">
                            当前选择
                          </Badge>
                        </div>
                      )}
                      
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3">
                        <div className="flex items-center gap-2 text-white">
                          {mode.icon}
                          <span className="text-sm font-medium">{mode.name}</span>
                        </div>
                      </div>
                    </div>
                    
                    <p className="text-xs text-gray-600 dark:text-gray-300 text-center">
                      {preview.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </Card>
      )}

      {/* 模式选择建议 */}
      <Card className="p-4 bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800">
        <div className="space-y-3">
          <h4 className="font-medium text-yellow-800 dark:text-yellow-200 flex items-center gap-2">
            <AlertCircle className="w-4 h-4" />
            模式选择建议
          </h4>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-orange-500" />
                <h5 className="font-medium text-yellow-800 dark:text-yellow-200">快速模式</h5>
              </div>
              <ul className="text-yellow-700 dark:text-yellow-300 space-y-1 text-xs">
                <li>• 初次尝试和测试</li>
                <li>• 批量生成内容</li>
                <li>• 快速预览效果</li>
                <li>• 社交媒体分享</li>
              </ul>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4 text-blue-500" />
                <h5 className="font-medium text-yellow-800 dark:text-yellow-200">标准模式</h5>
              </div>
              <ul className="text-yellow-700 dark:text-yellow-300 space-y-1 text-xs">
                <li>• 日常内容创作</li>
                <li>• 个人项目使用</li>
                <li>• 平衡质量与成本</li>
                <li>• 大多数使用场景</li>
              </ul>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Crown className="w-4 h-4 text-purple-500" />
                <h5 className="font-medium text-yellow-800 dark:text-yellow-200">专业模式</h5>
              </div>
              <ul className="text-yellow-700 dark:text-yellow-300 space-y-1 text-xs">
                <li>• 商业项目制作</li>
                <li>• 高质量输出需求</li>
                <li>• 专业内容创作</li>
                <li>• 重要场合使用</li>
              </ul>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
