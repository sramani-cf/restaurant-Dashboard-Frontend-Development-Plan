/**
 * Keyboard Navigation Helpers
 * 
 * Provides comprehensive keyboard navigation utilities for WCAG 2.1 AA compliance
 * including focus management, keyboard traps, and navigation patterns.
 */

/**
 * Keyboard navigation configuration
 */
export interface KeyboardConfig {
  /** Enable roving tabindex pattern */
  rovingTabindex?: boolean;
  /** Enable arrow key navigation */
  arrowKeys?: boolean;
  /** Enable Escape key handling */
  escapeKey?: boolean;
  /** Enable Home/End key navigation */
  homeEndKeys?: boolean;
  /** Trap focus within container */
  trapFocus?: boolean;
}

/**
 * Focus management utilities
 */
export class FocusManager {
  private focusHistory: HTMLElement[] = [];
  private maxHistorySize = 10;

  /**
   * Save current focus to history
   */
  saveFocus(element?: HTMLElement): void {
    const activeElement = element || (document.activeElement as HTMLElement);
    if (activeElement && activeElement !== document.body) {
      this.focusHistory.unshift(activeElement);
      if (this.focusHistory.length > this.maxHistorySize) {
        this.focusHistory.pop();
      }
    }
  }

  /**
   * Restore previous focus
   */
  restoreFocus(): boolean {
    const previousElement = this.focusHistory.shift();
    if (previousElement && document.contains(previousElement)) {
      previousElement.focus();
      return true;
    }
    return false;
  }

  /**
   * Clear focus history
   */
  clearHistory(): void {
    this.focusHistory = [];
  }

  /**
   * Get focus history
   */
  getHistory(): HTMLElement[] {
    return [...this.focusHistory];
  }

  /**
   * Focus first focusable element in container
   */
  focusFirst(container: HTMLElement): boolean {
    const firstFocusable = this.getFocusableElements(container)[0];
    if (firstFocusable) {
      firstFocusable.focus();
      return true;
    }
    return false;
  }

  /**
   * Focus last focusable element in container
   */
  focusLast(container: HTMLElement): boolean {
    const focusableElements = this.getFocusableElements(container);
    const lastFocusable = focusableElements[focusableElements.length - 1];
    if (lastFocusable) {
      lastFocusable.focus();
      return true;
    }
    return false;
  }

  /**
   * Focus next focusable element
   */
  focusNext(container: HTMLElement, currentElement?: HTMLElement): boolean {
    const focusableElements = this.getFocusableElements(container);
    const current = currentElement || (document.activeElement as HTMLElement);
    const currentIndex = focusableElements.indexOf(current);
    
    if (currentIndex >= 0 && currentIndex < focusableElements.length - 1) {
      focusableElements[currentIndex + 1].focus();
      return true;
    }
    return false;
  }

  /**
   * Focus previous focusable element
   */
  focusPrevious(container: HTMLElement, currentElement?: HTMLElement): boolean {
    const focusableElements = this.getFocusableElements(container);
    const current = currentElement || (document.activeElement as HTMLElement);
    const currentIndex = focusableElements.indexOf(current);
    
    if (currentIndex > 0) {
      focusableElements[currentIndex - 1].focus();
      return true;
    }
    return false;
  }

  /**
   * Get all focusable elements within a container
   */
  getFocusableElements(container: HTMLElement): HTMLElement[] {
    const focusableSelectors = [
      'a[href]',
      'button:not([disabled])',
      'textarea:not([disabled])',
      'input:not([disabled]):not([type="hidden"])',
      'select:not([disabled])',
      '[tabindex]:not([tabindex="-1"])',
      '[contenteditable="true"]',
      'summary',
      'iframe',
      'object',
      'embed',
      'area[href]',
      'audio[controls]',
      'video[controls]',
      '[draggable="true"]'
    ];

    const elements = Array.from(
      container.querySelectorAll(focusableSelectors.join(','))
    ) as HTMLElement[];

    return elements.filter(element => {
      // Check if element is visible and not disabled
      return this.isElementFocusable(element);
    });
  }

  /**
   * Check if an element is focusable
   */
  isElementFocusable(element: HTMLElement): boolean {
    // Check if element is visible
    if (element.offsetWidth === 0 && element.offsetHeight === 0) {
      return false;
    }

    // Check if element or parents have display: none or visibility: hidden
    let current: HTMLElement | null = element;
    while (current) {
      const style = window.getComputedStyle(current);
      if (style.display === 'none' || style.visibility === 'hidden') {
        return false;
      }
      current = current.parentElement;
    }

    // Check for disabled state
    if ('disabled' in element && (element as any).disabled) {
      return false;
    }

    // Check for negative tabindex (unless it's -1 which can still be programmatically focused)
    const tabindex = element.getAttribute('tabindex');
    if (tabindex && parseInt(tabindex, 10) < -1) {
      return false;
    }

    return true;
  }
}

/**
 * Focus trap implementation for modals and dialogs
 */
export class FocusTrap {
  private container: HTMLElement;
  private firstFocusable: HTMLElement | null = null;
  private lastFocusable: HTMLElement | null = null;
  private previousActiveElement: HTMLElement | null = null;
  private focusManager: FocusManager;
  private keydownHandler: (event: KeyboardEvent) => void;

  constructor(container: HTMLElement, focusManager: FocusManager) {
    this.container = container;
    this.focusManager = focusManager;
    this.keydownHandler = this.handleKeydown.bind(this);
  }

  /**
   * Activate focus trap
   */
  activate(): void {
    this.previousActiveElement = document.activeElement as HTMLElement;
    this.updateFocusableElements();
    
    // Focus first element or container
    if (this.firstFocusable) {
      this.firstFocusable.focus();
    } else if (this.container.tabIndex >= 0) {
      this.container.focus();
    }

    // Add keydown listener
    document.addEventListener('keydown', this.keydownHandler, true);
    
    // Set aria-hidden on siblings
    this.setSiblingAriaHidden(true);
  }

  /**
   * Deactivate focus trap
   */
  deactivate(): void {
    document.removeEventListener('keydown', this.keydownHandler, true);
    
    // Restore aria-hidden on siblings
    this.setSiblingAriaHidden(false);
    
    // Restore previous focus
    if (this.previousActiveElement && document.contains(this.previousActiveElement)) {
      this.previousActiveElement.focus();
    }
  }

  /**
   * Update focusable elements within trap
   */
  private updateFocusableElements(): void {
    const focusableElements = this.focusManager.getFocusableElements(this.container);
    this.firstFocusable = focusableElements[0] || null;
    this.lastFocusable = focusableElements[focusableElements.length - 1] || null;
  }

  /**
   * Handle keydown events for focus trap
   */
  private handleKeydown(event: KeyboardEvent): void {
    if (event.key !== 'Tab') return;

    // Update focusable elements (in case DOM changed)
    this.updateFocusableElements();

    if (!this.firstFocusable && !this.lastFocusable) {
      // No focusable elements, prevent tabbing
      event.preventDefault();
      return;
    }

    if (event.shiftKey) {
      // Shift + Tab (backward)
      if (document.activeElement === this.firstFocusable) {
        event.preventDefault();
        this.lastFocusable?.focus();
      }
    } else {
      // Tab (forward)
      if (document.activeElement === this.lastFocusable) {
        event.preventDefault();
        this.firstFocusable?.focus();
      }
    }
  }

  /**
   * Set aria-hidden on sibling elements
   */
  private setSiblingAriaHidden(hidden: boolean): void {
    const siblings = Array.from(document.body.children) as HTMLElement[];
    siblings.forEach(sibling => {
      if (sibling !== this.container && !this.container.contains(sibling)) {
        if (hidden) {
          sibling.setAttribute('aria-hidden', 'true');
          sibling.setAttribute('data-focus-trap-hidden', 'true');
        } else if (sibling.getAttribute('data-focus-trap-hidden')) {
          sibling.removeAttribute('aria-hidden');
          sibling.removeAttribute('data-focus-trap-hidden');
        }
      }
    });
  }
}

/**
 * Roving tabindex implementation for complex widgets
 */
export class RovingTabindex {
  private container: HTMLElement;
  private items: HTMLElement[] = [];
  private currentIndex = 0;
  private orientation: 'horizontal' | 'vertical' | 'both' = 'both';
  private wrap = true;
  private keydownHandler: (event: KeyboardEvent) => void;

  constructor(
    container: HTMLElement,
    options: {
      orientation?: 'horizontal' | 'vertical' | 'both';
      wrap?: boolean;
    } = {}
  ) {
    this.container = container;
    this.orientation = options.orientation || 'both';
    this.wrap = options.wrap !== false;
    this.keydownHandler = this.handleKeydown.bind(this);
  }

  /**
   * Initialize roving tabindex
   */
  initialize(itemSelector?: string): void {
    this.updateItems(itemSelector);
    this.updateTabindices();
    this.container.addEventListener('keydown', this.keydownHandler);
    this.container.addEventListener('focusin', this.handleFocusin.bind(this));
  }

  /**
   * Update items list
   */
  updateItems(itemSelector?: string): void {
    const selector = itemSelector || '[role="tab"], [role="option"], [role="gridcell"], [role="menuitem"]';
    this.items = Array.from(this.container.querySelectorAll(selector)) as HTMLElement[];
  }

  /**
   * Update tabindex attributes
   */
  private updateTabindices(): void {
    this.items.forEach((item, index) => {
      item.setAttribute('tabindex', index === this.currentIndex ? '0' : '-1');
    });
  }

  /**
   * Move to specific index
   */
  moveTo(index: number): void {
    if (index >= 0 && index < this.items.length) {
      this.currentIndex = index;
      this.updateTabindices();
      this.items[index].focus();
    }
  }

  /**
   * Move to next item
   */
  moveNext(): void {
    let nextIndex = this.currentIndex + 1;
    if (nextIndex >= this.items.length) {
      nextIndex = this.wrap ? 0 : this.items.length - 1;
    }
    this.moveTo(nextIndex);
  }

  /**
   * Move to previous item
   */
  movePrevious(): void {
    let previousIndex = this.currentIndex - 1;
    if (previousIndex < 0) {
      previousIndex = this.wrap ? this.items.length - 1 : 0;
    }
    this.moveTo(previousIndex);
  }

  /**
   * Move to first item
   */
  moveFirst(): void {
    this.moveTo(0);
  }

  /**
   * Move to last item
   */
  moveLast(): void {
    this.moveTo(this.items.length - 1);
  }

  /**
   * Handle keydown events
   */
  private handleKeydown(event: KeyboardEvent): void {
    const { key } = event;
    let handled = false;

    switch (key) {
      case 'ArrowRight':
        if (this.orientation === 'horizontal' || this.orientation === 'both') {
          this.moveNext();
          handled = true;
        }
        break;
      case 'ArrowLeft':
        if (this.orientation === 'horizontal' || this.orientation === 'both') {
          this.movePrevious();
          handled = true;
        }
        break;
      case 'ArrowDown':
        if (this.orientation === 'vertical' || this.orientation === 'both') {
          this.moveNext();
          handled = true;
        }
        break;
      case 'ArrowUp':
        if (this.orientation === 'vertical' || this.orientation === 'both') {
          this.movePrevious();
          handled = true;
        }
        break;
      case 'Home':
        this.moveFirst();
        handled = true;
        break;
      case 'End':
        this.moveLast();
        handled = true;
        break;
    }

    if (handled) {
      event.preventDefault();
      event.stopPropagation();
    }
  }

  /**
   * Handle focus events
   */
  private handleFocusin(event: FocusEvent): void {
    const target = event.target as HTMLElement;
    const index = this.items.indexOf(target);
    if (index >= 0) {
      this.currentIndex = index;
      this.updateTabindices();
    }
  }

  /**
   * Destroy roving tabindex
   */
  destroy(): void {
    this.container.removeEventListener('keydown', this.keydownHandler);
    this.container.removeEventListener('focusin', this.handleFocusin.bind(this));
    
    // Reset all tabindex values
    this.items.forEach(item => {
      item.removeAttribute('tabindex');
    });
  }
}

/**
 * Main Keyboard Navigation Manager
 */
export class KeyboardNavigationManager {
  private focusManager: FocusManager;
  private activeFocusTraps: Map<HTMLElement, FocusTrap> = new Map();
  private activeRovingTabindices: Map<HTMLElement, RovingTabindex> = new Map();

  constructor() {
    this.focusManager = new FocusManager();
  }

  /**
   * Initialize keyboard navigation
   */
  initialize(): void {
    // Setup global keyboard shortcuts
    document.addEventListener('keydown', this.handleGlobalKeydown.bind(this));
  }

  /**
   * Create and activate focus trap
   */
  trapFocus(container: HTMLElement): () => void {
    const existingTrap = this.activeFocusTraps.get(container);
    if (existingTrap) {
      existingTrap.deactivate();
    }

    const trap = new FocusTrap(container, this.focusManager);
    trap.activate();
    this.activeFocusTraps.set(container, trap);

    // Return cleanup function
    return () => {
      trap.deactivate();
      this.activeFocusTraps.delete(container);
    };
  }

  /**
   * Create roving tabindex for container
   */
  createRovingTabindex(
    container: HTMLElement,
    options?: {
      orientation?: 'horizontal' | 'vertical' | 'both';
      wrap?: boolean;
      itemSelector?: string;
    }
  ): RovingTabindex {
    const existingRoving = this.activeRovingTabindices.get(container);
    if (existingRoving) {
      existingRoving.destroy();
    }

    const roving = new RovingTabindex(container, options);
    roving.initialize(options?.itemSelector);
    this.activeRovingTabindices.set(container, roving);

    return roving;
  }

  /**
   * Save current focus
   */
  saveFocus(element?: HTMLElement): void {
    this.focusManager.saveFocus(element);
  }

  /**
   * Restore previous focus
   */
  restoreFocus(): boolean {
    return this.focusManager.restoreFocus();
  }

  /**
   * Get focus manager
   */
  getFocusManager(): FocusManager {
    return this.focusManager;
  }

  /**
   * Validate element for keyboard accessibility
   */
  validateElement(element: HTMLElement): string[] {
    const issues: string[] = [];

    // Check if interactive element is keyboard accessible
    if (this.isInteractiveElement(element)) {
      if (!this.isKeyboardAccessible(element)) {
        issues.push('Interactive element is not keyboard accessible');
      }
    }

    // Check for proper focus indicators
    if (element.matches(':focus-visible') && !this.hasFocusIndicator(element)) {
      issues.push('Element lacks visible focus indicator');
    }

    return issues;
  }

  /**
   * Handle global keyboard events
   */
  private handleGlobalKeydown(event: KeyboardEvent): void {
    // Handle F6 for landmark navigation
    if (event.key === 'F6') {
      event.preventDefault();
      this.navigateLandmarks(event.shiftKey);
    }

    // Handle Alt+F6 for heading navigation
    if (event.altKey && event.key === 'F6') {
      event.preventDefault();
      this.navigateHeadings(event.shiftKey);
    }
  }

  /**
   * Navigate between landmarks
   */
  private navigateLandmarks(reverse = false): void {
    const landmarks = document.querySelectorAll('[role="banner"], [role="navigation"], [role="main"], [role="contentinfo"], [role="complementary"], [role="search"], [role="form"], [role="region"], main, nav, header, footer, aside, section[aria-label], section[aria-labelledby]');
    const landmarkArray = Array.from(landmarks) as HTMLElement[];
    
    if (landmarkArray.length === 0) return;

    const currentIndex = landmarkArray.findIndex(landmark => 
      landmark.contains(document.activeElement) || landmark === document.activeElement
    );

    let nextIndex: number;
    if (currentIndex === -1) {
      nextIndex = reverse ? landmarkArray.length - 1 : 0;
    } else {
      nextIndex = reverse 
        ? (currentIndex - 1 + landmarkArray.length) % landmarkArray.length
        : (currentIndex + 1) % landmarkArray.length;
    }

    const nextLandmark = landmarkArray[nextIndex];
    if (nextLandmark.tabIndex >= 0) {
      nextLandmark.focus();
    } else {
      const firstFocusable = this.focusManager.getFocusableElements(nextLandmark)[0];
      if (firstFocusable) {
        firstFocusable.focus();
      } else {
        nextLandmark.setAttribute('tabindex', '-1');
        nextLandmark.focus();
      }
    }
  }

  /**
   * Navigate between headings
   */
  private navigateHeadings(reverse = false): void {
    const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6, [role="heading"]');
    const headingArray = Array.from(headings) as HTMLElement[];
    
    if (headingArray.length === 0) return;

    const currentIndex = headingArray.findIndex(heading => 
      heading.contains(document.activeElement) || heading === document.activeElement
    );

    let nextIndex: number;
    if (currentIndex === -1) {
      nextIndex = reverse ? headingArray.length - 1 : 0;
    } else {
      nextIndex = reverse 
        ? (currentIndex - 1 + headingArray.length) % headingArray.length
        : (currentIndex + 1) % headingArray.length;
    }

    const nextHeading = headingArray[nextIndex];
    nextHeading.setAttribute('tabindex', '-1');
    nextHeading.focus();
  }

  /**
   * Check if element is interactive
   */
  private isInteractiveElement(element: HTMLElement): boolean {
    const interactiveRoles = [
      'button', 'link', 'textbox', 'checkbox', 'radio', 'combobox', 'listbox',
      'menu', 'menuitem', 'tab', 'tabpanel', 'option', 'gridcell', 'slider'
    ];

    const tagName = element.tagName.toLowerCase();
    const role = element.getAttribute('role');

    return (
      ['a', 'button', 'input', 'select', 'textarea'].includes(tagName) ||
      (role && interactiveRoles.includes(role)) ||
      element.hasAttribute('onclick') ||
      element.hasAttribute('onkeydown') ||
      element.tabIndex >= 0
    );
  }

  /**
   * Check if element is keyboard accessible
   */
  private isKeyboardAccessible(element: HTMLElement): boolean {
    // Check if element can receive focus
    const focusableElements = this.focusManager.getFocusableElements(document.body);
    return focusableElements.includes(element);
  }

  /**
   * Check if element has visible focus indicator
   */
  private hasFocusIndicator(element: HTMLElement): boolean {
    const computedStyle = window.getComputedStyle(element);
    
    // Check for outline
    if (computedStyle.outline !== 'none' && computedStyle.outline !== '0px') {
      return true;
    }

    // Check for box-shadow (common for custom focus indicators)
    if (computedStyle.boxShadow !== 'none') {
      return true;
    }

    // Check for border changes
    const originalBorder = computedStyle.border;
    element.classList.add('focus-test');
    const focusStyle = window.getComputedStyle(element);
    element.classList.remove('focus-test');
    
    return focusStyle.border !== originalBorder;
  }

  /**
   * Cleanup all keyboard navigation
   */
  destroy(): void {
    // Deactivate all focus traps
    this.activeFocusTraps.forEach(trap => trap.deactivate());
    this.activeFocusTraps.clear();

    // Destroy all roving tabindices
    this.activeRovingTabindices.forEach(roving => roving.destroy());
    this.activeRovingTabindices.clear();

    // Clear focus history
    this.focusManager.clearHistory();
  }
}

/**
 * Keyboard shortcut configuration
 */
export interface KeyboardShortcut {
  key: string;
  ctrlKey?: boolean;
  altKey?: boolean;
  shiftKey?: boolean;
  metaKey?: boolean;
  description: string;
  action: () => void;
}

/**
 * Keyboard shortcuts manager
 */
export class KeyboardShortcutsManager {
  private shortcuts: Map<string, KeyboardShortcut> = new Map();
  private keydownHandler: (event: KeyboardEvent) => void;

  constructor() {
    this.keydownHandler = this.handleKeydown.bind(this);
  }

  /**
   * Register a keyboard shortcut
   */
  register(shortcut: KeyboardShortcut): void {
    const key = this.getShortcutKey(shortcut);
    this.shortcuts.set(key, shortcut);
  }

  /**
   * Unregister a keyboard shortcut
   */
  unregister(shortcut: Partial<KeyboardShortcut>): void {
    const key = this.getShortcutKey(shortcut);
    this.shortcuts.delete(key);
  }

  /**
   * Start listening for keyboard shortcuts
   */
  start(): void {
    document.addEventListener('keydown', this.keydownHandler);
  }

  /**
   * Stop listening for keyboard shortcuts
   */
  stop(): void {
    document.removeEventListener('keydown', this.keydownHandler);
  }

  /**
   * Get all registered shortcuts
   */
  getShortcuts(): KeyboardShortcut[] {
    return Array.from(this.shortcuts.values());
  }

  /**
   * Handle keydown events
   */
  private handleKeydown(event: KeyboardEvent): void {
    const key = this.getEventKey(event);
    const shortcut = this.shortcuts.get(key);
    
    if (shortcut) {
      event.preventDefault();
      shortcut.action();
    }
  }

  /**
   * Generate shortcut key from shortcut object
   */
  private getShortcutKey(shortcut: Partial<KeyboardShortcut>): string {
    const parts: string[] = [];
    
    if (shortcut.ctrlKey) parts.push('Ctrl');
    if (shortcut.altKey) parts.push('Alt');
    if (shortcut.shiftKey) parts.push('Shift');
    if (shortcut.metaKey) parts.push('Meta');
    if (shortcut.key) parts.push(shortcut.key);
    
    return parts.join('+');
  }

  /**
   * Generate key from keyboard event
   */
  private getEventKey(event: KeyboardEvent): string {
    const parts: string[] = [];
    
    if (event.ctrlKey) parts.push('Ctrl');
    if (event.altKey) parts.push('Alt');
    if (event.shiftKey) parts.push('Shift');
    if (event.metaKey) parts.push('Meta');
    parts.push(event.key);
    
    return parts.join('+');
  }
}