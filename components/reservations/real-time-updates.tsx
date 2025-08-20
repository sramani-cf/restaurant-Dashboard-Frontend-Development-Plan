'use client';

import React, { useEffect, useState } from 'react';
import { ReservationUpdate } from '@/lib/reservations/types';
import { subscribeToUpdates } from '@/lib/reservations/data';
import { Card } from '@/components/ui/card';

interface RealTimeUpdatesProps {
  onUpdate?: (update: ReservationUpdate) => void;
}

export function RealTimeUpdates({ onUpdate }: RealTimeUpdatesProps) {
  const [updates, setUpdates] = useState<ReservationUpdate[]>([]);

  useEffect(() => {
    const unsubscribe = subscribeToUpdates((update: ReservationUpdate) => {
      setUpdates(prev => [update, ...prev.slice(0, 4)]); // Keep last 5 updates
      onUpdate?.(update);
    });

    return unsubscribe;
  }, [onUpdate]);

  if (updates.length === 0) {
    return null;
  }

  return (
    <Card className="p-4">
      <h3 className="text-md font-semibold mb-2">Live Updates</h3>
      <div className="space-y-2">
        {updates.map((update, index) => (
          <div key={`${update.timestamp}-${index}`} className="text-sm p-2 bg-blue-50 rounded border-l-2 border-blue-400">
            <div className="font-medium">{update.type} {update.action}</div>
            <div className="text-gray-600 text-xs">
              {new Date(update.timestamp).toLocaleTimeString()}
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}