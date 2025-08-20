'use client';

import { useState } from 'react';
import { Switch } from '../ui/switch';
import { Badge } from '../ui/badge';
import { PERMISSION_DEFINITIONS, PermissionUtils } from '../../lib/settings/permissions';

export function PermissionsMatrix() {
  const [selectedRole, setSelectedRole] = useState('manager');
  
  const roles = [
    { id: 'super_admin', name: 'Super Admin', color: 'red' },
    { id: 'admin', name: 'Admin', color: 'orange' },
    { id: 'manager', name: 'Manager', color: 'blue' },
    { id: 'staff', name: 'Staff', color: 'green' }
  ];

  const permissionsByCategory = PermissionUtils.getPermissionsByCategory();

  return (
    <div className="space-y-6">
      {/* Role Selection */}
      <div className="flex items-center gap-4">
        <span className="text-sm font-medium text-gray-700">Configure permissions for:</span>
        <div className="flex gap-2">
          {roles.map((role) => (
            <button
              key={role.id}
              onClick={() => setSelectedRole(role.id)}
              className={`px-3 py-1 text-sm font-medium rounded-full border transition-colors ${
                selectedRole === role.id
                  ? 'bg-blue-100 border-blue-300 text-blue-700'
                  : 'bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100'
              }`}
            >
              {role.name}
            </button>
          ))}
        </div>
      </div>

      {/* Permissions Matrix */}
      <div className="space-y-6">
        {Object.entries(permissionsByCategory).map(([category, permissions]) => (
          <div key={category} className="border border-gray-200 rounded-lg overflow-hidden">
            <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">{category}</h3>
            </div>
            
            <div className="p-4">
              <div className="grid gap-4">
                {permissions.map(({ id, definition }) => (
                  <div
                    key={id}
                    className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0"
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3">
                        <h4 className="text-sm font-medium text-gray-900">
                          {definition.label}
                        </h4>
                        {definition.dangerous && (
                          <Badge variant="destructive" className="text-xs">
                            Dangerous
                          </Badge>
                        )}
                        {definition.requiresAdmin && (
                          <Badge variant="warning" className="text-xs">
                            Admin Only
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-gray-500 mt-1">
                        {definition.description}
                      </p>
                    </div>
                    
                    <div className="flex items-center gap-4">
                      {/* Global Scope */}
                      <div className="flex items-center gap-2">
                        <Switch
                          id={`${id}-global`}
                          disabled={selectedRole === 'staff'}
                        />
                        <label htmlFor={`${id}-global`} className="text-xs text-gray-600">
                          Global
                        </label>
                      </div>
                      
                      {/* Location Scope */}
                      <div className="flex items-center gap-2">
                        <Switch
                          id={`${id}-location`}
                          defaultChecked={selectedRole !== 'staff'}
                        />
                        <label htmlFor={`${id}-location`} className="text-xs text-gray-600">
                          Location
                        </label>
                      </div>
                      
                      {/* Own Scope */}
                      <div className="flex items-center gap-2">
                        <Switch
                          id={`${id}-own`}
                          defaultChecked
                        />
                        <label htmlFor={`${id}-own`} className="text-xs text-gray-600">
                          Own
                        </label>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Actions */}
      <div className="flex justify-end gap-3 pt-6 border-t border-gray-200">
        <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50">
          Reset to Default
        </button>
        <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700">
          Save Permissions
        </button>
      </div>
    </div>
  );
}