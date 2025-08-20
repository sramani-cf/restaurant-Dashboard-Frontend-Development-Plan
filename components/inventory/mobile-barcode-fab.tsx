'use client';

import { useState } from 'react';
import { Scan, Package, Plus, Move, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { BarcodeScannerModal } from './barcode-scanner-modal';
import { cn } from '@/lib/utils';

interface MobileBarcodeFABProps {
  className?: string;
}

export function MobileBarcodeFAB({ className }: MobileBarcodeFABProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [showScanner, setShowScanner] = useState(false);
  const [scanMode, setScanMode] = useState<'lookup' | 'count' | 'receive' | 'transfer'>('lookup');

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const openScanner = (mode: typeof scanMode) => {
    setScanMode(mode);
    setShowScanner(true);
    setIsOpen(false);
  };

  const quickActions = [
    {
      icon: Scan,
      label: 'Quick Scan',
      action: () => openScanner('lookup'),
      color: 'bg-blue-600 hover:bg-blue-700',
    },
    {
      icon: Package,
      label: 'Stock Count',
      action: () => openScanner('count'),
      color: 'bg-green-600 hover:bg-green-700',
    },
    {
      icon: Plus,
      label: 'Receive Items',
      action: () => openScanner('receive'),
      color: 'bg-purple-600 hover:bg-purple-700',
    },
    {
      icon: Move,
      label: 'Transfer',
      action: () => openScanner('transfer'),
      color: 'bg-orange-600 hover:bg-orange-700',
    },
  ];

  return (
    <>
      <div className={cn('fixed bottom-20 right-4 z-40', className)}>
        {/* Quick Action Buttons */}
        <div className={cn(
          'mb-4 space-y-3 transition-all duration-300 transform',
          isOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'
        )}>
          {quickActions.map((action, index) => {
            const Icon = action.icon;
            return (
              <div
                key={action.label}
                className={cn(
                  'transform transition-all duration-300',
                  isOpen 
                    ? 'translate-y-0 opacity-100'
                    : 'translate-y-4 opacity-0',
                )}
                style={{
                  transitionDelay: isOpen ? `${index * 50}ms` : `${(quickActions.length - index - 1) * 50}ms`
                }}
              >
                <Button
                  onClick={action.action}
                  className={cn(
                    'h-12 w-12 rounded-full shadow-lg text-white transition-all duration-200 hover:scale-110',
                    action.color
                  )}
                  size="sm"
                >
                  <Icon className="h-5 w-5" />
                  <span className="sr-only">{action.label}</span>
                </Button>
                
                {/* Label */}
                <div className="absolute right-16 top-1/2 transform -translate-y-1/2">
                  <div className="bg-gray-900 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                    {action.label}
                  </div>
                  <div className="absolute left-full top-1/2 transform -translate-y-1/2 w-0 h-0 border-t-4 border-b-4 border-l-4 border-transparent border-l-gray-900"></div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Main FAB */}
        <Button
          onClick={toggleMenu}
          className={cn(
            'h-14 w-14 rounded-full shadow-lg bg-blue-600 hover:bg-blue-700 text-white transition-all duration-300',
            isOpen && 'rotate-45'
          )}
        >
          {isOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Scan className="h-6 w-6" />
          )}
          <span className="sr-only">
            {isOpen ? 'Close menu' : 'Open scanning menu'}
          </span>
        </Button>

        {/* Backdrop */}
        {isOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-25 -z-10"
            onClick={toggleMenu}
          />
        )}
      </div>

      {/* Barcode Scanner Modal */}
      {showScanner && (
        <BarcodeScannerModal
          isOpen={showScanner}
          onClose={() => setShowScanner(false)}
          mode={scanMode}
          onScanResult={(result) => {
            console.log('Scan result:', result);
            // Handle scan result based on mode
          }}
        />
      )}

      {/* Quick access hint for first-time users */}
      <div className="fixed bottom-36 right-4 z-30">
        <div className="bg-blue-600 text-white text-xs px-3 py-2 rounded-lg shadow-lg max-w-xs">
          <div className="flex items-start space-x-2">
            <Scan className="h-4 w-4 mt-0.5 flex-shrink-0" />
            <div>
              <div className="font-medium mb-1">Quick Barcode Scanning</div>
              <div className="text-blue-100">
                Tap to scan items, count stock, or receive inventory on the go
              </div>
            </div>
            <button 
              className="text-blue-200 hover:text-white ml-2"
              onClick={() => {
                // Hide hint - in real app, save to local storage
              }}
            >
              <X className="h-3 w-3" />
            </button>
          </div>
          <div className="absolute bottom-full right-8 w-0 h-0 border-l-4 border-r-4 border-b-4 border-transparent border-b-blue-600"></div>
        </div>
      </div>

      {/* Offline capability indicator */}
      <div className="fixed bottom-2 right-4 z-30">
        <div className="flex items-center space-x-2 bg-white rounded-full shadow-sm border border-gray-200 px-3 py-1">
          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
          <span className="text-xs text-gray-600">Offline Ready</span>
        </div>
      </div>
    </>
  );
}