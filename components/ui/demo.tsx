/**
 * Demo component showcasing all UI components
 * This file demonstrates how to use the restaurant dashboard UI components
 * Remove this file in production
 */

import React from 'react';
import {
  Button,
  Input,
  Badge,
  Alert,
  Skeleton,
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  StatCard,
  PageHeader,
  Tabs,
  Dropdown,
  Modal,
  DataTable,
  DateRangePicker,
  MetricGrid,
} from './index';
import { TrendingUp, Users, DollarSign, Clock, MoreHorizontal } from 'lucide-react';

export function ComponentDemo() {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [selectedDate, setSelectedDate] = React.useState<any>();

  // Sample data for DataTable
  const sampleData = [
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User' },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'Manager' },
  ];

  const columns = [
    { accessorKey: 'name', header: 'Name' },
    { accessorKey: 'email', header: 'Email' },
    { accessorKey: 'role', header: 'Role' },
  ];

  // Sample metrics for dashboard
  const metrics = [
    {
      title: 'Total Revenue',
      value: '$12,345',
      trend: { value: 12, direction: 'up' as const, period: 'last month' },
      icon: <DollarSign className="h-4 w-4" />,
      color: 'success' as const,
    },
    {
      title: 'Orders Today',
      value: '234',
      trend: { value: 5, direction: 'up' as const },
      icon: <Clock className="h-4 w-4" />,
      color: 'primary' as const,
    },
    {
      title: 'Active Customers',
      value: '1,234',
      trend: { value: 3, direction: 'down' as const },
      icon: <Users className="h-4 w-4" />,
      color: 'warning' as const,
    },
  ];

  // Sample tabs
  const tabItems = [
    {
      key: 'overview',
      label: 'Overview',
      icon: <TrendingUp className="h-4 w-4" />,
      content: (
        <div className="space-y-4">
          <p>Overview content goes here...</p>
          <MetricGrid metrics={metrics} />
        </div>
      ),
    },
    {
      key: 'analytics',
      label: 'Analytics',
      badge: '3',
      content: <p>Analytics content with charts and graphs...</p>,
    },
    {
      key: 'settings',
      label: 'Settings',
      content: <p>Settings panel...</p>,
    },
  ];

  // Sample dropdown items
  const dropdownItems = [
    { key: 'edit', label: 'Edit', onClick: () => console.log('Edit clicked') },
    { key: 'duplicate', label: 'Duplicate', onClick: () => console.log('Duplicate clicked') },
    { key: 'divider', label: '', divider: true },
    { key: 'delete', label: 'Delete', danger: true, onClick: () => console.log('Delete clicked') },
  ];

  return (
    <div className="p-8 space-y-8 max-w-6xl mx-auto">
      <PageHeader
        title="UI Components Demo"
        description="Showcase of all available UI components"
        actions={
          <div className="flex space-x-2">
            <Button variant="outline">Secondary Action</Button>
            <Button>Primary Action</Button>
          </div>
        }
      />

      {/* Buttons */}
      <Card>
        <CardHeader>
          <CardTitle>Buttons</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            <Button variant="primary">Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="danger">Danger</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="outline">Outline</Button>
            <Button loading>Loading</Button>
            <Button disabled>Disabled</Button>
          </div>
        </CardContent>
      </Card>

      {/* Inputs */}
      <Card>
        <CardHeader>
          <CardTitle>Inputs</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4 max-w-md">
            <Input placeholder="Normal input" />
            <Input placeholder="With label" label="Email Address" />
            <Input 
              placeholder="With error" 
              error="This field is required" 
              label="Required Field" 
            />
            <Input 
              placeholder="Success state" 
              success 
              label="Valid Field" 
            />
            <Input 
              placeholder="With helper text" 
              helperText="This is helpful information" 
            />
          </div>
        </CardContent>
      </Card>

      {/* Badges and Alerts */}
      <Card>
        <CardHeader>
          <CardTitle>Badges & Alerts</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex flex-wrap gap-2">
              <Badge>Default</Badge>
              <Badge variant="secondary">Secondary</Badge>
              <Badge variant="success">Success</Badge>
              <Badge variant="warning">Warning</Badge>
              <Badge variant="error">Error</Badge>
              <Badge pulse>Pulsing</Badge>
            </div>
            
            <Alert title="Information" variant="info">
              This is an informational alert message.
            </Alert>
            
            <Alert title="Success!" variant="success" dismissible>
              Operation completed successfully.
            </Alert>
          </div>
        </CardContent>
      </Card>

      {/* Stat Cards */}
      <Card>
        <CardHeader>
          <CardTitle>Statistics Cards</CardTitle>
        </CardHeader>
        <CardContent>
          <MetricGrid metrics={metrics} columns={3} />
        </CardContent>
      </Card>

      {/* Tabs */}
      <Card>
        <CardHeader>
          <CardTitle>Tabs</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs items={tabItems} variant="underline" />
        </CardContent>
      </Card>

      {/* Data Table */}
      <Card>
        <CardHeader>
          <CardTitle>Data Table</CardTitle>
        </CardHeader>
        <CardContent>
          <DataTable
            data={sampleData}
            columns={columns}
            searchable
            exportable
            onExport={() => console.log('Export clicked')}
          />
        </CardContent>
      </Card>

      {/* Interactive Components */}
      <Card>
        <CardHeader>
          <CardTitle>Interactive Components</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex space-x-4">
              <Button onClick={() => setIsModalOpen(true)}>
                Open Modal
              </Button>
              
              <Dropdown 
                items={dropdownItems}
                trigger={
                  <Button variant="outline">
                    Dropdown <MoreHorizontal className="ml-2 h-4 w-4" />
                  </Button>
                }
              />
            </div>
            
            <div className="max-w-sm">
              <DateRangePicker
                placeholder="Select date range"
                value={selectedDate}
                onChange={setSelectedDate}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Loading States */}
      <Card>
        <CardHeader>
          <CardTitle>Loading States</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Skeleton height="2rem" />
            <Skeleton variant="text" lines={3} />
            <Skeleton variant="circular" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <StatCard
                title="Loading Metric"
                value=""
                loading
              />
              <Skeleton variant="card" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Modal */}
      <Modal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Demo Modal"
        description="This is a sample modal dialog"
      >
        <div className="space-y-4">
          <p>This is the modal content. You can put any components here.</p>
          <Input placeholder="Modal input example" />
          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => setIsModalOpen(false)}>
              Save Changes
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}