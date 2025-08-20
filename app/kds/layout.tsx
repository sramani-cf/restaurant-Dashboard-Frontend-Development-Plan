/**
 * Kitchen Display System (KDS) Layout
 * 
 * This is a specialized layout for the KDS that:
 * - Uses full screen with no sidebar navigation
 * - Applies high-contrast dark theme optimized for kitchen environments
 * - Provides touch-friendly interface elements
 * - Supports keyboard navigation for non-touch displays
 */

import type { Metadata } from "next"
import { Inter } from "next/font/google"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Kitchen Display System | Restaurant Dashboard",
  description: "Real-time kitchen display system for restaurant operations",
  robots: "noindex, nofollow", // KDS should not be indexed
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
    userScalable: false, // Prevent accidental zoom in kitchen
  },
}

export default function KdsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="h-full">
      <head>
        {/* Prevent sleep/screensaver - keep display always on */}
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        
        {/* Disable text selection and callouts for touch devices */}
        <style>{`
          * {
            -webkit-touch-callout: none;
            -webkit-tap-highlight-color: transparent;
            user-select: none;
            -webkit-user-select: none;
            -moz-user-select: none;
            -ms-user-select: none;
          }
          
          /* Allow text selection for specific elements */
          .selectable,
          input,
          textarea {
            user-select: text;
            -webkit-user-select: text;
            -moz-user-select: text;
            -ms-user-select: text;
          }
        `}</style>
      </head>
      <body
        className={`
          ${inter.className}
          h-full
          bg-black
          text-white
          overflow-hidden
          kds-dark
          antialiased
        `}
      >
        {/* Global KDS styles and theme */}
        <div className="h-full w-full">
          {/* Keyboard navigation hints (hidden by default, shown on focus) */}
          <div
            id="keyboard-hints"
            className="
              fixed top-4 right-4 z-50 
              bg-gray-900 text-white text-sm 
              p-3 rounded-lg border border-gray-600
              opacity-0 pointer-events-none
              transition-opacity duration-300
              focus-within:opacity-100
            "
            tabIndex={-1}
          >
            <div className="font-semibold mb-2">Keyboard Shortcuts:</div>
            <div className="space-y-1 text-xs">
              <div><span className="font-mono bg-gray-700 px-1 rounded">F</span> Fire Order</div>
              <div><span className="font-mono bg-gray-700 px-1 rounded">B</span> Bump Ticket</div>
              <div><span className="font-mono bg-gray-700 px-1 rounded">R</span> Recall Ticket</div>
              <div><span className="font-mono bg-gray-700 px-1 rounded">S</span> Switch Station</div>
              <div><span className="font-mono bg-gray-700 px-1 rounded">A</span> All Day View</div>
              <div><span className="font-mono bg-gray-700 px-1 rounded">←/→</span> Navigate Tickets</div>
              <div><span className="font-mono bg-gray-700 px-1 rounded">↑/↓</span> Navigate Stations</div>
              <div><span className="font-mono bg-gray-700 px-1 rounded">Esc</span> Close Modals</div>
            </div>
          </div>

          {/* Screen wake lock and fullscreen toggle */}
          <div className="fixed top-4 left-4 z-50 flex gap-2">
            <button
              id="fullscreen-toggle"
              className="
                bg-gray-800 hover:bg-gray-700
                text-white text-xs
                p-2 rounded
                border border-gray-600
                transition-colors
                focus:outline-none focus:ring-2 focus:ring-blue-500
              "
              title="Toggle Fullscreen (F11)"
            >
              ⛶
            </button>
            
            <div
              id="connection-status"
              className="
                flex items-center gap-2
                bg-gray-800 text-xs
                px-3 py-2 rounded
                border border-gray-600
              "
            >
              <div id="status-indicator" className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span id="status-text">Connected</span>
            </div>
          </div>

          {/* Main KDS content */}
          <main className="h-full w-full">
            {children}
          </main>

          {/* Global scripts for KDS functionality */}
          <script
            dangerouslySetInnerHTML={{
              __html: `
                // Fullscreen functionality
                document.getElementById('fullscreen-toggle')?.addEventListener('click', () => {
                  if (!document.fullscreenElement) {
                    document.documentElement.requestFullscreen?.() ||
                    document.documentElement.webkitRequestFullscreen?.() ||
                    document.documentElement.msRequestFullscreen?.();
                  } else {
                    document.exitFullscreen?.() ||
                    document.webkitExitFullscreen?.() ||
                    document.msExitFullscreen?.();
                  }
                });

                // Keyboard shortcuts handler
                document.addEventListener('keydown', (e) => {
                  // Show keyboard hints when Alt is pressed
                  if (e.altKey) {
                    document.getElementById('keyboard-hints').style.opacity = '1';
                  }
                  
                  // F11 for fullscreen
                  if (e.key === 'F11') {
                    e.preventDefault();
                    document.getElementById('fullscreen-toggle').click();
                  }
                  
                  // Escape to hide keyboard hints
                  if (e.key === 'Escape') {
                    document.getElementById('keyboard-hints').style.opacity = '0';
                  }
                });

                document.addEventListener('keyup', (e) => {
                  if (!e.altKey) {
                    document.getElementById('keyboard-hints').style.opacity = '0';
                  }
                });

                // Prevent accidental navigation
                window.addEventListener('beforeunload', (e) => {
                  if (window.location.pathname.includes('/kds')) {
                    e.preventDefault();
                    e.returnValue = 'Are you sure you want to leave the Kitchen Display System?';
                  }
                });

                // Screen wake lock (if supported)
                let wakeLock = null;
                const requestWakeLock = async () => {
                  try {
                    if ('wakeLock' in navigator) {
                      wakeLock = await navigator.wakeLock.request('screen');
                      console.log('Screen wake lock acquired');
                    }
                  } catch (err) {
                    console.log('Wake lock not supported or failed:', err);
                  }
                };

                // Request wake lock on page load
                document.addEventListener('visibilitychange', () => {
                  if (wakeLock !== null && document.visibilityState === 'visible') {
                    requestWakeLock();
                  }
                });

                requestWakeLock();

                // Connection status simulation
                const updateConnectionStatus = (connected) => {
                  const indicator = document.getElementById('status-indicator');
                  const text = document.getElementById('status-text');
                  if (indicator && text) {
                    if (connected) {
                      indicator.className = 'w-2 h-2 bg-green-500 rounded-full';
                      text.textContent = 'Connected';
                    } else {
                      indicator.className = 'w-2 h-2 bg-red-500 rounded-full animate-pulse';
                      text.textContent = 'Disconnected';
                    }
                  }
                };

                // Simulate connection status changes
                setInterval(() => {
                  // In a real app, this would check actual WebSocket connection status
                  updateConnectionStatus(Math.random() > 0.1); // 90% connected
                }, 30000);

                // Initial connection status
                updateConnectionStatus(true);
              `,
            }}
          />
        </div>

        {/* Custom CSS for KDS-specific styling */}
        <style jsx global>{`
          /* KDS Dark Theme Variables */
          .kds-dark {
            --kds-bg-primary: #000000;
            --kds-bg-secondary: #0a0a0a;
            --kds-bg-card: #111111;
            --kds-text-primary: #ffffff;
            --kds-text-secondary: #d1d5db;
            --kds-text-muted: #9ca3af;
            --kds-border: #374151;
            --kds-border-light: #4b5563;
            --kds-accent: #3b82f6;
            --kds-success: #10b981;
            --kds-warning: #f59e0b;
            --kds-error: #ef4444;
            --kds-urgent: #dc2626;
            --kds-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.3);
          }

          /* High contrast text for kitchen visibility */
          .kds-text-high-contrast {
            text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.8);
            font-weight: 600;
          }

          /* Touch-optimized buttons */
          .kds-button {
            min-height: 60px;
            min-width: 60px;
            font-size: 16px;
            font-weight: 600;
            border-radius: 8px;
            transition: all 150ms ease-in-out;
            cursor: pointer;
            user-select: none;
          }

          .kds-button:active {
            transform: scale(0.98);
          }

          .kds-button:disabled {
            opacity: 0.5;
            cursor: not-allowed;
            transform: none;
          }

          /* Large text for kitchen visibility */
          .kds-text-kitchen {
            font-size: 18px;
            line-height: 1.4;
            font-weight: 500;
          }

          .kds-text-kitchen-large {
            font-size: 24px;
            line-height: 1.3;
            font-weight: 600;
          }

          /* Animation for urgent tickets */
          @keyframes kds-urgent-pulse {
            0%, 100% { 
              border-color: #dc2626;
              background-color: rgba(220, 38, 38, 0.1);
            }
            50% { 
              border-color: #f87171;
              background-color: rgba(248, 113, 113, 0.2);
            }
          }

          .kds-urgent {
            animation: kds-urgent-pulse 2s infinite;
          }

          /* Warning animation */
          @keyframes kds-warning-glow {
            0%, 100% { 
              border-color: #f59e0b;
              box-shadow: 0 0 5px rgba(245, 158, 11, 0.3);
            }
            50% { 
              border-color: #fbbf24;
              box-shadow: 0 0 10px rgba(251, 191, 36, 0.5);
            }
          }

          .kds-warning {
            animation: kds-warning-glow 3s infinite;
          }

          /* Scrollbar styling for dark theme */
          .kds-dark ::-webkit-scrollbar {
            width: 12px;
            height: 12px;
          }

          .kds-dark ::-webkit-scrollbar-track {
            background: #111111;
            border-radius: 6px;
          }

          .kds-dark ::-webkit-scrollbar-thumb {
            background: #374151;
            border-radius: 6px;
            border: 2px solid #111111;
          }

          .kds-dark ::-webkit-scrollbar-thumb:hover {
            background: #4b5563;
          }

          /* Focus styles for keyboard navigation */
          .kds-dark *:focus {
            outline: 2px solid #3b82f6;
            outline-offset: 2px;
          }

          /* Ticket grid layout */
          .kds-ticket-grid {
            display: grid;
            gap: 16px;
            padding: 16px;
            height: 100%;
            overflow-y: auto;
            scroll-behavior: smooth;
          }

          /* Responsive grid columns */
          .kds-ticket-grid-1 { grid-template-columns: 1fr; }
          .kds-ticket-grid-2 { grid-template-columns: repeat(2, 1fr); }
          .kds-ticket-grid-3 { grid-template-columns: repeat(3, 1fr); }
          .kds-ticket-grid-4 { grid-template-columns: repeat(4, 1fr); }
          .kds-ticket-grid-5 { grid-template-columns: repeat(5, 1fr); }
          .kds-ticket-grid-6 { grid-template-columns: repeat(6, 1fr); }

          /* Auto-scroll for new tickets */
          .kds-auto-scroll {
            scroll-snap-type: y mandatory;
          }

          .kds-ticket {
            scroll-snap-align: start;
          }

          /* Print styles for order slips */
          @media print {
            body {
              background: white !important;
              color: black !important;
            }
            
            .kds-no-print {
              display: none !important;
            }
            
            .kds-ticket {
              background: white !important;
              border: 1px solid black !important;
              color: black !important;
              page-break-inside: avoid;
              margin-bottom: 20px;
            }
          }

          /* Mobile responsiveness */
          @media (max-width: 768px) {
            .kds-ticket-grid {
              grid-template-columns: 1fr !important;
              gap: 12px;
              padding: 12px;
            }
            
            .kds-button {
              min-height: 80px;
              font-size: 18px;
            }
            
            .kds-text-kitchen {
              font-size: 20px;
            }
            
            .kds-text-kitchen-large {
              font-size: 28px;
            }
          }

          /* Large display optimizations */
          @media (min-width: 1920px) {
            .kds-text-kitchen {
              font-size: 20px;
            }
            
            .kds-text-kitchen-large {
              font-size: 32px;
            }
            
            .kds-button {
              min-height: 80px;
              font-size: 20px;
            }
          }
        `}</style>
      </body>
    </html>
  )
}