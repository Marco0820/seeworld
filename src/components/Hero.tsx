"use client";

import { useState } from "react";
import { Play, ArrowRight, Sparkles, Video, Image as ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Hero() {
  const [selectedTab, setSelectedTab] = useState<'video' | 'image'>('video');

  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* Video Background */}
      <div className="video-container absolute inset-0 z-0">
        <video 
          className="video-background"
          autoPlay 
          muted 
          loop 
          playsInline
        >
          <source src="/videos/hero-background.mp4" type="video/mp4" />
        </video>
        {/* Video Overlay */}
        <div className="video-overlay absolute inset-0 bg-black/40 z-10"></div>
      </div>
      
      <div className="relative z-20 max-w-7xl mx-auto px-6 pt-24 pb-20">
        <div className="text-center space-y-8">
          {/* Main Headline */}
          <div className="space-y-6">
            <div className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium">
              <Sparkles className="w-4 h-4" />
              <span>全球首个完全免费的AI视频生成平台 | World's First Free AI Video Platform</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight video-text-shadow">
              <span className="bg-gradient-to-r from-blue-300 via-purple-300 to-pink-300 bg-clip-text text-transparent">
                免费AI视频生成
              </span>
              <br />
              <span className="text-white">
                Free AI Video Creation
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-100 max-w-4xl mx-auto leading-relaxed video-text-shadow">
              全球首个完全免费的AI视频生成平台，集成Kling AI、Runway、Hailuo AI等顶级模型。
              无需付费即可体验专业级AI视频创作，让创意瞬间成真！
            </p>
          </div>

          {/* Tab Navigation */}
          <div className="flex justify-center">
            <div className="bg-white/10 backdrop-blur-md rounded-full p-1 shadow-lg border border-white/20">
              <div className="flex space-x-1">
                <button
                  onClick={() => setSelectedTab('video')}
                  className={`flex items-center space-x-2 px-6 py-3 rounded-full transition-all duration-200 ${
                    selectedTab === 'video'
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'text-white/80 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <Video className="w-4 h-4" />
                  <span className="font-medium">Create Video</span>
                </button>
                <button
                  onClick={() => setSelectedTab('image')}
                  className={`flex items-center space-x-2 px-6 py-3 rounded-full transition-all duration-200 ${
                    selectedTab === 'image'
                      ? 'bg-purple-600 text-white shadow-md'
                      : 'text-white/80 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <ImageIcon className="w-4 h-4" />
                  <span className="font-medium">Create Image</span>
                </button>
              </div>
            </div>
          </div>

          {/* Feature Content */}
          <div className="max-w-5xl mx-auto">
            {selectedTab === 'video' && (
              <div className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                  <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 shadow-lg border border-white/20 hover:bg-white/20 transition-all duration-300">
                    <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center mb-4">
                      <span className="text-2xl">📝</span>
                    </div>
                    <h3 className="font-semibold text-white mb-2">Text to Video</h3>
                    <p className="text-sm text-gray-200">Enter text description, AI generates stunning videos</p>
                  </div>
                  
                  <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 shadow-lg border border-white/20 hover:bg-white/20 transition-all duration-300">
                    <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center mb-4">
                      <span className="text-2xl">🖼️</span>
                    </div>
                    <h3 className="font-semibold text-white mb-2">Image to Video</h3>
                    <p className="text-sm text-gray-200">Transform static images into dynamic videos</p>
                  </div>
                  
                  <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 shadow-lg border border-white/20 hover:bg-white/20 transition-all duration-300">
                    <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center mb-4">
                      <span className="text-2xl">👤</span>
                    </div>
                    <h3 className="font-semibold text-white mb-2">Consistent Character</h3>
                    <p className="text-sm text-gray-200">Maintain character consistency in video generation</p>
                  </div>
                  
                  <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 shadow-lg border border-white/20 hover:bg-white/20 transition-all duration-300">
                    <div className="w-12 h-12 bg-yellow-500/20 rounded-lg flex items-center justify-center mb-4">
                      <span className="text-2xl">🎬</span>
                    </div>
                    <h3 className="font-semibold text-white mb-2">Video to Video</h3>
                    <p className="text-sm text-gray-200">Video style transformation and editing</p>
                  </div>
                  
                  <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 shadow-lg border border-white/20 hover:bg-white/20 transition-all duration-300">
                    <div className="w-12 h-12 bg-pink-500/20 rounded-lg flex items-center justify-center mb-4">
                      <span className="text-2xl">✨</span>
                    </div>
                    <h3 className="font-semibold text-white mb-2">AI Animation</h3>
                    <p className="text-sm text-gray-200">Professional animation effects generation</p>
                  </div>
                </div>
              </div>
            )}

            {selectedTab === 'image' && (
              <div className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
                  <div className="bg-white/10 backdrop-blur-md rounded-xl p-8 shadow-lg border border-white/20 hover:bg-white/20 transition-all duration-300">
                    <div className="w-16 h-16 bg-purple-500/20 rounded-lg flex items-center justify-center mb-6">
                      <span className="text-3xl">📝</span>
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-3">Text to Image</h3>
                    <p className="text-gray-200">Generate high-quality images through text descriptions</p>
                  </div>
                  
                  <div className="bg-white/10 backdrop-blur-md rounded-xl p-8 shadow-lg border border-white/20 hover:bg-white/20 transition-all duration-300">
                    <div className="w-16 h-16 bg-blue-500/20 rounded-lg flex items-center justify-center mb-6">
                      <span className="text-3xl">🎨</span>
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-3">Image to Image</h3>
                    <p className="text-gray-200">Generate new creative works based on existing images</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              size="lg"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              Start Creating for Free
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            
            <Button 
              variant="outline"
              size="lg"
              className="border-2 border-gray-300 hover:border-blue-600 text-gray-700 hover:text-blue-600 px-8 py-4 text-lg font-semibold rounded-xl transition-all duration-300 transform hover:scale-105"
            >
              <Play className="mr-2 w-5 h-5" />
              Watch Demo
            </Button>
          </div>

          {/* AI Models Showcase */}
          <div className="mt-16">
            <p className="text-sm text-gray-300 mb-6">Integrated Leading AI Models</p>
            <div className="flex flex-wrap justify-center items-center gap-8 opacity-80">
              <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg shadow-sm border border-white/20">
                <span className="text-sm font-medium text-white">Kling AI</span>
              </div>
              <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg shadow-sm border border-white/20">
                <span className="text-sm font-medium text-white">Runway</span>
              </div>
              <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg shadow-sm border border-white/20">
                <span className="text-sm font-medium text-white">Hailuo AI</span>
              </div>
              <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg shadow-sm border border-white/20">
                <span className="text-sm font-medium text-white">Vidu AI</span>
              </div>
              <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg shadow-sm border border-white/20">
                <span className="text-sm font-medium text-white">Recraft</span>
              </div>
              <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg shadow-sm border border-white/20">
                <span className="text-sm font-medium text-white">Ideogram</span>
              </div>
              <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg shadow-sm border border-white/20">
                <span className="text-sm font-medium text-white">Stable Diffusion</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
