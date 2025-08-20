'use client';

import { useState } from 'react';
import { Cart, PaymentMethod, Tip } from '@/lib/pos/types';
import { mockPaymentMethods, processPayment, defaultPOSConfig } from '@/lib/pos/data';
import { 
  ArrowLeft,
  CreditCard,
  Banknote,
  Smartphone,
  Gift,
  Award,
  DollarSign,
  Check,
  Loader2
} from 'lucide-react';

interface PaymentScreenProps {
  cart: Cart;
  onBack: () => void;
  onComplete: (transaction: any) => void;
  onSetTip: (tip: Tip) => void;
}

export function PaymentScreen({
  cart,
  onBack,
  onComplete,
  onSetTip
}: PaymentScreenProps) {
  const [selectedPayment, setSelectedPayment] = useState<PaymentMethod | null>(null);
  const [tipAmount, setTipAmount] = useState(0);
  const [customTip, setCustomTip] = useState('');
  const [cashTendered, setCashTendered] = useState('');
  const [processing, setProcessing] = useState(false);
  const [splitPayment, setSplitPayment] = useState(false);

  const tipPercentages = defaultPOSConfig.tipSuggestions;

  const handleTipPercentage = (percentage: number) => {
    const amount = (cart.subtotal - (cart.discount?.appliedAmount || 0)) * (percentage / 100);
    setTipAmount(amount);
    setCustomTip('');
    onSetTip({ type: 'percentage', value: percentage, amount });
  };

  const handleCustomTip = (value: string) => {
    const amount = parseFloat(value) || 0;
    setCustomTip(value);
    setTipAmount(amount);
    onSetTip({ type: 'fixed', value: amount, amount });
  };

  const handleQuickCash = (amount: number) => {
    setCashTendered(amount.toString());
  };

  const calculateChange = () => {
    const tendered = parseFloat(cashTendered) || 0;
    return Math.max(0, tendered - cart.total);
  };

  const handleProcessPayment = async () => {
    if (!selectedPayment) return;

    setProcessing(true);
    
    try {
      const transaction = await processPayment(cart, selectedPayment, cart.total);
      
      if (transaction.success) {
        onComplete(transaction);
      }
    } catch (error) {
      console.error('Payment failed:', error);
    } finally {
      setProcessing(false);
    }
  };

  const getPaymentIcon = (type: string) => {
    switch (type) {
      case 'cash': return Banknote;
      case 'card': return CreditCard;
      case 'mobile': return Smartphone;
      case 'gift_card': return Gift;
      case 'loyalty': return Award;
      default: return DollarSign;
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex">
      {/* Left Side - Payment Options */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="bg-gray-800 border-b border-gray-700 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={onBack}
                className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
              >
                <ArrowLeft className="h-5 w-5" />
              </button>
              <h1 className="text-xl font-bold">Payment</h1>
            </div>
            <div className="text-2xl font-bold text-green-400">
              Total: ${cart.total.toFixed(2)}
            </div>
          </div>
        </div>

        <div className="flex-1 p-6 space-y-6">
          {/* Tip Selection */}
          <div>
            <h2 className="text-lg font-semibold mb-4">Add Tip</h2>
            <div className="grid grid-cols-5 gap-3">
              <button
                onClick={() => {
                  setTipAmount(0);
                  setCustomTip('');
                  onSetTip({ type: 'fixed', value: 0, amount: 0 });
                }}
                className={`py-3 rounded-lg font-medium transition-colors ${
                  tipAmount === 0 && !customTip
                    ? 'bg-primary text-white'
                    : 'bg-gray-800 hover:bg-gray-700'
                }`}
              >
                No Tip
              </button>
              {tipPercentages.map((percentage) => (
                <button
                  key={percentage}
                  onClick={() => handleTipPercentage(percentage)}
                  className={`py-3 rounded-lg font-medium transition-colors ${
                    !customTip && tipAmount === (cart.subtotal - (cart.discount?.appliedAmount || 0)) * (percentage / 100)
                      ? 'bg-primary text-white'
                      : 'bg-gray-800 hover:bg-gray-700'
                  }`}
                >
                  {percentage}%
                </button>
              ))}
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                <input
                  type="number"
                  step="0.01"
                  placeholder="Custom"
                  value={customTip}
                  onChange={(e) => handleCustomTip(e.target.value)}
                  className="w-full h-full bg-gray-800 text-white pl-10 pr-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>
            {tipAmount > 0 && (
              <p className="mt-2 text-sm text-gray-400">
                Tip amount: ${tipAmount.toFixed(2)}
              </p>
            )}
          </div>

          {/* Payment Methods */}
          <div>
            <h2 className="text-lg font-semibold mb-4">Payment Method</h2>
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
              {mockPaymentMethods.map((method) => {
                const Icon = getPaymentIcon(method.type);
                return (
                  <button
                    key={method.id}
                    onClick={() => setSelectedPayment(method)}
                    className={`p-6 rounded-lg border-2 transition-all ${
                      selectedPayment?.id === method.id
                        ? 'border-primary bg-primary/10'
                        : 'border-gray-700 hover:border-gray-600 bg-gray-800'
                    }`}
                  >
                    <Icon className="h-8 w-8 mx-auto mb-3" />
                    <p className="font-medium">{method.name}</p>
                    {method.processingFee && (
                      <p className="text-xs text-gray-400 mt-1">
                        Fee: {(method.processingFee * 100).toFixed(1)}%
                      </p>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Cash Payment Options */}
          {selectedPayment?.type === 'cash' && (
            <div>
              <h2 className="text-lg font-semibold mb-4">Cash Tendered</h2>
              <div className="grid grid-cols-4 gap-3 mb-4">
                {[20, 50, 100, Math.ceil(cart.total)].map((amount) => (
                  <button
                    key={amount}
                    onClick={() => handleQuickCash(amount)}
                    className="py-3 bg-gray-800 hover:bg-gray-700 rounded-lg font-medium transition-colors"
                  >
                    ${amount}
                  </button>
                ))}
              </div>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500" />
                <input
                  type="number"
                  step="0.01"
                  placeholder="Enter cash amount"
                  value={cashTendered}
                  onChange={(e) => setCashTendered(e.target.value)}
                  className="w-full bg-gray-800 text-white pl-10 pr-4 py-4 rounded-lg text-xl focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              {parseFloat(cashTendered) > 0 && (
                <div className="mt-4 p-4 bg-gray-800 rounded-lg">
                  <div className="flex justify-between text-lg">
                    <span>Change Due:</span>
                    <span className="font-bold text-yellow-400">
                      ${calculateChange().toFixed(2)}
                    </span>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Split Payment Option */}
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="split-payment"
              checked={splitPayment}
              onChange={(e) => setSplitPayment(e.target.checked)}
              className="w-5 h-5 rounded text-primary focus:ring-primary"
            />
            <label htmlFor="split-payment" className="text-gray-300">
              Split Payment
            </label>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="bg-gray-800 border-t border-gray-700 p-6">
          <button
            onClick={handleProcessPayment}
            disabled={!selectedPayment || processing || (selectedPayment.type === 'cash' && parseFloat(cashTendered) < cart.total)}
            className="w-full bg-green-600 hover:bg-green-500 disabled:bg-gray-700 disabled:text-gray-500 text-white font-semibold py-4 rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            {processing ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                Processing...
              </>
            ) : (
              <>
                <Check className="h-5 w-5" />
                Complete Payment ${cart.total.toFixed(2)}
              </>
            )}
          </button>
        </div>
      </div>

      {/* Right Side - Order Summary */}
      <div className="w-96 bg-gray-800 border-l border-gray-700 p-6">
        <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
        
        <div className="space-y-3 mb-6">
          {cart.items.map((item) => (
            <div key={item.id} className="flex justify-between text-sm">
              <div>
                <span className="text-gray-400">{item.quantity}x</span> {item.menuItem.name}
              </div>
              <span>${item.subtotal.toFixed(2)}</span>
            </div>
          ))}
        </div>
        
        <div className="border-t border-gray-700 pt-4 space-y-2">
          <div className="flex justify-between">
            <span className="text-gray-400">Subtotal</span>
            <span>${cart.subtotal.toFixed(2)}</span>
          </div>
          
          {cart.discount && (
            <div className="flex justify-between">
              <span className="text-green-400">Discount</span>
              <span className="text-green-400">
                -${cart.discount.appliedAmount?.toFixed(2)}
              </span>
            </div>
          )}
          
          <div className="flex justify-between">
            <span className="text-gray-400">Tax</span>
            <span>${cart.tax.toFixed(2)}</span>
          </div>
          
          {tipAmount > 0 && (
            <div className="flex justify-between">
              <span className="text-gray-400">Tip</span>
              <span>${tipAmount.toFixed(2)}</span>
            </div>
          )}
          
          <div className="flex justify-between text-xl font-bold pt-4 border-t border-gray-600">
            <span>Total</span>
            <span className="text-green-400">${cart.total.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}