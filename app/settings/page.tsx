import { Suspense } from 'react';
import { AppShell } from '@/components/layout';
import { SimpleTabs } from '../../components/ui/tabs';
import { RestaurantProfileTab } from '../../components/settings/restaurant-profile-tab';
import { UsersRolesTab } from '../../components/settings/users-roles-tab';
import { PermissionsTab } from '../../components/settings/permissions-tab';
import { DevicesTab } from '../../components/settings/devices-tab';
import { PaymentsTab } from '../../components/settings/payments-tab';
import { IntegrationsTab } from '../../components/settings/integrations-tab';
import { TaxGratuityTab } from '../../components/settings/tax-gratuity-tab';
import { SecurityTab } from '../../components/settings/security-tab';
import { Skeleton } from '../../components/ui/skeleton';

// Tab loading components
function TabLoading() {
  return (
    <div className="space-y-6 p-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="space-y-2">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-10 w-full" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default async function SettingsPage({
  searchParams
}: {
  searchParams: Promise<{ tab?: string }>
}) {
  const params = await searchParams;
  const activeTab = params.tab || 'restaurant';

  const tabs = [
    {
      label: 'Restaurant Profile',
      content: (
        <Suspense fallback={<TabLoading />}>
          <RestaurantProfileTab />
        </Suspense>
      )
    },
    {
      label: 'Users & Roles',
      content: (
        <Suspense fallback={<TabLoading />}>
          <UsersRolesTab />
        </Suspense>
      )
    },
    {
      label: 'Permissions',
      content: (
        <Suspense fallback={<TabLoading />}>
          <PermissionsTab />
        </Suspense>
      )
    },
    {
      label: 'Devices',
      content: (
        <Suspense fallback={<TabLoading />}>
          <DevicesTab />
        </Suspense>
      )
    },
    {
      label: 'Payments',
      content: (
        <Suspense fallback={<TabLoading />}>
          <PaymentsTab />
        </Suspense>
      )
    },
    {
      label: 'Integrations',
      content: (
        <Suspense fallback={<TabLoading />}>
          <IntegrationsTab />
        </Suspense>
      )
    },
    {
      label: 'Tax & Gratuity',
      content: (
        <Suspense fallback={<TabLoading />}>
          <TaxGratuityTab />
        </Suspense>
      )
    },
    {
      label: 'Security',
      content: (
        <Suspense fallback={<TabLoading />}>
          <SecurityTab />
        </Suspense>
      )
    }
  ];

  return (
    <AppShell
      title="Settings"
      description="Configure your restaurant management system"
      breadcrumbs={[{ label: 'Settings' }]}
    >
      <div className="h-full">
        <SimpleTabs
          tabs={tabs}
          className="h-full"
        />
      </div>
    </AppShell>
  );
}