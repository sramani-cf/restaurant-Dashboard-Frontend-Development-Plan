import { Suspense } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default async function StaffPage() {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Staff Management</h1>
          <p className="text-sm text-gray-600">Manage restaurant staff, schedules, and permissions</p>
        </div>
        <div className="flex items-center space-x-3">
          <Link href="/staff/new">
            <Button variant="primary">Add Staff</Button>
          </Link>
          <Link href="/staff/schedule">
            <Button variant="secondary">View Schedule</Button>
          </Link>
        </div>
      </div>
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
    </div>
  );
}