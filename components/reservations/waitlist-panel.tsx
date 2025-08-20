'use client';

import React, { useState, useMemo } from 'react';
import { WaitlistEntry, Guest, Table } from '@/lib/reservations/types';
import { 
  getWaitlistStatusColor, 
  getWaitlistPriorityColor,
  formatTime,
  updateWaitTimes,
  canSeatWaitlistEntry
} from '@/lib/reservations/utils';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { WaitlistForm } from './waitlist-form';
import { updateWaitlistEntryAction, seatFromWaitlistAction } from '@/app/reservations/actions';

interface WaitlistPanelProps {
  waitlist: WaitlistEntry[];
  guests: Guest[];
  availableTables: Table[];
  onWaitlistUpdate?: (entry: WaitlistEntry) => void;
  className?: string;
}

export function WaitlistPanel({
  waitlist,
  guests,
  availableTables,
  onWaitlistUpdate,
  className = ''
}: WaitlistPanelProps) {
  const [isAddFormOpen, setIsAddFormOpen] = useState(false);
  const [loadingActions, setLoadingActions] = useState<Record<string, boolean>>({});

  const guestMap = useMemo(() => {
    return guests.reduce((acc, guest) => {
      acc[guest.id] = guest;
      return acc;
    }, {} as Record<string, Guest>);
  }, [guests]);

  // Update wait times based on current position
  const updatedWaitlist = useMemo(() => {
    const waitingEntries = waitlist.filter(entry => entry.status === 'waiting');
    return updateWaitTimes(waitingEntries, 90); // 90-minute average turnover
  }, [waitlist]);

  const handleActionClick = async (
    entryId: string,
    action: 'notify' | 'seat' | 'cancel' | 'no-show',
    tableId?: string
  ) => {
    setLoadingActions(prev => ({ ...prev, [entryId]: true }));

    try {
      let result;
      switch (action) {
        case 'notify':
          result = await updateWaitlistEntryAction(entryId, 'notified');
          break;
        case 'seat':
          if (!tableId) {
            throw new Error('Table ID required for seating');
          }
          result = await seatFromWaitlistAction(entryId, tableId);
          break;
        case 'cancel':
          result = await updateWaitlistEntryAction(entryId, 'cancelled');
          break;
        case 'no-show':
          result = await updateWaitlistEntryAction(entryId, 'no-show');
          break;
      }

      if (result.success && result.data && onWaitlistUpdate) {
        if ('waitlistEntry' in result.data) {
          onWaitlistUpdate(result.data.waitlistEntry);
        } else {
          onWaitlistUpdate(result.data as WaitlistEntry);
        }
      }
    } catch (error) {
      console.error(`Waitlist action ${action} failed:`, error);
    } finally {
      setLoadingActions(prev => ({ ...prev, [entryId]: false }));
    }
  };

  const getOptimalTable = (entry: WaitlistEntry) => {
    const suitableTables = availableTables.filter(table => 
      table.capacity >= entry.partySize &&
      table.status === 'available'
    );

    if (suitableTables.length === 0) return null;

    // Find the table with capacity closest to party size
    return suitableTables.reduce((best, current) => {
      const bestDiff = Math.abs(best.capacity - entry.partySize);
      const currentDiff = Math.abs(current.capacity - entry.partySize);
      return currentDiff < bestDiff ? current : best;
    });
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'vip':
        return '👑';
      case 'high':
        return '⭐';
      case 'normal':
        return '👥';
      case 'low':
        return '⏳';
      default:
        return '👥';
    }
  };

  const waitingEntries = updatedWaitlist.filter(entry => entry.status === 'waiting');
  const notifiedEntries = waitlist.filter(entry => entry.status === 'notified');
  const totalWaitTime = waitingEntries.reduce((sum, entry) => sum + entry.estimatedWaitTime, 0);
  const averageWaitTime = waitingEntries.length > 0 ? Math.round(totalWaitTime / waitingEntries.length) : 0;

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Waitlist Header */}
      <Card className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Digital Waitlist</h2>
          <Button onClick={() => setIsAddFormOpen(true)}>
            Add Walk-in
          </Button>
        </div>

        {/* Waitlist Stats */}
        <div className="grid grid-cols-4 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-blue-600">{waitingEntries.length}</div>
            <div className="text-sm text-gray-600">Waiting</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-amber-600">{notifiedEntries.length}</div>
            <div className="text-sm text-gray-600">Notified</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-gray-600">{averageWaitTime}m</div>
            <div className="text-sm text-gray-600">Avg Wait</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-green-600">{availableTables.length}</div>
            <div className="text-sm text-gray-600">Tables Ready</div>
          </div>
        </div>
      </Card>

      {/* Waiting List */}
      {waitingEntries.length > 0 && (
        <Card className="p-4">
          <h3 className="text-md font-semibold text-gray-900 mb-4">Currently Waiting</h3>
          <div className="space-y-3">
            {waitingEntries.map((entry, index) => {
              const guest = guestMap[entry.guestId];
              const optimalTable = getOptimalTable(entry);
              const isLoading = loadingActions[entry.id];
              const position = index + 1;

              return (
                <div 
                  key={entry.id} 
                  className="flex items-center justify-between p-3 bg-white border rounded-lg hover:shadow-sm transition-shadow"
                >
                  <div className="flex items-center space-x-4">
                    {/* Position */}
                    <div className="flex items-center justify-center w-8 h-8 bg-blue-100 text-blue-600 rounded-full font-semibold">
                      {position}
                    </div>

                    {/* Guest Info */}
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="font-medium">
                          {guest ? `${guest.firstName} ${guest.lastName}` : 'Unknown Guest'}
                        </span>
                        <span className="text-sm text-gray-600">
                          {getPriorityIcon(entry.priority)}
                        </span>
                        <Badge 
                          variant="outline"
                          style={{ 
                            borderColor: getWaitlistPriorityColor(entry.priority),
                            color: getWaitlistPriorityColor(entry.priority)
                          }}
                        >
                          {entry.priority.toUpperCase()}
                        </Badge>
                      </div>
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <span>{entry.partySize} guests</span>
                        <span>{guest?.phone}</span>
                        <span>Added {formatTime(entry.addedAt)}</span>
                      </div>
                      {entry.specialRequests && (
                        <div className="text-sm text-gray-600 mt-1">
                          Note: {entry.specialRequests}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    {/* Wait Time */}
                    <div className="text-center">
                      <div className="font-semibold text-amber-600">
                        {entry.estimatedWaitTime}m
                      </div>
                      <div className="text-xs text-gray-500">
                        (quoted {entry.quotedWaitTime}m)
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex space-x-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleActionClick(entry.id, 'notify')}
                        disabled={isLoading}
                      >
                        {isLoading ? 'Notifying...' : 'Notify'}
                      </Button>

                      {optimalTable && (
                        <Button
                          size="sm"
                          onClick={() => handleActionClick(entry.id, 'seat', optimalTable.id)}
                          disabled={isLoading}
                        >
                          {isLoading ? 'Seating...' : `Seat at ${optimalTable.number}`}
                        </Button>
                      )}

                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleActionClick(entry.id, 'cancel')}
                        disabled={isLoading}
                      >
                        Remove
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      )}

      {/* Notified Guests */}
      {notifiedEntries.length > 0 && (
        <Card className="p-4">
          <h3 className="text-md font-semibold text-gray-900 mb-4">Notified Guests</h3>
          <div className="space-y-3">
            {notifiedEntries.map((entry) => {
              const guest = guestMap[entry.guestId];
              const optimalTable = getOptimalTable(entry);
              const isLoading = loadingActions[entry.id];
              const notifiedMinutesAgo = Math.floor(
                (Date.now() - new Date(entry.notifiedAt!).getTime()) / (1000 * 60)
              );

              return (
                <div 
                  key={entry.id} 
                  className="flex items-center justify-between p-3 bg-amber-50 border border-amber-200 rounded-lg"
                >
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center justify-center w-8 h-8 bg-amber-100 text-amber-600 rounded-full">
                      📱
                    </div>

                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="font-medium">
                          {guest ? `${guest.firstName} ${guest.lastName}` : 'Unknown Guest'}
                        </span>
                        <Badge variant="outline" className="border-amber-400 text-amber-600">
                          NOTIFIED
                        </Badge>
                      </div>
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <span>{entry.partySize} guests</span>
                        <span>Notified {notifiedMinutesAgo}m ago</span>
                        {notifiedMinutesAgo > 10 && (
                          <Badge variant="destructive" className="text-xs">
                            Overdue
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    {optimalTable && (
                      <Button
                        size="sm"
                        onClick={() => handleActionClick(entry.id, 'seat', optimalTable.id)}
                        disabled={isLoading}
                      >
                        {isLoading ? 'Seating...' : `Seat at ${optimalTable.number}`}
                      </Button>
                    )}

                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleActionClick(entry.id, 'no-show')}
                      disabled={isLoading}
                    >
                      No Show
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      )}

      {/* Empty State */}
      {waitingEntries.length === 0 && notifiedEntries.length === 0 && (
        <Card className="p-8 text-center">
          <div className="text-gray-500">
            <div className="text-4xl mb-4">📋</div>
            <div className="text-lg font-medium mb-2">No guests waiting</div>
            <div className="text-sm">Walk-in guests will appear here when added to the waitlist.</div>
          </div>
        </Card>
      )}

      {/* Add Waitlist Entry Form */}
      {isAddFormOpen && (
        <WaitlistForm
          isOpen={isAddFormOpen}
          onClose={() => setIsAddFormOpen(false)}
          onSuccess={(entry) => {
            setIsAddFormOpen(false);
            if (onWaitlistUpdate) {
              onWaitlistUpdate(entry);
            }
          }}
        />
      )}
    </div>
  );
}