"use client";

import { useState } from "react";
import ModelSelector, { AIModel, AI_MODELS } from "@/components/ui/model-selector";

export default function StudioPageUpdated() {
  // 现有状态
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [uploadedEndImage, setUploadedEndImage] = useState<string | null>(null);
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedContent, setGeneratedContent] = useState<string | null>(null);
  const [selectedMode, setSelectedMode] = useState<'basic' | 'pro'>('basic');
  const [videoLength, setVideoLength] = useState<'5s' | '10s'>('5s');
  const [resolution, setResolution] = useState<'480P' | '720P' | '1080P'>('480P');
  const [outputNumber, setOutputNumber] = useState<1 | 2 | 3 | 4>(1);
  const [generateAudio, setGenerateAudio] = useState(true);
  const [publicVisibility, setPublicVisibility] = useState(true);
  const [copyProtection, setCopyProtection] = useState(false);
  const [addEndFrame, setAddEndFrame] = useState(false);
  const [translatePrompt, setTranslatePrompt] = useState(false);
  const [seed, setSeed] = useState('2094375205');

  // 新增：模型选择状态
  const [selectedModel, setSelectedModel] = useState<AIModel>(AI_MODELS[0]);

  // 现有函数
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEndImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedEndImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCreate = async () => {
    if (!uploadedImage) {
      alert('Please upload an image first');
      return;
    }

    setIsGenerating(true);
    
    // 模拟视频生成，包含选择的模型信息
    console.log('生成视频使用模型:', selectedModel);
    
    setTimeout(() => {
      setGeneratedContent('video-generated');
      setIsGenerating(false);
    }, 3000);
  };

  const refreshSeed = () => {
    setSeed(Math.floor(Math.random() * 10000000000).toString());
  };

  // 新增：模型选择处理函数
  const handleModelSelect = (model: AIModel) => {
    setSelectedModel(model);
    console.log('选择的模型:', model);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white font-sans">
      <div className="flex h-screen">
        {/* Header */}
        <header className="fixed top-0 left-0 right-0 h-15 bg-gray-800 flex items-center justify-between px-5 z-50 border-b border-gray-700">
          <div className="flex items-center gap-4">
            <button className="bg-transparent border-none text-white text-lg cursor-pointer p-1 hover:bg-gray-700 rounded">
              ☰
            </button>
            <div className="text-lg font-semibold text-white">Pollo.ai</div>
            <button className="flex items-center gap-2 bg-gray-700 px-3 py-2 rounded-md cursor-pointer border-none text-white hover:bg-gray-600 transition-colors">
              Default Project
              <span>▼</span>
            </button>
          </div>
          <div className="flex items-center gap-4">
            <div className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-medium">
              2 🔥
            </div>
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center font-semibold text-xs">
              S
            </div>
          </div>
        </header>

        {/* Sidebar */}
        <nav className="w-15 bg-gray-800 pt-15 border-r border-gray-700 flex flex-col gap-1">
          {[
            { icon: '🏠', label: 'Img2Vid', active: true },
            { icon: '🎬', label: 'Txt2Vid', active: false },
            { icon: '👤', label: 'AI Avatar', active: false },
            { icon: '🎭', label: 'Motion', active: false },
            { icon: '🎯', label: 'Consistent', active: false },
            { icon: '📹', label: 'Vid2Vid', active: false },
            { icon: '✨', label: 'Animation', active: false },
            { icon: '💡', label: 'Inspiration', active: false },
            { icon: '⚡', label: 'Effects', active: false },
            { icon: '🛠', label: 'AI Tools', active: false }
          ].map((item, index) => (
            <a
              key={index}
              href="#"
              className={`flex flex-col items-center p-3 cursor-pointer rounded-lg mx-2 transition-colors no-underline ${
                item.active 
                  ? 'text-white bg-red-500' 
                  : 'text-gray-400 hover:text-white hover:bg-gray-700'
              }`}
            >
              <div className="text-lg mb-1">{item.icon}</div>
              <div className="text-[10px] text-center leading-tight">{item.label}</div>
            </a>
          ))}
        </nav>

        {/* Main Content */}
        <main className="flex flex-1 pt-15">
          {/* Left Panel */}
          <div className="w-96 bg-gray-800 p-5 overflow-y-auto border-r border-gray-700">
            <h1 className="text-lg font-semibold mb-5 text-white">
              Image to Video
            </h1>
            
            {/* Model Selection - 新的交互式组件 */}
            <div className="mb-6">
              <label className="flex items-center justify-between mb-2 text-sm font-medium text-gray-300">
                Model
              </label>
              <ModelSelector
                selectedModel={selectedModel}
                onModelSelect={handleModelSelect}
                className="w-full"
              />
            </div>

            {/* 其余内容保持不变，但使用Tailwind类名 */}
            {/* Image Upload */}
            <div className="mb-6">
              <label className="flex items-center justify-between mb-2 text-sm font-medium text-gray-300">
                Image
                <div className="flex items-center gap-1 text-xs text-gray-300">
                  Add end frame
                  <button
                    onClick={() => setAddEndFrame(!addEndFrame)}
                    className={`w-9 h-5 rounded-full relative cursor-pointer transition-colors ${
                      addEndFrame ? 'bg-red-500' : 'bg-gray-600'
                    }`}
                  >
                    <div
                      className={`w-4 h-4 bg-white rounded-full absolute top-0.5 transition-transform ${
                        addEndFrame ? 'translate-x-4' : 'translate-x-0.5'
                      }`}
                    />
                  </button>
                </div>
              </label>
              
              {addEndFrame ? (
                /* Dual Image Upload */
                <div className="flex gap-2">
                  {/* Start Frame */}
                  <div className="flex-1">
                    <div className="text-xs text-gray-400 mb-1 text-center">Upload the start frame image</div>
                    <div
                      onClick={() => document.getElementById('startImageInput')?.click()}
                      className="bg-gray-700 border-2 border-dashed border-gray-600 rounded-lg h-36 flex flex-col items-center justify-center cursor-pointer hover:border-gray-500 transition-colors relative"
                    >
                      <input
                        type="file"
                        id="startImageInput"
                        accept="image/*"
                        className="hidden"
                        onChange={handleImageUpload}
                      />
                      {uploadedImage ? (
                        <img src={uploadedImage} className="w-full h-full object-cover rounded-md" alt="Start frame" />
                      ) : (
                        <>
                          <div className="text-3xl text-gray-500 mb-1">📷</div>
                          <div className="text-gray-400 text-xs">Start frame</div>
                        </>
                      )}
                    </div>
                  </div>
                  
                  {/* End Frame */}
                  <div className="flex-1">
                    <div className="text-xs text-gray-400 mb-1 text-center">Upload the end frame image</div>
                    <div
                      onClick={() => document.getElementById('endImageInput')?.click()}
                      className="bg-gray-700 border-2 border-dashed border-gray-600 rounded-lg h-36 flex flex-col items-center justify-center cursor-pointer hover:border-gray-500 transition-colors relative"
                    >
                      <input
                        type="file"
                        id="endImageInput"
                        accept="image/*"
                        className="hidden"
                        onChange={handleEndImageUpload}
                      />
                      {uploadedEndImage ? (
                        <img src={uploadedEndImage} className="w-full h-full object-cover rounded-md" alt="End frame" />
                      ) : (
                        <>
                          <div className="text-3xl text-gray-500 mb-1">🖼️</div>
                          <div className="text-gray-400 text-xs">End frame</div>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                /* Single Image Upload */
                <div
                  onClick={() => document.getElementById('imageInput')?.click()}
                  className="bg-gray-700 border-2 border-dashed border-gray-600 rounded-lg h-48 flex flex-col items-center justify-center cursor-pointer hover:border-gray-500 transition-colors relative"
                >
                  <input
                    type="file"
                    id="imageInput"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageUpload}
                  />
                  {uploadedImage ? (
                    <img src={uploadedImage} className="w-full h-full object-cover rounded-md" alt="Uploaded image" />
                  ) : (
                    <>
                      <div className="text-5xl text-gray-500 mb-2">📷</div>
                      <div className="text-gray-400 text-sm">Click to upload an image</div>
                      <div className="text-xs text-gray-500 mt-2 text-center max-w-xs">
                        Upload JPG/PNG/WEBP images up to 10MB, with a minimum width/height of 300px.
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>

            {/* Create Button */}
            <button
              onClick={handleCreate}
              disabled={!uploadedImage || isGenerating}
              className={`w-full border-none rounded-lg p-4 text-sm font-medium mt-5 transition-all ${
                (!uploadedImage || isGenerating)
                  ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                  : 'bg-red-500 text-white cursor-pointer hover:bg-red-600'
              }`}
            >
              {isGenerating ? '⏳ Creating...' : '🎬 Create'}
            </button>
          </div>

          {/* Right Panel */}
          <div className="flex-1 bg-gray-900 flex flex-col items-center justify-center p-10">
            {generatedContent ? (
              <div className="text-center max-w-2xl">
                <h2 className="mb-5 text-white text-xl">🎉 Video Generated Successfully!</h2>
                <div className="w-96 h-72 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl mx-auto mb-5 flex items-center justify-center text-5xl">
                  🎬
                </div>
                <p className="text-gray-400 mb-5">Your image-to-video conversion is complete!</p>
                <div className="flex gap-3 justify-center">
                  <button className="bg-red-500 text-white border-none px-6 py-3 rounded-md cursor-pointer font-medium hover:bg-red-600 transition-colors">
                    📥 Download
                  </button>
                  <button className="bg-gray-700 text-white border-none px-6 py-3 rounded-md cursor-pointer font-medium hover:bg-gray-600 transition-colors">
                    📤 Share
                  </button>
                </div>
              </div>
            ) : isGenerating ? (
              <div className="text-center">
                <div className="w-15 h-15 border-4 border-red-500 border-t-transparent rounded-full animate-spin mx-auto mb-5" />
                <p className="text-white font-medium mb-2">Creating your content...</p>
                <p className="text-gray-400 text-sm">This may take a few moments</p>
              </div>
            ) : (
              <div className="text-center max-w-sm">
                <div className="w-48 h-32 bg-gradient-to-br from-green-800 to-green-600 rounded-2xl mx-auto mb-7 relative shadow-2xl">
                  <div className="absolute inset-4 right-10 bottom-6 bg-black rounded-lg flex items-center justify-center overflow-hidden">
                    <div className="w-15 h-15 rounded-full bg-gray-600 flex items-center justify-center text-2xl">
                      🦝
                    </div>
                  </div>
                  <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex flex-col gap-2">
                    <div className="w-5 h-5 rounded-full bg-gradient-to-br from-gray-500 to-gray-700 border-2 border-gray-800" />
                    <div className="w-5 h-5 rounded-full bg-gradient-to-br from-gray-500 to-gray-700 border-2 border-gray-800" />
                  </div>
                </div>
                <div className="text-gray-400 text-base">
                  Oops! It looks like you haven't created anything yet.
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
