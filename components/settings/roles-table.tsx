'use client';

import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { DataTable } from '../ui/data-table';
import type { Role } from '../../lib/settings/types';

interface RolesTableProps {
  roles: Role[];
}

export function RolesTable({ roles }: RolesTableProps) {
  const getRoleTypeBadge = (type: Role['type']) => {
    switch (type) {
      case 'super_admin': return <Badge variant="destructive">Super Admin</Badge>;
      case 'admin': return <Badge variant="warning">Admin</Badge>;
      case 'manager': return <Badge variant="secondary">Manager</Badge>;
      case 'staff': return <Badge variant="outline">Staff</Badge>;
      case 'custom': return <Badge>Custom</Badge>;
      default: return <Badge variant="outline">{type}</Badge>;
    }
  };

  const columns = [
    {
      header: 'Role Name',
      accessorKey: 'name',
      cell: ({ row }: any) => (
        <div>
          <div className="font-medium text-gray-900">{row.name}</div>
          {row.description && (
            <div className="text-sm text-gray-500">{row.description}</div>
          )}
        </div>
      )
    },
    {
      header: 'Type',
      accessorKey: 'type',
      cell: ({ row }: any) => getRoleTypeBadge(row.type)
    },
    {
      header: 'Permissions',
      accessorKey: 'permissions',
      cell: ({ row }: any) => (
        <span className="text-sm text-gray-500">
          {row.permissions.length} permission(s)
        </span>
      )
    },
    {
      header: 'Users',
      id: 'userCount',
      cell: ({ row }: any) => (
        <span className="text-sm text-gray-500">
          {/* In real app, this would be calculated */}
          0 user(s)
        </span>
      )
    },
    {
      header: 'Actions',
      id: 'actions',
      cell: ({ row }: any) => (
        <div className="flex items-center gap-2">
          <Button
            size="sm"
            variant="outline"
            onClick={() => console.log('Edit role:', row.id)}
          >
            Edit
          </Button>
          {row.isCustom && (
            <Button
              size="sm"
              variant="outline"
              onClick={() => console.log('Delete role:', row.id)}
            >
              Delete
            </Button>
          )}
        </div>
      )
    }
  ];

  return (
    <DataTable
      data={roles}
      columns={columns}
      searchKey="name"
      searchPlaceholder="Search roles..."
    />
  );
}