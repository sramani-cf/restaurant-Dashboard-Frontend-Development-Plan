'use client';

import { Plus, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface OrderQuickActionsProps {
  onNewOrder: () => void;
  onRefresh: () => void;
}

export function OrderQuickActions({ onNewOrder, onRefresh }: OrderQuickActionsProps) {
  return (
    <div className="fixed bottom-6 right-6 flex flex-col gap-2">
      <Button
        size="icon"
        variant="outline"
        className="h-12 w-12 rounded-full shadow-lg"
        onClick={onRefresh}
      >
        <RefreshCw className="h-5 w-5" />
      </Button>
      <Button
        size="icon"
        className="h-14 w-14 rounded-full shadow-lg"
        onClick={onNewOrder}
      >
        <Plus className="h-6 w-6" />
      </Button>
    </div>
  );
}