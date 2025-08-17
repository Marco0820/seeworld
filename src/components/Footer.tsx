"use client";

import { Button } from "@/components/ui/button";
import { Mail, Twitter, Github, Linkedin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="px-6 py-16 md:py-24 border-t border-white/10">
      <div className="max-w-7xl mx-auto">
        {/* Main CTA Section */}
        <div className="text-center mb-16">
          <div className="max-w-3xl mx-auto">
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Let's Make Something Amazing
            </h3>
            <p className="text-xl text-white/70 mb-4">
              SeeWorld is currently in private beta.
            </p>
            <p className="text-lg text-white/60 mb-8">
              Join Our Waitlist to Start Your Journey of Video Creation.
            </p>
            <Button
              size="lg"
              className="bg-white text-black hover:bg-white/90 font-semibold px-8 py-6 text-lg"
              onClick={() => window.location.href = '#pricing'}
            >
              Get Started
            </Button>
          </div>
        </div>

        {/* Links and Information */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Company */}
          <div>
            <h4 className="font-semibold text-white mb-4">Company</h4>
            <ul className="space-y-2 text-white/60">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Careers
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Press
                </a>
              </li>
            </ul>
          </div>

          {/* Product */}
          <div>
            <h4 className="font-semibold text-white mb-4">Product</h4>
            <ul className="space-y-2 text-white/60">
              <li>
                <a href="#features" className="hover:text-white transition-colors">
                  Features
                </a>
              </li>
              <li>
                <a href="#pricing" className="hover:text-white transition-colors">
                  Pricing
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  API
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Documentation
                </a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-semibold text-white mb-4">Support</h4>
            <ul className="space-y-2 text-white/60">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Status
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Community
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold text-white mb-4">Legal</h4>
            <ul className="space-y-2 text-white/60">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Cookie Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  GDPR
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            {/* Copyright */}
            <p className="text-white/60 text-sm">
              © SeeWorld 2025. All rights reserved.
            </p>

            {/* Social Links */}
            <div className="flex items-center space-x-4">
              <a
                href="#"
                className="p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-4 h-4 text-white" />
              </a>
              <a
                href="#"
                className="p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4 text-white" />
              </a>
              <a
                href="#"
                className="p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
                aria-label="GitHub"
              >
                <Github className="w-4 h-4 text-white" />
              </a>
              <a
                href="mailto:support@seeworld.app"
                className="p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
                aria-label="Email"
              >
                <Mail className="w-4 h-4 text-white" />
              </a>
            </div>

            {/* Domain Link */}
            <div className="text-sm text-white/60">
              <a
                href="https://seeworld.app"
                className="hover:text-white transition-colors"
              >
                seeworld.app
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
