"use client";

import Script from "next/script";

interface ClientBodyProps {
  children: React.ReactNode;
  className?: string;
}

export default function ClientBody({ children, className }: ClientBodyProps) {
  return (
    <body suppressHydrationWarning className={`antialiased ${className || ""}`}>
      {children}
      <Script
        crossOrigin="anonymous"
        src="//unpkg.com/same-runtime/dist/index.global.js"
        strategy="afterInteractive"
      />
    </body>
  );
}
