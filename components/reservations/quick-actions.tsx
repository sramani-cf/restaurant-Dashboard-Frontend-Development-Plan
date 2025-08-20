'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface QuickActionsProps {
  onCreateReservation?: () => void;
  onAddWalkIn?: () => void;
  onExportData?: () => void;
}

export function QuickActions({ onCreateReservation, onAddWalkIn, onExportData }: QuickActionsProps) {
  return (
    <Card className="p-4">
      <h3 className="text-md font-semibold mb-4">Quick Actions</h3>
      <div className="space-y-2">
        <Button 
          className="w-full justify-start"
          onClick={onCreateReservation}
        >
          + New Reservation
        </Button>
        <Button 
          variant="outline"
          className="w-full justify-start"
          onClick={onAddWalkIn}
        >
          + Add Walk-in
        </Button>
        <Button 
          variant="outline"
          className="w-full justify-start"
          onClick={onExportData}
        >
          📊 Export Data
        </Button>
      </div>
    </Card>
  );
}