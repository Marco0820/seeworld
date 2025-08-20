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
  placeholder = "描述您想要创建的视频内容...",
  maxLength = 2000,
  disabled = false,
  showExamples = true,
  showSuggestions = true,
  className = ""
}: PromptInputProps) {
  const [suggestions, setSuggestions] = useState<PromptSuggestion[]>([]);
  const [showSuggestionPanel, setShowSuggestionPanel] = useState(false);
  const [showExamplePanel, setShowExamplePanel] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('全部');
  const [isTyping, setIsTyping] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const typingTimeoutRef = useRef<NodeJS.Timeout>();

  // 预设的提示词建议
  const promptSuggestions: PromptSuggestion[] = [
    {
      id: '1',
      text: '一个美丽的日落',
      category: '自然风景',
      tags: ['日落', '风景', '美丽']
    },
    {
      id: '2', 
      text: '海边散步的人',
      category: '人物动作',
      tags: ['海边', '散步', '人物']
    },
    {
      id: '3',
      text: '城市夜景中的汽车',
      category: '城市生活',
      tags: ['城市', '夜景', '汽车']
    },
    {
      id: '4',
      text: '森林中飞舞的蝴蝶',
      category: '自然风景',
      tags: ['森林', '蝴蝶', '飞舞']
    },
    {
      id: '5',
      text: '咖啡馆里读书的女孩',
      category: '人物动作',
      tags: ['咖啡馆', '读书', '女孩']
    },
    {
      id: '6',
      text: '雨滴打在窗户上',
      category: '自然现象',
      tags: ['雨滴', '窗户', '下雨']
    },
    {
      id: '7',
      text: '篝火旁的温馨聚会',
      category: '社交场景',
      tags: ['篝火', '聚会', '温馨']
    },
    {
      id: '8',
      text: '花园中盛开的花朵',
      category: '自然风景',
      tags: ['花园', '花朵', '盛开']
    }
  ];

  // 优秀提示词示例
  const promptExamples: PromptExample[] = [
    {
      id: '1',
      title: '梦幻森林',
      prompt: '一个神秘的森林，阳光透过树叶洒下斑驳的光影，微风轻拂，树叶轻柔摆动，远处传来鸟儿的歌声，整个画面充满魔幻色彩',
      description: '适合创建充满魔幻氛围的自然场景视频',
      category: '自然风景',
      previewImage: '/api/placeholder/400/225'
    },
    {
      id: '2',
      title: '都市夜生活',
      prompt: '繁华的都市夜景，霓虹灯闪烁，车流如水，行人匆匆，高楼大厦灯火通明，展现现代都市的活力与繁忙',
      description: '展现现代都市繁华夜景的动态效果',
      category: '城市生活',
      previewImage: '/api/placeholder/400/225'
    },
    {
      id: '3',
      title: '海滩日出',
      prompt: '清晨的海滩，太阳从海平线缓缓升起，海浪轻拍沙滩，海鸥在天空中翱翔，整个画面温暖而宁静',
      description: '创造宁静美好的海滩日出场景',
      category: '自然风景',
      previewImage: '/api/placeholder/400/225'
    },
    {
      id: '4',
      title: '咖啡时光',
      prompt: '温馨的咖啡厅，一杯热腾腾的咖啡，蒸汽缓缓升起，窗外阳光透过百叶窗洒在桌面上，营造舒适惬意的氛围',
      description: '营造温馨舒适的生活场景',
      category: '生活场景',
      previewImage: '/api/placeholder/400/225'
    }
  ];

  const categories = ['全部', '自然风景', '人物动作', '城市生活', '自然现象', '社交场景', '生活场景'];

  // 智能联想功能
  const getSmartSuggestions = (inputText: string): PromptSuggestion[] => {
    if (!inputText.trim()) return [];
    
    const keywords = inputText.toLowerCase().split(/\s+/);
    return promptSuggestions.filter(suggestion => 
      keywords.some(keyword => 
        suggestion.text.toLowerCase().includes(keyword) ||
        suggestion.tags.some(tag => tag.toLowerCase().includes(keyword))
      )
    ).slice(0, 5);
  };

  // 处理输入变化
  const handleInputChange = (newValue: string) => {
    onChange(newValue);
    setIsTyping(true);

    // 清除之前的定时器
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    // 设置新的定时器
    typingTimeoutRef.current = setTimeout(() => {
      setIsTyping(false);
      if (showSuggestions && newValue.trim()) {
        const smartSuggestions = getSmartSuggestions(newValue);
        setSuggestions(smartSuggestions);
        if (smartSuggestions.length > 0) {
          setShowSuggestionPanel(true);
        }
      }
    }, 500);
  };

  // 应用建议
  const applySuggestion = (suggestion: string) => {
    const currentValue = value.trim();
    const newValue = currentValue ? `${currentValue}, ${suggestion}` : suggestion;
    onChange(newValue);
    setShowSuggestionPanel(false);
    textareaRef.current?.focus();
  };

  // 应用示例
  const applyExample = (example: PromptExample) => {
    onChange(example.prompt);
    setShowExamplePanel(false);
    textareaRef.current?.focus();
  };

  // 复制提示词
  const copyPrompt = (text: string) => {
    navigator.clipboard.writeText(text);
    // 这里可以添加一个toast提示
  };

  // 随机生成提示词
  const generateRandomPrompt = () => {
    const randomExamples = promptExamples.sort(() => 0.5 - Math.random()).slice(0, 2);
    const combinedPrompt = randomExamples.map(ex => ex.prompt).join('，同时');
    onChange(combinedPrompt);
  };

  // 过滤示例
  const filteredExamples = selectedCategory === '全部' 
    ? promptExamples 
    : promptExamples.filter(ex => ex.category === selectedCategory);

  return (
    <div className={`space-y-4 ${className}`}>
      {/* 主输入区域 */}
      <Card className="p-4">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Wand2 className="w-5 h-5 text-blue-500" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                视频描述提示词
              </h3>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={generateRandomPrompt}
                disabled={disabled}
                className="text-purple-600 border-purple-300 hover:bg-purple-50"
              >
                <RefreshCw className="w-4 h-4 mr-1" />
                随机生成
              </Button>
              {showSuggestions && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowSuggestionPanel(!showSuggestionPanel)}
                  className="text-blue-600 border-blue-300 hover:bg-blue-50"
                >
                  <Lightbulb className="w-4 h-4 mr-1" />
                  智能建议
                </Button>
              )}
            </div>
          </div>

          <div className="relative">
            <Textarea
              ref={textareaRef}
              value={value}
              onChange={(e) => handleInputChange(e.target.value)}
              placeholder={placeholder}
              className="min-h-32 resize-none text-gray-900 dark:text-white"
              maxLength={maxLength}
              disabled={disabled}
            />
            
            {/* 实时字符计数 */}
            <div className="absolute bottom-2 right-2 text-sm text-gray-400">
              {value.length}/{maxLength}
            </div>

            {/* 输入状态指示器 */}
            {isTyping && (
              <div className="absolute top-2 right-2">
                <div className="flex items-center gap-1 text-xs text-blue-500">
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                  正在输入...
                </div>
              </div>
            )}
          </div>

          {/* 提示信息 */}
          <div className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
            <p>💡 <strong>提示:</strong> 详细具体的描述能获得更好的生成效果</p>
            <p>📝 <strong>建议包含:</strong> 场景、人物、动作、风格、情绪、色彩等元素</p>
          </div>
        </div>
      </Card>

      {/* 智能建议面板 */}
      {showSuggestions && showSuggestionPanel && suggestions.length > 0 && (
        <Card className="p-4 bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="font-medium text-blue-900 dark:text-blue-100">
                智能建议 ({suggestions.length})
              </h4>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowSuggestionPanel(false)}
              >
                <ChevronUp className="w-4 h-4" />
              </Button>
            </div>
            
            <div className="flex flex-wrap gap-2">
              {suggestions.map((suggestion) => (
                <Badge
                  key={suggestion.id}
                  variant="secondary"
                  className="cursor-pointer bg-blue-100 text-blue-800 hover:bg-blue-200 dark:bg-blue-800 dark:text-blue-100 dark:hover:bg-blue-700 transition-colors"
                  onClick={() => applySuggestion(suggestion.text)}
                >
                  <Sparkles className="w-3 h-3 mr-1" />
                  {suggestion.text}
                </Badge>
              ))}
            </div>
          </div>
        </Card>
      )}

      {/* 示例展示面板 */}
      {showExamples && (
        <Card className="p-4">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="font-medium text-gray-900 dark:text-white">
                优秀提示词示例
              </h4>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowExamplePanel(!showExamplePanel)}
              >
                {showExamplePanel ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </Button>
            </div>

            {showExamplePanel && (
              <div className="space-y-4">
                {/* 分类筛选 */}
                <div className="flex flex-wrap gap-2">
                  {categories.map((category) => (
                    <Badge
                      key={category}
                      variant={selectedCategory === category ? "default" : "outline"}
                      className={`cursor-pointer transition-colors ${
                        selectedCategory === category
                          ? 'bg-blue-500 text-white hover:bg-blue-600'
                          : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                      }`}
                      onClick={() => setSelectedCategory(category)}
                    >
                      {category}
                    </Badge>
                  ))}
                </div>

                {/* 示例列表 */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {filteredExamples.map((example) => (
                    <Card key={example.id} className="p-4 hover:shadow-md transition-shadow">
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <h5 className="font-medium text-gray-900 dark:text-white">
                            {example.title}
                          </h5>
                          <Badge variant="outline" className="text-xs">
                            {example.category}
                          </Badge>
                        </div>
                        
                        <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-3">
                          {example.prompt}
                        </p>
                        
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {example.description}
                        </p>
                        
                        <div className="flex gap-2 pt-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => applyExample(example)}
                            className="flex-1 text-blue-600 border-blue-300 hover:bg-blue-50"
                          >
                            <Wand2 className="w-3 h-3 mr-1" />
                            使用
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
            )}
          </div>
        </Card>
      )}

      {/* 快捷操作栏 */}
      <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
        <div className="flex items-center gap-4">
          <span>支持中英文输入</span>
          <span>•</span>
          <span>建议长度: 20-200 字符</span>
        </div>
        <div className="flex items-center gap-2">
          {value.length > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onChange('')}
              className="text-red-500 hover:text-red-600 hover:bg-red-50"
            >
              清空
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
