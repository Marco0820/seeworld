"use client";

import { useState } from 'react';
import Image from 'next/image';
import NavBar from '@/components/NavBar';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { 
  Play, 
  Pause, 
  Download, 
  RefreshCw, 
  Maximize,
  Upload,
  Mail,
  Sparkles,
  Zap
} from 'lucide-react';

export default function GeneratePage() {
  const [activeMode, setActiveMode] = useState('Fast Mode');
  const [generationMode, setGenerationMode] = useState('Fast');
  const [inputMode, setInputMode] = useState('Text-to-Video');
  const [prompt, setPrompt] = useState('');
  const [selectedModel, setSelectedModel] = useState('Auto-select');

  const [emailNotification, setEmailNotification] = useState(false);
  const [credits, setCredits] = useState(150);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedVideo, setGeneratedVideo] = useState<string | null>(null);

  const modes = ['Fast Mode', 'Google VE03', 'Reframe', 'TikTok', 'Normal Mode', 'History'];
  
  const models = [
    { id: 'Auto-select', name: 'Auto-select', icon: '/icons/auto-select.svg', company: 'System' },
    { id: 'KLING 2.1', name: 'KLING 2.1', icon: '/icons/kling-real.svg', company: 'Kuaishou' },
    { id: 'KLING 2.1 Master', name: 'KLING 2.1 Master', icon: '/icons/kling-real.svg', company: 'Kuaishou' },
    { id: 'Hailuo-02', name: 'Hailuo-02', icon: '/icons/hailuo-real.svg', company: 'MiniMax' },
    { id: 'Seedance-1 Lite', name: 'Seedance-1 Lite', icon: '/icons/seedance-real.svg', company: 'Seedance' },
    { id: 'Seedance-1 Pro', name: 'Seedance-1 Pro', icon: '/icons/seedance-real.svg', company: 'Seedance' },
    { id: 'Pixverse 4.5', name: 'Pixverse 4.5', icon: '/icons/pixverse.svg', company: 'Pixverse' },
    { id: 'Google Veo 3 Fast (Plus)', name: 'Google Veo 3 Fast', icon: '/icons/google.svg', company: 'Google' },
    { id: 'Google Veo 3 (Plus)', name: 'Google Veo 3', icon: '/icons/google.svg', company: 'Google' }
  ];

  const plusModels = ['Google Veo 3 Fast (Plus)', 'Google Veo 3 (Plus)'];

  const calculateCreditCost = () => {
    let baseCost = generationMode === 'Fast' ? 250 : 500;
    
    // Premium model costs
    const premiumModels = ['Google Veo 3 Fast (Plus)', 'Google Veo 3 (Plus)', 'KLING 2.1 Master'];
    if (premiumModels.includes(selectedModel)) {
      if (selectedModel === 'Google Veo 3 Fast (Plus)') baseCost = 400;
      else if (selectedModel === 'Google Veo 3 (Plus)') baseCost = 800;
      else if (selectedModel === 'KLING 2.1 Master') baseCost = 600;
    }
    
    return baseCost;
  };

  const handleGenerate = async () => {
    const costCredits = calculateCreditCost();
    
    if (credits < costCredits) {
      window.location.href = '/credits';
      return;
    }

    setIsGenerating(true);
    
    // Simulate video generation
    setTimeout(() => {
      setGeneratedVideo('/videos/hero-background.mp4'); // Using existing video for demo
      setCredits(prev => prev - costCredits);
      setIsGenerating(false);
      
      if (emailNotification) {
        // Send email notification (mock)
        console.log('Email notification sent');
      }
    }, 3000);
  };

  const handleReset = () => {
    setPrompt('');
    setSelectedModel('Auto-select');
    setEmailNotification(false);
    setGeneratedVideo(null);
  };

  return (
    <div className="min-h-screen bg-white relative">
      <NavBar />
      <div className="pt-14">
      <div className="max-w-7xl mx-auto px-4 py-8">


        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Panel - Input Controls */}
          <div className="space-y-6">
            {/* Audio Notice */}
            <Card className="p-4 bg-gray-50 border-gray-200">
              <p className="text-gray-700 text-sm">
                Audio is still an experimental feature, so some generated videos may not include 
                sound. High-quality mode is more likely to generate videos with sound.
              </p>
            </Card>

            {/* Input Mode Toggle */}
            <div className="flex gap-2">
              <Button
                variant={inputMode === 'Text-to-Video' ? "default" : "outline"}
                onClick={() => setInputMode('Text-to-Video')}
                className={`flex-1 ${
                  inputMode === 'Text-to-Video'
                    ? 'bg-blue-500 text-white hover:bg-blue-600'
                    : 'bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200'
                }`}
              >
                Text-to-Video
              </Button>
              <Button
                variant={inputMode === 'Image-to-Video' ? "default" : "outline"}
                onClick={() => setInputMode('Image-to-Video')}
                className={`flex-1 ${
                  inputMode === 'Image-to-Video'
                    ? 'bg-blue-500 text-white hover:bg-blue-600'
                    : 'bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200'
                }`}
              >
                Image-to-Video
              </Button>
            </div>

            {/* Prompt Input */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label className="text-gray-900 font-medium">Prompt</Label>
                <span className="text-gray-600 text-sm">
                  Model: {models.find(m => m.id === selectedModel)?.name || selectedModel}
                </span>
              </div>
              <div className="relative">
                <Textarea
                  placeholder="Describe your video idea in detail..."
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  className="min-h-32 bg-white border-gray-300 text-gray-900 placeholder:text-gray-500 resize-none pr-56"
                  maxLength={2000}
                />
                {/* Model Selector in bottom right corner */}
                <div className="absolute bottom-3 right-3 group">
                  <div className="absolute -top-8 right-0 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    Click to select AI model
                  </div>
                  <Select value={selectedModel} onValueChange={setSelectedModel}>
                    <SelectTrigger className="w-52 bg-white border-gray-300 text-gray-900 text-sm font-medium hover:bg-gray-50 transition-all rounded-lg shadow-lg">
                      <div className="flex items-center gap-2">
                        <SelectValue placeholder="Select model..." />
                      </div>
                    </SelectTrigger>
                    <SelectContent 
                      className="bg-white border border-gray-200 shadow-lg z-[9999] w-[280px] rounded-lg"
                      position="popper"
                      sideOffset={4}
                    >
                      {models.map((model) => (
                        <SelectItem 
                          key={model.id} 
                          value={model.id}
                          disabled={plusModels.includes(model.id)}
                          className={`text-gray-900 hover:bg-gray-100 focus:bg-gray-100 py-3 px-4 cursor-pointer transition-colors ${
                            plusModels.includes(model.id) ? 'opacity-60' : ''
                          }`}
                        >
                          <div className="flex items-center gap-3 w-full">
                            <div className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100">
                              <Image 
                                src={model.icon} 
                                alt={`${model.company} logo`}
                                width={20} 
                                height={20}
                                className="rounded-full"
                              />
                            </div>
                            <div className="flex-1">
                              <div className="font-medium text-gray-900">{model.name}</div>
                              {model.id !== 'Auto-select' && (
                                <div className="text-xs text-gray-500">{model.company}</div>
                              )}
                            </div>
                            {plusModels.includes(model.id) && (
                              <Badge className="bg-green-500 text-white text-xs px-2 py-1">Plus</Badge>
                            )}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="flex justify-between items-center text-sm">
                <p className="text-gray-600">
                  Be detailed and specific about what you want to see in the video. Speech 
                  does better with slightly longer transcripts.
                </p>
                <span className="text-gray-500">{prompt.length} / 2000</span>
              </div>
            </div>

            {/* Generation Mode */}
            <div className="space-y-3">
              <Label className="text-gray-900 font-medium">Generation Mode</Label>
              <div className="flex gap-2">
                <Button
                  variant={generationMode === 'Fast' ? "default" : "outline"}
                  onClick={() => setGenerationMode('Fast')}
                  className={`flex-1 ${
                    generationMode === 'Fast'
                      ? 'bg-orange-500 text-white hover:bg-orange-400'
                      : 'bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200'
                  }`}
                >
                  <Zap className="w-4 h-4 mr-2" />
                  Fast
                </Button>
                <Button
                  variant={generationMode === 'Quality' ? "default" : "outline"}
                  onClick={() => setGenerationMode('Quality')}
                  className={`flex-1 ${
                    generationMode === 'Quality'
                      ? 'bg-blue-500 text-white hover:bg-blue-600'
                      : 'bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200'
                  }`}
                >
                  <Sparkles className="w-4 h-4 mr-2" />
                  Quality
                </Button>
              </div>
            </div>

            {/* Email Notification */}
            <Card className="p-4 bg-gray-50 border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-gray-900 font-medium">Email Notification</Label>
                  <p className="text-gray-600 text-sm">Get notified by email when your video generation is completed</p>
                </div>
                <Switch
                  checked={emailNotification}
                  onCheckedChange={setEmailNotification}
                  className="data-[state=checked]:bg-orange-500"
                />
              </div>
            </Card>



            {/* Bottom Controls */}
            <div className="flex items-center justify-between">
              <Button
                variant="outline"
                onClick={handleReset}
                className="bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Reset
              </Button>

              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Badge className="bg-orange-500 text-white">★ {credits}</Badge>
                  <span className="text-gray-600">-{calculateCreditCost()}</span>
                  <a href="/credits">
                    <Button size="sm" variant="outline" className="text-xs bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200">
                      +
                    </Button>
                  </a>
                </div>

                <Button
                  onClick={handleGenerate}
                  disabled={isGenerating || !prompt.trim()}
                  className="bg-orange-500 hover:bg-orange-400 text-white px-8"
                >
                  {isGenerating ? 'Generating...' : 'Generate Video'}
                </Button>
              </div>
            </div>
          </div>

          {/* Right Panel - Preview */}
          <div className="space-y-4">
            <Card className="bg-white border-gray-200">
              <div className="p-4 border-b border-gray-200">
                <h3 className="text-gray-900 font-medium">Preview</h3>
              </div>
              <div className="aspect-video bg-gray-100 relative flex items-center justify-center">
                {generatedVideo ? (
                  <video
                    src={generatedVideo}
                    controls
                    className="w-full h-full object-cover rounded-b-lg"
                  />
                ) : (
                  <div className="text-gray-500 text-center">
                    <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Play className="w-8 h-8" />
                    </div>
                    <p>Your generated video will appear here</p>
                  </div>
                )}
              </div>
            </Card>

            {/* Video Controls */}
            {generatedVideo && (
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  className="flex-1 bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download
                </Button>
                <Button
                  variant="outline"
                  className="flex-1 bg-blue-500 text-white border-blue-500 hover:bg-blue-600"
                >
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Reframe
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}