"use client";

import { Button } from "@/components/ui/button";

export default function ModelsSection() {
  return (
    <section className="bg-black py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            ALL the Great AI Video & Image<br />
            Models in ONE Place!
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* AI Video Generators */}
          <div className="space-y-8">
            <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-800">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                  <span className="text-white text-sm">📹</span>
                </div>
                <h3 className="text-xl font-bold text-white">AI Video Generators</h3>
              </div>
              
              <p className="text-gray-300 mb-6 text-sm">
                Our AI video generators offer access to our flagship Pollo 1.5 and multiple 
                cutting-edge video models in the industry, such as:
              </p>

              <div className="space-y-3 mb-6">
                <div className="flex flex-wrap gap-2 text-sm">
                  <span className="bg-gray-800 text-gray-300 px-3 py-1 rounded-full">Kling AI</span>
                  <span className="bg-gray-800 text-gray-300 px-3 py-1 rounded-full">Runway</span>
                  <span className="bg-gray-800 text-gray-300 px-3 py-1 rounded-full">Hailuo AI</span>
                  <span className="bg-gray-800 text-gray-300 px-3 py-1 rounded-full">Vidu AI</span>
                  <span className="bg-gray-800 text-gray-300 px-3 py-1 rounded-full">Luma AI</span>
                  <span className="bg-gray-800 text-gray-300 px-3 py-1 rounded-full">Pika AI</span>
                  <span className="bg-gray-800 text-gray-300 px-3 py-1 rounded-full">Pixverse AI</span>
                  <span className="bg-gray-800 text-gray-300 px-3 py-1 rounded-full">Veo-2</span>
                  <span className="bg-gray-800 text-gray-300 px-3 py-1 rounded-full">CogVideo</span>
                  <span className="bg-gray-800 text-gray-300 px-3 py-1 rounded-full">Hunyuan</span>
                  <span className="bg-gray-800 text-gray-300 px-3 py-1 rounded-full">Veo-2</span>
                  <span className="bg-gray-800 text-gray-300 px-3 py-1 rounded-full">MidJourney</span>
                </div>
              </div>

              <Button className="bg-white text-black hover:bg-gray-200 rounded-full px-6 py-2 text-sm font-medium">
                AI Video Generator
              </Button>
            </div>

            {/* Pollo.ai Video AI Section */}
            <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-sm rounded-2xl p-8 border border-gray-700 relative overflow-hidden">
              <div className="relative z-10">
                <div className="flex items-center justify-center mb-6">
                  <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl p-6 text-center">
                    <div className="text-3xl font-bold text-white mb-2">P</div>
                    <div className="text-sm text-white font-medium">Pollo.ai Video AI</div>
                  </div>
                </div>
                
                {/* Feature Icons */}
                <div className="grid grid-cols-4 gap-4 mt-6">
                  <div className="text-center">
                    <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center mx-auto mb-2">
                      <span className="text-blue-400 text-xs">📝</span>
                    </div>
                    <span className="text-xs text-gray-400">Text AI</span>
                  </div>
                  <div className="text-center">
                    <div className="w-8 h-8 bg-green-500/20 rounded-lg flex items-center justify-center mx-auto mb-2">
                      <span className="text-green-400 text-xs">🖼️</span>
                    </div>
                    <span className="text-xs text-gray-400">Image AI</span>
                  </div>
                  <div className="text-center">
                    <div className="w-8 h-8 bg-purple-500/20 rounded-lg flex items-center justify-center mx-auto mb-2">
                      <span className="text-purple-400 text-xs">🎬</span>
                    </div>
                    <span className="text-xs text-gray-400">Video AI</span>
                  </div>
                  <div className="text-center">
                    <div className="w-8 h-8 bg-yellow-500/20 rounded-lg flex items-center justify-center mx-auto mb-2">
                      <span className="text-yellow-400 text-xs">📊</span>
                    </div>
                    <span className="text-xs text-gray-400">Analytics</span>
                  </div>
                </div>

                <div className="grid grid-cols-4 gap-4 mt-4">
                  <div className="text-center">
                    <div className="w-8 h-8 bg-cyan-500/20 rounded-lg flex items-center justify-center mx-auto mb-2">
                      <span className="text-cyan-400 text-xs">🔄</span>
                    </div>
                    <span className="text-xs text-gray-400">Sync</span>
                  </div>
                  <div className="text-center">
                    <div className="w-8 h-8 bg-pink-500/20 rounded-lg flex items-center justify-center mx-auto mb-2">
                      <span className="text-pink-400 text-xs">☁️</span>
                    </div>
                    <span className="text-xs text-gray-400">Cloud</span>
                  </div>
                  <div className="text-center">
                    <div className="w-8 h-8 bg-orange-500/20 rounded-lg flex items-center justify-center mx-auto mb-2">
                      <span className="text-orange-400 text-xs">⚡</span>
                    </div>
                    <span className="text-xs text-gray-400">Fast</span>
                  </div>
                  <div className="text-center">
                    <div className="w-8 h-8 bg-red-500/20 rounded-lg flex items-center justify-center mx-auto mb-2">
                      <span className="text-red-400 text-xs">📈</span>
                    </div>
                    <span className="text-xs text-gray-400">Growth</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* AI Image Generators */}
          <div className="space-y-8">
            <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-800">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center">
                  <span className="text-white text-sm">🎨</span>
                </div>
                <h3 className="text-xl font-bold text-white">AI Image Generators</h3>
              </div>
              
              <p className="text-gray-300 mb-6 text-sm">
                Our image Als also allow you to choose from various leading models. They 
                include:
              </p>

              <div className="space-y-4 mb-6">
                <div className="flex items-center space-x-3">
                  <div className="flex items-center space-x-2">
                    <span className="w-6 h-6 bg-blue-500 rounded flex items-center justify-center text-white text-xs">R</span>
                    <span className="text-white text-sm font-medium">recraft v3</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="w-6 h-6 bg-purple-500 rounded flex items-center justify-center text-white text-xs">I</span>
                    <span className="text-white text-sm font-medium">Ideogram</span>
                  </div>
                  <div className="bg-gray-700 text-gray-300 px-2 py-1 rounded text-xs">
                    STABLE DIFFUSION 3
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3 text-sm">
                  <div className="flex items-center space-x-2">
                    <span className="w-5 h-5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-sm flex items-center justify-center text-white text-xs">F</span>
                    <span className="text-gray-300">Flux Schnell</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="w-5 h-5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-sm flex items-center justify-center text-white text-xs">F</span>
                    <span className="text-gray-300">Flux Dev</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="w-5 h-5 bg-gradient-to-r from-pink-500 to-red-500 rounded-sm flex items-center justify-center text-white text-xs">F</span>
                    <span className="text-gray-300">Flux Dev Lora</span>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3 text-sm">
                  <div className="flex items-center space-x-2">
                    <span className="w-5 h-5 bg-blue-600 rounded-sm flex items-center justify-center text-white text-xs">F</span>
                    <span className="text-gray-300">Flux 1.1 Pro</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="w-5 h-5 bg-purple-600 rounded-sm flex items-center justify-center text-white text-xs">F</span>
                    <span className="text-gray-300">Flux 1.1 Pro Ultra</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="w-5 h-5 bg-pink-600 rounded-sm flex items-center justify-center text-white text-xs">F</span>
                    <span className="text-gray-300">Flux Kontext</span>
                  </div>
                </div>

                <div className="grid grid-cols-4 gap-3 text-sm">
                  <div className="flex items-center space-x-2">
                    <span className="w-5 h-5 bg-orange-500 rounded-full flex items-center justify-center text-white text-xs">D</span>
                    <span className="text-gray-300">DALL·E</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center text-white text-xs">G</span>
                    <span className="text-gray-300">GPT-4o</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs">I</span>
                    <span className="text-gray-300">Imagen</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="w-5 h-5 bg-purple-500 rounded-full flex items-center justify-center text-white text-xs">M</span>
                    <span className="text-gray-300">Midjourney</span>
                  </div>
                </div>
              </div>

              <Button className="bg-white text-black hover:bg-gray-200 rounded-full px-6 py-2 text-sm font-medium">
                AI Image Generator
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
