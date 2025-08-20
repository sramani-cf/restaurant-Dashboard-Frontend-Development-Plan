'use client';

import { useState, useCallback } from 'react';
import { 
  Eye, 
  EyeOff, 
  Clock,
  Calendar,
  Settings
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ChannelVisibility, SalesChannel } from '@/lib/menu/types';

interface ChannelVisibilityEditorProps {
  channelVisibility: ChannelVisibility[];
  availableChannels: SalesChannel[];
  onChange: (visibility: ChannelVisibility[]) => void;
  className?: string;
}

export function ChannelVisibilityEditor({
  channelVisibility,
  availableChannels,
  onChange,
  className,
}: ChannelVisibilityEditorProps) {
  const [showAdvanced, setShowAdvanced] = useState<string[]>([]);

  // Toggle advanced settings for a channel
  const toggleAdvanced = useCallback((channelId: string) => {
    setShowAdvanced(prev => 
      prev.includes(channelId) 
        ? prev.filter(id => id !== channelId)
        : [...prev, channelId]
    );
  }, []);

  // Get or create channel visibility settings
  const getChannelSettings = useCallback((channelId: string): ChannelVisibility => {
    const existing = channelVisibility.find(cv => cv.channelId === channelId);
    if (existing) return existing;
    
    return {
      channelId,
      isVisible: true,
    };
  }, [channelVisibility]);

  // Update channel visibility
  const updateChannelVisibility = useCallback((channelId: string, updates: Partial<ChannelVisibility>) => {
    const existing = channelVisibility.find(cv => cv.channelId === channelId);
    
    if (existing) {
      // Update existing
      const updated = channelVisibility.map(cv =>
        cv.channelId === channelId ? { ...cv, ...updates } : cv
      );
      onChange(updated);
    } else {
      // Create new
      const newVisibility: ChannelVisibility = {
        channelId,
        isVisible: true,
        ...updates,
      };
      onChange([...channelVisibility, newVisibility]);
    }
  }, [channelVisibility, onChange]);

  // Toggle day of week
  const toggleDayOfWeek = useCallback((channelId: string, day: number) => {
    const settings = getChannelSettings(channelId);
    const currentDays = settings.daysOfWeek || [];
    
    const newDays = currentDays.includes(day)
      ? currentDays.filter(d => d !== day)
      : [...currentDays, day].sort();
    
    updateChannelVisibility(channelId, { 
      daysOfWeek: newDays.length > 0 ? newDays : undefined 
    });
  }, [getChannelSettings, updateChannelVisibility]);

  const daysOfWeek = [
    { label: 'Sun', value: 0 },
    { label: 'Mon', value: 1 },
    { label: 'Tue', value: 2 },
    { label: 'Wed', value: 3 },
    { label: 'Thu', value: 4 },
    { label: 'Fri', value: 5 },
    { label: 'Sat', value: 6 },
  ];

  return (
    <div className={className}>
      <div className="mb-4">
        <h3 className="text-sm font-semibold mb-1">Channel Visibility</h3>
        <p className="text-xs text-gray-500">
          Control which sales channels can see and order this item
        </p>
      </div>

      <div className="space-y-3">
        {availableChannels.map((channel) => {
          const settings = getChannelSettings(channel.id);
          const hasAdvancedSettings = settings.availableFrom || 
                                     settings.availableTo || 
                                     (settings.daysOfWeek && settings.daysOfWeek.length > 0);
          
          return (
            <Card key={channel.id} className="p-4">
              {/* Channel Header */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className="flex items-center space-x-2">
                    {settings.isVisible ? (
                      <Eye className="h-4 w-4 text-green-600" />
                    ) : (
                      <EyeOff className="h-4 w-4 text-gray-400" />
                    )}
                    <span className="font-medium">{channel.name}</span>
                  </div>
                  
                  <Badge variant="outline" className="text-xs capitalize">
                    {channel.type.replace('_', ' ')}
                  </Badge>
                  
                  {hasAdvancedSettings && (
                    <Badge variant="secondary" className="text-xs">
                      Custom Schedule
                    </Badge>
                  )}
                </div>
                
                <div className="flex items-center space-x-2">
                  <Switch
                    size="sm"
                    checked={settings.isVisible}
                    onCheckedChange={(checked) => 
                      updateChannelVisibility(channel.id, { isVisible: checked })
                    }
                  />
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-7 w-7 p-0"
                    onClick={() => toggleAdvanced(channel.id)}
                  >
                    <Settings className="h-3 w-3" />
                  </Button>
                </div>
              </div>

              {/* Advanced Settings */}
              {showAdvanced.includes(channel.id) && (
                <div className="space-y-4 border-t pt-3">
                  {/* Time Availability */}
                  <div>
                    <div className="flex items-center space-x-2 mb-2">
                      <Clock className="h-4 w-4" />
                      <h4 className="text-sm font-medium">Time Availability</h4>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-medium mb-1 text-gray-600">
                          Available From
                        </label>
                        <Input
                          type="time"
                          value={settings.availableFrom || ''}
                          onChange={(e) => updateChannelVisibility(channel.id, { 
                            availableFrom: e.target.value || undefined 
                          })}
                          className="h-8 text-sm"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-xs font-medium mb-1 text-gray-600">
                          Available To
                        </label>
                        <Input
                          type="time"
                          value={settings.availableTo || ''}
                          onChange={(e) => updateChannelVisibility(channel.id, { 
                            availableTo: e.target.value || undefined 
                          })}
                          className="h-8 text-sm"
                        />
                      </div>
                    </div>
                    
                    <p className="text-xs text-gray-500 mt-1">
                      Leave empty for all-day availability
                    </p>
                  </div>

                  {/* Day Availability */}
                  <div>
                    <div className="flex items-center space-x-2 mb-2">
                      <Calendar className="h-4 w-4" />
                      <h4 className="text-sm font-medium">Day Availability</h4>
                    </div>
                    
                    <div className="flex flex-wrap gap-2">
                      {daysOfWeek.map((day) => {
                        const isSelected = settings.daysOfWeek?.includes(day.value);
                        const allDaysSelected = !settings.daysOfWeek || settings.daysOfWeek.length === 0;
                        
                        return (
                          <Button
                            key={day.value}
                            size="sm"
                            variant={isSelected || allDaysSelected ? 'default' : 'outline'}
                            className="h-8 px-3 text-xs"
                            onClick={() => toggleDayOfWeek(channel.id, day.value)}
                          >
                            {day.label}
                          </Button>
                        );
                      })}
                    </div>
                    
                    <div className="flex items-center justify-between mt-2">
                      <p className="text-xs text-gray-500">
                        {!settings.daysOfWeek || settings.daysOfWeek.length === 0
                          ? 'Available all days'
                          : `Available ${settings.daysOfWeek.length} day${settings.daysOfWeek.length !== 1 ? 's' : ''} per week`
                        }
                      </p>
                      
                      {settings.daysOfWeek && settings.daysOfWeek.length > 0 && (
                        <Button
                          size="sm"
                          variant="ghost"
                          className="h-6 text-xs"
                          onClick={() => updateChannelVisibility(channel.id, { daysOfWeek: undefined })}
                        >
                          Clear
                        </Button>
                      )}
                    </div>
                  </div>

                  {/* Quick Actions */}
                  <div className="flex space-x-2 pt-2 border-t">
                    <Button
                      size="sm"
                      variant="outline"
                      className="text-xs"
                      onClick={() => {
                        updateChannelVisibility(channel.id, {
                          availableFrom: '06:00',
                          availableTo: '22:00',
                          daysOfWeek: [1, 2, 3, 4, 5], // Mon-Fri
                        });
                      }}
                    >
                      Business Hours
                    </Button>
                    
                    <Button
                      size="sm"
                      variant="outline"
                      className="text-xs"
                      onClick={() => {
                        updateChannelVisibility(channel.id, {
                          availableFrom: '17:00',
                          availableTo: '23:00',
                          daysOfWeek: undefined,
                        });
                      }}
                    >
                      Dinner Only
                    </Button>
                    
                    <Button
                      size="sm"
                      variant="outline"
                      className="text-xs"
                      onClick={() => {
                        updateChannelVisibility(channel.id, {
                          availableFrom: undefined,
                          availableTo: undefined,
                          daysOfWeek: [5, 6], // Fri-Sat
                        });
                      }}
                    >
                      Weekends
                    </Button>
                    
                    <Button
                      size="sm"
                      variant="ghost"
                      className="text-xs text-red-600"
                      onClick={() => {
                        updateChannelVisibility(channel.id, {
                          availableFrom: undefined,
                          availableTo: undefined,
                          daysOfWeek: undefined,
                        });
                      }}
                    >
                      Reset
                    </Button>
                  </div>
                </div>
              )}
            </Card>
          );
        })}
      </div>
      
      {availableChannels.length === 0 && (
        <div className="text-center py-6 text-gray-500 border border-dashed border-gray-300 rounded-lg">
          <p className="text-sm">No sales channels configured</p>
          <p className="text-xs text-gray-400">Set up your sales channels to control visibility</p>
        </div>
      )}
    </div>
  );
}