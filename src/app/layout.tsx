import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ClientBody from "./ClientBody";
import { AuthProvider } from "@/contexts/AuthContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "SeeWorld - The World's First AI Video Creation Agent",
    template: "%s | SeeWorld"
  },
  description: "SeeWorld integrates the most advanced AI models for image and video generation on the market. It intelligently selects the best model combination based on your creative needs to help you get the job done.",
  keywords: [
    "AI video creation",
    "video generation",
    "artificial intelligence",
    "content creation",
    "video editing",
    "AI agent",
    "video production",
    "creative tools"
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
    title: "SeeWorld - The World's First AI Video Creation Agent",
    description: "SeeWorld integrates the most advanced AI models for image and video generation on the market.",
    siteName: "SeeWorld",
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
    title: "SeeWorld - The World's First AI Video Creation Agent",
    description: "SeeWorld integrates the most advanced AI models for image and video generation on the market.",
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
              "name": "SeeWorld",
              "description": "The World's First AI Video Creation Agent",
              "url": "https://seeworld.app",
              "applicationCategory": "MultimediaApplication",
              "operatingSystem": "Web",
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
