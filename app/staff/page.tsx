import { Suspense } from 'react';
import { AppShell } from '@/components/layout';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default async function StaffPage() {
  return (
    <AppShell
      title="Staff Management"
      description="Manage restaurant staff, schedules, and permissions"
      breadcrumbs={[{ label: 'Staff' }]}
      actions={
        <>
          <Link href="/staff/new">
            <Button variant="primary">Add Staff</Button>
          </Link>
          <Link href="/staff/schedule">
            <Button variant="secondary">View Schedule</Button>
          </Link>
        </>
      }
    >
      <div className="grid gap-6">
        <div className="bg-white rounded-lg border p-6">
          <h2 className="text-lg font-semibold mb-4">Staff Overview</h2>
          <p className="text-gray-600">
            Staff management features are coming soon. This page will include:
          </p>
          <ul className="list-disc list-inside mt-4 space-y-2 text-gray-600">
            <li>Employee directory and profiles</li>
            <li>Schedule management</li>
            <li>Role and permission assignments</li>
            <li>Performance tracking</li>
            <li>Payroll integration</li>
          </ul>
        </div>
      </div>
    </AppShell>
  );
}