module.exports=[64433,a=>{a.v({className:"inter_5972bc34-module__OU16Qa__className"})},42586,a=>{"use strict";a.s(["default",()=>f,"metadata",()=>e],42586);var b=a.i(7997),c=a.i(64433);let d={className:c.default.className,style:{fontFamily:"'Inter', 'Inter Fallback'",fontStyle:"normal"}};null!=c.default.variable&&(d.variable=c.default.variable);let e={title:"Kitchen Display System | Restaurant Dashboard",description:"Real-time kitchen display system for restaurant operations",robots:"noindex, nofollow",viewport:{width:"device-width",initialScale:1,maximumScale:1,userScalable:!1}};function f({children:a}){return(0,b.jsxs)("html",{lang:"en",className:"h-full",children:[(0,b.jsxs)("head",{children:[(0,b.jsx)("meta",{name:"mobile-web-app-capable",content:"yes"}),(0,b.jsx)("meta",{name:"apple-mobile-web-app-capable",content:"yes"}),(0,b.jsx)("meta",{name:"apple-mobile-web-app-status-bar-style",content:"black-translucent"}),(0,b.jsx)("style",{children:`
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
        `})]}),(0,b.jsxs)("body",{className:`jsx-6e2314bf883def5b 
          ${d.className}
          h-full
          bg-black
          text-white
          overflow-hidden
          kds-dark
          antialiased
        `,children:[(0,b.jsxs)("div",{className:"jsx-6e2314bf883def5b h-full w-full",children:[(0,b.jsxs)("div",{id:"keyboard-hints",tabIndex:-1,className:"jsx-6e2314bf883def5b fixed top-4 right-4 z-50 bg-gray-900 text-white text-sm p-3 rounded-lg border border-gray-600 opacity-0 pointer-events-none transition-opacity duration-300 focus-within:opacity-100",children:[(0,b.jsx)("div",{className:"jsx-6e2314bf883def5b font-semibold mb-2",children:"Keyboard Shortcuts:"}),(0,b.jsxs)("div",{className:"jsx-6e2314bf883def5b space-y-1 text-xs",children:[(0,b.jsxs)("div",{className:"jsx-6e2314bf883def5b",children:[(0,b.jsx)("span",{className:"jsx-6e2314bf883def5b font-mono bg-gray-700 px-1 rounded",children:"F"})," Fire Order"]}),(0,b.jsxs)("div",{className:"jsx-6e2314bf883def5b",children:[(0,b.jsx)("span",{className:"jsx-6e2314bf883def5b font-mono bg-gray-700 px-1 rounded",children:"B"})," Bump Ticket"]}),(0,b.jsxs)("div",{className:"jsx-6e2314bf883def5b",children:[(0,b.jsx)("span",{className:"jsx-6e2314bf883def5b font-mono bg-gray-700 px-1 rounded",children:"R"})," Recall Ticket"]}),(0,b.jsxs)("div",{className:"jsx-6e2314bf883def5b",children:[(0,b.jsx)("span",{className:"jsx-6e2314bf883def5b font-mono bg-gray-700 px-1 rounded",children:"S"})," Switch Station"]}),(0,b.jsxs)("div",{className:"jsx-6e2314bf883def5b",children:[(0,b.jsx)("span",{className:"jsx-6e2314bf883def5b font-mono bg-gray-700 px-1 rounded",children:"A"})," All Day View"]}),(0,b.jsxs)("div",{className:"jsx-6e2314bf883def5b",children:[(0,b.jsx)("span",{className:"jsx-6e2314bf883def5b font-mono bg-gray-700 px-1 rounded",children:"←/→"})," Navigate Tickets"]}),(0,b.jsxs)("div",{className:"jsx-6e2314bf883def5b",children:[(0,b.jsx)("span",{className:"jsx-6e2314bf883def5b font-mono bg-gray-700 px-1 rounded",children:"↑/↓"})," Navigate Stations"]}),(0,b.jsxs)("div",{className:"jsx-6e2314bf883def5b",children:[(0,b.jsx)("span",{className:"jsx-6e2314bf883def5b font-mono bg-gray-700 px-1 rounded",children:"Esc"})," Close Modals"]})]})]}),(0,b.jsxs)("div",{className:"jsx-6e2314bf883def5b fixed top-4 left-4 z-50 flex gap-2",children:[(0,b.jsx)("button",{id:"fullscreen-toggle",title:"Toggle Fullscreen (F11)",className:"jsx-6e2314bf883def5b bg-gray-800 hover:bg-gray-700 text-white text-xs p-2 rounded border border-gray-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500",children:"⛶"}),(0,b.jsxs)("div",{id:"connection-status",className:"jsx-6e2314bf883def5b flex items-center gap-2 bg-gray-800 text-xs px-3 py-2 rounded border border-gray-600",children:[(0,b.jsx)("div",{id:"status-indicator",className:"jsx-6e2314bf883def5b w-2 h-2 bg-green-500 rounded-full"}),(0,b.jsx)("span",{id:"status-text",className:"jsx-6e2314bf883def5b",children:"Connected"})]})]}),(0,b.jsx)("main",{className:"jsx-6e2314bf883def5b h-full w-full",children:a}),(0,b.jsx)("script",{dangerouslySetInnerHTML:{__html:`
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
              `},className:"jsx-6e2314bf883def5b"})]}),(0,b.jsx)(void 0,{id:"6e2314bf883def5b",children:".kds-dark{--kds-bg-primary:#000;--kds-bg-secondary:#0a0a0a;--kds-bg-card:#111;--kds-text-primary:#fff;--kds-text-secondary:#d1d5db;--kds-text-muted:#9ca3af;--kds-border:#374151;--kds-border-light:#4b5563;--kds-accent:#3b82f6;--kds-success:#10b981;--kds-warning:#f59e0b;--kds-error:#ef4444;--kds-urgent:#dc2626;--kds-shadow:0 4px 6px -1px #0000004d}.kds-text-high-contrast{text-shadow:1px 1px 2px #000c;font-weight:600}.kds-button{cursor:pointer;user-select:none;border-radius:8px;min-width:60px;min-height:60px;font-size:16px;font-weight:600;transition:all .15s ease-in-out}.kds-button:active{transform:scale(.98)}.kds-button:disabled{opacity:.5;cursor:not-allowed;transform:none}.kds-text-kitchen{font-size:18px;font-weight:500;line-height:1.4}.kds-text-kitchen-large{font-size:24px;font-weight:600;line-height:1.3}@keyframes kds-urgent-pulse{0%,to{background-color:#dc26261a;border-color:#dc2626}50%{background-color:#f8717133;border-color:#f87171}}.kds-urgent{animation:2s infinite kds-urgent-pulse}@keyframes kds-warning-glow{0%,to{border-color:#f59e0b;box-shadow:0 0 5px #f59e0b4d}50%{border-color:#fbbf24;box-shadow:0 0 10px #fbbf2480}}.kds-warning{animation:3s infinite kds-warning-glow}::-webkit-scrollbar{width:12px;height:12px}::-webkit-scrollbar-track{background:#111;border-radius:6px}::-webkit-scrollbar-thumb{background:#374151;border:2px solid #111;border-radius:6px}::-webkit-scrollbar-thumb:hover{background:#4b5563}.kds-dark :focus{outline-offset:2px;outline:2px solid #3b82f6}.kds-ticket-grid{scroll-behavior:smooth;gap:16px;height:100%;padding:16px;display:grid;overflow-y:auto}.kds-ticket-grid-1{grid-template-columns:1fr}.kds-ticket-grid-2{grid-template-columns:repeat(2,1fr)}.kds-ticket-grid-3{grid-template-columns:repeat(3,1fr)}.kds-ticket-grid-4{grid-template-columns:repeat(4,1fr)}.kds-ticket-grid-5{grid-template-columns:repeat(5,1fr)}.kds-ticket-grid-6{grid-template-columns:repeat(6,1fr)}.kds-auto-scroll{scroll-snap-type:y mandatory}.kds-ticket{scroll-snap-align:start}@media print{body{color:#000!important;background:#fff!important}.kds-no-print{display:none!important}.kds-ticket{page-break-inside:avoid;margin-bottom:20px;color:#000!important;background:#fff!important;border:1px solid #000!important}}@media (width<=768px){.kds-ticket-grid{gap:12px;padding:12px;grid-template-columns:1fr!important}.kds-button{min-height:80px;font-size:18px}.kds-text-kitchen{font-size:20px}.kds-text-kitchen-large{font-size:28px}}@media (width>=1920px){.kds-text-kitchen{font-size:20px}.kds-text-kitchen-large{font-size:32px}.kds-button{min-height:80px;font-size:20px}}"})]})]})}}];

//# sourceMappingURL=%5Broot-of-the-server%5D__4cae60bc._.js.map