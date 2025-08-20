'use client';

import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import type { RestaurantLocation } from '../../lib/settings/types';

interface LocationManagerProps {
  locations: RestaurantLocation[];
}

export function LocationManager({ locations }: LocationManagerProps) {
  return (
    <div className="space-y-4">
      {locations.map((location) => (
        <div key={location.id} className="border border-gray-200 rounded-lg p-4">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <h3 className="text-lg font-medium text-gray-900">{location.name}</h3>
                {location.isDefault && <Badge variant="outline">Default</Badge>}
                <Badge variant={location.status === 'active' ? 'success' : 'secondary'}>
                  {location.status}
                </Badge>
              </div>
              
              <div className="space-y-1 text-sm text-gray-500">
                <p>
                  {location.address.street1}
                  {location.address.street2 && `, ${location.address.street2}`}
                </p>
                <p>
                  {location.address.city}, {location.address.state} {location.address.postalCode}
                </p>
                <p>{location.phone}</p>
              </div>
              
              <div className="mt-3 flex flex-wrap gap-2">
                {Object.entries(location.features)
                  .filter(([, enabled]) => enabled)
                  .map(([feature]) => (
                    <Badge key={feature} variant="outline" className="text-xs">
                      {feature.replace(/([A-Z])/g, ' $1').toLowerCase()}
                    </Badge>
                  ))
                }
              </div>
            </div>
            
            <div className="flex gap-2">
              <Button size="sm" variant="outline">
                Edit
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
      
      <Button variant="outline" className="w-full">
        <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
        </svg>
        Add New Location
      </Button>
    </div>
  );
}