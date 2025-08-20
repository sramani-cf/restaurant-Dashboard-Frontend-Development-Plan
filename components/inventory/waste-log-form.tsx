'use client';

import { useState, useEffect } from 'react';
import { Save, X, Camera, AlertTriangle, Package } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { getInventoryItems, getWasteReasons, getLocations } from '@/lib/inventory/data';
import { createWasteLogAction } from '@/app/inventory/actions';
import type { InventoryItem, WasteReason, Location, CreateWasteLog } from '@/lib/inventory/types';

interface WasteLogFormProps {
  itemId?: string;
  onSubmit?: (wasteLog: any) => void;
  onCancel?: () => void;
  className?: string;
}

export function WasteLogForm({ itemId, onSubmit, onCancel, className }: WasteLogFormProps) {
  const [items, setItems] = useState<InventoryItem[]>([]);
  const [wasteReasons, setWasteReasons] = useState<WasteReason[]>([]);
  const [locations, setLocations] = useState<Location[]>([]);
  const [selectedItem, setSelectedItem] = useState<InventoryItem | null>(null);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const [formData, setFormData] = useState<Partial<CreateWasteLog>>({
    itemId: itemId || '',
    locationId: '',
    quantity: 0,
    reasonId: '',
    description: '',
    preventable: false,
    actionTaken: '',
    wasteDate: new Date(),
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  // Load reference data
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const [itemsResponse, reasonsData, locationsData] = await Promise.all([
          getInventoryItems(),
          getWasteReasons(),
          getLocations(),
        ]);
        
        setItems(itemsResponse.data);
        setWasteReasons(reasonsData);
        setLocations(locationsData);

        // Pre-select item if itemId provided
        if (itemId) {
          const item = itemsResponse.data.find(i => i.id === itemId);
          if (item) {
            setSelectedItem(item);
            setFormData(prev => ({
              ...prev,
              itemId: item.id,
              itemName: item.name,
              unitCost: item.costPrice,
            }));
          }
        }

        // Set default location
        if (locationsData.length > 0) {
          setFormData(prev => ({
            ...prev,
            locationId: locationsData[0].id,
          }));
        }
      } catch (error) {
        console.error('Failed to load data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [itemId]);

  // Update total cost when quantity or unit cost changes
  useEffect(() => {
    if (formData.quantity && formData.unitCost) {
      const totalCost = formData.quantity * formData.unitCost;
      setFormData(prev => ({ ...prev, totalCost }));
    }
  }, [formData.quantity, formData.unitCost]);

  const handleItemChange = (itemId: string) => {
    const item = items.find(i => i.id === itemId);
    if (item) {
      setSelectedItem(item);
      setFormData(prev => ({
        ...prev,
        itemId: item.id,
        itemName: item.name,
        unitCost: item.costPrice,
      }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.itemId) {
      newErrors.itemId = 'Please select an item';
    }
    if (!formData.locationId) {
      newErrors.locationId = 'Please select a location';
    }
    if (!formData.quantity || formData.quantity <= 0) {
      newErrors.quantity = 'Quantity must be greater than 0';
    }
    if (!formData.reasonId) {
      newErrors.reasonId = 'Please select a waste reason';
    }
    if (selectedItem && formData.quantity! > selectedItem.currentStock) {
      newErrors.quantity = 'Quantity cannot exceed current stock';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setSubmitting(true);
    try {
      const wasteReason = wasteReasons.find(r => r.id === formData.reasonId);
      
      const wasteLogData: CreateWasteLog = {
        ...formData,
        itemName: selectedItem!.name,
        reasonName: wasteReason!.name,
        unitCost: formData.unitCost || selectedItem!.costPrice,
        reportedBy: 'current-user-id', // In real app, get from session
      } as CreateWasteLog;

      const result = await createWasteLogAction(wasteLogData);
      
      if (result.success) {
        onSubmit?.(result.data);
      } else {
        setErrors({ submit: result.error });
      }
    } catch (error) {
      setErrors({ submit: 'Failed to log waste. Please try again.' });
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className={`bg-white rounded-lg border border-gray-200 p-6 ${className}`}>
        <div className="animate-pulse space-y-4">
          <div className="h-4 bg-gray-200 rounded w-1/3"></div>
          <div className="space-y-3">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-10 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={`bg-white rounded-lg border border-gray-200 p-6 space-y-6 ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-medium text-gray-900">Log Waste</h3>
          <p className="text-sm text-gray-500">Record wasted inventory items</p>
        </div>
        {onCancel && (
          <Button variant="ghost" size="sm" onClick={onCancel}>
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>

      {/* Error Banner */}
      {errors.submit && (
        <div className="bg-red-50 border border-red-200 rounded-md p-4">
          <div className="flex items-center">
            <AlertTriangle className="h-4 w-4 text-red-400 mr-2" />
            <span className="text-sm text-red-700">{errors.submit}</span>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left Column */}
        <div className="space-y-4">
          {/* Item Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Item <span className="text-red-500">*</span>
            </label>
            <select
              value={formData.itemId}
              onChange={(e) => handleItemChange(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              disabled={!!itemId}
            >
              <option value="">Select an item...</option>
              {items.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name} - Stock: {item.currentStock}
                </option>
              ))}
            </select>
            {errors.itemId && <p className="text-red-500 text-xs mt-1">{errors.itemId}</p>}
          </div>

          {/* Selected Item Info */}
          {selectedItem && (
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center space-x-3">
                <Package className="h-8 w-8 text-gray-400" />
                <div>
                  <h4 className="text-sm font-medium text-gray-900">{selectedItem.name}</h4>
                  <p className="text-xs text-gray-500">
                    Current Stock: {selectedItem.currentStock} | Cost: ${selectedItem.costPrice.toFixed(2)}
                  </p>
                  <div className="flex items-center space-x-2 mt-1">
                    {selectedItem.isPerishable && (
                      <Badge variant="secondary" className="text-xs">Perishable</Badge>
                    )}
                    {selectedItem.currentStock <= selectedItem.minimumStock && (
                      <Badge variant="secondary" className="bg-orange-100 text-orange-800 text-xs">
                        Low Stock
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Location */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Location <span className="text-red-500">*</span>
            </label>
            <select
              value={formData.locationId}
              onChange={(e) => setFormData(prev => ({ ...prev, locationId: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Select location...</option>
              {locations.map((location) => (
                <option key={location.id} value={location.id}>
                  {location.name}
                </option>
              ))}
            </select>
            {errors.locationId && <p className="text-red-500 text-xs mt-1">{errors.locationId}</p>}
          </div>

          {/* Quantity and Cost */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Quantity <span className="text-red-500">*</span>
              </label>
              <Input
                type="number"
                min="0"
                step="0.01"
                value={formData.quantity || ''}
                onChange={(e) => setFormData(prev => ({ 
                  ...prev, 
                  quantity: parseFloat(e.target.value) || 0 
                }))}
                placeholder="0.00"
              />
              {errors.quantity && <p className="text-red-500 text-xs mt-1">{errors.quantity}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Unit Cost
              </label>
              <Input
                type="number"
                min="0"
                step="0.01"
                value={formData.unitCost || ''}
                onChange={(e) => setFormData(prev => ({ 
                  ...prev, 
                  unitCost: parseFloat(e.target.value) || 0 
                }))}
                placeholder="0.00"
              />
            </div>
          </div>

          {/* Total Cost Display */}
          {formData.quantity && formData.unitCost && (
            <div className="bg-blue-50 rounded-lg p-3">
              <div className="text-sm font-medium text-blue-900">
                Total Waste Value: ${((formData.quantity || 0) * (formData.unitCost || 0)).toFixed(2)}
              </div>
            </div>
          )}
        </div>

        {/* Right Column */}
        <div className="space-y-4">
          {/* Waste Reason */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Reason <span className="text-red-500">*</span>
            </label>
            <select
              value={formData.reasonId}
              onChange={(e) => setFormData(prev => ({ ...prev, reasonId: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Select reason...</option>
              {wasteReasons.map((reason) => (
                <option key={reason.id} value={reason.id}>
                  {reason.name}
                </option>
              ))}
            </select>
            {errors.reasonId && <p className="text-red-500 text-xs mt-1">{errors.reasonId}</p>}
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              value={formData.description || ''}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              placeholder="Additional details about the waste..."
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Preventable Checkbox */}
          <div className="flex items-start">
            <input
              type="checkbox"
              id="preventable"
              checked={formData.preventable || false}
              onChange={(e) => setFormData(prev => ({ ...prev, preventable: e.target.checked }))}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 mt-1"
            />
            <label htmlFor="preventable" className="ml-2 text-sm text-gray-700">
              This waste was preventable
            </label>
          </div>

          {/* Action Taken */}
          {formData.preventable && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Action Taken
              </label>
              <Input
                value={formData.actionTaken || ''}
                onChange={(e) => setFormData(prev => ({ ...prev, actionTaken: e.target.value }))}
                placeholder="What steps were taken to prevent future waste?"
              />
            </div>
          )}

          {/* Waste Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Waste Date
            </label>
            <Input
              type="datetime-local"
              value={formData.wasteDate ? new Date(formData.wasteDate).toISOString().slice(0, 16) : ''}
              onChange={(e) => setFormData(prev => ({ 
                ...prev, 
                wasteDate: e.target.value ? new Date(e.target.value) : new Date() 
              }))}
            />
          </div>

          {/* Photo Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Photos (Optional)
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
              <Camera className="h-8 w-8 text-gray-400 mx-auto mb-2" />
              <p className="text-sm text-gray-500">
                Tap to add photos of the waste
              </p>
              <Button type="button" variant="outline" size="sm" className="mt-2">
                <Camera className="h-4 w-4 mr-1" />
                Add Photos
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-end space-x-3 pt-6 border-t border-gray-200">
        {onCancel && (
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
        )}
        <Button type="submit" disabled={submitting} className="min-w-24">
          {submitting ? (
            <div className="flex items-center">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              Saving...
            </div>
          ) : (
            <>
              <Save className="h-4 w-4 mr-1" />
              Log Waste
            </>
          )}
        </Button>
      </div>
    </form>
  );
}