import { Suspense } from 'react';
import { Tabs } from '../../components/ui/tabs';
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
  searchParams: { tab?: string }
}) {
  const activeTab = searchParams.tab || 'restaurant';

  const tabs = [
    {
      id: 'restaurant',
      label: 'Restaurant Profile',
      content: (
        <Suspense fallback={<TabLoading />}>
          <RestaurantProfileTab />
        </Suspense>
      )
    },
    {
      id: 'users',
      label: 'Users & Roles',
      content: (
        <Suspense fallback={<TabLoading />}>
          <UsersRolesTab />
        </Suspense>
      )
    },
    {
      id: 'permissions',
      label: 'Permissions',
      content: (
        <Suspense fallback={<TabLoading />}>
          <PermissionsTab />
        </Suspense>
      )
    },
    {
      id: 'devices',
      label: 'Devices',
      content: (
        <Suspense fallback={<TabLoading />}>
          <DevicesTab />
        </Suspense>
      )
    },
    {
      id: 'payments',
      label: 'Payments',
      content: (
        <Suspense fallback={<TabLoading />}>
          <PaymentsTab />
        </Suspense>
      )
    },
    {
      id: 'integrations',
      label: 'Integrations',
      content: (
        <Suspense fallback={<TabLoading />}>
          <IntegrationsTab />
        </Suspense>
      )
    },
    {
      id: 'taxes',
      label: 'Tax & Gratuity',
      content: (
        <Suspense fallback={<TabLoading />}>
          <TaxGratuityTab />
        </Suspense>
      )
    },
    {
      id: 'security',
      label: 'Security',
      content: (
        <Suspense fallback={<TabLoading />}>
          <SecurityTab />
        </Suspense>
      )
    }
  ];

  return (
    <div className="h-full">
      <Tabs
        tabs={tabs}
        defaultValue={activeTab}
        className="h-full"
        urlParam="tab"
      />
    </div>
  );
}