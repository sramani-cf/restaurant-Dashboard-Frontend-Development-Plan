'use client';

import { useState, useEffect } from 'react';
import { WifiOff, Wifi, AlertTriangle, Cloud, CloudOff } from 'lucide-react';

export function OfflineIndicator() {
  const [isOnline, setIsOnline] = useState(true);
  const [pendingSync, setPendingSync] = useState(0);
  const [lastSync, setLastSync] = useState<Date>(new Date());

  useEffect(() => {
    const updateOnlineStatus = () => {
      setIsOnline(navigator.onLine);
    };

    // Check online status
    updateOnlineStatus();

    // Listen for online/offline events
    window.addEventListener('online', updateOnlineStatus);
    window.addEventListener('offline', updateOnlineStatus);

    // Simulate pending transactions in offline mode
    const interval = setInterval(() => {
      if (!navigator.onLine) {
        setPendingSync(prev => prev + 1);
      } else if (pendingSync > 0) {
        // Simulate syncing when back online
        setPendingSync(0);
        setLastSync(new Date());
      }
    }, 5000);

    return () => {
      window.removeEventListener('online', updateOnlineStatus);
      window.removeEventListener('offline', updateOnlineStatus);
      clearInterval(interval);
    };
  }, [pendingSync]);

  if (isOnline && pendingSync === 0) {
    return (
      <div className="flex items-center gap-2 px-3 py-1.5 bg-green-500/10 rounded-lg">
        <Cloud className="h-4 w-4 text-green-500" />
        <span className="text-sm text-green-500">Online</span>
      </div>
    );
  }

  if (!isOnline) {
    return (
      <div className="flex items-center gap-2 px-3 py-1.5 bg-yellow-500/10 rounded-lg animate-pulse">
        <WifiOff className="h-4 w-4 text-yellow-500" />
        <div className="flex flex-col">
          <span className="text-sm text-yellow-500 font-medium">Offline Mode</span>
          {pendingSync > 0 && (
            <span className="text-xs text-yellow-400">
              {pendingSync} pending transactions
            </span>
          )}
        </div>
      </div>
    );
  }

  if (pendingSync > 0) {
    return (
      <div className="flex items-center gap-2 px-3 py-1.5 bg-blue-500/10 rounded-lg">
        <CloudOff className="h-4 w-4 text-blue-500 animate-spin" />
        <span className="text-sm text-blue-500">Syncing... ({pendingSync})</span>
      </div>
    );
  }

  return null;
}