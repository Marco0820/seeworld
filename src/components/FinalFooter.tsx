"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { 
  Twitter, 
  Instagram, 
  Youtube, 
  MessageCircle, 
  Apple, 
  Play 
} from "lucide-react";

export default function FinalFooter() {
  return (
    <>
      {/* Call to Action Section */}
      <section className="bg-gradient-to-br from-orange-600 via-red-600 to-purple-700 py-20 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 left-20 w-40 h-40 bg-yellow-400 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-20 w-40 h-40 bg-pink-400 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center space-y-8">
            <h2 className="text-4xl md:text-5xl font-bold text-white">
              Bring Your Ideas to<br />
              Life Today
            </h2>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-black hover:bg-gray-900 text-white rounded-full px-8 py-3 text-lg font-medium">
                AI Video Generator
              </Button>
              <Button className="bg-black hover:bg-gray-900 text-white rounded-full px-8 py-3 text-lg font-medium">
                AI Image Generator
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
            
            {/* Video Tools */}
            <div className="lg:col-span-1">
              <h3 className="text-white font-semibold mb-6 text-lg">Video Tools</h3>
              <ul className="space-y-3 text-sm">
                <li><Link href="/studio" className="text-gray-300 hover:text-white transition-colors">AI Video Generator</Link></li>
                <li><Link href="#" className="text-gray-300 hover:text-white transition-colors">Image to Video</Link></li>
                <li><Link href="#" className="text-gray-300 hover:text-white transition-colors">Photo to Video Avatar</Link></li>
                <li><Link href="#" className="text-gray-300 hover:text-white transition-colors">Video to Video</Link></li>
                <li><Link href="#" className="text-gray-300 hover:text-white transition-colors">Consistent Character Video</Link></li>
                <li><Link href="#" className="text-gray-300 hover:text-white transition-colors">AI Video Enhancer</Link></li>
                <li><Link href="#" className="text-gray-300 hover:text-white transition-colors">AI Video Extender</Link></li>
                <li><Link href="#" className="text-gray-300 hover:text-white transition-colors">Motion Brush</Link></li>
                <li><Link href="#" className="text-blue-400 hover:text-blue-300 transition-colors font-medium">More Tools</Link></li>
              </ul>
            </div>

            {/* Video Models */}
            <div className="lg:col-span-1">
              <h3 className="text-white font-semibold mb-6 text-lg">Video Models</h3>
              <ul className="space-y-3 text-sm">
                <li><Link href="#" className="text-gray-300 hover:text-white transition-colors">Kling AI</Link></li>
                <li><Link href="#" className="text-gray-300 hover:text-white transition-colors">Veo 3</Link></li>
                <li><Link href="#" className="text-gray-300 hover:text-white transition-colors">Runway</Link></li>
                <li><Link href="#" className="text-gray-300 hover:text-white transition-colors">Seedance</Link></li>
                <li><Link href="#" className="text-yellow-400 hover:text-yellow-300 transition-colors">Hailuo AI</Link></li>
                <li><Link href="#" className="text-gray-300 hover:text-white transition-colors">PixVerse AI</Link></li>
                <li><Link href="#" className="text-gray-300 hover:text-white transition-colors">Vidu AI</Link></li>
                <li><Link href="#" className="text-gray-300 hover:text-white transition-colors">Luma AI</Link></li>
                <li><Link href="#" className="text-gray-300 hover:text-white transition-colors">Midjourney</Link></li>
                <li><Link href="#" className="text-gray-300 hover:text-white transition-colors">Wanx AI</Link></li>
                <li><Link href="#" className="text-gray-300 hover:text-white transition-colors">Hunyuan</Link></li>
                <li><Link href="#" className="text-blue-400 hover:text-blue-300 transition-colors font-medium">More Models</Link></li>
              </ul>
            </div>

            {/* Image Models */}
            <div className="lg:col-span-1">
              <h3 className="text-white font-semibold mb-6 text-lg">Image Models</h3>
              <ul className="space-y-3 text-sm">
                <li><Link href="#" className="text-blue-400 hover:text-blue-300 transition-colors font-medium">Midjourney</Link></li>
                <li><Link href="#" className="text-gray-300 hover:text-white transition-colors">Flux AI</Link></li>
                <li><Link href="#" className="text-gray-300 hover:text-white transition-colors">GPT-4o</Link></li>
                <li><Link href="#" className="text-gray-300 hover:text-white transition-colors">Imagen</Link></li>
                <li><Link href="#" className="text-gray-300 hover:text-white transition-colors">Dall-E</Link></li>
                <li><Link href="#" className="text-gray-300 hover:text-white transition-colors">Recraft</Link></li>
                <li><Link href="#" className="text-gray-300 hover:text-white transition-colors">Ideogram</Link></li>
                <li><Link href="#" className="text-gray-300 hover:text-white transition-colors">Stable Diffusion</Link></li>
              </ul>
            </div>

            {/* Image Tools */}
            <div className="lg:col-span-1">
              <h3 className="text-white font-semibold mb-6 text-lg">Image Tools</h3>
              <ul className="space-y-3 text-sm">
                <li><Link href="#" className="text-gray-300 hover:text-white transition-colors">AI Image Generator</Link></li>
                <li><Link href="#" className="text-gray-300 hover:text-white transition-colors">Image to Image AI</Link></li>
                <li><Link href="#" className="text-gray-300 hover:text-white transition-colors">Chat to Image</Link></li>
                <li><Link href="#" className="text-gray-300 hover:text-white transition-colors">AI Art Generator</Link></li>
                <li><Link href="#" className="text-gray-300 hover:text-white transition-colors">Remove BG</Link></li>
                <li><Link href="#" className="text-gray-300 hover:text-white transition-colors">Object Remover</Link></li>
                <li><Link href="#" className="text-gray-300 hover:text-white transition-colors">Image Enhancer</Link></li>
                <li><Link href="#" className="text-gray-300 hover:text-white transition-colors">Ghibli AI Generator</Link></li>
                <li><Link href="#" className="text-gray-300 hover:text-white transition-colors">Anime Upscaler</Link></li>
                <li><Link href="#" className="text-gray-300 hover:text-white transition-colors">Image Generators</Link></li>
                <li><Link href="#" className="text-gray-300 hover:text-white transition-colors">LoRAs</Link></li>
                <li><Link href="#" className="text-blue-400 hover:text-blue-300 transition-colors font-medium">More Tools</Link></li>
              </ul>
            </div>

            {/* Company */}
            <div className="lg:col-span-1">
              <h3 className="text-white font-semibold mb-6 text-lg">Company</h3>
              <ul className="space-y-3 text-sm">
                <li><Link href="/about" className="text-gray-300 hover:text-white transition-colors">About Us</Link></li>
                <li><Link href="/contact" className="text-gray-300 hover:text-white transition-colors">Contact Us</Link></li>
                <li><Link href="/pricing" className="text-gray-300 hover:text-white transition-colors">Pricing</Link></li>
                <li><Link href="/api" className="text-gray-300 hover:text-white transition-colors">API</Link></li>
                <li><Link href="#" className="text-gray-300 hover:text-white transition-colors">MCP Server</Link></li>
                <li><Link href="#" className="text-gray-300 hover:text-white transition-colors">Download App</Link></li>
                <li><Link href="#" className="text-gray-300 hover:text-white transition-colors">Community</Link></li>
                <li><Link href="#" className="text-gray-300 hover:text-white transition-colors">Resources</Link></li>
                <li><Link href="#" className="text-gray-300 hover:text-white transition-colors">Creative Partner Program</Link></li>
                <li><Link href="#" className="text-gray-300 hover:text-white transition-colors">Affiliate Program</Link></li>
                <li><Link href="#" className="text-gray-300 hover:text-white transition-colors">Refund Policy</Link></li>
                <li><Link href="/privacy-policy" className="text-gray-300 hover:text-white transition-colors">Privacy Policy</Link></li>
                <li><Link href="/terms-of-service" className="text-gray-300 hover:text-white transition-colors">Terms and Conditions</Link></li>
              </ul>
            </div>

            {/* Social and Apps */}
            <div className="lg:col-span-1">
              <div className="space-y-8">
                {/* Logo and Language */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                      <span className="text-white font-bold text-lg">P</span>
                    </div>
                    <span className="text-xl font-bold text-white">Pollo.ai</span>
                  </div>
                  <div className="flex items-center space-x-1 text-sm text-gray-300">
                    <span className="w-4 h-4 rounded-full bg-blue-500"></span>
                    <span>English</span>
                  </div>
                </div>

                {/* Social Icons */}
                <div className="flex items-center space-x-4">
                  <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                    <Twitter className="w-5 h-5" />
                  </Link>
                  <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                    <Instagram className="w-5 h-5" />
                  </Link>
                  <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                    <Youtube className="w-5 h-5" />
                  </Link>
                  <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                    <MessageCircle className="w-5 h-5" />
                  </Link>
                  <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                    <MessageCircle className="w-5 h-5" />
                  </Link>
                </div>

                {/* App Store Buttons */}
                <div className="space-y-3">
                  <Link href="#" className="flex items-center space-x-2 bg-gray-800 hover:bg-gray-700 rounded-lg px-4 py-2 transition-colors">
                    <Apple className="w-6 h-6 text-white" />
                    <div className="text-left">
                      <div className="text-xs text-gray-400">Download on the</div>
                      <div className="text-sm font-medium text-white">App Store</div>
                    </div>
                  </Link>
                  
                  <Link href="#" className="flex items-center space-x-2 bg-gray-800 hover:bg-gray-700 rounded-lg px-4 py-2 transition-colors">
                    <Play className="w-6 h-6 text-white" />
                    <div className="text-left">
                      <div className="text-xs text-gray-400">Get it on</div>
                      <div className="text-sm font-medium text-white">Google Play</div>
                    </div>
                  </Link>
                </div>
              </div>
            </div>

          </div>

          {/* Bottom Copyright */}
          <div className="border-t border-gray-800 mt-12 pt-8">
            <div className="text-center">
              <div className="text-gray-400 text-sm">
                © 2025 Pollo.ai. All rights reserved.
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}