'use client';

import React from 'react';
import { Table } from '@/lib/reservations/types';
import { getTableStatusColor, getTableStatusLabel } from '@/lib/reservations/utils';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface TableCardProps {
  table: Table;
  onClick?: () => void;
  className?: string;
}

export function TableCard({ table, onClick, className = '' }: TableCardProps) {
  return (
    <Card 
      className={`p-4 cursor-pointer hover:shadow-md transition-shadow ${className}`}
      onClick={onClick}
    >
      <div className="flex items-center justify-between mb-2">
        <span className="font-semibold">Table {table.number}</span>
        <Badge style={{ backgroundColor: getTableStatusColor(table.status) }}>
          {getTableStatusLabel(table.status)}
        </Badge>
      </div>
      <div className="text-sm text-gray-600">
        <div>Capacity: {table.capacity} guests</div>
        <div>Shape: {table.shape}</div>
      </div>
    </Card>
  );
}