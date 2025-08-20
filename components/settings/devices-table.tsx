'use client';

import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import type { Device } from '../../lib/settings/types';

interface DevicesTableProps {
  devices: Device[];
}

export function DevicesTable({ devices }: DevicesTableProps) {
  const getStatusBadge = (status: Device['status']) => {
    switch (status) {
      case 'online': return <Badge variant="success">Online</Badge>;
      case 'offline': return <Badge variant="secondary">Offline</Badge>;
      case 'maintenance': return <Badge variant="warning">Maintenance</Badge>;
      case 'error': return <Badge variant="destructive">Error</Badge>;
      case 'setup': return <Badge variant="outline">Setup</Badge>;
      default: return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getDeviceIcon = (type: Device['type']) => {
    switch (type) {
      case 'pos_terminal':
        return (
          <svg className="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0V12a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 12V5.25" />
          </svg>
        );
      case 'printer':
        return (
          <svg className="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6.72 13.829c-.24.03-.48.062-.72.096m.72-.096a42.415 42.415 0 0110.56 0m-10.56 0L6.34 18m10.94-4.171c.24.03.48.062.72.096m-.72-.096L17.66 18m0 0l.229 2.523a1.125 1.125 0 01-1.12 1.227H7.231c-.662 0-1.18-.568-1.12-1.227L6.34 18m11.318 0h1.091A2.25 2.25 0 0021 15.75V9.456c0-1.081-.768-2.015-1.837-2.175a48.055 48.055 0 00-1.913-.247M6.34 18H5.25A2.25 2.25 0 013 15.75V9.456c0-1.081.768-2.015 1.837-2.175a48.041 48.041 0 011.913-.247m10.5 0a48.536 48.536 0 00-10.5 0m10.5 0V3.375c0-.621-.504-1.125-1.125-1.125h-8.25c-.621 0-1.125.504-1.125 1.125v3.659M18 10.5h.008v.008H18V10.5zm-3 0h.008v.008H15V10.5z" />
          </svg>
        );
      default:
        return (
          <svg className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 3v1.125C8.25 4.747 8.503 5 8.625 5H20.25M8.25 3l4.5 4.5M8.25 3H6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 006 21h12a2.25 2.25 0 002.25-2.25V9m0 0l-4.5-4.5M20.25 9H12.75a.75.75 0 01-.75-.75V3" />
          </svg>
        );
    }
  };

  return (
    <div className="space-y-4">
      {devices.map((device) => (
        <div key={device.id} className="border border-gray-200 rounded-lg p-4 hover:border-gray-300 transition-colors">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex-shrink-0">
                {getDeviceIcon(device.type)}
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-medium text-gray-900 truncate">
                    {device.name}
                  </h3>
                  {getStatusBadge(device.status)}
                </div>
                
                <div className="mt-1 flex items-center gap-4 text-xs text-gray-500">
                  <span className="capitalize">
                    {device.type.replace('_', ' ')}
                  </span>
                  {device.model && (
                    <>
                      <span>•</span>
                      <span>{device.model}</span>
                    </>
                  )}
                  {device.ipAddress && (
                    <>
                      <span>•</span>
                      <span>{device.ipAddress}</span>
                    </>
                  )}
                  {device.lastSeen && (
                    <>
                      <span>•</span>
                      <span>Last seen {new Date(device.lastSeen).toLocaleString()}</span>
                    </>
                  )}
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Button size="sm" variant="outline">
                Configure
              </Button>
              <Button size="sm" variant="outline">
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                </svg>
              </Button>
            </div>
          </div>
        </div>
      ))}
      
      {devices.length === 0 && (
        <div className="text-center py-12">
          <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0V12a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 12V5.25" />
          </svg>
          <h3 className="mt-4 text-sm font-medium text-gray-900">No devices found</h3>
          <p className="mt-2 text-sm text-gray-500">
            Get started by adding your first device.
          </p>
        </div>
      )}
    </div>
  );
}