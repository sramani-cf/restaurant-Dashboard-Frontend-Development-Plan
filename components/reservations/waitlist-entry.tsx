'use client';

import React from 'react';
import { WaitlistEntry, Guest } from '@/lib/reservations/types';
import { getWaitlistStatusColor, formatTime } from '@/lib/reservations/utils';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface WaitlistEntryProps {
  entry: WaitlistEntry;
  guest?: Guest;
  position: number;
}

export function WaitlistEntry({ entry, guest, position }: WaitlistEntryProps) {
  return (
    <Card className="p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="flex items-center justify-center w-8 h-8 bg-blue-100 text-blue-600 rounded-full font-semibold">
            {position}
          </div>
          <div>
            <div className="font-medium">
              {guest ? `${guest.firstName} ${guest.lastName}` : 'Unknown Guest'}
            </div>
            <div className="text-sm text-gray-600">
              {entry.partySize} guests • Added {formatTime(entry.addedAt)}
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <div className="text-right">
            <div className="font-semibold">{entry.estimatedWaitTime}m</div>
            <div className="text-xs text-gray-500">wait time</div>
          </div>
          <Badge style={{ backgroundColor: getWaitlistStatusColor(entry.status) }}>
            {entry.status}
          </Badge>
        </div>
      </div>
    </Card>
  );
}