'use client';

import { useState } from 'react';
import { MenuItem, SelectedModifier, ModifierOption } from '@/lib/pos/types';
import { X, Check, AlertCircle } from 'lucide-react';

interface ModifierModalProps {
  menuItem: MenuItem;
  onClose: () => void;
  onConfirm: (modifiers: SelectedModifier[]) => void;
}

export function ModifierModal({ menuItem, onClose, onConfirm }: ModifierModalProps) {
  const [selectedModifiers, setSelectedModifiers] = useState<Map<string, ModifierOption[]>>(new Map());
  const [specialInstructions, setSpecialInstructions] = useState('');

  const handleOptionToggle = (modifierId: string, option: ModifierOption, isRequired: boolean, min?: number, max?: number) => {
    const current = selectedModifiers.get(modifierId) || [];
    const exists = current.find(o => o.id === option.id);
    
    let updated: ModifierOption[];
    if (exists) {
      updated = current.filter(o => o.id !== option.id);
    } else {
      if (max === 1) {
        // Single selection - replace any existing
        updated = [option];
      } else if (max && current.length >= max) {
        // Max reached - don't add
        return;
      } else {
        updated = [...current, option];
      }
    }
    
    const newMap = new Map(selectedModifiers);
    if (updated.length === 0) {
      newMap.delete(modifierId);
    } else {
      newMap.set(modifierId, updated);
    }
    setSelectedModifiers(newMap);
  };

  const isOptionSelected = (modifierId: string, optionId: string) => {
    const selected = selectedModifiers.get(modifierId) || [];
    return selected.some(o => o.id === optionId);
  };

  const isValidSelection = () => {
    if (!menuItem.modifiers) return true;
    
    for (const modifier of menuItem.modifiers) {
      if (modifier.type === 'required') {
        const selected = selectedModifiers.get(modifier.id) || [];
        const min = modifier.minSelections || 1;
        if (selected.length < min) {
          return false;
        }
      }
    }
    return true;
  };

  const calculateTotalPrice = () => {
    let total = menuItem.price;
    
    selectedModifiers.forEach((options, modifierId) => {
      options.forEach(option => {
        total += option.price;
      });
    });
    
    return total;
  };

  const handleConfirm = () => {
    if (!isValidSelection()) {
      alert('Please make all required selections');
      return;
    }

    const modifiers: SelectedModifier[] = [];
    selectedModifiers.forEach((options, modifierId) => {
      const modifier = menuItem.modifiers?.find(m => m.id === modifierId);
      if (modifier) {
        modifiers.push({
          modifierId,
          modifierName: modifier.name,
          selectedOptions: options,
          totalPrice: options.reduce((sum, opt) => sum + opt.price, 0)
        });
      }
    });

    onConfirm(modifiers);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-gray-800 rounded-xl w-full max-w-2xl max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-700">
          <div>
            <h2 className="text-xl font-semibold text-white">{menuItem.name}</h2>
            <p className="text-gray-400 text-sm mt-1">{menuItem.description}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
          >
            <X className="h-5 w-5 text-gray-400" />
          </button>
        </div>

        {/* Modifiers */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {menuItem.modifiers?.map((modifier) => {
            const selected = selectedModifiers.get(modifier.id) || [];
            const min = modifier.minSelections || 0;
            const max = modifier.maxSelections || modifier.options?.length || 999;
            
            return (
              <div key={modifier.id} className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium text-white">
                    {modifier.name}
                    {modifier.type === 'required' && (
                      <span className="ml-2 text-xs text-red-400">Required</span>
                    )}
                  </h3>
                  {(min > 0 || max < 999) && (
                    <span className="text-sm text-gray-400">
                      {min > 0 && max === 1 ? 'Select 1' :
                       min > 0 && max > 1 ? `Select ${min}-${max}` :
                       max === 1 ? 'Select up to 1' :
                       `Select up to ${max}`}
                    </span>
                  )}
                </div>
                
                <div className="space-y-2">
                  {modifier.options?.map((option) => (
                    <button
                      key={option.id}
                      onClick={() => handleOptionToggle(modifier.id, option, modifier.type === 'required', min, max)}
                      disabled={!option.available}
                      className={`w-full flex items-center justify-between p-3 rounded-lg transition-all ${
                        isOptionSelected(modifier.id, option.id)
                          ? 'bg-primary/20 border-2 border-primary'
                          : 'bg-gray-700 hover:bg-gray-600 border-2 border-transparent'
                      } ${!option.available ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                          isOptionSelected(modifier.id, option.id)
                            ? 'border-primary bg-primary'
                            : 'border-gray-400'
                        }`}>
                          {isOptionSelected(modifier.id, option.id) && (
                            <Check className="h-3 w-3 text-white" />
                          )}
                        </div>
                        <span className="text-white">{option.name}</span>
                        {!option.available && (
                          <span className="text-xs text-red-400">Unavailable</span>
                        )}
                      </div>
                      {option.price > 0 && (
                        <span className="text-green-400">+${option.price.toFixed(2)}</span>
                      )}
                    </button>
                  ))}
                </div>
                
                {modifier.type === 'required' && selected.length < min && (
                  <div className="flex items-center gap-2 text-yellow-400 text-sm">
                    <AlertCircle className="h-4 w-4" />
                    <span>Please make a selection</span>
                  </div>
                )}
              </div>
            );
          })}

          {/* Special Instructions */}
          <div className="space-y-3">
            <h3 className="font-medium text-white">Special Instructions</h3>
            <textarea
              value={specialInstructions}
              onChange={(e) => setSpecialInstructions(e.target.value)}
              placeholder="Add any special requests or dietary needs..."
              className="w-full bg-gray-700 text-white p-3 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-primary"
              rows={3}
            />
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-gray-700 p-6">
          <div className="flex items-center justify-between mb-4">
            <span className="text-gray-400">Item Total</span>
            <span className="text-2xl font-bold text-green-400">
              ${calculateTotalPrice().toFixed(2)}
            </span>
          </div>
          
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 bg-gray-700 hover:bg-gray-600 text-white py-3 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleConfirm}
              disabled={!isValidSelection()}
              className="flex-1 bg-green-600 hover:bg-green-500 disabled:bg-gray-700 disabled:text-gray-500 text-white py-3 rounded-lg transition-colors font-semibold"
            >
              Add to Cart - ${calculateTotalPrice().toFixed(2)}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}