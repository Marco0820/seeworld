import React, { useState } from 'react';
import { 
  ChevronDown, 
  Upload, 
  Play, 
  Settings, 
  Sparkles, 
  Film, 
  Zap, 
  Eye, 
  Shield, 
  Lock, 
  Info, 
  RefreshCw,
  User,
  Palette,
  Wand2,
  Library,
  Wrench
} from 'lucide-react';

const PolloAIInterface = () => {
  const [selectedMode, setSelectedMode] = useState('Basic');
  const [videoLength, setVideoLength] = useState('5s');
  const [resolution, setResolution] = useState('480P');
  const [outputVideoNumber, setOutputVideoNumber] = useState(1);
  const [seed, setSeed] = useState('130970740');
  const [publicVisibility, setPublicVisibility] = useState(true);
  const [copyProtection, setCopyProtection] = useState(false);
  const [prompt, setPrompt] = useState('');
  const [addEndFrame, setAddEndFrame] = useState(false);
  const [translatePrompt, setTranslatePrompt] = useState(false);
  const [advancedExpanded, setAdvancedExpanded] = useState(true);

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <div className="border-b border-gray-800 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-white rounded flex items-center justify-center">
              <span className="text-black text-sm font-bold">=</span>
            </div>
            <span className="text-xl font-semibold">Pollo.ai</span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <a 
            href="/pricing" 
            className="text-sm text-gray-300 hover:text-white transition-colors cursor-pointer"
          >
            Pricing
          </a>
          <div className="flex items-center gap-2 bg-gray-800 rounded-lg px-3 py-2 cursor-pointer hover:bg-gray-700 transition-colors">
            <span className="text-sm">Default Project</span>
            <ChevronDown size={16} />
          </div>
          <div className="flex items-center gap-3">
            <span className="bg-red-500 text-white text-xs px-2 py-1 rounded font-medium">2</span>
            <div className="w-8 h-8 bg-blue-500 rounded flex items-center justify-center cursor-pointer hover:bg-blue-600 transition-colors">
              <span className="text-xs font-bold">AI</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex h-[calc(100vh-73px)]">
        {/* Sidebar */}
        <div className="w-16 bg-gray-800 flex flex-col items-center py-4 gap-3">
          {/* Img2Vid - Active */}
          <div className="flex flex-col items-center gap-1">
            <div className="w-8 h-8 bg-red-500 rounded flex items-center justify-center">
              <Film size={16} />
            </div>
            <div className="text-xs text-center text-white font-medium">Img2Vid</div>
          </div>
          
          {/* Txt2Vid */}
          <div className="flex flex-col items-center gap-1 cursor-pointer hover:opacity-80">
            <div className="w-8 h-8 bg-gray-700 rounded flex items-center justify-center">
              <Zap size={16} />
            </div>
            <div className="text-xs text-center text-gray-400">Txt2Vid</div>
          </div>
          
          {/* AI Avatar */}
          <div className="flex flex-col items-center gap-1 cursor-pointer hover:opacity-80">
            <div className="w-8 h-8 bg-gray-700 rounded flex items-center justify-center">
              <User size={16} />
            </div>
            <div className="text-xs text-center text-gray-400">AI Avatar</div>
          </div>
          
          {/* Motion */}
          <div className="flex flex-col items-center gap-1 cursor-pointer hover:opacity-80">
            <div className="w-8 h-8 bg-gray-700 rounded flex items-center justify-center">
              <Play size={16} />
            </div>
            <div className="text-xs text-center text-gray-400">Motion</div>
          </div>
          
          {/* Consistent */}
          <div className="flex flex-col items-center gap-1 cursor-pointer hover:opacity-80">
            <div className="w-8 h-8 bg-gray-700 rounded flex items-center justify-center">
              <Eye size={16} />
            </div>
            <div className="text-xs text-center text-gray-400">Consistent</div>
          </div>
          
          {/* Vid2Vid */}
          <div className="flex flex-col items-center gap-1 cursor-pointer hover:opacity-80">
            <div className="w-8 h-8 bg-gray-700 rounded flex items-center justify-center">
              <Film size={16} />
            </div>
            <div className="text-xs text-center text-gray-400">Vid2Vid</div>
          </div>
          
          {/* Animation */}
          <div className="flex flex-col items-center gap-1 cursor-pointer hover:opacity-80">
            <div className="w-8 h-8 bg-gray-700 rounded flex items-center justify-center">
              <Palette size={16} />
            </div>
            <div className="text-xs text-center text-gray-400">Animation</div>
          </div>
          
          {/* Inspiration */}
          <div className="flex flex-col items-center gap-1 cursor-pointer hover:opacity-80">
            <div className="w-8 h-8 bg-gray-700 rounded flex items-center justify-center">
              <Sparkles size={16} />
            </div>
            <div className="text-xs text-center text-gray-400">Inspiration</div>
          </div>
          
          {/* Library */}
          <div className="flex flex-col items-center gap-1 cursor-pointer hover:opacity-80">
            <div className="w-8 h-8 bg-gray-700 rounded flex items-center justify-center">
              <Library size={16} />
            </div>
            <div className="text-xs text-center text-gray-400">Library</div>
          </div>
          
          {/* AI Tools */}
          <div className="flex flex-col items-center gap-1 cursor-pointer hover:opacity-80">
            <div className="w-8 h-8 bg-gray-700 rounded flex items-center justify-center">
              <Wrench size={16} />
            </div>
            <div className="text-xs text-center text-gray-400">AI Tools</div>
          </div>
        </div>

        {/* Left Control Panel */}
        <div className="w-80 bg-gray-800 border-r border-gray-700 overflow-y-auto">
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-6">Image to Video</h2>
            
            {/* Model Selection */}
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">Model</label>
              <div className="bg-gray-700 rounded-lg p-3 flex items-center justify-between cursor-pointer hover:bg-gray-600 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-white rounded flex items-center justify-center">
                    <span className="text-black font-bold text-sm">P</span>
                  </div>
                  <div>
                    <div className="text-sm font-medium">Pollo 1.6</div>
                    <div className="text-xs text-gray-400">Better, faster and cheaper</div>
                  </div>
                </div>
                <ChevronDown size={16} className="text-gray-400" />
              </div>
            </div>

            {/* Image Upload */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-medium">Image</label>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-400">Add end frame</span>
                  <div 
                    className={`w-8 h-4 rounded-full relative cursor-pointer transition-colors ${addEndFrame ? 'bg-red-500' : 'bg-gray-600'}`}
                    onClick={() => setAddEndFrame(!addEndFrame)}
                  >
                    <div className={`w-3 h-3 bg-white rounded-full absolute top-0.5 transition-transform ${addEndFrame ? 'translate-x-4' : 'translate-x-0.5'}`}></div>
                  </div>
                </div>
              </div>
              
              <div className="border-2 border-dashed border-gray-600 rounded-lg p-8 text-center hover:border-gray-500 transition-colors cursor-pointer">
                <Upload className="mx-auto mb-4 text-gray-500" size={48} />
                <div className="text-sm text-gray-400 mb-2">Click to upload an image</div>
                <div className="text-xs text-gray-500">
                  Upload JPG/PNG/WEBP image up to 10MB, with a minimum<br />
                  width/height of 320px.
                </div>
              </div>
            </div>

            {/* Prompt */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-medium">Prompt <span className="text-gray-400">(Optional)</span></label>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-400">Translate Prompt</span>
                  <div 
                    className={`w-8 h-4 rounded-full relative cursor-pointer transition-colors ${translatePrompt ? 'bg-red-500' : 'bg-gray-600'}`}
                    onClick={() => setTranslatePrompt(!translatePrompt)}
                  >
                    <div className={`w-3 h-3 bg-white rounded-full absolute top-0.5 transition-transform ${translatePrompt ? 'translate-x-4' : 'translate-x-0.5'}`}></div>
                  </div>
                </div>
              </div>
              
              <textarea 
                className="w-full bg-gray-700 rounded-lg p-3 text-sm resize-none border border-gray-600 focus:border-red-500 focus:outline-none transition-colors"
                rows={3}
                placeholder="What do you want to create with this image?"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
              />
              
              <div className="flex items-center justify-between mt-2">
                <button className="flex items-center gap-2 text-sm text-blue-400 hover:text-blue-300 transition-colors">
                  <Sparkles size={16} />
                  Generate with AI
                </button>
                <span className="text-xs text-gray-500">{prompt.length} / 2000</span>
              </div>
            </div>

            {/* Advanced Settings */}
            <div className="mb-6">
              <button 
                className="flex items-center justify-between w-full text-sm font-medium mb-4 hover:text-gray-300 transition-colors"
                onClick={() => setAdvancedExpanded(!advancedExpanded)}
              >
                <span>Advanced</span>
                <ChevronDown size={16} className={`transition-transform ${advancedExpanded ? 'rotate-180' : ''}`} />
              </button>
              
              {advancedExpanded && (
                <>
                  {/* Mode */}
                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-2">Mode</label>
                    <div className="space-y-2">
                      <div 
                        className={`p-3 rounded-lg border cursor-pointer transition-all ${
                          selectedMode === 'Basic' 
                            ? 'border-red-500 bg-red-500/10' 
                            : 'border-gray-600 bg-gray-700 hover:bg-gray-650'
                        }`}
                        onClick={() => setSelectedMode('Basic')}
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="text-sm font-medium">Basic</div>
                            <div className="text-xs text-gray-400">Faster generation with standard quality</div>
                          </div>
                          {selectedMode === 'Basic' && <div className="w-3 h-3 bg-red-500 rounded-full"></div>}
                        </div>
                      </div>
                      <div 
                        className={`p-3 rounded-lg border cursor-pointer transition-all ${
                          selectedMode === 'Pro' 
                            ? 'border-red-500 bg-red-500/10' 
                            : 'border-gray-600 bg-gray-700 hover:bg-gray-650'
                        }`}
                        onClick={() => setSelectedMode('Pro')}
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="text-sm font-medium">Pro</div>
                            <div className="text-xs text-gray-400">Professional, cinema-quality output</div>
                          </div>
                          {selectedMode === 'Pro' && <div className="w-3 h-3 bg-red-500 rounded-full"></div>}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Video Length */}
                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-2">Video Length</label>
                    <div className="flex gap-2">
                      <button 
                        className={`px-4 py-2 rounded-lg text-sm transition-colors ${
                          videoLength === '5s' 
                            ? 'bg-red-500 text-white' 
                            : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                        }`}
                        onClick={() => setVideoLength('5s')}
                      >
                        5s
                      </button>
                      <button 
                        className={`px-4 py-2 rounded-lg text-sm transition-colors ${
                          videoLength === '10s' 
                            ? 'bg-red-500 text-white' 
                            : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                        }`}
                        onClick={() => setVideoLength('10s')}
                      >
                        10s
                      </button>
                    </div>
                  </div>

                  {/* Resolution */}
                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-2">Resolution</label>
                    <div className="flex gap-2">
                      {['480P', '720P', '1080P'].map((res) => (
                        <button 
                          key={res}
                          className={`px-4 py-2 rounded-lg text-sm transition-colors ${
                            resolution === res 
                              ? 'bg-red-500 text-white' 
                              : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                          }`}
                          onClick={() => setResolution(res)}
                        >
                          {res}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Seed */}
                  <div className="mb-4">
                    <div className="flex items-center gap-2 mb-2">
                      <label className="text-sm font-medium">Seed</label>
                      <Info size={14} className="text-gray-400 cursor-help" />
                    </div>
                    <div className="flex gap-2">
                      <div className="relative flex-1">
                        <input 
                          type="text" 
                          className="w-full bg-gray-700 rounded-lg p-3 text-sm pr-10 border border-gray-600 focus:border-red-500 focus:outline-none transition-colors"
                          value={seed}
                          onChange={(e) => setSeed(e.target.value)}
                        />
                        <Lock className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                      </div>
                      <button className="bg-gray-700 p-3 rounded-lg hover:bg-gray-600 transition-colors border border-gray-600">
                        <RefreshCw size={16} />
                      </button>
                    </div>
                  </div>

                  {/* Output Video Number */}
                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-2">Output Video Number</label>
                    <div className="flex gap-2">
                      {[1, 2, 3, 4].map((num) => (
                        <button 
                          key={num}
                          className={`w-10 h-10 rounded-lg transition-colors ${
                            outputVideoNumber === num 
                              ? 'bg-red-500 text-white' 
                              : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                          }`}
                          onClick={() => setOutputVideoNumber(num)}
                        >
                          {num}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Public Visibility */}
                  <div className="mb-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <label className="text-sm font-medium">Public Visibility</label>
                        <Info size={14} className="text-gray-400 cursor-help" />
                      </div>
                      <div 
                        className={`w-12 h-6 rounded-full p-1 cursor-pointer transition-colors ${
                          publicVisibility ? 'bg-red-500' : 'bg-gray-600'
                        }`} 
                        onClick={() => setPublicVisibility(!publicVisibility)}
                      >
                        <div className={`w-4 h-4 bg-white rounded-full transition-transform ${
                          publicVisibility ? 'translate-x-6' : 'translate-x-0'
                        }`}></div>
                      </div>
                    </div>
                  </div>

                  {/* Copy Protection */}
                  <div className="mb-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <label className="text-sm font-medium">Copy Protection</label>
                        <Info size={14} className="text-gray-400 cursor-help" />
                      </div>
                      <div 
                        className={`w-12 h-6 rounded-full p-1 cursor-pointer transition-colors ${
                          copyProtection ? 'bg-red-500' : 'bg-gray-600'
                        }`} 
                        onClick={() => setCopyProtection(!copyProtection)}
                      >
                        <div className={`w-4 h-4 bg-white rounded-full transition-transform ${
                          copyProtection ? 'translate-x-6' : 'translate-x-0'
                        }`}></div>
                      </div>
                    </div>
                  </div>
                </>
              )}

              {/* Credits */}
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <span className="text-sm">Credits required: 5</span>
                  <Info size={14} className="text-gray-400 cursor-help" />
                </div>
              </div>
            </div>

            {/* Create Button */}
            <button className="w-full bg-gradient-to-r from-red-500 to-pink-500 text-white py-3 px-6 rounded-lg font-medium flex items-center justify-center gap-2 hover:from-red-600 hover:to-pink-600 transition-all transform hover:scale-[1.02]">
              <Sparkles size={18} />
              Create
            </button>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 bg-gray-900 flex flex-col items-center justify-center">
          <div className="text-center">
            <div className="mb-8">
              {/* Vintage TV Illustration */}
              <div className="w-48 h-36 bg-gradient-to-br from-yellow-400 via-yellow-500 to-yellow-600 rounded-lg mx-auto mb-4 relative overflow-hidden shadow-2xl">
                {/* TV Screen */}
                <div className="absolute inset-2 bg-gray-800 rounded-md flex items-center justify-center">
                  <div className="w-20 h-20 bg-gray-600 rounded-full flex items-center justify-center">
                    <div className="w-12 h-12 bg-gray-400 rounded-full"></div>
                  </div>
                </div>
                
                {/* TV Controls */}
                <div className="absolute bottom-2 right-2 space-y-1">
                  <div className="w-6 h-6 bg-yellow-200 rounded-full shadow-inner"></div>
                  <div className="w-6 h-6 bg-yellow-200 rounded-full shadow-inner"></div>
                </div>
                
                {/* TV Stand */}
                <div className="absolute bottom-0 left-0 right-0 h-6 bg-yellow-600 rounded-b-lg"></div>
                
                {/* TV Legs */}
                <div className="absolute -bottom-2 left-8 w-4 h-4 bg-yellow-600 rounded-b-full"></div>
                <div className="absolute -bottom-2 right-8 w-4 h-4 bg-yellow-600 rounded-b-full"></div>
                
                {/* Shine Effect */}
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/20 via-transparent to-transparent rounded-lg"></div>
              </div>
            </div>
            
            <p className="text-gray-400 text-lg">Oops! It looks like you haven't created anything yet.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PolloAIInterface;
