"use client";

import { Video, Image as ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Hero() {
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
      
      <div className="relative z-20 max-w-7xl mx-auto px-6 pt-32 pb-20">
        <div className="text-center space-y-12">
          {/* Main Headline */}
          <div className="space-y-8">
            <div className="bg-gradient-to-r from-red-500 to-pink-500 text-white text-sm md:text-base font-bold px-6 py-2 rounded-full inline-block mb-6 shadow-lg">
              🌟 World's First Completely Free AI Image & Video Generator 🌟
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight video-text-shadow text-white max-w-5xl mx-auto">
              World's First One-Stop Free AI Image & Video Creation Platform
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 max-w-4xl mx-auto leading-relaxed">
              Experience the world's first completely free AI-powered platform for creating stunning videos and images instantly. 
              Generate high-quality visuals from text prompts or images with advanced AI models including GPT-4, Claude, Gemini, and DeepSeek - no technical skills required.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <a 
              href="/studio"
              className="relative flex items-center justify-center space-x-3 w-fit rounded-2xl p-px bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              <div className="bg-black/80 backdrop-blur-sm rounded-2xl px-10 py-5 flex items-center space-x-3">
                <Video className="w-6 h-6 text-white" />
                <span className="text-xl font-bold text-white">Create Video</span>
              </div>
            </a>
            
            <a 
              href="/studio"
              className="relative flex items-center justify-center space-x-3 w-fit rounded-2xl p-px bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              <div className="bg-black/80 backdrop-blur-sm rounded-2xl px-10 py-5 flex items-center space-x-3">
                <ImageIcon className="w-6 h-6 text-white" />
                <span className="text-xl font-bold text-white">Create Image</span>
              </div>
            </a>
          </div>
          
          {/* Additional Features - Temporarily Hidden */}
          <div className="hidden grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 max-w-6xl mx-auto">
            <div className="bg-black/60 backdrop-blur-sm border border-white/20 rounded-xl p-6 text-center">
              <div className="text-3xl mb-4">🤖</div>
              <h3 className="text-xl font-bold text-white mb-2">AI Chatbot Support</h3>
              <p className="text-gray-300">Integrated with top AI models like GPT-4, Claude, Gemini for intelligent content generation</p>
            </div>
            <div className="bg-black/60 backdrop-blur-sm border border-white/20 rounded-xl p-6 text-center">
              <div className="text-3xl mb-4">🎨</div>
              <h3 className="text-xl font-bold text-white mb-2">AIGC Content Generation</h3>
              <p className="text-gray-300">Support multiple AIGC functions including text-to-video, image-to-video, AI image generation</p>
            </div>
            <div className="bg-black/60 backdrop-blur-sm border border-white/20 rounded-xl p-6 text-center">
              <div className="text-3xl mb-4">⚡</div>
              <h3 className="text-xl font-bold text-white mb-2">DeepSeek Acceleration</h3>
              <p className="text-gray-300">Powered by advanced AI technologies like DeepSeek for fast generation and high quality</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
