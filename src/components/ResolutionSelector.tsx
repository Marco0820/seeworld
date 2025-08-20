"use client";

import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { 
  Monitor, 
  Smartphone, 
  Tablet, 
  Square, 
  Settings,
  Eye,
  Maximize2,
  Check
} from 'lucide-react';

interface Resolution {
  id: string;
  name: string;
  width: number;
  height: number;
  aspectRatio: string;
  category: 'preset' | 'device' | 'custom';
  icon: React.ReactNode;
  description: string;
  recommended?: boolean;
}

interface ResolutionSelectorProps {
  value: { width: number; height: number } | null;
  onChange: (resolution: { width: number; height: number; aspectRatio: string }) => void;
  disabled?: boolean;
  showPreview?: boolean;
  className?: string;
}

export default function ResolutionSelector({
  value,
  onChange,
  disabled = false,
  showPreview = true,
  className = ""
}: ResolutionSelectorProps) {
  const [selectedResolution, setSelectedResolution] = useState<string>('');
  const [customWidth, setCustomWidth] = useState<string>('');
  const [customHeight, setCustomHeight] = useState<string>('');
  const [showCustomInput, setShowCustomInput] = useState(false);
  const [activeCategory, setActiveCategory] = useState<'preset' | 'device' | 'custom'>('preset');

  // 预设分辨率选项
  const presetResolutions: Resolution[] = [
    {
      id: 'hd',
      name: '720p HD',
      width: 1280,
      height: 720,
      aspectRatio: '16:9',
      category: 'preset',
      icon: <Monitor className="w-4 h-4" />,
      description: '标清高清，适合快速生成',
      recommended: true
    },
    {
      id: 'fhd',
      name: '1080p FHD',
      width: 1920,
      height: 1080,
      aspectRatio: '16:9',
      category: 'preset',
      icon: <Monitor className="w-4 h-4" />,
      description: '全高清，平衡质量与速度',
      recommended: true
    },
    {
      id: '2k',
      name: '2K QHD',
      width: 2560,
      height: 1440,
      aspectRatio: '16:9',
      category: 'preset',
      icon: <Monitor className="w-4 h-4" />,
      description: '2K分辨率，更高画质'
    },
    {
      id: '4k',
      name: '4K UHD',
      width: 3840,
      height: 2160,
      aspectRatio: '16:9',
      category: 'preset',
      icon: <Monitor className="w-4 h-4" />,
      description: '4K超高清，最佳画质'
    }
  ];

  // 设备适配分辨率
  const deviceResolutions: Resolution[] = [
    {
      id: 'mobile-portrait',
      name: '手机竖屏',
      width: 720,
      height: 1280,
      aspectRatio: '9:16',
      category: 'device',
      icon: <Smartphone className="w-4 h-4" />,
      description: 'TikTok, Instagram Stories'
    },
    {
      id: 'mobile-landscape',
      name: '手机横屏',
      width: 1280,
      height: 720,
      aspectRatio: '16:9',
      category: 'device',
      icon: <Smartphone className="w-4 h-4 rotate-90" />,
      description: 'YouTube Shorts 横屏'
    },
    {
      id: 'tablet-portrait',
      name: '平板竖屏',
      width: 1200,
      height: 1600,
      aspectRatio: '3:4',
      category: 'device',
      icon: <Tablet className="w-4 h-4" />,
      description: 'iPad 竖屏模式'
    },
    {
      id: 'tablet-landscape',
      name: '平板横屏',
      width: 1600,
      height: 1200,
      aspectRatio: '4:3',
      category: 'device',
      icon: <Tablet className="w-4 h-4 rotate-90" />,
      description: 'iPad 横屏模式'
    },
    {
      id: 'instagram-square',
      name: 'Instagram 方形',
      width: 1080,
      height: 1080,
      aspectRatio: '1:1',
      category: 'device',
      icon: <Square className="w-4 h-4" />,
      description: 'Instagram 帖子'
    }
  ];

  const allResolutions = [...presetResolutions, ...deviceResolutions];

  // 计算宽高比
  const calculateAspectRatio = (width: number, height: number): string => {
    const gcd = (a: number, b: number): number => b === 0 ? a : gcd(b, a % b);
    const divisor = gcd(width, height);
    return `${width / divisor}:${height / divisor}`;
  };

  // 处理分辨率选择
  const handleResolutionSelect = (resolution: Resolution) => {
    setSelectedResolution(resolution.id);
    setShowCustomInput(false);
    onChange({
      width: resolution.width,
      height: resolution.height,
      aspectRatio: resolution.aspectRatio
    });
  };

  // 处理自定义分辨率
  const handleCustomResolution = () => {
    const width = parseInt(customWidth);
    const height = parseInt(customHeight);
    
    if (width > 0 && height > 0 && width <= 4096 && height <= 4096) {
      const aspectRatio = calculateAspectRatio(width, height);
      setSelectedResolution('custom');
      onChange({ width, height, aspectRatio });
    }
  };

  // 验证自定义分辨率
  const isCustomValid = () => {
    const width = parseInt(customWidth);
    const height = parseInt(customHeight);
    return width > 0 && height > 0 && width <= 4096 && height <= 4096;
  };

  // 获取当前分辨率信息
  const getCurrentResolutionInfo = () => {
    if (!value) return null;
    
    const current = allResolutions.find(r => 
      r.width === value.width && r.height === value.height
    );
    
    if (current) return current;
    
    return {
      id: 'custom',
      name: '自定义',
      width: value.width,
      height: value.height,
      aspectRatio: calculateAspectRatio(value.width, value.height),
      category: 'custom' as const,
      icon: <Settings className="w-4 h-4" />,
      description: '用户自定义分辨率'
    };
  };

  const currentResolution = getCurrentResolutionInfo();

  // 获取文件大小估算
  const getEstimatedFileSize = (width: number, height: number, duration: number = 10): string => {
    // 粗略估算：每秒每像素约0.1字节
    const pixels = width * height;
    const bytesPerSecond = pixels * 0.1;
    const totalBytes = bytesPerSecond * duration;
    
    if (totalBytes < 1024 * 1024) {
      return `${(totalBytes / 1024).toFixed(0)} KB`;
    } else {
      return `${(totalBytes / (1024 * 1024)).toFixed(1)} MB`;
    }
  };

  return (
    <div className={`space-y-4 ${className}`}>
      {/* 当前选择显示 */}
      {currentResolution && (
        <Card className="p-4 bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="text-blue-600 dark:text-blue-400">
                {currentResolution.icon}
              </div>
              <div>
                <h4 className="font-medium text-blue-900 dark:text-blue-100">
                  {currentResolution.name}
                </h4>
                <p className="text-sm text-blue-700 dark:text-blue-300">
                  {currentResolution.width} × {currentResolution.height} ({currentResolution.aspectRatio})
                </p>
              </div>
            </div>
            <div className="text-right">
              <Badge variant="secondary" className="bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100">
                <Check className="w-3 h-3 mr-1" />
                已选择
              </Badge>
              <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">
                预估大小: {getEstimatedFileSize(currentResolution.width, currentResolution.height)}
              </p>
            </div>
          </div>
        </Card>
      )}

      {/* 分类切换 */}
      <div className="flex gap-2">
        <Button
          variant={activeCategory === 'preset' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setActiveCategory('preset')}
          className={activeCategory === 'preset' ? 'bg-blue-500 text-white' : ''}
        >
          <Monitor className="w-4 h-4 mr-1" />
          标准分辨率
        </Button>
        <Button
          variant={activeCategory === 'device' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setActiveCategory('device')}
          className={activeCategory === 'device' ? 'bg-blue-500 text-white' : ''}
        >
          <Smartphone className="w-4 h-4 mr-1" />
          设备适配
        </Button>
        <Button
          variant={activeCategory === 'custom' ? 'default' : 'outline'}
          size="sm"
          onClick={() => {
            setActiveCategory('custom');
            setShowCustomInput(true);
          }}
          className={activeCategory === 'custom' ? 'bg-blue-500 text-white' : ''}
        >
          <Settings className="w-4 h-4 mr-1" />
          自定义
        </Button>
      </div>

      {/* 分辨率选项网格 */}
      {(activeCategory === 'preset' || activeCategory === 'device') && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {(activeCategory === 'preset' ? presetResolutions : deviceResolutions).map((resolution) => (
            <Card
              key={resolution.id}
              className={`p-4 cursor-pointer transition-all duration-200 hover:shadow-md ${
                selectedResolution === resolution.id
                  ? 'ring-2 ring-blue-500 bg-blue-50 dark:bg-blue-900/20'
                  : 'hover:bg-gray-50 dark:hover:bg-gray-800'
              } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
              onClick={() => !disabled && handleResolutionSelect(resolution)}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className={`${
                    selectedResolution === resolution.id ? 'text-blue-600' : 'text-gray-500'
                  }`}>
                    {resolution.icon}
                  </div>
                  <h4 className="font-medium text-gray-900 dark:text-white">
                    {resolution.name}
                  </h4>
                  {resolution.recommended && (
                    <Badge variant="secondary" className="bg-green-100 text-green-800 text-xs">
                      推荐
                    </Badge>
                  )}
                </div>
                {selectedResolution === resolution.id && (
                  <Check className="w-4 h-4 text-blue-600" />
                )}
              </div>
              
              <div className="space-y-1 text-sm">
                <p className="text-gray-600 dark:text-gray-300">
                  {resolution.width} × {resolution.height}
                </p>
                <p className="text-gray-500 dark:text-gray-400 text-xs">
                  {resolution.description}
                </p>
                <div className="flex items-center justify-between pt-1">
                  <Badge variant="outline" className="text-xs">
                    {resolution.aspectRatio}
                  </Badge>
                  <span className="text-xs text-gray-400">
                    ~{getEstimatedFileSize(resolution.width, resolution.height)}
                  </span>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* 自定义分辨率输入 */}
      {activeCategory === 'custom' && showCustomInput && (
        <Card className="p-4">
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-3">
              <Settings className="w-5 h-5 text-gray-600" />
              <h4 className="font-medium text-gray-900 dark:text-white">自定义分辨率</h4>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="custom-width" className="text-sm font-medium">
                  宽度 (px)
                </Label>
                <Input
                  id="custom-width"
                  type="number"
                  placeholder="1920"
                  value={customWidth}
                  onChange={(e) => setCustomWidth(e.target.value)}
                  min="1"
                  max="4096"
                  disabled={disabled}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="custom-height" className="text-sm font-medium">
                  高度 (px)
                </Label>
                <Input
                  id="custom-height"
                  type="number"
                  placeholder="1080"
                  value={customHeight}
                  onChange={(e) => setCustomHeight(e.target.value)}
                  min="1"
                  max="4096"
                  disabled={disabled}
                />
              </div>
            </div>

            <div className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
              <p>• 支持范围: 1×1 到 4096×4096 像素</p>
              <p>• 建议使用常见宽高比 (16:9, 9:16, 1:1, 4:3)</p>
              {customWidth && customHeight && isCustomValid() && (
                <p className="text-blue-600 dark:text-blue-400">
                  宽高比: {calculateAspectRatio(parseInt(customWidth), parseInt(customHeight))} | 
                  预估大小: {getEstimatedFileSize(parseInt(customWidth), parseInt(customHeight))}
                </p>
              )}
            </div>

            <Button
              onClick={handleCustomResolution}
              disabled={!isCustomValid() || disabled}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white"
            >
              应用自定义分辨率
            </Button>
          </div>
        </Card>
      )}

      {/* 分辨率预览 */}
      {showPreview && currentResolution && (
        <Card className="p-4">
          <div className="space-y-3">
            <h4 className="font-medium text-gray-900 dark:text-white flex items-center gap-2">
              <Eye className="w-4 h-4" />
              分辨率预览
            </h4>
            
            <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4">
              <div className="flex items-center justify-center min-h-32">
                <div 
                  className="border-2 border-blue-500 bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center text-blue-600 dark:text-blue-400 text-sm font-medium"
                  style={{
                    width: Math.min(200, currentResolution.width / 10),
                    height: Math.min(112, currentResolution.height / 10),
                    aspectRatio: `${currentResolution.width}/${currentResolution.height}`
                  }}
                >
                  {currentResolution.width}×{currentResolution.height}
                </div>
              </div>
              
              <div className="text-center mt-3 space-y-1">
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  实际比例预览 (缩放显示)
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  宽高比: {currentResolution.aspectRatio}
                </p>
              </div>
            </div>
          </div>
        </Card>
      )}

      {/* 分辨率建议 */}
      <Card className="p-4 bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800">
        <div className="space-y-2">
          <h4 className="font-medium text-yellow-800 dark:text-yellow-200 flex items-center gap-2">
            <Maximize2 className="w-4 h-4" />
            分辨率选择建议
          </h4>
          <div className="text-sm text-yellow-700 dark:text-yellow-300 space-y-1">
            <p>• <strong>720p/1080p:</strong> 适合快速生成和预览</p>
            <p>• <strong>2K/4K:</strong> 适合高质量输出，但生成时间更长</p>
            <p>• <strong>竖屏 (9:16):</strong> 适合移动端短视频平台</p>
            <p>• <strong>方形 (1:1):</strong> 适合社交媒体帖子</p>
            <p>• <strong>横屏 (16:9):</strong> 适合传统视频平台</p>
          </div>
        </div>
      </Card>
    </div>
  );
}
