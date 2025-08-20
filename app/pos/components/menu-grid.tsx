'use client';

import { MenuItem } from '@/lib/pos/types';
import { Plus } from 'lucide-react';

interface MenuGridProps {
  items: MenuItem[];
  onAddItem: (item: MenuItem) => void;
}

export function MenuGrid({ items, onAddItem }: MenuGridProps) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
      {items.map((item) => (
        <button
          key={item.id}
          onClick={() => onAddItem(item)}
          disabled={!item.available}
          className={`relative bg-gray-800 hover:bg-gray-700 rounded-lg p-4 transition-all transform hover:scale-105 ${
            !item.available ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          {!item.available && (
            <div className="absolute inset-0 bg-gray-900/50 rounded-lg flex items-center justify-center">
              <span className="text-red-400 font-semibold">Unavailable</span>
            </div>
          )}
          
          <div className="flex flex-col h-full">
            <h3 className="font-medium text-sm mb-1 text-left line-clamp-2">
              {item.name}
            </h3>
            
            {item.description && (
              <p className="text-xs text-gray-400 mb-2 text-left line-clamp-2">
                {item.description}
              </p>
            )}
            
            <div className="mt-auto flex items-center justify-between">
              <span className="text-lg font-bold text-green-400">
                ${item.price.toFixed(2)}
              </span>
              <div className="p-1 bg-primary/20 rounded-lg">
                <Plus className="h-4 w-4 text-primary" />
              </div>
            </div>
            
            {item.tags && item.tags.length > 0 && (
              <div className="flex gap-1 mt-2">
                {item.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-1.5 py-0.5 bg-gray-700 rounded"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </button>
      ))}
    </div>
  );
}