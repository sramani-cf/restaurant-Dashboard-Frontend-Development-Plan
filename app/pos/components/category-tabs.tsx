'use client';

import { MenuCategory } from '@/lib/pos/types';

interface CategoryTabsProps {
  categories: MenuCategory[];
  selectedCategory: MenuCategory;
  onSelectCategory: (category: MenuCategory) => void;
}

export function CategoryTabs({
  categories,
  selectedCategory,
  onSelectCategory
}: CategoryTabsProps) {
  return (
    <div className="bg-gray-800 border-b border-gray-700 px-4 py-2">
      <div className="flex gap-2 overflow-x-auto scrollbar-hide">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => onSelectCategory(category)}
            className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-all ${
              selectedCategory.id === category.id
                ? 'bg-primary text-white'
                : 'bg-gray-700 hover:bg-gray-600 text-gray-300'
            }`}
          >
            {category.name}
            <span className="ml-2 text-xs opacity-75">
              ({category.items.length})
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}