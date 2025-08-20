import { Suspense } from 'react';
import { PageHeader } from '@/components/ui/page-header';
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
    <div className="container mx-auto p-6">
      <PageHeader 
        title="Menu Management" 
        description="Manage your restaurant menus, items, pricing, and availability"
      />
      
      <div className="mt-8">
        <Suspense fallback={<div>Loading menu management...</div>}>
          <MenuManagementClient 
            initialMenus={menusResult.data}
            availableChannels={channels}
            availableAllergens={allergens}
          />
        </Suspense>
      </div>
    </div>
  );
}