'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { ScrollArea } from '@/components/ui/scroll-area';
import { formatCurrency, formatTimeAgo, getStatusColor } from '@/lib/dashboard/utils';
import type { LiveOrder, LiveReservation } from '@/lib/dashboard/data';
import { 
  Clock, 
  Users, 
  Phone, 
  MapPin, 
  ChefHat,
  Bell,
  RefreshCw,
  Calendar,
  ShoppingCart,
  User
} from 'lucide-react';

interface LiveFeedsProps {
  orders?: LiveOrder[];
  reservations?: LiveReservation[];
  isLoading?: boolean;
  onRefresh?: () => void;
}

interface OrderCardProps {
  order: LiveOrder;
  isLoading?: boolean;
}

interface ReservationCardProps {
  reservation: LiveReservation;
  isLoading?: boolean;
}

function OrderCard({ order, isLoading }: OrderCardProps) {
  if (isLoading) {
    return (
      <Card className="mb-3">
        <CardContent className="p-4">
          <div className="space-y-2">
            <div className="flex justify-between">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-6 w-16" />
            </div>
            <Skeleton className="h-3 w-full" />
            <Skeleton className="h-3 w-3/4" />
          </div>
        </CardContent>
      </Card>
    );
  }

  const statusColor = getStatusColor(order.status);
  const isUrgent = order.estimatedTime <= 5 && order.status === 'preparing';

  return (
    <Card className={`mb-3 transition-all hover:shadow-md ${isUrgent ? 'ring-2 ring-red-200' : ''}`}>
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-2">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2">
              <ChefHat className="h-4 w-4 text-gray-500" />
              <span className="font-semibold text-sm">{order.orderNumber}</span>
            </div>
            {order.table && (
              <div className="flex items-center gap-1 text-xs text-gray-500">
                <MapPin className="h-3 w-3" />
                {order.table}
              </div>
            )}
          </div>
          <Badge className={statusColor}>
            {order.status.replace('_', ' ')}
          </Badge>
        </div>

        {order.customerName && (
          <div className="flex items-center gap-2 mb-2">
            <User className="h-3 w-3 text-gray-400" />
            <span className="text-sm text-gray-600">{order.customerName}</span>
          </div>
        )}

        <div className="space-y-1 mb-3">
          {order.items.slice(0, 2).map((item, index) => (
            <div key={index} className="flex justify-between text-sm">
              <span className="text-gray-600">
                {item.quantity}x {item.name}
              </span>
              <span className="font-medium">{formatCurrency(item.price * item.quantity)}</span>
            </div>
          ))}
          {order.items.length > 2 && (
            <div className="text-xs text-gray-500">
              +{order.items.length - 2} more items
            </div>
          )}
        </div>

        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-1 text-gray-500">
            <Clock className="h-3 w-3" />
            <span>{formatTimeAgo(order.timeOrdered)}</span>
          </div>
          <div className="font-semibold">
            Total: {formatCurrency(order.total)}
          </div>
        </div>

        {isUrgent && (
          <div className="mt-2 p-2 bg-red-50 rounded-md flex items-center gap-2 text-red-700">
            <Bell className="h-4 w-4" />
            <span className="text-xs font-medium">Urgent - Est. {order.estimatedTime}min</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function ReservationCard({ reservation, isLoading }: ReservationCardProps) {
  if (isLoading) {
    return (
      <Card className="mb-3">
        <CardContent className="p-4">
          <div className="space-y-2">
            <div className="flex justify-between">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-6 w-16" />
            </div>
            <Skeleton className="h-3 w-full" />
            <Skeleton className="h-3 w-1/2" />
          </div>
        </CardContent>
      </Card>
    );
  }

  const statusColor = getStatusColor(reservation.status);
  const isUpcoming = new Date(reservation.reservationTime) > new Date() && 
                    new Date(reservation.reservationTime).getTime() - new Date().getTime() < 3600000; // Within 1 hour

  return (
    <Card className={`mb-3 transition-all hover:shadow-md ${isUpcoming ? 'ring-2 ring-blue-200' : ''}`}>
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-2">
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-gray-500" />
            <span className="font-semibold text-sm">{reservation.customerName}</span>
          </div>
          <Badge className={statusColor}>
            {reservation.status.replace('_', ' ')}
          </Badge>
        </div>

        <div className="space-y-2 mb-3">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Calendar className="h-3 w-3" />
            <span>{formatTimeAgo(reservation.reservationTime)}</span>
          </div>
          
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Users className="h-3 w-3" />
            <span>{reservation.partySize} guests</span>
          </div>

          {reservation.table && (
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <MapPin className="h-3 w-3" />
              <span>{reservation.table}</span>
            </div>
          )}

          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Phone className="h-3 w-3" />
            <span>{reservation.phoneNumber}</span>
          </div>
        </div>

        {reservation.specialRequests && (
          <div className="text-xs text-gray-500 bg-gray-50 p-2 rounded">
            <strong>Note:</strong> {reservation.specialRequests}
          </div>
        )}

        {isUpcoming && (
          <div className="mt-2 p-2 bg-blue-50 rounded-md flex items-center gap-2 text-blue-700">
            <Bell className="h-4 w-4" />
            <span className="text-xs font-medium">Arriving soon</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function LoadingFeed({ title }: { title: string }) {
  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base flex items-center gap-2">
            <Skeleton className="h-4 w-4" />
            {title}
          </CardTitle>
          <Skeleton className="h-8 w-8" />
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea className="h-96 px-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <Card key={i} className="mb-3">
              <CardContent className="p-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Skeleton className="h-4 w-20" />
                    <Skeleton className="h-6 w-16" />
                  </div>
                  <Skeleton className="h-3 w-full" />
                  <Skeleton className="h-3 w-3/4" />
                </div>
              </CardContent>
            </Card>
          ))}
        </ScrollArea>
      </CardContent>
    </Card>
  );
}

export function LiveOrdersFeed({ orders, isLoading, onRefresh }: { 
  orders?: LiveOrder[]; 
  isLoading?: boolean; 
  onRefresh?: () => void; 
}) {
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = async () => {
    setRefreshing(true);
    onRefresh?.();
    setTimeout(() => setRefreshing(false), 1000);
  };

  if (isLoading) {
    return <LoadingFeed title="Live Orders" />;
  }

  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base flex items-center gap-2">
            <ShoppingCart className="h-4 w-4 text-blue-600" />
            Live Orders
            {orders && orders.length > 0 && (
              <Badge variant="secondary" className="ml-2">
                {orders.length}
              </Badge>
            )}
          </CardTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleRefresh}
            disabled={refreshing}
            className="h-8 w-8 p-0"
          >
            <RefreshCw className={`h-4 w-4 ${refreshing ? 'animate-spin' : ''}`} />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea className="h-96 px-4">
          {orders && orders.length > 0 ? (
            orders.map((order) => (
              <OrderCard key={order.id} order={order} />
            ))
          ) : (
            <div className="text-center py-8 text-gray-500">
              <ShoppingCart className="h-8 w-8 mx-auto mb-2 text-gray-300" />
              <p className="text-sm">No active orders</p>
            </div>
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  );
}

export function LiveReservationsFeed({ reservations, isLoading, onRefresh }: { 
  reservations?: LiveReservation[]; 
  isLoading?: boolean; 
  onRefresh?: () => void; 
}) {
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = async () => {
    setRefreshing(true);
    onRefresh?.();
    setTimeout(() => setRefreshing(false), 1000);
  };

  if (isLoading) {
    return <LoadingFeed title="Reservations" />;
  }

  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base flex items-center gap-2">
            <Calendar className="h-4 w-4 text-green-600" />
            Reservations
            {reservations && reservations.length > 0 && (
              <Badge variant="secondary" className="ml-2">
                {reservations.length}
              </Badge>
            )}
          </CardTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleRefresh}
            disabled={refreshing}
            className="h-8 w-8 p-0"
          >
            <RefreshCw className={`h-4 w-4 ${refreshing ? 'animate-spin' : ''}`} />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea className="h-96 px-4">
          {reservations && reservations.length > 0 ? (
            reservations.map((reservation) => (
              <ReservationCard key={reservation.id} reservation={reservation} />
            ))
          ) : (
            <div className="text-center py-8 text-gray-500">
              <Calendar className="h-8 w-8 mx-auto mb-2 text-gray-300" />
              <p className="text-sm">No upcoming reservations</p>
            </div>
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  );
}

export function LiveFeeds({ orders, reservations, isLoading, onRefresh }: LiveFeedsProps) {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <LiveOrdersFeed 
        orders={orders} 
        isLoading={isLoading} 
        onRefresh={onRefresh}
      />
      <LiveReservationsFeed 
        reservations={reservations} 
        isLoading={isLoading} 
        onRefresh={onRefresh}
      />
    </div>
  );
}

// Combined feed for mobile view
export function CombinedLiveFeed({ orders, reservations, isLoading, onRefresh }: LiveFeedsProps) {
  const [activeTab, setActiveTab] = useState<'orders' | 'reservations'>('orders');

  if (isLoading) {
    return <LoadingFeed title="Live Activity" />;
  }

  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex gap-2">
            <Button
              variant={activeTab === 'orders' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setActiveTab('orders')}
              className="text-xs"
            >
              <ShoppingCart className="h-3 w-3 mr-1" />
              Orders {orders?.length ? `(${orders.length})` : ''}
            </Button>
            <Button
              variant={activeTab === 'reservations' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setActiveTab('reservations')}
              className="text-xs"
            >
              <Calendar className="h-3 w-3 mr-1" />
              Reservations {reservations?.length ? `(${reservations.length})` : ''}
            </Button>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onRefresh}
            className="h-8 w-8 p-0"
          >
            <RefreshCw className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea className="h-96 px-4">
          {activeTab === 'orders' ? (
            orders && orders.length > 0 ? (
              orders.map((order) => (
                <OrderCard key={order.id} order={order} />
              ))
            ) : (
              <div className="text-center py-8 text-gray-500">
                <ShoppingCart className="h-8 w-8 mx-auto mb-2 text-gray-300" />
                <p className="text-sm">No active orders</p>
              </div>
            )
          ) : (
            reservations && reservations.length > 0 ? (
              reservations.map((reservation) => (
                <ReservationCard key={reservation.id} reservation={reservation} />
              ))
            ) : (
              <div className="text-center py-8 text-gray-500">
                <Calendar className="h-8 w-8 mx-auto mb-2 text-gray-300" />
                <p className="text-sm">No upcoming reservations</p>
              </div>
            )
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  );
}