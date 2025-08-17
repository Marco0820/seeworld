"use client";

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { VideoModel, VIDEO_MODELS } from '@/types/video';
import { Zap, Star, Crown, Check } from 'lucide-react';

interface ModelSelectorProps {
  selectedModel: VideoModel | null;
  onModelSelect: (model: VideoModel) => void;
  filterCategory?: 'all' | 'standard' | 'pro' | 'master';
}

export default function ModelSelector({ selectedModel, onModelSelect, filterCategory = 'all' }: ModelSelectorProps) {
  const [category, setCategory] = useState<'all' | 'standard' | 'pro' | 'master'>(filterCategory);

  const filteredModels = VIDEO_MODELS.filter(model =>
    category === 'all' || model.category === category
  );

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'standard': return <Zap className="w-4 h-4" />;
      case 'pro': return <Star className="w-4 h-4" />;
      case 'master': return <Crown className="w-4 h-4" />;
      default: return <Zap className="w-4 h-4" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'standard': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'pro': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'master': return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  return (
    <div className="space-y-6">
      {/* Category Filter */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <h3 className="text-xl font-semibold text-white">Choose Your AI Model</h3>
        <Select value={category} onValueChange={(value: 'all' | 'standard' | 'pro' | 'master') => setCategory(value)}>
          <SelectTrigger className="w-[180px] bg-white/10 border-white/20 text-white">
            <SelectValue placeholder="Filter by category" />
          </SelectTrigger>
          <SelectContent className="bg-slate-800 border-slate-700">
            <SelectItem value="all" className="text-white hover:bg-slate-700">All Models</SelectItem>
            <SelectItem value="standard" className="text-white hover:bg-slate-700">Standard</SelectItem>
            <SelectItem value="pro" className="text-white hover:bg-slate-700">Pro</SelectItem>
            <SelectItem value="master" className="text-white hover:bg-slate-700">Master</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Models Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredModels.map((model) => (
          <Card
            key={model.id}
            className={`relative p-6 transition-all duration-300 cursor-pointer hover:scale-105 border-2 ${
              selectedModel?.id === model.id
                ? 'border-cyan-400 bg-cyan-400/10'
                : 'border-white/20 bg-white/5 hover:border-white/40'
            }`}
            onClick={() => onModelSelect(model)}
          >
            {/* Selected indicator */}
            {selectedModel?.id === model.id && (
              <div className="absolute top-4 right-4">
                <div className="bg-cyan-400 rounded-full p-1">
                  <Check className="w-4 h-4 text-black" />
                </div>
              </div>
            )}

            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div>
                <h4 className="text-lg font-semibold text-white mb-1">{model.name}</h4>
                <p className="text-sm text-white/60">{model.provider}</p>
              </div>
              <Badge className={`${getCategoryColor(model.category)} flex items-center gap-1`}>
                {getCategoryIcon(model.category)}
                <span className="capitalize">{model.category}</span>
              </Badge>
            </div>

            {/* Description */}
            <p className="text-white/70 text-sm mb-4 leading-relaxed">
              {model.description}
            </p>

            {/* Features */}
            <div className="space-y-3 mb-4">
              <div className="flex flex-wrap gap-2">
                {model.features.map((feature, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-white/10 rounded text-xs text-white/80"
                  >
                    {feature}
                  </span>
                ))}
              </div>
            </div>

            {/* Specs */}
            <div className="space-y-2 mb-4 text-sm">
              <div className="flex justify-between text-white/60">
                <span>Max Duration:</span>
                <span className="text-white">{model.maxDuration}s</span>
              </div>
              <div className="flex justify-between text-white/60">
                <span>Resolutions:</span>
                <span className="text-white">{model.resolutions.join(', ')}</span>
              </div>
              <div className="flex justify-between text-white/60">
                <span>Price:</span>
                <span className="text-green-400 font-medium">{model.price}</span>
              </div>
            </div>

            {/* Select Button */}
            <Button
              className={`w-full transition-all duration-300 ${
                selectedModel?.id === model.id
                  ? 'bg-cyan-400 hover:bg-cyan-500 text-black'
                  : 'bg-white/20 hover:bg-white/30 text-white border border-white/20'
              }`}
              onClick={(e) => {
                e.stopPropagation();
                onModelSelect(model);
              }}
            >
              {selectedModel?.id === model.id ? 'Selected' : 'Select Model'}
            </Button>
          </Card>
        ))}
      </div>

      {/* No models message */}
      {filteredModels.length === 0 && (
        <div className="text-center py-12">
          <p className="text-white/60">No models found for the selected category.</p>
        </div>
      )}

      {/* Selected Model Summary */}
      {selectedModel && (
        <Card className="p-6 bg-cyan-400/10 border-cyan-400/30">
          <div className="flex items-center gap-3 mb-3">
            <div className="bg-cyan-400 rounded-full p-2">
              <Check className="w-4 h-4 text-black" />
            </div>
            <div>
              <h4 className="text-lg font-semibold text-white">{selectedModel.name}</h4>
              <p className="text-cyan-400">{selectedModel.provider}</p>
            </div>
          </div>
          <p className="text-white/70 text-sm">
            Ready to generate videos with {selectedModel.name}.
            Duration: up to {selectedModel.maxDuration}s,
            Resolution: {selectedModel.resolutions.join(' or ')},
            Price: {selectedModel.price}
          </p>
        </Card>
      )}
    </div>
  );
}
