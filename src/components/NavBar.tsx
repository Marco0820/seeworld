'use client';

import { useState } from 'react';
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
import { User, LogOut, ChevronDown, Video, Image, Sparkles, Settings, Code, CreditCard, Menu, X } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import clsx from 'clsx';

export default function NavBar() {
  const pathname = usePathname();
  const { user, signIn, signOut, isLoading } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const linkCls = (href: string) =>
    clsx(
      'px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200',
      pathname === href
        ? 'text-blue-400 bg-white/20'
        : 'text-white/80 hover:text-white hover:bg-white/10'
    );

  return (
    <nav className="fixed top-0 inset-x-0 z-50 backdrop-blur-sm bg-gradient-to-b from-black/20 via-black/10 to-transparent">
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
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center space-x-1 px-4 py-2 text-white/80 hover:text-white hover:bg-white/10">
                <Video className="w-4 h-4" />
                <span>Create Video</span>
                <ChevronDown className="w-3 h-3" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-64 bg-white border border-gray-200 shadow-xl rounded-lg p-2">
              <div className="space-y-1">
                <div className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">AI Video Generators</div>
                <DropdownMenuItem className="px-3 py-2 text-sm hover:bg-gray-50 rounded-md cursor-pointer" asChild>
                  <Link href="/studio">
                    <div>
                      <div className="font-medium text-gray-900">Video Studio</div>
                      <div className="text-xs text-gray-500">Professional image-to-video generation tool</div>
                    </div>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="px-3 py-2 text-sm hover:bg-gray-50 rounded-md cursor-pointer">
                  <div>
                    <div className="font-medium text-gray-900">Text to Video</div>
                    <div className="text-xs text-gray-500">Generate videos from text descriptions</div>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem className="px-3 py-2 text-sm hover:bg-gray-50 rounded-md cursor-pointer">
                  <div>
                    <div className="font-medium text-gray-900">Image to Video</div>
                    <div className="text-xs text-gray-500">Convert static images to dynamic videos</div>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem className="px-3 py-2 text-sm hover:bg-gray-50 rounded-md cursor-pointer">
                  <div>
                    <div className="font-medium text-gray-900">Consistent Character Video</div>
                    <div className="text-xs text-gray-500">Generate videos with character consistency</div>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem className="px-3 py-2 text-sm hover:bg-gray-50 rounded-md cursor-pointer">
                  <div>
                    <div className="font-medium text-gray-900">Video to Video</div>
                    <div className="text-xs text-gray-500">Video style transformation and editing</div>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem className="px-3 py-2 text-sm hover:bg-gray-50 rounded-md cursor-pointer">
                  <div>
                    <div className="font-medium text-gray-900">AI Animation Generator</div>
                    <div className="text-xs text-gray-500">Professional animation effects generation</div>
                  </div>
                </DropdownMenuItem>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Create Image */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center space-x-1 px-4 py-2 text-white/80 hover:text-white hover:bg-white/10">
                <Image className="w-4 h-4" />
                <span>Create Image</span>
                <ChevronDown className="w-3 h-3" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-64 bg-white border border-gray-200 shadow-xl rounded-lg p-2">
              <div className="space-y-1">
                <div className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">AI Image Generators</div>
                <DropdownMenuItem className="px-3 py-2 text-sm hover:bg-gray-50 rounded-md cursor-pointer">
                  <div>
                    <div className="font-medium text-gray-900">Text to Image</div>
                    <div className="text-xs text-gray-500">Generate high-quality images from text descriptions</div>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem className="px-3 py-2 text-sm hover:bg-gray-50 rounded-md cursor-pointer">
                  <div>
                    <div className="font-medium text-gray-900">Image to Image</div>
                    <div className="text-xs text-gray-500">Generate new creative works based on existing images</div>
                  </div>
                </DropdownMenuItem>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Effects */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center space-x-1 px-4 py-2 text-white/80 hover:text-white hover:bg-white/10">
                <Sparkles className="w-4 h-4" />
                <span>Effects</span>
                <ChevronDown className="w-3 h-3" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-72 bg-white border border-gray-200 shadow-xl rounded-lg p-2">
              <div className="space-y-1">
                <div className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">Popular AI Effects</div>
                <DropdownMenuItem className="px-3 py-2 text-sm hover:bg-gray-50 rounded-md cursor-pointer">
                  <div>
                    <div className="font-medium text-gray-900">AI Kiss Video Generator</div>
                    <div className="text-xs text-gray-500">Generate romantic kissing scene videos</div>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem className="px-3 py-2 text-sm hover:bg-gray-50 rounded-md cursor-pointer">
                  <div>
                    <div className="font-medium text-gray-900">AI Muscle Generator</div>
                    <div className="text-xs text-gray-500">Enhance body shape and muscle definition</div>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem className="px-3 py-2 text-sm hover:bg-gray-50 rounded-md cursor-pointer">
                  <div>
                    <div className="font-medium text-gray-900">AI Bikini Swap</div>
                    <div className="text-xs text-gray-500">Smart clothing replacement technology</div>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem className="px-3 py-2 text-sm hover:bg-gray-50 rounded-md cursor-pointer">
                  <div>
                    <div className="font-medium text-gray-900">View All 150+ Effects</div>
                    <div className="text-xs text-blue-600">Explore more creative effects</div>
                  </div>
                </DropdownMenuItem>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Tools */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center space-x-1 px-4 py-2 text-white/80 hover:text-white hover:bg-white/10">
                <Settings className="w-4 h-4" />
                <span>Tools</span>
                <ChevronDown className="w-3 h-3" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-56 bg-white border border-gray-200 shadow-xl rounded-lg p-2">
              <div className="space-y-1">
                <DropdownMenuItem className="px-3 py-2 text-sm hover:bg-gray-50 rounded-md cursor-pointer">
                  <div className="font-medium text-gray-900">Video Editor</div>
                </DropdownMenuItem>
                <DropdownMenuItem className="px-3 py-2 text-sm hover:bg-gray-50 rounded-md cursor-pointer">
                  <div className="font-medium text-gray-900">Image Editor</div>
                </DropdownMenuItem>
                <DropdownMenuItem className="px-3 py-2 text-sm hover:bg-gray-50 rounded-md cursor-pointer">
                  <div className="font-medium text-gray-900">Batch Processing</div>
                </DropdownMenuItem>
                <DropdownMenuItem className="px-3 py-2 text-sm hover:bg-gray-50 rounded-md cursor-pointer">
                  <div className="font-medium text-gray-900">Format Conversion</div>
                </DropdownMenuItem>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* API */}
          <Button variant="ghost" className="flex items-center space-x-1 px-4 py-2 text-white/80 hover:text-white hover:bg-white/10">
            <Code className="w-4 h-4" />
            <span>API</span>
          </Button>

          {/* Pricing */}
          <Button variant="ghost" className="flex items-center space-x-1 px-4 py-2 text-white/80 hover:text-white hover:bg-white/10">
            <CreditCard className="w-4 h-4" />
            <span>Pricing</span>
          </Button>
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
          <Button variant="ghost" size="sm" className="text-white/80 hover:text-white">
            English
          </Button>

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
                onClick={signIn}
                disabled={isLoading}
                className="text-white/80 hover:text-white font-medium px-4 py-2 text-sm"
              >
                Login
              </Button>
              <Button
                onClick={signIn}
                disabled={isLoading}
                className="bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 font-medium px-4 py-2 text-sm rounded-lg border border-white/30"
              >
                {isLoading ? 'Loading...' : 'Free Trial'}
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-gradient-to-b from-black/30 via-black/20 to-black/10 backdrop-blur-sm">
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
                <a href="#" className="block py-2 text-sm font-medium text-white hover:text-blue-600">Pricing</a>
              </div>
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
                    <button onClick={signOut} className="block text-sm text-red-600 hover:text-red-700">Sign Out</button>
                  </div>
                </div>
              ) : (
                <div className="space-y-2">
                  <Button
                    onClick={signIn}
                    disabled={isLoading}
                    variant="outline"
                    className="w-full text-white/80 hover:text-white border-white/30 bg-white/10 hover:bg-white/20"
                  >
                    Login
                  </Button>
                  <Button
                    onClick={signIn}
                    disabled={isLoading}
                    className="w-full bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 border border-white/30"
                  >
                    {isLoading ? 'Loading...' : 'Free Trial'}
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
