/**
 * Live Region Announcer Component
 * 
 * Provides live region announcements for screen readers to communicate
 * dynamic content changes and important updates.
 */

'use client';

import React from 'react';
import { cn } from '@/utils';

/**
 * Announcement priority levels
 */
export type AnnouncementPriority = 'polite' | 'assertive' | 'off';

/**
 * Announcement configuration
 */
export interface Announcement {
  id: string;
  message: string;
  priority: AnnouncementPriority;
  timestamp: number;
  duration?: number;
  persistent?: boolean;
}

/**
 * Announcer component props
 */
export interface AnnouncerProps {
  /** Live region politeness level */
  priority?: AnnouncementPriority;
  /** Whether to show announcements visually (for debugging) */
  visible?: boolean;
  /** Maximum number of announcements to keep in history */
  maxHistory?: number;
  /** Additional CSS classes */
  className?: string;
}

/**
 * Announcement context for managing global announcements
 */
export interface AnnouncerContextValue {
  announce: (message: string, priority?: AnnouncementPriority, duration?: number) => string;
  announceImmediate: (message: string, priority?: AnnouncementPriority) => void;
  clearAnnouncements: () => void;
  getHistory: () => Announcement[];
  isActive: boolean;
}

const AnnouncerContext = React.createContext<AnnouncerContextValue | null>(null);

/**
 * Hook to use the announcer context
 */
export const useAnnouncer = (): AnnouncerContextValue => {
  const context = React.useContext(AnnouncerContext);
  if (!context) {
    throw new Error('useAnnouncer must be used within an AnnouncerProvider');
  }
  return context;
};

/**
 * Individual Live Region Component
 */
const LiveRegion: React.FC<{
  priority: AnnouncementPriority;
  visible?: boolean;
  className?: string;
  children?: React.ReactNode;
}> = ({ priority, visible, className, children }) => {
  if (priority === 'off') {
    return null;
  }

  return (
    <div
      role={priority === 'assertive' ? 'alert' : 'status'}
      aria-live={priority}
      aria-atomic="true"
      aria-relevant="additions text"
      className={cn(
        // Screen reader only by default
        !visible && 'sr-only',
        // Visible styles for debugging
        visible && [
          'fixed bottom-4 right-4 z-50',
          'bg-background border rounded-lg p-4 shadow-lg',
          'max-w-sm text-sm',
          priority === 'assertive' && 'border-red-200 bg-red-50 text-red-900',
          priority === 'polite' && 'border-blue-200 bg-blue-50 text-blue-900',
        ],
        className
      )}
    >
      {children}
    </div>
  );
};

/**
 * Core Announcer Component
 */
export const Announcer: React.FC<AnnouncerProps> = ({
  priority = 'polite',
  visible = false,
  maxHistory = 50,
  className,
}) => {
  const [politeContent, setPoliteContent] = React.useState<string>('');
  const [assertiveContent, setAssertiveContent] = React.useState<string>('');
  const [history, setHistory] = React.useState<Announcement[]>([]);
  const timeoutRefs = React.useRef<Map<string, NodeJS.Timeout>>(new Map());
  const idCounter = React.useRef(0);

  /**
   * Generate unique announcement ID
   */
  const generateId = React.useCallback(() => {
    return `announcement-${++idCounter.current}-${Date.now()}`;
  }, []);

  /**
   * Add announcement to history
   */
  const addToHistory = React.useCallback((announcement: Announcement) => {
    setHistory(prev => {
      const updated = [announcement, ...prev];
      return updated.slice(0, maxHistory);
    });
  }, [maxHistory]);

  /**
   * Clear announcement after duration
   */
  const clearAnnouncementAfterDelay = React.useCallback((
    id: string,
    priority: AnnouncementPriority,
    duration: number
  ) => {
    const timeoutId = setTimeout(() => {
      if (priority === 'assertive') {
        setAssertiveContent('');
      } else if (priority === 'polite') {
        setPoliteContent('');
      }
      timeoutRefs.current.delete(id);
    }, duration);

    timeoutRefs.current.set(id, timeoutId);
  }, []);

  /**
   * Make an announcement
   */
  const announce = React.useCallback((
    message: string,
    announcementPriority: AnnouncementPriority = priority,
    duration = 3000
  ): string => {
    if (!message.trim() || announcementPriority === 'off') {
      return '';
    }

    const id = generateId();
    const announcement: Announcement = {
      id,
      message: message.trim(),
      priority: announcementPriority,
      timestamp: Date.now(),
      duration,
      persistent: duration === 0,
    };

    // Add to history
    addToHistory(announcement);

    // Clear previous content first (for better screen reader support)
    if (announcementPriority === 'assertive') {
      setAssertiveContent('');
      setTimeout(() => setAssertiveContent(message), 50);
    } else if (announcementPriority === 'polite') {
      setPoliteContent('');
      setTimeout(() => setPoliteContent(message), 50);
    }

    // Clear announcement after duration (if not persistent)
    if (duration > 0) {
      clearAnnouncementAfterDelay(id, announcementPriority, duration);
    }

    return id;
  }, [priority, generateId, addToHistory, clearAnnouncementAfterDelay]);

  /**
   * Make an immediate announcement (no delay)
   */
  const announceImmediate = React.useCallback((
    message: string,
    announcementPriority: AnnouncementPriority = priority
  ) => {
    if (!message.trim() || announcementPriority === 'off') {
      return;
    }

    if (announcementPriority === 'assertive') {
      setAssertiveContent(message);
    } else if (announcementPriority === 'polite') {
      setPoliteContent(message);
    }

    const announcement: Announcement = {
      id: generateId(),
      message: message.trim(),
      priority: announcementPriority,
      timestamp: Date.now(),
      duration: 0,
      persistent: true,
    };

    addToHistory(announcement);
  }, [priority, generateId, addToHistory]);

  /**
   * Clear all announcements
   */
  const clearAnnouncements = React.useCallback(() => {
    setPoliteContent('');
    setAssertiveContent('');
    
    // Clear all timeouts
    timeoutRefs.current.forEach(timeout => clearTimeout(timeout));
    timeoutRefs.current.clear();
  }, []);

  /**
   * Get announcement history
   */
  const getHistory = React.useCallback(() => {
    return [...history];
  }, [history]);

  // Cleanup timeouts on unmount
  React.useEffect(() => {
    return () => {
      timeoutRefs.current.forEach(timeout => clearTimeout(timeout));
    };
  }, []);

  return (
    <div className={cn('announcer-container', className)}>
      {/* Polite live region */}
      <LiveRegion
        priority="polite"
        visible={visible}
        className="polite-announcer"
      >
        {politeContent}
      </LiveRegion>

      {/* Assertive live region */}
      <LiveRegion
        priority="assertive"
        visible={visible}
        className="assertive-announcer"
      >
        {assertiveContent}
      </LiveRegion>

      {/* Status region for form feedback */}
      <div
        role="status"
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
        id="form-status-announcer"
      />

      {/* Log region for activity updates */}
      <div
        role="log"
        aria-live="polite"
        aria-atomic="false"
        className="sr-only"
        id="activity-log-announcer"
      />
    </div>
  );
};

/**
 * Announcer Provider Component
 */
export const AnnouncerProvider: React.FC<{
  maxHistory?: number;
  debugMode?: boolean;
  children: React.ReactNode;
}> = ({ maxHistory = 50, debugMode = false, children }) => {
  const announcerRef = React.useRef<{
    announce: (message: string, priority?: AnnouncementPriority, duration?: number) => string;
    announceImmediate: (message: string, priority?: AnnouncementPriority) => void;
    clearAnnouncements: () => void;
    getHistory: () => Announcement[];
  } | null>(null);

  const [history, setHistory] = React.useState<Announcement[]>([]);
  const [isActive, setIsActive] = React.useState(true);

  const contextValue: AnnouncerContextValue = React.useMemo(() => ({
    announce: (message: string, priority?: AnnouncementPriority, duration?: number) => {
      if (!isActive || !announcerRef.current) return '';
      return announcerRef.current.announce(message, priority, duration);
    },
    announceImmediate: (message: string, priority?: AnnouncementPriority) => {
      if (!isActive || !announcerRef.current) return;
      announcerRef.current.announceImmediate(message, priority);
    },
    clearAnnouncements: () => {
      if (!announcerRef.current) return;
      announcerRef.current.clearAnnouncements();
    },
    getHistory: () => {
      if (!announcerRef.current) return [];
      return announcerRef.current.getHistory();
    },
    isActive,
  }), [isActive]);

  return (
    <AnnouncerContext.Provider value={contextValue}>
      {children}
      <AnnouncerImpl
        ref={announcerRef}
        maxHistory={maxHistory}
        visible={debugMode}
        onHistoryChange={setHistory}
      />
    </AnnouncerContext.Provider>
  );
};

/**
 * Internal Announcer Implementation
 */
const AnnouncerImpl = React.forwardRef<{
  announce: (message: string, priority?: AnnouncementPriority, duration?: number) => string;
  announceImmediate: (message: string, priority?: AnnouncementPriority) => void;
  clearAnnouncements: () => void;
  getHistory: () => Announcement[];
}, {
  maxHistory: number;
  visible: boolean;
  onHistoryChange: (history: Announcement[]) => void;
}>(({ maxHistory, visible, onHistoryChange }, ref) => {
  const [politeContent, setPoliteContent] = React.useState('');
  const [assertiveContent, setAssertiveContent] = React.useState('');
  const [history, setHistory] = React.useState<Announcement[]>([]);
  const timeoutRefs = React.useRef<Map<string, NodeJS.Timeout>>(new Map());
  const idCounter = React.useRef(0);

  const generateId = () => `announcement-${++idCounter.current}-${Date.now()}`;

  const addToHistory = React.useCallback((announcement: Announcement) => {
    setHistory(prev => {
      const updated = [announcement, ...prev].slice(0, maxHistory);
      onHistoryChange(updated);
      return updated;
    });
  }, [maxHistory, onHistoryChange]);

  const announce = React.useCallback((
    message: string,
    priority: AnnouncementPriority = 'polite',
    duration = 3000
  ): string => {
    if (!message.trim() || priority === 'off') return '';

    const id = generateId();
    const announcement: Announcement = {
      id,
      message: message.trim(),
      priority,
      timestamp: Date.now(),
      duration,
      persistent: duration === 0,
    };

    addToHistory(announcement);

    if (priority === 'assertive') {
      setAssertiveContent('');
      setTimeout(() => setAssertiveContent(message), 50);
    } else if (priority === 'polite') {
      setPoliteContent('');
      setTimeout(() => setPoliteContent(message), 50);
    }

    if (duration > 0) {
      const timeoutId = setTimeout(() => {
        if (priority === 'assertive') {
          setAssertiveContent('');
        } else if (priority === 'polite') {
          setPoliteContent('');
        }
        timeoutRefs.current.delete(id);
      }, duration);
      timeoutRefs.current.set(id, timeoutId);
    }

    return id;
  }, [addToHistory]);

  const announceImmediate = React.useCallback((
    message: string,
    priority: AnnouncementPriority = 'polite'
  ) => {
    if (!message.trim() || priority === 'off') return;

    if (priority === 'assertive') {
      setAssertiveContent(message);
    } else if (priority === 'polite') {
      setPoliteContent(message);
    }

    const announcement: Announcement = {
      id: generateId(),
      message: message.trim(),
      priority,
      timestamp: Date.now(),
      duration: 0,
      persistent: true,
    };

    addToHistory(announcement);
  }, [addToHistory]);

  const clearAnnouncements = React.useCallback(() => {
    setPoliteContent('');
    setAssertiveContent('');
    timeoutRefs.current.forEach(timeout => clearTimeout(timeout));
    timeoutRefs.current.clear();
  }, []);

  const getHistory = React.useCallback(() => [...history], [history]);

  React.useImperativeHandle(ref, () => ({
    announce,
    announceImmediate,
    clearAnnouncements,
    getHistory,
  }), [announce, announceImmediate, clearAnnouncements, getHistory]);

  React.useEffect(() => {
    return () => {
      timeoutRefs.current.forEach(timeout => clearTimeout(timeout));
    };
  }, []);

  return (
    <>
      <LiveRegion priority="polite" visible={visible}>
        {politeContent}
      </LiveRegion>
      <LiveRegion priority="assertive" visible={visible}>
        {assertiveContent}
      </LiveRegion>
      <div role="status" aria-live="polite" aria-atomic="true" className="sr-only" />
      <div role="log" aria-live="polite" aria-atomic="false" className="sr-only" />
    </>
  );
});

AnnouncerImpl.displayName = 'AnnouncerImpl';

/**
 * Form Announcer Component
 * 
 * Specialized component for form validation announcements
 */
export const FormAnnouncer: React.FC<{
  errors?: Record<string, string>;
  success?: string;
  className?: string;
}> = ({ errors, success, className }) => {
  const { announce } = useAnnouncer();
  const prevErrorsRef = React.useRef<Record<string, string>>();

  // Announce form errors
  React.useEffect(() => {
    if (!errors) return;

    const currentErrors = Object.values(errors);
    const prevErrors = Object.values(prevErrorsRef.current || {});

    if (currentErrors.length > 0 && JSON.stringify(currentErrors) !== JSON.stringify(prevErrors)) {
      const message = currentErrors.length === 1 
        ? `Form error: ${currentErrors[0]}`
        : `Form has ${currentErrors.length} errors: ${currentErrors.join(', ')}`;
      
      announce(message, 'assertive', 5000);
    }

    prevErrorsRef.current = errors;
  }, [errors, announce]);

  // Announce success message
  React.useEffect(() => {
    if (success) {
      announce(success, 'polite', 3000);
    }
  }, [success, announce]);

  return (
    <div
      role="status"
      aria-live="polite"
      aria-atomic="true"
      className={cn('sr-only', className)}
      id="form-announcer"
    />
  );
};

/**
 * Loading Announcer Component
 * 
 * Specialized component for loading state announcements
 */
export const LoadingAnnouncer: React.FC<{
  isLoading?: boolean;
  loadingMessage?: string;
  completeMessage?: string;
  className?: string;
}> = ({
  isLoading,
  loadingMessage = 'Loading',
  completeMessage = 'Loading complete',
  className,
}) => {
  const { announce } = useAnnouncer();
  const prevLoadingRef = React.useRef<boolean>();

  React.useEffect(() => {
    if (isLoading !== prevLoadingRef.current) {
      if (isLoading) {
        announce(loadingMessage, 'polite', 0);
      } else if (prevLoadingRef.current) {
        announce(completeMessage, 'polite');
      }
      prevLoadingRef.current = isLoading;
    }
  }, [isLoading, loadingMessage, completeMessage, announce]);

  return (
    <div
      role="status"
      aria-live="polite"
      aria-atomic="true"
      className={cn('sr-only', className)}
      id="loading-announcer"
    />
  );
};

/**
 * Route Change Announcer Component
 * 
 * Announces navigation changes for single-page applications
 */
export const RouteChangeAnnouncer: React.FC<{
  currentPath?: string;
  pageTitle?: string;
  className?: string;
}> = ({ currentPath, pageTitle, className }) => {
  const { announce } = useAnnouncer();
  const prevPathRef = React.useRef<string>();

  React.useEffect(() => {
    if (currentPath && currentPath !== prevPathRef.current) {
      const message = pageTitle 
        ? `Navigated to ${pageTitle}`
        : `Page changed to ${currentPath}`;
      
      announce(message, 'assertive', 2000);
      prevPathRef.current = currentPath;
    }
  }, [currentPath, pageTitle, announce]);

  return (
    <div
      role="status"
      aria-live="assertive"
      aria-atomic="true"
      className={cn('sr-only', className)}
      id="route-announcer"
    />
  );
};

/**
 * Utility hook for common announcements
 */
export const useCommonAnnouncements = () => {
  const { announce } = useAnnouncer();

  return React.useMemo(() => ({
    announceSuccess: (message: string) => announce(`Success: ${message}`, 'polite'),
    announceError: (message: string) => announce(`Error: ${message}`, 'assertive'),
    announceWarning: (message: string) => announce(`Warning: ${message}`, 'polite'),
    announceInfo: (message: string) => announce(message, 'polite'),
    announceNavigation: (destination: string) => announce(`Navigated to ${destination}`, 'assertive'),
    announceAction: (action: string) => announce(action, 'polite'),
  }), [announce]);
};

// Export default as AnnouncerProvider
export default AnnouncerProvider;