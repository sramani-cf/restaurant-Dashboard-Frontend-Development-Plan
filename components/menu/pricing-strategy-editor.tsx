'use client';

import { useState, useCallback } from 'react';
import { 
  Plus, 
  Trash2, 
  Clock, 
  Calendar, 
  MapPin, 
  Target,
  DollarSign,
  ChevronDown,
  ChevronRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Card } from '@/components/ui/card';
import { PricingStrategy, Price } from '@/lib/menu/types';
import { formatPrice } from '@/lib/menu/utils';

interface PricingStrategyEditorProps {
  strategies: PricingStrategy[];
  onChange: (strategies: PricingStrategy[]) => void;
  className?: string;
}

export function PricingStrategyEditor({
  strategies,
  onChange,
  className,
}: PricingStrategyEditorProps) {
  const [expandedStrategies, setExpandedStrategies] = useState<string[]>([]);
  const [editingStrategy, setEditingStrategy] = useState<string | null>(null);

  // Toggle strategy expansion
  const toggleStrategy = useCallback((strategyId: string) => {
    setExpandedStrategies(prev => 
      prev.includes(strategyId) 
        ? prev.filter(id => id !== strategyId)
        : [...prev, strategyId]
    );
  }, []);

  // Add new pricing strategy
  const addStrategy = useCallback(() => {
    const newStrategy: PricingStrategy = {
      id: `temp-strategy-${Date.now()}`,
      name: 'New Pricing Strategy',
      type: 'time_based',
      priority: strategies.length,
      conditions: {},
      prices: [{
        id: `temp-price-${Date.now()}`,
        amount: 0,
        currency: 'USD',
      }],
    };
    
    onChange([...strategies, newStrategy]);
    setExpandedStrategies(prev => [...prev, newStrategy.id]);
    setEditingStrategy(newStrategy.id);
  }, [strategies, onChange]);

  // Update pricing strategy
  const updateStrategy = useCallback((strategyId: string, updates: Partial<PricingStrategy>) => {
    const updatedStrategies = strategies.map(strategy =>
      strategy.id === strategyId ? { ...strategy, ...updates } : strategy
    );
    onChange(updatedStrategies);
  }, [strategies, onChange]);

  // Delete pricing strategy
  const deleteStrategy = useCallback((strategyId: string) => {
    if (window.confirm('Are you sure you want to delete this pricing strategy?')) {
      onChange(strategies.filter(strategy => strategy.id !== strategyId));
      setExpandedStrategies(prev => prev.filter(id => id !== strategyId));
    }
  }, [strategies, onChange]);

  // Update price within a strategy
  const updatePrice = useCallback((strategyId: string, priceId: string, updates: Partial<Price>) => {
    const strategy = strategies.find(s => s.id === strategyId);
    if (!strategy) return;

    const updatedPrices = strategy.prices.map(price =>
      price.id === priceId ? { ...price, ...updates } : price
    );

    updateStrategy(strategyId, { prices: updatedPrices });
  }, [strategies, updateStrategy]);

  // Add price to strategy
  const addPrice = useCallback((strategyId: string) => {
    const strategy = strategies.find(s => s.id === strategyId);
    if (!strategy) return;

    const newPrice: Price = {
      id: `temp-price-${Date.now()}`,
      amount: 0,
      currency: 'USD',
    };

    updateStrategy(strategyId, {
      prices: [...strategy.prices, newPrice],
    });
  }, [strategies, updateStrategy]);

  // Delete price from strategy
  const deletePrice = useCallback((strategyId: string, priceId: string) => {
    const strategy = strategies.find(s => s.id === strategyId);
    if (!strategy || strategy.prices.length <= 1) return; // Keep at least one price

    updateStrategy(strategyId, {
      prices: strategy.prices.filter(price => price.id !== priceId),
    });
  }, [strategies, updateStrategy]);

  // Update strategy conditions based on type
  const updateConditions = useCallback((strategyId: string, field: string, value: any) => {
    const strategy = strategies.find(s => s.id === strategyId);
    if (!strategy) return;

    const newConditions = { ...strategy.conditions, [field]: value };
    updateStrategy(strategyId, { conditions: newConditions });
  }, [strategies, updateStrategy]);

  // Get strategy type icon
  const getStrategyIcon = (type: string) => {
    switch (type) {
      case 'time_based':
        return <Clock className="h-4 w-4" />;
      case 'day_of_week':
        return <Calendar className="h-4 w-4" />;
      case 'location_based':
        return <MapPin className="h-4 w-4" />;
      case 'menu_specific':
        return <Target className="h-4 w-4" />;
      default:
        return <DollarSign className="h-4 w-4" />;
    }
  };

  // Render conditions based on strategy type
  const renderConditions = (strategy: PricingStrategy) => {
    switch (strategy.type) {
      case 'time_based':
        return (
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium mb-1">Start Time</label>
              <Input
                type="time"
                value={strategy.conditions?.startTime || ''}
                onChange={(e) => updateConditions(strategy.id, 'startTime', e.target.value)}
                className="h-8 text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">End Time</label>
              <Input
                type="time"
                value={strategy.conditions?.endTime || ''}
                onChange={(e) => updateConditions(strategy.id, 'endTime', e.target.value)}
                className="h-8 text-sm"
              />
            </div>
          </div>
        );

      case 'day_of_week':
        return (
          <div>
            <label className="block text-sm font-medium mb-2">Days of Week</label>
            <div className="grid grid-cols-4 gap-2">
              {['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].map((day, index) => (
                <div key={day} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id={`${strategy.id}-day-${index}`}
                    checked={strategy.conditions?.daysOfWeek?.includes(index) || false}
                    onChange={(e) => {
                      const currentDays = strategy.conditions?.daysOfWeek || [];
                      const newDays = e.target.checked
                        ? [...currentDays, index]
                        : currentDays.filter(d => d !== index);
                      updateConditions(strategy.id, 'daysOfWeek', newDays);
                    }}
                    className="rounded text-xs"
                  />
                  <label htmlFor={`${strategy.id}-day-${index}`} className="text-xs">
                    {day.slice(0, 3)}
                  </label>
                </div>
              ))}
            </div>
          </div>
        );

      case 'location_based':
        return (
          <div>
            <label className="block text-sm font-medium mb-1">Location IDs</label>
            <Input
              value={strategy.conditions?.locationIds?.join(', ') || ''}
              onChange={(e) => {
                const locations = e.target.value.split(',').map(id => id.trim()).filter(Boolean);
                updateConditions(strategy.id, 'locationIds', locations);
              }}
              placeholder="Enter location IDs separated by commas"
              className="h-8 text-sm"
            />
          </div>
        );

      case 'menu_specific':
        return (
          <div>
            <label className="block text-sm font-medium mb-1">Channel ID</label>
            <select
              value={strategy.conditions?.channelId || ''}
              onChange={(e) => updateConditions(strategy.id, 'channelId', e.target.value)}
              className="w-full h-8 px-2 text-sm border border-gray-300 rounded-md"
            >
              <option value="">Select channel</option>
              <option value="dine-in">Dine In</option>
              <option value="takeout">Takeout</option>
              <option value="delivery">Delivery</option>
              <option value="online">Online</option>
            </select>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className={className}>
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-sm font-semibold">Pricing Strategies</h3>
          <p className="text-xs text-gray-500">Different prices for different conditions</p>
        </div>
        <Button size="sm" onClick={addStrategy}>
          <Plus className="h-3 w-3 mr-1" />
          Add Strategy
        </Button>
      </div>

      {strategies.length === 0 ? (
        <div className="text-center py-6 text-gray-500 border border-dashed border-gray-300 rounded-lg">
          <p className="text-sm mb-2">No pricing strategies configured</p>
          <p className="text-xs text-gray-400 mb-3">Add strategies for time-based, location-based, or channel-specific pricing</p>
          <Button size="sm" variant="outline" onClick={addStrategy}>
            <Plus className="h-3 w-3 mr-1" />
            Add Strategy
          </Button>
        </div>
      ) : (
        <div className="space-y-3">
          {strategies.map((strategy, index) => (
            <Card key={strategy.id} className="p-3">
              {/* Strategy Header */}
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2 flex-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-5 w-5 p-0"
                    onClick={() => toggleStrategy(strategy.id)}
                  >
                    {expandedStrategies.includes(strategy.id) ? (
                      <ChevronDown className="h-3 w-3" />
                    ) : (
                      <ChevronRight className="h-3 w-3" />
                    )}
                  </Button>
                  
                  <div className="flex items-center space-x-2">
                    {getStrategyIcon(strategy.type)}
                    
                    {editingStrategy === strategy.id ? (
                      <Input
                        value={strategy.name}
                        onChange={(e) => updateStrategy(strategy.id, { name: e.target.value })}
                        onBlur={() => setEditingStrategy(null)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') setEditingStrategy(null);
                        }}
                        className="h-6 text-sm font-medium"
                        autoFocus
                      />
                    ) : (
                      <span 
                        className="text-sm font-medium cursor-pointer hover:text-blue-600"
                        onClick={() => setEditingStrategy(strategy.id)}
                      >
                        {strategy.name}
                      </span>
                    )}
                  </div>
                  
                  <Badge variant="secondary" className="text-xs">
                    Priority: {strategy.priority}
                  </Badge>
                  
                  <Badge variant="outline" className="text-xs capitalize">
                    {strategy.type.replace('_', ' ')}
                  </Badge>
                </div>
                
                <div className="flex items-center space-x-1">
                  <div className="text-sm font-medium">
                    {formatPrice(strategy.prices[0]?.amount || 0)}
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-6 w-6 p-0"
                    onClick={() => deleteStrategy(strategy.id)}
                  >
                    <Trash2 className="h-3 w-3 text-red-600" />
                  </Button>
                </div>
              </div>

              {/* Strategy Details (when expanded) */}
              {expandedStrategies.includes(strategy.id) && (
                <div className="space-y-4 border-t pt-3">
                  {/* Strategy Settings */}
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-sm font-medium mb-1">Strategy Type</label>
                      <select
                        value={strategy.type}
                        onChange={(e) => updateStrategy(strategy.id, { 
                          type: e.target.value as any,
                          conditions: {} // Reset conditions when type changes
                        })}
                        className="w-full h-8 px-2 text-sm border border-gray-300 rounded-md"
                      >
                        <option value="base">Base Price</option>
                        <option value="time_based">Time Based</option>
                        <option value="day_of_week">Day of Week</option>
                        <option value="location_based">Location Based</option>
                        <option value="menu_specific">Menu/Channel Specific</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-1">Priority</label>
                      <Input
                        type="number"
                        min="0"
                        value={strategy.priority}
                        onChange={(e) => updateStrategy(strategy.id, { priority: parseInt(e.target.value) || 0 })}
                        className="h-8 text-sm"
                      />
                    </div>
                  </div>

                  {/* Conditions */}
                  {strategy.type !== 'base' && (
                    <div>
                      <h5 className="text-sm font-medium mb-2">Conditions</h5>
                      {renderConditions(strategy)}
                    </div>
                  )}

                  {/* Prices */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <h5 className="text-sm font-medium">Prices</h5>
                      <Button size="sm" onClick={() => addPrice(strategy.id)}>
                        <Plus className="h-3 w-3 mr-1" />
                        Add Price
                      </Button>
                    </div>
                    
                    <div className="space-y-2">
                      {strategy.prices.map((price, priceIndex) => (
                        <div
                          key={price.id}
                          className="flex items-center space-x-3 p-2 bg-gray-50 rounded border"
                        >
                          <div className="flex-1 grid grid-cols-4 gap-2">
                            <div className="relative">
                              <span className="absolute left-2 top-1/2 transform -translate-y-1/2 text-xs text-gray-500">$</span>
                              <Input
                                type="number"
                                step="0.01"
                                min="0"
                                value={price.amount}
                                onChange={(e) => updatePrice(strategy.id, price.id, { amount: parseFloat(e.target.value) || 0 })}
                                className="h-7 text-sm pl-6"
                                placeholder="0.00"
                              />
                            </div>
                            
                            <Input
                              type="date"
                              value={price.validFrom ? price.validFrom.toISOString().split('T')[0] : ''}
                              onChange={(e) => updatePrice(strategy.id, price.id, { 
                                validFrom: e.target.value ? new Date(e.target.value) : undefined 
                              })}
                              className="h-7 text-sm"
                              placeholder="Valid from"
                            />
                            
                            <Input
                              type="date"
                              value={price.validTo ? price.validTo.toISOString().split('T')[0] : ''}
                              onChange={(e) => updatePrice(strategy.id, price.id, { 
                                validTo: e.target.value ? new Date(e.target.value) : undefined 
                              })}
                              className="h-7 text-sm"
                              placeholder="Valid to"
                            />
                            
                            <select
                              value={price.currency}
                              onChange={(e) => updatePrice(strategy.id, price.id, { currency: e.target.value })}
                              className="h-7 px-2 text-sm border border-gray-300 rounded-md"
                            >
                              <option value="USD">USD</option>
                              <option value="EUR">EUR</option>
                              <option value="GBP">GBP</option>
                            </select>
                          </div>
                          
                          {strategy.prices.length > 1 && (
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-7 w-7 p-0"
                              onClick={() => deletePrice(strategy.id, price.id)}
                            >
                              <Trash2 className="h-3 w-3 text-red-600" />
                            </Button>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}