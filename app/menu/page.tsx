import { Suspense } from 'react';
import { AppShell } from '@/components/layout';
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
    <AppShell
      title="Menu Management"
      description="Manage your restaurant menus, items, pricing, and availability"
      breadcrumbs={[{ label: 'Menu' }]}
    >
      <Suspense fallback={<div>Loading menu management...</div>}>
        <MenuManagementClient 
          initialMenus={menusResult.data}
          availableChannels={channels}
          availableAllergens={allergens}
        />
      </Suspense>
    </AppShell>
  );
}