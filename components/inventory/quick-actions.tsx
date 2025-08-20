'use client';

import { useState } from 'react';
import { Plus, FileText, ClipboardList, Scan, MoreHorizontal, Users, Trash2, BarChart3 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dropdown } from '@/components/ui/dropdown';

interface QuickActionsProps {
  className?: string;
}

export function QuickActions({ className }: QuickActionsProps) {
  const [isCreating, setIsCreating] = useState(false);

  const primaryActions = [
    {
      icon: Plus,
      label: 'Add Item',
      action: () => {
        setIsCreating(true);
        console.log('Add new inventory item');
        // In real app: redirect to /inventory/items/new or open modal
      },
      variant: 'default' as const,
    },
    {
      icon: FileText,
      label: 'Create PO',
      action: () => console.log('Create purchase order'),
      variant: 'outline' as const,
    },
    {
      icon: Scan,
      label: 'Scan',
      action: () => console.log('Open barcode scanner'),
      variant: 'outline' as const,
    },
  ];

  const moreActions = [
    {
      icon: Users,
      label: 'Add Supplier',
      onClick: () => console.log('Add supplier')
    },
    {
      icon: ClipboardList,
      label: 'Start Stock Count',
      onClick: () => console.log('Start stock count')
    },
    {
      icon: Trash2,
      label: 'Log Waste',
      onClick: () => console.log('Log waste')
    },
    {
      type: 'separator' as const
    },
    {
      icon: BarChart3,
      label: 'View Reports',
      onClick: () => console.log('View reports')
    },
  ];

  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      {/* Primary Actions */}
      {primaryActions.map((action) => {
        const Icon = action.icon;
        return (
          <Button
            key={action.label}
            variant={action.variant}
            size="sm"
            onClick={action.action}
            disabled={isCreating}
            className="flex items-center"
          >
            <Icon className="h-4 w-4 mr-1" />
            {action.label}
          </Button>
        );
      })}

      {/* More Actions Dropdown */}
      <Dropdown
        trigger={
          <Button variant="outline" size="sm" className="px-2">
            <MoreHorizontal className="h-4 w-4" />
            <span className="sr-only">More actions</span>
          </Button>
        }
        items={moreActions}
      />
    </div>
  );
}