'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger,
  DropdownMenuSeparator 
} from '@/components/ui/dropdown-menu';
import { User, LogOut, Video, Image, Sparkles, Settings, Code, CreditCard, Menu, X, FolderOpen } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import AuthModal from '@/components/AuthModal';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import clsx from 'clsx';

export default function NavBar() {
  const pathname = usePathname();
  const { user, signIn, signOut, isLoading } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);

  // Handle scroll effect for navbar background
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const linkCls = (href: string) =>
    clsx(
      'px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200',
      pathname === href
        ? 'text-blue-400 bg-white/20'
        : 'text-white/80 hover:text-white hover:bg-white/10'
    );

  return (
    <nav className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'backdrop-blur-md bg-black/20 border-b border-white/10' 
        : ''
    }`}>
      <div className="mx-auto max-w-7xl px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">P</span>
          </div>
          <span className="text-xl font-bold text-white">Pollo AI</span>
        </Link>

        {/* Main Navigation */}
        <div className="hidden md:flex items-center space-x-1">
          {/* Create Video */}
          <div className="group relative">
              <Button variant="ghost" className="flex items-center space-x-1 px-4 py-2 text-white/80 hover:text-white hover:bg-white/10">
                <Video className="w-4 h-4" />
              <span>Video AI</span>
              </Button>
            <div className="absolute top-full left-0 mt-1 w-[600px] bg-gray-800/95 backdrop-blur-sm border border-gray-600/50 rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
              <div className="p-5">
                <div className="grid grid-cols-2 gap-6">
              <div className="space-y-1">
                    <div className="p-2 rounded-lg hover:bg-white/10 transition-colors cursor-pointer">
                      <div className="flex items-center space-x-2">
                        <Video className="w-4 h-4 text-pink-400" />
                        <span className="text-white font-medium text-sm">Image to Video</span>
                      </div>
                      <div className="text-xs text-gray-300 mt-1 ml-6">
                        Animate a still image into a realistic, dynamic video.
                      </div>
                    </div>
                    
                    <div className="p-2 rounded-lg hover:bg-white/10 transition-colors cursor-pointer">
                      <div className="flex items-center space-x-2">
                        <Video className="w-4 h-4 text-pink-400" />
                        <span className="text-white font-medium text-sm">Consistent Character Video</span>
                      </div>
                      <div className="text-xs text-gray-300 mt-1 ml-6">
                        Keep character, object, or scene consistent throughout a video.
                      </div>
                    </div>
                    
                    <div className="p-2 rounded-lg hover:bg-white/10 transition-colors cursor-pointer">
                      <div className="flex items-center space-x-2">
                        <Video className="w-4 h-4 text-pink-400" />
                        <span className="text-white font-medium text-sm">Text to Video</span>
                      </div>
                      <div className="text-xs text-gray-300 mt-1 ml-6">
                        Turn simple text prompts into a stunning, captivating video.
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-1">
                    <div className="p-2 rounded-lg hover:bg-white/10 transition-colors cursor-pointer">
                      <div className="flex items-center space-x-2">
                        <Video className="w-4 h-4 text-pink-400" />
                        <span className="text-white font-medium text-sm">Video to Video</span>
                      </div>
                      <div className="text-xs text-gray-300 mt-1 ml-6">
                        Recreate existing videos into any creative animation style.
                      </div>
                    </div>
                    
                    <div className="p-2 rounded-lg hover:bg-white/10 transition-colors cursor-pointer">
                      <div className="flex items-center space-x-2">
                        <Video className="w-4 h-4 text-pink-400" />
                        <span className="text-white font-medium text-sm">AI Animation Generator</span>
                      </div>
                      <div className="text-xs text-gray-300 mt-1 ml-6">
                        Generate captivating anime and cartoon videos in various styles.
                      </div>
                    </div>
                    
                    <div className="p-2 rounded-lg hover:bg-white/10 transition-colors cursor-pointer">
                      <div className="flex items-center space-x-2">
                        <Video className="w-4 h-4 text-pink-400" />
                        <span className="text-white font-medium text-sm">Photo to Video Avatar</span>
                      </div>
                      <div className="text-xs text-gray-300 mt-1 ml-6">
                        Create lifelike video avatars from a single photo.
                      </div>
                    </div>
                  </div>
                  </div>
                
                <div className="mt-4 pt-3 border-t border-gray-700/50">
                  <div className="text-xs font-semibold text-gray-400 mb-2">Supported Video Models</div>
                  <div className="flex flex-wrap gap-1.5">
                    <span className="px-2 py-0.5 bg-gray-700 text-xs text-gray-300 rounded">Kling AI</span>
                    <span className="px-2 py-0.5 bg-gray-700 text-xs text-gray-300 rounded">Runway</span>
                    <span className="px-2 py-0.5 bg-gray-700 text-xs text-gray-300 rounded">Hailuo AI</span>
                    <span className="px-2 py-0.5 bg-gray-700 text-xs text-gray-300 rounded">Vidu AI</span>
                    <span className="px-2 py-0.5 bg-gray-700 text-xs text-gray-300 rounded">Luma AI</span>
                    <span className="px-2 py-0.5 bg-gray-700 text-xs text-gray-300 rounded">Pika AI</span>
                    <span className="px-2 py-0.5 bg-gray-700 text-xs text-gray-300 rounded">PixVerse AI</span>
                    <span className="px-2 py-0.5 bg-gray-700 text-xs text-gray-300 rounded">Seedance</span>
                    <span className="px-2 py-0.5 bg-gray-700 text-xs text-gray-300 rounded">Wanx AI</span>
                    <span className="px-2 py-0.5 bg-gray-700 text-xs text-gray-300 rounded">Hunyuan</span>
                    <span className="px-2 py-0.5 bg-gray-700 text-xs text-gray-300 rounded">Veo 3 Fast</span>
                    <span className="px-2 py-0.5 bg-gray-700 text-xs text-gray-300 rounded">Midjourney</span>
                    <span className="px-2 py-0.5 bg-gray-700 text-xs text-gray-300 rounded">Veo 2</span>
                  </div>
                  </div>
              </div>
            </div>
          </div>

          {/* Create Image */}
          <div className="group relative">
              <Button variant="ghost" className="flex items-center space-x-1 px-4 py-2 text-white/80 hover:text-white hover:bg-white/10">
                <Image className="w-4 h-4" />
              <span>Image AI</span>
              </Button>
            <div className="absolute top-full left-0 mt-1 w-[550px] bg-gray-800/95 backdrop-blur-sm border border-gray-600/50 rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
              <div className="p-5">
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-1">
                    <div className="p-2 rounded-lg hover:bg-white/10 transition-colors cursor-pointer">
                      <div className="flex items-center space-x-2">
                        <Image className="w-4 h-4 text-pink-400" />
                        <span className="text-white font-medium text-sm">AI Image Generator</span>
                      </div>
                      <div className="text-xs text-gray-300 mt-1 ml-6">
                        Turn your ideas to appealing and believable AI images in any style.
                      </div>
                    </div>
                    
                    <div className="p-2 rounded-lg hover:bg-white/10 transition-colors cursor-pointer">
                      <div className="flex items-center space-x-2">
                        <Image className="w-4 h-4 text-pink-400" />
                        <span className="text-white font-medium text-sm">Image to Image</span>
                      </div>
                      <div className="text-xs text-gray-300 mt-1 ml-6">
                        Transform your images into new styled and customized variations.
                      </div>
                    </div>
                  </div>
                  
              <div className="space-y-1">
                    <div className="p-2 rounded-lg hover:bg-white/10 transition-colors cursor-pointer">
                      <div className="flex items-center space-x-2">
                        <Image className="w-4 h-4 text-pink-400" />
                        <span className="text-white font-medium text-sm">Chat to Image</span>
                      </div>
                      <div className="text-xs text-gray-300 mt-1 ml-6">
                        Chat with our AI to generate and refine images in real time.
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-4 pt-3 border-t border-gray-700/50">
                  <div className="text-xs font-semibold text-gray-400 mb-2">Supported Image Models</div>
                  <div className="flex flex-wrap gap-1.5">
                    <span className="px-2 py-0.5 bg-gray-700 text-xs text-gray-300 rounded">Recraft</span>
                    <span className="px-2 py-0.5 bg-gray-700 text-xs text-gray-300 rounded">Ideogram</span>
                    <span className="px-2 py-0.5 bg-gray-700 text-xs text-gray-300 rounded">Stable Diffusion</span>
                    <span className="px-2 py-0.5 bg-gray-700 text-xs text-gray-300 rounded">FLUX</span>
                    <span className="px-2 py-0.5 bg-gray-700 text-xs text-gray-300 rounded">Dall-E</span>
                    <span className="px-2 py-0.5 bg-gray-700 text-xs text-gray-300 rounded">Imagen</span>
                    <span className="px-2 py-0.5 bg-gray-700 text-xs text-gray-300 rounded">GPT-4o</span>
                    <span className="px-2 py-0.5 bg-gray-700 text-xs text-gray-300 rounded">Midjourney</span>
                    <span className="px-2 py-0.5 bg-gray-700 text-xs text-gray-300 rounded">Flux Kontext</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Effects */}
          <div className="group relative">
              <Button variant="ghost" className="flex items-center space-x-1 px-4 py-2 text-white/80 hover:text-white hover:bg-white/10">
                <Sparkles className="w-4 h-4" />
                <span>Effects</span>
              </Button>
            <div className="absolute top-full left-0 mt-1 w-[700px] bg-gray-800/95 backdrop-blur-sm border border-gray-600/50 rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
              <div className="p-5">
                <div className="grid grid-cols-4 gap-4">
                  <div>
                    <div className="flex items-center space-x-2 mb-3">
                      <Video className="w-4 h-4 text-pink-400" />
                      <span className="text-white font-medium text-sm">Video Effects</span>
                    </div>
                    <div className="space-y-0.5">
                      <div className="text-sm text-gray-300 hover:text-white hover:bg-white/10 px-2 py-1 rounded cursor-pointer transition-colors">AI Kissing Video Generator</div>
                      <div className="text-sm text-gray-300 hover:text-white hover:bg-white/10 px-2 py-1 rounded cursor-pointer transition-colors">AI Handshake</div>
                      <div className="text-sm text-gray-300 hover:text-white hover:bg-white/10 px-2 py-1 rounded cursor-pointer transition-colors">AI Inflate Effect</div>
                      <div className="text-sm text-gray-300 hover:text-white hover:bg-white/10 px-2 py-1 rounded cursor-pointer transition-colors">AI Melt Effect</div>
                      <div className="text-sm text-gray-300 hover:text-white hover:bg-white/10 px-2 py-1 rounded cursor-pointer transition-colors">AI Muscle Generator</div>
                      <div className="text-sm text-gray-300 hover:text-white hover:bg-white/10 px-2 py-1 rounded cursor-pointer transition-colors">AI Hair Growth</div>
                      <div className="text-sm text-pink-400 hover:text-pink-300 hover:bg-white/10 px-2 py-1 rounded cursor-pointer font-medium transition-colors">View More &gt;</div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex items-center space-x-2 mb-3">
                      <Image className="w-4 h-4 text-pink-400" />
                      <span className="text-white font-medium text-sm">Image Effects</span>
                    </div>
                    <div className="space-y-0.5">
                      <div className="text-sm text-gray-300 hover:text-white hover:bg-white/10 px-2 py-1 rounded cursor-pointer transition-colors">AI Chibi Figure Set Generator</div>
                      <div className="text-sm text-gray-300 hover:text-white hover:bg-white/10 px-2 py-1 rounded cursor-pointer transition-colors">Snoopy AI Filter</div>
                      <div className="text-sm text-gray-300 hover:text-white hover:bg-white/10 px-2 py-1 rounded cursor-pointer transition-colors">AI 3D Miniature Scene Generator</div>
                      <div className="text-sm text-gray-300 hover:text-white hover:bg-white/10 px-2 py-1 rounded cursor-pointer transition-colors">AI 3D Pixar Generator</div>
                      <div className="text-sm text-gray-300 hover:text-white hover:bg-white/10 px-2 py-1 rounded cursor-pointer transition-colors">AI Acrylic Figure Generator</div>
                      <div className="text-sm text-gray-300 hover:text-white hover:bg-white/10 px-2 py-1 rounded cursor-pointer transition-colors">AI 3D Comic Portrait Generator</div>
                      <div className="text-sm text-pink-400 hover:text-pink-300 hover:bg-white/10 px-2 py-1 rounded cursor-pointer font-medium transition-colors">View More &gt;</div>
                    </div>
                  </div>
                  
                  <div className="space-y-0.5">
                    <div className="text-sm text-gray-300 hover:text-white hover:bg-white/10 px-2 py-1 rounded cursor-pointer transition-colors">AI Hug</div>
                    <div className="text-sm text-gray-300 hover:text-white hover:bg-white/10 px-2 py-1 rounded cursor-pointer transition-colors">AI Squish Effect</div>
                    <div className="text-sm text-gray-300 hover:text-white hover:bg-white/10 px-2 py-1 rounded cursor-pointer transition-colors">AI Explode Effect</div>
                    <div className="text-sm text-gray-300 hover:text-white hover:bg-white/10 px-2 py-1 rounded cursor-pointer transition-colors">AI Curly Hair</div>
                    <div className="text-sm text-gray-300 hover:text-white hover:bg-white/10 px-2 py-1 rounded cursor-pointer transition-colors">AI Venom Transformation</div>
                  </div>
                  
                  <div className="space-y-0.5">
                    <div className="text-sm text-gray-300 hover:text-white hover:bg-white/10 px-2 py-1 rounded cursor-pointer transition-colors">AI Simpsons Character Generator</div>
                    <div className="text-sm text-gray-300 hover:text-white hover:bg-white/10 px-2 py-1 rounded cursor-pointer transition-colors">Pixar AI Generator</div>
                    <div className="text-sm text-gray-300 hover:text-white hover:bg-white/10 px-2 py-1 rounded cursor-pointer transition-colors">AI 3D Cartoon Rug Generator</div>
                    <div className="text-sm text-gray-300 hover:text-white hover:bg-white/10 px-2 py-1 rounded cursor-pointer transition-colors">AI Cartoon Generator</div>
                    <div className="text-sm text-gray-300 hover:text-white hover:bg-white/10 px-2 py-1 rounded cursor-pointer transition-colors">AI 3D Polly Pocket Generator</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* AI Tools */}
          <div className="group relative">
              <Button variant="ghost" className="flex items-center space-x-1 px-4 py-2 text-white/80 hover:text-white hover:bg-white/10">
                <Settings className="w-4 h-4" />
              <span>AI Tools</span>
              </Button>
            <div className="absolute top-full left-0 mt-1 w-[600px] bg-gray-800/95 backdrop-blur-sm border border-gray-600/50 rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
              <div className="p-5">
                <div className="grid grid-cols-3 gap-6">
                  <div>
                    <div className="flex items-center space-x-2 mb-3">
                      <Video className="w-4 h-4 text-pink-400" />
                      <span className="text-white font-medium text-sm">Video Tools</span>
                    </div>
                    <div className="space-y-0.5">
                      <div className="text-sm text-gray-300 hover:text-white hover:bg-white/10 px-2 py-1 rounded cursor-pointer transition-colors">AI Video Upscaler</div>
                      <div className="text-sm text-gray-300 hover:text-white hover:bg-white/10 px-2 py-1 rounded cursor-pointer transition-colors">AI Video Enhancer</div>
                      <div className="text-sm text-gray-300 hover:text-white hover:bg-white/10 px-2 py-1 rounded cursor-pointer transition-colors">Video to Anime</div>
                      <div className="text-sm text-gray-300 hover:text-white hover:bg-white/10 px-2 py-1 rounded cursor-pointer transition-colors">AI Video Filters</div>
                      <div className="text-sm text-gray-300 hover:text-white hover:bg-white/10 px-2 py-1 rounded cursor-pointer transition-colors">AI Dance Generator</div>
                      <div className="text-sm text-gray-300 hover:text-white hover:bg-white/10 px-2 py-1 rounded cursor-pointer transition-colors">Anime Video Enhancer</div>
                      <div className="text-sm text-pink-400 hover:text-pink-300 hover:bg-white/10 px-2 py-1 rounded cursor-pointer font-medium transition-colors">View More &gt;</div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex items-center space-x-2 mb-3">
                      <Image className="w-4 h-4 text-pink-400" />
                      <span className="text-white font-medium text-sm">Image Tools</span>
                    </div>
                    <div className="space-y-0.5">
                      <div className="text-sm text-gray-300 hover:text-white hover:bg-white/10 px-2 py-1 rounded cursor-pointer transition-colors">Remove BG</div>
                      <div className="text-sm text-gray-300 hover:text-white hover:bg-white/10 px-2 py-1 rounded cursor-pointer transition-colors">Object Remover</div>
                      <div className="text-sm text-gray-300 hover:text-white hover:bg-white/10 px-2 py-1 rounded cursor-pointer transition-colors">Image Enhancer</div>
                      <div className="text-sm text-gray-300 hover:text-white hover:bg-white/10 px-2 py-1 rounded cursor-pointer transition-colors">Ghibli AI Generator</div>
                      <div className="text-sm text-gray-300 hover:text-white hover:bg-white/10 px-2 py-1 rounded cursor-pointer transition-colors">Anime Upscaler</div>
                      <div className="text-sm text-gray-300 hover:text-white hover:bg-white/10 px-2 py-1 rounded cursor-pointer transition-colors">Image Generators</div>
                      <div className="text-sm text-pink-400 hover:text-pink-300 hover:bg-white/10 px-2 py-1 rounded cursor-pointer font-medium transition-colors">View More &gt;</div>
                    </div>
                  </div>
                  
                  <div className="space-y-0.5">
                    <div className="text-sm text-gray-300 hover:text-white hover:bg-white/10 px-2 py-1 rounded cursor-pointer transition-colors">AI Art Generator</div>
                    <div className="text-sm text-gray-300 hover:text-white hover:bg-white/10 px-2 py-1 rounded cursor-pointer transition-colors">Style Transfer</div>
                    <div className="text-sm text-gray-300 hover:text-white hover:bg-white/10 px-2 py-1 rounded cursor-pointer transition-colors">Photo Restoration</div>
                    <div className="text-sm text-gray-300 hover:text-white hover:bg-white/10 px-2 py-1 rounded cursor-pointer transition-colors">Color Enhancement</div>
                    <div className="text-sm text-gray-300 hover:text-white hover:bg-white/10 px-2 py-1 rounded cursor-pointer transition-colors">Face Swap</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* API */}
          <Button variant="ghost" className="flex items-center space-x-1 px-4 py-2 text-white/80 hover:text-white hover:bg-white/10">
            <Code className="w-4 h-4" />
            <span>API</span>
          </Button>

          {/* Pricing */}
          <Link href="/pricing">
            <Button variant="ghost" className="flex items-center space-x-1 px-4 py-2 text-white/80 hover:text-white hover:bg-white/10">
              <CreditCard className="w-4 h-4" />
              <span>Pricing</span>
            </Button>
          </Link>
        </div>
        
        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-white/80 hover:text-white"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>

        {/* Right Side Actions */}
        <div className="hidden md:flex items-center space-x-3">
          {/* Language Selector */}
          <LanguageSwitcher />

          {/* User Authentication */}
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-10 w-10 rounded-full p-0 hover:bg-white/10">
                  <img
                    src={user.picture}
                    alt={user.name}
                    className="h-8 w-8 rounded-full"
                  />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 bg-white border border-gray-200 shadow-lg">
                <div className="flex items-center gap-2 p-3">
                  <img
                    src={user.picture}
                    alt={user.name}
                    className="h-8 w-8 rounded-full"
                  />
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium text-gray-900">{user.name}</p>
                    <p className="text-xs text-gray-500">{user.email}</p>
                  </div>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/projects" className="flex items-center gap-2 cursor-pointer">
                    <FolderOpen className="h-4 w-4" />
                    My Creations
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/account" className="flex items-center gap-2 cursor-pointer">
                    <User className="h-4 w-4" />
                    Account Settings
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem 
                  onClick={signOut}
                  className="flex items-center gap-2 cursor-pointer text-red-600 focus:text-red-600"
                >
                  <LogOut className="h-4 w-4" />
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                onClick={() => setShowAuthModal(true)}
                disabled={isLoading}
                className="text-white/80 hover:text-white font-medium px-4 py-2 text-sm"
              >
                Login
              </Button>
              <button
                onClick={() => setShowAuthModal(true)}
                disabled={isLoading}
                className="group relative overflow-hidden rounded-full bg-gradient-to-r from-white via-gray-50 to-white px-8 py-[7px] text-sm font-semibold text-black shadow-lg transition-all duration-300 ease-out hover:shadow-xl hover:scale-105 focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-transparent disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap min-w-fit"
              >
                <span className="relative z-10 flex items-center space-x-1">
                  <span className="bg-gradient-to-r from-gray-900 to-black bg-clip-text text-transparent font-bold">
                    {isLoading ? 'Loading...' : 'Start for Free'}
                  </span>
                  {!isLoading && (
                    <svg 
                      className="w-4 h-4 ml-1 text-gray-700 transition-transform duration-300 group-hover:translate-x-1" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  )}
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className={`md:hidden transition-all duration-300 ${
          isScrolled 
            ? 'bg-black/30 backdrop-blur-md border-t border-white/10' 
            : 'bg-gradient-to-b from-black/30 via-black/20 to-black/10 backdrop-blur-sm'
        }`}>
          <div className="px-6 py-4 space-y-4">
            {/* Mobile Menu Items */}
            <div className="space-y-3">
              <div>
                <h3 className="text-sm font-semibold text-white mb-2">Create Video</h3>
                <div className="space-y-2 pl-4">
                  <a href="#" className="block text-sm text-white/80 hover:text-white">Text to Video</a>
                  <a href="#" className="block text-sm text-white/80 hover:text-white">Image to Video</a>
                  <a href="#" className="block text-sm text-white/80 hover:text-white">Consistent Character Video</a>
                  <a href="#" className="block text-sm text-white/80 hover:text-white">Video to Video</a>
                  <a href="#" className="block text-sm text-white/80 hover:text-white">AI Animation Generator</a>
                </div>
              </div>
              
              <div>
                <h3 className="text-sm font-semibold text-white mb-2">Create Image</h3>
                <div className="space-y-2 pl-4">
                  <a href="#" className="block text-sm text-white/80 hover:text-white">Text to Image</a>
                  <a href="#" className="block text-sm text-white/80 hover:text-white">Image to Image</a>
                </div>
              </div>
              
              <div>
                <h3 className="text-sm font-semibold text-white mb-2">Effects</h3>
                <div className="space-y-2 pl-4">
                  <a href="#" className="block text-sm text-white/80 hover:text-white">AI Kiss Video Generator</a>
                  <a href="#" className="block text-sm text-white/80 hover:text-white">AI Muscle Generator</a>
                  <a href="#" className="block text-sm text-white/80 hover:text-white">AI Bikini Swap</a>
                  <a href="#" className="block text-sm text-blue-600 font-medium">View All 150+ Effects</a>
                </div>
              </div>
              
              <div className="pt-2 border-t border-gray-200">
                <a href="#" className="block py-2 text-sm font-medium text-white hover:text-blue-600">Tools</a>
                <a href="#" className="block py-2 text-sm font-medium text-white hover:text-blue-600">API</a>
                <Link href="/pricing" className="block py-2 text-sm font-medium text-white hover:text-blue-600">Pricing</Link>
              </div>
            </div>

            {/* Mobile Language Selector */}
            <div className="pt-4 border-t border-gray-200">
              <LanguageSwitcher variant="mobile" />
            </div>

            {/* Mobile Auth */}
            <div className="pt-4 border-t border-gray-200">
              {user ? (
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <img src={user.picture} alt={user.name} className="w-8 h-8 rounded-full" />
                    <div>
                      <p className="text-sm font-medium text-white">{user.name}</p>
                      <p className="text-xs text-gray-500">{user.email}</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Link href="/account" className="block text-sm text-white/80 hover:text-white">Account Settings</Link>
                    <Button onClick={signOut} variant="ghost" className="block text-sm text-red-600 hover:text-red-700 p-0 h-auto justify-start">
                      Sign Out
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="space-y-2">
                  <Button
                    onClick={() => setShowAuthModal(true)}
                    disabled={isLoading}
                    variant="outline"
                    className="w-full text-white/80 hover:text-white border-white/30 bg-white/10 hover:bg-white/20"
                  >
                    Login
                  </Button>
                  <Button
                    onClick={() => setShowAuthModal(true)}
                    disabled={isLoading}
                    className="group relative w-full overflow-hidden rounded-xl bg-gradient-to-r from-white via-gray-50 to-white px-6 py-3 text-sm font-semibold text-black shadow-lg transition-all duration-300 ease-out hover:shadow-xl hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-white/50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <span className="relative z-10 flex items-center justify-center space-x-2">
                      <span className="bg-gradient-to-r from-gray-900 to-black bg-clip-text text-transparent font-bold">
                        {isLoading ? 'Loading...' : 'Start for Free'}
                      </span>
                      {!isLoading && (
                        <svg 
                          className="w-4 h-4 text-gray-700 transition-transform duration-300 group-hover:translate-x-1" 
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                      )}
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      
      {/* Auth Modal */}
      <AuthModal 
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        initialMode="login"
      />
    </nav>
  );
}
