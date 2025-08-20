/**
 * Screen Reader Utilities
 * 
 * Provides comprehensive screen reader support including live regions,
 * announcements, and optimized content for screen readers.
 */

/**
 * Screen reader verbosity levels
 */
export type ScreenReaderVerbosity = 'minimal' | 'moderate' | 'verbose';

/**
 * Live region politeness levels
 */
export type LiveRegionPoliteness = 'off' | 'polite' | 'assertive';

/**
 * Announcement configuration
 */
export interface AnnouncementConfig {
  message: string;
  priority: LiveRegionPoliteness;
  delay?: number;
  clear?: boolean;
}

/**
 * Screen reader context information
 */
export interface ScreenReaderContext {
  currentElement?: HTMLElement;
  navigationHistory: HTMLElement[];
  lastAnnouncement?: string;
  announcementQueue: AnnouncementConfig[];
}

/**
 * Screen reader detection result
 */
export interface ScreenReaderInfo {
  detected: boolean;
  name?: string;
  version?: string;
  capabilities: {
    liveRegions: boolean;
    ariaDescriptions: boolean;
    roleSupport: boolean;
  };
}

/**
 * Content optimization options
 */
export interface ContentOptimization {
  removeRedundancy: boolean;
  addContextualInfo: boolean;
  simplifyLanguage: boolean;
  addLandmarkLabels: boolean;
}

/**
 * Screen Reader Utilities Class
 */
export class ScreenReaderUtilities {
  private verbosity: ScreenReaderVerbosity;
  private context: ScreenReaderContext;
  private liveRegions: Map<string, HTMLElement> = new Map();
  private announcementTimer: number | null = null;
  private observer: MutationObserver | null = null;

  constructor(verbosity: ScreenReaderVerbosity = 'moderate') {
    this.verbosity = verbosity;
    this.context = {
      navigationHistory: [],
      announcementQueue: [],
    };
  }

  /**
   * Initialize screen reader utilities
   */
  initialize(): void {
    this.createLiveRegions();
    this.setupDOMObserver();
    this.detectScreenReader();
    this.setupNavigationTracking();
  }

  /**
   * Make an announcement to screen readers
   */
  announce(message: string, priority: LiveRegionPoliteness = 'polite', delay = 0): void {
    const config: AnnouncementConfig = {
      message: message.trim(),
      priority,
      delay,
    };

    // Skip empty or duplicate announcements
    if (!config.message || config.message === this.context.lastAnnouncement) {
      return;
    }

    this.context.announcementQueue.push(config);
    this.processAnnouncementQueue();
  }

  /**
   * Announce page changes
   */
  announcePageChange(pageTitle: string, routeInfo?: string): void {
    const message = routeInfo 
      ? `Navigated to ${pageTitle}. ${routeInfo}`
      : `Page changed to ${pageTitle}`;
    
    this.announce(message, 'assertive', 500);
  }

  /**
   * Announce form errors
   */
  announceFormErrors(errors: string[] | Record<string, string>): void {
    let message: string;

    if (Array.isArray(errors)) {
      message = `Form has ${errors.length} error${errors.length > 1 ? 's' : ''}: ${errors.join(', ')}`;
    } else {
      const errorList = Object.values(errors);
      message = `Form has ${errorList.length} error${errorList.length > 1 ? 's' : ''}: ${errorList.join(', ')}`;
    }

    this.announce(message, 'assertive');
  }

  /**
   * Announce loading states
   */
  announceLoading(message = 'Loading', isComplete = false): void {
    if (isComplete) {
      this.announce('Loading complete', 'polite');
    } else {
      this.announce(message, 'polite');
    }
  }

  /**
   * Announce focus changes with context
   */
  announceFocusChange(element: HTMLElement): void {
    if (this.verbosity === 'minimal') return;

    const announcement = this.generateFocusAnnouncement(element);
    if (announcement) {
      this.announce(announcement, 'polite', 100);
    }

    // Update context
    this.context.currentElement = element;
    this.context.navigationHistory.unshift(element);
    
    // Limit history size
    if (this.context.navigationHistory.length > 10) {
      this.context.navigationHistory.pop();
    }
  }

  /**
   * Announce data table information
   */
  announceTableNavigation(cell: HTMLElement, table: HTMLElement): void {
    const row = cell.closest('tr');
    const rowIndex = row ? Array.from(table.querySelectorAll('tr')).indexOf(row) : -1;
    const cellIndex = Array.from(row?.children || []).indexOf(cell);
    
    const headers = this.getTableHeaders(cell, table);
    const cellContent = cell.textContent?.trim() || 'Empty cell';
    
    let announcement = `Row ${rowIndex + 1}, Column ${cellIndex + 1}`;
    
    if (headers.length > 0) {
      announcement += `, ${headers.join(', ')}`;
    }
    
    announcement += `: ${cellContent}`;
    
    this.announce(announcement, 'polite');
  }

  /**
   * Announce list navigation
   */
  announceListNavigation(item: HTMLElement, list: HTMLElement): void {
    const items = list.querySelectorAll('li, [role="listitem"]');
    const itemIndex = Array.from(items).indexOf(item);
    const totalItems = items.length;
    
    const itemText = item.textContent?.trim() || 'Empty item';
    const announcement = `List item ${itemIndex + 1} of ${totalItems}: ${itemText}`;
    
    this.announce(announcement, 'polite');
  }

  /**
   * Announce menu navigation
   */
  announceMenuNavigation(menuitem: HTMLElement): void {
    const menu = menuitem.closest('[role="menu"], [role="menubar"]');
    if (!menu) return;

    const items = menu.querySelectorAll('[role="menuitem"], [role="menuitemcheckbox"], [role="menuitemradio"]');
    const itemIndex = Array.from(items).indexOf(menuitem);
    const totalItems = items.length;
    
    const itemText = menuitem.textContent?.trim() || 'Menu item';
    let announcement = `Menu item ${itemIndex + 1} of ${totalItems}: ${itemText}`;
    
    // Add state information
    const expanded = menuitem.getAttribute('aria-expanded');
    const checked = menuitem.getAttribute('aria-checked');
    
    if (expanded === 'true') {
      announcement += ', expanded';
    } else if (expanded === 'false') {
      announcement += ', collapsed';
    }
    
    if (checked === 'true') {
      announcement += ', checked';
    } else if (checked === 'false') {
      announcement += ', unchecked';
    }
    
    this.announce(announcement, 'polite');
  }

  /**
   * Create optimized content for screen readers
   */
  optimizeContent(element: HTMLElement, options: Partial<ContentOptimization> = {}): void {
    const config: ContentOptimization = {
      removeRedundancy: true,
      addContextualInfo: true,
      simplifyLanguage: false,
      addLandmarkLabels: true,
      ...options,
    };

    if (config.removeRedundancy) {
      this.removeRedundantContent(element);
    }

    if (config.addContextualInfo) {
      this.addContextualInformation(element);
    }

    if (config.addLandmarkLabels) {
      this.addLandmarkLabels(element);
    }
  }

  /**
   * Create screen reader only content
   */
  createSROnlyContent(text: string, insertBefore?: HTMLElement): HTMLElement {
    const srElement = document.createElement('span');
    srElement.textContent = text;
    srElement.className = 'sr-only';
    srElement.setAttribute('data-sr-only', 'true');

    if (insertBefore && insertBefore.parentNode) {
      insertBefore.parentNode.insertBefore(srElement, insertBefore);
    }

    return srElement;
  }

  /**
   * Generate table summary
   */
  generateTableSummary(table: HTMLElement): string {
    const rows = table.querySelectorAll('tr');
    const headers = table.querySelectorAll('th');
    const dataRows = table.querySelectorAll('tbody tr, tr:not(:first-child)');
    
    let summary = `Table with ${headers.length} columns and ${dataRows.length} data rows`;
    
    // Add caption if present
    const caption = table.querySelector('caption');
    if (caption) {
      summary += `. Caption: ${caption.textContent?.trim()}`;
    }
    
    // Add header information
    if (headers.length > 0) {
      const headerTexts = Array.from(headers).map(h => h.textContent?.trim()).filter(Boolean);
      summary += `. Columns: ${headerTexts.join(', ')}`;
    }
    
    return summary;
  }

  /**
   * Generate form summary
   */
  generateFormSummary(form: HTMLElement): string {
    const inputs = form.querySelectorAll('input:not([type="hidden"]), select, textarea');
    const required = form.querySelectorAll('[required], [aria-required="true"]');
    
    let summary = `Form with ${inputs.length} field${inputs.length !== 1 ? 's' : ''}`;
    
    if (required.length > 0) {
      summary += `, ${required.length} required`;
    }
    
    return summary;
  }

  /**
   * Detect screen reader
   */
  private detectScreenReader(): ScreenReaderInfo {
    const info: ScreenReaderInfo = {
      detected: false,
      capabilities: {
        liveRegions: true,
        ariaDescriptions: true,
        roleSupport: true,
      },
    };

    // Check user agent for screen reader indicators
    const userAgent = navigator.userAgent.toLowerCase();
    
    // Check for common screen reader indicators in user agent
    if (userAgent.includes('nvda') || userAgent.includes('jaws') || userAgent.includes('dragon')) {
      info.detected = true;
    }

    // Check for Windows High Contrast mode (often used with screen readers)
    if (window.matchMedia('(-ms-high-contrast: active)').matches) {
      info.detected = true;
    }

    // Check for reduced motion preference (common accessibility setting)
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      info.detected = true;
    }

    // Test for live region support
    try {
      const testElement = document.createElement('div');
      testElement.setAttribute('aria-live', 'polite');
      document.body.appendChild(testElement);
      document.body.removeChild(testElement);
    } catch {
      info.capabilities.liveRegions = false;
    }

    return info;
  }

  /**
   * Create live regions for announcements
   */
  private createLiveRegions(): void {
    // Create polite live region
    const politeRegion = document.createElement('div');
    politeRegion.setAttribute('aria-live', 'polite');
    politeRegion.setAttribute('aria-atomic', 'true');
    politeRegion.className = 'sr-only';
    politeRegion.id = 'polite-announcer';
    document.body.appendChild(politeRegion);
    this.liveRegions.set('polite', politeRegion);

    // Create assertive live region
    const assertiveRegion = document.createElement('div');
    assertiveRegion.setAttribute('aria-live', 'assertive');
    assertiveRegion.setAttribute('aria-atomic', 'true');
    assertiveRegion.className = 'sr-only';
    assertiveRegion.id = 'assertive-announcer';
    document.body.appendChild(assertiveRegion);
    this.liveRegions.set('assertive', assertiveRegion);

    // Create status region
    const statusRegion = document.createElement('div');
    statusRegion.setAttribute('role', 'status');
    statusRegion.setAttribute('aria-live', 'polite');
    statusRegion.className = 'sr-only';
    statusRegion.id = 'status-announcer';
    document.body.appendChild(statusRegion);
    this.liveRegions.set('status', statusRegion);
  }

  /**
   * Process announcement queue
   */
  private processAnnouncementQueue(): void {
    if (this.announcementTimer) return;

    const processNext = () => {
      const config = this.context.announcementQueue.shift();
      if (!config) {
        this.announcementTimer = null;
        return;
      }

      const region = this.liveRegions.get(config.priority);
      if (region) {
        // Clear previous content
        region.textContent = '';
        
        // Small delay to ensure screen reader notices the change
        setTimeout(() => {
          region.textContent = config.message;
          this.context.lastAnnouncement = config.message;
        }, 50);
      }

      // Schedule next announcement
      this.announcementTimer = window.setTimeout(() => {
        this.announcementTimer = null;
        if (this.context.announcementQueue.length > 0) {
          processNext();
        }
      }, config.delay || 1000);
    };

    processNext();
  }

  /**
   * Generate focus announcement
   */
  private generateFocusAnnouncement(element: HTMLElement): string | null {
    const role = element.getAttribute('role') || element.tagName.toLowerCase();
    const label = this.getAccessibleName(element);
    const description = element.getAttribute('aria-describedby') 
      ? this.getDescriptionText(element) 
      : null;

    let announcement = '';

    // Add element type
    switch (role) {
      case 'button':
        announcement = 'Button';
        break;
      case 'link':
      case 'a':
        announcement = 'Link';
        break;
      case 'textbox':
      case 'input':
        announcement = this.getInputTypeAnnouncement(element as HTMLInputElement);
        break;
      case 'checkbox':
        const checked = element.getAttribute('aria-checked') === 'true';
        announcement = `Checkbox, ${checked ? 'checked' : 'not checked'}`;
        break;
      case 'radio':
        const selected = element.getAttribute('aria-checked') === 'true';
        announcement = `Radio button, ${selected ? 'selected' : 'not selected'}`;
        break;
      default:
        announcement = role;
    }

    // Add label
    if (label) {
      announcement += `, ${label}`;
    }

    // Add state information
    const expanded = element.getAttribute('aria-expanded');
    if (expanded === 'true') {
      announcement += ', expanded';
    } else if (expanded === 'false') {
      announcement += ', collapsed';
    }

    const disabled = element.getAttribute('aria-disabled') === 'true' || 
                    (element as HTMLInputElement).disabled;
    if (disabled) {
      announcement += ', disabled';
    }

    // Add description
    if (description) {
      announcement += `. ${description}`;
    }

    return announcement || null;
  }

  /**
   * Get accessible name for element
   */
  private getAccessibleName(element: HTMLElement): string {
    // Check aria-label
    const ariaLabel = element.getAttribute('aria-label');
    if (ariaLabel) return ariaLabel;

    // Check aria-labelledby
    const labelledBy = element.getAttribute('aria-labelledby');
    if (labelledBy) {
      const labelElements = labelledBy.split(' ')
        .map(id => document.getElementById(id))
        .filter(Boolean);
      
      if (labelElements.length > 0) {
        return labelElements.map(el => el!.textContent?.trim()).join(' ');
      }
    }

    // Check associated label
    if (element.id) {
      const label = document.querySelector(`label[for="${element.id}"]`);
      if (label) return label.textContent?.trim() || '';
    }

    // Use text content for buttons and links
    if (['button', 'a'].includes(element.tagName.toLowerCase())) {
      return element.textContent?.trim() || '';
    }

    // Use placeholder for inputs
    if (element.tagName === 'INPUT') {
      const placeholder = (element as HTMLInputElement).placeholder;
      if (placeholder) return placeholder;
    }

    return '';
  }

  /**
   * Get description text
   */
  private getDescriptionText(element: HTMLElement): string {
    const describedBy = element.getAttribute('aria-describedby');
    if (!describedBy) return '';

    const descElements = describedBy.split(' ')
      .map(id => document.getElementById(id))
      .filter(Boolean);

    return descElements.map(el => el!.textContent?.trim()).join(' ');
  }

  /**
   * Get input type announcement
   */
  private getInputTypeAnnouncement(input: HTMLInputElement): string {
    const type = input.type.toLowerCase();
    
    switch (type) {
      case 'email':
        return 'Email field';
      case 'password':
        return 'Password field';
      case 'search':
        return 'Search field';
      case 'tel':
        return 'Telephone field';
      case 'url':
        return 'URL field';
      case 'number':
        return 'Number field';
      case 'date':
        return 'Date field';
      case 'time':
        return 'Time field';
      default:
        return 'Text field';
    }
  }

  /**
   * Get table headers for cell
   */
  private getTableHeaders(cell: HTMLElement, table: HTMLElement): string[] {
    const headers: string[] = [];
    const row = cell.closest('tr');
    if (!row) return headers;

    const cellIndex = Array.from(row.children).indexOf(cell);
    
    // Get column header
    const thead = table.querySelector('thead');
    if (thead) {
      const headerRow = thead.querySelector('tr');
      if (headerRow) {
        const headerCell = headerRow.children[cellIndex] as HTMLElement;
        if (headerCell) {
          headers.push(headerCell.textContent?.trim() || '');
        }
      }
    }

    // Get row header
    const rowHeader = row.querySelector('th');
    if (rowHeader && rowHeader !== cell) {
      headers.push(rowHeader.textContent?.trim() || '');
    }

    return headers.filter(Boolean);
  }

  /**
   * Setup DOM observer for dynamic content
   */
  private setupDOMObserver(): void {
    this.observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'childList') {
          mutation.addedNodes.forEach((node) => {
            if (node.nodeType === Node.ELEMENT_NODE) {
              const element = node as HTMLElement;
              this.processNewElement(element);
            }
          });
        } else if (mutation.type === 'attributes') {
          const element = mutation.target as HTMLElement;
          this.processAttributeChange(element, mutation.attributeName);
        }
      });
    });

    this.observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['aria-expanded', 'aria-selected', 'aria-checked'],
    });
  }

  /**
   * Process new element added to DOM
   */
  private processNewElement(element: HTMLElement): void {
    // Announce new modal dialogs
    if (element.getAttribute('role') === 'dialog' || element.matches('[role="dialog"]')) {
      const title = this.getAccessibleName(element) || 'Dialog opened';
      this.announce(title, 'assertive', 100);
    }

    // Announce new alerts
    if (element.getAttribute('role') === 'alert') {
      const message = element.textContent?.trim() || 'Alert';
      this.announce(message, 'assertive');
    }
  }

  /**
   * Process attribute changes
   */
  private processAttributeChange(element: HTMLElement, attributeName: string | null): void {
    if (!attributeName) return;

    switch (attributeName) {
      case 'aria-expanded':
        const expanded = element.getAttribute('aria-expanded') === 'true';
        const label = this.getAccessibleName(element);
        this.announce(`${label} ${expanded ? 'expanded' : 'collapsed'}`, 'polite');
        break;

      case 'aria-selected':
        const selected = element.getAttribute('aria-selected') === 'true';
        if (selected) {
          const itemLabel = this.getAccessibleName(element);
          this.announce(`${itemLabel} selected`, 'polite');
        }
        break;

      case 'aria-checked':
        const checked = element.getAttribute('aria-checked') === 'true';
        const checkboxLabel = this.getAccessibleName(element);
        this.announce(`${checkboxLabel} ${checked ? 'checked' : 'unchecked'}`, 'polite');
        break;
    }
  }

  /**
   * Setup navigation tracking
   */
  private setupNavigationTracking(): void {
    // Track page navigation
    window.addEventListener('popstate', () => {
      this.announcePageChange(document.title, 'Back button used');
    });

    // Track hash changes
    window.addEventListener('hashchange', () => {
      const hash = window.location.hash;
      if (hash) {
        const target = document.querySelector(hash);
        if (target) {
          const label = this.getAccessibleName(target as HTMLElement) || hash;
          this.announce(`Navigated to ${label}`, 'polite');
        }
      }
    });
  }

  /**
   * Remove redundant content
   */
  private removeRedundantContent(element: HTMLElement): void {
    // Remove duplicate alt text and labels
    const images = element.querySelectorAll('img[alt]');
    images.forEach(img => {
      const altText = img.getAttribute('alt') || '';
      const adjacentText = img.nextSibling?.textContent?.trim() || '';
      
      if (altText && adjacentText && altText.includes(adjacentText)) {
        // Hide redundant text from screen readers
        if (img.nextSibling?.nodeType === Node.TEXT_NODE) {
          const span = document.createElement('span');
          span.setAttribute('aria-hidden', 'true');
          span.textContent = adjacentText;
          img.parentNode?.replaceChild(span, img.nextSibling);
        }
      }
    });
  }

  /**
   * Add contextual information
   */
  private addContextualInformation(element: HTMLElement): void {
    // Add table summaries
    const tables = element.querySelectorAll('table:not([aria-label]):not([aria-labelledby])');
    tables.forEach(table => {
      const summary = this.generateTableSummary(table as HTMLElement);
      table.setAttribute('aria-label', summary);
    });

    // Add form summaries
    const forms = element.querySelectorAll('form:not([aria-label]):not([aria-labelledby])');
    forms.forEach(form => {
      const summary = this.generateFormSummary(form as HTMLElement);
      form.setAttribute('aria-label', summary);
    });
  }

  /**
   * Add landmark labels
   */
  private addLandmarkLabels(element: HTMLElement): void {
    // Add navigation labels
    const navs = element.querySelectorAll('nav:not([aria-label]):not([aria-labelledby])');
    navs.forEach((nav, index) => {
      const label = `Navigation ${index > 0 ? index + 1 : ''}`.trim();
      nav.setAttribute('aria-label', label);
    });

    // Add section labels
    const sections = element.querySelectorAll('section:not([aria-label]):not([aria-labelledby])');
    sections.forEach(section => {
      const heading = section.querySelector('h1, h2, h3, h4, h5, h6');
      if (heading) {
        const headingId = heading.id || `heading-${Math.random().toString(36).substr(2, 9)}`;
        if (!heading.id) heading.id = headingId;
        section.setAttribute('aria-labelledby', headingId);
      }
    });
  }

  /**
   * Clear all announcements
   */
  clearAnnouncements(): void {
    this.context.announcementQueue = [];
    this.liveRegions.forEach(region => {
      region.textContent = '';
    });
  }

  /**
   * Set verbosity level
   */
  setVerbosity(level: ScreenReaderVerbosity): void {
    this.verbosity = level;
  }

  /**
   * Get current context
   */
  getContext(): ScreenReaderContext {
    return { ...this.context };
  }

  /**
   * Cleanup screen reader utilities
   */
  destroy(): void {
    // Clear timers
    if (this.announcementTimer) {
      clearTimeout(this.announcementTimer);
    }

    // Stop DOM observer
    if (this.observer) {
      this.observer.disconnect();
    }

    // Remove live regions
    this.liveRegions.forEach(region => {
      if (region.parentNode) {
        region.parentNode.removeChild(region);
      }
    });
    this.liveRegions.clear();

    // Clear context
    this.context.announcementQueue = [];
    this.context.navigationHistory = [];
  }
}