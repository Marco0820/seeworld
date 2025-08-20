"use client";

import { Card } from "@/components/ui/card";
import { Video, Image as ImageIcon, Sparkles, Zap, Target, Brain } from "lucide-react";
import Image from "next/image";

export default function Features() {
  return (
    <section id="features" className="px-6 py-16 md:py-24 bg-gray-900">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            强大的免费AI视频生成工具
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            全球首个完全免费的AI视频生成平台，集成多个顶级AI模型，提供专业级的视频和图像创作体验，无需付费即可使用
          </p>
        </div>

        {/* Main Features Grid */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          {/* AI Video Generator */}
          <div className="space-y-8">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-blue-800 rounded-xl flex items-center justify-center">
                <Video className="w-6 h-6 text-blue-200" />
              </div>
              <h3 className="text-3xl font-bold text-white">免费AI视频生成器</h3>
            </div>
            
            <p className="text-lg text-gray-300 leading-relaxed">
              集成Kling AI、Runway、Hailuo AI、Vidu AI等多个顶级视频模型，
              智能选择最佳模型组合，为您创作出色的视频内容。完全免费使用，无隐藏费用。
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card className="p-6 bg-gradient-to-br from-blue-800 to-blue-900 border-blue-600">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="p-2 bg-blue-500 rounded-lg">
                    <Sparkles className="w-4 h-4 text-white" />
                  </div>
                  <h4 className="font-semibold text-white">Smart Model Selection</h4>
                </div>
                <p className="text-blue-200 text-sm">
                  Automatically select optimal model combinations based on creative needs
                </p>
              </Card>

              <Card className="p-6 bg-gradient-to-br from-purple-800 to-purple-900 border-purple-600">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="p-2 bg-purple-500 rounded-lg">
                    <Zap className="w-4 h-4 text-white" />
                  </div>
                  <h4 className="font-semibold text-white">Fast Generation</h4>
                </div>
                <p className="text-purple-200 text-sm">
                  Optimized processing pipeline for rapid high-quality video generation
                </p>
              </Card>
            </div>

            {/* Video Models */}
            <div className="space-y-3">
              <p className="text-sm font-medium text-gray-400">Supported Video Models:</p>
              <div className="flex flex-wrap gap-2">
                {["Kling AI", "Runway", "Hailuo AI", "Vidu AI"].map((model) => (
                  <span
                    key={model}
                    className="px-3 py-1 bg-blue-800 text-blue-200 rounded-full text-sm font-medium"
                  >
                    {model}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Video Preview */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <div className="aspect-video bg-gradient-to-br from-blue-400 to-purple-600 flex items-center justify-center">
                <div className="text-center text-white">
                  <Video className="w-16 h-16 mx-auto mb-4 opacity-80" />
                  <p className="text-lg font-medium">AI Video Generation Demo</p>
                  <p className="text-sm opacity-80">Magical transformation from text to video</p>
                </div>
              </div>
            </div>
            
            {/* Floating badges */}
            <div className="absolute -top-4 -right-4 bg-gray-800 rounded-full p-3 shadow-lg">
              <span className="text-2xl">🎬</span>
            </div>
            <div className="absolute -bottom-4 -left-4 bg-gray-800 rounded-full p-3 shadow-lg">
              <span className="text-2xl">✨</span>
            </div>
          </div>
        </div>

        {/* AI Image Generator */}
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image Preview */}
          <div className="relative order-2 lg:order-1">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <div className="aspect-video bg-gradient-to-br from-purple-400 to-pink-600 flex items-center justify-center">
                <div className="text-center text-white">
                  <ImageIcon className="w-16 h-16 mx-auto mb-4 opacity-80" />
                  <p className="text-lg font-medium">AI Image Generation Demo</p>
                  <p className="text-sm opacity-80">Professional-grade image creation tools</p>
                </div>
              </div>
            </div>
            
            {/* Floating badges */}
            <div className="absolute -top-4 -left-4 bg-gray-800 rounded-full p-3 shadow-lg">
              <span className="text-2xl">🎨</span>
            </div>
            <div className="absolute -bottom-4 -right-4 bg-gray-800 rounded-full p-3 shadow-lg">
              <span className="text-2xl">🖼️</span>
            </div>
          </div>

          <div className="space-y-8 order-1 lg:order-2">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-purple-800 rounded-xl flex items-center justify-center">
                <ImageIcon className="w-6 h-6 text-purple-200" />
              </div>
              <h3 className="text-3xl font-bold text-white">AI Image Generator</h3>
            </div>
            
            <p className="text-lg text-gray-300 leading-relaxed">
              Supports multiple image models including Recraft, Ideogram, Stable Diffusion,
              providing a complete creation workflow from text descriptions to stunning images.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card className="p-6 bg-gradient-to-br from-purple-800 to-purple-900 border-purple-600">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="p-2 bg-purple-500 rounded-lg">
                    <Brain className="w-4 h-4 text-white" />
                  </div>
                  <h4 className="font-semibold text-white">Diverse Styles</h4>
                </div>
                <p className="text-purple-200 text-sm">
                  Support for multiple artistic styles and creation types
                </p>
              </Card>

              <Card className="p-6 bg-gradient-to-br from-pink-800 to-pink-900 border-pink-600">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="p-2 bg-pink-500 rounded-lg">
                    <Target className="w-4 h-4 text-white" />
                  </div>
                  <h4 className="font-semibold text-white">Precise Control</h4>
                </div>
                <p className="text-pink-200 text-sm">
                  Fine-tune every creative parameter and detail
                </p>
              </Card>
            </div>

            {/* Image Models */}
            <div className="space-y-3">
              <p className="text-sm font-medium text-gray-400">Supported Image Models:</p>
              <div className="flex flex-wrap gap-2">
                {["Recraft", "Ideogram", "Stable Diffusion", "DALL-E"].map((model) => (
                  <span
                    key={model}
                    className="px-3 py-1 bg-purple-800 text-purple-200 rounded-full text-sm font-medium"
                  >
                    {model}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
