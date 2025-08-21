import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ClientBody from "./ClientBody";
import { AuthProvider } from "@/contexts/AuthContext";
import CookieBanner from "@/components/CookieBanner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "World's First One-Stop Free AI Image & Video Creation Platform",
    template: "%s | World's First One-Stop Free AI Image & Video Creation Platform"
  },
  description: "Experience the world's first completely free AI-powered platform for creating stunning videos and images instantly. Generate high-quality visuals from text prompts or images with advanced AI models including GPT-4, Claude, Gemini, and DeepSeek - no technical skills required. Your one-stop AI image & video creation platform.",
  keywords: [
    "free AI video generator",
    "free AI image generator",
    "world's first free AI platform",
    "one-stop AI creation platform",
    "AI video generator free",
    "AI image creator free",
    "free video generation tool",
    "free image generation tool",
    "AI-powered content creation",
    "instant video generator",
    "instant image creator",
    "AI visual content generator",
    "free AI content creation",
    "AI video maker online",
    "AI image maker online",
    "text to video AI free",
    "text to image AI free",
    "GPT-4 video generator",
    "Claude image generator",
    "Gemini AI content",
    "DeepSeek AI platform",
    "no cost AI generator",
    "completely free AI tools",
    "AI video creation platform",
    "AI image creation platform",
    "free multimedia AI generator",
    "AI content generator free",
    "online AI video maker",
    "online AI image maker",
    "free artificial intelligence tools"
  ],
  authors: [{ name: "SeeWorld" }],
  creator: "SeeWorld",
  publisher: "SeeWorld",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://seeworld.app"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://seeworld.app",
    title: "全球首个一站式 免费AI 图像和视频创作平台",
    description: "Experience the world's first completely free AI-powered platform for creating stunning videos and images instantly. Generate high-quality visuals from text prompts or images with advanced AI models - no technical skills required.",
    siteName: "全球首个一站式 免费AI 图像和视频创作平台",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Free AI Video Generator - AI Image Generator Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "全球首个一站式 免费AI 图像和视频创作平台",
    description: "Experience the world's first completely free AI-powered platform for creating stunning videos and images instantly. Generate high-quality visuals with advanced AI models - no technical skills required.",
    images: ["/og-image.jpg"],
    creator: "@seeworld",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              "name": "World's First One-Stop Free AI Image & Video Creation Platform",
              "alternateName": "World's First One-Stop Free AI Image & Video Creation Platform",
              "description": "Experience the world's first completely free AI-powered platform for creating stunning videos and images instantly. Generate high-quality visuals from text prompts or images with advanced AI models including GPT-4, Claude, Gemini, and DeepSeek - no technical skills required. Your one-stop AI image & video creation platform.",
              "url": "https://seeworld.app",
              "applicationCategory": "MultimediaApplication",
              "operatingSystem": "Web",
              "keywords": "free AI video generator,free AI image generator,world's first free AI platform,one-stop AI creation platform,AI-powered content creation,instant video generator,instant image creator,free video generation tool,free image generation tool,GPT-4,Claude,Gemini,DeepSeek,completely free AI tools,AI visual content generator",
              "featureList": [
                "World's first completely free AI video generation",
                "World's first completely free AI image generation", 
                "One-stop AI creation platform",
                "Instant video generation from text prompts",
                "Instant image creation from text prompts",
                "Advanced GPT-4 model integration",
                "Claude AI-powered content creation",
                "Google Gemini AI support",
                "DeepSeek technology acceleration",
                "No technical skills required",
                "High-quality visual content generation",
                "Text-to-video conversion",
                "Text-to-image conversion",
                "Image-to-video transformation",
                "AI-powered visual enhancement",
                "Completely free access to all features"
              ],
              "offers": [
                {
                  "@type": "Offer",
                  "price": "0",
                  "priceCurrency": "USD",
                  "name": "Free Plan",
                  "description": "Completely free access to all AI generation features"
                },
                {
                  "@type": "Offer", 
                  "price": "10",
                  "priceCurrency": "USD",
                  "name": "Lite Version",
                  "description": "More generation credits and advanced features"
                },
                {
                  "@type": "Offer",
                  "price": "14.5", 
                  "priceCurrency": "USD",
                  "name": "Professional Version",
                  "description": "Unlimited usage and professional-grade features"
                }
              ],
              "author": {
                "@type": "Organization",
                "name": "SeeWorld"
              },
              "creator": {
                "@type": "Organization", 
                "name": "SeeWorld"
              },
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "4.8",
                "ratingCount": "2547",
                "bestRating": "5",
                "worstRating": "1"
              },
              "review": [
                {
                  "@type": "Review",
                  "reviewRating": {
                    "@type": "Rating",
                    "ratingValue": "5",
                    "bestRating": "5"
                  },
                  "author": {
                    "@type": "Person",
                    "name": "Digital Creator"
                  },
                  "reviewBody": "Amazing free AI platform! The world's first truly free video and image generator with professional quality results."
                }
              ]
            })
          }}
        />
      </head>
      <ClientBody className={inter.className}>
        <AuthProvider>
          {children}
          <CookieBanner />
        </AuthProvider>
      </ClientBody>
    </html>
  );
}
