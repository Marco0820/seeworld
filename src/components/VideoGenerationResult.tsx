"use client";

import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { VideoGenerationResponse } from '@/types/video';
import {
  Download,
  Share,
  Play,
  Pause,
  RotateCcw,
  CheckCircle,
  AlertCircle,
  Clock,
  Eye
} from 'lucide-react';

interface VideoGenerationResultProps {
  result: VideoGenerationResponse | null;
  onRefresh?: () => void;
  onGenerateAnother?: () => void;
}

export default function VideoGenerationResult({
  result,
  onRefresh,
  onGenerateAnother
}: VideoGenerationResultProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  if (!result) {
    return null;
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-green-400';
      case 'processing': return 'text-blue-400';
      case 'pending': return 'text-yellow-400';
      case 'failed': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="w-5 h-5" />;
      case 'processing': return <Clock className="w-5 h-5 animate-spin" />;
      case 'pending': return <Clock className="w-5 h-5" />;
      case 'failed': return <AlertCircle className="w-5 h-5" />;
      default: return <Clock className="w-5 h-5" />;
    }
  };

  const getStatusMessage = (status: string) => {
    switch (status) {
      case 'completed': return 'Video generated successfully!';
      case 'processing': return 'Generating your video...';
      case 'pending': return 'Your request is in queue...';
      case 'failed': return result.error || 'Video generation failed';
      default: return 'Processing...';
    }
  };

  const handleDownload = () => {
    if (result.videoUrl) {
      const link = document.createElement('a');
      link.href = result.videoUrl;
      link.download = `seeworld-video-${result.id}.mp4`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const handleShare = async () => {
    if (navigator.share && result.videoUrl) {
      try {
        await navigator.share({
          title: 'Check out this AI-generated video!',
          text: 'Created with SeeWorld AI',
          url: result.videoUrl,
        });
      } catch (error) {
        // Fallback to clipboard
        navigator.clipboard.writeText(result.videoUrl);
        alert('Video URL copied to clipboard!');
      }
    } else if (result.videoUrl) {
      navigator.clipboard.writeText(result.videoUrl);
      alert('Video URL copied to clipboard!');
    }
  };

  return (
    <Card className="p-6 bg-white/5 border-white/20">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className={`${getStatusColor(result.status)} flex items-center gap-2`}>
            {getStatusIcon(result.status)}
            <h3 className="text-lg font-semibold">Generation Result</h3>
          </div>
        </div>

        {result.status === 'processing' && onRefresh && (
          <Button
            onClick={onRefresh}
            variant="outline"
            size="sm"
            className="bg-white/10 border-white/20 text-white hover:bg-white/20"
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            Refresh
          </Button>
        )}
      </div>

      {/* Status Message */}
      <Alert className={`mb-6 ${
        result.status === 'completed' ? 'bg-green-500/20 border-green-500/30' :
        result.status === 'failed' ? 'bg-red-500/20 border-red-500/30' :
        'bg-blue-500/20 border-blue-500/30'
      }`}>
        <AlertDescription className={getStatusColor(result.status)}>
          {getStatusMessage(result.status)}
        </AlertDescription>
      </Alert>

      {/* Progress Bar */}
      {(result.status === 'pending' || result.status === 'processing') && (
        <div className="space-y-2 mb-6">
          <div className="flex justify-between text-sm">
            <span className="text-white/60">Progress</span>
            <span className="text-white">{result.progress || 0}%</span>
          </div>
          <Progress value={result.progress || 0} className="w-full" />
        </div>
      )}

      {/* Video Player */}
      {result.status === 'completed' && result.videoUrl && (
        <div className="space-y-4 mb-6">
          <div className="relative bg-black rounded-lg overflow-hidden">
            <video
              className="w-full h-auto max-h-96"
              controls
              poster={result.thumbnailUrl}
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
              onTimeUpdate={(e) => setCurrentTime(e.currentTarget.currentTime)}
              onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
            >
              <source src={result.videoUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </video>

            {/* Custom overlay info */}
            <div className="absolute bottom-4 left-4 bg-black/50 backdrop-blur-sm rounded px-3 py-1">
              <div className="flex items-center gap-2 text-white text-sm">
                <Eye className="w-4 h-4" />
                <span>AI Generated • {result.modelUsed}</span>
              </div>
            </div>
          </div>

          {/* Video Info */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div className="text-center p-3 bg-white/10 rounded">
              <div className="text-white/60">Duration</div>
              <div className="text-white font-medium">{result.duration || duration.toFixed(1)}s</div>
            </div>
            <div className="text-center p-3 bg-white/10 rounded">
              <div className="text-white/60">Model</div>
              <div className="text-white font-medium">{result.modelUsed}</div>
            </div>
            <div className="text-center p-3 bg-white/10 rounded">
              <div className="text-white/60">Created</div>
              <div className="text-white font-medium">
                {new Date(result.createdAt).toLocaleDateString()}
              </div>
            </div>
            <div className="text-center p-3 bg-white/10 rounded">
              <div className="text-white/60">Status</div>
              <div className={`font-medium capitalize ${getStatusColor(result.status)}`}>
                {result.status}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Thumbnail Preview (if video not ready) */}
      {result.thumbnailUrl && !result.videoUrl && (
        <div className="mb-6">
          <img
            src={result.thumbnailUrl}
            alt="Video thumbnail"
            className="w-full h-auto max-h-64 object-cover rounded-lg border border-white/20"
          />
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-3">
        {result.status === 'completed' && result.videoUrl && (
          <>
            <Button
              onClick={handleDownload}
              className="bg-green-500 hover:bg-green-600 text-white"
            >
              <Download className="w-4 h-4 mr-2" />
              Download
            </Button>
            <Button
              onClick={handleShare}
              variant="outline"
              className="bg-white/10 border-white/20 text-white hover:bg-white/20"
            >
              <Share className="w-4 h-4 mr-2" />
              Share
            </Button>
          </>
        )}

        {onGenerateAnother && (
          <Button
            onClick={onGenerateAnother}
            variant="outline"
            className="bg-white/10 border-white/20 text-white hover:bg-white/20"
          >
            Generate Another
          </Button>
        )}
      </div>

      {/* Error Details */}
      {result.status === 'failed' && result.error && (
        <Alert className="mt-4 bg-red-500/20 border-red-500/30">
          <AlertCircle className="h-4 w-4 text-red-400" />
          <AlertDescription className="text-red-400">
            <strong>Error Details:</strong> {result.error}
          </AlertDescription>
        </Alert>
      )}

      {/* Generation Info */}
      <div className="mt-6 pt-4 border-t border-white/20">
        <div className="text-sm text-white/60 space-y-1">
          <div>Generation ID: {result.id}</div>
          <div>Created: {new Date(result.createdAt).toLocaleString()}</div>
          {result.modelUsed && <div>Model: {result.modelUsed}</div>}
        </div>
      </div>
    </Card>
  );
}
