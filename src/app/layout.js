import "./globals.css";
import { cx } from "@/src/utils";
import { Inter, Manrope } from "next/font/google";
import Header from "@/src/components/Header";
import Footer from "../components/Footer";
import siteMetadata from "../utils/siteMetaData";
import Script from "next/script";
import NextTopLoader from 'nextjs-toploader';

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-in",
});

const manrope = Manrope({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-mr",
});

export const metadata = {
  metadataBase: new URL(siteMetadata.siteUrl),
  title: {
    template: `%s | ${siteMetadata.title}`,
    default: siteMetadata.title,
  },
  description: siteMetadata.description,
  openGraph: {
    title: siteMetadata.title,
    description: siteMetadata.description,
    url: siteMetadata.siteUrl,
    siteName: siteMetadata.title,
    images: [siteMetadata.socialBanner],
    locale: "en_US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  twitter: {
    card: "summary_large_image",
    title: siteMetadata.title,
    images: [siteMetadata.socialBanner],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={cx(
          inter.variable,
          manrope.variable,
          "font-mr bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 dark:from-black dark:via-purple-950 dark:to-black min-h-screen",
          "relative overflow-x-hidden"
        )}
      >
        <NextTopLoader color="#8B5CF6" />
        {/* Animated background elements */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          {/* Floating orbs */}
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute top-3/4 right-1/4 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-pink-500/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
          
          {/* Animated grid */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:100px_100px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]"></div>
          
          {/* Shooting stars */}
          <div className="absolute top-20 left-20 w-2 h-2 bg-white rounded-full animate-ping opacity-75"></div>
          <div className="absolute top-40 right-32 w-1 h-1 bg-purple-400 rounded-full animate-ping opacity-60 delay-700"></div>
          <div className="absolute bottom-40 left-40 w-1.5 h-1.5 bg-indigo-400 rounded-full animate-ping opacity-80 delay-1500"></div>
        </div>

        {/* Theme management */}
        <Script id="theme-manager" strategy="beforeInteractive">
          {`
            // Enhanced theme management
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            const storedTheme = localStorage.getItem('theme');
            const theme = storedTheme || (prefersDark ? 'dark' : 'light');
            
            document.documentElement.classList.add(theme);
            localStorage.setItem('theme', theme);
          `}
        </Script>

        {/* Page content with enhanced layout */}
        <div className="relative z-10 flex flex-col min-h-screen">
          {/* Header with enhanced backdrop */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-transparent pointer-events-none"></div>
            <Header />
          </div>

          {/* Main content area */}
          <main className="flex-1 relative">
            {/* Content backdrop */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/5 to-transparent pointer-events-none"></div>
            
            {/* Children content */}
            <div className="relative z-10">
              {children}
            </div>
          </main>

          {/* Footer with enhanced backdrop */}
          <div className="relative mt-auto">
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none"></div>
            <Footer />
          </div>
        </div>

        {/* Performance optimization script */}
        <Script id="performance-optimizer" strategy="afterInteractive">
          {`
            // Optimize animations for performance
            const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
            
            if (prefersReducedMotion) {
              document.documentElement.style.setProperty('--animation-duration', '0.01ms');
            }
            
            // Smooth scroll behavior
            document.documentElement.style.scrollBehavior = 'smooth';
          `}
        </Script>
      </body>
    </html>
  );
}