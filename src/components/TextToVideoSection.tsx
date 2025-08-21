"use client";

import { Button } from "@/components/ui/button";

export default function TextToVideoSection() {
  return (
    <section className="bg-gradient-to-b from-gray-900 to-black py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Text to Video
              </h2>
              <p className="text-xl text-gray-300 leading-relaxed mb-8">
                AI text to video generator with enhanced 
                semantic understanding, able to generate 
                videos from any text prompt.
              </p>
              <Button className="bg-yellow-500 hover:bg-yellow-600 text-black rounded-full px-8 py-3 text-lg font-medium">
                Try for Free
              </Button>
            </div>
          </div>

          {/* Right Content - Video Demo */}
          <div className="relative">
            <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700">
              {/* Input Text */}
              <div className="mb-6">
                <div className="bg-black rounded-lg p-4 border border-gray-600">
                  <p className="text-white text-sm font-mono">
                    On Mars, a spacecraft is t
                  </p>
                  <div className="w-2 h-5 bg-white animate-pulse inline-block ml-1"></div>
                </div>
              </div>

              {/* Video Preview */}
              <div className="grid grid-cols-2 gap-4">
                <div className="relative rounded-lg overflow-hidden bg-gradient-to-br from-orange-900 to-red-900 aspect-video">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-orange-200 text-xs">Mars Surface</div>
                  </div>
                  {/* Play button */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                      <div className="w-0 h-0 border-l-[6px] border-l-white border-t-[4px] border-t-transparent border-b-[4px] border-b-transparent ml-1"></div>
                    </div>
                  </div>
                </div>

                <div className="relative rounded-lg overflow-hidden bg-gradient-to-br from-blue-900 to-purple-900 aspect-video">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-blue-200 text-xs">Spacecraft</div>
                  </div>
                  {/* Play button */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                      <div className="w-0 h-0 border-l-[6px] border-l-white border-t-[4px] border-t-transparent border-b-[4px] border-b-transparent ml-1"></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Generation Progress */}
              <div className="mt-6">
                <div className="flex items-center justify-between text-sm text-gray-400 mb-2">
                  <span>Generating video...</span>
                  <span>75%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full" style={{width: '75%'}}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
