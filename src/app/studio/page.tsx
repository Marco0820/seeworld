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
    id: 'wan-2.2-flash',
    name: 'Wan 2.2 Flash',
    description: 'Fast generation and better reliability',
    icon: '/icons/Group.svg'
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
    
    try {
      // Use the model ID directly as they are now consistent
      // No mapping needed since we've unified the model IDs

      const apiModelId = selectedModel.id;
      
      const requestData = {
        modelId: apiModelId,
        prompt: prompt || 'Convert this image to video',
        imageUrl: uploadedImage,
        duration: videoLength === '5s' ? 5 : 10,
        resolution: resolution === '1080P' ? '1080p' : resolution === '720P' ? '720p' : '480p',
        aspectRatio: '16:9',
        motionStrength: 5,
        seed: parseInt(seed) || undefined,
      };

      console.log('🎬 生成视频请求:', requestData);

      const response = await fetch('/api/video/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to generate video');
      }

      console.log('🎬 视频生成响应:', data);
      
      if (data.status === 'completed' && data.videoUrl) {
        setGeneratedContent(data.videoUrl);
      } else if (data.status === 'processing' || data.status === 'pending') {
        setGeneratedContent('processing');
        // Poll for completion
        pollForCompletion(data.id, getProviderForModel(apiModelId));
      } else {
        throw new Error(data.error || 'Video generation failed');
      }
    } catch (error) {
      console.error('视频生成错误:', error);
      alert(`Video generation failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
      setGeneratedContent(null);
    } finally {
      setIsGenerating(false);
    }
  };

  const getProviderForModel = (modelId: string): string => {
    const modelToProvider: Record<string, string> = {
      // Alibaba models
      'wan-2.2-flash': 'alibaba',
      'wan-2.2-plus': 'alibaba',
      'wanx-2.1': 'alibaba',
      
      // MiniMax models
      'hailuo-02': 'minimax',
      'hailuo': 'minimax',
      'hailuo-live2d': 'minimax',
      
      // Kling AI models
      'kling-2.1': 'kling',
      'kling-2.1-master': 'kling',
      'kling-2.0': 'kling',
      'kling-1.6': 'kling',
      'kling-1.5': 'kling',
      'kling-1.0': 'kling',
      
      // Google models
      'google-veo-3-fast': 'google',
      'google-veo-3': 'google',
      'google-veo-2': 'google_vertex',
      
      // ByteDance models
      'seedance-1.0-lite': 'volcengine',
      'seedance-1.0-pro': 'volcengine',
      
      // PixVerse models
      'pixverse-v4.5': 'pixverse',
      'pixverse-v4': 'pixverse',
      'pixverse-v3.5': 'pixverse',
      
      // Vidu models
      'vidu-q1': 'vidu',
      'vidu-2.0': 'vidu',
      
      // Runway models
      'runway-gen-4-turbo': 'runway',
      'runway-gen-3': 'runway',
      
      // Luma AI models
      'luma-ray-2': 'luma',
      'luma-ray-2-flash': 'luma',
      'luma-ray-1.6': 'luma',
      
      // Pika models
      'pika-2.2': 'pika',
      'pika-2.1': 'pika',
      
      // Tencent models
      'hunyuan': 'hunyuan',
    };
    
    return modelToProvider[modelId] || 'alibaba';
  };

  const pollForCompletion = async (id: string, provider: string) => {
    const pollInterval = setInterval(async () => {
      try {
        const response = await fetch(`/api/video/generate?id=${id}&provider=${provider}`);
        const data = await response.json();

        if (response.ok) {
          if (data.status === 'completed' && data.videoUrl) {
            setGeneratedContent(data.videoUrl);
            clearInterval(pollInterval);
          } else if (data.status === 'failed') {
            setGeneratedContent(null);
            alert('Video generation failed');
            clearInterval(pollInterval);
          }
        }
      } catch (error) {
        console.error('Polling error:', error);
      }
    }, 5000); // Poll every 5 seconds

    // Stop polling after 10 minutes
    setTimeout(() => {
      clearInterval(pollInterval);
    }, 600000);
  };

  const refreshSeed = () => {
    setSeed(Math.floor(Math.random() * 10000000000).toString());
  };

  // 模型数据
  const availableModels = [

    { id: 'wan-2.2-flash', name: 'Wan 2.2 Flash', description: 'Fast generation and better reliability', icon: '/icons/Group.svg', credits: 4 },
    { id: 'wan-2.2-plus', name: 'Wan 2.2 Plus', description: 'Stable fluid motion and lifelike dynamics', icon: '/icons/Group.svg', credits: 5 },
    { id: 'hailuo-02', name: 'Hailuo 02', description: 'Extreme physics simulations', icon: '/icons/com_logo_hailuo_3bc9b31a8a.png', credits: 5 },
    { id: 'kling-2.1', name: 'Kling 2.1', description: 'Enhanced visual realism and motion fluidity', icon: '/icons/com_logo_kling_1b6878741b.png', credits: 20 },
    { id: 'kling-2.1-master', name: 'Kling 2.1 Master', description: 'Enhanced visual realism and motion fluidity', icon: '/icons/com_logo_kling_1b6878741b.png', credits: 100 },
    { id: 'google-veo-3-fast', name: 'Google Veo 3 Fast', description: '30% Faster than standard Veo 3 model', icon: '/icons/com_logo_google_09_48f9ff99e2.png', credits: 150 },
    { id: 'google-veo-3', name: 'Google Veo 3', description: 'Realistic outputs with natural audio', icon: '/icons/com_logo_google_09_48f9ff99e2.png', credits: 280 },
    { id: 'seedance-1.0-lite', name: 'Seedance 1.0 Lite', description: 'Accurate motion and camera control', icon: '/icons/Pixel_Dance_c5db323079.png', credits: 5 },
    { id: 'seedance-1.0-pro', name: 'Seedance 1.0 Pro', description: 'Fluid, cohesive multi-shot video outputs', icon: '/icons/Pixel_Dance_c5db323079.png', credits: 15 },
    { id: 'pixverse-v4.5', name: 'Pixverse V4.5', description: 'Enhanced realism and camera motions', icon: '/icons/com_logo_pixverse_a93e08c3ac.png', credits: 10 },
    { id: 'vidu-q1', name: 'Vidu Q1', description: 'Precise control over video motion', icon: '/icons/com_logo_vidu_9166e0cac9.png', credits: 25 },
    { id: 'runway-gen-4-turbo', name: 'Runway Gen-4 Turbo', description: 'Efficient, consistent video creation', icon: '/icons/com_logo_runway_ad6a460300.png', credits: 40 },
    { id: 'luma-ray-2', name: 'Luma Ray 2', description: 'Large scale model for realistic visuals', icon: '/icons/com_logo_luma_8542d55fb5.png', credits: 60 },
    { id: 'luma-ray-2-flash', name: 'Luma Ray 2 Flash', description: 'Faster outputs with coherent motion', icon: '/icons/com_logo_luma_8542d55fb5.png', credits: 20 },
    { id: 'pika-2.2', name: 'Pika 2.2', description: 'Better transition and transformation', icon: '/icons/com_logo_pika_13fbdc24b9.png', credits: 30 },
    { id: 'kling-2.0', name: 'Kling 2.0', description: 'Better motion dynamics and aesthetics', icon: '/icons/com_logo_kling_1b6878741b.png', credits: 100 },
    { id: 'kling-1.6', name: 'Kling 1.6', description: 'More realistic motions', icon: '/icons/com_logo_kling_1b6878741b.png', credits: 20 },
    { id: 'pixverse-v4', name: 'Pixverse V4', description: 'Improved motion and coherence', icon: '/icons/com_logo_pixverse_a93e08c3ac.png', credits: 10 },
    { id: 'pixverse-v3.5', name: 'Pixverse V3.5', description: 'Improved motion and coherence', icon: '/icons/com_logo_pixverse_a93e08c3ac.png', credits: 10 },
    { id: 'google-veo-2', name: 'Google Veo 2', description: 'HD outputs with visually rich content', icon: '/icons/com_logo_google_09_48f9ff99e2.png', credits: 180 },
    { id: 'runway-gen-3', name: 'Runway Gen-3', description: 'Multimodal, professional model', icon: '/icons/com_logo_runway_ad6a460300.png', credits: 40 },
    { id: 'vidu-2.0', name: 'Vidu 2.0', description: 'Enhanced quality and speed', icon: '/icons/com_logo_vidu_9166e0cac9.png', credits: 10 },
    { id: 'hailuo', name: 'Hailuo', description: 'Highest video quality', icon: '/icons/com_logo_hailuo_3bc9b31a8a.png', credits: 35 },
    { id: 'luma-ray-1.6', name: 'Luma Ray 1.6', description: 'Realistic and detailed videos', icon: '/icons/com_logo_luma_8542d55fb5.png', credits: 60 },
    { id: 'wanx-2.1', name: 'Wanx 2.1', description: 'Alibaba\'s model with realistic outputs', icon: '/icons/Group.svg', credits: 20 },
    { id: 'hunyuan', name: 'Hunyuan', description: 'Tencent\'s 13B-parameter video model', icon: '/icons/com_logo_hunyuan_d9096a0de1.png', credits: 20 },
    { id: 'hailuo-live2d', name: 'Hailuo Live2D', description: 'Good for 2D animation', icon: '/icons/com_logo_hailuo_3bc9b31a8a.png', credits: 35 },
    { id: 'pika-2.1', name: 'Pika 2.1', description: 'Crystal-clear and immersive outputs', icon: '/icons/com_logo_pika_13fbdc24b9.png', credits: 60 },
    { id: 'kling-1.5', name: 'Kling 1.5', description: 'Suitable for complex scenes', icon: '/icons/com_logo_kling_1b6878741b.png', credits: 20 },
    { id: 'kling-1.0', name: 'Kling 1.0', description: 'Suitable for short videos', icon: '/icons/com_logo_kling_1b6878741b.png', credits: 10 },

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
            {generatedContent === 'processing' ? (
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
                <p style={{ color: 'white', fontWeight: 500, marginBottom: '10px' }}>Processing your video...</p>
                <p style={{ color: '#888', fontSize: '14px' }}>This may take several minutes depending on the model</p>
              </div>
            ) : generatedContent && generatedContent !== 'processing' ? (
              <div style={{ textAlign: 'center', maxWidth: '600px' }}>
                <h2 style={{ marginBottom: '20px', color: 'white' }}>🎉 Video Generated Successfully!</h2>
                {generatedContent.startsWith('http') || generatedContent.startsWith('data:') ? (
                  <video 
                    controls 
                    style={{
                      width: '100%',
                      maxWidth: '500px',
                      height: 'auto',
                      borderRadius: '12px',
                      marginBottom: '20px'
                    }}
                    src={generatedContent}
                  />
                ) : (
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
                )}
                <p style={{ color: '#888', marginBottom: '20px' }}>Your image-to-video conversion is complete!</p>
                <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
                  <button 
                    onClick={() => {
                      if (generatedContent.startsWith('http')) {
                        const link = document.createElement('a');
                        link.href = generatedContent;
                        link.download = 'generated-video.mp4';
                        document.body.appendChild(link);
                        link.click();
                        document.body.removeChild(link);
                      }
                    }}
                    style={{
                      backgroundColor: '#e74c3c',
                      color: 'white',
                      border: 'none',
                      padding: '12px 24px',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      fontWeight: 500
                    }}
                  >
                    📥 Download
                  </button>
                  <button 
                    onClick={() => setGeneratedContent(null)}
                    style={{
                      backgroundColor: '#404040',
                      color: 'white',
                      border: 'none',
                      padding: '12px 24px',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      fontWeight: 500
                    }}
                  >
                    🔄 Generate New
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