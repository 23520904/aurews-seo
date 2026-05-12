import type { Metadata } from "next";
import { Playfair_Display, Lora, Work_Sans, Space_Mono } from "next/font/google";
import "./globals.css";
import { auth } from "@/auth";
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
  metadataBase: new URL("https://aurews.id.vn"),
  openGraph: {
    title: "Aurews",
    description: "Editorial News Platform",
    url: "https://aurews.id.vn",
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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  return (
    <html lang="en" className={`${playfair.variable} ${lora.variable} ${workSans.variable} ${spaceMono.variable}`}>
      <body className="wired-body">
        <UtilityBar session={session} />
        <Masthead session={session} />
        <main style={{ minHeight: '80vh', padding: '80px 0' }}>
          {children}
        </main>

        <Footer />
      </body>
    </html>
  );
}


