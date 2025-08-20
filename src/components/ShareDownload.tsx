"use client";

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Download, 
  Share, 
  Copy, 
  Link,
  Facebook,
  Twitter,
  Mail,
  MessageCircle,
  Instagram,
  Youtube,
  CheckCircle,
  FileVideo,
  HardDrive,
  Cloud,
  Smartphone,
  Monitor,
  Settings
} from 'lucide-react';

interface VideoFormat {
  id: string;
  name: string;
  extension: string;
  quality: string;
  size: string;
  compatibility: string[];
  recommended?: boolean;
}

interface SharePlatform {
  id: string;
  name: string;
  icon: React.ReactNode;
  color: string;
  description: string;
  maxDuration?: number;
  recommendedFormat?: string;
}

interface ShareDownloadProps {
  videoUrl: string;
  videoTitle?: string;
  videoDuration?: number;
  videoSize?: number; // in MB
  onDownload?: (format: string, quality: string) => void;
  onShare?: (platform: string, url: string) => void;
  className?: string;
}

export default function ShareDownload({
  videoUrl,
  videoTitle = "AI生成视频",
  videoDuration = 10,
  videoSize = 25,
  onDownload,
  onShare,
  className = ""
}: ShareDownloadProps) {
  const [selectedFormat, setSelectedFormat] = useState<string>('mp4');
  const [selectedQuality, setSelectedQuality] = useState<string>('1080p');
  const [shareUrl, setShareUrl] = useState<string>(videoUrl);
  const [copied, setCopied] = useState<string | null>(null);
  const [downloading, setDownloading] = useState<string | null>(null);

  // 视频格式选项
  const videoFormats: VideoFormat[] = [
    {
      id: 'mp4',
      name: 'MP4',
      extension: '.mp4',
      quality: '高质量',
      size: `${videoSize.toFixed(1)} MB`,
      compatibility: ['所有设备', '网页播放', '移动设备'],
      recommended: true
    },
    {
      id: 'webm',
      name: 'WebM',
      extension: '.webm',
      quality: '高质量',
      size: `${(videoSize * 0.8).toFixed(1)} MB`,
      compatibility: ['现代浏览器', '网页优化']
    },
    {
      id: 'mov',
      name: 'MOV',
      extension: '.mov',
      quality: '最高质量',
      size: `${(videoSize * 1.2).toFixed(1)} MB`,
      compatibility: ['苹果设备', '专业编辑']
    },
    {
      id: 'gif',
      name: 'GIF',
      extension: '.gif',
      quality: '中等质量',
      size: `${(videoSize * 2).toFixed(1)} MB`,
      compatibility: ['社交媒体', '聊天应用']
    }
  ];

  // 质量选项
  const qualityOptions = [
    { id: '4k', name: '4K (2160p)', multiplier: 4, description: '超高清，文件较大' },
    { id: '2k', name: '2K (1440p)', multiplier: 2.5, description: '高清，平衡质量与大小' },
    { id: '1080p', name: '1080p', multiplier: 1, description: '全高清，推荐选择', recommended: true },
    { id: '720p', name: '720p', multiplier: 0.6, description: '高清，文件较小' },
    { id: '480p', name: '480p', multiplier: 0.3, description: '标清，快速分享' }
  ];

  // 分享平台
  const sharePlatforms: SharePlatform[] = [
    {
      id: 'twitter',
      name: 'Twitter / X',
      icon: <Twitter className="w-5 h-5" />,
      color: 'bg-black text-white',
      description: '分享到 Twitter',
      maxDuration: 140,
      recommendedFormat: 'mp4'
    },
    {
      id: 'facebook',
      name: 'Facebook',
      icon: <Facebook className="w-5 h-5" />,
      color: 'bg-blue-600 text-white',
      description: '分享到 Facebook',
      maxDuration: 240,
      recommendedFormat: 'mp4'
    },
    {
      id: 'instagram',
      name: 'Instagram',
      icon: <Instagram className="w-5 h-5" />,
      color: 'bg-gradient-to-r from-purple-500 to-pink-500 text-white',
      description: '分享到 Instagram',
      maxDuration: 60,
      recommendedFormat: 'mp4'
    },
    {
      id: 'youtube',
      name: 'YouTube',
      icon: <Youtube className="w-5 h-5" />,
      color: 'bg-red-600 text-white',
      description: '上传到 YouTube',
      recommendedFormat: 'mp4'
    },
    {
      id: 'wechat',
      name: '微信',
      icon: <MessageCircle className="w-5 h-5" />,
      color: 'bg-green-500 text-white',
      description: '分享到微信',
      maxDuration: 30,
      recommendedFormat: 'mp4'
    },
    {
      id: 'email',
      name: '邮件',
      icon: <Mail className="w-5 h-5" />,
      color: 'bg-gray-600 text-white',
      description: '通过邮件发送',
      recommendedFormat: 'mp4'
    }
  ];

  // 计算预估文件大小
  const getEstimatedSize = (format: string, quality: string): number => {
    const formatMultiplier = {
      mp4: 1,
      webm: 0.8,
      mov: 1.2,
      gif: 2
    };
    
    const qualityMultiplier = qualityOptions.find(q => q.id === quality)?.multiplier || 1;
    return videoSize * (formatMultiplier[format as keyof typeof formatMultiplier] || 1) * qualityMultiplier;
  };

  // 处理下载
  const handleDownload = async (format: string, quality: string) => {
    setDownloading(`${format}-${quality}`);
    
    try {
      if (onDownload) {
        await onDownload(format, quality);
      } else {
        // 默认下载逻辑
        const link = document.createElement('a');
        link.href = videoUrl;
        link.download = `${videoTitle}.${videoFormats.find(f => f.id === format)?.extension || 'mp4'}`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    } catch (error) {
      console.error('下载失败:', error);
    } finally {
      setDownloading(null);
    }
  };

  // 处理分享
  const handleShare = async (platform: string) => {
    if (onShare) {
      onShare(platform, shareUrl);
      return;
    }

    // 默认分享逻辑
    const shareData = {
      title: videoTitle,
      text: '查看这个由AI生成的精彩视频！',
      url: shareUrl
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (error) {
        // 回退到复制链接
        copyToClipboard(shareUrl, 'link');
      }
    } else {
      // 打开分享链接
      const urls = {
        twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareData.text)}&url=${encodeURIComponent(shareData.url)}`,
        facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareData.url)}`,
        email: `mailto:?subject=${encodeURIComponent(shareData.title)}&body=${encodeURIComponent(`${shareData.text}\n\n${shareData.url}`)}`
      };
      
      const url = urls[platform as keyof typeof urls];
      if (url) {
        window.open(url, '_blank', 'width=600,height=400');
      }
    }
  };

  // 复制到剪贴板
  const copyToClipboard = async (text: string, type: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(type);
      setTimeout(() => setCopied(null), 2000);
    } catch (error) {
      console.error('复制失败:', error);
    }
  };

  // 生成分享链接
  const generateShareUrl = (): string => {
    // 这里可以生成短链接或包含参数的链接
    return videoUrl;
  };

  return (
    <div className={`space-y-6 ${className}`}>
      {/* 下载部分 */}
      <Card className="p-6">
        <div className="space-y-4">
          <div className="flex items-center gap-2 mb-4">
            <Download className="w-5 h-5 text-green-600" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">下载视频</h3>
          </div>

          {/* 格式选择 */}
          <div className="space-y-3">
            <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              选择格式
            </Label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {videoFormats.map((format) => (
                <Button
                  key={format.id}
                  variant={selectedFormat === format.id ? "default" : "outline"}
                  onClick={() => setSelectedFormat(format.id)}
                  className={`p-4 h-auto flex flex-col items-center gap-2 ${
                    selectedFormat === format.id 
                      ? 'bg-green-500 text-white border-green-500' 
                      : 'hover:bg-gray-50 dark:hover:bg-gray-800'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <FileVideo className="w-4 h-4" />
                    <span className="font-medium">{format.name}</span>
                    {format.recommended && (
                      <Badge variant="secondary" className="bg-orange-100 text-orange-800 text-xs">
                        推荐
                      </Badge>
                    )}
                  </div>
                  <div className="text-xs opacity-75">
                    {format.quality} • {format.size}
                  </div>
                </Button>
              ))}
            </div>
          </div>

          {/* 质量选择 */}
          <div className="space-y-3">
            <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              选择质量
            </Label>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-3">
              {qualityOptions.map((quality) => (
                <Button
                  key={quality.id}
                  variant={selectedQuality === quality.id ? "default" : "outline"}
                  onClick={() => setSelectedQuality(quality.id)}
                  className={`p-3 h-auto flex flex-col items-center gap-1 ${
                    selectedQuality === quality.id 
                      ? 'bg-blue-500 text-white border-blue-500' 
                      : 'hover:bg-gray-50 dark:hover:bg-gray-800'
                  }`}
                >
                  <span className="font-medium">{quality.name}</span>
                  <span className="text-xs opacity-75">{quality.description}</span>
                  {quality.recommended && (
                    <Badge variant="secondary" className="bg-orange-100 text-orange-800 text-xs mt-1">
                      推荐
                    </Badge>
                  )}
                </Button>
              ))}
            </div>
          </div>

          {/* 文件信息预览 */}
          <Card className="p-4 bg-gray-50 dark:bg-gray-800">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div>
                <div className="text-gray-600 dark:text-gray-400">格式</div>
                <div className="font-medium text-gray-900 dark:text-white">
                  {videoFormats.find(f => f.id === selectedFormat)?.name || 'MP4'}
                </div>
              </div>
              <div>
                <div className="text-gray-600 dark:text-gray-400">质量</div>
                <div className="font-medium text-gray-900 dark:text-white">
                  {qualityOptions.find(q => q.id === selectedQuality)?.name || '1080p'}
                </div>
              </div>
              <div>
                <div className="text-gray-600 dark:text-gray-400">预估大小</div>
                <div className="font-medium text-gray-900 dark:text-white">
                  {getEstimatedSize(selectedFormat, selectedQuality).toFixed(1)} MB
                </div>
              </div>
              <div>
                <div className="text-gray-600 dark:text-gray-400">时长</div>
                <div className="font-medium text-gray-900 dark:text-white">
                  {videoDuration}秒
                </div>
              </div>
            </div>
          </Card>

          {/* 下载按钮 */}
          <div className="flex gap-3">
            <Button
              onClick={() => handleDownload(selectedFormat, selectedQuality)}
              disabled={downloading === `${selectedFormat}-${selectedQuality}`}
              className="flex-1 bg-green-500 hover:bg-green-600 text-white"
            >
              {downloading === `${selectedFormat}-${selectedQuality}` ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"></div>
                  下载中...
                </>
              ) : (
                <>
                  <Download className="w-4 h-4 mr-2" />
                  下载视频
                </>
              )}
            </Button>
            
            <Button
              variant="outline"
              onClick={() => copyToClipboard(videoUrl, 'video')}
              className="border-green-300 text-green-600 hover:bg-green-50"
            >
              {copied === 'video' ? <CheckCircle className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            </Button>
          </div>
        </div>
      </Card>

      {/* 分享部分 */}
      <Card className="p-6">
        <div className="space-y-4">
          <div className="flex items-center gap-2 mb-4">
            <Share className="w-5 h-5 text-blue-600" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">分享视频</h3>
          </div>

          {/* 分享链接 */}
          <div className="space-y-3">
            <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              分享链接
            </Label>
            <div className="flex gap-2">
              <Input
                value={shareUrl}
                onChange={(e) => setShareUrl(e.target.value)}
                className="flex-1"
                placeholder="视频分享链接"
              />
              <Button
                onClick={() => copyToClipboard(shareUrl, 'link')}
                variant="outline"
                className="border-blue-300 text-blue-600 hover:bg-blue-50"
              >
                {copied === 'link' ? <CheckCircle className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              </Button>
            </div>
          </div>

          {/* 分享平台 */}
          <div className="space-y-3">
            <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              分享到平台
            </Label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {sharePlatforms.map((platform) => (
                <Button
                  key={platform.id}
                  onClick={() => handleShare(platform.id)}
                  className={`p-4 h-auto flex flex-col items-center gap-2 ${platform.color} hover:opacity-90 transition-opacity`}
                >
                  {platform.icon}
                  <span className="font-medium text-sm">{platform.name}</span>
                  {platform.maxDuration && videoDuration > platform.maxDuration && (
                    <Badge variant="secondary" className="bg-red-100 text-red-800 text-xs">
                      超时长限制
                    </Badge>
                  )}
                </Button>
              ))}
            </div>
          </div>

          {/* 平台兼容性提示 */}
          <Card className="p-4 bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
            <div className="space-y-2">
              <h4 className="font-medium text-blue-900 dark:text-blue-100 text-sm">
                平台兼容性提示
              </h4>
              <div className="text-xs text-blue-700 dark:text-blue-300 space-y-1">
                <p>• <strong>Twitter:</strong> 最大140秒，推荐MP4格式</p>
                <p>• <strong>Instagram:</strong> 最大60秒，推荐9:16或1:1比例</p>
                <p>• <strong>YouTube:</strong> 无时长限制，推荐1080p或更高质量</p>
                <p>• <strong>微信:</strong> 最大30秒，文件大小不超过25MB</p>
              </div>
            </div>
          </Card>
        </div>
      </Card>

      {/* 设备兼容性信息 */}
      <Card className="p-4 bg-gray-50 dark:bg-gray-800">
        <div className="space-y-3">
          <h4 className="font-medium text-gray-900 dark:text-white flex items-center gap-2">
            <Settings className="w-4 h-4" />
            设备兼容性
          </h4>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="flex items-center gap-3">
              <Monitor className="w-5 h-5 text-blue-500" />
              <div>
                <div className="font-medium text-gray-900 dark:text-white">桌面端</div>
                <div className="text-gray-600 dark:text-gray-300">所有格式支持</div>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <Smartphone className="w-5 h-5 text-green-500" />
              <div>
                <div className="font-medium text-gray-900 dark:text-white">移动端</div>
                <div className="text-gray-600 dark:text-gray-300">推荐MP4格式</div>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <Cloud className="w-5 h-5 text-purple-500" />
              <div>
                <div className="font-medium text-gray-900 dark:text-white">云端存储</div>
                <div className="text-gray-600 dark:text-gray-300">支持所有格式</div>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* 成功提示 */}
      {copied && (
        <div className="fixed top-4 right-4 z-50 animate-in slide-in-from-right">
          <Card className="p-3 bg-green-50 border-green-200 shadow-lg">
            <div className="flex items-center gap-2 text-green-800">
              <CheckCircle className="w-4 h-4" />
              <span className="text-sm font-medium">
                {copied === 'link' ? '链接已复制到剪贴板' : '视频链接已复制'}
              </span>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
