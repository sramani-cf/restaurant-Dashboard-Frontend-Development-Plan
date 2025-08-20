'use client';

import React from 'react';
import { FloorPlan } from './floor-plan';
import { DiningArea, Table } from '@/lib/reservations/types';

interface FloorPlanEditorProps {
  diningArea: DiningArea;
  tables: Table[];
  onTableUpdate?: (table: Table) => void;
}

export function FloorPlanEditor({ diningArea, tables, onTableUpdate }: FloorPlanEditorProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Floor Plan Editor</h3>
        <div className="text-sm text-gray-500">
          Drag and drop to rearrange tables
        </div>
      </div>
      
      <FloorPlan
        diningArea={diningArea}
        tables={tables}
        isEditable={true}
        onTableStatusChange={(tableId, status) => {
          const table = tables.find(t => t.id === tableId);
          if (table && onTableUpdate) {
            onTableUpdate({ ...table, status });
          }
        }}
      />
    </div>
  );
}