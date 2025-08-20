'use client';

import { Receipt, Cart, Transaction } from '@/lib/pos/types';
import { Printer, Mail, MessageSquare, Download } from 'lucide-react';

interface ReceiptGeneratorProps {
  receipt: Receipt;
  onPrint: () => void;
  onEmail: (email: string) => void;
  onSMS: (phone: string) => void;
}

export function ReceiptGenerator({ receipt, onPrint, onEmail, onSMS }: ReceiptGeneratorProps) {
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    }).format(date);
  };

  const generateReceiptHTML = () => {
    return `
      <div style="font-family: monospace; max-width: 300px; margin: 0 auto; padding: 20px;">
        <div style="text-align: center; margin-bottom: 20px;">
          ${receipt.restaurantInfo.logo ? `<img src="${receipt.restaurantInfo.logo}" style="max-width: 150px; margin-bottom: 10px;">` : ''}
          <h2 style="margin: 0;">${receipt.restaurantInfo.name}</h2>
          <p style="margin: 5px 0; font-size: 12px;">${receipt.restaurantInfo.address}</p>
          <p style="margin: 5px 0; font-size: 12px;">${receipt.restaurantInfo.phone}</p>
          ${receipt.restaurantInfo.website ? `<p style="margin: 5px 0; font-size: 12px;">${receipt.restaurantInfo.website}</p>` : ''}
        </div>
        
        <div style="border-top: 2px dashed #000; border-bottom: 2px dashed #000; padding: 10px 0; margin: 10px 0;">
          <p style="margin: 5px 0;"><strong>Order #${receipt.orderId}</strong></p>
          <p style="margin: 5px 0;">Date: ${formatDate(receipt.transaction.processedAt)}</p>
          <p style="margin: 5px 0;">Type: ${receipt.cart.orderType.replace('_', ' ').toUpperCase()}</p>
          ${receipt.customer ? `<p style="margin: 5px 0;">Customer: ${receipt.customer.firstName} ${receipt.customer.lastName}</p>` : ''}
          ${receipt.cart.tableNumber ? `<p style="margin: 5px 0;">Table: ${receipt.cart.tableNumber}</p>` : ''}
        </div>
        
        <div style="margin: 20px 0;">
          ${receipt.cart.items.map(item => `
            <div style="margin-bottom: 10px;">
              <div style="display: flex; justify-content: space-between;">
                <span>${item.quantity}x ${item.menuItem.name}</span>
                <span>$${item.subtotal.toFixed(2)}</span>
              </div>
              ${item.modifiers.length > 0 ? `
                <div style="font-size: 11px; color: #666; margin-left: 20px;">
                  ${item.modifiers.map(mod => 
                    `${mod.modifierName}: ${mod.selectedOptions.map(o => o.name).join(', ')}`
                  ).join('<br>')}
                </div>
              ` : ''}
              ${item.specialInstructions ? `
                <div style="font-size: 11px; color: #666; margin-left: 20px; font-style: italic;">
                  ${item.specialInstructions}
                </div>
              ` : ''}
            </div>
          `).join('')}
        </div>
        
        <div style="border-top: 1px solid #000; padding-top: 10px; margin-top: 10px;">
          <div style="display: flex; justify-content: space-between; margin: 5px 0;">
            <span>Subtotal:</span>
            <span>$${receipt.cart.subtotal.toFixed(2)}</span>
          </div>
          ${receipt.cart.discount ? `
            <div style="display: flex; justify-content: space-between; margin: 5px 0; color: green;">
              <span>Discount:</span>
              <span>-$${receipt.cart.discount.appliedAmount?.toFixed(2)}</span>
            </div>
          ` : ''}
          <div style="display: flex; justify-content: space-between; margin: 5px 0;">
            <span>Tax:</span>
            <span>$${receipt.cart.tax.toFixed(2)}</span>
          </div>
          ${receipt.cart.tip ? `
            <div style="display: flex; justify-content: space-between; margin: 5px 0;">
              <span>Tip:</span>
              <span>$${receipt.cart.tip.amount?.toFixed(2)}</span>
            </div>
          ` : ''}
          <div style="display: flex; justify-content: space-between; margin: 10px 0; font-size: 18px; font-weight: bold;">
            <span>TOTAL:</span>
            <span>$${receipt.cart.total.toFixed(2)}</span>
          </div>
        </div>
        
        <div style="border-top: 1px solid #000; padding-top: 10px; margin-top: 10px;">
          <p style="margin: 5px 0;">Payment: ${receipt.transaction.paymentMethod.name}</p>
          ${receipt.transaction.cardLast4 ? `<p style="margin: 5px 0;">Card: ****${receipt.transaction.cardLast4}</p>` : ''}
          ${receipt.transaction.referenceNumber ? `<p style="margin: 5px 0;">Ref: ${receipt.transaction.referenceNumber}</p>` : ''}
          ${receipt.transaction.cashTendered ? `
            <p style="margin: 5px 0;">Cash Tendered: $${receipt.transaction.cashTendered.toFixed(2)}</p>
            <p style="margin: 5px 0;">Change: $${receipt.transaction.changeGiven?.toFixed(2)}</p>
          ` : ''}
        </div>
        
        ${receipt.restaurantInfo.footerMessage ? `
          <div style="text-align: center; margin-top: 20px; padding-top: 10px; border-top: 2px dashed #000;">
            <p style="font-size: 12px;">${receipt.restaurantInfo.footerMessage}</p>
          </div>
        ` : ''}
        
        <div style="text-align: center; margin-top: 20px;">
          <p style="font-size: 11px;">Thank you for your business!</p>
        </div>
      </div>
    `;
  };

  return (
    <div className="space-y-4">
      {/* Receipt Preview */}
      <div className="bg-white text-black rounded-lg p-6 max-w-sm mx-auto">
        <div dangerouslySetInnerHTML={{ __html: generateReceiptHTML() }} />
      </div>

      {/* Receipt Actions */}
      <div className="flex gap-3">
        <button
          onClick={onPrint}
          className="flex-1 bg-primary hover:bg-primary/90 text-white py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
        >
          <Printer className="h-5 w-5" />
          Print Receipt
        </button>
        
        <button
          onClick={() => {
            const email = prompt('Enter customer email:');
            if (email) onEmail(email);
          }}
          className="flex-1 bg-gray-700 hover:bg-gray-600 text-white py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
        >
          <Mail className="h-5 w-5" />
          Email
        </button>
        
        <button
          onClick={() => {
            const phone = prompt('Enter customer phone:');
            if (phone) onSMS(phone);
          }}
          className="flex-1 bg-gray-700 hover:bg-gray-600 text-white py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
        >
          <MessageSquare className="h-5 w-5" />
          SMS
        </button>
      </div>
    </div>
  );
}

export function generateReceipt(
  cart: Cart,
  transaction: Transaction,
  customer?: any
): Receipt {
  return {
    id: `receipt-${Date.now()}`,
    orderId: `ORD-${Date.now()}`,
    transactionId: transaction.id,
    cart,
    customer,
    transaction,
    restaurantInfo: {
      name: 'The Modern Kitchen',
      address: '123 Main Street, New York, NY 10001',
      phone: '(555) 123-4567',
      email: 'info@modernkitchen.com',
      website: 'www.modernkitchen.com',
      taxId: 'TAX-123456789',
      footerMessage: 'Follow us @modernkitchen for exclusive offers!'
    }
  };
}