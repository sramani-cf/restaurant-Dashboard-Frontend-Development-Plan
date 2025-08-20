'use client';

import React, { useState } from 'react';
import { Reservation, Guest, Table } from '@/lib/reservations/types';
import { formatDateTime, getReservationStatusColor } from '@/lib/reservations/utils';
import { Modal } from '@/components/ui/modal';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';

interface ReservationDetailsProps {
  reservation: Reservation;
  guest?: Guest;
  table?: Table;
  isOpen: boolean;
  onClose: () => void;
  onUpdate?: (reservation: Reservation) => void;
}

export function ReservationDetails({
  reservation,
  guest,
  table,
  isOpen,
  onClose,
  onUpdate
}: ReservationDetailsProps) {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <Modal isOpen={isOpen} onClose={onClose} className="max-w-2xl">
      <div className="p-6">
        <h2 className="text-xl font-semibold mb-4">Reservation Details</h2>
        
        <div className="space-y-4">
          <Card className="p-4">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-medium">
                  {guest ? `${guest.firstName} ${guest.lastName}` : 'Unknown Guest'}
                </h3>
                <p className="text-gray-600">{formatDateTime(reservation.dateTime)}</p>
                <p className="text-gray-600">{reservation.partySize} guests</p>
              </div>
              <Badge style={{ backgroundColor: getReservationStatusColor(reservation.status) }}>
                {reservation.status}
              </Badge>
            </div>
          </Card>

          {/* Placeholder for detailed information */}
          <div className="text-gray-500 text-center py-8">
            Detailed reservation information would be displayed here
          </div>
        </div>

        <div className="flex justify-end space-x-2 mt-6">
          <Button variant="ghost" onClick={onClose}>
            Close
          </Button>
          <Button onClick={() => setIsEditing(true)}>
            Edit
          </Button>
        </div>
      </div>
    </Modal>
  );
}