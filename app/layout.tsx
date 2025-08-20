import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Suspense } from "react";
import Script from "next/script";
import { AnnouncerProvider } from "@/components/accessibility/announcer";
import { KeyboardShortcutsProvider } from "@/components/accessibility/keyboard-shortcuts";
import { SkipLinks } from "@/components/accessibility/skip-link";

// Optimize font loading with display swap
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
  preload: true,
  fallback: ["system-ui", "arial"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
  preload: false, // Only preload primary font
  fallback: ["ui-monospace", "Menlo", "Monaco", "monospace"],
});

// Enhanced metadata for performance, SEO, and accessibility
export const metadata: Metadata = {
  title: {
    template: "%s | Restaurant Dashboard",
    default: "Restaurant Dashboard - Complete Management Solution",
  },
  description: "Comprehensive restaurant management dashboard with real-time analytics, inventory tracking, order management, and performance monitoring. Fully accessible and WCAG 2.1 AA compliant.",
  keywords: ["restaurant", "dashboard", "management", "analytics", "inventory", "orders", "POS", "accessibility", "WCAG"],
  authors: [{ name: "Restaurant Dashboard Team" }],
  creator: "Restaurant Dashboard",
  publisher: "Restaurant Dashboard",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'https://localhost:3000'),
  alternates: {
    canonical: "/",
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
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    title: "Restaurant Dashboard - Complete Management Solution",
    description: "Comprehensive restaurant management dashboard with real-time analytics, inventory tracking, and order management. Fully accessible and WCAG 2.1 AA compliant.",
    siteName: "Restaurant Dashboard",
  },
  twitter: {
    card: "summary_large_image",
    title: "Restaurant Dashboard - Complete Management Solution",
    description: "Comprehensive restaurant management dashboard with real-time analytics, inventory tracking, and order management. Fully accessible and WCAG 2.1 AA compliant.",
  },
  manifest: "/manifest.json",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [
      { url: "/apple-icon-180.png", sizes: "180x180", type: "image/png" },
    ],
  },
  other: {
    // Accessibility metadata
    'accessibility': 'WCAG 2.1 AA compliant',
    'color-scheme': 'light dark',
  },
};

// Viewport configuration for optimal mobile performance and accessibility
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5, // Allow zooming up to 500% for low vision users
  userScalable: true, // Important for accessibility
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
  colorScheme: "light dark",
};

// Accessible loading component with proper announcements
const GlobalLoading = () => (
  <div 
    className="fixed inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm z-50"
    role="status"
    aria-live="polite"
    aria-label="Loading application"
  >
    <div className="flex flex-col items-center gap-4">
      <div 
        className="animate-spin rounded-full h-8 w-8 border-2 border-primary border-t-transparent"
        aria-hidden="true"
      />
      <p className="text-sm text-muted-foreground">Loading Dashboard...</p>
    </div>
  </div>
);

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* DNS prefetching for external resources */}
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//fonts.gstatic.com" />
        
        {/* Preconnect to critical origins */}
        <link rel="preconnect" href="https://fonts.googleapis.com" crossOrigin="" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        
        {/* Critical inline CSS for immediate rendering and accessibility */}
        <style dangerouslySetInnerHTML={{
          __html: `
            /* Critical CSS for initial render */
            .loading-screen {
              position: fixed;
              top: 0;
              left: 0;
              width: 100%;
              height: 100%;
              background: #ffffff;
              display: flex;
              align-items: center;
              justify-content: center;
              z-index: 9999;
            }
            
            @media (prefers-color-scheme: dark) {
              .loading-screen {
                background: #0a0a0a;
              }
            }
            
            .loading-spinner {
              width: 32px;
              height: 32px;
              border: 2px solid #e5e7eb;
              border-top: 2px solid #f3890d;
              border-radius: 50%;
              animation: spin 1s linear infinite;
            }
            
            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
            
            /* Prevent layout shift */
            html {
              scroll-behavior: smooth;
            }
            
            body {
              font-synthesis: none;
              text-rendering: optimizeLegibility;
              -webkit-font-smoothing: antialiased;
              -moz-osx-font-smoothing: grayscale;
            }
            
            /* Accessibility Enhancement Styles */
            
            /* Focus management */
            .focus-visible {
              outline: 2px solid hsl(var(--ring, 210 100% 50%));
              outline-offset: 2px;
            }
            
            /* High contrast mode support */
            @media (prefers-contrast: high) {
              :root {
                --background: 0 0% 100%;
                --foreground: 0 0% 0%;
                --primary: 210 100% 25%;
                --primary-foreground: 0 0% 100%;
                --border: 0 0% 0%;
                --input: 0 0% 100%;
                --ring: 210 100% 50%;
              }
            }
            
            .high-contrast {
              --background: 0 0% 100%;
              --foreground: 0 0% 0%;
              --primary: 210 100% 25%;
              --primary-foreground: 0 0% 100%;
              --border: 0 0% 0%;
              --input: 0 0% 100%;
              --ring: 210 100% 50%;
              filter: contrast(150%);
            }
            
            /* Reduced motion support */
            @media (prefers-reduced-motion: reduce) {
              *, *::before, *::after {
                animation-duration: 0.01ms !important;
                animation-iteration-count: 1 !important;
                transition-duration: 0.01ms !important;
                scroll-behavior: auto !important;
              }
            }
            
            .reduce-motion * {
              animation-duration: 0.01ms !important;
              animation-iteration-count: 1 !important;
              transition-duration: 0.01ms !important;
            }
            
            /* Screen reader only content */
            .sr-only {
              position: absolute !important;
              width: 1px !important;
              height: 1px !important;
              padding: 0 !important;
              margin: -1px !important;
              overflow: hidden !important;
              clip: rect(0, 0, 0, 0) !important;
              white-space: nowrap !important;
              border: 0 !important;
            }
            
            .sr-only.focus:not(.focus\\:not-sr-only):focus,
            .focus\\:not-sr-only:focus {
              position: static !important;
              width: auto !important;
              height: auto !important;
              padding: inherit !important;
              margin: inherit !important;
              overflow: visible !important;
              clip: auto !important;
              white-space: normal !important;
            }
            
            /* Skip link styles */
            .skip-link {
              transform: translateY(-100%);
              transition: transform 0.2s ease-in-out;
            }
            
            .skip-link:focus {
              transform: translateY(0);
            }
            
            /* Font size preferences */
            .font-small { font-size: 0.875rem; line-height: 1.5; }
            .font-medium { font-size: 1rem; line-height: 1.5; }
            .font-large { font-size: 1.125rem; line-height: 1.6; }
            .font-extra-large { font-size: 1.25rem; line-height: 1.6; }
            
            /* Focus rings visibility */
            .focus-rings-visible :focus {
              outline: 2px solid hsl(var(--ring, 210 100% 50%));
              outline-offset: 2px;
            }
            
            .focus-rings-visible :focus:not(:focus-visible) {
              outline: none;
            }
            
            /* Mobile accessibility improvements */
            @media (max-width: 768px) {
              .mobile-a11y {
                --min-touch-size: 44px;
              }
              
              .mobile-a11y button,
              .mobile-a11y [role="button"],
              .mobile-a11y a {
                min-height: var(--min-touch-size);
                min-width: var(--min-touch-size);
                padding: 8px;
              }
              
              /* Larger text on mobile for better readability */
              .mobile-a11y {
                font-size: 1.125rem;
              }
            }
            
            /* Print accessibility */
            @media print {
              .sr-only {
                position: static !important;
                width: auto !important;
                height: auto !important;
                margin: 0 !important;
                overflow: visible !important;
                clip: auto !important;
                white-space: normal !important;
              }
              
              /* Show URLs for links in print */
              a[href]:after {
                content: " (" attr(href) ")";
                font-size: 0.8em;
                color: #666;
              }
              
              /* Ensure sufficient contrast in print */
              * {
                background: white !important;
                color: black !important;
              }
            }
            
            /* Windows High Contrast Mode support */
            @media screen and (-ms-high-contrast: active) {
              * {
                border-color: windowText !important;
                color: windowText !important;
              }
              
              .focus-visible {
                outline: 2px solid highlight !important;
              }
            }
            
            /* Forced colors mode support (Windows) */
            @media (forced-colors: active) {
              * {
                border-color: CanvasText !important;
                color: CanvasText !important;
                background: Canvas !important;
              }
              
              .focus-visible {
                outline: 2px solid Highlight !important;
                outline-offset: 2px;
              }
            }
          `
        }} />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        {/* Accessibility Providers - Must wrap entire application */}
        <AnnouncerProvider debugMode={process.env.NODE_ENV === 'development'}>
          <KeyboardShortcutsProvider>
            {/* Skip Links - Must be first interactive element for keyboard users */}
            <SkipLinks />

            {/* Performance monitoring initialization */}
            <Script
              id="performance-init"
              strategy="beforeInteractive"
              dangerouslySetInnerHTML={{
                __html: `
                  // Mark navigation start
                  performance.mark('navigation-start');
                  
                  // Initialize Web Vitals monitoring
                  window.performanceMetrics = [];
                  
                  // Early error handling
                  window.addEventListener('error', function(e) {
                    console.error('Global error:', e.error);
                  });
                  
                  // Unhandled promise rejection handling
                  window.addEventListener('unhandledrejection', function(e) {
                    console.error('Unhandled promise rejection:', e.reason);
                  });
                `,
              }}
            />

            {/* Main application content with semantic structure */}
            <Suspense fallback={<GlobalLoading />}>
              <div id="root" className="min-h-screen bg-background text-foreground">
                {/* Semantic page structure for screen readers */}
                <div className="flex flex-col min-h-screen">
                  {/* Banner/Header - Placeholder for page-specific headers */}
                  <div id="page-header" role="banner" className="sr-only">
                    <h1 className="sr-only">Restaurant Dashboard</h1>
                    <p className="sr-only">Comprehensive restaurant management system</p>
                  </div>
                  
                  {/* Main Navigation - Placeholder for navigation components */}
                  <div id="main-navigation" role="navigation" aria-label="Main navigation" className="sr-only">
                    <p className="sr-only">Navigation menu will appear here when available</p>
                  </div>
                  
                  {/* Main Content Area */}
                  <main id="main-content" role="main" className="flex-1" tabIndex={-1}>
                    {children}
                  </main>
                  
                  {/* Footer - Placeholder for page-specific footers */}
                  <div id="page-footer" role="contentinfo" className="sr-only">
                    <p className="sr-only">Page footer information will appear here when available</p>
                  </div>
                </div>
              </div>
            </Suspense>

            {/* Web Vitals and performance monitoring */}
            <Script
              id="web-vitals"
              strategy="afterInteractive"
              dangerouslySetInnerHTML={{
                __html: `
                  // Dynamic import of Web Vitals monitoring
                  if (typeof window !== 'undefined') {
                    import('/lib/performance/monitoring.js').then(module => {
                      if (module.initWebVitals) {
                        module.initWebVitals();
                      }
                    }).catch(err => {
                      console.warn('Failed to load performance monitoring:', err);
                    });
                  }
                `,
              }}
            />

            {/* Accessibility Initialization */}
            <Script
              id="accessibility-init"
              strategy="afterInteractive"
              dangerouslySetInnerHTML={{
                __html: `
                  // Initialize accessibility features
                  if (typeof window !== 'undefined') {
                    // Detect system preferences
                    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
                    const prefersHighContrast = window.matchMedia('(prefers-contrast: high)').matches;
                    const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
                    
                    // Apply initial accessibility classes
                    const root = document.documentElement;
                    if (prefersReducedMotion) root.classList.add('reduce-motion');
                    if (prefersHighContrast) root.classList.add('high-contrast');
                    
                    // Set up media query listeners
                    window.matchMedia('(prefers-reduced-motion: reduce)').addEventListener('change', (e) => {
                      root.classList.toggle('reduce-motion', e.matches);
                    });
                    
                    window.matchMedia('(prefers-contrast: high)').addEventListener('change', (e) => {
                      root.classList.toggle('high-contrast', e.matches);
                    });
                    
                    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
                      root.classList.toggle('dark', e.matches);
                    });
                    
                    // Import and initialize accessibility manager
                    import('/lib/accessibility/index.js').then(module => {
                      if (module.initializeAccessibility) {
                        const config = {
                          reduceMotion: prefersReducedMotion,
                          highContrast: prefersHighContrast,
                          focusRings: true,
                          screenReaderLevel: 'moderate',
                          keyboardMode: 'standard',
                          contrastLevel: 'AA'
                        };
                        
                        module.initializeAccessibility(config);
                        
                        // Mark accessibility as initialized
                        root.setAttribute('data-accessibility-initialized', 'true');
                        
                        // Dispatch ready event
                        window.dispatchEvent(new CustomEvent('accessibility:ready', { detail: config }));
                        
                        console.log('Accessibility features initialized');
                      }
                    }).catch(err => {
                      console.warn('Failed to load accessibility features:', err);
                    });
                  }
                `,
              }}
            />

            {/* Axe Core Integration for Development */}
            {process.env.NODE_ENV === 'development' && (
              <Script
                id="axe-core"
                strategy="lazyOnload"
                dangerouslySetInnerHTML={{
                  __html: `
                    // Load axe-core for accessibility testing in development
                    if (typeof window !== 'undefined') {
                      // Simple script loader function
                      function loadScript(src) {
                        return new Promise((resolve, reject) => {
                          const script = document.createElement('script');
                          script.src = src;
                          script.onload = resolve;
                          script.onerror = reject;
                          document.head.appendChild(script);
                        });
                      }
                      
                      // Load axe-core from CDN for development
                      loadScript('https://unpkg.com/axe-core@4.10.2/axe.min.js').then(() => {
                        if (window.axe) {
                          // Run initial audit after page load
                          setTimeout(() => {
                            window.axe.run().then(results => {
                              if (results.violations.length === 0) {
                                console.log('%c✓ No accessibility violations detected', 'color: green; font-weight: bold');
                              } else {
                                console.warn('%c⚠ Accessibility violations detected:', 'color: orange; font-weight: bold', results.violations);
                              }
                            }).catch(err => {
                              console.warn('Axe audit failed:', err);
                            });
                          }, 2000);
                          
                          console.log('Axe accessibility testing enabled (development mode)');
                        }
                      }).catch(err => {
                        console.warn('Failed to load axe-core:', err);
                      });
                    }
                  `,
                }}
              />
            )}

            {/* Service Worker registration for caching */}
            <Script
              id="service-worker"
              strategy="lazyOnload"
              dangerouslySetInnerHTML={{
                __html: `
                  if ('serviceWorker' in navigator && '${process.env.NODE_ENV}' === 'production') {
                    window.addEventListener('load', function() {
                      navigator.serviceWorker.register('/sw.js')
                        .then(function(registration) {
                          console.log('SW registered: ', registration);
                        })
                        .catch(function(registrationError) {
                          console.log('SW registration failed: ', registrationError);
                        });
                    });
                  }
                `,
              }}
            />

            {/* Resource hints and preloading script */}
            <Script
              id="resource-hints"
              strategy="lazyOnload"
              dangerouslySetInnerHTML={{
                __html: `
                  window.addEventListener('load', function() {
                    // Preload critical resources after initial load
                    const preloadLink = (href, as, type, priority = 'low') => {
                      const link = document.createElement('link');
                      link.rel = 'preload';
                      link.href = href;
                      link.as = as;
                      if (type) link.type = type;
                      link.fetchPriority = priority;
                      document.head.appendChild(link);
                    };
                    
                    // Preload critical images and fonts
                    preloadLink('/images/logo.svg', 'image', 'image/svg+xml', 'high');
                    preloadLink('/fonts/geist-sans-latin.woff2', 'font', 'font/woff2', 'high');
                    
                    // Mark page load complete
                    performance.mark('page-load-complete');
                    performance.measure('total-load-time', 'navigation-start', 'page-load-complete');
                    
                    // Announce page load completion to screen readers
                    const announcement = document.createElement('div');
                    announcement.setAttribute('aria-live', 'polite');
                    announcement.setAttribute('aria-atomic', 'true');
                    announcement.className = 'sr-only';
                    announcement.textContent = 'Page loaded successfully';
                    document.body.appendChild(announcement);
                    
                    // Remove announcement after delay
                    setTimeout(() => {
                      if (announcement.parentNode) {
                        announcement.parentNode.removeChild(announcement);
                      }
                    }, 2000);
                  });
                `,
              }}
            />

          </KeyboardShortcutsProvider>
        </AnnouncerProvider>
      </body>
    </html>
  );
}