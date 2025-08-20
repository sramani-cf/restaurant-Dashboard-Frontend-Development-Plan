'use client';

import React from 'react';
import { TableStatus } from '@/lib/reservations/types';
import { getTableStatusColor, getTableStatusLabel } from '@/lib/reservations/utils';

interface TableStatusIndicatorProps {
  status: TableStatus;
  size?: 'sm' | 'md' | 'lg';
}

export function TableStatusIndicator({ status, size = 'md' }: TableStatusIndicatorProps) {
  const sizeClasses = {
    sm: 'w-2 h-2',
    md: 'w-3 h-3',
    lg: 'w-4 h-4'
  };

  return (
    <div className="flex items-center space-x-2">
      <div 
        className={`${sizeClasses[size]} rounded-full`}
        style={{ backgroundColor: getTableStatusColor(status) }}
      />
      <span className="text-sm">{getTableStatusLabel(status)}</span>
    </div>
  );
}