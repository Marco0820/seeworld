"use client";

import { Card } from "@/components/ui/card";
import { Cpu, Sparkles, Zap, Target } from "lucide-react";
import Image from "next/image";

export default function Features() {
  return (
    <section id="features" className="px-6 py-16 md:py-24">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-black mb-6">
                All models, in one place
              </h2>
              <p className="text-xl text-gray-600 mb-6 leading-relaxed">
                SeeWorld integrates the most advanced AI models for image and video generation on the market.
              </p>
              <p className="text-xl text-gray-600 leading-relaxed">
                It intelligently selects the best model combination based on your creative needs to help you get the job done.
              </p>
            </div>

            {/* Feature Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card className="p-6 bg-black/80 border-gray-700 backdrop-blur-sm">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="p-2 bg-white/20 rounded-lg">
                    <Cpu className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="font-semibold text-white">Multi-Model AI</h3>
                </div>
                <p className="text-white/70 text-sm">
                  Advanced AI models working together for superior results
                </p>
              </Card>

              <Card className="p-6 bg-black/80 border-gray-700 backdrop-blur-sm">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="p-2 bg-white/20 rounded-lg">
                    <Sparkles className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="font-semibold text-white">Smart Selection</h3>
                </div>
                <p className="text-white/70 text-sm">
                  Automatically chooses optimal model combinations
                </p>
              </Card>

              <Card className="p-6 bg-black/80 border-gray-700 backdrop-blur-sm">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="p-2 bg-white/20 rounded-lg">
                    <Zap className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="font-semibold text-white">Lightning Fast</h3>
                </div>
                <p className="text-white/70 text-sm">
                  Optimized processing for rapid video generation
                </p>
              </Card>

              <Card className="p-6 bg-black/80 border-gray-700 backdrop-blur-sm">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="p-2 bg-white/20 rounded-lg">
                    <Target className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="font-semibold text-white">Precision Control</h3>
                </div>
                <p className="text-white/70 text-sm">
                  Fine-tuned control over every aspect of creation
                </p>
              </Card>
            </div>
          </div>

          {/* Right Visual */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden border border-white/20">
              <Image
                src="https://ext.same-assets.com/1560300687/154005104.png"
                alt="AI Models Integration Visualization"
                width={600}
                height={400}
                className="w-full h-auto"
              />

              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
            </div>

            {/* Floating elements */}
            <div className="absolute -top-4 -right-4 w-20 h-20 bg-white/30 rounded-full blur-xl animate-pulse"></div>
            <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-white/20 rounded-full blur-xl animate-pulse delay-700"></div>

            {/* Model badges */}
            <div className="absolute top-4 left-4 flex flex-wrap gap-2">
              {["GPT-4", "DALL-E", "Stable Diffusion", "Midjourney"].map((model) => (
                <span
                  key={model}
                  className="px-3 py-1 bg-black/50 backdrop-blur-sm rounded-full text-white text-xs border border-white/20"
                >
                  {model}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
