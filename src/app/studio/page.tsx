"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { 
  Video, 
  Image as ImageIcon, 
  Upload, 
  Wand2, 
  Settings, 
  Play,
  Download,
  Share2,
  ArrowLeft
} from "lucide-react";
import Link from "next/link";

export default function StudioPage() {
  const [selectedMode, setSelectedMode] = useState<'text-to-video' | 'image-to-video' | 'text-to-image'>('text-to-video');
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedContent, setGeneratedContent] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    
    setIsGenerating(true);
    
    // Simulate generation process
    setTimeout(() => {
      setGeneratedContent('generated-content-placeholder');
      setIsGenerating(false);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <div className="border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/projects">
                <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Projects
                </Button>
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-white">AI Studio</h1>
                <p className="text-gray-400 text-sm">Create amazing content with AI</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                <Settings className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Panel - Controls */}
          <div className="lg:col-span-1 space-y-6">
            {/* Mode Selection */}
            <Card className="bg-gray-900 border-gray-800 p-6">
              <h3 className="text-white font-semibold mb-4">Creation Mode</h3>
              <div className="space-y-3">
                <button
                  onClick={() => setSelectedMode('text-to-video')}
                  className={`w-full flex items-center space-x-3 p-3 rounded-lg transition-colors ${
                    selectedMode === 'text-to-video' 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                  }`}
                >
                  <Video className="w-5 h-5" />
                  <span>Text to Video</span>
                </button>
                
                <button
                  onClick={() => setSelectedMode('image-to-video')}
                  className={`w-full flex items-center space-x-3 p-3 rounded-lg transition-colors ${
                    selectedMode === 'image-to-video' 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                  }`}
                >
                  <ImageIcon className="w-5 h-5" />
                  <span>Image to Video</span>
                </button>
                
                <button
                  onClick={() => setSelectedMode('text-to-image')}
                  className={`w-full flex items-center space-x-3 p-3 rounded-lg transition-colors ${
                    selectedMode === 'text-to-image' 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                  }`}
                >
                  <ImageIcon className="w-5 h-5" />
                  <span>Text to Image</span>
                </button>
              </div>
            </Card>

            {/* Input Section */}
            <Card className="bg-gray-900 border-gray-800 p-6">
              <h3 className="text-white font-semibold mb-4">
                {selectedMode === 'text-to-video' && 'Video Prompt'}
                {selectedMode === 'image-to-video' && 'Upload Image'}
                {selectedMode === 'text-to-image' && 'Image Prompt'}
              </h3>
              
              {selectedMode === 'image-to-video' ? (
                <div className="space-y-4">
                  <div className="border-2 border-dashed border-gray-700 rounded-lg p-8 text-center hover:border-gray-600 transition-colors cursor-pointer">
                    <Upload className="w-8 h-8 text-gray-500 mx-auto mb-2" />
                    <p className="text-gray-400 text-sm">Click to upload an image</p>
                    <p className="text-gray-500 text-xs mt-1">PNG, JPG up to 10MB</p>
                  </div>
                  <Textarea
                    placeholder="Describe how you want the image to move... (optional)"
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    className="bg-gray-800 border-gray-700 text-white placeholder-gray-400 min-h-[100px] resize-none"
                  />
                </div>
              ) : (
                <Textarea
                  placeholder={
                    selectedMode === 'text-to-video' 
                      ? "Describe the video you want to create. Be as detailed as possible..."
                      : "Describe the image you want to create. Include style, colors, composition..."
                  }
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  className="bg-gray-800 border-gray-700 text-white placeholder-gray-400 min-h-[120px] resize-none"
                />
              )}
            </Card>

            {/* Advanced Settings */}
            <Card className="bg-gray-900 border-gray-800 p-6">
              <h3 className="text-white font-semibold mb-4">Settings</h3>
              <div className="space-y-4">
                <div>
                  <label className="text-gray-300 text-sm font-medium mb-2 block">
                    {selectedMode.includes('video') ? 'Duration' : 'Aspect Ratio'}
                  </label>
                  {selectedMode.includes('video') ? (
                    <select className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white">
                      <option>5 seconds</option>
                      <option>10 seconds</option>
                      <option>15 seconds</option>
                      <option>30 seconds</option>
                    </select>
                  ) : (
                    <select className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white">
                      <option>Square (1:1)</option>
                      <option>Portrait (3:4)</option>
                      <option>Landscape (4:3)</option>
                      <option>Widescreen (16:9)</option>
                    </select>
                  )}
                </div>
                
                <div>
                  <label className="text-gray-300 text-sm font-medium mb-2 block">Quality</label>
                  <select className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white">
                    <option>Standard</option>
                    <option>High</option>
                    <option>Ultra</option>
                  </select>
                </div>
              </div>
            </Card>

            {/* Generate Button */}
            <Button 
              onClick={handleGenerate}
              disabled={!prompt.trim() || isGenerating}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3 text-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isGenerating ? (
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Generating...</span>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <Wand2 className="w-5 h-5" />
                  <span>Generate</span>
                </div>
              )}
            </Button>
          </div>

          {/* Right Panel - Preview */}
          <div className="lg:col-span-2">
            <Card className="bg-gray-900 border-gray-800 h-full min-h-[600px]">
              {generatedContent ? (
                /* Generated Content */
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-white font-semibold">Generated Content</h3>
                    <div className="flex items-center space-x-2">
                      <Button size="sm" variant="ghost" className="text-gray-400 hover:text-white">
                        <Play className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="ghost" className="text-gray-400 hover:text-white">
                        <Download className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="ghost" className="text-gray-400 hover:text-white">
                        <Share2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  
                  <div className="aspect-video bg-gray-800 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                        {selectedMode.includes('video') ? (
                          <Video className="w-8 h-8 text-white" />
                        ) : (
                          <ImageIcon className="w-8 h-8 text-white" />
                        )}
                      </div>
                      <p className="text-white font-medium">
                        {selectedMode.includes('video') ? 'Video Generated!' : 'Image Generated!'}
                      </p>
                      <p className="text-gray-400 text-sm">Click to view full size</p>
                    </div>
                  </div>
                  
                  <div className="mt-4 p-4 bg-gray-800 rounded-lg">
                    <p className="text-gray-300 text-sm"><strong>Prompt:</strong> {prompt}</p>
                  </div>
                </div>
              ) : isGenerating ? (
                /* Generating State */
                <div className="flex items-center justify-center h-full">
                  <div className="text-center">
                    <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-white font-medium mb-2">Creating your content...</p>
                    <p className="text-gray-400 text-sm">This may take a few moments</p>
                  </div>
                </div>
              ) : (
                /* Empty State */
                <div className="flex items-center justify-center h-full">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Wand2 className="w-8 h-8 text-gray-500" />
                    </div>
                    <p className="text-gray-400 font-medium mb-2">Ready to create</p>
                    <p className="text-gray-500 text-sm">
                      {selectedMode === 'text-to-video' && 'Enter a prompt to generate your video'}
                      {selectedMode === 'image-to-video' && 'Upload an image to create a video'}
                      {selectedMode === 'text-to-image' && 'Enter a prompt to generate your image'}
                    </p>
                  </div>
                </div>
              )}
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}