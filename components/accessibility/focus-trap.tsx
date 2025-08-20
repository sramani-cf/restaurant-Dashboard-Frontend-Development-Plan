/**
 * Focus Trap Component
 * 
 * Provides focus trapping for modals, dialogs, and other overlay components
 * to ensure WCAG 2.1 AA compliance and proper keyboard navigation.
 */

'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { FocusTrap as FocusTrapUtil, FocusManager } from '@/lib/accessibility/keyboard';

/**
 * Focus trap configuration
 */
export interface FocusTrapConfig {
  /** Automatically focus first element on mount */
  autoFocus?: boolean;
  /** Restore focus when trap is deactivated */
  restoreFocus?: boolean;
  /** Prevent scrolling on elements outside the trap */
  preventScroll?: boolean;
  /** Set aria-hidden on sibling elements */
  hideOthers?: boolean;
  /** Initial element to focus (selector or element) */
  initialFocus?: string | HTMLElement;
  /** Fallback element to focus if initialFocus is not found */
  fallbackFocus?: string | HTMLElement;
  /** Elements to include in the focus trap even if outside container */
  additionalElements?: string | HTMLElement[];
}

/**
 * Focus trap component props
 */
export interface FocusTrapProps {
  /** Whether the focus trap is active */
  active: boolean;
  /** Focus trap configuration */
  config?: FocusTrapConfig;
  /** Additional CSS classes */
  className?: string;
  /** Component children */
  children: React.ReactNode;
  /** Callback when trap is activated */
  onActivate?: () => void;
  /** Callback when trap is deactivated */
  onDeactivate?: () => void;
  /** Callback when focus moves outside trap (escape attempt) */
  onEscapeAttempt?: () => void;
}

/**
 * Focus trap hook for managing focus behavior
 */
export const useFocusTrap = (config: FocusTrapConfig = {}) => {
  const containerRef = React.useRef<HTMLElement>(null);
  const focusTrapRef = React.useRef<FocusTrapUtil | null>(null);
  const focusManagerRef = React.useRef<FocusManager>(new FocusManager());
  const previousActiveElement = React.useRef<HTMLElement | null>(null);
  const additionalElementsRef = React.useRef<HTMLElement[]>([]);

  const {
    autoFocus = true,
    restoreFocus = true,
    preventScroll = true,
    hideOthers = true,
    initialFocus,
    fallbackFocus,
    additionalElements,
  } = config;

  /**
   * Activate focus trap
   */
  const activate = React.useCallback(() => {
    const container = containerRef.current;
    if (!container) return false;

    try {
      // Store current active element for restoration
      previousActiveElement.current = document.activeElement as HTMLElement;

      // Create focus trap
      focusTrapRef.current = new FocusTrapUtil(container, focusManagerRef.current);
      
      // Process additional elements
      if (additionalElements) {
        const elements = typeof additionalElements === 'string' 
          ? Array.from(document.querySelectorAll(additionalElements)) as HTMLElement[]
          : Array.isArray(additionalElements) 
            ? additionalElements 
            : [additionalElements];
        
        additionalElementsRef.current = elements;
      }

      // Activate trap
      focusTrapRef.current.activate();

      // Handle initial focus
      if (autoFocus) {
        requestAnimationFrame(() => {
          let targetElement: HTMLElement | null = null;

          // Try initial focus element
          if (initialFocus) {
            if (typeof initialFocus === 'string') {
              targetElement = container.querySelector(initialFocus);
            } else {
              targetElement = initialFocus;
            }
          }

          // Try fallback focus element
          if (!targetElement && fallbackFocus) {
            if (typeof fallbackFocus === 'string') {
              targetElement = container.querySelector(fallbackFocus);
            } else {
              targetElement = fallbackFocus;
            }
          }

          // Use first focusable element as final fallback
          if (!targetElement) {
            const focusableElements = focusManagerRef.current.getFocusableElements(container);
            targetElement = focusableElements[0] || container;
          }

          if (targetElement) {
            targetElement.focus();
          }
        });
      }

      // Handle scroll prevention
      if (preventScroll) {
        document.body.style.overflow = 'hidden';
      }

      return true;
    } catch (error) {
      console.error('Failed to activate focus trap:', error);
      return false;
    }
  }, [autoFocus, initialFocus, fallbackFocus, additionalElements, preventScroll]);

  /**
   * Deactivate focus trap
   */
  const deactivate = React.useCallback(() => {
    try {
      // Deactivate trap
      if (focusTrapRef.current) {
        focusTrapRef.current.deactivate();
        focusTrapRef.current = null;
      }

      // Restore focus
      if (restoreFocus && previousActiveElement.current) {
        if (document.contains(previousActiveElement.current)) {
          previousActiveElement.current.focus();
        }
        previousActiveElement.current = null;
      }

      // Restore scroll
      if (preventScroll) {
        document.body.style.overflow = '';
      }

      // Clear additional elements
      additionalElementsRef.current = [];

      return true;
    } catch (error) {
      console.error('Failed to deactivate focus trap:', error);
      return false;
    }
  }, [restoreFocus, preventScroll]);

  /**
   * Check if focus is within trap
   */
  const isActive = React.useCallback(() => {
    return !!focusTrapRef.current;
  }, []);

  /**
   * Get focusable elements in trap
   */
  const getFocusableElements = React.useCallback(() => {
    const container = containerRef.current;
    if (!container) return [];
    
    return focusManagerRef.current.getFocusableElements(container);
  }, []);

  return {
    containerRef,
    activate,
    deactivate,
    isActive,
    getFocusableElements,
  };
};

/**
 * Focus Trap Component
 */
export const FocusTrap: React.FC<FocusTrapProps> = ({
  active,
  config = {},
  className,
  children,
  onActivate,
  onDeactivate,
  onEscapeAttempt,
}) => {
  const {
    containerRef,
    activate,
    deactivate,
    isActive,
  } = useFocusTrap(config);

  // Handle active state changes
  React.useEffect(() => {
    if (active && !isActive()) {
      const success = activate();
      if (success && onActivate) {
        onActivate();
      }
    } else if (!active && isActive()) {
      const success = deactivate();
      if (success && onDeactivate) {
        onDeactivate();
      }
    }
  }, [active, activate, deactivate, isActive, onActivate, onDeactivate]);

  // Handle escape key
  React.useEffect(() => {
    if (!active) return;

    const handleKeydown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        event.stopPropagation();
        
        if (onEscapeAttempt) {
          onEscapeAttempt();
        } else {
          deactivate();
        }
      }
    };

    document.addEventListener('keydown', handleKeydown, true);
    return () => document.removeEventListener('keydown', handleKeydown, true);
  }, [active, onEscapeAttempt, deactivate]);

  // Cleanup on unmount
  React.useEffect(() => {
    return () => {
      if (isActive()) {
        deactivate();
      }
    };
  }, [deactivate, isActive]);

  return (
    <div
      ref={containerRef}
      className={cn(
        'focus-trap',
        active && 'focus-trap-active',
        className
      )}
      data-focus-trap={active ? 'true' : 'false'}
    >
      {children}
    </div>
  );
};

/**
 * Modal Focus Trap Component
 * 
 * Pre-configured focus trap specifically for modal dialogs
 */
export const ModalFocusTrap: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  className?: string;
  children: React.ReactNode;
}> = ({
  isOpen,
  onClose,
  title,
  description,
  className,
  children,
}) => {
  const titleId = React.useId();
  const descriptionId = React.useId();

  return (
    <FocusTrap
      active={isOpen}
      config={{
        autoFocus: true,
        restoreFocus: true,
        preventScroll: true,
        hideOthers: true,
        initialFocus: '[data-modal-close], button',
        fallbackFocus: '[tabindex="0"], button, input, select, textarea, [href]',
      }}
      onEscapeAttempt={onClose}
      className={cn('modal-focus-trap', className)}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? titleId : undefined}
        aria-describedby={description ? descriptionId : undefined}
        className={cn(
          'fixed inset-0 z-50 flex items-center justify-center',
          'bg-black/50 backdrop-blur-sm',
          isOpen ? 'visible opacity-100' : 'invisible opacity-0',
          'transition-all duration-200'
        )}
        onClick={(e) => e.target === e.currentTarget && onClose()}
      >
        <div
          className={cn(
            'bg-background rounded-lg shadow-xl border',
            'max-w-lg w-full max-h-[90vh] overflow-auto',
            'mx-4 p-6',
            'focus:outline-none',
            isOpen ? 'scale-100' : 'scale-95',
            'transition-transform duration-200'
          )}
          tabIndex={-1}
        >
          {title && (
            <h2
              id={titleId}
              className="text-xl font-semibold mb-4"
            >
              {title}
            </h2>
          )}
          
          {description && (
            <p
              id={descriptionId}
              className="text-muted-foreground mb-4"
            >
              {description}
            </p>
          )}
          
          {children}
          
          {/* Close button for keyboard users */}
          <button
            data-modal-close
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-md hover:bg-muted focus:outline-none focus:ring-2 focus:ring-ring sr-only focus:not-sr-only"
            aria-label="Close dialog"
          >
            <span aria-hidden="true">×</span>
          </button>
        </div>
      </div>
    </FocusTrap>
  );
};

/**
 * Drawer Focus Trap Component
 * 
 * Pre-configured focus trap for drawer/sidebar components
 */
export const DrawerFocusTrap: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  side?: 'left' | 'right' | 'top' | 'bottom';
  className?: string;
  children: React.ReactNode;
}> = ({
  isOpen,
  onClose,
  side = 'right',
  className,
  children,
}) => {
  return (
    <FocusTrap
      active={isOpen}
      config={{
        autoFocus: true,
        restoreFocus: true,
        preventScroll: true,
        hideOthers: true,
        initialFocus: 'button, [href], input, select, textarea, [tabindex="0"]',
      }}
      onEscapeAttempt={onClose}
      className={cn('drawer-focus-trap', className)}
    >
      <div
        className={cn(
          'fixed inset-0 z-50',
          isOpen ? 'visible' : 'invisible'
        )}
      >
        {/* Backdrop */}
        <div
          className={cn(
            'absolute inset-0 bg-black/50 backdrop-blur-sm',
            isOpen ? 'opacity-100' : 'opacity-0',
            'transition-opacity duration-300'
          )}
          onClick={onClose}
        />
        
        {/* Drawer */}
        <div
          role="dialog"
          aria-modal="true"
          className={cn(
            'absolute bg-background shadow-xl border',
            'transition-transform duration-300',
            // Position based on side
            side === 'left' && [
              'left-0 top-0 bottom-0 w-80 max-w-[80vw]',
              isOpen ? 'translate-x-0' : '-translate-x-full'
            ],
            side === 'right' && [
              'right-0 top-0 bottom-0 w-80 max-w-[80vw]',
              isOpen ? 'translate-x-0' : 'translate-x-full'
            ],
            side === 'top' && [
              'top-0 left-0 right-0 h-80 max-h-[80vh]',
              isOpen ? 'translate-y-0' : '-translate-y-full'
            ],
            side === 'bottom' && [
              'bottom-0 left-0 right-0 h-80 max-h-[80vh]',
              isOpen ? 'translate-y-0' : 'translate-y-full'
            ]
          )}
          tabIndex={-1}
        >
          <div className="p-6 h-full overflow-auto">
            {children}
            
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-md hover:bg-muted focus:outline-none focus:ring-2 focus:ring-ring"
              aria-label="Close drawer"
            >
              <span aria-hidden="true">×</span>
            </button>
          </div>
        </div>
      </div>
    </FocusTrap>
  );
};

/**
 * Popover Focus Trap Component
 * 
 * Pre-configured focus trap for popover components
 */
export const PopoverFocusTrap: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  trigger?: HTMLElement | null;
  className?: string;
  children: React.ReactNode;
}> = ({
  isOpen,
  onClose,
  trigger,
  className,
  children,
}) => {
  const popoverRef = React.useRef<HTMLDivElement>(null);

  // Position popover relative to trigger
  React.useEffect(() => {
    if (!isOpen || !trigger || !popoverRef.current) return;

    const updatePosition = () => {
      const triggerRect = trigger.getBoundingClientRect();
      const popoverElement = popoverRef.current;
      
      if (popoverElement) {
        popoverElement.style.top = `${triggerRect.bottom + 8}px`;
        popoverElement.style.left = `${triggerRect.left}px`;
      }
    };

    updatePosition();
    window.addEventListener('resize', updatePosition);
    window.addEventListener('scroll', updatePosition);

    return () => {
      window.removeEventListener('resize', updatePosition);
      window.removeEventListener('scroll', updatePosition);
    };
  }, [isOpen, trigger]);

  return (
    <FocusTrap
      active={isOpen}
      config={{
        autoFocus: true,
        restoreFocus: true,
        preventScroll: false,
        hideOthers: false,
      }}
      onEscapeAttempt={onClose}
      className={cn('popover-focus-trap', className)}
    >
      <div
        ref={popoverRef}
        role="dialog"
        aria-modal="false"
        className={cn(
          'fixed z-50 bg-background rounded-md shadow-lg border p-4',
          'min-w-48 max-w-sm',
          isOpen ? 'visible opacity-100 scale-100' : 'invisible opacity-0 scale-95',
          'transition-all duration-200'
        )}
        tabIndex={-1}
      >
        {children}
      </div>
    </FocusTrap>
  );
};

/**
 * Focus Guard Component
 * 
 * Invisible elements that help manage focus in complex layouts
 */
export const FocusGuard: React.FC<{
  onFocus?: () => void;
  className?: string;
}> = ({ onFocus, className }) => {
  return (
    <div
      tabIndex={-1}
      onFocus={onFocus}
      className={cn('focus-guard sr-only', className)}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: 1,
        height: 1,
        padding: 0,
        margin: 0,
        border: 0,
        clip: 'rect(0 0 0 0)',
      }}
    />
  );
};

/**
 * Focus Lock Component
 * 
 * Alternative implementation using react-focus-lock
 */
export const FocusLock: React.FC<{
  disabled?: boolean;
  autoFocus?: boolean;
  restoreFocus?: boolean;
  className?: string;
  children: React.ReactNode;
}> = ({
  disabled = false,
  autoFocus = true,
  restoreFocus = true,
  className,
  children,
}) => {
  // This would use react-focus-lock if available
  // For now, we'll use our custom implementation
  return (
    <FocusTrap
      active={!disabled}
      config={{
        autoFocus,
        restoreFocus,
        preventScroll: false,
        hideOthers: false,
      }}
      className={className}
    >
      {children}
    </FocusTrap>
  );
};

// Export default as FocusTrap
export default FocusTrap;