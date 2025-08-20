import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ClientBody from "./ClientBody";
import { AuthProvider } from "@/contexts/AuthContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "SeeWorld - 全球首个免费AI视频生成平台 | Free AI Video Generator",
    template: "%s | SeeWorld - 免费AI视频生成"
  },
  description: "SeeWorld是全球首个完全免费的AI视频生成平台，集成Kling AI、Runway、Hailuo AI等顶级模型。无需付费即可体验专业级AI视频创作，让创意瞬间成真。World's first completely free AI video generation platform.",
  keywords: [
    "免费AI视频生成",
    "free AI video generator",
    "AI视频制作",
    "AI video creation",
    "视频生成器",
    "video generation",
    "人工智能视频",
    "artificial intelligence video",
    "免费视频制作",
    "free video creation",
    "AI视频工具",
    "AI video tools",
    "在线视频生成",
    "online video generation",
    "Kling AI",
    "Runway AI",
    "Hailuo AI",
    "Vidu AI",
    "文本生成视频",
    "text to video",
    "创意视频制作",
    "creative video production"
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
    title: "SeeWorld - 全球首个免费AI视频生成平台 | Free AI Video Generator",
    description: "全球首个完全免费的AI视频生成平台，集成多个顶级AI模型，无需付费即可创作专业视频。World's first completely free AI video generation platform.",
    siteName: "SeeWorld - 免费AI视频生成",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "SeeWorld AI Video Creation Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SeeWorld - 全球首个免费AI视频生成平台",
    description: "全球首个完全免费的AI视频生成平台，集成Kling AI、Runway等顶级模型，无需付费即可创作专业视频。",
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
              "name": "SeeWorld - 全球首个免费AI视频生成平台",
              "description": "全球首个完全免费的AI视频生成平台，集成Kling AI、Runway、Hailuo AI等顶级模型，支持文本生成视频、AI视频制作等功能。World's first completely free AI video generation platform.",
              "url": "https://seeworld.app",
              "applicationCategory": "MultimediaApplication",
              "operatingSystem": "Web",
              "keywords": "免费AI视频生成,AI视频制作,视频生成器,人工智能视频,在线视频生成,文本生成视频",
              "offers": [
                {
                  "@type": "Offer",
                  "price": "0",
                  "priceCurrency": "USD",
                  "name": "Free Plan"
                },
                {
                  "@type": "Offer",
                  "price": "16",
                  "priceCurrency": "USD",
                  "name": "Plus Plan"
                },
                {
                  "@type": "Offer",
                  "price": "166",
                  "priceCurrency": "USD",
                  "name": "Pro Plan"
                }
              ]
            })
          }}
        />
      </head>
      <ClientBody className={inter.className}>
        <AuthProvider>
          {children}
        </AuthProvider>
      </ClientBody>
    </html>
  );
}
