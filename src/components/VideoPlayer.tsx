"use client";

import { useState, useRef, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { 
  Play, 
  Pause, 
  Square,
  Volume2, 
  VolumeX,
  Maximize2,
  Minimize2,
  RotateCcw,
  SkipBack,
  SkipForward,
  Camera,
  Settings,
  Download,
  Share,
  Eye,
  Clock
} from 'lucide-react';

interface VideoPlayerProps {
  videoUrl: string;
  thumbnailUrl?: string;
  title?: string;
  duration?: number;
  onScreenshot?: (screenshotUrl: string) => void;
  onShare?: () => void;
  onDownload?: () => void;
  className?: string;
  controls?: boolean;
  autoPlay?: boolean;
  loop?: boolean;
}

export default function VideoPlayer({
  videoUrl,
  thumbnailUrl,
  title = "Generated Video",
  duration,
  onScreenshot,
  onShare,
  onDownload,
  className = "",
  controls = true,
  autoPlay = false,
  loop = false
}: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [videoDuration, setVideoDuration] = useState(duration || 0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [showControls, setShowControls] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const playbackRates = [0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2];

  // Video event handling
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleLoadStart = () => setIsLoading(true);
    const handleCanPlay = () => setIsLoading(false);
    const handleError = () => {
      setIsLoading(false);
      setError('Video loading failed');
    };
    
    const handleTimeUpdate = () => {
      setCurrentTime(video.currentTime);
    };
    
    const handleDurationChange = () => {
      setVideoDuration(video.duration);
    };
    
    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    const handleEnded = () => setIsPlaying(false);

    video.addEventListener('loadstart', handleLoadStart);
    video.addEventListener('canplay', handleCanPlay);
    video.addEventListener('error', handleError);
    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('durationchange', handleDurationChange);
    video.addEventListener('play', handlePlay);
    video.addEventListener('pause', handlePause);
    video.addEventListener('ended', handleEnded);

    return () => {
      video.removeEventListener('loadstart', handleLoadStart);
      video.removeEventListener('canplay', handleCanPlay);
      video.removeEventListener('error', handleError);
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('durationchange', handleDurationChange);
      video.removeEventListener('play', handlePlay);
      video.removeEventListener('pause', handlePause);
      video.removeEventListener('ended', handleEnded);
    };
  }, []);

  // 播放/暂停切换
  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    if (isPlaying) {
      video.pause();
    } else {
      video.play().catch(() => {
        setError('Video playback failed');
      });
    }
  };

  // 停止播放
  const stopVideo = () => {
    const video = videoRef.current;
    if (!video) return;

    video.pause();
    video.currentTime = 0;
  };

  // 跳转到指定时间
  const seekTo = (time: number) => {
    const video = videoRef.current;
    if (!video) return;

    video.currentTime = Math.max(0, Math.min(time, videoDuration));
  };

  // 快进/快退
  const skip = (seconds: number) => {
    seekTo(currentTime + seconds);
  };

  // 音量控制
  const handleVolumeChange = (values: number[]) => {
    const newVolume = values[0];
    const video = videoRef.current;
    if (!video) return;

    setVolume(newVolume);
    video.volume = newVolume;
    
    if (newVolume === 0) {
      setIsMuted(true);
    } else if (isMuted) {
      setIsMuted(false);
    }
  };

  // 静音切换
  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;

    if (isMuted) {
      video.volume = volume;
      setIsMuted(false);
    } else {
      video.volume = 0;
      setIsMuted(true);
    }
  };

  // 播放速度控制
  const changePlaybackRate = (rate: number) => {
    const video = videoRef.current;
    if (!video) return;

    video.playbackRate = rate;
    setPlaybackRate(rate);
  };

  // 全屏切换
  const toggleFullscreen = () => {
    const video = videoRef.current;
    if (!video) return;

    if (!document.fullscreenElement) {
      video.requestFullscreen().then(() => {
        setIsFullscreen(true);
      }).catch(() => {
        setError('Unable to enter fullscreen mode');
      });
    } else {
      document.exitFullscreen().then(() => {
        setIsFullscreen(false);
      });
    }
  };

  // 截图功能
  const takeScreenshot = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    
    canvas.toBlob((blob) => {
      if (blob && onScreenshot) {
        const url = URL.createObjectURL(blob);
        onScreenshot(url);
      }
    }, 'image/png');
  };

  // 格式化时间
  const formatTime = (time: number): string => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  // 获取进度百分比
  const getProgress = (): number => {
    return videoDuration > 0 ? (currentTime / videoDuration) * 100 : 0;
  };

  return (
    <div className={`space-y-4 ${className}`}>
      <Card className="overflow-hidden bg-black">
        <div className="relative group">
          {/* 视频元素 */}
          <video
            ref={videoRef}
            className="w-full h-auto max-h-96 object-contain"
            poster={thumbnailUrl}
            autoPlay={autoPlay}
            loop={loop}
            playsInline
            onMouseEnter={() => setShowControls(true)}
            onMouseLeave={() => setShowControls(false)}
          >
            <source src={videoUrl} type="video/mp4" />
            Your browser does not support video playback.
          </video>

          {/* 隐藏的canvas用于截图 */}
          <canvas ref={canvasRef} className="hidden" />

          {/* 加载状态 */}
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/50">
              <div className="text-white text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-2 border-white border-t-transparent mx-auto mb-2"></div>
                <p className="text-sm">Loading...</p>
              </div>
            </div>
          )}

          {/* 错误状态 */}
          {error && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/50">
              <div className="text-white text-center">
                <p className="text-sm">{error}</p>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setError(null);
                    setIsLoading(true);
                    videoRef.current?.load();
                  }}
                  className="mt-2 text-white border-white hover:bg-white hover:text-black"
                >
                  Retry
                </Button>
              </div>
            </div>
          )}

          {/* 播放控制覆盖层 */}
          {controls && showControls && !isLoading && !error && (
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <Button
                onClick={togglePlay}
                size="lg"
                className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white border-0 rounded-full w-16 h-16"
              >
                {isPlaying ? <Pause className="w-8 h-8" /> : <Play className="w-8 h-8 ml-1" />}
              </Button>
            </div>
          )}

          {/* 视频信息覆盖层 */}
          <div className="absolute top-4 left-4 bg-black/50 backdrop-blur-sm rounded px-3 py-1">
            <div className="flex items-center gap-2 text-white text-sm">
              <Eye className="w-4 h-4" />
              <span>{title}</span>
            </div>
          </div>

          {/* 播放速度指示器 */}
          {playbackRate !== 1 && (
            <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm rounded px-2 py-1">
              <span className="text-white text-xs">{playbackRate}x</span>
            </div>
          )}
        </div>

        {/* 控制栏 */}
        {controls && (
          <div className="p-4 bg-gray-900 text-white">
            {/* 进度条 */}
            <div className="mb-4">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-sm text-gray-300">{formatTime(currentTime)}</span>
                <div className="flex-1">
                  <Slider
                    value={[getProgress()]}
                    onValueChange={([value]) => seekTo((value / 100) * videoDuration)}
                    min={0}
                    max={100}
                    step={0.1}
                    className="w-full accent-blue-500"
                  />
                </div>
                <span className="text-sm text-gray-300">{formatTime(videoDuration)}</span>
              </div>
            </div>

            {/* 主控制按钮 */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {/* 播放控制 */}
                <Button
                  onClick={() => skip(-10)}
                  size="sm"
                  variant="ghost"
                  className="text-white hover:bg-gray-700"
                >
                  <SkipBack className="w-4 h-4" />
                </Button>
                
                <Button
                  onClick={togglePlay}
                  size="sm"
                  variant="ghost"
                  className="text-white hover:bg-gray-700"
                >
                  {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                </Button>
                
                <Button
                  onClick={stopVideo}
                  size="sm"
                  variant="ghost"
                  className="text-white hover:bg-gray-700"
                >
                  <Square className="w-4 h-4" />
                </Button>
                
                <Button
                  onClick={() => skip(10)}
                  size="sm"
                  variant="ghost"
                  className="text-white hover:bg-gray-700"
                >
                  <SkipForward className="w-4 h-4" />
                </Button>

                {/* 音量控制 */}
                <div className="flex items-center gap-2 ml-4">
                  <Button
                    onClick={toggleMute}
                    size="sm"
                    variant="ghost"
                    className="text-white hover:bg-gray-700"
                  >
                    {isMuted || volume === 0 ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                  </Button>
                  
                  <div className="w-20">
                    <Slider
                      value={[isMuted ? 0 : volume]}
                      onValueChange={handleVolumeChange}
                      min={0}
                      max={1}
                      step={0.01}
                      className="w-full accent-blue-500"
                    />
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {/* 播放速度 */}
                <select
                  value={playbackRate}
                  onChange={(e) => changePlaybackRate(parseFloat(e.target.value))}
                  className="bg-gray-700 text-white text-sm rounded px-2 py-1 border-0"
                >
                  {playbackRates.map(rate => (
                    <option key={rate} value={rate}>
                      {rate}x
                    </option>
                  ))}
                </select>

                {/* 截图 */}
                {onScreenshot && (
                  <Button
                    onClick={takeScreenshot}
                    size="sm"
                    variant="ghost"
                    className="text-white hover:bg-gray-700"
                    title="Screenshot"
                  >
                    <Camera className="w-4 h-4" />
                  </Button>
                )}

                {/* 全屏 */}
                <Button
                  onClick={toggleFullscreen}
                  size="sm"
                  variant="ghost"
                  className="text-white hover:bg-gray-700"
                >
                  {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
                </Button>
              </div>
            </div>
          </div>
        )}
      </Card>

      {/* 操作按钮区域 */}
      <div className="flex flex-wrap gap-3">
        {onDownload && (
          <Button
            onClick={onDownload}
            className="bg-green-500 hover:bg-green-600 text-white"
          >
            <Download className="w-4 h-4 mr-2" />
            Download Video
          </Button>
        )}
        
        {onShare && (
          <Button
            onClick={onShare}
            variant="outline"
            className="border-blue-300 text-blue-600 hover:bg-blue-50"
          >
            <Share className="w-4 h-4 mr-2" />
            Share Video
          </Button>
        )}
        
        {onScreenshot && (
          <Button
            onClick={takeScreenshot}
            variant="outline"
            className="border-purple-300 text-purple-600 hover:bg-purple-50"
          >
            <Camera className="w-4 h-4 mr-2" />
            Screenshot
          </Button>
        )}
      </div>

      {/* 视频统计信息 */}
      <Card className="p-4 bg-gray-50 dark:bg-gray-800">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div className="text-center">
            <div className="text-gray-600 dark:text-gray-400">Duration</div>
            <div className="font-medium text-gray-900 dark:text-white">
              {formatTime(videoDuration)}
            </div>
          </div>
          
          <div className="text-center">
            <div className="text-gray-600 dark:text-gray-400">Playback Speed</div>
            <div className="font-medium text-gray-900 dark:text-white">
              {playbackRate}x
            </div>
          </div>
          
          <div className="text-center">
            <div className="text-gray-600 dark:text-gray-400">Volume</div>
            <div className="font-medium text-gray-900 dark:text-white">
              {isMuted ? 'Muted' : `${Math.round(volume * 100)}%`}
            </div>
          </div>
          
          <div className="text-center">
            <div className="text-gray-600 dark:text-gray-400">Status</div>
            <div className="font-medium text-gray-900 dark:text-white">
              {isLoading ? 'Loading' : error ? 'Error' : isPlaying ? 'Playing' : 'Paused'}
            </div>
          </div>
        </div>
      </Card>

      {/* 播放快捷键提示 */}
      <Card className="p-3 bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800">
        <div className="text-sm text-yellow-800 dark:text-yellow-200">
          <p className="font-medium mb-2">Keyboard Shortcuts:</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs">
            <span>• Space: Play/Pause</span>
            <span>• ←/→: Rewind/Forward 10s</span>
            <span>• ↑/↓: Volume Control</span>
            <span>• F: Toggle Fullscreen</span>
          </div>
        </div>
      </Card>
    </div>
  );
}
