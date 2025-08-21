"use client";

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import Link from 'next/link';
import { 
  Cookie, 
  Settings, 
  X, 
  Shield, 
  BarChart3, 
  Target, 
  Zap,
  Check 
} from 'lucide-react';

interface CookiePreferences {
  essential: boolean;
  analytics: boolean;
  marketing: boolean;
  functional: boolean;
}

export default function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [cookiePreferences, setCookiePreferences] = useState<CookiePreferences>({
    essential: true, // Always true, cannot be disabled
    analytics: false,
    marketing: false,
    functional: false
  });

  useEffect(() => {
    // Check if user has already made a choice
    const hasConsent = localStorage.getItem('cookieConsent');
    if (!hasConsent) {
      // Show banner after a short delay
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAcceptAll = () => {
    const allPreferences = {
      essential: true,
      analytics: true,
      marketing: true,
      functional: true
    };
    setCookiePreferences(allPreferences);
    localStorage.setItem('cookieConsent', JSON.stringify(allPreferences));
    setIsVisible(false);
  };

  const handleAcceptSelected = () => {
    localStorage.setItem('cookieConsent', JSON.stringify(cookiePreferences));
    setIsVisible(false);
  };

  const handleRejectAll = () => {
    const minimalPreferences = {
      essential: true,
      analytics: false,
      marketing: false,
      functional: false
    };
    setCookiePreferences(minimalPreferences);
    localStorage.setItem('cookieConsent', JSON.stringify(minimalPreferences));
    setIsVisible(false);
  };

  const togglePreference = (key: keyof CookiePreferences) => {
    if (key === 'essential') return; // Cannot disable essential cookies
    
    setCookiePreferences(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 pointer-events-none">
      <div className="pointer-events-auto bg-black/80 backdrop-blur-md border-t border-white/10 shadow-2xl animate-in slide-in-from-bottom-4 duration-500">
        <div className="max-w-7xl mx-auto px-6 py-4">
          {!showSettings ? (
            // Simple Footer Bar Layout
            <div className="flex items-center justify-between gap-6">
              <div className="flex items-center gap-4 flex-1">
                <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <Cookie className="w-4 h-4 text-white" />
                </div>
                <div className="flex-1">
                  <p className="text-white text-sm leading-relaxed">
                    We use cookies to enhance your AI experience. You can customize your preferences or learn more in our{' '}
                    <Link href="/privacy-policy" className="text-blue-400 hover:underline font-medium">
                      Privacy Policy
                    </Link>.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Button
                  onClick={() => setShowSettings(true)}
                  size="sm"
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white text-xs px-3 py-1.5 h-8"
                >
                  <Settings className="w-3 h-3 mr-1" />
                  Settings
                </Button>
                <Button
                  onClick={handleRejectAll}
                  size="sm"
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white text-xs px-3 py-1.5 h-8"
                >
                  Reject All
                </Button>
                <Button
                  onClick={handleAcceptAll}
                  size="sm"
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white text-xs px-4 py-1.5 h-8"
                >
                  Accept All
                </Button>
                <button
                  onClick={() => setIsVisible(false)}
                  className="text-white/60 hover:text-white transition-colors ml-2"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
          ) : (
            // Detailed Settings Layout
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                    <Cookie className="w-4 h-4 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-white">
                    Cookie Preferences
                  </h3>
                </div>
                <button
                  onClick={() => setShowSettings(false)}
                  className="text-white/60 hover:text-white transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                <div className="bg-white/10 border border-white/20 rounded-lg p-3">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Shield className="w-4 h-4 text-green-400" />
                      <span className="text-sm font-medium text-white">Essential</span>
                    </div>
                    <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                      <Check className="w-2.5 h-2.5 text-white" />
                    </div>
                  </div>
                  <p className="text-xs text-white/70">Always active</p>
                </div>

                <div className="bg-white/10 border border-white/20 rounded-lg p-3">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <BarChart3 className="w-4 h-4 text-blue-400" />
                      <span className="text-sm font-medium text-white">Analytics</span>
                    </div>
                    <Switch
                      checked={cookiePreferences.analytics}
                      onCheckedChange={() => togglePreference('analytics')}
                      className="scale-75"
                    />
                  </div>
                  <p className="text-xs text-white/70">Performance insights</p>
                </div>

                <div className="bg-white/10 border border-white/20 rounded-lg p-3">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Target className="w-4 h-4 text-purple-400" />
                      <span className="text-sm font-medium text-white">Marketing</span>
                    </div>
                    <Switch
                      checked={cookiePreferences.marketing}
                      onCheckedChange={() => togglePreference('marketing')}
                      className="scale-75"
                    />
                  </div>
                  <p className="text-xs text-white/70">Personalized ads</p>
                </div>

                <div className="bg-white/10 border border-white/20 rounded-lg p-3">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Zap className="w-4 h-4 text-orange-400" />
                      <span className="text-sm font-medium text-white">Functional</span>
                    </div>
                    <Switch
                      checked={cookiePreferences.functional}
                      onCheckedChange={() => togglePreference('functional')}
                      className="scale-75"
                    />
                  </div>
                  <p className="text-xs text-white/70">Enhanced features</p>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-white/10">
                <p className="text-xs text-white/60">
                  Learn more in our{' '}
                  <Link href="/privacy-policy" className="text-blue-400 hover:underline">
                    Privacy Policy
                  </Link>{' '}
                  and{' '}
                  <Link href="/cookie-policy" className="text-blue-400 hover:underline">
                    Cookie Policy
                  </Link>.
                </p>
                <div className="flex items-center gap-2">
                  <Button
                    onClick={handleRejectAll}
                    size="sm"
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white text-xs px-3 py-1.5 h-8"
                  >
                    Reject All
                  </Button>
                  <Button
                    onClick={handleAcceptSelected}
                    size="sm"
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white text-xs px-3 py-1.5 h-8"
                  >
                    Accept Selected
                  </Button>
                  <Button
                    onClick={handleAcceptAll}
                    size="sm"
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white text-xs px-4 py-1.5 h-8"
                  >
                    Accept All
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}