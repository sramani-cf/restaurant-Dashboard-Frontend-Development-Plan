'use client';

import React, { useState, useEffect } from 'react';
import { AppShell } from '@/components/layout';
import { 
  Reservation, 
  Guest, 
  Table, 
  DiningArea, 
  WaitlistEntry, 
  ReservationStats as StatsType,
  ReservationFilters
} from '@/lib/reservations/types';
import { 
  getReservations,
  getGuests,
  getTables,
  getDiningAreas,
  getWaitlist,
  getReservationStats
} from '@/lib/reservations/data';
import {
  ReservationHeader,
  ReservationNavigation,
  ReservationGrid,
  FloorPlan,
  FloorPlanEditor,
  WaitlistPanel,
  ReservationStats,
  ReservationTimeline,
  ReservationCalendar,
  QuickActions,
  RealTimeUpdates,
  ReservationFilters as FiltersComponent,
  GuestProfile
} from '@/components/reservations';
import { updateTableStatusAction } from './actions';

export default function ReservationsPage() {
  // State management
  const [activeTab, setActiveTab] = useState('dashboard');
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [guests, setGuests] = useState<Guest[]>([]);
  const [tables, setTables] = useState<Table[]>([]);
  const [diningAreas, setDiningAreas] = useState<DiningArea[]>([]);
  const [waitlist, setWaitlist] = useState<WaitlistEntry[]>([]);
  const [stats, setStats] = useState<StatsType | null>(null);
  const [filters, setFilters] = useState<ReservationFilters>({});
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [selectedDiningArea, setSelectedDiningArea] = useState<string>('');
  const [selectedTableId, setSelectedTableId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load initial data
  useEffect(() => {
    loadData();
  }, []);

  // Reload reservations when filters change
  useEffect(() => {
    loadReservations();
  }, [filters]);

  const loadData = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const [
        reservationsResponse,
        guestsData,
        tablesData,
        diningAreasData,
        waitlistData,
        statsData
      ] = await Promise.all([
        getReservations(filters),
        getGuests(),
        getTables(),
        getDiningAreas(),
        getWaitlist(),
        getReservationStats()
      ]);

      setReservations(reservationsResponse.data);
      setGuests(guestsData);
      setTables(tablesData);
      setDiningAreas(diningAreasData);
      setWaitlist(waitlistData);
      setStats(statsData);

      // Set default dining area
      if (diningAreasData.length > 0 && !selectedDiningArea) {
        setSelectedDiningArea(diningAreasData[0].id);
      }

    } catch (err) {
      console.error('Failed to load data:', err);
      setError('Failed to load reservation data. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const loadReservations = async () => {
    try {
      const response = await getReservations(filters);
      setReservations(response.data);
    } catch (err) {
      console.error('Failed to load reservations:', err);
    }
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  const handleReservationUpdate = (updatedReservation: Reservation) => {
    setReservations(prev => 
      prev.map(res => 
        res.id === updatedReservation.id ? updatedReservation : res
      )
    );
    // Reload stats to reflect changes
    getReservationStats().then(setStats);
  };

  const handleWaitlistUpdate = (updatedEntry: WaitlistEntry) => {
    setWaitlist(prev => 
      prev.map(entry => 
        entry.id === updatedEntry.id ? updatedEntry : entry
      )
    );
  };

  const handleTableStatusChange = async (tableId: string, status: Table['status']) => {
    try {
      const result = await updateTableStatusAction(tableId, status);
      if (result.success && result.data) {
        setTables(prev => 
          prev.map(table => 
            table.id === tableId ? result.data! : table
          )
        );
      }
    } catch (error) {
      console.error('Failed to update table status:', error);
    }
  };

  const handleTableSelect = (table: Table) => {
    setSelectedTableId(table.id);
  };

  const handleRealTimeUpdate = (update: any) => {
    // Handle real-time updates from WebSocket or polling
    switch (update.type) {
      case 'reservation':
        if (update.action === 'update') {
          handleReservationUpdate(update.data);
        }
        break;
      case 'table':
        if (update.action === 'update') {
          setTables(prev => 
            prev.map(table => 
              table.id === update.data.id ? update.data : table
            )
          );
        }
        break;
      case 'waitlist':
        if (update.action === 'update') {
          handleWaitlistUpdate(update.data);
        }
        break;
    }
  };

  // Get filtered data for current view
  const currentDiningArea = diningAreas.find(area => area.id === selectedDiningArea);
  const currentTables = tables.filter(table => table.diningAreaId === selectedDiningArea);
  const availableTables = tables.filter(table => table.status === 'available');
  const todayReservations = reservations.filter(res => 
    res.dateTime.startsWith(selectedDate)
  );

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-2 border-gray-300 border-t-blue-600 mx-auto mb-4"></div>
          <div className="text-gray-600">Loading reservations...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="text-red-600 mb-2">⚠️ Error</div>
          <div className="text-gray-600 mb-4">{error}</div>
          <button 
            onClick={loadData}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <AppShell
      title="Reservations"
      description="Manage table reservations, floor plans, and dining areas"
      breadcrumbs={[{ label: 'Reservations' }]}
    >
      <div className="space-y-6">
        <ReservationHeader 
          onReservationCreated={handleReservationUpdate}
        />

        <ReservationNavigation 
          activeTab={activeTab}
          onTabChange={handleTabChange}
        />

      {activeTab === 'dashboard' && stats && (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Main Stats */}
          <div className="lg:col-span-3">
            <ReservationStats stats={stats} />
          </div>
          
          {/* Side Panel */}
          <div className="space-y-6">
            <QuickActions 
              onCreateReservation={() => {
                // This would open the reservation form
              }}
              onAddWalkIn={() => {
                setActiveTab('waitlist');
              }}
            />
            
            <RealTimeUpdates onUpdate={handleRealTimeUpdate} />
          </div>
          
          {/* Timeline View */}
          <div className="lg:col-span-2">
            <ReservationTimeline 
              reservations={todayReservations}
              selectedDate={selectedDate}
            />
          </div>
          
          {/* Calendar View */}
          <div className="lg:col-span-2">
            <ReservationCalendar 
              reservations={reservations}
              selectedDate={selectedDate}
              onDateSelect={setSelectedDate}
            />
          </div>
        </div>
      )}

      {activeTab === 'reservations' && (
        <div className="space-y-6">
          <FiltersComponent 
            filters={filters}
            onFiltersChange={setFilters}
          />
          
          <ReservationGrid
            reservations={reservations}
            guests={guests}
            tables={tables}
            onReservationUpdate={handleReservationUpdate}
          />
        </div>
      )}

      {activeTab === 'floor-plan' && (
        <div className="space-y-6">
          {/* Dining Area Selector */}
          <div className="flex items-center space-x-4">
            <label className="text-sm font-medium text-gray-700">Dining Area:</label>
            <select
              value={selectedDiningArea}
              onChange={(e) => setSelectedDiningArea(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            >
              {diningAreas.map(area => (
                <option key={area.id} value={area.id}>
                  {area.name}
                </option>
              ))}
            </select>
            
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <span>{currentTables.length} tables</span>
              <span>•</span>
              <span>{currentDiningArea?.capacity} capacity</span>
            </div>
          </div>

          {currentDiningArea && (
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              {/* Floor Plan */}
              <div className="lg:col-span-3">
                <FloorPlanEditor
                  diningArea={currentDiningArea}
                  tables={currentTables}
                  onTableUpdate={(table) => {
                    setTables(prev => 
                      prev.map(t => t.id === table.id ? table : t)
                    );
                  }}
                />
              </div>
              
              {/* Table Details */}
              <div className="space-y-4">
                {selectedTableId && (
                  <div className="text-sm text-gray-600">
                    <div className="font-medium mb-2">Selected Table</div>
                    {/* Table details would go here */}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {activeTab === 'waitlist' && (
        <WaitlistPanel
          waitlist={waitlist}
          guests={guests}
          availableTables={availableTables}
          onWaitlistUpdate={handleWaitlistUpdate}
        />
      )}

      {activeTab === 'guests' && (
        <div className="space-y-6">
          <div className="text-center py-8 text-gray-500">
            <div className="text-lg font-medium mb-2">Guest Database</div>
            <div className="text-sm">
              Comprehensive guest management features would be implemented here,
              including guest profiles, visit history, preferences, and CRM functionality.
            </div>
          </div>

          {/* Sample guest profiles */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {guests.slice(0, 6).map(guest => (
              <GuestProfile key={guest.id} guest={guest} />
            ))}
          </div>
        </div>
      )}
      </div>
    </AppShell>
  );
}