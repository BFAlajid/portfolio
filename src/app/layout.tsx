import type { Metadata } from "next";
import { Inter, Archivo_Black } from "next/font/google";
import "./globals.css";
import { config } from "@/data/config";

import Header from "@/components/header/header";
import Footer from "@/components/footer/footer";
import AppOverlays from "@/components/app-overlays";
import { Providers } from "@/components/providers";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";

export const metadata: Metadata = {
  title: config.title,
  description: config.description.long,
  keywords: config.keywords,
  authors: [{ name: config.author }],
  openGraph: {
    title: config.title,
    description: config.description.short,
    url: config.site,
    images: [
      {
        url: config.ogImg,
        width: 800,
        height: 600,
        alt: "Portfolio preview",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: config.title,
    description: config.description.short,
    images: [config.ogImg],
  },
  robots: {
    index: true,
    follow: true,
  },
};

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const archivoBlack = Archivo_Black({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-display",
  display: "swap",
  adjustFontFallback: true,
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={[inter.variable, archivoBlack.variable, "dark", "font-display"].join(" ")} suppressHydrationWarning>
      <head>
        {/* If you are reading this, I probably want to work with you. basilfrancis.alajid@yahoo.com */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "WebSite",
                  name: config.author,
                  url: config.site,
                  description: config.description.short,
                },
                {
                  "@type": "Person",
                  name: config.author,
                  url: config.site,
                  jobTitle: "Full Stack Developer",
                  worksFor: {
                    "@type": "Organization",
                    name: "Accenture",
                  },
                  address: {
                    "@type": "PostalAddress",
                    addressLocality: "Cebu City",
                    addressCountry: "PH",
                  },
                  sameAs: [
                    config.social.github,
                    config.social.linkedin,
                  ],
                  knowsAbout: [
                    "React", "TypeScript", "Next.js", "Node.js",
                    "Playwright", "Docker", "PostgreSQL", "AWS",
                  ],
                },
              ],
            }),
          }}
        />
        <script dangerouslySetInnerHTML={{ __html: `
          window.addEventListener('error', function(e) {
            if (e.message && (e.message.includes('ChunkLoadError') || e.message.includes('Loading chunk'))) {
              window.location.reload();
            }
          });
        `}} />
      </head>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[9999] focus:px-4 focus:py-2 focus:rounded-lg focus:bg-[var(--gold)] focus:text-black focus:font-mono focus:text-sm focus:font-semibold"
        >
          Skip to content
        </a>
        <Providers>
          <Header />
          {children}
          <Footer />
          <AppOverlays />
          <SpeedInsights />
          <Analytics />
        </Providers>
      </body>
    </html>
  );
}
