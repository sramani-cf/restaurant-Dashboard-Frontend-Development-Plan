'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ReservationForm } from './reservation-form';

interface ReservationHeaderProps {
  onReservationCreated?: (reservation: any) => void;
}

export function ReservationHeader({ onReservationCreated }: ReservationHeaderProps) {
  const [isFormOpen, setIsFormOpen] = useState(false);

  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Reservations & Tables</h1>
          <p className="text-gray-600">Manage reservations, waitlist, and table assignments</p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline">
            Export
          </Button>
          <Button onClick={() => setIsFormOpen(true)}>
            New Reservation
          </Button>
        </div>
      </div>

      <ReservationForm
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSuccess={onReservationCreated}
      />
    </>
  );
}