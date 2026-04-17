import type { Metadata, Viewport } from "next";
import { Manrope, Syne } from "next/font/google";
import "./globals.css";
import {
  generateOrganizationSchema,
  generateLocalBusinessSchema,
  generateServiceSchema,
  generateBlogCollectionSchema,
} from "@/lib/schema";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["700", "800"],
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#0a0a0a",
};

export const metadata: Metadata = {
  title: "ArtiMindArt | Elite AI Art & Engineering Services",
  description: "Premium AI art direction, prompt engineering, and visual strategy for brands, agencies, and creative studios. Specializing in Midjourney, SREF creation, and AI-powered visual content.",
  keywords: [
    "AI art",
    "Midjourney",
    "prompt engineering",
    "art direction",
    "visual strategy",
    "AI design",
    "SREF codes",
    "AI art consultant",
    "creative AI services",
  ],
  authors: [{ name: "ArtiMindArt" }],
  metadataBase: new URL("https://artimindart.com"),
  openGraph: {
    title: "ArtiMindArt | Elite AI Artist & Engineer",
    description: "Premium AI art services for high-end brands and creative professionals. Specializing in Midjourney optimization and visual strategy.",
    url: "https://artimindart.com",
    siteName: "ArtiMindArt",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "ArtiMindArt - AI Art Direction Services",
      },
      {
        url: "/og-image-square.jpg",
        width: 800,
        height: 800,
        alt: "ArtiMindArt Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ArtiMindArt | Elite AI Artist & Engineer",
    description: "Premium AI art direction and prompt engineering services.",
    images: ["/og-image.jpg"],
    creator: "@artimindart",
  },
  robots: {
    index: true,
    follow: true,
    "max-image-preview": "large",
    "max-snippet": -1,
    "max-video-preview": -1,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "google-site-verification-code-here",
    yandex: "yandex-verification-code-here",
  },
  alternates: {
    canonical: "https://artimindart.com",
    languages: {
      "en-US": "https://artimindart.com",
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // JSON-LD Schemas
  const organizationSchema = generateOrganizationSchema();
  const localBusinessSchema = generateLocalBusinessSchema();
  const serviceSchema = generateServiceSchema();
  const blogSchema = generateBlogCollectionSchema();

  return (
    <html
      lang="en"
      className={`${manrope.variable} ${syne.variable}`}
    >
      <head>
        <meta charSet="utf-8" />
        <link rel="canonical" href="https://artimindart.com" />

        {/* Preconnect a dominios externos para mejorar performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />

        {/* Favicon y Apple Touch Icon */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />

        {/* Web App Manifest para PWA */}
        <link rel="manifest" href="/site.webmanifest" />

        {/* JSON-LD Schemas - Organization */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
          suppressHydrationWarning
        />

        {/* JSON-LD Schemas - LocalBusiness */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
          suppressHydrationWarning
        />

        {/* JSON-LD Schemas - Service */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
          suppressHydrationWarning
        />

        {/* JSON-LD Schemas - Blog Collection */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }}
          suppressHydrationWarning
        />

        {/* Theme Color para navegadores móviles */}
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="format-detection" content="telephone=no" />

        {/* Preload críticos recursos */}
        <link rel="preload" as="image" href="/og-image.jpg" />
      </head>
      <body className="antialiased bg-dark-50 text-dark-900">
        {children}
        {/* Film grain overlay */}
        <div className="noise" />
        {/* Custom cursor */}
        <div id="cursor" className="cursor" />
      </body>
    </html>
  );
}
