"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Play, Heart, Sparkles, Zap, Star, ArrowRight } from "lucide-react";
import Image from "next/image";

const effectCategories = [
  { id: 'all', name: 'All', count: '150+' },
  { id: 'video', name: 'Video Effects', count: '80+' },
  { id: 'image', name: 'Image Effects', count: '70+' },
  { id: 'popular', name: 'Hot', count: '20+' }
];

const popularEffects = [
  {
    id: 1,
    title: "AI Kiss Video Generator",
    category: "Video Effects",
    image: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=400&h=300&fit=crop",
    likes: 2840,
    uses: 15600,
    description: "Generate romantic kissing scene videos",
    tag: "Hot"
  },
  {
    id: 2,
    title: "AI Muscle Generator",
    category: "Image Effects",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop",
    likes: 1920,
    uses: 8900,
    description: "Enhance body shape and muscle definition",
    tag: "Popular"
  },
  {
    id: 3,
    title: "AI Bikini Swap",
    category: "Image Effects",
    image: "https://images.unsplash.com/photo-1544717297-fa95b6ee9643?w=400&h=300&fit=crop",
    likes: 3150,
    uses: 12400,
    description: "Smart clothing replacement technology",
    tag: "New"
  },
  {
    id: 4,
    title: "Dreamlike Light Effect Generator",
    category: "Video Effects",
    image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=300&fit=crop",
    likes: 2670,
    uses: 9800,
    description: "Add stunning light and shadow effects",
    tag: "Recommended"
  },
  {
    id: 5,
    title: "AI Style Transfer",
    category: "Image Effects",
    image: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400&h=300&fit=crop",
    likes: 1890,
    uses: 7200,
    description: "Convert photos to artistic styles",
    tag: "Classic"
  },
  {
    id: 6,
    title: "Dynamic Expression Generation",
    category: "Video Effects",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop",
    likes: 2210,
    uses: 11300,
    description: "Generate vivid facial expression animations",
    tag: "Hot"
  },
  {
    id: 7,
    title: "Background Replacement Master",
    category: "Image Effects",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop",
    likes: 3420,
    uses: 18900,
    description: "Smart background replacement and compositing",
    tag: "Latest"
  },
  {
    id: 8,
    title: "AI Dance Generator",
    category: "Video Effects",
    image: "https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=400&h=300&fit=crop",
    likes: 2890,
    uses: 14200,
    description: "Generate various dance movement videos",
    tag: "Trending"
  }
];

export default function EffectsShowcase() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [hoveredEffect, setHoveredEffect] = useState<number | null>(null);

  const getTagColor = (tag: string) => {
    const colors = {
      'Hot': 'bg-red-800 text-red-200',
      'Popular': 'bg-blue-800 text-blue-200',
      'New': 'bg-green-800 text-green-200',
      'Recommended': 'bg-purple-800 text-purple-200',
      'Classic': 'bg-yellow-800 text-yellow-200',
      'Latest': 'bg-pink-800 text-pink-200',
      'Trending': 'bg-orange-800 text-orange-200'
    };
    return colors[tag as keyof typeof colors] || 'bg-gray-800 text-gray-200';
  };

  return (
    <section id="effects" className="px-6 py-16 md:py-24 bg-gradient-to-b from-gray-800 to-gray-900">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-pink-800 to-purple-800 text-purple-200 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Sparkles className="w-4 h-4" />
            <span>Over 150 AI Effects</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Hot AI Video and Image Effects
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            From AI kiss videos to muscle generators, from bikini swaps to style transfers,
            explore the most popular AI creative effects to make your creations more exciting.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex justify-center mb-12">
          <div className="bg-gray-800 rounded-full p-1 shadow-lg border border-gray-600">
            <div className="flex space-x-1">
              {effectCategories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-6 py-3 rounded-full transition-all duration-200 ${
                    selectedCategory === category.id
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md'
                      : 'text-gray-300 hover:text-blue-400 hover:bg-blue-900'
                  }`}
                >
                  <span className="font-medium">{category.name}</span>
                  <span className="ml-2 text-xs opacity-75">({category.count})</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Effects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {popularEffects.map((effect) => (
            <Card
              key={effect.id}
              className="group relative overflow-hidden bg-gray-800 border border-gray-600 hover:border-blue-400 hover:shadow-xl transition-all duration-300 cursor-pointer"
              onMouseEnter={() => setHoveredEffect(effect.id)}
              onMouseLeave={() => setHoveredEffect(null)}
            >
              {/* Image */}
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={effect.image}
                  alt={effect.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Play Button */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="bg-white/20 backdrop-blur-sm rounded-full p-4 hover:bg-white/30 transition-colors">
                    <Play className="w-6 h-6 text-white" fill="currentColor" />
                  </div>
                </div>

                {/* Tag */}
                <div className="absolute top-3 left-3">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTagColor(effect.tag)}`}>
                    {effect.tag}
                  </span>
                </div>

                {/* Category Badge */}
                <div className="absolute top-3 right-3">
                  <span className="px-2 py-1 bg-black/60 backdrop-blur-sm rounded text-white text-xs">
                    {effect.category}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-4 space-y-3">
                <h3 className="font-semibold text-white text-sm leading-tight line-clamp-2">
                  {effect.title}
                </h3>
                
                <p className="text-xs text-gray-300 line-clamp-2">
                  {effect.description}
                </p>

                {/* Stats */}
                <div className="flex items-center justify-between text-xs text-gray-400">
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center space-x-1">
                      <Heart className="w-3 h-3" />
                      <span>{effect.likes.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Zap className="w-3 h-3" />
                      <span>{effect.uses.toLocaleString()}</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-1 text-yellow-500">
                    <Star className="w-3 h-3 fill-current" />
                    <span>4.8</span>
                  </div>
                </div>

                {/* Action Button */}
                <Button 
                  size="sm" 
                  className={`w-full transition-all duration-200 ${
                    hoveredEffect === effect.id
                      ? 'bg-blue-600 hover:bg-blue-700 text-white'
                      : 'bg-gray-700 hover:bg-gray-600 text-gray-300'
                  }`}
                >
                  {hoveredEffect === effect.id ? 'Use Now' : 'Learn More'}
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {/* View More Button */}
        <div className="text-center">
          <Button 
            size="lg"
            variant="outline"
            className="border-2 border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-white px-8 py-3 text-lg font-semibold rounded-xl transition-all duration-300 transform hover:scale-105"
          >
            View All 150+ Effects
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20 pt-16 border-t border-gray-600">
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-800 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Sparkles className="w-8 h-8 text-blue-200" />
            </div>
            <h3 className="text-3xl font-bold text-white mb-2">150+</h3>
            <p className="text-gray-300">Total AI Effects</p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-purple-800 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Heart className="w-8 h-8 text-purple-200" />
            </div>
            <h3 className="text-3xl font-bold text-white mb-2">5M+</h3>
            <p className="text-gray-300">User Likes</p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-pink-800 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Zap className="w-8 h-8 text-pink-200" />
            </div>
            <h3 className="text-3xl font-bold text-white mb-2">20M+</h3>
            <p className="text-gray-300">Effects Usage</p>
          </div>
        </div>
      </div>
    </section>
  );
}
