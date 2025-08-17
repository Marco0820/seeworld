"use client";

import { useState, useRef, useEffect } from "react";
import { Play, Pause } from "lucide-react";

export default function Hero() {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);
  const [userInteracted, setUserInteracted] = useState(false);
  const [selectedFeature, setSelectedFeature] = useState<number | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      // Ensure video is muted to allow autoplay
      video.muted = true;
      video.volume = 0;
      
      // Try to play the video
      const playPromise = video.play();
      
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            // Autoplay successful
            setIsPlaying(true);
          })
          .catch(() => {
            // Autoplay blocked, set to paused state
            setIsPlaying(false);
          });
      }
    }
  }, []);

  const togglePlayPause = () => {
    const video = videoRef.current;
    if (video) {
      if (isPlaying) {
        video.pause();
      } else {
        video.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleVideoLoad = () => {
    setIsLoaded(true);
    // Try to play again after video loads
    const video = videoRef.current;
    if (video && !isPlaying) {
      video.play().catch(() => {
        // If still unable to play, keep paused state
        setIsPlaying(false);
      });
    }
  };

  // Handle user interaction to start video
  const handleUserInteraction = () => {
    if (!userInteracted) {
      setUserInteracted(true);
      const video = videoRef.current;
      if (video && !isPlaying) {
        video.play().then(() => {
          setIsPlaying(true);
        }).catch(() => {
          setIsPlaying(false);
        });
      }
    }
  };

  return (
    <section 
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      onClick={handleUserInteraction}
    >
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <video
          ref={videoRef}
          className={`video-background ${isLoaded ? 'opacity-100' : 'opacity-0'} video-container`}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          controls={false}
          onLoadedData={handleVideoLoad}
          onCanPlay={() => {
            // Try to play when video is ready
            const video = videoRef.current;
            if (video) {
              video.play().catch(() => {
                setIsPlaying(false);
              });
            }
          }}
          style={{
            willChange: 'transform',
            imageRendering: 'crisp-edges'
          }}
        >
          <source src="/videos/hero-background.mp4" type="video/mp4" />
          <source src="/videos/hero-background.webm" type="video/webm" />
          Your browser does not support the video tag.
        </video>
        
        {/* Video Overlay - Full Coverage */}
        <div className="absolute inset-0 bg-black/40 bg-gradient-to-b from-black/25 via-black/40 to-black/60 video-overlay z-2" />
      </div>

      {/* Video Control Button */}
      <button
        onClick={togglePlayPause}
        className="absolute top-6 right-6 z-20 p-3 bg-black/30 hover:bg-black/50 backdrop-blur-sm rounded-full border border-white/20 transition-all duration-300 group"
        aria-label={isPlaying ? "Pause video" : "Play video"}
      >
        {isPlaying ? (
          <Pause className="w-5 h-5 text-white group-hover:text-white transition-colors" />
        ) : (
          <Play className="w-5 h-5 text-white group-hover:text-white transition-colors" />
        )}
      </button>

      {/* Hero Content */}
      <div className="relative z-10 text-center px-6 max-w-6xl mx-auto">
        <div className="space-y-8">
          {/* Main Headline */}
          <div className="space-y-4">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold leading-tight">
              <span className="text-white video-text-shadow">
                See the World
              </span>
              <br />
              <span className="text-white video-text-shadow">
                Through AI
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-white max-w-3xl mx-auto leading-relaxed video-text-shadow">
              Transform your imagination into stunning videos with the power of artificial intelligence. 
              Create, edit, and enhance videos like never before.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a 
              href="/generate" 
              className="px-8 py-4 bg-white hover:bg-white/90 text-black font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-white/25 min-w-[200px] text-center inline-block"
            >
              Get Started
            </a>
            
            <button className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl border border-white/20 backdrop-blur-sm transition-all duration-300 transform hover:scale-105 min-w-[200px]">
              Learn More
            </button>
          </div>

          {/* Feature Highlights */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 max-w-4xl mx-auto">
            <button 
              className={`text-center space-y-2 p-4 rounded-lg transition-all duration-300 cursor-pointer hover:scale-105 ${
                selectedFeature === 0 ? 'bg-blue-500 shadow-lg shadow-blue-500/25' : 'bg-transparent hover:bg-white/10'
              }`}
              onClick={() => setSelectedFeature(selectedFeature === 0 ? null : 0)}
            >
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-white text-xl">🎬</span>
              </div>
              <h3 className={`font-semibold text-lg ${
                selectedFeature === 0 ? 'text-white video-text-shadow' : 'text-black'
              }`}>AI Video Generation</h3>
              <p className={`text-sm ${
                selectedFeature === 0 ? 'text-white/80 video-text-shadow' : 'text-gray-700'
              }`}>
                Generate high-quality videos directly from text descriptions
              </p>
            </button>
            
            <button 
              className={`text-center space-y-2 p-4 rounded-lg transition-all duration-300 cursor-pointer hover:scale-105 ${
                selectedFeature === 1 ? 'bg-blue-500 shadow-lg shadow-blue-500/25' : 'bg-transparent hover:bg-white/10'
              }`}
              onClick={() => setSelectedFeature(selectedFeature === 1 ? null : 1)}
            >
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-white text-xl">⚡</span>
              </div>
              <h3 className="text-white font-semibold text-lg video-text-shadow">Lightning Fast</h3>
              <p className="text-white/80 text-sm video-text-shadow">
                Advanced AI algorithms ensure rapid and efficient video processing
              </p>
            </button>
            
            <button 
              className={`text-center space-y-2 p-4 rounded-lg transition-all duration-300 cursor-pointer hover:scale-105 ${
                selectedFeature === 2 ? 'bg-blue-500 shadow-lg shadow-blue-500/25' : 'bg-transparent hover:bg-white/10'
              }`}
              onClick={() => setSelectedFeature(selectedFeature === 2 ? null : 2)}
            >
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-white text-xl">🎨</span>
              </div>
              <h3 className="text-white font-semibold text-lg video-text-shadow">Unlimited Creativity</h3>
              <p className="text-white/80 text-sm video-text-shadow">
                Multiple styles and effects to unleash your creativity
              </p>
            </button>
          </div>
        </div>
      </div>

      {/* Video Play Hint */}
      {!isPlaying && isLoaded && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 text-center">
          <div className="bg-black/70 backdrop-blur-sm rounded-lg p-6 text-white">
            <Play className="w-12 h-12 mx-auto mb-3" />
            <p className="text-lg font-medium mb-2">Click to play video</p>
            <p className="text-sm text-white/70">Click anywhere to start the background video</p>
          </div>
        </div>
      )}

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
        <div className="w-6 h-10 border-2 border-white/40 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/60 rounded-full mt-2 animate-bounce"></div>
        </div>
      </div>
    </section>
  );
}
