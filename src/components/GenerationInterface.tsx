"use client";

import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Play, 
  Pause, 
  Square,
  RefreshCw,
  Zap,
  Clock,
  CheckCircle,
  AlertCircle,
  XCircle,
  Eye,
  Settings,
  TrendingUp,
  Cpu,
  HardDrive,
  Wifi,
  Battery
} from 'lucide-react';

interface GenerationStep {
  id: string;
  name: string;
  description: string;
  status: 'pending' | 'processing' | 'completed' | 'error';
  progress: number;
  estimatedTime?: number;
  actualTime?: number;
  icon: React.ReactNode;
}

interface GenerationStats {
  totalSteps: number;
  completedSteps: number;
  currentStep: string;
  overallProgress: number;
  estimatedTimeRemaining: number;
  startTime: Date;
  credits: number;
}

interface GenerationInterfaceProps {
  isGenerating: boolean;
  onStart: () => void;
  onPause: () => void;
  onStop: () => void;
  onRetry: () => void;
  generationId?: string;
  initialCredits?: number;
  className?: string;
}

export default function GenerationInterface({
  isGenerating,
  onStart,
  onPause,
  onStop,
  onRetry,
  generationId,
  initialCredits = 100,
  className = ""
}: GenerationInterfaceProps) {
  const [steps, setSteps] = useState<GenerationStep[]>([]);
  const [stats, setStats] = useState<GenerationStats>({
    totalSteps: 0,
    completedSteps: 0,
    currentStep: '',
    overallProgress: 0,
    estimatedTimeRemaining: 0,
    startTime: new Date(),
    credits: initialCredits
  });
  const [isPaused, setIsPaused] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [logs, setLogs] = useState<string[]>([]);
  const [showDetails, setShowDetails] = useState(false);
  const [systemStatus, setSystemStatus] = useState({
    cpu: 45,
    memory: 62,
    gpu: 78,
    network: 'stable'
  });

  // Initialize generation steps
  useEffect(() => {
    const initialSteps: GenerationStep[] = [
      {
        id: 'preprocessing',
        name: 'Image Preprocessing',
        description: 'Analyze and optimize uploaded images',
        status: 'pending',
        progress: 0,
        estimatedTime: 15,
        icon: <Settings className="w-4 h-4" />
      },
      {
        id: 'prompt_analysis',
        name: 'Prompt Analysis',
        description: 'Understand and parse user prompts',
        status: 'pending',
        progress: 0,
        estimatedTime: 10,
        icon: <Eye className="w-4 h-4" />
      },
      {
        id: 'model_loading',
        name: 'Model Loading',
        description: 'Loading AI generation model',
        status: 'pending',
        progress: 0,
        estimatedTime: 20,
        icon: <Cpu className="w-4 h-4" />
      },
      {
        id: 'generation',
        name: 'Video Generation',
        description: 'AI is generating video content',
        status: 'pending',
        progress: 0,
        estimatedTime: 120,
        icon: <Zap className="w-4 h-4" />
      },
      {
        id: 'postprocessing',
        name: 'Post Processing',
        description: 'Optimizing and rendering final video',
        status: 'pending',
        progress: 0,
        estimatedTime: 30,
        icon: <TrendingUp className="w-4 h-4" />
      },
      {
        id: 'finalization',
        name: 'Completion',
        description: 'Saving and preparing video file',
        status: 'pending',
        progress: 0,
        estimatedTime: 15,
        icon: <CheckCircle className="w-4 h-4" />
      }
    ];

    setSteps(initialSteps);
    setStats(prev => ({
      ...prev,
      totalSteps: initialSteps.length
    }));
  }, []);

  // Simulate generation process
  useEffect(() => {
    if (!isGenerating || isPaused) return;

    const interval = setInterval(() => {
      setSteps(prevSteps => {
        const newSteps = [...prevSteps];
        let currentStepIndex = newSteps.findIndex(step => 
          step.status === 'processing' || (step.status === 'pending' && step.progress === 0)
        );

        if (currentStepIndex === -1) {
          currentStepIndex = newSteps.findIndex(step => step.status === 'pending');
        }

        if (currentStepIndex !== -1) {
          const currentStep = newSteps[currentStepIndex];
          
          if (currentStep.status === 'pending') {
            currentStep.status = 'processing';
            setLogs(prev => [...prev, `Starting ${currentStep.name}...`]);
          }

          // 更新进度
          currentStep.progress = Math.min(100, currentStep.progress + Math.random() * 5);

          if (currentStep.progress >= 100) {
            currentStep.status = 'completed';
            currentStep.actualTime = currentStep.estimatedTime;
            setLogs(prev => [...prev, `${currentStep.name} completed`]);
          }

          // 更新总体统计
          const completedSteps = newSteps.filter(step => step.status === 'completed').length;
          const overallProgress = (completedSteps / newSteps.length) * 100;
          
          setStats(prev => ({
            ...prev,
            completedSteps,
            currentStep: currentStep.name,
            overallProgress,
            estimatedTimeRemaining: Math.max(0, prev.estimatedTimeRemaining - 1)
          }));
        }

        return newSteps;
      });

      // 更新系统状态
      setSystemStatus(prev => ({
        cpu: Math.max(30, Math.min(90, prev.cpu + (Math.random() - 0.5) * 10)),
        memory: Math.max(40, Math.min(85, prev.memory + (Math.random() - 0.5) * 8)),
        gpu: Math.max(50, Math.min(95, prev.gpu + (Math.random() - 0.5) * 12)),
        network: Math.random() > 0.95 ? 'unstable' : 'stable'
      }));
    }, 1000);

    return () => clearInterval(interval);
  }, [isGenerating, isPaused]);

  // 处理暂停
  const handlePause = () => {
    setIsPaused(!isPaused);
    onPause();
    setLogs(prev => [...prev, isPaused ? 'Resuming generation...' : 'Pausing generation...']);
  };

  // 处理停止
  const handleStop = () => {
    setIsPaused(false);
    onStop();
    setLogs(prev => [...prev, 'Stopping generation']);
    
    // 重置步骤状态
    setSteps(prev => prev.map(step => ({
      ...step,
      status: 'pending',
      progress: 0,
      actualTime: undefined
    })));
  };

  // 处理重试
  const handleRetry = () => {
    setError(null);
    setLogs(prev => [...prev, 'Restarting generation...']);
    handleStop();
    setTimeout(() => onRetry(), 1000);
  };

  // 获取状态颜色
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-green-600';
      case 'processing': return 'text-blue-600';
      case 'error': return 'text-red-600';
      default: return 'text-gray-400';
    }
  };

  // 获取状态图标
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'processing': return <RefreshCw className="w-4 h-4 text-blue-600 animate-spin" />;
      case 'error': return <XCircle className="w-4 h-4 text-red-600" />;
      default: return <Clock className="w-4 h-4 text-gray-400" />;
    }
  };

  // 计算剩余时间
  const getRemainingTime = (): string => {
    const remaining = stats.estimatedTimeRemaining;
    if (remaining <= 0) return 'Almost complete';
    
    const minutes = Math.floor(remaining / 60);
    const seconds = remaining % 60;
    
    if (minutes > 0) {
      return `${minutes}m ${seconds}s`;
    }
    return `${seconds}s`;
  };

  return (
    <div className={`space-y-6 ${className}`}>
      {/* 主控制面板 */}
      <Card className="p-6">
        <div className="space-y-4">
          {/* 标题和状态 */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-full ${
                isGenerating ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'
              }`}>
                <Zap className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Video Generation
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {isGenerating 
                    ? isPaused 
                      ? 'Paused' 
                      : `Generating... (${stats.currentStep})`
                    : 'Ready to start generation'
                  }
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {generationId && (
                <Badge variant="outline" className="text-xs font-mono">
                  ID: {generationId.slice(0, 8)}
                </Badge>
              )}
              <Badge variant="secondary" className="bg-orange-100 text-orange-800">
                {stats.credits} Credits
              </Badge>
            </div>
          </div>

          {/* 总体进度 */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Overall Progress
              </span>
              <span className="text-sm text-gray-600 dark:text-gray-400">
                {Math.round(stats.overallProgress)}% • {stats.completedSteps}/{stats.totalSteps} steps
              </span>
            </div>
            <Progress value={stats.overallProgress} className="w-full h-2" />
            {isGenerating && (
              <div className="flex justify-between text-xs text-gray-500">
                <span>Estimated remaining: {getRemainingTime()}</span>
                <span>Elapsed: {Math.floor((Date.now() - stats.startTime.getTime()) / 1000)}s</span>
              </div>
            )}
          </div>

          {/* 控制按钮 */}
          <div className="flex gap-3">
            {!isGenerating ? (
              <Button
                onClick={onStart}
                className="bg-blue-500 hover:bg-blue-600 text-white"
                disabled={stats.credits <= 0}
              >
                <Play className="w-4 h-4 mr-2" />
                Start Generation
              </Button>
            ) : (
              <>
                <Button
                  onClick={handlePause}
                  variant="outline"
                  className="border-orange-300 text-orange-600 hover:bg-orange-50"
                >
                  {isPaused ? <Play className="w-4 h-4 mr-2" /> : <Pause className="w-4 h-4 mr-2" />}
                  {isPaused ? 'Resume' : 'Pause'}
                </Button>
                <Button
                  onClick={handleStop}
                  variant="outline"
                  className="border-red-300 text-red-600 hover:bg-red-50"
                >
                  <Square className="w-4 h-4 mr-2" />
                  Stop
                </Button>
              </>
            )}
            
            {error && (
              <Button
                onClick={handleRetry}
                variant="outline"
                className="border-blue-300 text-blue-600 hover:bg-blue-50"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Retry
              </Button>
            )}
            
            <Button
              onClick={() => setShowDetails(!showDetails)}
              variant="ghost"
              size="sm"
              className="text-gray-600 hover:text-gray-800"
            >
              <Settings className="w-4 h-4 mr-1" />
              {showDetails ? 'Hide Details' : 'Show Details'}
            </Button>
          </div>
        </div>
      </Card>

      {/* 错误提示 */}
      {error && (
        <Alert className="bg-red-50 border-red-200">
          <AlertCircle className="h-4 w-4 text-red-600" />
          <AlertDescription className="text-red-800">
            <strong>Generation Failed:</strong> {error}
          </AlertDescription>
        </Alert>
      )}

      {/* 生成步骤详情 */}
      <Card className="p-6">
        <div className="space-y-4">
          <h4 className="font-medium text-gray-900 dark:text-white">Generation Steps</h4>
          
          <div className="space-y-3">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center gap-4 p-3 rounded-lg bg-gray-50 dark:bg-gray-800">
                <div className="flex items-center gap-3 flex-1">
                  <div className={`${getStatusColor(step.status)}`}>
                    {getStatusIcon(step.status)}
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h5 className="font-medium text-gray-900 dark:text-white">
                        {index + 1}. {step.name}
                      </h5>
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        {step.status === 'processing' ? `${Math.round(step.progress)}%` : 
                         step.status === 'completed' ? 'Completed' : 'Waiting'}
                      </span>
                    </div>
                    
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                      {step.description}
                    </p>
                    
                    {step.status === 'processing' && (
                      <Progress value={step.progress} className="w-full h-1" />
                    )}
                  </div>
                  
                  <div className="text-right text-xs text-gray-500">
                    {step.actualTime ? `${step.actualTime}s` : 
                     step.estimatedTime ? `~${step.estimatedTime}s` : ''}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Card>

      {/* 详细信息面板 */}
      {showDetails && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* 系统状态 */}
          <Card className="p-4">
            <div className="space-y-4">
              <h4 className="font-medium text-gray-900 dark:text-white flex items-center gap-2">
                <Cpu className="w-4 h-4" />
                System Status
              </h4>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">CPU Usage</span>
                  <span className="text-sm font-medium">{systemStatus.cpu}%</span>
                </div>
                <Progress value={systemStatus.cpu} className="w-full h-2" />
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Memory Usage</span>
                  <span className="text-sm font-medium">{systemStatus.memory}%</span>
                </div>
                <Progress value={systemStatus.memory} className="w-full h-2" />
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">GPU Usage</span>
                  <span className="text-sm font-medium">{systemStatus.gpu}%</span>
                </div>
                <Progress value={systemStatus.gpu} className="w-full h-2" />
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Network Status</span>
                  <Badge variant={systemStatus.network === 'stable' ? 'secondary' : 'destructive'} className="text-xs">
                    <Wifi className="w-3 h-3 mr-1" />
                    {systemStatus.network === 'stable' ? 'Stable' : 'Unstable'}
                  </Badge>
                </div>
              </div>
            </div>
          </Card>

          {/* 生成日志 */}
          <Card className="p-4">
            <div className="space-y-4">
              <h4 className="font-medium text-gray-900 dark:text-white">Generation Log</h4>
              
              <div className="bg-gray-900 text-green-400 p-3 rounded-lg font-mono text-xs max-h-48 overflow-y-auto">
                {logs.length === 0 ? (
                  <div className="text-gray-500">Waiting to start generation...</div>
                ) : (
                  logs.map((log, index) => (
                    <div key={index} className="mb-1">
                      <span className="text-gray-500">
                        [{new Date().toLocaleTimeString()}]
                      </span> {log}
                    </div>
                  ))
                )}
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* 积分不足警告 */}
      {stats.credits <= 0 && (
        <Alert className="bg-yellow-50 border-yellow-200">
          <AlertCircle className="h-4 w-4 text-yellow-600" />
          <AlertDescription className="text-yellow-800">
            <strong>Insufficient Credits:</strong> You need more credits to start video generation.
            <Button size="sm" className="ml-2 bg-yellow-600 hover:bg-yellow-700 text-white">
              Buy Credits
            </Button>
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
}
