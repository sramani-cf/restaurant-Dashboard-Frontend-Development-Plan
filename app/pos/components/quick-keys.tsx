'use client';

import { QuickKey } from '@/lib/pos/types';

interface QuickKeysProps {
  quickKeys: QuickKey[];
  onQuickKey: (key: QuickKey) => void;
}

export function QuickKeys({ quickKeys, onQuickKey }: QuickKeysProps) {
  return (
    <div className="grid grid-cols-6 gap-2">
      {quickKeys.map((key) => (
        <button
          key={key.id}
          onClick={() => onQuickKey(key)}
          className="px-3 py-2 rounded-lg font-medium text-sm transition-all hover:scale-105"
          style={{
            backgroundColor: key.color || '#374151',
            color: '#ffffff'
          }}
        >
          {key.label}
        </button>
      ))}
    </div>
  );
}