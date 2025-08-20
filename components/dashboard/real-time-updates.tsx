'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Wifi, 
  WifiOff, 
  Pause, 
  Play, 
  Settings,
  Bell,
  BellOff,
  RefreshCw,
  Activity
} from 'lucide-react';

interface RealTimeConfig {
  enabled: boolean;
  interval: number; // milliseconds
  autoRefresh: boolean;
  notifications: boolean;
  syncData: boolean;
}

interface RealTimeStatusProps {
  config: RealTimeConfig;
  onConfigChange: (config: RealTimeConfig) => void;
  isConnected: boolean;
  lastUpdate?: Date;
  className?: string;
}

interface UseRealTimeUpdatesOptions {
  interval?: number;
  enabled?: boolean;
  onUpdate?: () => void;
  onError?: (error: Error) => void;
}

interface UseRealTimeUpdatesReturn {
  isEnabled: boolean;
  isConnected: boolean;
  lastUpdate: Date | null;
  toggle: () => void;
  forceUpdate: () => void;
  config: RealTimeConfig;
  updateConfig: (updates: Partial<RealTimeConfig>) => void;
}

// Custom hook for managing real-time updates
export function useRealTimeUpdates({
  interval = 30000, // 30 seconds default
  enabled = true,
  onUpdate,
  onError
}: UseRealTimeUpdatesOptions = {}): UseRealTimeUpdatesReturn {
  const [config, setConfig] = useState<RealTimeConfig>(() => {
    // Load from localStorage if available
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('dashboard-realtime-config');
      if (saved) {
        try {
          return { ...JSON.parse(saved), enabled };
        } catch (e) {
          // Fall back to defaults
        }
      }
    }
    
    return {
      enabled,
      interval,
      autoRefresh: true,
      notifications: true,
      syncData: true
    };
  });
  
  const [isConnected, setIsConnected] = useState(false);
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const retryCountRef = useRef(0);
  const maxRetries = 3;
  
  // Save config to localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('dashboard-realtime-config', JSON.stringify(config));
    }
  }, [config]);
  
  // Perform update with error handling and retry logic
  const performUpdate = useCallback(async () => {
    try {
      await onUpdate?.();
      setIsConnected(true);
      setLastUpdate(new Date());
      retryCountRef.current = 0;
    } catch (error) {
      console.error('Real-time update failed:', error);
      retryCountRef.current++;
      
      if (retryCountRef.current >= maxRetries) {
        setIsConnected(false);
        onError?.(error instanceof Error ? error : new Error('Update failed'));
      }
    }
  }, [onUpdate, onError]);
  
  // Start/stop polling based on configuration
  useEffect(() => {
    if (config.enabled && config.autoRefresh) {
      // Initial update
      performUpdate();
      
      // Set up interval
      intervalRef.current = setInterval(performUpdate, config.interval);
      
      return () => {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
        }
      };
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      setIsConnected(false);
    }
  }, [config.enabled, config.autoRefresh, config.interval, performUpdate]);
  
  // Listen for visibility changes to pause/resume updates
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
        }
      } else if (document.visibilityState === 'visible' && config.enabled && config.autoRefresh) {
        // Resume updates when tab becomes visible
        performUpdate();
        intervalRef.current = setInterval(performUpdate, config.interval);
      }
    };
    
    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, [config.enabled, config.autoRefresh, config.interval, performUpdate]);
  
  const toggle = useCallback(() => {
    setConfig(prev => ({ ...prev, enabled: !prev.enabled }));
  }, []);
  
  const forceUpdate = useCallback(() => {
    performUpdate();
  }, [performUpdate]);
  
  const updateConfig = useCallback((updates: Partial<RealTimeConfig>) => {
    setConfig(prev => ({ ...prev, ...updates }));
  }, []);
  
  return {
    isEnabled: config.enabled,
    isConnected,
    lastUpdate,
    toggle,
    forceUpdate,
    config,
    updateConfig
  };
}

// Component for displaying real-time status and controls
export function RealTimeStatus({ 
  config, 
  onConfigChange, 
  isConnected, 
  lastUpdate,
  className 
}: RealTimeStatusProps) {
  const [showSettings, setShowSettings] = useState(false);
  
  const handleConfigUpdate = (updates: Partial<RealTimeConfig>) => {
    onConfigChange({ ...config, ...updates });
  };
  
  const formatLastUpdate = (date?: Date) => {
    if (!date) return 'Never';
    
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    
    if (diff < 60000) { // Less than 1 minute
      return 'Just now';
    } else if (diff < 3600000) { // Less than 1 hour
      const minutes = Math.floor(diff / 60000);
      return `${minutes}m ago`;
    } else {
      const hours = Math.floor(diff / 3600000);
      return `${hours}h ago`;
    }
  };
  
  const getIntervalLabel = (interval: number) => {
    if (interval < 60000) {
      return `${interval / 1000}s`;
    } else if (interval < 3600000) {
      return `${interval / 60000}m`;
    } else {
      return `${interval / 3600000}h`;
    }
  };
  
  return (
    <div className={className}>
      <div className="flex items-center justify-between gap-4">
        {/* Status Indicator */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2">
            {isConnected ? (
              <div className="flex items-center gap-2 text-green-600">
                <div className="relative">
                  <Wifi className="h-4 w-4" />
                  {config.enabled && (
                    <div className="absolute -top-1 -right-1 w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  )}
                </div>
                <span className="text-sm font-medium">Live</span>
              </div>
            ) : (
              <div className="flex items-center gap-2 text-gray-400">
                <WifiOff className="h-4 w-4" />
                <span className="text-sm">Offline</span>
              </div>
            )}
          </div>
          
          <Badge variant={config.enabled ? 'default' : 'secondary'} className="text-xs">
            {config.enabled ? 'Active' : 'Paused'}
          </Badge>
          
          {config.enabled && (
            <Badge variant="outline" className="text-xs">
              {getIntervalLabel(config.interval)}
            </Badge>
          )}
        </div>
        
        {/* Controls */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-500">
            Updated {formatLastUpdate(lastUpdate)}
          </span>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleConfigUpdate({ enabled: !config.enabled })}
            className="h-8 w-8 p-0"
          >
            {config.enabled ? (
              <Pause className="h-3 w-3" />
            ) : (
              <Play className="h-3 w-3" />
            )}
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowSettings(!showSettings)}
            className="h-8 w-8 p-0"
          >
            <Settings className="h-3 w-3" />
          </Button>
        </div>
      </div>
      
      {/* Settings Panel */}
      {showSettings && (
        <div className="mt-4 p-4 bg-gray-50 rounded-lg space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Auto Refresh Toggle */}
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm font-medium">Auto Refresh</div>
                <div className="text-xs text-gray-500">Automatically update data</div>
              </div>
              <Switch
                checked={config.autoRefresh}
                onCheckedChange={(checked) => handleConfigUpdate({ autoRefresh: checked })}
              />
            </div>
            
            {/* Notifications Toggle */}
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm font-medium flex items-center gap-1">
                  {config.notifications ? (
                    <Bell className="h-3 w-3" />
                  ) : (
                    <BellOff className="h-3 w-3" />
                  )}
                  Notifications
                </div>
                <div className="text-xs text-gray-500">Alert on important updates</div>
              </div>
              <Switch
                checked={config.notifications}
                onCheckedChange={(checked) => handleConfigUpdate({ notifications: checked })}
              />
            </div>
          </div>
          
          {/* Refresh Interval */}
          <div>
            <div className="text-sm font-medium mb-2">Refresh Interval</div>
            <div className="flex gap-2">
              {[
                { value: 10000, label: '10s' },
                { value: 30000, label: '30s' },
                { value: 60000, label: '1m' },
                { value: 300000, label: '5m' }
              ].map((option) => (
                <Button
                  key={option.value}
                  variant={config.interval === option.value ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => handleConfigUpdate({ interval: option.value })}
                  className="text-xs"
                >
                  {option.label}
                </Button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Component for showing connection status with retry
export function ConnectionStatus({ 
  isConnected, 
  onRetry,
  className 
}: { 
  isConnected: boolean; 
  onRetry?: () => void;
  className?: string;
}) {
  if (isConnected) {
    return null;
  }
  
  return (
    <Alert className={className}>
      <WifiOff className="h-4 w-4" />
      <AlertDescription className="flex items-center justify-between">
        <span>Connection lost. Real-time updates are paused.</span>
        {onRetry && (
          <Button
            variant="outline"
            size="sm"
            onClick={onRetry}
            className="ml-2"
          >
            <RefreshCw className="h-3 w-3 mr-1" />
            Retry
          </Button>
        )}
      </AlertDescription>
    </Alert>
  );
}

// Mini status indicator for compact layouts
export function MiniRealTimeIndicator({ 
  isEnabled, 
  isConnected,
  onToggle,
  className 
}: { 
  isEnabled: boolean; 
  isConnected: boolean;
  onToggle?: () => void;
  className?: string;
}) {
  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={onToggle}
      className={`h-8 w-8 p-0 ${className}`}
      title={isEnabled ? 'Real-time updates active' : 'Real-time updates paused'}
    >
      <div className="relative">
        {isConnected && isEnabled ? (
          <Activity className="h-4 w-4 text-green-600" />
        ) : (
          <Activity className="h-4 w-4 text-gray-400" />
        )}
        {isEnabled && isConnected && (
          <div className="absolute -top-1 -right-1 w-2 h-2 bg-green-500 rounded-full animate-pulse" />
        )}
      </div>
    </Button>
  );
}