/**
 * Accessibility Hooks
 * 
 * Custom React hooks for managing accessibility features and WCAG compliance
 */

'use client';

import React from 'react';
import {
  AccessibilityManager,
  getAccessibilityManager,
  initializeAccessibility,
  AccessibilityConfig,
} from '@/lib/accessibility';
import { FocusManager, KeyboardNavigationManager } from '@/lib/accessibility/keyboard';
import { ColorContrastValidator, ContrastIssue } from '@/lib/accessibility/contrast';
import { ScreenReaderUtilities } from '@/lib/accessibility/screen-reader';

/**
 * Accessibility preferences interface
 */
export interface AccessibilityPreferences {
  reduceMotion: boolean;
  highContrast: boolean;
  focusRings: boolean;
  screenReaderLevel: 'minimal' | 'moderate' | 'verbose';
  keyboardMode: 'standard' | 'enhanced';
  contrastLevel: 'AA' | 'AAA';
  fontSize: 'small' | 'medium' | 'large' | 'extra-large';
  colorScheme: 'light' | 'dark' | 'auto';
}

/**
 * Media query preferences
 */
export interface MediaPreferences {
  prefersReducedMotion: boolean;
  prefersHighContrast: boolean;
  prefersDarkMode: boolean;
  prefersLargeText: boolean;
}

/**
 * Main accessibility hook
 */
export const useAccessibility = (config?: AccessibilityConfig) => {
  const [manager, setManager] = React.useState<AccessibilityManager | null>(null);
  const [isInitialized, setIsInitialized] = React.useState(false);

  // Initialize accessibility manager
  React.useEffect(() => {
    const accessibilityManager = initializeAccessibility(config);
    setManager(accessibilityManager);
    setIsInitialized(true);

    return () => {
      accessibilityManager.destroy();
    };
  }, [config]);

  // Get manager instances
  const managers = React.useMemo(() => {
    if (!manager) return null;
    return manager.getManagers();
  }, [manager]);

  return {
    manager,
    managers,
    isInitialized,
    config: manager?.getConfig(),
    updateConfig: (newConfig: Partial<AccessibilityConfig>) => {
      manager?.updateConfig(newConfig);
    },
  };
};

/**
 * Hook for managing accessibility preferences
 */
export const useAccessibilityPreferences = () => {
  const [preferences, setPreferences] = React.useState<AccessibilityPreferences>(() => {
    if (typeof window === 'undefined') {
      return {
        reduceMotion: false,
        highContrast: false,
        focusRings: true,
        screenReaderLevel: 'moderate',
        keyboardMode: 'standard',
        contrastLevel: 'AA',
        fontSize: 'medium',
        colorScheme: 'auto',
      };
    }

    // Load from localStorage or use defaults
    const stored = localStorage.getItem('accessibility-preferences');
    if (stored) {
      try {
        return { ...JSON.parse(stored) };
      } catch {
        // Fall through to defaults
      }
    }

    // Detect system preferences
    return {
      reduceMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches,
      highContrast: window.matchMedia('(prefers-contrast: high)').matches,
      focusRings: true,
      screenReaderLevel: 'moderate',
      keyboardMode: 'standard',
      contrastLevel: 'AA',
      fontSize: 'medium',
      colorScheme: window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light',
    };
  });

  // Update preference
  const updatePreference = React.useCallback(<K extends keyof AccessibilityPreferences>(
    key: K,
    value: AccessibilityPreferences[K]
  ) => {
    setPreferences(prev => {
      const updated = { ...prev, [key]: value };
      
      // Save to localStorage
      if (typeof window !== 'undefined') {
        localStorage.setItem('accessibility-preferences', JSON.stringify(updated));
      }
      
      return updated;
    });
  }, []);

  // Update multiple preferences
  const updatePreferences = React.useCallback((updates: Partial<AccessibilityPreferences>) => {
    setPreferences(prev => {
      const updated = { ...prev, ...updates };
      
      // Save to localStorage
      if (typeof window !== 'undefined') {
        localStorage.setItem('accessibility-preferences', JSON.stringify(updated));
      }
      
      return updated;
    });
  }, []);

  // Reset to defaults
  const resetPreferences = React.useCallback(() => {
    const defaults: AccessibilityPreferences = {
      reduceMotion: false,
      highContrast: false,
      focusRings: true,
      screenReaderLevel: 'moderate',
      keyboardMode: 'standard',
      contrastLevel: 'AA',
      fontSize: 'medium',
      colorScheme: 'auto',
    };
    
    setPreferences(defaults);
    
    if (typeof window !== 'undefined') {
      localStorage.removeItem('accessibility-preferences');
    }
  }, []);

  return {
    preferences,
    updatePreference,
    updatePreferences,
    resetPreferences,
  };
};

/**
 * Hook for detecting media query preferences
 */
export const useMediaPreferences = () => {
  const [preferences, setPreferences] = React.useState<MediaPreferences>(() => {
    if (typeof window === 'undefined') {
      return {
        prefersReducedMotion: false,
        prefersHighContrast: false,
        prefersDarkMode: false,
        prefersLargeText: false,
      };
    }

    return {
      prefersReducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches,
      prefersHighContrast: window.matchMedia('(prefers-contrast: high)').matches,
      prefersDarkMode: window.matchMedia('(prefers-color-scheme: dark)').matches,
      prefersLargeText: window.matchMedia('(min-resolution: 120dpi)').matches, // Approximate
    };
  });

  React.useEffect(() => {
    if (typeof window === 'undefined') return;

    const queries = {
      prefersReducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)'),
      prefersHighContrast: window.matchMedia('(prefers-contrast: high)'),
      prefersDarkMode: window.matchMedia('(prefers-color-scheme: dark)'),
      prefersLargeText: window.matchMedia('(min-resolution: 120dpi)'),
    };

    const updatePreferences = () => {
      setPreferences({
        prefersReducedMotion: queries.prefersReducedMotion.matches,
        prefersHighContrast: queries.prefersHighContrast.matches,
        prefersDarkMode: queries.prefersDarkMode.matches,
        prefersLargeText: queries.prefersLargeText.matches,
      });
    };

    // Add listeners
    Object.values(queries).forEach(query => {
      query.addListener(updatePreferences);
    });

    return () => {
      // Remove listeners
      Object.values(queries).forEach(query => {
        query.removeListener(updatePreferences);
      });
    };
  }, []);

  return preferences;
};

/**
 * Hook for focus management
 */
export const useFocusManagement = () => {
  const [focusManager] = React.useState(() => new FocusManager());

  return {
    saveFocus: focusManager.saveFocus.bind(focusManager),
    restoreFocus: focusManager.restoreFocus.bind(focusManager),
    focusFirst: focusManager.focusFirst.bind(focusManager),
    focusLast: focusManager.focusLast.bind(focusManager),
    focusNext: focusManager.focusNext.bind(focusManager),
    focusPrevious: focusManager.focusPrevious.bind(focusManager),
    getFocusableElements: focusManager.getFocusableElements.bind(focusManager),
    isElementFocusable: focusManager.isElementFocusable.bind(focusManager),
    getHistory: focusManager.getHistory.bind(focusManager),
    clearHistory: focusManager.clearHistory.bind(focusManager),
  };
};

/**
 * Hook for focus trap functionality
 */
export const useFocusTrap = (containerRef: React.RefObject<HTMLElement>) => {
  const [keyboardManager] = React.useState(() => new KeyboardNavigationManager());
  const [isActive, setIsActive] = React.useState(false);
  const cleanupRef = React.useRef<(() => void) | null>(null);

  const activate = React.useCallback(() => {
    if (!containerRef.current || isActive) return false;

    try {
      const cleanup = keyboardManager.trapFocus(containerRef.current);
      cleanupRef.current = cleanup;
      setIsActive(true);
      return true;
    } catch (error) {
      console.error('Failed to activate focus trap:', error);
      return false;
    }
  }, [containerRef, keyboardManager, isActive]);

  const deactivate = React.useCallback(() => {
    if (!isActive) return;

    if (cleanupRef.current) {
      cleanupRef.current();
      cleanupRef.current = null;
    }
    setIsActive(false);
  }, [isActive]);

  // Cleanup on unmount
  React.useEffect(() => {
    return () => {
      if (cleanupRef.current) {
        cleanupRef.current();
      }
    };
  }, []);

  return {
    activate,
    deactivate,
    isActive,
  };
};

/**
 * Hook for color contrast validation
 */
export const useColorContrast = (level: 'AA' | 'AAA' = 'AA') => {
  const [validator] = React.useState(() => new ColorContrastValidator(level));
  const [issues, setIssues] = React.useState<ContrastIssue[]>([]);

  const validateElement = React.useCallback(async (element: HTMLElement) => {
    const result = await validator.validateElement(element);
    return result;
  }, [validator]);

  const validateContainer = React.useCallback(async (container: HTMLElement = document.body) => {
    const result = await validator.validateContainer(container);
    setIssues(result);
    return result;
  }, [validator]);

  const checkContrast = React.useCallback((foreground: string, background: string, textSize?: 'normal' | 'large') => {
    return validator.checkContrast(foreground, background, textSize);
  }, [validator]);

  const calculateRatio = React.useCallback((color1: string, color2: string) => {
    return validator.calculateContrastRatio(color1, color2);
  }, [validator]);

  const autoFix = React.useCallback(async (element: HTMLElement) => {
    return validator.autoFixContrast(element);
  }, [validator]);

  return {
    issues,
    validateElement,
    validateContainer,
    checkContrast,
    calculateRatio,
    autoFix,
    setLevel: validator.setComplianceLevel.bind(validator),
  };
};

/**
 * Hook for screen reader utilities
 */
export const useScreenReader = (verbosity: 'minimal' | 'moderate' | 'verbose' = 'moderate') => {
  const [screenReader] = React.useState(() => new ScreenReaderUtilities(verbosity));
  const [isInitialized, setIsInitialized] = React.useState(false);

  React.useEffect(() => {
    screenReader.initialize();
    setIsInitialized(true);

    return () => {
      screenReader.destroy();
    };
  }, [screenReader]);

  return {
    isInitialized,
    announce: screenReader.announce.bind(screenReader),
    announcePageChange: screenReader.announcePageChange.bind(screenReader),
    announceFormErrors: screenReader.announceFormErrors.bind(screenReader),
    announceLoading: screenReader.announceLoading.bind(screenReader),
    announceFocusChange: screenReader.announceFocusChange.bind(screenReader),
    announceTableNavigation: screenReader.announceTableNavigation.bind(screenReader),
    announceListNavigation: screenReader.announceListNavigation.bind(screenReader),
    announceMenuNavigation: screenReader.announceMenuNavigation.bind(screenReader),
    optimizeContent: screenReader.optimizeContent.bind(screenReader),
    createSROnlyContent: screenReader.createSROnlyContent.bind(screenReader),
    generateTableSummary: screenReader.generateTableSummary.bind(screenReader),
    generateFormSummary: screenReader.generateFormSummary.bind(screenReader),
    setVerbosity: screenReader.setVerbosity.bind(screenReader),
  };
};

/**
 * Hook for keyboard navigation
 */
export const useKeyboardNavigation = () => {
  const [keyboardManager] = React.useState(() => new KeyboardNavigationManager());
  const [isInitialized, setIsInitialized] = React.useState(false);

  React.useEffect(() => {
    keyboardManager.initialize();
    setIsInitialized(true);

    return () => {
      keyboardManager.destroy();
    };
  }, [keyboardManager]);

  return {
    isInitialized,
    trapFocus: keyboardManager.trapFocus.bind(keyboardManager),
    createRovingTabindex: keyboardManager.createRovingTabindex.bind(keyboardManager),
    saveFocus: keyboardManager.saveFocus.bind(keyboardManager),
    restoreFocus: keyboardManager.restoreFocus.bind(keyboardManager),
    getFocusManager: keyboardManager.getFocusManager.bind(keyboardManager),
    validateElement: keyboardManager.validateElement.bind(keyboardManager),
  };
};

/**
 * Hook for accessibility testing
 */
export const useAccessibilityTest = () => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [results, setResults] = React.useState<any>(null);

  const runAudit = React.useCallback(async (container?: HTMLElement) => {
    if (typeof window === 'undefined') return;

    setIsLoading(true);
    
    try {
      // Use axe-core if available
      if (typeof (window as any).axe !== 'undefined') {
        const axe = (window as any).axe;
        const results = await axe.run(container || document);
        setResults(results);
        return results;
      } else {
        // Fallback to our own testing
        const manager = getAccessibilityManager();
        const element = container || document.body;
        const result = await manager.auditElement(element);
        setResults(result);
        return result;
      }
    } catch (error) {
      console.error('Accessibility audit failed:', error);
      setResults({ error: error.message });
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    runAudit,
    isLoading,
    results,
    clearResults: () => setResults(null),
  };
};

/**
 * Hook for managing ARIA attributes
 */
export const useAriaAttributes = (elementRef: React.RefObject<HTMLElement>) => {
  const setAttribute = React.useCallback((attribute: string, value: string | boolean | number) => {
    if (!elementRef.current) return false;
    
    const manager = getAccessibilityManager();
    return manager.getManagers().aria.setAttribute(elementRef.current, attribute, value);
  }, [elementRef]);

  const removeAttribute = React.useCallback((attribute: string) => {
    if (!elementRef.current) return;
    
    const manager = getAccessibilityManager();
    manager.getManagers().aria.removeAttribute(elementRef.current, attribute);
  }, [elementRef]);

  const setRole = React.useCallback((role: string) => {
    if (!elementRef.current) return false;
    
    const manager = getAccessibilityManager();
    return manager.getManagers().aria.setRole(elementRef.current, role);
  }, [elementRef]);

  const ensureId = React.useCallback((prefix = 'aria') => {
    if (!elementRef.current) return '';
    
    const manager = getAccessibilityManager();
    return manager.getManagers().aria.ensureId(elementRef.current, prefix);
  }, [elementRef]);

  const createLabel = React.useCallback((labelText: string, labelId?: string) => {
    if (!elementRef.current) return null;
    
    const manager = getAccessibilityManager();
    return manager.getManagers().aria.createLabel(elementRef.current, labelText, labelId);
  }, [elementRef]);

  const createDescription = React.useCallback((descriptionText: string, descriptionId?: string) => {
    if (!elementRef.current) return null;
    
    const manager = getAccessibilityManager();
    return manager.getManagers().aria.createDescription(elementRef.current, descriptionText, descriptionId);
  }, [elementRef]);

  return {
    setAttribute,
    removeAttribute,
    setRole,
    ensureId,
    createLabel,
    createDescription,
  };
};

/**
 * Hook for live regions and announcements
 */
export const useLiveRegion = (regionType: 'polite' | 'assertive' | 'status' = 'polite') => {
  const [regionElement, setRegionElement] = React.useState<HTMLElement | null>(null);

  React.useEffect(() => {
    // Create live region
    const element = document.createElement('div');
    
    if (regionType === 'status') {
      element.setAttribute('role', 'status');
      element.setAttribute('aria-live', 'polite');
    } else {
      element.setAttribute('aria-live', regionType);
    }
    
    element.setAttribute('aria-atomic', 'true');
    element.className = 'sr-only';
    
    document.body.appendChild(element);
    setRegionElement(element);

    return () => {
      if (element.parentNode) {
        element.parentNode.removeChild(element);
      }
    };
  }, [regionType]);

  const announce = React.useCallback((message: string, clearAfter = 3000) => {
    if (!regionElement || !message.trim()) return;

    // Clear previous message
    regionElement.textContent = '';

    // Set new message after a brief delay (for better screen reader support)
    setTimeout(() => {
      regionElement.textContent = message;
    }, 50);

    // Clear after specified time
    if (clearAfter > 0) {
      setTimeout(() => {
        regionElement.textContent = '';
      }, clearAfter);
    }
  }, [regionElement]);

  return { announce, regionElement };
};

/**
 * Hook for managing reduced motion preference
 */
export const useReducedMotion = () => {
  const [prefersReducedMotion, setPrefersReducedMotion] = React.useState(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  });

  React.useEffect(() => {
    if (typeof window === 'undefined') return;

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    
    const handleChange = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches);
    };

    mediaQuery.addListener(handleChange);
    
    return () => {
      mediaQuery.removeListener(handleChange);
    };
  }, []);

  return {
    prefersReducedMotion,
    shouldAnimate: !prefersReducedMotion,
  };
};

/**
 * Hook for managing high contrast preference
 */
export const useHighContrast = () => {
  const [prefersHighContrast, setPrefersHighContrast] = React.useState(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(prefers-contrast: high)').matches;
  });

  React.useEffect(() => {
    if (typeof window === 'undefined') return;

    const mediaQuery = window.matchMedia('(prefers-contrast: high)');
    
    const handleChange = (event: MediaQueryListEvent) => {
      setPrefersHighContrast(event.matches);
    };

    mediaQuery.addListener(handleChange);
    
    return () => {
      mediaQuery.removeListener(handleChange);
    };
  }, []);

  return {
    prefersHighContrast,
  };
};

/**
 * Hook for element visibility (for lazy loading accessibility features)
 */
export const useElementVisibility = (elementRef: React.RefObject<HTMLElement>) => {
  const [isVisible, setIsVisible] = React.useState(false);

  React.useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, [elementRef]);

  return isVisible;
};