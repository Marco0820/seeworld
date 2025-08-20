"use client";

import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { 
  Gauge, 
  Zap, 
  Sparkles, 
  Target,
  Eye,
  RefreshCw,
  Info,
  TrendingUp,
  TrendingDown,
  Minus,
  Plus
} from 'lucide-react';

interface StrengthLevel {
  min: number;
  max: number;
  label: string;
  description: string;
  color: string;
  icon: React.ReactNode;
  characteristics: string[];
}

interface PromptStrengthControlProps {
  value: number;
  onChange: (strength: number) => void;
  disabled?: boolean;
  showVisualization?: boolean;
  showRealTimeFeedback?: boolean;
  currentPrompt?: string;
  className?: string;
}

export default function PromptStrengthControl({
  value,
  onChange,
  disabled = false,
  showVisualization = true,
  showRealTimeFeedback = true,
  currentPrompt = "",
  className = ""
}: PromptStrengthControlProps) {
  const [previewStrength, setPreviewStrength] = useState<number | null>(null);
  const [showDetails, setShowDetails] = useState(false);

  // 强度级别定义
  const strengthLevels: StrengthLevel[] = [
    {
      min: 0,
      max: 20,
      label: '极低',
      description: '最大创意自由度，AI自主发挥',
      color: 'gray',
      icon: <TrendingDown className="w-4 h-4" />,
      characteristics: [
        'AI创意主导',
        '意外惊喜效果',
        '风格多样化',
        '不可预测性高'
      ]
    },
    {
      min: 21,
      max: 40,
      label: '较低',
      description: '保持创意空间，松散遵循提示',
      color: 'blue',
      icon: <Sparkles className="w-4 h-4" />,
      characteristics: [
        '创意与提示平衡',
        '风格变化丰富',
        '保持基本主题',
        '适度的随机性'
      ]
    },
    {
      min: 41,
      max: 60,
      label: '中等',
      description: '平衡创意与准确性',
      color: 'green',
      icon: <Target className="w-4 h-4" />,
      characteristics: [
        '最佳平衡点',
        '稳定的输出',
        '适合大多数场景',
        '可预测的效果'
      ]
    },
    {
      min: 61,
      max: 80,
      label: '较高',
      description: '严格遵循提示词内容',
      color: 'orange',
      icon: <Zap className="w-4 h-4" />,
      characteristics: [
        '高度还原提示',
        '细节准确性高',
        '风格一致性强',
        '创意空间有限'
      ]
    },
    {
      min: 81,
      max: 100,
      label: '极高',
      description: '完全按照提示词生成',
      color: 'red',
      icon: <TrendingUp className="w-4 h-4" />,
      characteristics: [
        '完全遵循提示',
        '最高准确性',
        '固定化输出',
        '创意性最低'
      ]
    }
  ];

  // 预设强度值
  const presetValues = [10, 25, 50, 75, 90];

  // 获取当前强度级别
  const getCurrentLevel = (strength: number): StrengthLevel => {
    return strengthLevels.find(level => 
      strength >= level.min && strength <= level.max
    ) || strengthLevels[2];
  };

  const currentLevel = getCurrentLevel(value);

  // 处理强度变化
  const handleStrengthChange = (values: number[]) => {
    if (!disabled) {
      const newValue = values[0];
      onChange(newValue);
      if (showRealTimeFeedback) {
        setPreviewStrength(newValue);
        // 清除预览状态
        setTimeout(() => setPreviewStrength(null), 1500);
      }
    }
  };

  // 处理预设值选择
  const handlePresetSelect = (preset: number) => {
    if (!disabled) {
      onChange(preset);
    }
  };

  // 微调控制
  const handleAdjust = (delta: number) => {
    if (!disabled) {
      const newValue = Math.max(0, Math.min(100, value + delta));
      onChange(newValue);
    }
  };

  // 获取颜色类名
  const getColorClasses = (color: string) => {
    const colorMap = {
      gray: 'text-gray-600 bg-gray-100',
      blue: 'text-blue-600 bg-blue-100',
      green: 'text-green-600 bg-green-100',
      orange: 'text-orange-600 bg-orange-100',
      red: 'text-red-600 bg-red-100'
    };
    return colorMap[color as keyof typeof colorMap] || colorMap.green;
  };

  // 获取滑块颜色
  const getSliderColor = (color: string) => {
    const colorMap = {
      gray: 'accent-gray-500',
      blue: 'accent-blue-500',
      green: 'accent-green-500',
      orange: 'accent-orange-500',
      red: 'accent-red-500'
    };
    return colorMap[color as keyof typeof colorMap] || colorMap.green;
  };

  // 生成建议
  const getRecommendation = (): string => {
    if (!currentPrompt.trim()) {
      return "输入提示词后将显示个性化建议";
    }

    const promptLength = currentPrompt.length;
    const hasSpecificDetails = /\b(具体|详细|精确|准确)\b/.test(currentPrompt);
    const hasCreativeWords = /\b(创意|艺术|风格|氛围)\b/.test(currentPrompt);

    if (hasSpecificDetails && promptLength > 100) {
      return "检测到详细描述，建议使用70-85%强度以确保准确性";
    } else if (hasCreativeWords || promptLength < 50) {
      return "检测到创意需求，建议使用30-50%强度保持创造性";
    } else {
      return "平衡的提示词，建议使用50-65%强度获得最佳效果";
    }
  };

  return (
    <div className={`space-y-4 ${className}`}>
      {/* 当前强度显示 */}
      <Card className="p-4 bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="text-blue-600 dark:text-blue-400">
              <Gauge className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-medium text-blue-900 dark:text-blue-100">
                提示强度: {value}% ({currentLevel.label})
              </h4>
              <p className="text-sm text-blue-700 dark:text-blue-300">
                {currentLevel.description}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100 text-xs">
              {currentLevel.icon}
              <span className="ml-1">{currentLevel.label}</span>
            </Badge>
          </div>
        </div>
      </Card>

      {/* 滑块控制 */}
      <Card className="p-4">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="font-medium text-gray-900 dark:text-white flex items-center gap-2">
              <Target className="w-4 h-4" />
              强度调节
            </h4>
            
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleAdjust(-5)}
                disabled={disabled || value <= 0}
                className="w-8 h-8 p-0"
              >
                <Minus className="w-3 h-3" />
              </Button>
              
              <div className="flex items-center gap-2 min-w-16 justify-center">
                <span className="text-sm font-medium">{value}%</span>
              </div>
              
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleAdjust(5)}
                disabled={disabled || value >= 100}
                className="w-8 h-8 p-0"
              >
                <Plus className="w-3 h-3" />
              </Button>
            </div>
          </div>

          {/* 滑块 */}
          <div className="space-y-3">
            <Slider
              value={[value]}
              onValueChange={handleStrengthChange}
              min={0}
              max={100}
              step={1}
              disabled={disabled}
              className={`w-full ${getSliderColor(currentLevel.color)}`}
            />
            
            {/* 强度级别标记 */}
            <div className="flex justify-between text-xs text-gray-500 relative">
              {strengthLevels.map((level, index) => (
                <div key={level.label} className="flex flex-col items-center">
                  <div className={`w-2 h-2 rounded-full ${
                    value >= level.min && value <= level.max
                      ? 'bg-blue-500'
                      : 'bg-gray-300'
                  }`} />
                  <span className="mt-1">{level.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Card>

      {/* 预设值快速选择 */}
      <Card className="p-4">
        <div className="space-y-3">
          <h4 className="font-medium text-gray-900 dark:text-white">快速选择</h4>
          
          <div className="flex flex-wrap gap-2">
            {presetValues.map((preset) => {
              const level = getCurrentLevel(preset);
              return (
                <Button
                  key={preset}
                  variant={value === preset ? "default" : "outline"}
                  size="sm"
                  onClick={() => handlePresetSelect(preset)}
                  disabled={disabled}
                  className={`${
                    value === preset 
                      ? 'bg-blue-500 text-white border-transparent hover:bg-blue-600' 
                      : 'text-blue-600 border-blue-300 hover:bg-blue-50'
                  }`}
                >
                  {level.icon}
                  <span className="ml-1">{preset}%</span>
                </Button>
              );
            })}
          </div>
        </div>
      </Card>

      {/* 效果可视化 */}
      {showVisualization && (
        <Card className="p-4">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="font-medium text-gray-900 dark:text-white flex items-center gap-2">
                <Eye className="w-4 h-4" />
                效果可视化
              </h4>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowDetails(!showDetails)}
                className="text-gray-600 border-gray-300 hover:bg-gray-50"
              >
                <Info className="w-4 h-4 mr-1" />
                详情
              </Button>
            </div>

            {/* 强度效果示意图 */}
            <div className="relative bg-gray-100 dark:bg-gray-800 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600 dark:text-gray-300">AI创意度</span>
                <span className="text-sm text-gray-600 dark:text-gray-300">提示准确度</span>
              </div>
              
              <div className="relative h-8 bg-gradient-to-r from-purple-400 via-green-400 to-blue-400 rounded-full overflow-hidden">
                {/* 当前位置指示器 */}
                <div 
                  className="absolute top-0 bottom-0 w-1 bg-white shadow-lg transition-all duration-300"
                  style={{ left: `${value}%` }}
                />
                
                {/* 预览位置指示器 */}
                {previewStrength !== null && (
                  <div 
                    className="absolute top-0 bottom-0 w-1 bg-yellow-400 shadow-lg animate-pulse"
                    style={{ left: `${previewStrength}%` }}
                  />
                )}
              </div>
              
              <div className="flex justify-between mt-2 text-xs text-gray-500">
                <span>创意优先</span>
                <span>平衡</span>
                <span>精确优先</span>
              </div>
            </div>

            {/* 当前级别特征 */}
            <div className="grid grid-cols-2 gap-3">
              {currentLevel.characteristics.map((characteristic, index) => (
                <div key={index} className="flex items-center gap-2 text-sm">
                  <div className="w-2 h-2 rounded-full bg-blue-500" />
                  <span className="text-gray-600 dark:text-gray-300">{characteristic}</span>
                </div>
              ))}
            </div>
          </div>
        </Card>
      )}

      {/* 智能建议 */}
      {showRealTimeFeedback && (
        <Card className="p-4 bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
          <div className="space-y-3">
            <h4 className="font-medium text-blue-900 dark:text-blue-100 flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              智能建议
            </h4>
            
            <p className="text-sm text-blue-700 dark:text-blue-300">
              {getRecommendation()}
            </p>
            
            {currentPrompt.trim() && (
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onChange(30)}
                  disabled={disabled}
                  className="text-blue-600 border-blue-300 hover:bg-blue-100"
                >
                  创意优先 (30%)
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onChange(50)}
                  disabled={disabled}
                  className="text-blue-600 border-blue-300 hover:bg-blue-100"
                >
                  平衡模式 (50%)
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onChange(75)}
                  disabled={disabled}
                  className="text-blue-600 border-blue-300 hover:bg-blue-100"
                >
                  精确优先 (75%)
                </Button>
              </div>
            )}
          </div>
        </Card>
      )}

      {/* 详细说明 */}
      {showDetails && (
        <Card className="p-4 bg-gray-50 dark:bg-gray-800/50">
          <div className="space-y-4">
            <h4 className="font-medium text-gray-900 dark:text-white">强度级别详解</h4>
            
            <div className="space-y-3">
              {strengthLevels.map((level) => (
                <div key={level.label} className={`p-3 rounded-lg border ${
                  value >= level.min && value <= level.max
                    ? 'border-blue-300 bg-blue-50 dark:bg-blue-900/20'
                    : 'border-gray-200 dark:border-gray-700'
                }`}>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="text-blue-600">
                      {level.icon}
                    </div>
                    <h5 className="font-medium text-gray-900 dark:text-white">
                      {level.label} ({level.min}-{level.max}%)
                    </h5>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                    {level.description}
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {level.characteristics.map((char, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {char}
                      </Badge>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>
      )}

      {/* 实时反馈提示 */}
      {previewStrength !== null && (
        <div className="fixed top-4 right-4 z-50 animate-in slide-in-from-right">
          <Card className="p-3 bg-yellow-50 border-yellow-200 shadow-lg">
            <div className="flex items-center gap-2 text-yellow-800">
              <RefreshCw className="w-4 h-4 animate-spin" />
              <span className="text-sm font-medium">
                预览强度: {previewStrength}%
              </span>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
