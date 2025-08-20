'use client';

import { useState } from 'react';
import { PaymentMethod, PaymentStatus } from '@/lib/orders/types';
import { Modal } from '@/components/ui/modal';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  CreditCard, 
  DollarSign, 
  Smartphone,
  Gift,
  Receipt,
  Check,
  Calculator,
  AlertCircle
} from 'lucide-react';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  orderTotal: number;
  onPaymentComplete: (payment: {
    method: PaymentMethod;
    amount: number;
    tip: number;
    transactionId: string;
  }) => void;
}

export function PaymentModal({
  isOpen,
  onClose,
  orderTotal,
  onPaymentComplete
}: PaymentModalProps) {
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod | null>(null);
  const [tipAmount, setTipAmount] = useState(0);
  const [customAmount, setCustomAmount] = useState(orderTotal);
  const [processing, setProcessing] = useState(false);
  const [splitPayment, setSplitPayment] = useState(false);
  const [cardNumber, setCardNumber] = useState('');
  const [cardName, setCardName] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');

  const paymentMethods = [
    { id: PaymentMethod.CASH, label: 'Cash', icon: DollarSign },
    { id: PaymentMethod.CREDIT_CARD, label: 'Credit Card', icon: CreditCard },
    { id: PaymentMethod.DEBIT_CARD, label: 'Debit Card', icon: CreditCard },
    { id: PaymentMethod.DIGITAL_WALLET, label: 'Digital Wallet', icon: Smartphone },
    { id: PaymentMethod.GIFT_CARD, label: 'Gift Card', icon: Gift },
    { id: PaymentMethod.CHECK, label: 'Check', icon: Check },
  ];

  const tipPresets = [
    { label: '15%', amount: orderTotal * 0.15 },
    { label: '18%', amount: orderTotal * 0.18 },
    { label: '20%', amount: orderTotal * 0.20 },
    { label: '25%', amount: orderTotal * 0.25 },
  ];

  const totalWithTip = orderTotal + tipAmount;

  const handleTipPreset = (amount: number) => {
    setTipAmount(amount);
  };

  const handleCustomTip = (value: string) => {
    const amount = parseFloat(value) || 0;
    setTipAmount(amount);
  };

  const handleProcessPayment = async () => {
    if (!selectedMethod) return;

    setProcessing(true);
    
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));

    onPaymentComplete({
      method: selectedMethod,
      amount: totalWithTip,
      tip: tipAmount,
      transactionId: `TXN-${Date.now()}`
    });

    setProcessing(false);
    onClose();
  };

  const calculateChange = () => {
    if (selectedMethod === PaymentMethod.CASH) {
      return Math.max(0, customAmount - totalWithTip);
    }
    return 0;
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Process Payment"
      size="lg"
    >
      <div className="space-y-6">
        {/* Order Total */}
        <Card className="p-4 bg-primary/5">
          <div className="flex items-center justify-between mb-2">
            <span className="text-lg font-medium">Order Total</span>
            <span className="text-2xl font-bold">${orderTotal.toFixed(2)}</span>
          </div>
          {tipAmount > 0 && (
            <>
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <span>Tip</span>
                <span>+${tipAmount.toFixed(2)}</span>
              </div>
              <div className="flex items-center justify-between pt-2 mt-2 border-t">
                <span className="font-medium">Total with Tip</span>
                <span className="text-xl font-bold text-primary">
                  ${totalWithTip.toFixed(2)}
                </span>
              </div>
            </>
          )}
        </Card>

        {/* Payment Method Selection */}
        <div>
          <h3 className="font-medium mb-3">Select Payment Method</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {paymentMethods.map(method => {
              const Icon = method.icon;
              return (
                <button
                  key={method.id}
                  onClick={() => setSelectedMethod(method.id)}
                  className={`p-3 border rounded-lg transition-all ${
                    selectedMethod === method.id
                      ? 'border-primary bg-primary/10'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <Icon className="h-5 w-5 mx-auto mb-2" />
                  <p className="text-sm">{method.label}</p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Card Details (for card payments) */}
        {(selectedMethod === PaymentMethod.CREDIT_CARD || 
          selectedMethod === PaymentMethod.DEBIT_CARD) && (
          <Card className="p-4">
            <h4 className="font-medium mb-3">Card Details</h4>
            <div className="space-y-3">
              <div>
                <label className="text-sm text-muted-foreground">Card Number</label>
                <Input
                  placeholder="1234 5678 9012 3456"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                  maxLength={19}
                />
              </div>
              <div>
                <label className="text-sm text-muted-foreground">Cardholder Name</label>
                <Input
                  placeholder="John Doe"
                  value={cardName}
                  onChange={(e) => setCardName(e.target.value)}
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-sm text-muted-foreground">Expiry Date</label>
                  <Input
                    placeholder="MM/YY"
                    value={expiryDate}
                    onChange={(e) => setExpiryDate(e.target.value)}
                    maxLength={5}
                  />
                </div>
                <div>
                  <label className="text-sm text-muted-foreground">CVV</label>
                  <Input
                    placeholder="123"
                    value={cvv}
                    onChange={(e) => setCvv(e.target.value)}
                    maxLength={4}
                  />
                </div>
              </div>
            </div>
          </Card>
        )}

        {/* Cash Payment */}
        {selectedMethod === PaymentMethod.CASH && (
          <Card className="p-4">
            <h4 className="font-medium mb-3">Cash Payment</h4>
            <div className="space-y-3">
              <div>
                <label className="text-sm text-muted-foreground">Amount Received</label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="number"
                    step="0.01"
                    className="pl-10"
                    value={customAmount}
                    onChange={(e) => setCustomAmount(parseFloat(e.target.value) || 0)}
                  />
                </div>
              </div>
              {calculateChange() > 0 && (
                <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Change Due</span>
                    <span className="text-xl font-bold text-green-600 dark:text-green-400">
                      ${calculateChange().toFixed(2)}
                    </span>
                  </div>
                </div>
              )}
            </div>
          </Card>
        )}

        {/* Tip Section */}
        <Card className="p-4">
          <h4 className="font-medium mb-3">Add Tip</h4>
          <div className="space-y-3">
            <div className="grid grid-cols-4 gap-2">
              {tipPresets.map(preset => (
                <Button
                  key={preset.label}
                  variant={tipAmount === preset.amount ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => handleTipPreset(preset.amount)}
                >
                  {preset.label}
                </Button>
              ))}
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Custom:</span>
              <div className="relative flex-1">
                <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="number"
                  step="0.01"
                  className="pl-10"
                  value={tipAmount}
                  onChange={(e) => handleCustomTip(e.target.value)}
                />
              </div>
            </div>
          </div>
        </Card>

        {/* Split Payment Option */}
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="split-payment"
            checked={splitPayment}
            onChange={(e) => setSplitPayment(e.target.checked)}
            className="rounded"
          />
          <label htmlFor="split-payment" className="text-sm">
            Split payment between multiple methods
          </label>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-between pt-4 border-t">
          <Button
            variant="outline"
            onClick={onClose}
            disabled={processing}
          >
            Cancel
          </Button>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              disabled={!selectedMethod || processing}
            >
              <Receipt className="h-4 w-4 mr-2" />
              Print Receipt
            </Button>
            <Button
              onClick={handleProcessPayment}
              disabled={!selectedMethod || processing}
            >
              {processing ? (
                <>Processing...</>
              ) : (
                <>
                  <CreditCard className="h-4 w-4 mr-2" />
                  Process Payment
                </>
              )}
            </Button>
          </div>
        </div>

        {/* Warning for incomplete orders */}
        {processing && (
          <div className="flex items-center gap-2 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
            <AlertCircle className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
            <p className="text-sm text-yellow-800 dark:text-yellow-200">
              Processing payment... Please do not close this window.
            </p>
          </div>
        )}
      </div>
    </Modal>
  );
}