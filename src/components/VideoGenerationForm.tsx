"use client";

import { useState, useRef } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { VideoModel, VideoGenerationRequest } from '@/types/video';
import { Upload, Image as ImageIcon, Wand2, AlertCircle } from 'lucide-react';

interface VideoGenerationFormProps {
  selectedModel: VideoModel | null;
  onGenerate: (request: VideoGenerationRequest) => void;
  isGenerating: boolean;
}

export default function VideoGenerationForm({ selectedModel, onGenerate, isGenerating }: VideoGenerationFormProps) {
  const [formData, setFormData] = useState({
    prompt: '',
    imageUrl: '',
    duration: '',
    resolution: '',
    aspectRatio: '16:9',
    motionStrength: 5,
    seed: '',
    negativePrompt: '',
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (field: string, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setImagePreview(result);
        setFormData(prev => ({ ...prev, imageUrl: result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedModel) {
      alert('Please select a model first');
      return;
    }

    if (!formData.prompt.trim()) {
      alert('Please enter a prompt');
      return;
    }

    const request: VideoGenerationRequest = {
      modelId: selectedModel.id,
      prompt: formData.prompt,
      imageUrl: formData.imageUrl || undefined,
      duration: formData.duration ? parseInt(formData.duration) : undefined,
      resolution: formData.resolution || undefined,
      aspectRatio: formData.aspectRatio,
      motionStrength: formData.motionStrength,
      seed: formData.seed ? parseInt(formData.seed) : undefined,
      negativePrompt: formData.negativePrompt || undefined,
    };

    onGenerate(request);
  };

  const clearImage = () => {
    setImageFile(null);
    setImagePreview('');
    setFormData(prev => ({ ...prev, imageUrl: '' }));
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  if (!selectedModel) {
    return (
      <Card className="p-8 bg-white/5 border-white/20">
        <div className="text-center">
          <AlertCircle className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-white mb-2">Select a Model First</h3>
          <p className="text-white/60">
            Please choose an AI model from the selector above to start generating videos.
          </p>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-6 bg-white/5 border-white/20">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full p-2">
            <Wand2 className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-white">Generate Video</h3>
            <p className="text-white/60">Using {selectedModel.name}</p>
          </div>
        </div>

        {/* Prompt */}
        <div className="space-y-2">
          <Label htmlFor="prompt" className="text-white font-medium">
            Video Description <span className="text-red-400">*</span>
          </Label>
          <Textarea
            id="prompt"
            placeholder="Describe the video you want to create... (e.g., 'A beautiful sunset over a mountain landscape with flowing water')"
            value={formData.prompt}
            onChange={(e) => handleInputChange('prompt', e.target.value)}
            className="min-h-[100px] bg-white/10 border-white/20 text-white placeholder:text-white/40"
            disabled={isGenerating}
          />
          <p className="text-sm text-white/50">
            Be descriptive and specific for better results. Mention style, mood, and details.
          </p>
        </div>

        {/* Image Upload (if supported) */}
        {selectedModel.features.includes('Image-to-Video') && (
          <div className="space-y-2">
            <Label className="text-white font-medium">Reference Image (Optional)</Label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  disabled={isGenerating}
                />
                <Button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full bg-white/10 hover:bg-white/20 text-white border border-white/20"
                  disabled={isGenerating}
                >
                  <Upload className="w-4 h-4 mr-2" />
                  Upload Image
                </Button>
              </div>
              {imagePreview && (
                <div className="relative">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-full h-24 object-cover rounded-lg border border-white/20"
                  />
                  <Button
                    type="button"
                    onClick={clearImage}
                    className="absolute -top-2 -right-2 w-6 h-6 p-0 bg-red-500 hover:bg-red-600 text-white rounded-full"
                    disabled={isGenerating}
                  >
                    ×
                  </Button>
                </div>
              )}
            </div>
            <p className="text-sm text-white/50">
              Upload an image to guide the video generation (supports JPG, PNG, WebP)
            </p>
          </div>
        )}

        {/* Generation Parameters */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="duration" className="text-white font-medium">Duration (seconds)</Label>
            <Select
              value={formData.duration}
              onValueChange={(value) => handleInputChange('duration', value)}
              disabled={isGenerating}
            >
              <SelectTrigger className="bg-white/10 border-white/20 text-white">
                <SelectValue placeholder={`Max ${selectedModel.maxDuration}s`} />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-slate-700">
                {Array.from({ length: selectedModel.maxDuration }, (_, i) => i + 1).map(duration => (
                  <SelectItem key={duration} value={duration.toString()} className="text-white hover:bg-slate-700">
                    {duration}s
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="resolution" className="text-white font-medium">Resolution</Label>
            <Select
              value={formData.resolution}
              onValueChange={(value) => handleInputChange('resolution', value)}
              disabled={isGenerating}
            >
              <SelectTrigger className="bg-white/10 border-white/20 text-white">
                <SelectValue placeholder="Auto" />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-slate-700">
                {selectedModel.resolutions.map(resolution => (
                  <SelectItem key={resolution} value={resolution} className="text-white hover:bg-slate-700">
                    {resolution}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="aspectRatio" className="text-white font-medium">Aspect Ratio</Label>
            <Select
              value={formData.aspectRatio}
              onValueChange={(value) => handleInputChange('aspectRatio', value)}
              disabled={isGenerating}
            >
              <SelectTrigger className="bg-white/10 border-white/20 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-slate-700">
                <SelectItem value="16:9" className="text-white hover:bg-slate-700">16:9 (Landscape)</SelectItem>
                <SelectItem value="9:16" className="text-white hover:bg-slate-700">9:16 (Portrait)</SelectItem>
                <SelectItem value="1:1" className="text-white hover:bg-slate-700">1:1 (Square)</SelectItem>
                <SelectItem value="4:3" className="text-white hover:bg-slate-700">4:3 (Standard)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Advanced Parameters */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="motionStrength" className="text-white font-medium">
              Motion Strength: {formData.motionStrength}
            </Label>
            <input
              type="range"
              id="motionStrength"
              min="1"
              max="10"
              value={formData.motionStrength}
              onChange={(e) => handleInputChange('motionStrength', parseInt(e.target.value))}
              className="w-full"
              disabled={isGenerating}
            />
            <p className="text-sm text-white/50">Lower values = subtle motion, Higher values = dynamic motion</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="seed" className="text-white font-medium">Seed (Optional)</Label>
            <Input
              id="seed"
              type="number"
              placeholder="Random"
              value={formData.seed}
              onChange={(e) => handleInputChange('seed', e.target.value)}
              className="bg-white/10 border-white/20 text-white placeholder:text-white/40"
              disabled={isGenerating}
            />
            <p className="text-sm text-white/50">Use same seed for reproducible results</p>
          </div>
        </div>

        {/* Negative Prompt */}
        <div className="space-y-2">
          <Label htmlFor="negativePrompt" className="text-white font-medium">Negative Prompt (Optional)</Label>
          <Textarea
            id="negativePrompt"
            placeholder="What you don't want in the video... (e.g., 'blurry, low quality, distorted')"
            value={formData.negativePrompt}
            onChange={(e) => handleInputChange('negativePrompt', e.target.value)}
            className="bg-white/10 border-white/20 text-white placeholder:text-white/40"
            disabled={isGenerating}
          />
        </div>

        {/* Price Estimate */}
        <Alert className="bg-green-500/20 border-green-500/30">
          <AlertCircle className="h-4 w-4 text-green-400" />
          <AlertDescription className="text-green-400">
            Estimated cost: {selectedModel.price} • Duration: {formData.duration || selectedModel.maxDuration}s • Model: {selectedModel.name}
          </AlertDescription>
        </Alert>

        {/* Generate Button */}
        <div className="mt-2 flex justify-center">
          <Button
            type="submit"
            disabled={isGenerating || !formData.prompt.trim()}
            className="px-6 bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-500 hover:to-blue-600 text-white font-semibold py-3"
          >
            {isGenerating ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"></div>
                Generating Video...
              </>
            ) : (
              <>
                <Wand2 className="w-4 h-4 mr-2" />
                Generate Video
              </>
            )}
          </Button>
        </div>
      </form>
    </Card>
  );
}
