"use client";

import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { 
  Dice1, 
  Dice2, 
  Dice3, 
  Dice4, 
  Dice5, 
  Dice6,
  RefreshCw,
  History,
  Copy,
  Trash2,
  Lock,
  Unlock,
  Info,
  Star,
  Clock
} from 'lucide-react';

interface SeedHistoryItem {
  id: string;
  seed: number;
  timestamp: Date;
  prompt: string;
  favorite: boolean;
  videoUrl?: string;
  thumbnailUrl?: string;
}

interface SeedSettingsProps {
  value: number | null;
  onChange: (seed: number | null) => void;
  disabled?: boolean;
  currentPrompt?: string;
  className?: string;
}

export default function SeedSettings({
  value,
  onChange,
  disabled = false,
  currentPrompt = "",
  className = ""
}: SeedSettingsProps) {
  const [inputValue, setInputValue] = useState<string>(value?.toString() || '');
  const [isLocked, setIsLocked] = useState(false);
  const [seedHistory, setSeedHistory] = useState<SeedHistoryItem[]>([]);
  const [showHistory, setShowHistory] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  // Load history from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('seedHistory');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setSeedHistory(parsed.map((item: SeedHistoryItem) => ({
          ...item,
          timestamp: new Date(item.timestamp)
        })));
      } catch (error) {
        console.error('Failed to load seed history:', error);
      }
    }
  }, []);

  // Save history to localStorage
  const saveHistory = (history: SeedHistoryItem[]) => {
    try {
      localStorage.setItem('seedHistory', JSON.stringify(history));
      setSeedHistory(history);
    } catch (error) {
      console.error('Failed to save seed history:', error);
    }
  };

  // Generate random seed
  const generateRandomSeed = (): number => {
    return Math.floor(Math.random() * 2147483647);
  };

  // Handle random generation
  const handleRandomGenerate = () => {
    if (disabled) return;
    
    const newSeed = generateRandomSeed();
    onChange(newSeed);
    setInputValue(newSeed.toString());
    
    // Add to history
    if (currentPrompt.trim()) {
      addToHistory(newSeed, currentPrompt);
    }
  };

  // Handle input changes
  const handleInputChange = (inputValue: string) => {
    setInputValue(inputValue);
    
    if (inputValue.trim() === '') {
      onChange(null);
    } else {
      const numValue = parseInt(inputValue);
      if (!isNaN(numValue) && numValue >= 0 && numValue <= 2147483647) {
        onChange(numValue);
      }
    }
  };

  // Add to history
  const addToHistory = (seed: number, prompt: string) => {
    const newItem: SeedHistoryItem = {
      id: `${seed}-${Date.now()}`,
      seed,
      timestamp: new Date(),
      prompt: prompt.slice(0, 100),
      favorite: false
    };
    
    const updatedHistory = [newItem, ...seedHistory.slice(0, 19)]; // Keep maximum 20 records
    saveHistory(updatedHistory);
  };



  // Toggle favorite status
  const toggleFavorite = (id: string) => {
    const updatedHistory = seedHistory.map(item =>
      item.id === id ? { ...item, favorite: !item.favorite } : item
    );
    saveHistory(updatedHistory);
  };

  // Delete history record
  const deleteHistoryItem = (id: string) => {
    const updatedHistory = seedHistory.filter(item => item.id !== id);
    saveHistory(updatedHistory);
  };

  // Clear all history
  const clearHistory = () => {
    saveHistory([]);
  };

  // Copy seed value
  const copySeed = (seed: number) => {
    navigator.clipboard.writeText(seed.toString());
  };

  // Get random dice icon
  const getRandomDiceIcon = () => {
    const diceIcons = [Dice1, Dice2, Dice3, Dice4, Dice5, Dice6];
    const DiceIcon = diceIcons[Math.floor(Math.random() * diceIcons.length)];
    return <DiceIcon className="w-4 h-4" />;
  };

  // Format time
  const formatTime = (date: Date): string => {
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes} minutes ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)} hours ago`;
    return date.toLocaleDateString();
  };

  // Get seed explanation
  const getSeedExplanation = () => {
    return {
      title: "What is a Seed?",
      content: [
        "Seed is a numeric parameter that controls AI generation randomness",
        "Same seed + same prompt = same result",
        "Different seeds produce different variations",
        "Seed range: 0 - 2,147,483,647",
        "Leave empty to use random seed"
      ]
    };
  };

  const explanation = getSeedExplanation();
  const favoriteHistory = seedHistory.filter(item => item.favorite);
  const recentHistory = seedHistory.filter(item => !item.favorite).slice(0, 10);

  return (
    <div className={`space-y-4 ${className}`}>
      {/* 主控制区域 */}
      <Card className="p-4">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="text-purple-600">
                {getRandomDiceIcon()}
              </div>
              <h4 className="font-medium text-gray-900 dark:text-white">Seed Settings</h4>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowDetails(!showDetails)}
                className="text-gray-500 hover:text-gray-700"
              >
                <Info className="w-4 h-4" />
              </Button>
            </div>
            
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsLocked(!isLocked)}
                className={`${
                  isLocked 
                    ? 'text-orange-600 border-orange-300 bg-orange-50' 
                    : 'text-gray-600 border-gray-300'
                }`}
              >
                {isLocked ? <Lock className="w-4 h-4" /> : <Unlock className="w-4 h-4" />}
                {isLocked ? 'Locked' : 'Unlocked'}
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowHistory(!showHistory)}
                className="text-blue-600 border-blue-300 hover:bg-blue-50"
              >
                <History className="w-4 h-4 mr-1" />
                History
              </Button>
            </div>
          </div>

          <div className="flex gap-3">
            <div className="flex-1">
              <Label htmlFor="seed-input" className="text-sm font-medium">
                Seed Value (Optional)
              </Label>
              <div className="flex gap-2 mt-1">
                <Input
                  id="seed-input"
                  type="number"
                  placeholder="Leave empty for random seed"
                  value={inputValue}
                  onChange={(e) => handleInputChange(e.target.value)}
                  min="0"
                  max="2147483647"
                  disabled={disabled || isLocked}
                  className="flex-1"
                />
                {value && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => copySeed(value)}
                    className="text-gray-600 border-gray-300 hover:bg-gray-50"
                  >
                    <Copy className="w-4 h-4" />
                  </Button>
                )}
              </div>
            </div>
            
            <div className="flex flex-col justify-end">
              <Button
                onClick={handleRandomGenerate}
                disabled={disabled || isLocked}
                className="bg-purple-500 hover:bg-purple-600 text-white"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Random Generate
              </Button>
            </div>
          </div>

          {/* 当前种子状态 */}
          <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <div className="flex items-center gap-2">
              <Badge variant={value ? "default" : "secondary"} className="bg-purple-100 text-purple-800">
                {value ? `Seed: ${value}` : 'Random Seed'}
              </Badge>
              {isLocked && (
                <Badge variant="secondary" className="bg-orange-100 text-orange-800">
                  <Lock className="w-3 h-3 mr-1" />
                  Locked
                </Badge>
              )}
            </div>
            
            <div className="text-sm text-gray-600 dark:text-gray-300">
              {value ? 'Fixed Generation' : 'Random Variation'}
            </div>
          </div>
        </div>
      </Card>

      {/* 种子说明 */}
      {showDetails && (
        <Card className="p-4 bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
          <div className="space-y-3">
            <h5 className="font-medium text-blue-900 dark:text-blue-100">
              {explanation.title}
            </h5>
            <ul className="space-y-1 text-sm text-blue-700 dark:text-blue-300">
              {explanation.content.map((item, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="text-blue-500 mt-1">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </Card>
      )}

      {/* 历史记录面板 */}
      {showHistory && (
        <Card className="p-4">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h5 className="font-medium text-gray-900 dark:text-white">
                Seed History ({seedHistory.length})
              </h5>
              {seedHistory.length > 0 && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={clearHistory}
                  className="text-red-600 border-red-300 hover:bg-red-50"
                >
                  <Trash2 className="w-4 h-4 mr-1" />
                  Clear
                </Button>
              )}
            </div>

            {seedHistory.length === 0 ? (
              <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                <History className="w-12 h-12 mx-auto mb-3 opacity-50" />
                <p>No history records yet</p>
                <p className="text-sm">Seed records will be automatically saved when generating videos</p>
              </div>
            ) : (
              <div className="space-y-4">
                {/* 收藏的种子 */}
                {favoriteHistory.length > 0 && (
                  <div className="space-y-2">
                    <h6 className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-500" />
                      Favorite Seeds
                    </h6>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {favoriteHistory.map((item) => (
                        <div
                          key={item.id}
                          className="p-3 border border-yellow-200 dark:border-yellow-800 rounded-lg bg-yellow-50 dark:bg-yellow-900/20"
                        >
                          <div className="flex items-center justify-between mb-2">
                            <Badge variant="outline" className="text-xs font-mono">
                              {item.seed}
                            </Badge>
                            <div className="flex gap-1">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => toggleFavorite(item.id)}
                                className="w-6 h-6 p-0 text-yellow-500 hover:text-yellow-600"
                              >
                                <Star className="w-3 h-3 fill-current" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => {
                                  onChange(item.seed);
                                  setInputValue(item.seed.toString());
                                }}
                                disabled={disabled}
                                className="w-6 h-6 p-0 text-blue-500 hover:text-blue-600"
                              >
                                <RefreshCw className="w-3 h-3" />
                              </Button>
                            </div>
                          </div>
                          <p className="text-xs text-gray-600 dark:text-gray-300 line-clamp-2 mb-1">
                            {item.prompt}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {formatTime(item.timestamp)}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* 最近的种子 */}
                {recentHistory.length > 0 && (
                  <div className="space-y-2">
                    <h6 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Recently Used
                    </h6>
                    <div className="space-y-2 max-h-64 overflow-y-auto">
                      {recentHistory.map((item) => (
                        <div
                          key={item.id}
                          className="flex items-center justify-between p-2 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800"
                        >
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <Badge variant="outline" className="text-xs font-mono">
                                {item.seed}
                              </Badge>
                              <span className="text-xs text-gray-500 dark:text-gray-400">
                                {formatTime(item.timestamp)}
                              </span>
                            </div>
                            <p className="text-xs text-gray-600 dark:text-gray-300 line-clamp-1">
                              {item.prompt}
                            </p>
                          </div>
                          
                          <div className="flex gap-1 ml-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => toggleFavorite(item.id)}
                              className="w-6 h-6 p-0 text-gray-400 hover:text-yellow-500"
                            >
                              <Star className="w-3 h-3" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => {
                                onChange(item.seed);
                                setInputValue(item.seed.toString());
                              }}
                              disabled={disabled}
                              className="w-6 h-6 p-0 text-blue-500 hover:text-blue-600"
                            >
                              <RefreshCw className="w-3 h-3" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => deleteHistoryItem(item.id)}
                              className="w-6 h-6 p-0 text-red-500 hover:text-red-600"
                            >
                              <Trash2 className="w-3 h-3" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </Card>
      )}

      {/* 快速操作提示 */}
      <div className="text-sm text-gray-500 dark:text-gray-400 space-y-1">
        <p>💡 <strong>Tip:</strong> Locking the seed ensures the same result every time</p>
        <p>🎲 <strong>Suggestion:</strong> After finding satisfactory results, you can favorite the seed for reuse</p>
      </div>
    </div>
  );
}
