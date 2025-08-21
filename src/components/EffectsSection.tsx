"use client";

import { Button } from "@/components/ui/button";

export default function EffectsSection() {
  // Mock video data - in a real app, these would be loaded from an API
  const videos = [
    { id: 1, thumbnail: "/api/placeholder/300/400", title: "AI Portrait Effect" },
    { id: 2, thumbnail: "/api/placeholder/300/400", title: "Style Transfer" },
    { id: 3, thumbnail: "/api/placeholder/300/400", title: "Animation Effect" },
    { id: 4, thumbnail: "/api/placeholder/300/400", title: "Background Removal" },
    { id: 5, thumbnail: "/api/placeholder/300/400", title: "Color Enhancement" },
    { id: 6, thumbnail: "/api/placeholder/300/400", title: "Motion Blur" },
    { id: 7, thumbnail: "/api/placeholder/300/400", title: "Face Swap" },
    { id: 8, thumbnail: "/api/placeholder/300/400", title: "Object Removal" },
    { id: 9, thumbnail: "/api/placeholder/300/400", title: "Upscaling" },
    { id: 10, thumbnail: "/api/placeholder/300/400", title: "Artistic Style" },
    { id: 11, thumbnail: "/api/placeholder/300/400", title: "Lighting Effect" },
    { id: 12, thumbnail: "/api/placeholder/300/400", title: "Texture Effect" },
  ];

  return (
    <section className="bg-black py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
            <span className="text-blue-400">300+</span><br />
            Viral AI Videos and Photo Effects
          </h2>
          <p className="text-gray-400 text-lg max-w-3xl mx-auto">
            With a simple upload or by describing what you want, our AI can create viral-quality effects and transformations that will make your content stand out from the crowd.
          </p>
        </div>

        {/* Video Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 mb-12">
          {videos.map((video) => (
            <div 
              key={video.id}
              className="relative group cursor-pointer overflow-hidden rounded-xl bg-gray-900 aspect-[3/4]"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10"></div>
              <div className="w-full h-full bg-gray-800 flex items-center justify-center">
                <div className="text-4xl">🎬</div>
              </div>
              <div className="absolute bottom-3 left-3 right-3 z-20">
                <p className="text-white text-sm font-medium truncate">{video.title}</p>
              </div>
              
              {/* Play button overlay */}
              <div className="absolute inset-0 flex items-center justify-center z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                  <div className="w-0 h-0 border-l-[8px] border-l-white border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent ml-1"></div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Button className="bg-white text-black hover:bg-gray-200 rounded-full px-8 py-3 text-lg font-medium">
            View More
          </Button>
        </div>

        {/* Tools Section */}
        <div className="mt-20">
          <div className="text-center mb-12">
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Cutting-Edge Tools to Enhance Your<br />
              AI Creation
            </h3>
            <p className="text-gray-400 text-lg">
              From advanced editing to professional-grade enhancements, our tools give you everything you need to create stunning content.
            </p>
          </div>

          {/* Tools Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((tool) => (
              <div 
                key={tool}
                className="relative group cursor-pointer overflow-hidden rounded-xl bg-gray-900 aspect-video"
              >
                <div className="w-full h-full bg-gray-800 flex items-center justify-center">
                  <div className="text-3xl">⚡</div>
                </div>
                
                {/* Play button overlay */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                    <div className="w-0 h-0 border-l-[6px] border-l-white border-t-[4px] border-t-transparent border-b-[4px] border-b-transparent ml-1"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* User Creations Section */}
        <div className="mt-20">
          <div className="text-center mb-12">
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Explore Pollo AI's User Creations
            </h3>
            <p className="text-gray-400 text-lg">
              Discover amazing content created by our community using Pollo AI's powerful tools.
            </p>
          </div>

          {/* User Creations Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((creation) => (
              <div 
                key={creation}
                className="relative group cursor-pointer overflow-hidden rounded-xl bg-gray-900 aspect-square"
              >
                <div className="w-full h-full bg-gray-800 flex items-center justify-center">
                  <div className="text-3xl">🎨</div>
                </div>
                
                {/* Play button overlay */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                    <div className="w-0 h-0 border-l-[6px] border-l-white border-t-[4px] border-t-transparent border-b-[4px] border-b-transparent ml-1"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Button className="bg-white text-black hover:bg-gray-200 rounded-full px-8 py-3 text-lg font-medium">
              View More
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
