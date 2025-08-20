'use client';

import { useState } from 'react';
import { Discount } from '@/lib/pos/types';
import { X, Percent, DollarSign, Tag, Gift } from 'lucide-react';

interface DiscountModalProps {
  onClose: () => void;
  onApplyDiscount: (discount: Discount) => void;
  currentSubtotal: number;
}

export function DiscountModal({ onClose, onApplyDiscount, currentSubtotal }: DiscountModalProps) {
  const [discountType, setDiscountType] = useState<'percentage' | 'fixed'>('percentage');
  const [discountValue, setDiscountValue] = useState('');
  const [promoCode, setPromoCode] = useState('');
  const [selectedPreset, setSelectedPreset] = useState<number | null>(null);

  const presetDiscounts = [
    { label: '5%', type: 'percentage' as const, value: 5 },
    { label: '10%', type: 'percentage' as const, value: 10 },
    { label: '15%', type: 'percentage' as const, value: 15 },
    { label: '20%', type: 'percentage' as const, value: 20 },
    { label: '$5 Off', type: 'fixed' as const, value: 5 },
    { label: '$10 Off', type: 'fixed' as const, value: 10 }
  ];

  const promoCodes = [
    { code: 'WELCOME10', type: 'percentage' as const, value: 10, description: 'New customer discount' },
    { code: 'LUNCH15', type: 'percentage' as const, value: 15, description: 'Lunch special' },
    { code: 'BIRTHDAY', type: 'fixed' as const, value: 20, description: 'Birthday celebration' }
  ];

  const handlePresetDiscount = (preset: typeof presetDiscounts[0]) => {
    setDiscountType(preset.type);
    setDiscountValue(preset.value.toString());
    setSelectedPreset(preset.value);
    setPromoCode('');
  };

  const handlePromoCode = () => {
    const promo = promoCodes.find(p => p.code === promoCode.toUpperCase());
    if (promo) {
      setDiscountType(promo.type);
      setDiscountValue(promo.value.toString());
      setSelectedPreset(null);
    } else {
      alert('Invalid promo code');
    }
  };

  const calculateDiscountAmount = () => {
    const value = parseFloat(discountValue) || 0;
    if (discountType === 'percentage') {
      return Math.min(currentSubtotal, currentSubtotal * (value / 100));
    } else {
      return Math.min(currentSubtotal, value);
    }
  };

  const handleApply = () => {
    const value = parseFloat(discountValue);
    if (!value || value <= 0) {
      alert('Please enter a valid discount amount');
      return;
    }

    const discount: Discount = {
      id: `disc-${Date.now()}`,
      type: discountType,
      value,
      code: promoCode || undefined,
      description: promoCode ? 
        promoCodes.find(p => p.code === promoCode)?.description : 
        `${discountType === 'percentage' ? `${value}%` : `$${value}`} discount`,
      appliedAmount: calculateDiscountAmount()
    };

    onApplyDiscount(discount);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-gray-800 rounded-xl w-full max-w-lg">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-700">
          <h2 className="text-xl font-semibold text-white">Apply Discount</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
          >
            <X className="h-5 w-5 text-gray-400" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Preset Discounts */}
          <div>
            <h3 className="text-sm font-medium text-gray-400 mb-3">Quick Discounts</h3>
            <div className="grid grid-cols-3 gap-2">
              {presetDiscounts.map((preset, index) => (
                <button
                  key={index}
                  onClick={() => handlePresetDiscount(preset)}
                  className={`py-2 px-3 rounded-lg font-medium transition-colors ${
                    selectedPreset === preset.value && discountType === preset.type
                      ? 'bg-primary text-white'
                      : 'bg-gray-700 hover:bg-gray-600 text-gray-300'
                  }`}
                >
                  {preset.label}
                </button>
              ))}
            </div>
          </div>

          {/* Promo Code */}
          <div>
            <h3 className="text-sm font-medium text-gray-400 mb-3">Promo Code</h3>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Tag className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                <input
                  type="text"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  placeholder="Enter promo code"
                  className="w-full bg-gray-700 text-white pl-10 pr-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary uppercase"
                />
              </div>
              <button
                onClick={handlePromoCode}
                className="px-4 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors"
              >
                Apply
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Try: WELCOME10, LUNCH15, BIRTHDAY
            </p>
          </div>

          {/* Custom Discount */}
          <div>
            <h3 className="text-sm font-medium text-gray-400 mb-3">Custom Discount</h3>
            <div className="flex gap-2 mb-3">
              <button
                onClick={() => setDiscountType('percentage')}
                className={`flex-1 py-2 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 ${
                  discountType === 'percentage'
                    ? 'bg-primary text-white'
                    : 'bg-gray-700 hover:bg-gray-600 text-gray-300'
                }`}
              >
                <Percent className="h-4 w-4" />
                Percentage
              </button>
              <button
                onClick={() => setDiscountType('fixed')}
                className={`flex-1 py-2 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 ${
                  discountType === 'fixed'
                    ? 'bg-primary text-white'
                    : 'bg-gray-700 hover:bg-gray-600 text-gray-300'
                }`}
              >
                <DollarSign className="h-4 w-4" />
                Fixed Amount
              </button>
            </div>
            
            <div className="relative">
              {discountType === 'percentage' ? (
                <Percent className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
              ) : (
                <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
              )}
              <input
                type="number"
                step={discountType === 'percentage' ? '1' : '0.01'}
                value={discountValue}
                onChange={(e) => {
                  setDiscountValue(e.target.value);
                  setSelectedPreset(null);
                  setPromoCode('');
                }}
                placeholder={discountType === 'percentage' ? 'Enter percentage' : 'Enter amount'}
                className="w-full bg-gray-700 text-white pl-10 pr-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>

          {/* Discount Preview */}
          {discountValue && (
            <div className="p-4 bg-gray-700 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-400">Current Subtotal</span>
                <span className="text-white">${currentSubtotal.toFixed(2)}</span>
              </div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-green-400">Discount Amount</span>
                <span className="text-green-400">-${calculateDiscountAmount().toFixed(2)}</span>
              </div>
              <div className="flex items-center justify-between pt-2 border-t border-gray-600">
                <span className="font-medium text-white">After Discount</span>
                <span className="font-medium text-white">
                  ${(currentSubtotal - calculateDiscountAmount()).toFixed(2)}
                </span>
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 bg-gray-700 hover:bg-gray-600 text-white py-2 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleApply}
              disabled={!discountValue || parseFloat(discountValue) <= 0}
              className="flex-1 bg-green-600 hover:bg-green-500 disabled:bg-gray-700 disabled:text-gray-500 text-white py-2 rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              <Gift className="h-4 w-4" />
              Apply Discount
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}