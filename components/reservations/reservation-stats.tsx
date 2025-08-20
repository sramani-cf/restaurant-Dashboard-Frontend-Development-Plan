'use client';

import React from 'react';
import { ReservationStats as StatsType } from '@/lib/reservations/types';
import { formatTime } from '@/lib/reservations/utils';
import { Card } from '@/components/ui/card';
import { StatCard } from '@/components/ui/stat-card';
import { Badge } from '@/components/ui/badge';

interface ReservationStatsProps {
  stats: StatsType;
  className?: string;
}

export function ReservationStats({ stats, className = '' }: ReservationStatsProps) {
  const occupancyRate = stats.current.occupiedTables + stats.current.availableTables > 0
    ? (stats.current.occupiedTables / (stats.current.occupiedTables + stats.current.availableTables)) * 100
    : 0;

  const turnoverRate = stats.today.totalReservations > 0
    ? (stats.today.seated / stats.today.totalReservations) * 100
    : 0;

  const noShowRate = stats.today.totalReservations > 0
    ? (stats.today.noShows / stats.today.totalReservations) * 100
    : 0;

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Today's Performance */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Today's Performance</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatCard
            title="Total Reservations"
            value={stats.today.totalReservations}
            trend={stats.today.totalReservations > 0 ? 'up' : 'neutral'}
            className="text-center"
          />
          <StatCard
            title="Total Covers"
            value={stats.today.totalCovers}
            subtitle={`${stats.today.averagePartySize.toFixed(1)} avg party size`}
            trend="up"
            className="text-center"
          />
          <StatCard
            title="Seated Today"
            value={stats.today.seated}
            subtitle={`${turnoverRate.toFixed(1)}% turnover rate`}
            trend={turnoverRate > 85 ? 'up' : turnoverRate > 70 ? 'neutral' : 'down'}
            className="text-center"
          />
          <StatCard
            title="Walk-ins"
            value={stats.today.walkIns}
            subtitle="Without reservation"
            trend="neutral"
            className="text-center"
          />
        </div>
      </Card>

      {/* Current Status */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Current Status</h3>
          <div className="space-y-4">
            {/* Table Occupancy */}
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <div className="text-sm font-medium text-gray-700">Table Occupancy</div>
                <div className="text-xs text-gray-500">
                  {stats.current.occupiedTables} of {stats.current.occupiedTables + stats.current.availableTables} tables
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <div className="text-xl font-bold text-gray-900">
                  {occupancyRate.toFixed(0)}%
                </div>
                <div 
                  className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden"
                  title={`${stats.current.occupiedTables} occupied, ${stats.current.availableTables} available`}
                >
                  <div 
                    className={`h-full transition-all duration-300 ${
                      occupancyRate > 90 ? 'bg-red-500' : 
                      occupancyRate > 70 ? 'bg-amber-500' : 
                      'bg-green-500'
                    }`}
                    style={{ width: `${occupancyRate}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Waitlist */}
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <div className="text-sm font-medium text-gray-700">Waitlist</div>
                <div className="text-xs text-gray-500">
                  {stats.current.averageWaitTime} min average wait
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <div className="text-xl font-bold text-amber-600">
                  {stats.current.waitlistSize}
                </div>
                {stats.current.waitlistSize > 10 && (
                  <Badge variant="destructive" className="text-xs">HIGH</Badge>
                )}
              </div>
            </div>

            {/* Next Available */}
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <div className="text-sm font-medium text-gray-700">Next Available</div>
                <div className="text-xs text-gray-500">Earliest table opening</div>
              </div>
              <div className="text-lg font-semibold text-green-600">
                {stats.current.nextAvailableSlot 
                  ? formatTime(stats.current.nextAvailableSlot)
                  : 'Now'
                }
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Today's Issues</h3>
          <div className="space-y-4">
            {/* No Shows */}
            <div className="flex items-center justify-between p-4 bg-red-50 border border-red-200 rounded-lg">
              <div>
                <div className="text-sm font-medium text-red-700">No Shows</div>
                <div className="text-xs text-red-600">
                  {noShowRate.toFixed(1)}% of reservations
                </div>
              </div>
              <div className="text-xl font-bold text-red-600">
                {stats.today.noShows}
              </div>
            </div>

            {/* Pending Confirmations */}
            <div className="flex items-center justify-between p-4 bg-amber-50 border border-amber-200 rounded-lg">
              <div>
                <div className="text-sm font-medium text-amber-700">Pending</div>
                <div className="text-xs text-amber-600">Need confirmation</div>
              </div>
              <div className="text-xl font-bold text-amber-600">
                {stats.today.pending}
              </div>
            </div>

            {/* Success Metrics */}
            <div className="flex items-center justify-between p-4 bg-green-50 border border-green-200 rounded-lg">
              <div>
                <div className="text-sm font-medium text-green-700">Successfully Seated</div>
                <div className="text-xs text-green-600">
                  {turnoverRate.toFixed(1)}% success rate
                </div>
              </div>
              <div className="text-xl font-bold text-green-600">
                {stats.today.seated}
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Forecast */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Today's Forecast</h3>
        <div className="grid grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600 mb-2">
              {stats.forecast.remainingCapacity}
            </div>
            <div className="text-sm text-gray-600 mb-1">Remaining Capacity</div>
            <div className="text-xs text-gray-500">Available covers</div>
          </div>

          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600 mb-2">
              {stats.forecast.expectedTurnover}
            </div>
            <div className="text-sm text-gray-600 mb-1">Expected Turnover</div>
            <div className="text-xs text-gray-500">Tables to turn</div>
          </div>

          <div className="text-center">
            <div className="text-2xl font-bold text-green-600 mb-2">
              ${stats.forecast.projectedRevenue.toLocaleString()}
            </div>
            <div className="text-sm text-gray-600 mb-1">Projected Revenue</div>
            <div className="text-xs text-gray-500">Based on bookings</div>
          </div>
        </div>

        {/* Revenue Progress Bar */}
        <div className="mt-4">
          <div className="flex items-center justify-between text-sm mb-2">
            <span className="text-gray-600">Revenue Progress</span>
            <span className="text-gray-900 font-medium">
              ${Math.round(stats.forecast.projectedRevenue * 0.6).toLocaleString()} / ${stats.forecast.projectedRevenue.toLocaleString()}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div 
              className="bg-green-500 h-3 rounded-full transition-all duration-500"
              style={{ width: '60%' }}
            />
          </div>
          <div className="text-xs text-gray-500 mt-1">60% of projected revenue achieved</div>
        </div>
      </Card>

      {/* Quick Insights */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Insights</h3>
        <div className="space-y-3">
          {occupancyRate > 90 && (
            <div className="flex items-start space-x-3 p-3 bg-red-50 border border-red-200 rounded-lg">
              <div className="text-red-500">⚠️</div>
              <div>
                <div className="text-sm font-medium text-red-700">High Occupancy Alert</div>
                <div className="text-xs text-red-600">
                  Restaurant is at {occupancyRate.toFixed(0)}% capacity. Consider managing walk-ins carefully.
                </div>
              </div>
            </div>
          )}

          {stats.current.waitlistSize > 5 && (
            <div className="flex items-start space-x-3 p-3 bg-amber-50 border border-amber-200 rounded-lg">
              <div className="text-amber-500">📋</div>
              <div>
                <div className="text-sm font-medium text-amber-700">Long Waitlist</div>
                <div className="text-xs text-amber-600">
                  {stats.current.waitlistSize} guests waiting with {stats.current.averageWaitTime} min average wait time.
                </div>
              </div>
            </div>
          )}

          {noShowRate > 15 && (
            <div className="flex items-start space-x-3 p-3 bg-red-50 border border-red-200 rounded-lg">
              <div className="text-red-500">❌</div>
              <div>
                <div className="text-sm font-medium text-red-700">High No-Show Rate</div>
                <div className="text-xs text-red-600">
                  {noShowRate.toFixed(1)}% no-show rate today. Consider implementing confirmation reminders.
                </div>
              </div>
            </div>
          )}

          {turnoverRate > 90 && (
            <div className="flex items-start space-x-3 p-3 bg-green-50 border border-green-200 rounded-lg">
              <div className="text-green-500">✅</div>
              <div>
                <div className="text-sm font-medium text-green-700">Excellent Performance</div>
                <div className="text-xs text-green-600">
                  {turnoverRate.toFixed(1)}% of reservations were successfully seated. Great job!
                </div>
              </div>
            </div>
          )}

          {stats.today.walkIns > stats.today.totalReservations * 0.3 && (
            <div className="flex items-start space-x-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="text-blue-500">👥</div>
              <div>
                <div className="text-sm font-medium text-blue-700">High Walk-in Volume</div>
                <div className="text-xs text-blue-600">
                  {stats.today.walkIns} walk-ins today ({((stats.today.walkIns / (stats.today.totalReservations + stats.today.walkIns)) * 100).toFixed(0)}% of total guests).
                </div>
              </div>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}