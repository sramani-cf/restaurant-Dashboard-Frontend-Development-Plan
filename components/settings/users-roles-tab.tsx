import { Suspense } from 'react';
import { getUsers, getRoles } from '../../lib/settings/data';
import { UsersTable } from './users-table';
import { RolesTable } from './roles-table';
import { SettingsSection } from './settings-section';
import { SettingsCard } from './settings-card';
import { Button } from '../ui/button';
import { Skeleton } from '../ui/skeleton';

function TableSkeleton() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Skeleton className="h-6 w-32" />
        <Skeleton className="h-9 w-24" />
      </div>
      <div className="border border-gray-200 rounded-lg overflow-hidden">
        <div className="bg-gray-50 border-b border-gray-200 p-4">
          <div className="grid grid-cols-5 gap-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} className="h-4 w-full" />
            ))}
          </div>
        </div>
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="border-b border-gray-200 last:border-b-0 p-4">
            <div className="grid grid-cols-5 gap-4">
              {Array.from({ length: 5 }).map((_, j) => (
                <Skeleton key={j} className="h-4 w-full" />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export async function UsersRolesTab() {
  const [users, roles] = await Promise.all([
    getUsers(),
    getRoles()
  ]);

  return (
    <div className="space-y-8 p-6">
      {/* Users Management */}
      <SettingsSection
        title="Users"
        description="Manage team members and their access to the system"
        actions={
          <Button size="sm">
            <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            Add User
          </Button>
        }
      >
        <SettingsCard>
          <Suspense fallback={<TableSkeleton />}>
            <UsersTable users={users} />
          </Suspense>
        </SettingsCard>
      </SettingsSection>

      {/* Roles Management */}
      <SettingsSection
        title="Roles & Permissions"
        description="Define user roles and their permission levels"
        actions={
          <Button size="sm" variant="outline">
            <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            Create Role
          </Button>
        }
      >
        <SettingsCard>
          <Suspense fallback={<TableSkeleton />}>
            <RolesTable roles={roles} />
          </Suspense>
        </SettingsCard>
      </SettingsSection>
    </div>
  );
}