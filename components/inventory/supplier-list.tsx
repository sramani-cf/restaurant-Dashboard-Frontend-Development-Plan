'use client';

import { useState, useEffect } from 'react';
import { Users, Phone, Mail, MapPin, Plus, Star, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { getSuppliers } from '@/lib/inventory/data';
import type { Supplier } from '@/lib/inventory/types';

interface SupplierListProps {
  onSelectSupplier?: (supplier: Supplier) => void;
  className?: string;
}

export function SupplierList({ onSelectSupplier, className }: SupplierListProps) {
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchSuppliers = async () => {
      try {
        const response = await getSuppliers();
        setSuppliers(response.data);
      } catch (error) {
        console.error('Failed to fetch suppliers:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSuppliers();
  }, []);

  const filteredSuppliers = suppliers.filter(supplier =>
    supplier.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    supplier.code?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getRatingStars = (rating?: number) => {
    if (!rating) return null;
    return (
      <div className="flex items-center">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`h-3 w-3 ${
              star <= rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
            }`}
          />
        ))}
        <span className="text-xs text-gray-500 ml-1">({rating}/5)</span>
      </div>
    );
  };

  if (loading) {
    return (
      <div className={`space-y-4 ${className}`}>
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-white p-6 rounded-lg border border-gray-200 animate-pulse">
            <div className="flex items-center space-x-4">
              <div className="h-12 w-12 bg-gray-200 rounded-full"></div>
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-gray-200 rounded w-1/3"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Users className="h-5 w-5 text-gray-400" />
          <h3 className="text-lg font-medium text-gray-900">Suppliers</h3>
          <Badge variant="secondary">{filteredSuppliers.length}</Badge>
        </div>
        <Button size="sm">
          <Plus className="h-4 w-4 mr-1" />
          Add Supplier
        </Button>
      </div>

      {/* Search */}
      <Input
        placeholder="Search suppliers..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {/* Suppliers List */}
      <div className="space-y-3">
        {filteredSuppliers.map((supplier) => (
          <div
            key={supplier.id}
            className="bg-white p-4 rounded-lg border border-gray-200 hover:border-blue-300 hover:shadow-sm transition-all cursor-pointer"
            onClick={() => onSelectSupplier?.(supplier)}
          >
            <div className="flex items-start space-x-4">
              {/* Avatar */}
              <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                <Users className="h-6 w-6 text-blue-600" />
              </div>

              {/* Supplier Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="text-sm font-medium text-gray-900 truncate">
                      {supplier.name}
                    </h4>
                    {supplier.code && (
                      <p className="text-xs text-gray-500 mt-1">Code: {supplier.code}</p>
                    )}
                  </div>

                  {/* Status and Rating */}
                  <div className="flex items-center space-x-2 ml-2">
                    {supplier.rating && getRatingStars(supplier.rating)}
                    <Badge 
                      variant={supplier.isActive ? 'secondary' : 'outline'}
                      className={supplier.isActive ? 'bg-green-100 text-green-800' : ''}
                    >
                      {supplier.isActive ? 'Active' : 'Inactive'}
                    </Badge>
                  </div>
                </div>

                {/* Contact Info */}
                <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
                  {supplier.email && (
                    <div className="flex items-center">
                      <Mail className="h-3 w-3 mr-1" />
                      <span className="truncate max-w-32">{supplier.email}</span>
                    </div>
                  )}
                  {supplier.phone && (
                    <div className="flex items-center">
                      <Phone className="h-3 w-3 mr-1" />
                      <span>{supplier.phone}</span>
                    </div>
                  )}
                  {supplier.address?.city && (
                    <div className="flex items-center">
                      <MapPin className="h-3 w-3 mr-1" />
                      <span>{supplier.address.city}, {supplier.address.state}</span>
                    </div>
                  )}
                </div>

                {/* Payment Terms */}
                <div className="flex items-center justify-between mt-3">
                  <div className="flex items-center space-x-4 text-xs">
                    {supplier.paymentTerms && (
                      <span className="text-gray-600">
                        Payment: {supplier.paymentTerms}
                      </span>
                    )}
                    {supplier.leadTimeDays && (
                      <span className="text-gray-600">
                        Lead Time: {supplier.leadTimeDays} days
                      </span>
                    )}
                    {supplier.minimumOrderValue && (
                      <span className="text-gray-600">
                        Min Order: ${supplier.minimumOrderValue}
                      </span>
                    )}
                  </div>

                  {/* Warnings */}
                  {supplier.leadTimeDays && supplier.leadTimeDays > 7 && (
                    <div className="flex items-center text-orange-600">
                      <AlertCircle className="h-3 w-3 mr-1" />
                      <span className="text-xs">Long lead time</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredSuppliers.length === 0 && !loading && (
        <div className="text-center py-8">
          <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-sm font-medium text-gray-900 mb-2">
            {searchTerm ? 'No suppliers found' : 'No suppliers yet'}
          </h3>
          <p className="text-sm text-gray-500 mb-4">
            {searchTerm 
              ? `No suppliers match "${searchTerm}"`
              : 'Get started by adding your first supplier.'
            }
          </p>
          {!searchTerm && (
            <Button size="sm">
              <Plus className="h-4 w-4 mr-1" />
              Add Supplier
            </Button>
          )}
        </div>
      )}
    </div>
  );
}