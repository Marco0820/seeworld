"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Play, Eye, Clock, Star, ArrowRight } from "lucide-react";
import Image from "next/image";

const videoExamples = [
  {
    id: 1,
    title: "Jesus Life One-Minute Quick Story",
    image: "https://images.unsplash.com/photo-1507692049790-de58290a4334?w=400&h=300&fit=crop",
    category: "Religious Content",
    duration: "1:02",
    views: 15420,
    rating: 4.8,
    description: "AI-generated religious themed short video showcasing important moments in Jesus' life"
  },
  {
    id: 2,
    title: "Starbucks Creative Humor Ad",
    image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&h=300&fit=crop",
    category: "Commercial Ad",
    duration: "0:45",
    views: 23890,
    rating: 4.9,
    description: "Creative advertisement made for Starbucks, combining humor elements and brand characteristics"
  },
  {
    id: 3,
    title: "Gorilla Adventurer's Fishing Diary",
    image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&h=300&fit=crop",
    category: "Entertainment Content",
    duration: "2:15",
    views: 34567,
    rating: 4.7,
    description: "Interesting animal-themed video showcasing gorilla's fishing adventure journey"
  },
  {
    id: 4,
    title: "Cute Pink Pig's Work Diary",
    image: "https://images.unsplash.com/photo-1516467508483-a7212febe31a?w=400&h=300&fit=crop",
    category: "Animation Content",
    duration: "1:30",
    views: 18943,
    rating: 4.6,
    description: "Warm and cute animated short film recording pig's daily work life"
  },
  {
    id: 5,
    title: "Japanese Convenience Store Girl Pixel Style Short Film",
    image: "https://images.unsplash.com/photo-1555992336-03a23c5a2d1c?w=400&h=300&fit=crop",
    category: "Pixel Art",
    duration: "1:45",
    views: 27651,
    rating: 4.8,
    description: "Retro pixel-style Japanese short film showcasing daily life in convenience stores"
  },
  {
    id: 6,
    title: "Estee Lauder Little Brown Bottle Funny Ad",
    image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&h=300&fit=crop",
    category: "Beauty Ad",
    duration: "0:52",
    views: 41238,
    rating: 4.9,
    description: "Creative advertisement made for Estee Lauder Little Brown Bottle"
  },
  {
    id: 7,
    title: "The Bond Between Technology and Emotion",
    image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=300&fit=crop",
    category: "Concept Film",
    duration: "3:20",
    views: 19876,
    rating: 4.5,
    description: "Deep concept short film exploring the relationship between technology and human emotions"
  },
  {
    id: 8,
    title: "Plastic Surgery Suspense Short Drama",
    image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=300&fit=crop",
    category: "Suspense Drama",
    duration: "4:15",
    views: 32109,
    rating: 4.4,
    description: "Thrilling suspense short drama centered around plastic surgery"
  }
];

export default function UseCases() {
  const [selectedVideo, setSelectedVideo] = useState<number | null>(null);

  return (
    <section id="use-cases" className="px-6 py-16 md:py-24 bg-gray-900">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-100 to-purple-100 text-purple-600 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Play className="w-4 h-4" />
            <span>Featured AI Creation Cases</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Creative Case Showcase
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            By watching these featured cases, learn about the various creative tasks Pollo AI can accomplish for you,
            from commercial ads to entertainment content, from animation production to concept short films.
          </p>
        </div>

        {/* Video Examples Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {videoExamples.map((video) => (
            <Card
              key={video.id}
              className="group relative overflow-hidden bg-gray-800 border border-gray-600 hover:border-blue-400 hover:shadow-xl transition-all duration-300 cursor-pointer"
              onClick={() => setSelectedVideo(selectedVideo === video.id ? null : video.id)}
            >
              {/* Thumbnail */}
              <div className="relative aspect-video overflow-hidden">
                <Image
                  src={video.image}
                  alt={video.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-300" />

                {/* Play Button */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-white/20 backdrop-blur-sm rounded-full p-4 hover:bg-white/30 transition-colors group-hover:scale-110">
                    <Play className="w-6 h-6 text-white" fill="currentColor" />
                  </div>
                </div>

                {/* Category Badge */}
                <div className="absolute top-3 left-3">
                  <span className="px-2 py-1 bg-black/60 backdrop-blur-sm rounded-full text-white text-xs font-medium">
                    {video.category}
                  </span>
                </div>

                {/* Duration */}
                <div className="absolute top-3 right-3 flex items-center space-x-1 bg-black/60 backdrop-blur-sm rounded-full px-2 py-1">
                  <Clock className="w-3 h-3 text-white" />
                  <span className="text-white text-xs">{video.duration}</span>
                </div>

                {/* Stats */}
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                  <div className="flex items-center space-x-1 bg-black/60 backdrop-blur-sm rounded-full px-2 py-1">
                    <Eye className="w-3 h-3 text-white" />
                    <span className="text-white text-xs">{video.views.toLocaleString()}</span>
                  </div>
                  
                  <div className="flex items-center space-x-1 bg-black/60 backdrop-blur-sm rounded-full px-2 py-1">
                    <Star className="w-3 h-3 text-yellow-400 fill-current" />
                    <span className="text-white text-xs">{video.rating}</span>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-4 space-y-3">
                <h3 className="font-semibold text-white text-sm leading-tight line-clamp-2">
                  {video.title}
                </h3>

                <p className="text-xs text-gray-300 line-clamp-2">
                  {video.description}
                </p>

                {/* Expanded Content */}
                {selectedVideo === video.id && (
                  <div className="space-y-3 pt-3 border-t border-gray-600">
                    <div className="flex items-center justify-between text-xs text-gray-400">
                      <span>AI Generation Time: 2-5 minutes</span>
                      <span>Quality: HD</span>
                    </div>
                    
                    <Button size="sm" className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                      Create Similar Video Now
                    </Button>
                  </div>
                )}
              </div>
            </Card>
          ))}
        </div>

        {/* View More Button */}
        <div className="text-center mt-12">
          <Button 
            size="lg"
            variant="outline"
            className="border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-8 py-3 text-lg font-semibold rounded-xl transition-all duration-300 transform hover:scale-105"
          >
            View More Cases
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mt-20 pt-16 border-t border-gray-600">
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-400 mb-2">1000+</div>
            <p className="text-gray-300 text-sm">Success Cases</p>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-400 mb-2">50万+</div>
            <p className="text-gray-300 text-sm">User Views</p>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-pink-400 mb-2">4.8</div>
            <p className="text-gray-300 text-sm">Average Rating</p>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-400 mb-2">98%</div>
            <p className="text-gray-300 text-sm">Satisfaction</p>
          </div>
        </div>
      </div>
    </section>
  );
}
