'use client';

import { useState } from 'react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Modal } from '../ui/modal';
import { DataTable } from '../ui/data-table';
import type { User } from '../../lib/settings/types';

interface UsersTableProps {
  users: User[];
}

export function UsersTable({ users }: UsersTableProps) {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [showUserModal, setShowUserModal] = useState(false);

  const getStatusBadgeVariant = (status: User['status']) => {
    switch (status) {
      case 'active': return 'success';
      case 'inactive': return 'secondary';
      case 'suspended': return 'destructive';
      case 'pending': return 'warning';
      default: return 'secondary';
    }
  };

  const columns = [
    {
      header: 'User',
      accessorKey: 'name',
      cell: ({ row }: any) => (
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
            <span className="text-sm font-medium text-gray-700">
              {row.firstName[0]}{row.lastName[0]}
            </span>
          </div>
          <div>
            <div className="font-medium text-gray-900">
              {row.firstName} {row.lastName}
            </div>
            <div className="text-sm text-gray-500">{row.email}</div>
          </div>
        </div>
      )
    },
    {
      header: 'Role',
      accessorKey: 'role',
      cell: ({ row }: any) => (
        <Badge variant="secondary">
          {row.role.name}
        </Badge>
      )
    },
    {
      header: 'Status',
      accessorKey: 'status',
      cell: ({ row }: any) => (
        <Badge variant={getStatusBadgeVariant(row.status)}>
          {row.status}
        </Badge>
      )
    },
    {
      header: 'Last Login',
      accessorKey: 'lastLogin',
      cell: ({ row }: any) => (
        <span className="text-sm text-gray-500">
          {row.lastLogin 
            ? new Date(row.lastLogin).toLocaleDateString()
            : 'Never'
          }
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
            onClick={() => {
              setSelectedUser(row);
              setShowUserModal(true);
            }}
          >
            Edit
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() => {
              // Handle user deletion
              console.log('Delete user:', row.id);
            }}
          >
            Delete
          </Button>
        </div>
      )
    }
  ];

  return (
    <>
      <DataTable
        data={users}
        columns={columns}
        searchKey="email"
        searchPlaceholder="Search users..."
      />

      {/* User Modal */}
      <Modal
        isOpen={showUserModal}
        onClose={() => {
          setShowUserModal(false);
          setSelectedUser(null);
        }}
        title={selectedUser ? 'Edit User' : 'Add User'}
        size="lg"
      >
        <div className="p-6">
          <p className="text-gray-500">
            User management form would go here for {selectedUser?.firstName} {selectedUser?.lastName}
          </p>
          <div className="mt-6 flex justify-end gap-3">
            <Button
              variant="outline"
              onClick={() => setShowUserModal(false)}
            >
              Cancel
            </Button>
            <Button>
              Save Changes
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
}