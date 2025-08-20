'use client';

import React from 'react';
import { Reservation } from '@/lib/reservations/types';
import { formatTime } from '@/lib/reservations/utils';
import { Card } from '@/components/ui/card';

interface ReservationTimelineProps {
  reservations: Reservation[];
  selectedDate: string;
}

export function ReservationTimeline({ reservations, selectedDate }: ReservationTimelineProps) {
  const timeSlots = ['17:00', '17:30', '18:00', '18:30', '19:00', '19:30', '20:00', '20:30', '21:00', '21:30', '22:00'];
  
  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4">Reservation Timeline</h3>
      <div className="space-y-2">
        {timeSlots.map(time => {
          const slotReservations = reservations.filter(res => 
            formatTime(res.dateTime) === time
          );
          
          return (
            <div key={time} className="flex items-center space-x-4 py-2 border-b">
              <div className="w-16 text-sm font-medium">{time}</div>
              <div className="flex-1">
                {slotReservations.length === 0 ? (
                  <span className="text-gray-400">Available</span>
                ) : (
                  <div className="flex space-x-2">
                    {slotReservations.map(res => (
                      <div key={res.id} className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">
                        {res.partySize} guests
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}