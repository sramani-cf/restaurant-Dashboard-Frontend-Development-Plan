'use client';

import { useState } from 'react';
import { RefundRequest, OrderItem } from '@/lib/orders/types';
import { Modal } from '@/components/ui/modal';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  DollarSign, 
  AlertCircle,
  CreditCard,
  Banknote,
  Gift,
  FileText,
  RotateCcw
} from 'lucide-react';

interface RefundModalProps {
  isOpen: boolean;
  onClose: () => void;
  order: {
    id: string;
    orderNumber: string;
    total: number;
    items: OrderItem[];
    paymentMethod?: string;
  };
  onRefundComplete: (refund: RefundRequest) => void;
}

export function RefundModal({
  isOpen,
  onClose,
  order,
  onRefundComplete
}: RefundModalProps) {
  const [refundType, setRefundType] = useState<'full' | 'partial'>('full');
  const [refundMethod, setRefundMethod] = useState<'original' | 'cash' | 'store_credit'>('original');
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [customAmount, setCustomAmount] = useState(order.total);
  const [reason, setReason] = useState('');
  const [notes, setNotes] = useState('');
  const [processing, setProcessing] = useState(false);
  const [requiresApproval, setRequiresApproval] = useState(false);

  const refundReasons = [
    'Order mistake',
    'Quality issue',
    'Wrong item received',
    'Customer changed mind',
    'Long wait time',
    'Allergic reaction',
    'Price adjustment',
    'Other'
  ];

  const calculateRefundAmount = () => {
    if (refundType === 'full') {
      return order.total;
    }
    
    if (selectedItems.length > 0) {
      return order.items
        .filter(item => selectedItems.includes(item.id))
        .reduce((sum, item) => sum + item.totalPrice, 0);
    }
    
    return customAmount;
  };

  const handleItemToggle = (itemId: string) => {
    setSelectedItems(prev =>
      prev.includes(itemId)
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  const handleProcessRefund = async () => {
    if (!reason) {
      alert('Please select a reason for the refund');
      return;
    }

    setProcessing(true);

    // Check if manager approval is needed (for large refunds)
    if (calculateRefundAmount() > 100) {
      setRequiresApproval(true);
      await new Promise(resolve => setTimeout(resolve, 2000));
    }

    const refundRequest: RefundRequest = {
      orderId: order.id,
      amount: calculateRefundAmount(),
      reason,
      items: refundType === 'partial' ? selectedItems : undefined,
      refundMethod,
      notes
    };

    // Simulate processing
    await new Promise(resolve => setTimeout(resolve, 1500));

    onRefundComplete(refundRequest);
    setProcessing(false);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Process Refund - Order ${order.orderNumber}`}
      size="lg"
    >
      <div className="space-y-6">
        {/* Refund Type */}
        <div>
          <h3 className="font-medium mb-3">Refund Type</h3>
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => setRefundType('full')}
              className={`p-3 border rounded-lg transition-all ${
                refundType === 'full'
                  ? 'border-primary bg-primary/10'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <RotateCcw className="h-5 w-5 mx-auto mb-2" />
              <p className="font-medium">Full Refund</p>
              <p className="text-sm text-muted-foreground">
                Refund entire order
              </p>
            </button>
            <button
              onClick={() => setRefundType('partial')}
              className={`p-3 border rounded-lg transition-all ${
                refundType === 'partial'
                  ? 'border-primary bg-primary/10'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <FileText className="h-5 w-5 mx-auto mb-2" />
              <p className="font-medium">Partial Refund</p>
              <p className="text-sm text-muted-foreground">
                Refund specific items
              </p>
            </button>
          </div>
        </div>

        {/* Item Selection (for partial refunds) */}
        {refundType === 'partial' && (
          <Card className="p-4">
            <h4 className="font-medium mb-3">Select Items to Refund</h4>
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {order.items.map(item => (
                <div
                  key={item.id}
                  className="flex items-center justify-between p-2 hover:bg-muted/50 rounded"
                >
                  <div className="flex items-center gap-3">
                    <Checkbox
                      checked={selectedItems.includes(item.id)}
                      onCheckedChange={() => handleItemToggle(item.id)}
                    />
                    <div>
                      <p className="font-medium">
                        {item.quantity}x {item.menuItemName}
                      </p>
                      {item.modifiers.length > 0 && (
                        <p className="text-sm text-muted-foreground">
                          {item.modifiers.map(m => m.name).join(', ')}
                        </p>
                      )}
                    </div>
                  </div>
                  <span className="font-medium">
                    ${item.totalPrice.toFixed(2)}
                  </span>
                </div>
              ))}
            </div>
            
            {refundType === 'partial' && selectedItems.length === 0 && (
              <div className="mt-3 pt-3 border-t">
                <label className="text-sm text-muted-foreground">
                  Or enter custom amount
                </label>
                <div className="relative mt-1">
                  <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="number"
                    step="0.01"
                    className="pl-10"
                    value={customAmount}
                    onChange={(e) => setCustomAmount(parseFloat(e.target.value) || 0)}
                    max={order.total}
                  />
                </div>
              </div>
            )}
          </Card>
        )}

        {/* Refund Method */}
        <div>
          <h3 className="font-medium mb-3">Refund Method</h3>
          <div className="grid grid-cols-3 gap-3">
            <button
              onClick={() => setRefundMethod('original')}
              className={`p-3 border rounded-lg transition-all ${
                refundMethod === 'original'
                  ? 'border-primary bg-primary/10'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <CreditCard className="h-5 w-5 mx-auto mb-2" />
              <p className="text-sm">Original Method</p>
            </button>
            <button
              onClick={() => setRefundMethod('cash')}
              className={`p-3 border rounded-lg transition-all ${
                refundMethod === 'cash'
                  ? 'border-primary bg-primary/10'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <Banknote className="h-5 w-5 mx-auto mb-2" />
              <p className="text-sm">Cash</p>
            </button>
            <button
              onClick={() => setRefundMethod('store_credit')}
              className={`p-3 border rounded-lg transition-all ${
                refundMethod === 'store_credit'
                  ? 'border-primary bg-primary/10'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <Gift className="h-5 w-5 mx-auto mb-2" />
              <p className="text-sm">Store Credit</p>
            </button>
          </div>
        </div>

        {/* Refund Reason */}
        <div>
          <h3 className="font-medium mb-3">Reason for Refund</h3>
          <div className="grid grid-cols-2 gap-2">
            {refundReasons.map(r => (
              <Button
                key={r}
                variant={reason === r ? 'default' : 'outline'}
                size="sm"
                onClick={() => setReason(r)}
              >
                {r}
              </Button>
            ))}
          </div>
        </div>

        {/* Additional Notes */}
        <div>
          <label className="font-medium mb-2 block">Additional Notes</label>
          <textarea
            className="w-full p-3 border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-primary"
            rows={3}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Add any additional details about this refund..."
          />
        </div>

        {/* Refund Summary */}
        <Card className="p-4 bg-red-50 dark:bg-red-900/20">
          <div className="flex items-center justify-between mb-2">
            <span className="font-medium">Refund Amount</span>
            <span className="text-2xl font-bold text-red-600 dark:text-red-400">
              ${calculateRefundAmount().toFixed(2)}
            </span>
          </div>
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>Original Order Total</span>
            <span>${order.total.toFixed(2)}</span>
          </div>
        </Card>

        {/* Manager Approval Warning */}
        {calculateRefundAmount() > 100 && (
          <div className="flex items-center gap-2 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
            <AlertCircle className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
            <div className="flex-1">
              <p className="text-sm font-medium text-yellow-800 dark:text-yellow-200">
                Manager Approval Required
              </p>
              <p className="text-sm text-yellow-700 dark:text-yellow-300">
                Refunds over $100 require manager approval
              </p>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex items-center justify-between pt-4 border-t">
          <Button
            variant="outline"
            onClick={onClose}
            disabled={processing}
          >
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={handleProcessRefund}
            disabled={!reason || processing}
          >
            {processing ? (
              requiresApproval ? 'Requesting Approval...' : 'Processing Refund...'
            ) : (
              <>
                <RotateCcw className="h-4 w-4 mr-2" />
                Process Refund
              </>
            )}
          </Button>
        </div>
      </div>
    </Modal>
  );
}