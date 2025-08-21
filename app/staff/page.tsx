import { Suspense } from 'react';
import { PageHeader } from '@/components/ui/page-header';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default async function StaffPage() {
  return (
    <div className="container mx-auto px-4 py-6 max-w-7xl">
      <PageHeader
        title="Staff Management"
        description="Manage restaurant staff, schedules, and permissions"
        actions={
          <div className="flex space-x-2">
            <Link href="/staff/new">
              <Button variant="primary">Add Staff</Button>
            </Link>
            <Link href="/staff/schedule">
              <Button variant="secondary">View Schedule</Button>
            </Link>
          </div>
        }
      />

      <div className="grid gap-6 mt-6">
        <div className="bg-white rounded-lg border p-6">
          <h2 className="text-lg font-semibold mb-4">Staff Overview</h2>
          <p className="text-muted-foreground">
            Staff management features are coming soon. This page will include:
          </p>
          <ul className="list-disc list-inside mt-4 space-y-2 text-muted-foreground">
            <li>Employee directory and profiles</li>
            <li>Schedule management</li>
            <li>Role and permission assignments</li>
            <li>Performance tracking</li>
            <li>Payroll integration</li>
          </ul>
        </div>
      </div>
    </div>
  );
}