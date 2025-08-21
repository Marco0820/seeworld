"use client";

import { useState, useRef, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { 
  Lightbulb, 
  Wand2, 
  Copy, 
  RefreshCw, 
  Sparkles,
  Play,
  Eye,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

interface PromptSuggestion {
  id: string;
  text: string;
  category: string;
  tags: string[];
}

interface PromptExample {
  id: string;
  title: string;
  prompt: string;
  description: string;
  category: string;
  previewImage?: string;
  videoUrl?: string;
}

interface PromptInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  maxLength?: number;
  disabled?: boolean;
  showExamples?: boolean;
  showSuggestions?: boolean;
  className?: string;
}

export default function PromptInput({
  value,
  onChange,
  placeholder = "Describe the video content you want to create...",
  maxLength = 2000,
  disabled = false,
  showExamples = true,
  showSuggestions = true,
  className = ""
}: PromptInputProps) {
  const [suggestions, setSuggestions] = useState<PromptSuggestion[]>([]);
  const [showSuggestionPanel, setShowSuggestionPanel] = useState(false);
  const [showExamplePanel, setShowExamplePanel] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [isTyping, setIsTyping] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const typingTimeoutRef = useRef<NodeJS.Timeout>();

  // Preset prompt suggestions
  const promptSuggestions: PromptSuggestion[] = [
    {
      id: '1',
      text: 'A beautiful sunset',
      category: 'Nature Scene',
      tags: ['sunset', 'landscape', 'beautiful']
    },
    {
      id: '2', 
      text: 'Person walking on the beach',
      category: 'Human Action',
      tags: ['beach', 'walking', 'person']
    },
    {
      id: '3',
      text: 'Cars in city nightscape',
      category: 'Urban Life',
      tags: ['city', 'night', 'cars']
    },
    {
      id: '4',
      text: 'Butterflies dancing in the forest',
      category: 'Nature Scene',
      tags: ['forest', 'butterflies', 'dancing']
    },
    {
      id: '5',
      text: 'Girl reading in a coffee shop',
      category: 'Human Action',
      tags: ['coffee shop', 'reading', 'girl']
    },
    {
      id: '6',
      text: 'Raindrops hitting the window',
      category: 'Natural Phenomena',
      tags: ['raindrops', 'window', 'rain']
    },
    {
      id: '7',
      text: 'Cozy gathering around campfire',
      category: 'Social Scene',
      tags: ['campfire', 'gathering', 'cozy']
    },
    {
      id: '8',
      text: 'Blooming flowers in garden',
      category: 'Nature Scene',
      tags: ['garden', 'flowers', 'blooming']
    }
  ];

  // Excellent prompt examples
  const promptExamples: PromptExample[] = [
    {
      id: '1',
      title: 'Cinematic Ocean Scene',
      prompt: 'A cinematic shot of ocean waves crashing against rocky cliffs during golden hour, dramatic lighting, slow motion, 4K quality',
      description: 'Create stunning ocean scenery with cinematic effects',
      category: 'Nature Scene',
      previewImage: 'https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=300&h=200&fit=crop'
    },
    {
      id: '2',
      title: 'Urban Street at Night',
      prompt: 'Bustling city street at night with neon lights reflecting on wet pavement, people walking, cars passing by, cyberpunk style',
      description: 'Modern urban nightlife scene',
      category: 'Urban Life',
      previewImage: 'https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=300&h=200&fit=crop'
    },
    {
      id: '3',
      title: 'Fantasy Forest Magic',
      prompt: 'Enchanted forest with glowing fireflies, magical particles floating in the air, ancient trees, mystical atmosphere',
      description: 'Magical fantasy forest environment',
      category: 'Fantasy',
      previewImage: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=300&h=200&fit=crop'
    },
    {
      id: '4',
      title: 'Portrait Close-up',
      prompt: 'Close-up portrait of a young woman with natural lighting, soft focus background, professional photography style',
      description: 'Professional portrait photography',
      category: 'Portrait',
      previewImage: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=300&h=200&fit=crop'
    }
  ];

  // Get categories
  const categories = ['All', ...Array.from(new Set([
    ...promptSuggestions.map(s => s.category),
    ...promptExamples.map(e => e.category)
  ]))];

  // Filter examples by category
  const filteredExamples = selectedCategory === 'All' 
    ? promptExamples 
    : promptExamples.filter(example => example.category === selectedCategory);

  // Handle typing effect
  useEffect(() => {
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    if (value.length > 0) {
      setIsTyping(true);
      typingTimeoutRef.current = setTimeout(() => {
        setIsTyping(false);
      }, 1000);
    } else {
      setIsTyping(false);
    }

    return () => {
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
    };
  }, [value]);

  // Generate suggestions based on input
  useEffect(() => {
    if (value.length > 2) {
      const filtered = promptSuggestions.filter(suggestion =>
        suggestion.text.toLowerCase().includes(value.toLowerCase()) ||
        suggestion.tags.some(tag => tag.toLowerCase().includes(value.toLowerCase()))
      ).slice(0, 5);
      setSuggestions(filtered);
    } else {
      setSuggestions([]);
    }
  }, [value]);

  const applySuggestion = (suggestion: PromptSuggestion) => {
    onChange(suggestion.text);
    setShowSuggestionPanel(false);
    textareaRef.current?.focus();
  };

  const applyExample = (example: PromptExample) => {
    onChange(example.prompt);
    setShowExamplePanel(false);
    textareaRef.current?.focus();
  };

  const copyPrompt = (prompt: string) => {
    navigator.clipboard.writeText(prompt);
  };

  const generateRandomPrompt = () => {
    const randomSuggestion = promptSuggestions[Math.floor(Math.random() * promptSuggestions.length)];
    onChange(randomSuggestion.text);
    textareaRef.current?.focus();
  };

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Main Input Area */}
      <Card className="p-4 bg-white/5 border-white/20">
        <div className="space-y-4">
          {/* Input Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Wand2 className="w-5 h-5 text-blue-400" />
              <span className="text-white font-medium">Video Prompt</span>
              {isTyping && (
                <div className="flex items-center gap-1 text-blue-400">
                  <div className="w-1 h-1 bg-blue-400 rounded-full animate-pulse"></div>
                  <div className="w-1 h-1 bg-blue-400 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                  <div className="w-1 h-1 bg-blue-400 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                </div>
              )}
            </div>
            
            <div className="flex items-center gap-2">
              {showExamples && (
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowExamplePanel(!showExamplePanel)}
                  className="text-blue-400 hover:text-blue-300 hover:bg-blue-900/20"
                >
                  <Lightbulb className="w-4 h-4 mr-1" />
                  Examples
                  {showExamplePanel ? <ChevronUp className="w-3 h-3 ml-1" /> : <ChevronDown className="w-3 h-3 ml-1" />}
                </Button>
              )}
              
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={generateRandomPrompt}
                className="text-purple-400 hover:text-purple-300 hover:bg-purple-900/20"
              >
                <RefreshCw className="w-4 h-4 mr-1" />
                Random
              </Button>
            </div>
          </div>

          {/* Text Input */}
          <div className="relative">
            <Textarea
              ref={textareaRef}
              value={value}
              onChange={(e) => onChange(e.target.value)}
              placeholder={placeholder}
              disabled={disabled}
              maxLength={maxLength}
              className="min-h-[120px] bg-white/5 border-white/20 text-white placeholder:text-gray-400 resize-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400"
              onFocus={() => setShowSuggestionPanel(suggestions.length > 0)}
            />
            
            {/* Character Count */}
            <div className="absolute bottom-3 right-3 text-xs text-gray-400">
              {value.length}/{maxLength}
            </div>
          </div>

          {/* Live Suggestions */}
          {showSuggestions && suggestions.length > 0 && showSuggestionPanel && (
            <Card className="p-3 bg-white/10 border-white/20">
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="w-4 h-4 text-yellow-400" />
                <span className="text-sm font-medium text-white">Suggestions</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {suggestions.map((suggestion) => (
                  <Button
                    key={suggestion.id}
                    variant="ghost"
                    size="sm"
                    onClick={() => applySuggestion(suggestion)}
                    className="text-blue-300 hover:text-blue-200 hover:bg-blue-900/20 text-xs h-auto py-1 px-2"
                  >
                    {suggestion.text}
                  </Button>
                ))}
              </div>
            </Card>
          )}
        </div>
      </Card>

      {/* Examples Panel */}
      {showExamples && showExamplePanel && (
        <Card className="p-6 bg-white/5 border-white/20">
          <div className="space-y-4">
            {/* Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Eye className="w-5 h-5 text-green-400" />
                <span className="font-medium text-white">Prompt Examples</span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowExamplePanel(false)}
                className="text-gray-400 hover:text-white"
              >
                <ChevronUp className="w-4 h-4" />
              </Button>
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className={selectedCategory === category 
                    ? "bg-blue-600 text-white" 
                    : "text-gray-300 hover:text-white hover:bg-white/10"
                  }
                >
                  {category}
                </Button>
              ))}
            </div>

            {/* Examples Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredExamples.map((example) => (
                <Card key={example.id} className="p-4 hover:shadow-md transition-shadow">
                  <div className="space-y-3">
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <h4 className="font-medium text-white">{example.title}</h4>
                        <p className="text-sm text-gray-300">{example.description}</p>
                        <Badge variant="outline" className="text-xs">
                          {example.category}
                        </Badge>
                      </div>
                    </div>
                    
                    <div className="text-sm text-gray-200 bg-white/5 rounded-lg p-3 font-mono">
                      {example.prompt}
                    </div>

                    
                    <div className="flex gap-2 pt-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => applyExample(example)}
                        className="flex-1 text-blue-600 border-blue-300 hover:bg-blue-50"
                      >
                        <Wand2 className="w-3 h-3 mr-1" />
                        Use
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => copyPrompt(example.prompt)}
                        className="text-gray-600 border-gray-300 hover:bg-gray-50"
                      >
                        <Copy className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </Card>
      )}

      {/* Quick Actions Bar */}
      <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
        <div className="flex items-center gap-4">
          <span>Supports English and Chinese input</span>
          <span>•</span>
          <span>Recommended length: 20-200 characters</span>
        </div>
        <div className="flex items-center gap-2">
          {value.length > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onChange('')}
              className="text-red-500 hover:text-red-600 hover:bg-red-50"
            >
              Clear
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}