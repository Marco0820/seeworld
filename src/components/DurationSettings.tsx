"use client";

import { useState, useEffect, useCallback } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { 
  Clock, 
  Plus, 
  Minus, 
  Timer,
  Zap,
  Star,
  AlertCircle,
  TrendingUp
} from 'lucide-react';

interface DurationPreset {
  id: string;
  value: number;
  label: string;
  description: string;
  recommended?: boolean;
  icon: React.ReactNode;
  useCase: string;
}

interface DurationSuggestion {
  min: number;
  max: number;
  reason: string;
}

interface DurationSettingsProps {
  value: number;
  onChange: (duration: number) => void;
  minDuration?: number;
  maxDuration?: number;
  disabled?: boolean;
  imageCount?: number;
  promptComplexity?: 'simple' | 'moderate' | 'complex';
  generationMode?: 'fast' | 'standard' | 'professional';
  className?: string;
}

export default function DurationSettings({
  value,
  onChange,
  minDuration = 1,
  maxDuration = 60,
  disabled = false,
  imageCount = 1,
  promptComplexity = 'moderate',
  generationMode = 'standard',
  className = ""
}: DurationSettingsProps) {
  const [customInput, setCustomInput] = useState<string>(value.toString());
  const [showCustomInput, setShowCustomInput] = useState(false);
  const [suggestions, setSuggestions] = useState<DurationSuggestion | null>(null);

  // Duration preset options
  const durationPresets: DurationPreset[] = [
    {
      id: '3s',
      value: 3,
      label: '3s',
      description: 'Quick Preview',
      icon: <Zap className="w-4 h-4" />,
      useCase: 'Quick testing and preview effects'
    },
    {
      id: '5s',
      value: 5,
      label: '5s',
      description: 'Short Video',
      recommended: true,
      icon: <Clock className="w-4 h-4" />,
      useCase: 'Short video platforms, quick information delivery'
    },
    {
      id: '10s',
      value: 10,
      label: '10s',
      description: 'Standard Length',
      recommended: true,
      icon: <Timer className="w-4 h-4" />,
      useCase: 'Balance content richness and viewing experience'
    },
    {
      id: '15s',
      value: 15,
      label: '15s',
      description: 'Rich Content',
      icon: <Star className="w-4 h-4" />,
      useCase: 'Show more details and variations'
    },
    {
      id: '30s',
      value: 30,
      label: '30s',
      description: 'Complete Story',
      icon: <TrendingUp className="w-4 h-4" />,
      useCase: 'Complete narrative, suitable for complex scenes'
    }
  ];

  // 动态时长建议
  const generateSuggestion = useCallback((): DurationSuggestion => {
    let baseDuration = 10;
    
    // 根据图像数量调整
    if (imageCount > 1) {
      baseDuration += Math.min(imageCount * 2, 20);
    }
    
    // 根据提示词复杂度调整
    switch (promptComplexity) {
      case 'simple':
        baseDuration *= 0.8;
        break;
      case 'complex':
        baseDuration *= 1.5;
        break;
    }
    
    // 根据生成模式调整
    switch (generationMode) {
      case 'fast':
        baseDuration *= 0.7;
        break;
      case 'professional':
        baseDuration *= 1.3;
        break;
    }
    
    const minSuggested = Math.max(Math.floor(baseDuration * 0.7), minDuration);
    const maxSuggested = Math.min(Math.ceil(baseDuration * 1.3), maxDuration);
    
    let reason = `基于${imageCount > 1 ? `${imageCount}张图像` : '单张图像'}`;
    if (promptComplexity === 'complex') {
      reason += '和复杂提示词';
    } else if (promptComplexity === 'simple') {
      reason += '和简单提示词';
    }
    reason += `，建议使用${generationMode === 'professional' ? '专业' : generationMode === 'fast' ? '快速' : '标准'}模式`;
    
    return {
      min: minSuggested,
      max: maxSuggested,
      reason
    };
  }, [imageCount, promptComplexity, generationMode, minDuration, maxDuration]);

  // 更新建议
  useEffect(() => {
    setSuggestions(generateSuggestion());
  }, [imageCount, promptComplexity, generationMode, generateSuggestion]);

  // 处理预设选择
  const handlePresetSelect = (preset: DurationPreset) => {
    if (!disabled && preset.value >= minDuration && preset.value <= maxDuration) {
      onChange(preset.value);
      setCustomInput(preset.value.toString());
      setShowCustomInput(false);
    }
  };

  // 处理微调
  const handleAdjust = (delta: number) => {
    if (disabled) return;
    
    const newValue = Math.max(minDuration, Math.min(maxDuration, value + delta));
    onChange(newValue);
    setCustomInput(newValue.toString());
  };

  // 处理自定义输入
  const handleCustomInputChange = (inputValue: string) => {
    setCustomInput(inputValue);
    const numValue = parseInt(inputValue);
    
    if (!isNaN(numValue) && numValue >= minDuration && numValue <= maxDuration) {
      onChange(numValue);
    }
  };

  // 处理滑块变化
  const handleSliderChange = (values: number[]) => {
    if (!disabled) {
      const newValue = values[0];
      onChange(newValue);
      setCustomInput(newValue.toString());
    }
  };

  // 获取当前时长的成本估算
  const getCostEstimate = (duration: number): string => {
    const baseCost = generationMode === 'fast' ? 10 : generationMode === 'professional' ? 30 : 20;
    const cost = Math.ceil(baseCost * (duration / 10));
    return `${cost} 积分`;
  };

  // 获取生成时间估算
  const getTimeEstimate = (duration: number): string => {
    const baseTime = generationMode === 'fast' ? 30 : generationMode === 'professional' ? 180 : 90;
    const timeInSeconds = Math.ceil(baseTime * (duration / 10));
    
    if (timeInSeconds < 60) {
      return `约 ${timeInSeconds} 秒`;
    } else {
      return `约 ${Math.ceil(timeInSeconds / 60)} 分钟`;
    }
  };

  // 获取当前选中的预设
  const selectedPreset = durationPresets.find(preset => preset.value === value);

  return (
    <div className={`space-y-4 ${className}`}>
      {/* 当前设置显示 */}
      <Card className="p-4 bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="text-green-600 dark:text-green-400">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-medium text-green-900 dark:text-green-100">
                视频时长: {value} 秒
              </h4>
              <p className="text-sm text-green-700 dark:text-green-300">
                {selectedPreset ? selectedPreset.description : '自定义时长'}
              </p>
            </div>
          </div>
          <div className="text-right">
            <Badge variant="secondary" className="bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100">
              {getCostEstimate(value)}
            </Badge>
            <p className="text-xs text-green-600 dark:text-green-400 mt-1">
              {getTimeEstimate(value)}
            </p>
          </div>
        </div>
      </Card>

      {/* 预设选项 */}
      <Card className="p-4">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Timer className="w-5 h-5 text-gray-600" />
            <h4 className="font-medium text-gray-900 dark:text-white">预设时长</h4>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
            {durationPresets.map((preset) => (
              <Button
                key={preset.id}
                variant={value === preset.value ? "default" : "outline"}
                size="sm"
                onClick={() => handlePresetSelect(preset)}
                disabled={disabled || preset.value < minDuration || preset.value > maxDuration}
                className={`relative h-auto p-3 flex flex-col items-center gap-2 ${
                  value === preset.value 
                    ? 'bg-blue-500 text-white border-blue-500' 
                    : 'hover:bg-gray-50 dark:hover:bg-gray-800'
                }`}
              >
                {preset.recommended && (
                  <Badge 
                    variant="secondary" 
                    className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs px-1 py-0"
                  >
                    推荐
                  </Badge>
                )}
                
                <div className={`${
                  value === preset.value ? 'text-white' : 'text-gray-600'
                }`}>
                  {preset.icon}
                </div>
                
                <div className="text-center">
                  <div className="font-medium">{preset.label}</div>
                  <div className="text-xs opacity-75">{preset.description}</div>
                </div>
              </Button>
            ))}
          </div>
        </div>
      </Card>

      {/* 微调控制 */}
      <Card className="p-4">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="font-medium text-gray-900 dark:text-white">精确调节</h4>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleAdjust(-1)}
                disabled={disabled || value <= minDuration}
                className="w-8 h-8 p-0"
              >
                <Minus className="w-3 h-3" />
              </Button>
              
              <div className="flex items-center gap-2">
                <Input
                  type="number"
                  value={customInput}
                  onChange={(e) => handleCustomInputChange(e.target.value)}
                  min={minDuration}
                  max={maxDuration}
                  disabled={disabled}
                  className="w-16 h-8 text-center text-sm"
                />
                <span className="text-sm text-gray-500">秒</span>
              </div>
              
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleAdjust(1)}
                disabled={disabled || value >= maxDuration}
                className="w-8 h-8 p-0"
              >
                <Plus className="w-3 h-3" />
              </Button>
            </div>
          </div>

          {/* 滑块控制 */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-gray-500">
              <span>{minDuration}s</span>
              <span>{maxDuration}s</span>
            </div>
            <Slider
              value={[value]}
              onValueChange={handleSliderChange}
              min={minDuration}
              max={maxDuration}
              step={1}
              disabled={disabled}
              className="w-full"
            />
            <div className="text-center">
              <Badge variant="outline" className="text-xs">
                当前: {value}s
              </Badge>
            </div>
          </div>
        </div>
      </Card>

      {/* 动态建议 */}
      {suggestions && (
        <Card className="p-4 bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-blue-600" />
              <h4 className="font-medium text-blue-900 dark:text-blue-100">智能建议</h4>
            </div>
            
            <p className="text-sm text-blue-700 dark:text-blue-300">
              {suggestions.reason}，建议时长 <strong>{suggestions.min}-{suggestions.max} 秒</strong>
            </p>
            
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => onChange(suggestions.min)}
                disabled={disabled}
                className="text-blue-600 border-blue-300 hover:bg-blue-100"
              >
                使用 {suggestions.min}s
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => onChange(suggestions.max)}
                disabled={disabled}
                className="text-blue-600 border-blue-300 hover:bg-blue-100"
              >
                使用 {suggestions.max}s
              </Button>
            </div>
          </div>
        </Card>
      )}

      {/* 时长效果说明 */}
      <Card className="p-4 bg-gray-50 dark:bg-gray-800/50">
        <div className="space-y-3">
          <h4 className="font-medium text-gray-900 dark:text-white">时长选择指南</h4>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="space-y-2">
              <h5 className="font-medium text-gray-800 dark:text-gray-200">短时长 (1-10秒)</h5>
              <ul className="text-gray-600 dark:text-gray-300 space-y-1 text-xs">
                <li>• 生成速度快，成本低</li>
                <li>• 适合快速预览和测试</li>
                <li>• 适合简单动作和转场</li>
                <li>• 适合社交媒体快速分享</li>
              </ul>
            </div>
            
            <div className="space-y-2">
              <h5 className="font-medium text-gray-800 dark:text-gray-200">长时长 (15-60秒)</h5>
              <ul className="text-gray-600 dark:text-gray-300 space-y-1 text-xs">
                <li>• 可展示更丰富的内容</li>
                <li>• 适合复杂场景和故事</li>
                <li>• 更好的视觉效果和细节</li>
                <li>• 生成时间更长，成本更高</li>
              </ul>
            </div>
          </div>
          
          <div className="pt-2 border-t border-gray-200 dark:border-gray-700">
            <p className="text-xs text-gray-500 dark:text-gray-400">
              💡 提示：首次使用建议选择较短时长进行测试，确认效果后再使用较长时长
            </p>
          </div>
        </div>
      </Card>

      {/* 成本和时间详情 */}
      <div className="grid grid-cols-2 gap-4">
        <Card className="p-3">
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600 dark:text-green-400">
              {getCostEstimate(value)}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-300">预估成本</div>
          </div>
        </Card>
        
        <Card className="p-3">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              {getTimeEstimate(value)}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-300">预估时间</div>
          </div>
        </Card>
      </div>
    </div>
  );
}
