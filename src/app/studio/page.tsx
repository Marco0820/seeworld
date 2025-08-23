"use client";

import { useState, useEffect, useRef } from "react";

export default function StudioPage() {
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
  const [isModelDropdownOpen, setIsModelDropdownOpen] = useState(false);
  const [selectedModel, setSelectedModel] = useState({
    id: 'pollo-1.5',
    name: 'Pollo 1.5',
    description: 'better, faster and cheaper',
    icon: '/icons/com_logo_runway_ad6a460300.png'
  });
  const dropdownRef = useRef<HTMLDivElement>(null);

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
    
    // Simulate video generation
    console.log('🎬 生成视频使用模型:', selectedModel);
    setTimeout(() => {
      setGeneratedContent('video-generated');
      setIsGenerating(false);
    }, 3000);
  };

  const refreshSeed = () => {
    setSeed(Math.floor(Math.random() * 10000000000).toString());
  };

  // 模型数据
  const availableModels = [
    { id: 'pollo-1.5', name: 'Pollo 1.5', description: 'better, faster and cheaper', icon: '/icons/com_logo_runway_ad6a460300.png', credits: 1 },
    { id: 'runway-gen2', name: 'Runway AI', description: 'Professional video generation', icon: '/icons/com_logo_runway_ad6a460300.png', credits: 5 },
    { id: 'hailuo-minimax', name: 'Hailuo AI (MiniMax)', description: 'High-quality Chinese AI model', icon: '/icons/com_logo_hailuo_3bc9b31a8a.png', credits: 3 },
    { id: 'kling-ai', name: 'Kling AI', description: 'Advanced video synthesis', icon: '/icons/com_logo_kling_1b6878741b.png', credits: 4 },
    { id: 'luma-dream', name: 'Luma AI (Dream Machine)', description: 'Realistic video generation', icon: '/icons/com_logo_luma_8542d55fb5.png', credits: 6 },
    { id: 'pika-labs', name: 'Pika Art (Pika Labs)', description: 'Creative video effects', icon: '/icons/com_logo_pika_13fbdc24b9.png', credits: 4 },
    { id: 'haiper-ai', name: 'Haiper AI', description: 'Fast video processing', icon: '/icons/Haiper_d822de7449.png', credits: 3 },
    { id: 'vidu-studio', name: 'Vidu AI (Vidu Studio)', description: 'Professional editing suite', icon: '/icons/com_logo_vidu_9166e0cac9.png', credits: 5 },
    { id: 'sora-ai', name: 'Sora AI', description: 'OpenAI video model', icon: '/icons/com_logo_chatgpt_color_038b183785.png', credits: 8 },
    { id: 'pixverse-ai', name: 'PixVerse AI', description: 'Anime and cartoon style', icon: '/icons/com_logo_pixverse_a93e08c3ac.png', credits: 3 },
    { id: 'krea-ai', name: 'Krea AI', description: 'Real-time generation', icon: '/icons/Krea_32ae82db6b.png', credits: 4 },
    { id: 'veo-ai', name: 'Veo AI', description: 'Google AI video model', icon: '/icons/com_logo_google_09_48f9ff99e2.png', credits: 7 },
    { id: 'seedance-ai', name: 'Seedance AI (ByteDance)', description: 'ByteDance video AI', icon: '/icons/Pixel_Dance_c5db323079.png', credits: 5 },
    { id: 'video-ocean', name: 'Video Ocean', description: 'Advanced video synthesis', icon: '/icons/Video_Ocean_07bb9b5867.png', credits: 4 },
    { id: 'stable-video', name: 'Stable Video Diffusion', description: 'Stability AI video model', icon: '/icons/com_logo_stable_d43e452756.png', credits: 6 },
    { id: 'hunyuan-ai', name: 'Hunyuan AI (Tencent)', description: 'Tencent video AI', icon: '/icons/com_logo_hunyuan_d9096a0de1.png', credits: 4 },
    { id: 'wanx-ai', name: 'Wanx AI (Wan 2.1)', description: 'Alibaba video AI', icon: '/icons/Group.svg', credits: 3 },
    { id: 'midjourney-ai', name: 'Midjourney AI', description: 'Creative video generation', icon: '/icons/midjourney_icon_9a2abffe0b.png', credits: 7 }
  ];

  // 模型选择处理函数
  const handleModelSelect = (model: typeof availableModels[0]) => {
    setSelectedModel(model);
    setIsModelDropdownOpen(false);
  };

  const toggleModelDropdown = () => {
    setIsModelDropdownOpen(!isModelDropdownOpen);
  };

  // 点击外部关闭下拉菜单
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsModelDropdownOpen(false);
      }
    }

    if (isModelDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isModelDropdownOpen]);

  return (
    <div style={{
      margin: 0,
      padding: 0,
      boxSizing: 'border-box',
      backgroundColor: '#1a1a1a',
      color: '#ffffff',
      fontFamily: '-apple-system, BlinkMacSystemFont, \'Segoe UI\', Roboto, sans-serif',
      fontSize: '14px',
      overflow: 'hidden'
    }}>
      <div style={{ display: 'flex', height: '100vh' }}>
        {/* Header */}
        <header style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          height: '60px',
          backgroundColor: '#2d2d2d',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 20px',
          zIndex: 100,
          borderBottom: '1px solid #404040'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            <button style={{
              background: 'none',
              border: 'none',
              color: 'white',
              fontSize: '18px',
              cursor: 'pointer',
              padding: '5px'
            }}>☰</button>
            <div style={{ fontSize: '18px', fontWeight: 600, color: 'white' }}>Pollo.ai</div>
            <button style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              backgroundColor: '#404040',
              padding: '8px 12px',
              borderRadius: '6px',
              cursor: 'pointer',
              border: 'none',
              color: 'white'
            }}>
              Default Project
              <span>▼</span>
            </button>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            <div style={{
              backgroundColor: '#e74c3c',
              color: 'white',
              padding: '4px 8px',
              borderRadius: '12px',
              fontSize: '12px',
              fontWeight: 500
            }}>2 🔥</div>
            <div style={{
              width: '32px',
              height: '32px',
              background: 'linear-gradient(45deg, #667eea 0%, #764ba2 100%)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 600,
              fontSize: '12px'
            }}>S</div>
          </div>
        </header>

        {/* Sidebar */}
        <nav style={{
          width: '60px',
          backgroundColor: '#2d2d2d',
          paddingTop: '60px',
          borderRight: '1px solid #404040',
          display: 'flex',
          flexDirection: 'column',
          gap: '5px'
        }}>
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
            <a key={index} href="#" style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              padding: '15px 10px',
              cursor: 'pointer',
              borderRadius: '8px',
              margin: '0 8px',
              transition: 'background-color 0.2s',
              textDecoration: 'none',
              color: item.active ? 'white' : '#888',
              backgroundColor: item.active ? '#e74c3c' : 'transparent'
            }}>
              <div style={{ fontSize: '20px', marginBottom: '5px' }}>{item.icon}</div>
              <div style={{ fontSize: '10px', textAlign: 'center', lineHeight: 1.2 }}>{item.label}</div>
            </a>
          ))}
        </nav>

        {/* Main Content */}
        <main style={{ display: 'flex', flex: 1, paddingTop: '60px' }}>
          {/* Left Panel */}
          <div style={{
            width: '380px',
            backgroundColor: '#2d2d2d',
            padding: '20px',
            overflowY: 'auto',
            borderRight: '1px solid #404040'
          }}>
            <h1 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '20px', color: 'white' }}>
              Image to Video
            </h1>
            
            {/* Model Selection */}
            <div ref={dropdownRef} style={{ marginBottom: '25px', position: 'relative' }}>
              <label style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '10px',
                fontSize: '14px',
                fontWeight: 500,
                color: '#ccc'
              }}>Model</label>
              
              {/* 模型选择器按钮 */}
              <div 
                onClick={toggleModelDropdown}
                style={{
                  backgroundColor: '#404040',
                  border: '1px solid #555',
                  borderRadius: '8px',
                  padding: '12px',
                  color: 'white',
                  width: '100%',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  transition: 'border-color 0.2s'
                }}
                onMouseEnter={(e) => e.currentTarget.style.borderColor = '#666'}
                onMouseLeave={(e) => e.currentTarget.style.borderColor = '#555'}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{
                    width: '24px',
                    height: '24px',
                    borderRadius: '4px',
                    overflow: 'hidden',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: '#666'
                  }}>
                    <img 
                      src={selectedModel.icon} 
                      alt={selectedModel.name}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                        const parent = target.parentElement;
                        if (parent) {
                          parent.innerHTML = `<div style="width: 100%; height: 100%; background: linear-gradient(45deg, #667eea 0%, #764ba2 100%); display: flex; align-items: center; justify-content: center; font-weight: 600; font-size: 12px; color: white;">${selectedModel.name.charAt(0)}</div>`;
                        }
                      }}
                    />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <div style={{ fontSize: '14px', fontWeight: 500 }}>{selectedModel.name}</div>
                    <div style={{ fontSize: '12px', color: '#888' }}>{selectedModel.description}</div>
                  </div>
                </div>
                <span style={{ transform: isModelDropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }}>▼</span>
              </div>

              {/* 下拉菜单 */}
              {isModelDropdownOpen && (
                <div style={{
                  position: 'absolute',
                  top: '100%',
                  left: 0,
                  right: 0,
                  backgroundColor: '#404040',
                  border: '1px solid #555',
                  borderRadius: '8px',
                  marginTop: '4px',
                  zIndex: 200,
                  maxHeight: '300px',
                  overflowY: 'auto',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.3)'
                }}>
                  {availableModels.map((model) => (
                    <div
                      key={model.id}
                      onClick={() => handleModelSelect(model)}
                      style={{
                        padding: '12px',
                        cursor: 'pointer',
                        borderBottom: '1px solid #555',
                        transition: 'background-color 0.2s',
                        backgroundColor: selectedModel.id === model.id ? '#4a2d2d' : 'transparent'
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#4a4a4a'}
                      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = selectedModel.id === model.id ? '#4a2d2d' : 'transparent'}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <div style={{
                          width: '24px',
                          height: '24px',
                          borderRadius: '4px',
                          overflow: 'hidden',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          backgroundColor: '#666'
                        }}>
                          <img 
                            src={model.icon} 
                            alt={model.name}
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.style.display = 'none';
                              const parent = target.parentElement;
                              if (parent) {
                                parent.innerHTML = `<div style="width: 100%; height: 100%; background: linear-gradient(45deg, #667eea 0%, #764ba2 100%); display: flex; align-items: center; justify-content: center; font-weight: 600; font-size: 10px; color: white;">${model.name.charAt(0)}</div>`;
                              }
                            }}
                          />
                        </div>
                        <div style={{ flex: 1 }}>
                          <div style={{ fontSize: '13px', fontWeight: 500, color: 'white', marginBottom: '2px' }}>
                            {model.name}
                          </div>
                          <div style={{ fontSize: '11px', color: '#888' }}>
                            {model.description}
                          </div>
                          <div style={{ fontSize: '11px', color: '#e74c3c', marginTop: '2px' }}>
                            🔥 {model.credits} credits
                          </div>
                        </div>
                        {selectedModel.id === model.id && (
                          <div style={{ width: '8px', height: '8px', backgroundColor: '#e74c3c', borderRadius: '50%' }}></div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Image Upload */}
            <div style={{ marginBottom: '25px' }}>
              <label style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '10px',
                fontSize: '14px',
                fontWeight: 500,
                color: '#ccc'
              }}>
                Image
                <div style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '12px', color: '#ccc' }}>
                  Add end frame
                  <div
                    onClick={() => setAddEndFrame(!addEndFrame)}
                    style={{
                      width: '36px',
                      height: '20px',
                      backgroundColor: addEndFrame ? '#e74c3c' : '#555',
                      borderRadius: '10px',
                      position: 'relative',
                      cursor: 'pointer',
                      transition: 'background-color 0.3s'
                    }}
                  >
                    <div style={{
                      width: '16px',
                      height: '16px',
                      backgroundColor: 'white',
                      borderRadius: '50%',
                      position: 'absolute',
                      top: '2px',
                      left: addEndFrame ? '18px' : '2px',
                      transition: 'transform 0.3s'
                    }}></div>
                  </div>
                </div>
              </label>
              
              {addEndFrame ? (
                /* Dual Image Upload */
                <div style={{ display: 'flex', gap: '10px' }}>
                  {/* Start Frame */}
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '12px', color: '#888', marginBottom: '5px', textAlign: 'center' }}>Upload the start frame image</div>
                    <div
                      onClick={() => document.getElementById('startImageInput')?.click()}
                      style={{
                        backgroundColor: '#404040',
                        border: '2px dashed #666',
                        borderRadius: '8px',
                        height: '150px',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                        position: 'relative'
                      }}
                    >
                      <input
                        type="file"
                        id="startImageInput"
                        accept="image/*"
                        style={{ display: 'none' }}
                        onChange={handleImageUpload}
                      />
                      {uploadedImage ? (
                        <img src={uploadedImage} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '6px' }} alt="Start frame" />
                      ) : (
                        <>
                          <div style={{ fontSize: '32px', color: '#666', marginBottom: '5px' }}>📷</div>
                          <div style={{ color: '#888', fontSize: '12px' }}>Start frame</div>
                        </>
                      )}
                    </div>
                  </div>
                  
                  {/* End Frame */}
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '12px', color: '#888', marginBottom: '5px', textAlign: 'center' }}>Upload the end frame image</div>
                    <div
                      onClick={() => document.getElementById('endImageInput')?.click()}
                      style={{
                        backgroundColor: '#404040',
                        border: '2px dashed #666',
                        borderRadius: '8px',
                        height: '150px',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                        position: 'relative'
                      }}
                    >
                      <input
                        type="file"
                        id="endImageInput"
                        accept="image/*"
                        style={{ display: 'none' }}
                        onChange={handleEndImageUpload}
                      />
                      {uploadedEndImage ? (
                        <img src={uploadedEndImage} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '6px' }} alt="End frame" />
                      ) : (
                        <>
                          <div style={{ fontSize: '32px', color: '#666', marginBottom: '5px' }}>🖼️</div>
                          <div style={{ color: '#888', fontSize: '12px' }}>End frame</div>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                /* Single Image Upload */
                <div
                  onClick={() => document.getElementById('imageInput')?.click()}
                  style={{
                    backgroundColor: '#404040',
                    border: '2px dashed #666',
                    borderRadius: '8px',
                    height: '200px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    position: 'relative'
                  }}
                >
                  <input
                    type="file"
                    id="imageInput"
                    accept="image/*"
                    style={{ display: 'none' }}
                    onChange={handleImageUpload}
                  />
                  {uploadedImage ? (
                    <img src={uploadedImage} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '6px' }} alt="Uploaded image" />
                  ) : (
                    <>
                      <div style={{ fontSize: '48px', color: '#666', marginBottom: '10px' }}>📷</div>
                      <div style={{ color: '#888', fontSize: '14px' }}>Click to upload an image</div>
                      <div style={{ fontSize: '12px', color: '#666', marginTop: '8px', textAlign: 'center' }}>
                        Upload JPG/PNG/WEBP images up to 10MB, with a minimum width/height of 300px.
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>

            {/* Prompt */}
            <div style={{ marginBottom: '25px' }}>
              <label style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '10px',
                fontSize: '14px',
                fontWeight: 500,
                color: '#ccc'
              }}>
                Prompt <span style={{ color: '#666' }}>(Optional)</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '12px', color: '#ccc' }}>
                  Translate Prompt
                  <div
                    onClick={() => setTranslatePrompt(!translatePrompt)}
                    style={{
                      width: '36px',
                      height: '20px',
                      backgroundColor: translatePrompt ? '#e74c3c' : '#555',
                      borderRadius: '10px',
                      position: 'relative',
                      cursor: 'pointer',
                      transition: 'background-color 0.3s'
                    }}
                  >
                    <div style={{
                      width: '16px',
                      height: '16px',
                      backgroundColor: 'white',
                      borderRadius: '50%',
                      position: 'absolute',
                      top: '2px',
                      left: translatePrompt ? '18px' : '2px',
                      transition: 'transform 0.3s'
                    }}></div>
                  </div>
                </div>
              </label>
              
              {/* Translation Hint */}
              {translatePrompt && (
                <div style={{
                  backgroundColor: '#2a4d3a',
                  border: '1px solid #4ade80',
                  borderRadius: '6px',
                  padding: '10px',
                  marginBottom: '10px',
                  fontSize: '12px',
                  color: '#4ade80',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}>
                  <span>ℹ️</span>
                  For better results, enable this option to translate your prompt to English.
                </div>
              )}
              
              <textarea
                style={{
                  backgroundColor: '#404040',
                  border: '1px solid #555',
                  borderRadius: '8px',
                  padding: '12px',
                  color: 'white',
                  width: '100%',
                  minHeight: '80px',
                  resize: 'vertical',
                  fontFamily: 'inherit',
                  fontSize: '14px'
                }}
                placeholder="What do you want to create with this image?"
                maxLength={1000}
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '8px' }}>
                <button style={{
                  background: 'none',
                  border: 'none',
                  color: '#888',
                  cursor: 'pointer',
                  fontSize: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '5px'
                }}>
                  ✨ Generate with AI
                </button>
                <span style={{ fontSize: '12px', color: '#666' }}>{prompt.length} / 1000</span>
              </div>
            </div>

            {/* Advanced Section */}
            <div style={{ borderTop: '1px solid #404040', paddingTop: '20px' }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                cursor: 'pointer',
                padding: '10px 0'
              }}>
                <span style={{ fontSize: '16px', fontWeight: 500 }}>Advanced</span>
                <span>▼</span>
              </div>
              
              <div>
                {/* Mode Selection */}
                <div style={{ marginBottom: '20px' }}>
                  <div style={{ fontSize: '14px', fontWeight: 500, marginBottom: '10px', color: '#ccc' }}>Mode</div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {[
                      { id: 'basic', name: 'Basic', description: 'Fast generation with standard quality', thumbnail: '#f4a261' },
                      { id: 'pro', name: 'Pro', description: 'Professional, cinema-quality output', thumbnail: '#64b5f6' }
                    ].map((mode) => (
                      <div
                        key={mode.id}
                        onClick={() => setSelectedMode(mode.id as 'basic' | 'pro')}
                        style={{
                          backgroundColor: selectedMode === mode.id ? '#4a2d2d' : '#404040',
                          border: selectedMode === mode.id ? '1px solid #e74c3c' : '1px solid #555',
                          borderRadius: '8px',
                          padding: '12px',
                          cursor: 'pointer',
                          transition: 'all 0.3s ease'
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <div style={{
                              width: '40px',
                              height: '30px',
                              borderRadius: '4px',
                              backgroundColor: mode.thumbnail
                            }}></div>
                            <div>
                              <h4 style={{ fontSize: '14px', fontWeight: 500, marginBottom: '2px' }}>{mode.name}</h4>
                              <p style={{ fontSize: '12px', color: '#888' }}>{mode.description}</p>
                            </div>
                          </div>
                          <div style={{
                            width: '20px',
                            height: '20px',
                            borderRadius: '50%',
                            border: selectedMode === mode.id ? '2px solid #e74c3c' : '2px solid #666',
                            backgroundColor: selectedMode === mode.id ? '#e74c3c' : 'transparent',
                            position: 'relative'
                          }}>
                            {selectedMode === mode.id && (
                              <div style={{
                                width: '6px',
                                height: '6px',
                                backgroundColor: 'white',
                                borderRadius: '50%',
                                position: 'absolute',
                                top: '50%',
                                left: '50%',
                                transform: 'translate(-50%, -50%)'
                              }}></div>
                            )}
                          </div>
                        </div>
                        {mode.id === 'pro' && (
                          <div style={{ fontSize: '12px', color: '#e74c3c', marginTop: '8px' }}>
                            🔥 Credits required: 5 ℹ️
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Generate Audio */}
                <div style={{ marginBottom: '20px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ fontSize: '14px', fontWeight: 500, color: '#ccc', display: 'flex', alignItems: 'center', gap: '8px' }}>
                      Generate Audio
                      <div style={{
                        width: '16px',
                        height: '16px',
                        borderRadius: '50%',
                        backgroundColor: '#666',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '10px',
                        cursor: 'help'
                      }}>ℹ️</div>
                    </div>
                    <div
                      onClick={() => setGenerateAudio(!generateAudio)}
                      style={{
                        width: '36px',
                        height: '20px',
                        backgroundColor: generateAudio ? '#e74c3c' : '#555',
                        borderRadius: '10px',
                        position: 'relative',
                        cursor: 'pointer',
                        transition: 'background-color 0.3s'
                      }}
                    >
                      <div style={{
                        width: '16px',
                        height: '16px',
                        backgroundColor: 'white',
                        borderRadius: '50%',
                        position: 'absolute',
                        top: '2px',
                        left: generateAudio ? '18px' : '2px',
                        transition: 'transform 0.3s'
                      }}></div>
                    </div>
                  </div>
                </div>

                {/* Video Length */}
                <div style={{ marginBottom: '20px' }}>
                  <div style={{ fontSize: '14px', fontWeight: 500, marginBottom: '10px', color: '#ccc' }}>Video Length</div>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    {['5s', '10s'].map((length) => (
                      <button
                        key={length}
                        onClick={() => setVideoLength(length as '5s' | '10s')}
                        style={{
                          padding: '8px 16px',
                          borderRadius: '6px',
                          border: '1px solid #555',
                          backgroundColor: videoLength === length ? '#e74c3c' : '#404040',
                          color: 'white',
                          cursor: 'pointer',
                          fontSize: '12px',
                          transition: 'all 0.3s ease'
                        }}
                      >
                        {length}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Resolution */}
                <div style={{ marginBottom: '20px' }}>
                  <div style={{ fontSize: '14px', fontWeight: 500, marginBottom: '10px', color: '#ccc', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    Resolution
                    <div style={{
                      width: '16px',
                      height: '16px',
                      borderRadius: '50%',
                      backgroundColor: '#666',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '10px',
                      cursor: 'help'
                    }}>ℹ️</div>
                  </div>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    {['480P', '720P', '1080P'].map((res) => (
                      <button
                        key={res}
                        onClick={() => setResolution(res as '480P' | '720P' | '1080P')}
                        style={{
                          flex: 1,
                          padding: '10px',
                          textAlign: 'center',
                          borderRadius: '6px',
                          border: '1px solid #555',
                          backgroundColor: resolution === res ? '#e74c3c' : '#404040',
                          color: 'white',
                          cursor: 'pointer',
                          fontSize: '12px',
                          transition: 'all 0.3s ease'
                        }}
                      >
                        {res}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Seed */}
                <div style={{ marginBottom: '20px' }}>
                  <div style={{ fontSize: '14px', fontWeight: 500, marginBottom: '10px', color: '#ccc', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    Seed
                    <div style={{
                      width: '16px',
                      height: '16px',
                      borderRadius: '50%',
                      backgroundColor: '#666',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '10px',
                      cursor: 'help'
                    }}>ℹ️</div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flex: 1 }}>
                      <span style={{ fontSize: '16px' }}>🔒</span>
                      <input
                        type="text"
                        style={{
                          flex: 1,
                          backgroundColor: '#404040',
                          border: '1px solid #555',
                          borderRadius: '6px',
                          padding: '8px 12px',
                          color: 'white',
                          fontSize: '12px'
                        }}
                        value={seed}
                        readOnly
                      />
                    </div>
                    <button
                      onClick={refreshSeed}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: '#888',
                        cursor: 'pointer',
                        fontSize: '16px',
                        padding: '4px'
                      }}
                    >
                      🔄
                    </button>
                  </div>
                </div>

                {/* Output Video Number */}
                <div style={{ marginBottom: '20px' }}>
                  <div style={{ fontSize: '14px', fontWeight: 500, marginBottom: '10px', color: '#ccc' }}>Output Video Number</div>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    {[1, 2, 3, 4].map((num) => (
                      <button
                        key={num}
                        onClick={() => setOutputNumber(num as 1 | 2 | 3 | 4)}
                        style={{
                          width: '40px',
                          height: '32px',
                          borderRadius: '6px',
                          border: '1px solid #555',
                          backgroundColor: outputNumber === num ? '#e74c3c' : '#404040',
                          color: 'white',
                          cursor: 'pointer',
                          fontSize: '12px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          transition: 'all 0.3s ease'
                        }}
                      >
                        {num}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Public Visibility */}
                <div style={{ marginBottom: '20px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ fontSize: '14px', fontWeight: 500, color: '#ccc', display: 'flex', alignItems: 'center', gap: '8px' }}>
                      Public Visibility
                      <div style={{
                        width: '16px',
                        height: '16px',
                        borderRadius: '50%',
                        backgroundColor: '#666',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '10px',
                        cursor: 'help'
                      }}>ℹ️</div>
                    </div>
                    <div
                      onClick={() => setPublicVisibility(!publicVisibility)}
                      style={{
                        width: '36px',
                        height: '20px',
                        backgroundColor: publicVisibility ? '#e74c3c' : '#555',
                        borderRadius: '10px',
                        position: 'relative',
                        cursor: 'pointer',
                        transition: 'background-color 0.3s'
                      }}
                    >
                      <div style={{
                        width: '16px',
                        height: '16px',
                        backgroundColor: 'white',
                        borderRadius: '50%',
                        position: 'absolute',
                        top: '2px',
                        left: publicVisibility ? '18px' : '2px',
                        transition: 'transform 0.3s'
                      }}></div>
                    </div>
                  </div>
                </div>

                {/* Copy Protection */}
                <div style={{ marginBottom: '20px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ fontSize: '14px', fontWeight: 500, color: '#ccc', display: 'flex', alignItems: 'center', gap: '8px' }}>
                      Copy Protection
                      <div style={{
                        width: '16px',
                        height: '16px',
                        borderRadius: '50%',
                        backgroundColor: '#666',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '10px',
                        cursor: 'help'
                      }}>ℹ️</div>
                    </div>
                    <div
                      onClick={() => setCopyProtection(!copyProtection)}
                      style={{
                        width: '36px',
                        height: '20px',
                        backgroundColor: copyProtection ? '#e74c3c' : '#555',
                        borderRadius: '10px',
                        position: 'relative',
                        cursor: 'pointer',
                        transition: 'background-color 0.3s'
                      }}
                    >
                      <div style={{
                        width: '16px',
                        height: '16px',
                        backgroundColor: 'white',
                        borderRadius: '50%',
                        position: 'absolute',
                        top: '2px',
                        left: copyProtection ? '18px' : '2px',
                        transition: 'transform 0.3s'
                      }}></div>
                    </div>
                  </div>
                </div>

                <div style={{ fontSize: '12px', color: '#e74c3c', marginTop: '20px', display: 'flex', alignItems: 'center', gap: '5px' }}>
                  🔥 Credits required: 5 ℹ️
                </div>
              </div>
            </div>

            {/* Create Button */}
            <button
              onClick={handleCreate}
              disabled={!uploadedImage || isGenerating}
              style={{
                width: '100%',
                backgroundColor: (!uploadedImage || isGenerating) ? '#404040' : '#e74c3c',
                color: (!uploadedImage || isGenerating) ? '#666' : 'white',
                border: 'none',
                borderRadius: '8px',
                padding: '15px',
                fontSize: '14px',
                fontWeight: 500,
                cursor: (!uploadedImage || isGenerating) ? 'not-allowed' : 'pointer',
                marginTop: '20px'
              }}
            >
              {isGenerating ? '⏳ Creating...' : '🎬 Create'}
            </button>
          </div>

          {/* Right Panel */}
          <div style={{
            flex: 1,
            backgroundColor: '#1a1a1a',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '40px'
          }}>
            {generatedContent ? (
              <div style={{ textAlign: 'center', maxWidth: '600px' }}>
                <h2 style={{ marginBottom: '20px', color: 'white' }}>🎉 Video Generated Successfully!</h2>
                <div style={{
                  width: '400px',
                  height: '300px',
                  background: 'linear-gradient(45deg, #667eea 0%, #764ba2 100%)',
                  borderRadius: '12px',
                  margin: '0 auto 20px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '48px'
                }}>
                  🎬
                </div>
                <p style={{ color: '#888', marginBottom: '20px' }}>Your image-to-video conversion is complete!</p>
                <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
                  <button style={{
                    backgroundColor: '#e74c3c',
                    color: 'white',
                    border: 'none',
                    padding: '12px 24px',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    fontWeight: 500
                  }}>
                    📥 Download
                  </button>
                  <button style={{
                    backgroundColor: '#404040',
                    color: 'white',
                    border: 'none',
                    padding: '12px 24px',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    fontWeight: 500
                  }}>
                    📤 Share
                  </button>
                </div>
              </div>
            ) : isGenerating ? (
              <div style={{ textAlign: 'center' }}>
                <div style={{
                  width: '60px',
                  height: '60px',
                  border: '4px solid #e74c3c',
                  borderTop: '4px solid transparent',
                  borderRadius: '50%',
                  animation: 'spin 1s linear infinite',
                  margin: '0 auto 20px'
                }}></div>
                <p style={{ color: 'white', fontWeight: 500, marginBottom: '10px' }}>Creating your content...</p>
                <p style={{ color: '#888', fontSize: '14px' }}>This may take a few moments</p>
              </div>
            ) : (
              <div style={{ textAlign: 'center', maxWidth: '400px' }}>
                <div style={{
                  width: '200px',
                  height: '140px',
                  background: 'linear-gradient(45deg, #2d4a22 0%, #4a5a3a 100%)',
                  borderRadius: '20px',
                  margin: '0 auto 30px',
                  position: 'relative',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.3)'
                }}>
                  <div style={{
                    position: 'absolute',
                    top: '15px',
                    left: '15px',
                    right: '40px',
                    bottom: '25px',
                    backgroundColor: '#000',
                    borderRadius: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    overflow: 'hidden'
                  }}>
                    <div style={{
                      width: '60px',
                      height: '60px',
                      borderRadius: '50%',
                      backgroundColor: '#666',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '24px'
                    }}>🦝</div>
                  </div>
                  <div style={{
                    position: 'absolute',
                    right: '8px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '8px'
                  }}>
                    <div style={{
                      width: '20px',
                      height: '20px',
                      borderRadius: '50%',
                      background: 'linear-gradient(45deg, #666 0%, #888 100%)',
                      border: '2px solid #444'
                    }}></div>
                    <div style={{
                      width: '20px',
                      height: '20px',
                      borderRadius: '50%',
                      background: 'linear-gradient(45deg, #666 0%, #888 100%)',
                      border: '2px solid #444'
                    }}></div>
                  </div>
                </div>
                <div style={{ fontSize: '16px', color: '#888', marginTop: '10px' }}>
                  Oops! It looks like you haven't created anything yet.
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
      
      <style jsx global>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}