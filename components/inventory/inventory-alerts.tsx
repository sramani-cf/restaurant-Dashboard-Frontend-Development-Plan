'use client';

import { useState, useEffect } from 'react';
import { X, AlertTriangle, Clock, Package, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { getInventoryAlerts } from '@/lib/inventory/data';
import type { InventoryAlert } from '@/lib/inventory/types';

interface InventoryAlertsProps {
  className?: string;
}

const alertIcons = {
  low_stock: Package,
  out_of_stock: Package,
  expiring: Clock,
  expired: AlertTriangle,
  reorder_point: Package,
  overstock: Package,
};

const alertColors = {
  low: 'bg-yellow-50 border-yellow-200 text-yellow-800',
  medium: 'bg-orange-50 border-orange-200 text-orange-800',
  high: 'bg-red-50 border-red-200 text-red-800',
  critical: 'bg-red-100 border-red-300 text-red-900',
};

const alertBadgeColors = {
  low: 'bg-yellow-100 text-yellow-800',
  medium: 'bg-orange-100 text-orange-800',
  high: 'bg-red-100 text-red-800',
  critical: 'bg-red-200 text-red-900',
};

export function InventoryAlerts({ className }: InventoryAlertsProps) {
  const [alerts, setAlerts] = useState<InventoryAlert[]>([]);
  const [dismissedAlerts, setDismissedAlerts] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAlerts = async () => {
      try {
        const data = await getInventoryAlerts();
        setAlerts(data);
      } catch (error) {
        console.error('Failed to fetch alerts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAlerts();
    
    // Poll for updates every 5 minutes
    const interval = setInterval(fetchAlerts, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  const visibleAlerts = alerts.filter(
    alert => !alert.isAcknowledged && !dismissedAlerts.has(alert.id)
  );

  const dismissAlert = (alertId: string) => {
    setDismissedAlerts(prev => new Set(prev).add(alertId));
    // In real app, also acknowledge on server
  };

  const acknowledgeAlert = async (alertId: string) => {
    try {
      // In real app, make API call to acknowledge alert
      setAlerts(prev => 
        prev.map(alert => 
          alert.id === alertId 
            ? { ...alert, isAcknowledged: true, acknowledgedAt: new Date() }
            : alert
        )
      );
    } catch (error) {
      console.error('Failed to acknowledge alert:', error);
    }
  };

  if (loading || visibleAlerts.length === 0) {
    return null;
  }

  return (
    <div className={cn('py-2', className)}>
      <div className="space-y-2">
        {visibleAlerts.slice(0, 3).map((alert) => {
          const Icon = alertIcons[alert.type];
          
          return (
            <div
              key={alert.id}
              className={cn(
                'flex items-center justify-between p-3 rounded-lg border transition-all duration-200',
                alertColors[alert.severity]
              )}
            >
              <div className="flex items-center space-x-3 flex-1 min-w-0">
                <Icon className="h-5 w-5 flex-shrink-0" />
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2">
                    <p className="text-sm font-medium truncate">
                      {alert.message}
                    </p>
                    <Badge
                      variant="secondary"
                      className={cn('text-xs', alertBadgeColors[alert.severity])}
                    >
                      {alert.severity.charAt(0).toUpperCase() + alert.severity.slice(1)}
                    </Badge>
                  </div>
                  
                  {(alert.currentValue !== undefined || alert.expirationDate) && (
                    <div className="flex items-center space-x-4 mt-1 text-xs opacity-75">
                      {alert.currentValue !== undefined && alert.thresholdValue !== undefined && (
                        <span>
                          Current: {alert.currentValue} | Threshold: {alert.thresholdValue}
                        </span>
                      )}
                      {alert.expirationDate && (
                        <span>
                          Expires: {alert.expirationDate.toLocaleDateString()}
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </div>

              <div className="flex items-center space-x-1 ml-3">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => acknowledgeAlert(alert.id)}
                  className="h-8 px-2 text-xs hover:bg-white/20"
                >
                  Acknowledge
                </Button>
                
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => dismissAlert(alert.id)}
                  className="h-8 w-8 p-0 hover:bg-white/20"
                >
                  <X className="h-3 w-3" />
                  <span className="sr-only">Dismiss</span>
                </Button>
              </div>
            </div>
          );
        })}
        
        {visibleAlerts.length > 3 && (
          <div className="text-center">
            <Button
              variant="ghost"
              size="sm"
              className="text-sm text-gray-600 hover:text-gray-900"
            >
              View {visibleAlerts.length - 3} more alerts
            </Button>
          </div>
        )}
      </div>

      {/* Alert summary for mobile */}
      <div className="sm:hidden mt-2">
        {visibleAlerts.length > 0 && (
          <div className="bg-white rounded-lg border border-gray-200 p-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <AlertTriangle className="h-4 w-4 text-red-500" />
                <span className="text-sm font-medium text-gray-900">
                  {visibleAlerts.length} Active Alert{visibleAlerts.length !== 1 ? 's' : ''}
                </span>
              </div>
              
              <div className="flex space-x-1">
                {Object.entries(
                  visibleAlerts.reduce((acc, alert) => {
                    acc[alert.severity] = (acc[alert.severity] || 0) + 1;
                    return acc;
                  }, {} as Record<string, number>)
                ).map(([severity, count]) => (
                  <Badge
                    key={severity}
                    variant="secondary"
                    className={cn('text-xs', alertBadgeColors[severity as keyof typeof alertBadgeColors])}
                  >
                    {count} {severity}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}