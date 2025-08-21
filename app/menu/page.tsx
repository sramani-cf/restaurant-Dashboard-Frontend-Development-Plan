import { Suspense } from 'react';
import { MenuManagementClient } from '@/components/menu/menu-management-client';
import { getMenus, getSalesChannels, getAllergens } from '@/lib/menu/data';

export default async function MenuPage() {
  // Fetch initial data
  const [menusResult, channels, allergens] = await Promise.all([
    getMenus({ page: 1, limit: 50 }),
    getSalesChannels(),
    getAllergens(),
  ]);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Menu Management</h1>
        <p className="text-sm text-gray-600">Manage your restaurant menus, items, pricing, and availability</p>
      </div>
      <Suspense fallback={<div>Loading menu management...</div>}>
        <MenuManagementClient 
          initialMenus={menusResult.data}
          availableChannels={channels}
          availableAllergens={allergens}
        />
      </Suspense>
    </div>
  );
}