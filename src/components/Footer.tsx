"use client";

import { Button } from "@/components/ui/button";
import { Mail, Twitter, Github, Linkedin, Sparkles } from "lucide-react";

export default function Footer() {
  return (
    <footer className="px-6 py-16 md:py-24 bg-gradient-to-b from-gray-800 to-gray-900 border-t border-gray-600">
      <div className="max-w-7xl mx-auto">
        {/* Main CTA Section */}
        <div className="text-center mb-16">
          <div className="max-w-3xl mx-auto">
            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-800 to-purple-800 text-purple-200 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Sparkles className="w-4 h-4" />
              <span>Start Your AI Creation Journey</span>
            </div>
            
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Let's Create Amazing Content Together
            </h3>
            <p className="text-xl text-gray-300 mb-4">
              Pollo AI is providing the most advanced AI tools for creators worldwide
            </p>
            <p className="text-lg text-gray-400 mb-8">
              Join us now and start your new video and image creation experience
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                size="lg"
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-4 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                Start Creating for Free
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-2 border-gray-500 hover:border-blue-400 text-gray-300 hover:text-blue-400 font-semibold px-8 py-4 text-lg rounded-xl transition-all duration-300"
              >
                Learn More
              </Button>
            </div>
          </div>
        </div>

        {/* Links and Information */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Products */}
          <div>
            <h4 className="font-semibold text-white mb-4">Products</h4>
            <ul className="space-y-3 text-gray-300">
              <li>
                <a href="#" className="hover:text-blue-400 transition-colors">
                  AI Video Generator
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-400 transition-colors">
                  AI Image Generator
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-400 transition-colors">
                  Effects Library
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-400 transition-colors">
                  API Interface
                </a>
              </li>
            </ul>
          </div>

          {/* Features */}
          <div>
            <h4 className="font-semibold text-white mb-4">Features</h4>
            <ul className="space-y-3 text-gray-300">
              <li>
                <a href="#" className="hover:text-blue-400 transition-colors">
                  Text to Video
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-400 transition-colors">
                  Image to Video
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-400 transition-colors">
                  Text to Image
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-400 transition-colors">
                  Style Transfer
                </a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-semibold text-white mb-4">Support</h4>
            <ul className="space-y-3 text-gray-300">
              <li>
                <a href="#" className="hover:text-blue-400 transition-colors">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-400 transition-colors">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-400 transition-colors">
                  User Community
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-400 transition-colors">
                  Documentation
                </a>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold text-white mb-4">Company</h4>
            <ul className="space-y-3 text-gray-300">
              <li>
                <a href="#" className="hover:text-blue-400 transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-400 transition-colors">
                  Careers
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-400 transition-colors">
                  News
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-400 transition-colors">
                  Partners
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-600 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            {/* Logo and Copyright */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">P</span>
                </div>
                <span className="text-xl font-bold text-white">Pollo AI</span>
              </div>
              <span className="text-gray-400">|</span>
              <p className="text-gray-400 text-sm">
                © 2025 Pollo AI. All rights reserved
              </p>
            </div>

            {/* Social Links */}
            <div className="flex items-center space-x-4">
              <a
                href="#"
                className="p-2 bg-gray-700 hover:bg-blue-800 text-gray-300 hover:text-blue-400 rounded-full transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="p-2 bg-gray-700 hover:bg-blue-800 text-gray-300 hover:text-blue-400 rounded-full transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="p-2 bg-gray-700 hover:bg-blue-800 text-gray-300 hover:text-blue-400 rounded-full transition-colors"
                aria-label="GitHub"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href="mailto:support@pollo.ai"
                className="p-2 bg-gray-700 hover:bg-blue-800 text-gray-300 hover:text-blue-400 rounded-full transition-colors"
                aria-label="Email"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>

            {/* Legal Links */}
            <div className="flex items-center space-x-4 text-sm text-gray-400">
              <a href="#" className="hover:text-blue-400 transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-blue-400 transition-colors">
                Terms of Service
              </a>
              <a href="#" className="hover:text-blue-400 transition-colors">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
