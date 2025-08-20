'use client';

import React, { useState, useMemo } from 'react';
import { Reservation, Guest, Table, ReservationStatus } from '@/lib/reservations/types';
import { 
  formatTime, 
  formatDate, 
  getReservationStatusColor, 
  getReservationStatusLabel,
  isReservationLate,
  getReservationTimeStatus
} from '@/lib/reservations/utils';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { DataTable } from '@/components/ui/data-table';
import { ReservationDetails } from './reservation-details';
import { updateReservationAction, seatReservationAction, cancelReservationAction } from '@/app/reservations/actions';

interface ReservationGridProps {
  reservations: Reservation[];
  guests: Guest[];
  tables: Table[];
  onReservationUpdate?: (reservation: Reservation) => void;
  className?: string;
}

export function ReservationGrid({
  reservations,
  guests,
  tables,
  onReservationUpdate,
  className = ''
}: ReservationGridProps) {
  const [selectedReservation, setSelectedReservation] = useState<Reservation | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [loadingActions, setLoadingActions] = useState<Record<string, boolean>>({});

  const guestMap = useMemo(() => {
    return guests.reduce((acc, guest) => {
      acc[guest.id] = guest;
      return acc;
    }, {} as Record<string, Guest>);
  }, [guests]);

  const tableMap = useMemo(() => {
    return tables.reduce((acc, table) => {
      acc[table.id] = table;
      return acc;
    }, {} as Record<string, Table>);
  }, [tables]);

  const handleActionClick = async (
    reservationId: string, 
    action: 'seat' | 'cancel' | 'complete' | 'no-show',
    tableId?: string
  ) => {
    setLoadingActions(prev => ({ ...prev, [reservationId]: true }));

    try {
      let result;
      switch (action) {
        case 'seat':
          if (!tableId) {
            throw new Error('Table ID required for seating');
          }
          result = await seatReservationAction(reservationId, tableId);
          break;
        case 'cancel':
          result = await cancelReservationAction(reservationId);
          break;
        case 'complete':
          result = await updateReservationAction(reservationId, { status: 'completed' });
          break;
        case 'no-show':
          result = await updateReservationAction(reservationId, { status: 'no-show' });
          break;
      }

      if (result.success && result.data && onReservationUpdate) {
        onReservationUpdate(result.data);
      }
    } catch (error) {
      console.error(`Action ${action} failed:`, error);
    } finally {
      setLoadingActions(prev => ({ ...prev, [reservationId]: false }));
    }
  };

  const getTimeStatusBadge = (reservation: Reservation) => {
    if (reservation.status !== 'confirmed' && reservation.status !== 'pending') {
      return null;
    }

    const timeStatus = getReservationTimeStatus(reservation);
    let variant: 'default' | 'secondary' | 'destructive' | 'outline' = 'default';
    let text = '';

    switch (timeStatus) {
      case 'early':
        variant = 'secondary';
        text = 'Early';
        break;
      case 'on-time':
        variant = 'default';
        text = 'On Time';
        break;
      case 'late':
        variant = 'outline';
        text = 'Late';
        break;
      case 'very-late':
        variant = 'destructive';
        text = 'Very Late';
        break;
    }

    return <Badge variant={variant} className="text-xs">{text}</Badge>;
  };

  const getAvailableTables = (partySize: number) => {
    return tables.filter(table => 
      table.status === 'available' && table.capacity >= partySize
    );
  };

  const columns = [
    {
      header: 'Time',
      accessorKey: 'dateTime',
      cell: ({ row }: { row: { original: Reservation } }) => (
        <div className="space-y-1">
          <div className="font-medium">{formatTime(row.original.dateTime)}</div>
          <div className="text-sm text-gray-500">{formatDate(row.original.dateTime)}</div>
          {getTimeStatusBadge(row.original)}
        </div>
      ),
    },
    {
      header: 'Guest',
      cell: ({ row }: { row: { original: Reservation } }) => {
        const guest = guestMap[row.original.guestId];
        return (
          <div className="space-y-1">
            <div className="font-medium">
              {guest ? `${guest.firstName} ${guest.lastName}` : 'Unknown Guest'}
            </div>
            {guest?.phone && (
              <div className="text-sm text-gray-500">{guest.phone}</div>
            )}
            {guest?.vipStatus !== 'regular' && (
              <Badge variant="outline" className="text-xs">
                {guest.vipStatus.toUpperCase()}
              </Badge>
            )}
          </div>
        );
      },
    },
    {
      header: 'Party',
      accessorKey: 'partySize',
      cell: ({ row }: { row: { original: Reservation } }) => (
        <div className="text-center">
          <div className="font-semibold text-lg">{row.original.partySize}</div>
          <div className="text-xs text-gray-500">guests</div>
        </div>
      ),
    },
    {
      header: 'Table',
      cell: ({ row }: { row: { original: Reservation } }) => {
        const table = row.original.tableId ? tableMap[row.original.tableId] : null;
        return (
          <div className="space-y-1">
            {table ? (
              <>
                <div className="font-medium">Table {table.number}</div>
                <Badge 
                  variant="outline" 
                  className="text-xs"
                  style={{ backgroundColor: getReservationStatusColor(row.original.status) + '20' }}
                >
                  {getReservationStatusLabel(row.original.status)}
                </Badge>
              </>
            ) : (
              <span className="text-gray-500">Not assigned</span>
            )}
          </div>
        );
      },
    },
    {
      header: 'Status',
      cell: ({ row }: { row: { original: Reservation } }) => {
        const isLate = isReservationLate(row.original);
        return (
          <div className="space-y-1">
            <Badge 
              style={{ 
                backgroundColor: getReservationStatusColor(row.original.status),
                color: 'white'
              }}
            >
              {getReservationStatusLabel(row.original.status)}
            </Badge>
            {isLate && (
              <Badge variant="destructive" className="text-xs">LATE</Badge>
            )}
          </div>
        );
      },
    },
    {
      header: 'Special Requests',
      cell: ({ row }: { row: { original: Reservation } }) => (
        <div className="max-w-xs">
          {row.original.specialRequests && (
            <div className="text-sm text-gray-600 truncate" title={row.original.specialRequests}>
              {row.original.specialRequests}
            </div>
          )}
          {row.original.occasion && (
            <Badge variant="outline" className="text-xs mt-1">
              {row.original.occasion}
            </Badge>
          )}
        </div>
      ),
    },
    {
      header: 'Actions',
      cell: ({ row }: { row: { original: Reservation } }) => {
        const reservation = row.original;
        const guest = guestMap[reservation.guestId];
        const availableTables = getAvailableTables(reservation.partySize);
        const isLoading = loadingActions[reservation.id];

        return (
          <div className="flex items-center space-x-2">
            <Button
              size="sm"
              variant="ghost"
              onClick={() => {
                setSelectedReservation(reservation);
                setIsDetailsOpen(true);
              }}
            >
              Details
            </Button>

            {reservation.status === 'confirmed' && !reservation.tableId && availableTables.length > 0 && (
              <Button
                size="sm"
                onClick={() => handleActionClick(reservation.id, 'seat', availableTables[0].id)}
                disabled={isLoading}
              >
                {isLoading ? 'Seating...' : `Seat at ${availableTables[0].number}`}
              </Button>
            )}

            {reservation.status === 'seated' && (
              <Button
                size="sm"
                variant="outline"
                onClick={() => handleActionClick(reservation.id, 'complete')}
                disabled={isLoading}
              >
                {isLoading ? 'Completing...' : 'Complete'}
              </Button>
            )}

            {(reservation.status === 'confirmed' || reservation.status === 'pending') && (
              <Button
                size="sm"
                variant="outline"
                onClick={() => handleActionClick(reservation.id, 'no-show')}
                disabled={isLoading}
              >
                No Show
              </Button>
            )}

            {(reservation.status === 'confirmed' || reservation.status === 'pending') && (
              <Button
                size="sm"
                variant="destructive"
                onClick={() => handleActionClick(reservation.id, 'cancel')}
                disabled={isLoading}
              >
                {isLoading ? 'Cancelling...' : 'Cancel'}
              </Button>
            )}
          </div>
        );
      },
    },
  ];

  // Group reservations by date for better organization
  const groupedReservations = useMemo(() => {
    const groups: Record<string, Reservation[]> = {};
    
    reservations.forEach(reservation => {
      const dateKey = formatDate(reservation.dateTime);
      if (!groups[dateKey]) {
        groups[dateKey] = [];
      }
      groups[dateKey].push(reservation);
    });

    // Sort reservations within each group by time
    Object.keys(groups).forEach(dateKey => {
      groups[dateKey].sort((a, b) => 
        new Date(a.dateTime).getTime() - new Date(b.dateTime).getTime()
      );
    });

    return groups;
  }, [reservations]);

  return (
    <div className={`space-y-6 ${className}`}>
      {Object.entries(groupedReservations).map(([date, dateReservations]) => (
        <Card key={date} className="overflow-hidden">
          <div className="px-6 py-4 bg-gray-50 border-b">
            <h3 className="text-lg font-semibold text-gray-900">{date}</h3>
            <div className="flex items-center space-x-4 mt-2 text-sm text-gray-600">
              <span>{dateReservations.length} reservations</span>
              <span>
                {dateReservations.reduce((sum, res) => sum + res.partySize, 0)} total guests
              </span>
              <div className="flex space-x-3">
                <span className="text-green-600">
                  {dateReservations.filter(r => r.status === 'confirmed').length} confirmed
                </span>
                <span className="text-blue-600">
                  {dateReservations.filter(r => r.status === 'seated').length} seated
                </span>
                <span className="text-gray-600">
                  {dateReservations.filter(r => r.status === 'completed').length} completed
                </span>
              </div>
            </div>
          </div>
          
          <DataTable
            columns={columns}
            data={dateReservations}
            searchable={false}
            pagination={{ pageSize: 10 }}
          />
        </Card>
      ))}

      {reservations.length === 0 && (
        <Card className="p-8 text-center">
          <div className="text-gray-500">
            <div className="text-lg font-medium mb-2">No reservations found</div>
            <div className="text-sm">Create a new reservation to get started.</div>
          </div>
        </Card>
      )}

      {/* Reservation Details Modal */}
      {selectedReservation && (
        <ReservationDetails
          reservation={selectedReservation}
          guest={guestMap[selectedReservation.guestId]}
          table={selectedReservation.tableId ? tableMap[selectedReservation.tableId] : undefined}
          isOpen={isDetailsOpen}
          onClose={() => {
            setIsDetailsOpen(false);
            setSelectedReservation(null);
          }}
          onUpdate={onReservationUpdate}
        />
      )}
    </div>
  );
}