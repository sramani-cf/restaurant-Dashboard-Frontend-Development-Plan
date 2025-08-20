'use client';

import React from 'react';
import { Reservation } from '@/lib/reservations/types';
import { Card } from '@/components/ui/card';

interface ReservationCalendarProps {
  reservations: Reservation[];
  selectedDate: string;
  onDateSelect: (date: string) => void;
}

export function ReservationCalendar({ reservations, selectedDate, onDateSelect }: ReservationCalendarProps) {
  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4">Calendar View</h3>
      <div className="text-gray-500 text-center py-8">
        Calendar component would be implemented here with date selection and reservation indicators
      </div>
    </Card>
  );
}