"use client";

import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import NavBar from '@/components/NavBar';

// Import all the components we created
import ImageUpload from '@/components/ImageUpload';
import PromptInput from '@/components/PromptInput';
import ResolutionSelector from '@/components/ResolutionSelector';
import DurationSettings from '@/components/DurationSettings';
import SeedSettings from '@/components/SeedSettings';
import ModeSelector from '@/components/ModeSelector';
import PromptStrengthControl from '@/components/PromptStrengthControl';
import GenerationInterface from '@/components/GenerationInterface';
import VideoPlayer from '@/components/VideoPlayer';
import ShareDownload from '@/components/ShareDownload';

import { 
  Wand2, 
  Image as ImageIcon, 
  Settings, 
  Play,
  Download,
  Share,
  Info,
  ChevronLeft,
  ChevronRight,
  Eye,
  EyeOff,
  Maximize2,
  Minimize2
} from 'lucide-react';

interface UploadedImage {
  id: string;
  file: File;
  preview: string;
  dimensions: { width: number; height: number };
  size: number;
  aspectRatio: string;
}

interface GenerationSettings {
  images: UploadedImage[];
  prompt: string;
  resolution: { width: number; height: number; aspectRatio: string } | null;
  duration: number;
  seed: number | null;
  mode: string;
  promptStrength: number;
}

export default function StudioPage() {
  // State for all settings
  const [settings, setSettings] = useState<GenerationSettings>({
    images: [],
    prompt: '',
    resolution: null,
    duration: 10,
    seed: null,
    mode: 'standard',
    promptStrength: 50
  });

  // UI State
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedVideo, setGeneratedVideo] = useState<string | null>(null);
  const [showPreview, setShowPreview] = useState(true);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [credits, setCredits] = useState(150);

  const totalSteps = 6;

  // Step configuration
  const steps = [
    { id: 1, name: 'Image Upload', icon: <ImageIcon className="w-4 h-4" />, required: true },
    { id: 2, name: 'Prompt Input', icon: <Wand2 className="w-4 h-4" />, required: true },
    { id: 3, name: 'Resolution', icon: <Settings className="w-4 h-4" />, required: false },
    { id: 4, name: 'Duration', icon: <Settings className="w-4 h-4" />, required: false },
    { id: 5, name: 'Advanced', icon: <Settings className="w-4 h-4" />, required: false },
    { id: 6, name: 'Generate', icon: <Play className="w-4 h-4" />, required: true }
  ];

  // Handle image upload
  const handleImagesChange = (images: UploadedImage[]) => {
    setSettings(prev => ({ ...prev, images }));
  };

  // Handle prompt change
  const handlePromptChange = (prompt: string) => {
    setSettings(prev => ({ ...prev, prompt }));
  };

  // Handle resolution change
  const handleResolutionChange = (resolution: { width: number; height: number; aspectRatio: string }) => {
    setSettings(prev => ({ ...prev, resolution }));
  };

  // Handle duration change
  const handleDurationChange = (duration: number) => {
    setSettings(prev => ({ ...prev, duration }));
  };

  // Handle seed change
  const handleSeedChange = (seed: number | null) => {
    setSettings(prev => ({ ...prev, seed }));
  };

  // Handle mode change
  const handleModeChange = (mode: string) => {
    setSettings(prev => ({ ...prev, mode }));
  };

  // Handle prompt strength change
  const handlePromptStrengthChange = (strength: number) => {
    setSettings(prev => ({ ...prev, promptStrength: strength }));
  };

  // Handle generation
  const handleStartGeneration = () => {
    setIsGenerating(true);
    setCurrentStep(6);
    
    // Simulate video generation
    setTimeout(() => {
      setGeneratedVideo('/videos/hero-background.mp4'); // Use existing demo video
      setIsGenerating(false);
      setCredits(prev => prev - 25); // Deduct credits
    }, 10000);
  };

  const handlePauseGeneration = () => {
    // Handle pause logic
  };

  const handleStopGeneration = () => {
    setIsGenerating(false);
    setGeneratedVideo(null);
  };

  const handleRetryGeneration = () => {
    handleStartGeneration();
  };

  // Handle screenshot
  const handleScreenshot = (screenshotUrl: string) => {
    console.log('Screenshot taken:', screenshotUrl);
    // Handle screenshot logic
  };

  // Handle share
  const handleShare = () => {
    console.log('Share video');
    // Handle share logic
  };

  // Handle download
  const handleDownload = (format?: string, quality?: string) => {
    console.log('Download video', format, quality);
    // Handle download logic
  };

  // Check if current step is valid
  const isStepValid = (stepId: number): boolean => {
    switch (stepId) {
      case 1:
        return settings.images.length > 0;
      case 2:
        return settings.prompt.trim().length > 0;
      case 3:
        return settings.resolution !== null;
      case 4:
        return settings.duration > 0;
      case 5:
        return true; // Advanced settings are optional
      case 6:
        return settings.images.length > 0 && settings.prompt.trim().length > 0;
      default:
        return false;
    }
  };

  // Navigate between steps
  const goToStep = (stepId: number) => {
    if (stepId <= totalSteps && stepId >= 1) {
      setCurrentStep(stepId);
    }
  };

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  // Calculate estimated cost
  const getEstimatedCost = (): number => {
    let baseCost = 25;
    
    // Mode multiplier
    const modeMultipliers = { fast: 0.8, standard: 1, professional: 1.5 };
    baseCost *= modeMultipliers[settings.mode as keyof typeof modeMultipliers] || 1;
    
    // Duration multiplier
    baseCost *= Math.max(1, settings.duration / 10);
    
    // Resolution multiplier
    if (settings.resolution) {
      const pixels = settings.resolution.width * settings.resolution.height;
      if (pixels > 1920 * 1080) baseCost *= 1.5;
      if (pixels > 2560 * 1440) baseCost *= 2;
    }
    
    return Math.ceil(baseCost);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900">
      <NavBar />
      
      <div className="pt-16">
        <div className="max-w-7xl mx-auto px-4 py-6">
          {/* Header */}
          <div className="mb-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-white">
                  Video Generation Studio
                </h1>
                <p className="text-blue-100 mt-1">
                  Transform your images into amazing AI-generated videos
                </p>
              </div>
              
              <div className="flex items-center gap-4">
                <Badge variant="secondary" className="bg-orange-500 text-white shadow-lg">
                  {credits} Credits
                </Badge>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowPreview(!showPreview)}
                  className="text-white border-blue-300 hover:bg-blue-800/50 backdrop-blur-sm"
                >
                  {showPreview ? <EyeOff className="w-4 h-4 mr-1" /> : <Eye className="w-4 h-4 mr-1" />}
                  {showPreview ? 'Hide Preview' : 'Show Preview'}
                </Button>
              </div>
            </div>
          </div>

          {/* Progress Steps */}
          <Card className="p-4 mb-6 bg-white/10 backdrop-blur-md border-white/20 shadow-xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                {steps.map((step, index) => (
                  <div key={step.id} className="flex items-center">
                    <button
                      onClick={() => goToStep(step.id)}
                      className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
                        currentStep === step.id
                          ? 'bg-blue-400 text-white shadow-lg'
                          : isStepValid(step.id)
                          ? 'bg-green-500/80 text-white hover:bg-green-500 backdrop-blur-sm'
                          : 'bg-white/20 text-white hover:bg-white/30 backdrop-blur-sm'
                      }`}
                    >
                      {step.icon}
                      <span className="text-sm font-medium">{step.name}</span>
                      {step.required && (
                        <span className="text-xs opacity-75">*</span>
                      )}
                    </button>
                    
                    {index < steps.length - 1 && (
                      <ChevronRight className="w-4 h-4 text-gray-400 mx-2" />
                    )}
                  </div>
                ))}
              </div>
              
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={prevStep}
                  disabled={currentStep === 1}
                  className="text-white border-blue-300 hover:bg-blue-800/50 backdrop-blur-sm disabled:opacity-50"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Previous
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={nextStep}
                  disabled={currentStep === totalSteps}
                  className="text-white border-blue-300 hover:bg-blue-800/50 backdrop-blur-sm disabled:opacity-50"
                >
                  Next
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Content Area */}
            <div className={`${showPreview ? 'lg:col-span-2' : 'lg:col-span-3'} space-y-6`}>
              
              {/* Step 1: Image Upload */}
              {currentStep === 1 && (
                <Card className="p-6 bg-white/10 backdrop-blur-md border-white/20 shadow-xl">
                  <div className="mb-4">
                    <h2 className="text-xl font-semibold text-white mb-2">
                      Upload Images
                    </h2>
                    <p className="text-blue-100">
                      Upload one or more images as the foundation for video generation
                    </p>
                  </div>
                  
                  <ImageUpload
                    onImagesChange={handleImagesChange}
                    maxFiles={5}
                    maxSizePerFile={10}
                    minDimensions={{ width: 300, height: 300 }}
                  />
                  
                  {settings.images.length > 0 && (
                    <div className="mt-6 flex justify-end">
                      <Button
                        onClick={nextStep}
                        className="bg-blue-500 hover:bg-blue-600 text-white"
                      >
                        Next: Enter Prompt
                        <ChevronRight className="w-4 h-4 ml-2" />
                      </Button>
                    </div>
                  )}
                </Card>
              )}

              {/* Step 2: Prompt Input */}
              {currentStep === 2 && (
                <Card className="p-6 bg-white/10 backdrop-blur-md border-white/20 shadow-xl">
                  <div className="mb-4">
                    <h2 className="text-xl font-semibold text-white mb-2">
                      Describe Your Video
                    </h2>
                    <p className="text-blue-100">
                      Provide a detailed description of the video content you want to generate
                    </p>
                  </div>
                  
                  <PromptInput
                    value={settings.prompt}
                    onChange={handlePromptChange}
                    showExamples={true}
                    showSuggestions={true}
                  />
                  
                  {settings.prompt.trim() && (
                    <div className="mt-6 flex justify-between">
                      <Button
                        variant="outline"
                        onClick={prevStep}
                      >
                        <ChevronLeft className="w-4 h-4 mr-2" />
                        Previous
                      </Button>
                      <Button
                        onClick={nextStep}
                        className="bg-blue-500 hover:bg-blue-600 text-white"
                      >
                        Next: Set Resolution
                        <ChevronRight className="w-4 h-4 ml-2" />
                      </Button>
                    </div>
                  )}
                </Card>
              )}

              {/* Step 3: Resolution Settings */}
              {currentStep === 3 && (
                <Card className="p-6 bg-white/10 backdrop-blur-md border-white/20 shadow-xl">
                  <div className="mb-4">
                    <h2 className="text-xl font-semibold text-white mb-2">
                      Select Resolution
                    </h2>
                    <p className="text-blue-100">
                      Choose the output resolution and aspect ratio for your video
                    </p>
                  </div>
                  
                  <ResolutionSelector
                    value={settings.resolution}
                    onChange={handleResolutionChange}
                    showPreview={true}
                  />
                  
                  <div className="mt-6 flex justify-between">
                    <Button
                      variant="outline"
                      onClick={prevStep}
                    >
                      <ChevronLeft className="w-4 h-4 mr-2" />
                      Previous
                    </Button>
                    <Button
                      onClick={nextStep}
                      className="bg-blue-500 hover:bg-blue-600 text-white"
                    >
                      Next: Set Duration
                      <ChevronRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </Card>
              )}

              {/* Step 4: Duration Settings */}
              {currentStep === 4 && (
                <Card className="p-6 bg-white/10 backdrop-blur-md border-white/20 shadow-xl">
                  <div className="mb-4">
                    <h2 className="text-xl font-semibold text-white mb-2">
                      Set Video Duration
                    </h2>
                    <p className="text-blue-100">
                      Choose the duration for your generated video
                    </p>
                  </div>
                  
                  <DurationSettings
                    value={settings.duration}
                    onChange={handleDurationChange}
                    imageCount={settings.images.length}
                    promptComplexity={settings.prompt.length > 100 ? 'complex' : settings.prompt.length > 50 ? 'moderate' : 'simple'}
                    generationMode={settings.mode as 'fast' | 'standard' | 'professional'}
                  />
                  
                  <div className="mt-6 flex justify-between">
                    <Button
                      variant="outline"
                      onClick={prevStep}
                    >
                      <ChevronLeft className="w-4 h-4 mr-2" />
                      Previous
                    </Button>
                    <Button
                      onClick={nextStep}
                      className="bg-blue-500 hover:bg-blue-600 text-white"
                    >
                      Next: Advanced Settings
                      <ChevronRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </Card>
              )}

              {/* Step 5: Advanced Settings */}
              {currentStep === 5 && (
                <div className="space-y-6">
                  {/* Generation Mode */}
                  <Card className="p-6 bg-white/10 backdrop-blur-md border-white/20 shadow-xl">
                    <div className="mb-4">
                      <h2 className="text-xl font-semibold text-white mb-2">
                        Generation Mode
                      </h2>
                      <p className="text-blue-100">
                        Choose the balance between generation quality and speed
                      </p>
                    </div>
                    
                    <ModeSelector
                      value={settings.mode}
                      onChange={handleModeChange}
                      showPreview={true}
                      showComparison={true}
                    />
                  </Card>

                  {/* Prompt Strength */}
                  <Card className="p-6 bg-white/10 backdrop-blur-md border-white/20 shadow-xl">
                    <div className="mb-4">
                      <h2 className="text-xl font-semibold text-white mb-2">
                        Prompt Strength
                      </h2>
                      <p className="text-blue-100">
                        Control how closely the AI follows your prompt
                      </p>
                    </div>
                    
                    <PromptStrengthControl
                      value={settings.promptStrength}
                      onChange={handlePromptStrengthChange}
                      currentPrompt={settings.prompt}
                      showVisualization={true}
                      showRealTimeFeedback={true}
                    />
                  </Card>

                  {/* Seed Settings */}
                  <Card className="p-6 bg-white/10 backdrop-blur-md border-white/20 shadow-xl">
                    <div className="mb-4">
                      <h2 className="text-xl font-semibold text-white mb-2">
                        Seed Settings
                      </h2>
                      <p className="text-blue-100">
                        Control the randomness of generation results
                      </p>
                    </div>
                    
                    <SeedSettings
                      value={settings.seed}
                      onChange={handleSeedChange}
                      currentPrompt={settings.prompt}
                    />
                  </Card>

                  <div className="flex justify-between">
                    <Button
                      variant="outline"
                      onClick={prevStep}
                    >
                      <ChevronLeft className="w-4 h-4 mr-2" />
                      Previous
                    </Button>
                    <Button
                      onClick={nextStep}
                      className="bg-blue-500 hover:bg-blue-600 text-white"
                    >
                      Start Video Generation
                      <ChevronRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </div>
              )}

              {/* Step 6: Generation */}
              {currentStep === 6 && (
                <div className="space-y-6">
                  {/* Cost Estimation */}
                  <Alert className="bg-blue-50 border-blue-200">
                    <Info className="h-4 w-4 text-blue-600" />
                    <AlertDescription className="text-blue-800">
                      <strong>Generation Cost Estimate:</strong> {getEstimatedCost()} Credits • 
                      Estimated Time: {settings.mode === 'fast' ? '1-2 minutes' : settings.mode === 'professional' ? '5-10 minutes' : '2-5 minutes'}
                    </AlertDescription>
                  </Alert>

                  <GenerationInterface
                    isGenerating={isGenerating}
                    onStart={handleStartGeneration}
                    onPause={handlePauseGeneration}
                    onStop={handleStopGeneration}
                    onRetry={handleRetryGeneration}
                    initialCredits={credits}
                  />

                  {/* Generated Video */}
                  {generatedVideo && (
                    <div className="space-y-6">
                      <VideoPlayer
                        videoUrl={generatedVideo}
                        title="AI Generated Video"
                        duration={settings.duration}
                        onScreenshot={handleScreenshot}
                        onShare={handleShare}
                        onDownload={handleDownload}
                      />

                      <ShareDownload
                        videoUrl={generatedVideo}
                        videoTitle="AI Generated Video"
                        videoDuration={settings.duration}
                        onDownload={handleDownload}
                        onShare={handleShare}
                      />
                    </div>
                  )}

                  <div className="flex justify-start">
                    <Button
                      variant="outline"
                      onClick={prevStep}
                      disabled={isGenerating}
                    >
                      <ChevronLeft className="w-4 h-4 mr-2" />
                      Back to Settings
                    </Button>
                  </div>
                </div>
              )}
            </div>

            {/* Preview Panel */}
            {showPreview && (
              <div className="lg:col-span-1">
                <Card className="p-6 sticky top-6 bg-white/10 backdrop-blur-md border-white/20 shadow-xl">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-white">
                        Settings Preview
                      </h3>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setIsCollapsed(!isCollapsed)}
                      >
                        {isCollapsed ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
                      </Button>
                    </div>

                    {!isCollapsed && (
                      <div className="space-y-4 text-sm">
                        {/* Images Preview */}
                        <div>
                          <h4 className="font-medium text-white mb-2">
                            Uploaded Images ({settings.images.length})
                          </h4>
                          {settings.images.length > 0 ? (
                            <div className="grid grid-cols-2 gap-2">
                              {settings.images.slice(0, 4).map((image) => (
                                <img
                                  key={image.id}
                                  src={image.preview}
                                  alt="Preview"
                                  className="w-full h-16 object-cover rounded"
                                />
                              ))}
                            </div>
                          ) : (
                            <p className="text-blue-200 text-xs">No images uploaded</p>
                          )}
                        </div>

                        {/* Prompt Preview */}
                        <div>
                          <h4 className="font-medium text-white mb-2">
                            Prompt
                          </h4>
                          <p className="text-blue-100 text-xs line-clamp-3">
                            {settings.prompt || 'No prompt entered'}
                          </p>
                        </div>

                        {/* Settings Summary */}
                        <div className="space-y-2 pt-2 border-t border-gray-200">
                          <div className="flex justify-between">
                            <span className="text-blue-200">Resolution:</span>
                            <span className="text-white">
                              {settings.resolution 
                                ? `${settings.resolution.width}×${settings.resolution.height}` 
                                : 'Not set'
                              }
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-blue-200">Duration:</span>
                            <span className="text-white">{settings.duration}s</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-blue-200">Mode:</span>
                            <span className="text-white">
                              {settings.mode === 'fast' ? 'Fast' : 
                               settings.mode === 'professional' ? 'Professional' : 'Standard'}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-blue-200">Prompt Strength:</span>
                            <span className="text-white">{settings.promptStrength}%</span>
                          </div>
                          {settings.seed && (
                            <div className="flex justify-between">
                              <span className="text-blue-200">Seed:</span>
                              <span className="text-gray-900 dark:text-white font-mono text-xs">
                                {settings.seed}
                              </span>
                            </div>
                          )}
                        </div>

                        {/* Cost Estimation */}
                        <div className="pt-2 border-t border-gray-200">
                          <div className="flex justify-between items-center">
                            <span className="text-blue-200">Estimated Cost:</span>
                            <Badge variant="secondary" className="bg-orange-100 text-orange-800">
                              {getEstimatedCost()} Credits
                            </Badge>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </Card>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
