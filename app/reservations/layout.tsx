import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Reservations & Tables | Restaurant Dashboard',
  description: 'Manage restaurant reservations, table assignments, waitlist, and guest database',
};

interface ReservationsLayoutProps {
  children: React.ReactNode;
}

export default function ReservationsLayout({ children }: ReservationsLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </div>
    </div>
  );
}