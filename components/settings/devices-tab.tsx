import { Suspense } from 'react';
import { getDevices } from '../../lib/settings/data';
import { DevicesTable } from './devices-table';
import { SettingsSection } from './settings-section';
import { SettingsCard } from './settings-card';
import { Button } from '../ui/button';
import { Skeleton } from '../ui/skeleton';

function TableSkeleton() {
  return (
    <div className="space-y-4">
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className="border border-gray-200 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Skeleton className="h-10 w-10 rounded" />
              <div>
                <Skeleton className="h-4 w-24 mb-1" />
                <Skeleton className="h-3 w-32" />
              </div>
            </div>
            <div className="flex gap-2">
              <Skeleton className="h-6 w-16 rounded-full" />
              <Skeleton className="h-8 w-20" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export async function DevicesTab() {
  const devices = await getDevices();

  return (
    <div className="space-y-8 p-6">
      <SettingsSection
        title="Device Management"
        description="Configure and monitor POS terminals, KDS screens, and other hardware"
        actions={
          <Button size="sm">
            <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            Add Device
          </Button>
        }
      >
        <SettingsCard>
          <Suspense fallback={<TableSkeleton />}>
            <DevicesTable devices={devices} />
          </Suspense>
        </SettingsCard>
      </SettingsSection>

      {/* Device Status Overview */}
      <SettingsSection
        title="Device Status Overview"
        description="Quick overview of all connected devices"
      >
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <SettingsCard className="text-center">
            <div className="text-2xl font-bold text-green-600">1</div>
            <div className="text-sm text-gray-500">Online</div>
          </SettingsCard>
          <SettingsCard className="text-center">
            <div className="text-2xl font-bold text-gray-400">0</div>
            <div className="text-sm text-gray-500">Offline</div>
          </SettingsCard>
          <SettingsCard className="text-center">
            <div className="text-2xl font-bold text-amber-600">0</div>
            <div className="text-sm text-gray-500">Maintenance</div>
          </SettingsCard>
          <SettingsCard className="text-center">
            <div className="text-2xl font-bold text-red-600">0</div>
            <div className="text-sm text-gray-500">Error</div>
          </SettingsCard>
        </div>
      </SettingsSection>
    </div>
  );
}