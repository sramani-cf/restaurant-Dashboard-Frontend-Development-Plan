import type { 
  InventoryItem, 
  BarcodeLog, 
  ScanResult, 
  ScanSession 
} from './types';

/**
 * Barcode format detection and validation utilities
 */
export class BarcodeUtils {
  // Common barcode format patterns
  static readonly FORMATS = {
    UPC_A: /^\d{12}$/,
    UPC_E: /^\d{8}$/,
    EAN_13: /^\d{13}$/,
    EAN_8: /^\d{8}$/,
    CODE_128: /^[\x20-\x7F]+$/,
    CODE_39: /^[0-9A-Z\-\.\$\/\+\%\*\s]+$/,
    CODABAR: /^[0-9\-\$\:\.\+\/]+$/,
    ITF: /^\d+$/,
    QR_CODE: /^[\s\S]*$/, // QR codes can contain any characters
    PDF_417: /^[\s\S]*$/, // PDF417 can contain any characters
  };

  /**
   * Detect barcode format based on content pattern
   */
  static detectFormat(barcode: string): string {
    const cleaned = barcode.trim();
    
    if (this.FORMATS.UPC_A.test(cleaned)) return 'UPC-A';
    if (this.FORMATS.UPC_E.test(cleaned)) return 'UPC-E';
    if (this.FORMATS.EAN_13.test(cleaned)) return 'EAN-13';
    if (this.FORMATS.EAN_8.test(cleaned)) return 'EAN-8';
    if (this.FORMATS.CODE_39.test(cleaned)) return 'CODE-39';
    if (this.FORMATS.CODABAR.test(cleaned)) return 'CODABAR';
    if (this.FORMATS.ITF.test(cleaned)) return 'ITF';
    if (this.FORMATS.CODE_128.test(cleaned)) return 'CODE-128';
    
    // Default for unknown formats
    return 'UNKNOWN';
  }

  /**
   * Validate barcode format and checksum where applicable
   */
  static validateBarcode(barcode: string): { isValid: boolean; format: string; error?: string } {
    const cleaned = barcode.trim();
    const format = this.detectFormat(cleaned);

    if (format === 'UNKNOWN') {
      return { isValid: false, format, error: 'Unknown barcode format' };
    }

    // Validate UPC-A checksum
    if (format === 'UPC-A') {
      const isValid = this.validateUPCAChecksum(cleaned);
      return { 
        isValid, 
        format, 
        error: isValid ? undefined : 'Invalid UPC-A checksum' 
      };
    }

    // Validate EAN-13 checksum
    if (format === 'EAN-13') {
      const isValid = this.validateEAN13Checksum(cleaned);
      return { 
        isValid, 
        format, 
        error: isValid ? undefined : 'Invalid EAN-13 checksum' 
      };
    }

    // For other formats, basic validation passed
    return { isValid: true, format };
  }

  /**
   * Validate UPC-A checksum digit
   */
  static validateUPCAChecksum(barcode: string): boolean {
    if (barcode.length !== 12) return false;

    const digits = barcode.split('').map(Number);
    const checkDigit = digits[11];
    
    let sum = 0;
    for (let i = 0; i < 11; i++) {
      sum += digits[i] * (i % 2 === 0 ? 1 : 3);
    }
    
    const calculatedCheckDigit = (10 - (sum % 10)) % 10;
    return checkDigit === calculatedCheckDigit;
  }

  /**
   * Validate EAN-13 checksum digit
   */
  static validateEAN13Checksum(barcode: string): boolean {
    if (barcode.length !== 13) return false;

    const digits = barcode.split('').map(Number);
    const checkDigit = digits[12];
    
    let sum = 0;
    for (let i = 0; i < 12; i++) {
      sum += digits[i] * (i % 2 === 0 ? 1 : 3);
    }
    
    const calculatedCheckDigit = (10 - (sum % 10)) % 10;
    return checkDigit === calculatedCheckDigit;
  }

  /**
   * Generate check digit for UPC-A
   */
  static generateUPCACheckDigit(barcode11: string): string {
    if (barcode11.length !== 11) {
      throw new Error('UPC-A code must be 11 digits for check digit generation');
    }

    const digits = barcode11.split('').map(Number);
    let sum = 0;
    
    for (let i = 0; i < 11; i++) {
      sum += digits[i] * (i % 2 === 0 ? 1 : 3);
    }
    
    const checkDigit = (10 - (sum % 10)) % 10;
    return barcode11 + checkDigit;
  }

  /**
   * Format barcode for display with proper spacing
   */
  static formatForDisplay(barcode: string): string {
    const format = this.detectFormat(barcode);
    
    switch (format) {
      case 'UPC-A':
        // Format: X XXXXX XXXXX X
        return `${barcode[0]} ${barcode.slice(1, 6)} ${barcode.slice(6, 11)} ${barcode[11]}`;
      
      case 'EAN-13':
        // Format: X XXXXXX XXXXXX
        return `${barcode[0]} ${barcode.slice(1, 7)} ${barcode.slice(7, 13)}`;
      
      case 'UPC-E':
        // Format: X XXXXXX X
        return `${barcode[0]} ${barcode.slice(1, 7)} ${barcode[7]}`;
      
      default:
        return barcode;
    }
  }

  /**
   * Clean barcode input (remove spaces, hyphens, etc.)
   */
  static cleanBarcode(input: string): string {
    return input.replace(/[\s\-]/g, '').trim();
  }

  /**
   * Convert UPC-A to UPC-E if possible
   */
  static convertUPCAToUPCE(upcA: string): string | null {
    if (upcA.length !== 12 || !this.validateUPCAChecksum(upcA)) {
      return null;
    }

    // UPC-E conversion rules (simplified)
    const numberSystem = upcA[0];
    const manufacturer = upcA.slice(1, 6);
    const product = upcA.slice(6, 11);
    const checkDigit = upcA[11];

    // Only certain UPC-A codes can be converted to UPC-E
    if (manufacturer.endsWith('000') || manufacturer.endsWith('100') || manufacturer.endsWith('200')) {
      // This is a simplified conversion - full rules are more complex
      return null;
    }

    return null; // Return null if conversion not possible
  }
}

/**
 * Barcode scanning session management
 */
export class ScanSessionManager {
  private sessions: Map<string, ScanSession> = new Map();

  /**
   * Start a new scanning session
   */
  startSession(
    type: 'count' | 'receive' | 'transfer',
    locationId: string,
    userId: string
  ): ScanSession {
    const session: ScanSession = {
      id: this.generateSessionId(),
      type,
      locationId,
      startTime: new Date(),
      scans: [],
      userId,
      isActive: true,
    };

    this.sessions.set(session.id, session);
    return session;
  }

  /**
   * Add scan result to session
   */
  addScanToSession(sessionId: string, scanResult: Omit<ScanResult, 'timestamp'>): ScanResult | null {
    const session = this.sessions.get(sessionId);
    if (!session || !session.isActive) {
      return null;
    }

    const fullScanResult: ScanResult = {
      ...scanResult,
      timestamp: new Date(),
    };

    session.scans.push(fullScanResult);
    return fullScanResult;
  }

  /**
   * End scanning session
   */
  endSession(sessionId: string): ScanSession | null {
    const session = this.sessions.get(sessionId);
    if (!session) {
      return null;
    }

    session.isActive = false;
    session.endTime = new Date();
    return session;
  }

  /**
   * Get active session
   */
  getSession(sessionId: string): ScanSession | null {
    return this.sessions.get(sessionId) || null;
  }

  /**
   * Get all sessions for a user
   */
  getUserSessions(userId: string): ScanSession[] {
    return Array.from(this.sessions.values()).filter(
      session => session.userId === userId
    );
  }

  /**
   * Get session statistics
   */
  getSessionStats(sessionId: string): {
    totalScans: number;
    successfulScans: number;
    failedScans: number;
    uniqueItems: number;
    duration: number; // in minutes
  } | null {
    const session = this.sessions.get(sessionId);
    if (!session) {
      return null;
    }

    const totalScans = session.scans.length;
    const successfulScans = session.scans.filter(scan => scan.success).length;
    const failedScans = totalScans - successfulScans;
    
    const uniqueItems = new Set(
      session.scans
        .filter(scan => scan.item)
        .map(scan => scan.item!.id)
    ).size;

    const endTime = session.endTime || new Date();
    const duration = (endTime.getTime() - session.startTime.getTime()) / (1000 * 60);

    return {
      totalScans,
      successfulScans,
      failedScans,
      uniqueItems,
      duration,
    };
  }

  private generateSessionId(): string {
    return `scan-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }
}

/**
 * Barcode scanning utilities for web/mobile
 */
export class BarcodeScanner {
  private stream: MediaStream | null = null;
  private videoElement: HTMLVideoElement | null = null;
  private canvasElement: HTMLCanvasElement | null = null;
  private context: CanvasRenderingContext2D | null = null;
  private isScanning = false;
  private scanCallback: ((result: ScanResult) => void) | null = null;

  /**
   * Initialize camera for barcode scanning
   */
  async initializeCamera(videoElement: HTMLVideoElement): Promise<void> {
    try {
      // Request camera access with ideal constraints for barcode scanning
      this.stream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: { ideal: 1280 },
          height: { ideal: 720 },
          facingMode: { ideal: 'environment' }, // Back camera on mobile
          focusMode: { ideal: 'continuous' },
          zoom: { ideal: 1.0 }
        },
        audio: false
      });

      this.videoElement = videoElement;
      this.videoElement.srcObject = this.stream;
      this.videoElement.setAttribute('playsinline', 'true');
      
      await new Promise((resolve) => {
        this.videoElement!.onloadedmetadata = resolve;
      });

      await this.videoElement.play();

      // Create canvas for image processing
      this.canvasElement = document.createElement('canvas');
      this.context = this.canvasElement.getContext('2d');
      
    } catch (error) {
      console.error('Failed to initialize camera:', error);
      throw new Error('Camera access denied or not available');
    }
  }

  /**
   * Start scanning for barcodes
   */
  startScanning(callback: (result: ScanResult) => void): void {
    if (!this.videoElement || !this.canvasElement || !this.context) {
      throw new Error('Scanner not initialized');
    }

    this.isScanning = true;
    this.scanCallback = callback;
    this.scanFrame();
  }

  /**
   * Stop scanning
   */
  stopScanning(): void {
    this.isScanning = false;
    this.scanCallback = null;
  }

  /**
   * Release camera resources
   */
  cleanup(): void {
    this.stopScanning();
    
    if (this.stream) {
      this.stream.getTracks().forEach(track => track.stop());
      this.stream = null;
    }

    if (this.videoElement) {
      this.videoElement.srcObject = null;
      this.videoElement = null;
    }

    this.canvasElement = null;
    this.context = null;
  }

  /**
   * Capture and process frame for barcode detection
   */
  private scanFrame(): void {
    if (!this.isScanning || !this.videoElement || !this.canvasElement || !this.context) {
      return;
    }

    // Set canvas size to video size
    this.canvasElement.width = this.videoElement.videoWidth;
    this.canvasElement.height = this.videoElement.videoHeight;

    // Draw video frame to canvas
    this.context.drawImage(
      this.videoElement,
      0,
      0,
      this.canvasElement.width,
      this.canvasElement.height
    );

    // Get image data for processing
    const imageData = this.context.getImageData(
      0,
      0,
      this.canvasElement.width,
      this.canvasElement.height
    );

    // Process image for barcode detection
    this.processImageData(imageData);

    // Schedule next frame
    if (this.isScanning) {
      requestAnimationFrame(() => this.scanFrame());
    }
  }

  /**
   * Process image data for barcode detection
   * Note: This is a simplified implementation. In production, you would use
   * a library like @zxing/library or QuaggaJS for actual barcode detection
   */
  private processImageData(imageData: ImageData): void {
    // This is a mock implementation - replace with actual barcode detection
    // For now, we'll simulate random successful scans for demo purposes
    
    if (Math.random() < 0.1) { // 10% chance of "detecting" a barcode per frame
      const mockBarcode = this.generateMockBarcode();
      const validation = BarcodeUtils.validateBarcode(mockBarcode);
      
      const result: ScanResult = {
        barcode: mockBarcode,
        format: validation.format,
        success: validation.isValid,
        timestamp: new Date(),
      };

      if (this.scanCallback) {
        this.scanCallback(result);
      }
    }
  }

  /**
   * Generate mock barcode for demo purposes
   */
  private generateMockBarcode(): string {
    const barcodes = [
      '1234567890123', // UPC-A
      '4012345678901', // EAN-13
      '12345670',      // UPC-E
      'CODE128DEMO',   // CODE-128
    ];
    
    return barcodes[Math.floor(Math.random() * barcodes.length)];
  }

  /**
   * Check if device has camera capability
   */
  static async hasCameraSupport(): Promise<boolean> {
    try {
      const devices = await navigator.mediaDevices.enumerateDevices();
      return devices.some(device => device.kind === 'videoinput');
    } catch {
      return false;
    }
  }

  /**
   * Get available camera devices
   */
  static async getCameraDevices(): Promise<MediaDeviceInfo[]> {
    try {
      const devices = await navigator.mediaDevices.enumerateDevices();
      return devices.filter(device => device.kind === 'videoinput');
    } catch {
      return [];
    }
  }
}

/**
 * Barcode generation utilities
 */
export class BarcodeGenerator {
  /**
   * Generate internal barcode for new inventory items
   */
  static generateInternalBarcode(prefix: string = '2'): string {
    // Internal barcodes typically start with 2 (for internal use)
    // followed by manufacturer code (5 digits) and product code (5 digits)
    const manufacturerCode = Math.floor(Math.random() * 100000).toString().padStart(5, '0');
    const productCode = Math.floor(Math.random() * 100000).toString().padStart(5, '0');
    const code11 = prefix + manufacturerCode + productCode;
    
    return BarcodeUtils.generateUPCACheckDigit(code11);
  }

  /**
   * Generate batch/lot number barcode
   */
  static generateBatchBarcode(itemId: string, batchNumber: string): string {
    // Create a unique barcode combining item ID and batch number
    const combined = `${itemId}-${batchNumber}`;
    const hash = this.simpleHash(combined);
    
    // Create a CODE-128 compatible string
    return `BATCH${hash.toString().padStart(6, '0')}`;
  }

  /**
   * Generate location barcode for warehouse management
   */
  static generateLocationBarcode(locationId: string, zone?: string, shelf?: string): string {
    let code = `LOC${locationId.padStart(3, '0')}`;
    
    if (zone) {
      code += `Z${zone.padStart(2, '0')}`;
    }
    
    if (shelf) {
      code += `S${shelf.padStart(3, '0')}`;
    }
    
    return code;
  }

  /**
   * Simple hash function for generating consistent codes
   */
  private static simpleHash(str: string): number {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32-bit integer
    }
    return Math.abs(hash) % 1000000;
  }
}

/**
 * Barcode scanning history and analytics
 */
export class ScanAnalytics {
  /**
   * Analyze scan success rates
   */
  static analyzeScanPerformance(logs: BarcodeLog[]): {
    successRate: number;
    averageScansPerHour: number;
    topScannedItems: Array<{ itemId: string; itemName: string; scanCount: number }>;
    errorsByType: Record<string, number>;
  } {
    const totalScans = logs.length;
    const successfulScans = logs.filter(log => log.isSuccessful).length;
    const successRate = totalScans > 0 ? (successfulScans / totalScans) * 100 : 0;

    // Calculate scans per hour
    const timeSpan = this.getTimeSpanHours(logs);
    const averageScansPerHour = timeSpan > 0 ? totalScans / timeSpan : 0;

    // Top scanned items
    const itemCounts = new Map<string, { itemName: string; count: number }>();
    logs.forEach(log => {
      if (log.itemId && log.itemName) {
        const existing = itemCounts.get(log.itemId) || { itemName: log.itemName, count: 0 };
        itemCounts.set(log.itemId, { ...existing, count: existing.count + 1 });
      }
    });

    const topScannedItems = Array.from(itemCounts.entries())
      .map(([itemId, data]) => ({
        itemId,
        itemName: data.itemName,
        scanCount: data.count,
      }))
      .sort((a, b) => b.scanCount - a.scanCount)
      .slice(0, 10);

    // Error analysis
    const errorsByType: Record<string, number> = {};
    logs.filter(log => !log.isSuccessful).forEach(log => {
      const error = log.errorMessage || 'Unknown error';
      errorsByType[error] = (errorsByType[error] || 0) + 1;
    });

    return {
      successRate,
      averageScansPerHour,
      topScannedItems,
      errorsByType,
    };
  }

  /**
   * Get time span in hours for a set of scan logs
   */
  private static getTimeSpanHours(logs: BarcodeLog[]): number {
    if (logs.length === 0) return 0;

    const dates = logs.map(log => log.createdAt.getTime()).sort();
    const earliest = dates[0];
    const latest = dates[dates.length - 1];

    return (latest - earliest) / (1000 * 60 * 60); // Convert to hours
  }

  /**
   * Generate scan efficiency report
   */
  static generateEfficiencyReport(
    logs: BarcodeLog[],
    periodDays: number = 30
  ): {
    totalScans: number;
    uniqueItems: number;
    averageScansPerItem: number;
    peakScanningHours: Array<{ hour: number; scanCount: number }>;
  } {
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - periodDays);

    const recentLogs = logs.filter(log => log.createdAt >= cutoffDate);
    const totalScans = recentLogs.length;
    
    const uniqueItems = new Set(recentLogs.map(log => log.itemId).filter(Boolean)).size;
    const averageScansPerItem = uniqueItems > 0 ? totalScans / uniqueItems : 0;

    // Analyze peak scanning hours
    const hourCounts = new Array(24).fill(0);
    recentLogs.forEach(log => {
      const hour = log.createdAt.getHours();
      hourCounts[hour]++;
    });

    const peakScanningHours = hourCounts
      .map((count, hour) => ({ hour, scanCount: count }))
      .sort((a, b) => b.scanCount - a.scanCount)
      .slice(0, 5);

    return {
      totalScans,
      uniqueItems,
      averageScansPerItem,
      peakScanningHours,
    };
  }
}

// Export singleton instances
export const scanSessionManager = new ScanSessionManager();
export const barcodeUtils = BarcodeUtils;
export const barcodeGenerator = BarcodeGenerator;
export const scanAnalytics = ScanAnalytics;