// lib/index.ts
// Centralized exports for lib utilities

// Accessibility exports
export * from './accessibility';
export * from './accessibility/aria';
export * from './accessibility/contrast';
export * from './accessibility/keyboard';
export * from './accessibility/screen-reader';

// Analytics exports
export * from './analytics/cache';
export * from './analytics/calculations';
export * from './analytics/data';
export * from './analytics/export';
export * from './analytics/types';

// Dashboard exports
export * from './dashboard/data';
export * from './dashboard/utils';

// Inventory exports
export * from './inventory/barcode';
export * from './inventory/calculations';
export * from './inventory/data';
export * from './inventory/types';

// KDS exports
export * from './kds/data';
export * from './kds/stations';
export * from './kds/types';
export * from './kds/utils';

// Menu exports
export * from './menu/data';
export * from './menu/types';
export * from './menu/utils';

// Monitoring exports
export * from './monitoring/analytics';
export * from './monitoring/sentry';

// Orders exports
export * from './orders/data';
export * from './orders/types';

// Performance exports
export * from './performance/cache';
export * from './performance/lazy-components';
export * from './performance/monitoring';

// POS exports
export * from './pos/data';
export * from './pos/offline-storage';
export * from './pos/types';

// Reservations exports
export * from './reservations/data';
export * from './reservations/sms';
export * from './reservations/types';
export * from './reservations/utils';

// Security exports
export * from './security/csrf';
export * from './security/csrf-edge';
export * from './security/encryption';
export * from './security/headers';
export * from './security/rate-limit';
export * from './security/sanitization';
export * from './security/session';
export * from './security/session-edge';
export * from './security/validation';

// Settings exports
export * from './settings/data';
export * from './settings/permissions';
export * from './settings/types';
export * from './settings/validation';