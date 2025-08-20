'use client';

import React from 'react';
import { Guest } from '@/lib/reservations/types';
import { getGuestVIPStatusLabel } from '@/lib/reservations/utils';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface GuestProfileProps {
  guest: Guest;
  className?: string;
}

export function GuestProfile({ guest, className = '' }: GuestProfileProps) {
  return (
    <Card className={`p-6 ${className}`}>
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold">
            {guest.firstName} {guest.lastName}
          </h3>
          <p className="text-gray-600">{guest.phone}</p>
          {guest.email && <p className="text-gray-600">{guest.email}</p>}
        </div>
        <Badge variant="outline">
          {getGuestVIPStatusLabel(guest.vipStatus)}
        </Badge>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-4">
        <div className="text-center">
          <div className="text-2xl font-bold text-blue-600">{guest.totalVisits}</div>
          <div className="text-sm text-gray-600">Total Visits</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-green-600">
            ${guest.totalSpent.toLocaleString()}
          </div>
          <div className="text-sm text-gray-600">Total Spent</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-purple-600">
            ${guest.averageSpend.toFixed(0)}
          </div>
          <div className="text-sm text-gray-600">Average Spend</div>
        </div>
      </div>

      {/* Preferences */}
      {(guest.preferences.seatingPreference || 
        guest.preferences.dietaryRestrictions?.length ||
        guest.preferences.allergies?.length) && (
        <div>
          <h4 className="font-medium mb-2">Preferences & Notes</h4>
          <div className="space-y-2 text-sm">
            {guest.preferences.seatingPreference && (
              <div>Seating: {guest.preferences.seatingPreference}</div>
            )}
            {guest.preferences.dietaryRestrictions?.length && (
              <div>Dietary: {guest.preferences.dietaryRestrictions.join(', ')}</div>
            )}
            {guest.preferences.allergies?.length && (
              <div className="text-red-600">
                Allergies: {guest.preferences.allergies.join(', ')}
              </div>
            )}
          </div>
        </div>
      )}
    </Card>
  );
}