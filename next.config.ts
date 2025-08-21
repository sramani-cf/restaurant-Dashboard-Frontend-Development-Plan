import type { NextConfig } from "next";

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

const nextConfig: NextConfig = {
  // Performance Optimizations
  experimental: {
    optimizeCss: false,
    optimizePackageImports: [
      'lucide-react',
      '@tanstack/react-table',
      'recharts',
      'date-fns',
      '@headlessui/react',
      '@radix-ui/react-slot'
    ],
  },
  
  turbopack: {
    resolveExtensions: [
      '.mdx',
      '.tsx',
      '.ts',
      '.jsx',
      '.js',
      '.mjs',
      '.json',
    ],
  },

  // Image Optimization
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 31536000, // 1 year
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.cloudinary.com',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      }
    ]
  },

  // Compression
  compress: true,

  // Enhanced security headers
  async headers() {
    const isDevelopment = process.env.NODE_ENV === 'development';
    
    return [
      {
        source: '/(.*)',
        headers: [
          // Core security headers
          {
            key: 'X-Frame-Options',
            value: 'DENY'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin'
          },
          {
            key: 'Permissions-Policy',
            value: 'geolocation=(), microphone=(), camera=(), payment=(), usb=(), magnetometer=(), gyroscope=(), speaker=()'
          },
          // HSTS for production only
          ...(process.env.NODE_ENV === 'production' ? [{
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains; preload'
          }] : []),
          // Content Security Policy
          {
            key: 'Content-Security-Policy',
            value: isDevelopment 
              ? "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; img-src 'self' data: blob: https:; font-src 'self' https://fonts.gstatic.com; connect-src 'self' ws://localhost:* wss://localhost:*; frame-src 'none'; object-src 'none'; base-uri 'self'; form-action 'self';"
              : "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; img-src 'self' data: blob: https:; font-src 'self' https://fonts.gstatic.com; connect-src 'self'; frame-src 'none'; object-src 'none'; base-uri 'self'; form-action 'self'; upgrade-insecure-requests;"
          },
          // Cross-Origin policies
          {
            key: 'Cross-Origin-Opener-Policy',
            value: 'same-origin'
          },
          {
            key: 'Cross-Origin-Embedder-Policy',
            value: 'require-corp'
          },
          {
            key: 'Cross-Origin-Resource-Policy',
            value: 'same-site'
          },
          // Additional security headers
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'off'
          },
          {
            key: 'X-Robots-Tag',
            value: 'noindex, nofollow, nosnippet, noarchive'
          },
          // Remove server identification
          {
            key: 'Server',
            value: 'Restaurant-Dashboard'
          }
        ]
      },
      // API routes security headers
      {
        source: '/api/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'no-store, no-cache, must-revalidate, private'
          },
          {
            key: 'Pragma',
            value: 'no-cache'
          },
          {
            key: 'Expires',
            value: '0'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY'
          },
          {
            key: 'Content-Security-Policy',
            value: "default-src 'none'; frame-ancestors 'none';"
          }
        ]
      },
      // Authentication routes
      {
        source: '/api/auth/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'no-store, no-cache, must-revalidate, private, max-age=0'
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY'
          },
          {
            key: 'Content-Security-Policy',
            value: "default-src 'self'; frame-ancestors 'none'; form-action 'self';"
          }
        ]
      },
      // Admin routes
      {
        source: '/admin/(.*)',
        headers: [
          {
            key: 'X-Admin-Route',
            value: 'true'
          },
          {
            key: 'Cache-Control',
            value: 'no-store, no-cache, must-revalidate, private'
          },
          {
            key: 'Content-Security-Policy',
            value: "default-src 'self'; script-src 'self' 'unsafe-inline'; frame-ancestors 'none';"
          }
        ]
      },
      // File upload routes
      {
        source: '/api/upload/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: "default-src 'none'; script-src 'none'; object-src 'none'; frame-ancestors 'none';"
          },
          {
            key: 'Content-Disposition',
            value: 'attachment'
          }
        ]
      },
      // Static assets with long-term caching and security
      {
        source: '/:path*\.(js|css|woff|woff2|ttf|otf|eot)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable'
          },
          {
            key: 'Cross-Origin-Resource-Policy',
            value: 'same-site'
          }
        ]
      },
      // Images with security headers
      {
        source: '/:path*\.(ico|png|jpg|jpeg|gif|webp|avif|svg)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable'
          },
          {
            key: 'Cross-Origin-Resource-Policy',
            value: 'same-site'
          },
          {
            key: 'Content-Security-Policy',
            value: "default-src 'none'; style-src 'unsafe-inline';"
          }
        ]
      }
    ];
  },

  // Webpack optimizations
  webpack: (config, { isServer, dev }) => {
    // Production optimizations
    if (!dev) {
      config.optimization.splitChunks = {
        chunks: 'all',
        cacheGroups: {
          default: false,
          vendors: false,
          vendor: {
            name: 'vendor',
            chunks: 'all',
            test: /node_modules/,
            priority: 20
          },
          common: {
            minChunks: 2,
            chunks: 'all',
            name: 'common',
            priority: 10,
            reuseExistingChunk: true,
            enforce: true
          },
          ui: {
            test: /[\\/]components[\\/]ui[\\/]/,
            name: 'ui',
            chunks: 'all',
            priority: 30
          },
          lib: {
            test: /[\\/]lib[\\/]/,
            name: 'lib',
            chunks: 'all',
            priority: 25
          }
        }
      };

      // Tree shaking optimization
      config.optimization.usedExports = true;
      config.optimization.sideEffects = false;
    }

    // Bundle analyzer
    if (process.env.BUNDLE_ANALYZE) {
      const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
      config.plugins.push(
        new BundleAnalyzerPlugin({
          analyzerMode: 'static',
          openAnalyzer: false,
          reportFilename: `${isServer ? 'server' : 'client'}-bundle-analyzer.html`
        })
      );
    }

    return config;
  },

  // Output configuration
  output: 'standalone',
  
  // Power user settings for better performance
  modularizeImports: {
    'lucide-react': {
      transform: 'lucide-react/dist/esm/icons/{{kebabCase member}}',
    },
  },

  // Static optimization
  trailingSlash: false,
  skipMiddlewareUrlNormalize: false,
  skipTrailingSlashRedirect: false,
};

export default withBundleAnalyzer(nextConfig);
