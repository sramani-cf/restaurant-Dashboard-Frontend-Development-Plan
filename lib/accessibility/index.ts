/**
 * Core Accessibility Utilities
 * 
 * This module provides comprehensive accessibility utilities for WCAG 2.1 AA compliance
 * including semantic HTML helpers, focus management, and screen reader support.
 */

import { KeyboardNavigationManager } from './keyboard';
import { AriaAttributeManager } from './aria';
import { ColorContrastValidator } from './contrast';
import { ScreenReaderUtilities } from './screen-reader';

// Re-export all utilities
export * from './keyboard';
export * from './aria';
export * from './contrast';
export * from './screen-reader';

/**
 * Accessibility Configuration Interface
 */
export interface AccessibilityConfig {
  /** Enable/disable reduced motion support */
  reduceMotion?: boolean;
  /** Enable/disable high contrast mode */
  highContrast?: boolean;
  /** Enable/disable focus ring visibility */
  focusRings?: boolean;
  /** Screen reader announcements verbosity level */
  screenReaderLevel?: 'minimal' | 'moderate' | 'verbose';
  /** Keyboard navigation mode */
  keyboardMode?: 'standard' | 'enhanced';
  /** Color contrast enforcement level */
  contrastLevel?: 'AA' | 'AAA';
}

/**
 * Default accessibility configuration
 */
export const DEFAULT_ACCESSIBILITY_CONFIG: AccessibilityConfig = {
  reduceMotion: false,
  highContrast: false,
  focusRings: true,
  screenReaderLevel: 'moderate',
  keyboardMode: 'standard',
  contrastLevel: 'AA',
};

/**
 * Main Accessibility Manager Class
 * 
 * Central hub for managing all accessibility features
 */
export class AccessibilityManager {
  private config: AccessibilityConfig;
  private keyboardManager: KeyboardNavigationManager;
  private ariaManager: AriaAttributeManager;
  private contrastValidator: ColorContrastValidator;
  private screenReaderUtils: ScreenReaderUtilities;

  constructor(config: AccessibilityConfig = DEFAULT_ACCESSIBILITY_CONFIG) {
    this.config = { ...DEFAULT_ACCESSIBILITY_CONFIG, ...config };
    this.keyboardManager = new KeyboardNavigationManager();
    this.ariaManager = new AriaAttributeManager();
    this.contrastValidator = new ColorContrastValidator(this.config.contrastLevel || 'AA');
    this.screenReaderUtils = new ScreenReaderUtilities(this.config.screenReaderLevel || 'moderate');
  }

  /**
   * Initialize accessibility features
   */
  public initialize(): void {
    this.setupGlobalAccessibility();
    this.keyboardManager.initialize();
    this.screenReaderUtils.initialize();
    this.applyAccessibilityPreferences();
  }

  /**
   * Update accessibility configuration
   */
  public updateConfig(newConfig: Partial<AccessibilityConfig>): void {
    this.config = { ...this.config, ...newConfig };
    this.applyAccessibilityPreferences();
    this.notifyConfigChange();
  }

  /**
   * Get current accessibility configuration
   */
  public getConfig(): AccessibilityConfig {
    return { ...this.config };
  }

  /**
   * Check if an element meets accessibility standards
   */
  public async auditElement(element: HTMLElement): Promise<{
    passes: boolean;
    violations: string[];
    warnings: string[];
  }> {
    const violations: string[] = [];
    const warnings: string[] = [];

    // Check for proper semantic HTML
    if (!this.hasProperSemantics(element)) {
      violations.push('Element lacks proper semantic HTML structure');
    }

    // Check ARIA attributes
    const ariaIssues = this.ariaManager.validateElement(element);
    violations.push(...ariaIssues.errors);
    warnings.push(...ariaIssues.warnings);

    // Check color contrast
    const contrastIssues = await this.contrastValidator.validateElement(element);
    if (contrastIssues.length > 0) {
      violations.push(...contrastIssues.map(issue => `Color contrast issue: ${issue.message}`));
    }

    // Check keyboard accessibility
    const keyboardIssues = this.keyboardManager.validateElement(element);
    violations.push(...keyboardIssues);

    return {
      passes: violations.length === 0,
      violations,
      warnings,
    };
  }

  /**
   * Get accessibility manager instances
   */
  public getManagers() {
    return {
      keyboard: this.keyboardManager,
      aria: this.ariaManager,
      contrast: this.contrastValidator,
      screenReader: this.screenReaderUtils,
    };
  }

  /**
   * Setup global accessibility features
   */
  private setupGlobalAccessibility(): void {
    // Add skip link if not present
    this.ensureSkipLink();

    // Setup global keyboard event listeners
    document.addEventListener('keydown', this.handleGlobalKeydown.bind(this));

    // Setup focus management
    document.addEventListener('focusin', this.handleFocusIn.bind(this));
    document.addEventListener('focusout', this.handleFocusOut.bind(this));

    // Setup resize listener for responsive accessibility
    window.addEventListener('resize', this.handleResize.bind(this));

    // Monitor prefers-reduced-motion changes
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    mediaQuery.addListener(this.handleMotionPreferenceChange.bind(this));
    this.handleMotionPreferenceChange(mediaQuery);
  }

  /**
   * Apply accessibility preferences to DOM
   */
  private applyAccessibilityPreferences(): void {
    const root = document.documentElement;

    // Apply reduced motion
    if (this.config.reduceMotion) {
      root.classList.add('reduce-motion');
    } else {
      root.classList.remove('reduce-motion');
    }

    // Apply high contrast
    if (this.config.highContrast) {
      root.classList.add('high-contrast');
    } else {
      root.classList.remove('high-contrast');
    }

    // Apply focus rings visibility
    if (this.config.focusRings) {
      root.classList.add('focus-rings-visible');
    } else {
      root.classList.remove('focus-rings-visible');
    }

    // Update CSS custom properties
    root.style.setProperty('--a11y-contrast-level', this.config.contrastLevel || 'AA');
  }

  /**
   * Ensure skip link is present in the document
   */
  private ensureSkipLink(): void {
    const existingSkipLink = document.querySelector('[data-skip-link]');
    if (!existingSkipLink) {
      const skipLink = document.createElement('a');
      skipLink.href = '#main-content';
      skipLink.textContent = 'Skip to main content';
      skipLink.className = 'skip-link sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded-md';
      skipLink.setAttribute('data-skip-link', 'true');
      document.body.insertBefore(skipLink, document.body.firstChild);
    }
  }

  /**
   * Handle global keyboard events
   */
  private handleGlobalKeydown(event: KeyboardEvent): void {
    // Handle Escape key globally
    if (event.key === 'Escape') {
      this.handleEscapeKey(event);
    }

    // Handle Alt + / for keyboard shortcuts help
    if (event.altKey && event.key === '/') {
      event.preventDefault();
      this.showKeyboardShortcuts();
    }
  }

  /**
   * Handle Escape key press
   */
  private handleEscapeKey(event: KeyboardEvent): void {
    // Close any open modals or dropdowns
    const activeModal = document.querySelector('[role="dialog"]:not([aria-hidden="true"])');
    if (activeModal) {
      const closeButton = activeModal.querySelector('[data-close]') as HTMLButtonElement;
      if (closeButton) {
        closeButton.click();
        return;
      }
    }

    // Remove focus from current element if it's not essential
    const activeElement = document.activeElement as HTMLElement;
    if (activeElement && activeElement !== document.body && !this.isEssentialElement(activeElement)) {
      activeElement.blur();
    }
  }

  /**
   * Show keyboard shortcuts overlay
   */
  private showKeyboardShortcuts(): void {
    // Dispatch custom event that components can listen to
    window.dispatchEvent(new CustomEvent('accessibility:showKeyboardShortcuts'));
  }

  /**
   * Handle focus in events
   */
  private handleFocusIn(event: FocusEvent): void {
    const target = event.target as HTMLElement;
    if (target) {
      // Add focus-visible class for custom focus indicators
      target.classList.add('focus-visible');
      
      // Announce focus changes to screen readers if needed
      this.screenReaderUtils.announceFocusChange(target);
    }
  }

  /**
   * Handle focus out events
   */
  private handleFocusOut(event: FocusEvent): void {
    const target = event.target as HTMLElement;
    if (target) {
      target.classList.remove('focus-visible');
    }
  }

  /**
   * Handle window resize for responsive accessibility
   */
  private handleResize(): void {
    // Update mobile-specific accessibility features
    const isMobile = window.innerWidth < 768;
    document.documentElement.classList.toggle('mobile-a11y', isMobile);
  }

  /**
   * Handle motion preference changes
   */
  private handleMotionPreferenceChange(mediaQuery: MediaQueryList): void {
    const prefersReducedMotion = mediaQuery.matches;
    this.updateConfig({ reduceMotion: prefersReducedMotion });
  }

  /**
   * Check if element has proper semantic HTML
   */
  private hasProperSemantics(element: HTMLElement): boolean {
    const semanticTags = ['main', 'nav', 'header', 'footer', 'aside', 'section', 'article', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'];
    const hasSemanticParent = element.closest(semanticTags.join(','));
    const hasRole = element.getAttribute('role');
    const hasAriaLabel = element.getAttribute('aria-label') || element.getAttribute('aria-labelledby');

    return !!(hasSemanticParent || hasRole || hasAriaLabel);
  }

  /**
   * Check if element is essential for navigation
   */
  private isEssentialElement(element: HTMLElement): boolean {
    const essentialSelectors = [
      '[role="main"]',
      '[role="navigation"]',
      '[role="banner"]',
      '[role="contentinfo"]',
      'main',
      'nav',
      'header',
      'footer'
    ];

    return essentialSelectors.some(selector => element.matches(selector) || element.closest(selector));
  }

  /**
   * Notify components of configuration changes
   */
  private notifyConfigChange(): void {
    window.dispatchEvent(new CustomEvent('accessibility:configChanged', {
      detail: this.config
    }));
  }

  /**
   * Cleanup accessibility manager
   */
  public destroy(): void {
    // Remove event listeners and cleanup resources
    document.removeEventListener('keydown', this.handleGlobalKeydown.bind(this));
    document.removeEventListener('focusin', this.handleFocusIn.bind(this));
    document.removeEventListener('focusout', this.handleFocusOut.bind(this));
    window.removeEventListener('resize', this.handleResize.bind(this));

    // Cleanup individual managers
    this.keyboardManager.destroy();
    this.screenReaderUtils.destroy();
  }
}

// Global accessibility manager instance
let globalAccessibilityManager: AccessibilityManager | null = null;

/**
 * Get or create global accessibility manager instance
 */
export function getAccessibilityManager(config?: AccessibilityConfig): AccessibilityManager {
  if (!globalAccessibilityManager) {
    globalAccessibilityManager = new AccessibilityManager(config);
  }
  return globalAccessibilityManager;
}

/**
 * Initialize global accessibility features
 */
export function initializeAccessibility(config?: AccessibilityConfig): AccessibilityManager {
  const manager = getAccessibilityManager(config);
  manager.initialize();
  return manager;
}

/**
 * Utility function to test element accessibility
 */
export async function testElementAccessibility(element: HTMLElement): Promise<{
  passes: boolean;
  violations: string[];
  warnings: string[];
}> {
  const manager = getAccessibilityManager();
  return await manager.auditElement(element);
}

/**
 * Utility function to announce message to screen readers
 */
export function announceToScreenReader(message: string, priority: 'polite' | 'assertive' = 'polite'): void {
  const manager = getAccessibilityManager();
  manager.getManagers().screenReader.announce(message, priority);
}

/**
 * Utility function to trap focus within an element
 */
export function trapFocus(element: HTMLElement): () => void {
  const manager = getAccessibilityManager();
  return manager.getManagers().keyboard.trapFocus(element);
}

/**
 * Utility function to restore focus to previous element
 */
export function restoreFocus(): void {
  const manager = getAccessibilityManager();
  manager.getManagers().keyboard.restoreFocus();
}