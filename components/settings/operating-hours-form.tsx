'use client';

import { useState } from 'react';
import { Switch } from '../ui/switch';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import type { OperatingHours } from '../../lib/settings/types';

interface OperatingHoursFormProps {
  operatingHours: OperatingHours;
  restaurantId: string;
}

const days = [
  { id: 'monday', label: 'Monday' },
  { id: 'tuesday', label: 'Tuesday' },
  { id: 'wednesday', label: 'Wednesday' },
  { id: 'thursday', label: 'Thursday' },
  { id: 'friday', label: 'Friday' },
  { id: 'saturday', label: 'Saturday' },
  { id: 'sunday', label: 'Sunday' }
];

export function OperatingHoursForm({ operatingHours, restaurantId }: OperatingHoursFormProps) {
  const [hours, setHours] = useState(operatingHours);

  const toggleDay = (day: string) => {
    setHours(prev => ({
      ...prev,
      [day]: {
        ...prev[day],
        isOpen: !prev[day].isOpen
      }
    }));
  };

  const updateHours = (day: string, shiftIndex: number, field: 'start' | 'end', value: string) => {
    setHours(prev => ({
      ...prev,
      [day]: {
        ...prev[day],
        shifts: prev[day].shifts.map((shift, index) =>
          index === shiftIndex ? { ...shift, [field]: value } : shift
        )
      }
    }));
  };

  return (
    <div className="space-y-6">
      {days.map((day) => (
        <div key={day.id} className="border border-gray-200 rounded-lg p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-900">{day.label}</h3>
            <Switch
              checked={hours[day.id]?.isOpen || false}
              onCheckedChange={() => toggleDay(day.id)}
            />
          </div>
          
          {hours[day.id]?.isOpen && (
            <div className="space-y-3">
              {(hours[day.id]?.shifts || []).map((shift, index) => (
                <div key={index} className="flex items-center gap-4">
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Opening Time
                    </label>
                    <Input
                      type="time"
                      value={shift.start}
                      onChange={(e) => updateHours(day.id, index, 'start', e.target.value)}
                    />
                  </div>
                  
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Closing Time
                    </label>
                    <Input
                      type="time"
                      value={shift.end}
                      onChange={(e) => updateHours(day.id, index, 'end', e.target.value)}
                    />
                  </div>
                  
                  <div className="pt-6">
                    <Button size="sm" variant="outline">
                      Remove
                    </Button>
                  </div>
                </div>
              ))}
              
              <Button size="sm" variant="outline">
                Add Time Slot
              </Button>
            </div>
          )}
        </div>
      ))}
      
      <div className="flex justify-end gap-3 pt-6 border-t border-gray-200">
        <Button variant="outline">
          Reset to Default
        </Button>
        <Button>
          Save Hours
        </Button>
      </div>
    </div>
  );
}