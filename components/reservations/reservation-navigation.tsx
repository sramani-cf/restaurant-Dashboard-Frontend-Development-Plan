'use client';

import React from 'react';
import { SimpleTabs } from '@/components/ui/simple-tabs';

interface ReservationNavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export function ReservationNavigation({ activeTab, onTabChange }: ReservationNavigationProps) {
  const tabs = [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'reservations', label: 'Reservations' },
    { id: 'floor-plan', label: 'Floor Plan' },
    { id: 'waitlist', label: 'Waitlist' },
    { id: 'guests', label: 'Guest Database' },
  ];

  return (
    <SimpleTabs
      tabs={tabs}
      activeTab={activeTab}
      onTabChange={onTabChange}
      className="mb-6"
    />
  );
}