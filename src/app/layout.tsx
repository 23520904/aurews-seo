import type { Metadata } from "next";
import { Playfair_Display, Lora, Work_Sans, Space_Mono } from "next/font/google";
import "./globals.css";
import { BASE_URL } from "@/lib/constants";

const playfair = Playfair_Display({
  variable: "--font-display",
  subsets: ["latin"],
});

const lora = Lora({
  variable: "--font-body",
  subsets: ["latin"],
});

const workSans = Work_Sans({
  variable: "--font-ui",
  subsets: ["latin"],
});

const spaceMono = Space_Mono({
  variable: "--font-mono",
  weight: ["400", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Aurews — Next-Gen News Architecture",
    template: "%s | Aurews"
  },
  description: "A WIRED-inspired editorial news platform built with Next.js App Router, optimized for SEO and performance.",
  metadataBase: new URL(BASE_URL),
  openGraph: {
    title: "Aurews",
    description: "Editorial News Platform",
    url: BASE_URL,
    siteName: "Aurews",
    locale: "en_US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

import { UtilityBar } from "@/components/layout/UtilityBar";
import { Masthead } from "@/components/layout/Masthead";
import { Footer } from "@/components/layout/Footer";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${lora.variable} ${workSans.variable} ${spaceMono.variable}`}>
      <body className="wired-body">
        <UtilityBar />
        <Masthead />
        <main style={{ minHeight: '80vh', padding: 'var(--space-12) 0' }}>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}


