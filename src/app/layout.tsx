import type { Metadata } from "next";
import { Playfair_Display, Lora, Work_Sans, Space_Mono } from "next/font/google";
import "./globals.css";
import { BASE_URL } from "@/lib/constants";
import { Analytics } from "@vercel/analytics/next"
import Script from "next/script";

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
  description: "Aurews delivers next-generation news and analysis on business, technology, AI, politics, markets, and lifestyle trends.",
  metadataBase: new URL(BASE_URL),
  openGraph: {
    title: "Aurews",
    description: "Aurews delivers next-generation news and analysis on business, technology, AI, politics, markets, and lifestyle trends.",
    url: BASE_URL,
    siteName: "Aurews",
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary",
    title: "Aurews",
    description:
      "Aurews delivers next-generation news and analysis on business, technology, AI, politics, markets, and lifestyle trends.",
  },

  robots: {
    index: true,
    follow: true,
  },
};

import { UtilityBar } from "@/components/layout/UtilityBar";
import { Masthead } from "@/components/layout/Masthead";
import { Footer } from "@/components/layout/Footer";
import { SpeedInsights } from "@vercel/speed-insights/next";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${lora.variable} ${workSans.variable} ${spaceMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <link rel="preconnect" href="https://images.unsplash.com" />
        <link rel="preconnect" href="https://res.cloudinary.com" />
        {/* Google Tag Manager */}
        <Script id="google-tag-manager" strategy="afterInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-N3T37ZSQ');
          `}
        </Script>
        {/* End Google Tag Manager */}

        {/* Google tag (gtag.js) */}
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-LD00Y10ZRH"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-LD00Y10ZRH');
          `}
        </Script>
      </head>
      <body className="wired-body">
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-N3T37ZSQ"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        {/* End Google Tag Manager (noscript) */}

        <UtilityBar />
        <Masthead />
        <main style={{ minHeight: '80vh', padding: 'var(--space-12) 0' }}>
          {children}
        </main>
        <Footer />
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
