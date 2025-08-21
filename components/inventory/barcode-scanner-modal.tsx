'use client';

import { useState, useEffect, useRef } from 'react';
import { X, Camera, Flashlight, RotateCcw, Check, AlertTriangle, Package } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { BarcodeScanner, BarcodeUtils } from '@/lib/inventory/barcode';
import { lookupItemByBarcode } from '@/lib/inventory/data';
import { cn } from '@/utils';
import type { InventoryItem, ScanResult } from '@/lib/inventory/types';

interface BarcodeScannerModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: 'lookup' | 'count' | 'receive' | 'transfer';
  onScanResult?: (result: ScanResult & { item?: InventoryItem }) => void;
  className?: string;
}

export function BarcodeScannerModal({ 
  isOpen, 
  onClose, 
  mode, 
  onScanResult, 
  className 
}: BarcodeScannerModalProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const scannerRef = useRef<BarcodeScanner | null>(null);
  const [hasCamera, setHasCamera] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [lastScanResult, setLastScanResult] = useState<ScanResult & { item?: InventoryItem } | null>(null);
  const [manualBarcode, setManualBarcode] = useState('');
  const [flashlightEnabled, setFlashlightEnabled] = useState(false);
  const [scanHistory, setScanHistory] = useState<Array<ScanResult & { item?: InventoryItem }>>([]);
  const [quantity, setQuantity] = useState(1);
  const [error, setError] = useState<string | null>(null);

  // Initialize camera and scanner
  useEffect(() => {
    const initializeScanner = async () => {
      if (!isOpen || !videoRef.current) return;

      try {
        // Check camera support
        const cameraSupported = await BarcodeScanner.hasCameraSupport();
        setHasCamera(cameraSupported);

        if (cameraSupported) {
          scannerRef.current = new BarcodeScanner();
          await scannerRef.current.initializeCamera(videoRef.current);
          setIsScanning(true);
          
          // Start scanning
          scannerRef.current.startScanning(handleScanResult);
        }
      } catch (error) {
        console.error('Failed to initialize scanner:', error);
        setError('Failed to access camera. Please check permissions.');
      }
    };

    initializeScanner();

    // Cleanup on unmount or close
    return () => {
      if (scannerRef.current) {
        scannerRef.current.cleanup();
        scannerRef.current = null;
      }
      setIsScanning(false);
    };
  }, [isOpen]);

  const handleScanResult = async (scanResult: ScanResult) => {
    if (!scanResult.success) {
      setError('Failed to read barcode. Please try again.');
      return;
    }

    try {
      // Validate barcode format
      const validation = BarcodeUtils.validateBarcode(scanResult.barcode);
      if (!validation.isValid) {
        setError(`Invalid barcode format: ${validation.error}`);
        return;
      }

      // Lookup item in inventory
      const item = await lookupItemByBarcode(scanResult.barcode);
      
      const result = {
        ...scanResult,
        item: item || undefined,
      };

      setLastScanResult(result);
      setScanHistory(prev => [result, ...prev.slice(0, 9)]); // Keep last 10 scans
      setError(null);
      
      // Call the callback
      onScanResult?.(result);

      // Auto-close for lookup mode if item found
      if (mode === 'lookup' && item) {
        setTimeout(() => onClose(), 1500);
      }
    } catch (error) {
      setError('Failed to lookup item in inventory.');
    }
  };

  const handleManualBarcode = async () => {
    if (!manualBarcode.trim()) return;

    const scanResult: ScanResult = {
      barcode: manualBarcode.trim(),
      format: BarcodeUtils.detectFormat(manualBarcode.trim()),
      success: true,
      timestamp: new Date(),
    };

    await handleScanResult(scanResult);
    setManualBarcode('');
  };

  const toggleFlashlight = async () => {
    if (scannerRef.current) {
      try {
        // In a real implementation, you'd control the flashlight via MediaTrackConstraints
        setFlashlightEnabled(!flashlightEnabled);
      } catch (error) {
        console.error('Failed to toggle flashlight:', error);
      }
    }
  };

  const getModeTitle = () => {
    switch (mode) {
      case 'lookup': return 'Item Lookup';
      case 'count': return 'Stock Count';
      case 'receive': return 'Receive Items';
      case 'transfer': return 'Transfer Items';
      default: return 'Barcode Scanner';
    }
  };

  const getModeDescription = () => {
    switch (mode) {
      case 'lookup': return 'Scan to view item details';
      case 'count': return 'Scan items for physical inventory count';
      case 'receive': return 'Scan items to receive into inventory';
      case 'transfer': return 'Scan items to transfer between locations';
      default: return 'Scan barcodes to identify items';
    }
  };

  if (!isOpen) return null;

  return (
    <div className={cn('fixed inset-0 z-50 flex items-center justify-center', className)}>
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black bg-opacity-75" onClick={onClose} />
      
      {/* Modal */}
      <div className="relative bg-white rounded-lg shadow-xl max-w-md w-full mx-4 max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">{getModeTitle()}</h2>
            <p className="text-sm text-gray-500">{getModeDescription()}</p>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Scanner Area */}
        <div className="relative bg-black">
          {hasCamera ? (
            <div className="relative">
              <video
                ref={videoRef}
                className="w-full h-64 object-cover"
                playsInline
                muted
              />
              
              {/* Scanning Overlay */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative">
                  {/* Scanning frame */}
                  <div className="w-48 h-32 border-2 border-white border-opacity-50 relative">
                    <div className="absolute top-0 left-0 w-6 h-6 border-t-4 border-l-4 border-blue-500"></div>
                    <div className="absolute top-0 right-0 w-6 h-6 border-t-4 border-r-4 border-blue-500"></div>
                    <div className="absolute bottom-0 left-0 w-6 h-6 border-b-4 border-l-4 border-blue-500"></div>
                    <div className="absolute bottom-0 right-0 w-6 h-6 border-b-4 border-r-4 border-blue-500"></div>
                  </div>
                  
                  {/* Scanning line animation */}
                  {isScanning && (
                    <div className="absolute inset-x-0 top-0 h-0.5 bg-blue-500 animate-pulse"></div>
                  )}
                </div>
              </div>

              {/* Camera Controls */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={toggleFlashlight}
                  className={cn(
                    'bg-black bg-opacity-50 text-white border-white border-opacity-50',
                    flashlightEnabled && 'bg-yellow-500 bg-opacity-75'
                  )}
                >
                  <Flashlight className="h-4 w-4" />
                </Button>
                
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={() => {
                    // Restart scanner
                    if (scannerRef.current) {
                      scannerRef.current.stopScanning();
                      scannerRef.current.startScanning(handleScanResult);
                    }
                  }}
                  className="bg-black bg-opacity-50 text-white border-white border-opacity-50"
                >
                  <RotateCcw className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ) : (
            <div className="h-64 flex items-center justify-center bg-gray-100">
              <div className="text-center">
                <Camera className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-600">Camera not available</p>
                <p className="text-xs text-gray-500">Use manual input below</p>
              </div>
            </div>
          )}
        </div>

        {/* Manual Input */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex space-x-2">
            <Input
              placeholder="Enter barcode manually..."
              value={manualBarcode}
              onChange={(e) => setManualBarcode(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleManualBarcode()}
              className="flex-1"
            />
            <Button onClick={handleManualBarcode} size="sm">
              Scan
            </Button>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="p-4 bg-red-50 border-l-4 border-red-400">
            <div className="flex items-center">
              <AlertTriangle className="h-4 w-4 text-red-400 mr-2" />
              <p className="text-sm text-red-700">{error}</p>
            </div>
          </div>
        )}

        {/* Last Scan Result */}
        {lastScanResult && (
          <div className="p-4 bg-green-50 border-l-4 border-green-400">
            <div className="flex items-start">
              <Check className="h-5 w-5 text-green-400 mr-2 mt-0.5" />
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm font-medium text-green-800">
                    Barcode Scanned Successfully
                  </p>
                  <Badge variant="secondary" className="text-xs">
                    {lastScanResult.format}
                  </Badge>
                </div>
                
                <p className="text-xs text-green-700 font-mono mb-2">
                  {BarcodeUtils.formatForDisplay(lastScanResult.barcode)}
                </p>
                
                {lastScanResult.item ? (
                  <div className="bg-white rounded p-3 border">
                    <div className="flex items-center space-x-3">
                      <Package className="h-8 w-8 text-gray-400" />
                      <div>
                        <h4 className="text-sm font-medium text-gray-900">
                          {lastScanResult.item.name}
                        </h4>
                        <p className="text-xs text-gray-500">
                          Current Stock: {lastScanResult.item.currentStock}
                        </p>
                        <p className="text-xs text-gray-500">
                          SKU: {lastScanResult.item.sku}
                        </p>
                      </div>
                    </div>
                    
                    {/* Mode-specific controls */}
                    {(mode === 'count' || mode === 'receive' || mode === 'transfer') && (
                      <div className="mt-3 flex items-center space-x-2">
                        <label className="text-xs text-gray-600">Quantity:</label>
                        <Input
                          type="number"
                          min="0"
                          value={quantity}
                          onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                          className="w-20 h-8 text-sm"
                        />
                        <Button size="sm" className="h-8">
                          {mode === 'count' ? 'Count' : mode === 'receive' ? 'Receive' : 'Transfer'}
                        </Button>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="bg-yellow-50 rounded p-3 border border-yellow-200">
                    <p className="text-sm text-yellow-800">
                      Item not found in inventory. Would you like to add it?
                    </p>
                    <Button size="sm" className="mt-2">
                      Add New Item
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Scan History */}
        {scanHistory.length > 0 && (
          <div className="p-4 max-h-40 overflow-y-auto">
            <h3 className="text-sm font-medium text-gray-900 mb-2">Recent Scans</h3>
            <div className="space-y-2">
              {scanHistory.slice(0, 5).map((scan, index) => (
                <div key={index} className="flex items-center justify-between text-sm">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="font-mono text-xs">{scan.barcode}</span>
                  </div>
                  <div className="text-right">
                    {scan.item ? (
                      <span className="text-green-600 text-xs">{scan.item.name}</span>
                    ) : (
                      <span className="text-yellow-600 text-xs">Not found</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="p-4 bg-gray-50 text-center">
          <p className="text-xs text-gray-500">
            {isScanning ? 'Position barcode within the frame' : 'Scanner ready'}
          </p>
        </div>
      </div>
    </div>
  );
}