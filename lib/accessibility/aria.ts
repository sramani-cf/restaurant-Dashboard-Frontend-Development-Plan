/**
 * ARIA Attribute Utilities
 * 
 * Provides comprehensive ARIA attribute management for WCAG 2.1 AA compliance
 * including proper roles, states, properties, and relationships.
 */

/**
 * ARIA role definitions with their required and optional attributes
 */
export const ARIA_ROLES = {
  // Landmark roles
  banner: { required: [], optional: ['aria-label', 'aria-labelledby'] },
  navigation: { required: [], optional: ['aria-label', 'aria-labelledby'] },
  main: { required: [], optional: ['aria-label', 'aria-labelledby'] },
  contentinfo: { required: [], optional: ['aria-label', 'aria-labelledby'] },
  complementary: { required: [], optional: ['aria-label', 'aria-labelledby'] },
  search: { required: [], optional: ['aria-label', 'aria-labelledby'] },
  form: { required: [], optional: ['aria-label', 'aria-labelledby'] },
  region: { required: ['aria-label', 'aria-labelledby'], optional: [] },

  // Widget roles
  button: { required: [], optional: ['aria-pressed', 'aria-expanded', 'aria-describedby'] },
  link: { required: [], optional: ['aria-describedby'] },
  checkbox: { required: ['aria-checked'], optional: ['aria-describedby'] },
  radio: { required: ['aria-checked'], optional: ['aria-describedby'] },
  menuitem: { required: [], optional: ['aria-disabled', 'aria-expanded', 'aria-haspopup'] },
  tab: { required: ['aria-selected'], optional: ['aria-controls', 'aria-describedby'] },
  tabpanel: { required: ['aria-labelledby'], optional: ['aria-describedby'] },
  dialog: { required: ['aria-labelledby', 'aria-label'], optional: ['aria-describedby'] },
  alertdialog: { required: ['aria-labelledby', 'aria-label'], optional: ['aria-describedby'] },
  tooltip: { required: [], optional: [] },
  combobox: { required: ['aria-expanded'], optional: ['aria-controls', 'aria-activedescendant'] },
  listbox: { required: [], optional: ['aria-label', 'aria-labelledby', 'aria-multiselectable'] },
  option: { required: ['aria-selected'], optional: ['aria-disabled'] },
  tree: { required: [], optional: ['aria-label', 'aria-labelledby', 'aria-multiselectable'] },
  treeitem: { required: [], optional: ['aria-expanded', 'aria-selected', 'aria-level'] },
  grid: { required: [], optional: ['aria-label', 'aria-labelledby', 'aria-multiselectable'] },
  gridcell: { required: [], optional: ['aria-selected', 'aria-readonly'] },
  slider: { required: ['aria-valuemin', 'aria-valuemax', 'aria-valuenow'], optional: ['aria-valuetext'] },

  // Document structure roles
  article: { required: [], optional: ['aria-label', 'aria-labelledby'] },
  document: { required: [], optional: ['aria-label', 'aria-labelledby'] },
  heading: { required: ['aria-level'], optional: [] },
  list: { required: [], optional: ['aria-label', 'aria-labelledby'] },
  listitem: { required: [], optional: [] },
  table: { required: [], optional: ['aria-label', 'aria-labelledby', 'aria-describedby'] },
  row: { required: [], optional: ['aria-selected', 'aria-expanded'] },
  columnheader: { required: [], optional: ['aria-sort'] },
  rowheader: { required: [], optional: [] },
  cell: { required: [], optional: [] },

  // Live region roles
  alert: { required: [], optional: [] },
  log: { required: [], optional: ['aria-live', 'aria-atomic'] },
  status: { required: [], optional: ['aria-live', 'aria-atomic'] },
  progressbar: { required: [], optional: ['aria-valuemin', 'aria-valuemax', 'aria-valuenow', 'aria-valuetext'] },
} as const;

/**
 * ARIA states and properties
 */
export const ARIA_ATTRIBUTES = {
  // Global states and properties
  'aria-label': { type: 'string', global: true },
  'aria-labelledby': { type: 'idref_list', global: true },
  'aria-describedby': { type: 'idref_list', global: true },
  'aria-hidden': { type: 'boolean', global: true },
  'aria-live': { type: 'token', values: ['off', 'polite', 'assertive'], global: true },
  'aria-atomic': { type: 'boolean', global: true },
  'aria-busy': { type: 'boolean', global: true },
  'aria-disabled': { type: 'boolean', global: true },
  'aria-expanded': { type: 'boolean' },
  'aria-pressed': { type: 'tristate', values: ['true', 'false', 'mixed'] },
  'aria-selected': { type: 'boolean' },
  'aria-checked': { type: 'tristate', values: ['true', 'false', 'mixed'] },
  'aria-current': { type: 'token', values: ['page', 'step', 'location', 'date', 'time', 'true', 'false'] },
  'aria-invalid': { type: 'token', values: ['true', 'false', 'grammar', 'spelling'] },
  'aria-required': { type: 'boolean' },
  'aria-readonly': { type: 'boolean' },
  'aria-multiselectable': { type: 'boolean' },
  'aria-sort': { type: 'token', values: ['ascending', 'descending', 'none', 'other'] },
  'aria-level': { type: 'integer' },
  'aria-valuemin': { type: 'number' },
  'aria-valuemax': { type: 'number' },
  'aria-valuenow': { type: 'number' },
  'aria-valuetext': { type: 'string' },
  'aria-controls': { type: 'idref_list' },
  'aria-haspopup': { type: 'token', values: ['true', 'false', 'menu', 'listbox', 'tree', 'grid', 'dialog'] },
  'aria-activedescendant': { type: 'idref' },
} as const;

/**
 * Validation result interface
 */
export interface AriaValidationResult {
  errors: string[];
  warnings: string[];
  suggestions: string[];
}

/**
 * ARIA relationship types
 */
export interface AriaRelationship {
  source: HTMLElement;
  target: HTMLElement;
  relationship: string;
}

/**
 * ARIA Attribute Manager
 */
export class AriaAttributeManager {
  private relationships: Map<string, AriaRelationship[]> = new Map();
  private generatedIds: Set<string> = new Set();

  /**
   * Set ARIA attribute with validation
   */
  setAttribute(element: HTMLElement, attribute: string, value: string | boolean | number): boolean {
    if (!this.isValidAriaAttribute(attribute)) {
      console.warn(`Invalid ARIA attribute: ${attribute}`);
      return false;
    }

    const validation = this.validateAttributeValue(attribute, value);
    if (!validation.isValid) {
      console.warn(`Invalid value for ${attribute}: ${value}. ${validation.message}`);
      return false;
    }

    // Convert value to string for setAttribute
    const stringValue = typeof value === 'boolean' ? value.toString() : String(value);
    element.setAttribute(attribute, stringValue);

    // Track relationships
    if (this.isRelationshipAttribute(attribute)) {
      this.trackRelationship(element, attribute, stringValue);
    }

    return true;
  }

  /**
   * Remove ARIA attribute
   */
  removeAttribute(element: HTMLElement, attribute: string): void {
    element.removeAttribute(attribute);
    
    // Clean up relationships
    if (this.isRelationshipAttribute(attribute)) {
      this.removeRelationship(element, attribute);
    }
  }

  /**
   * Set role with validation
   */
  setRole(element: HTMLElement, role: string): boolean {
    if (!this.isValidRole(role)) {
      console.warn(`Invalid ARIA role: ${role}`);
      return false;
    }

    element.setAttribute('role', role);
    
    // Validate required attributes for this role
    const roleDefinition = ARIA_ROLES[role as keyof typeof ARIA_ROLES];
    if (roleDefinition) {
      this.validateRoleRequirements(element, role, roleDefinition);
    }

    return true;
  }

  /**
   * Generate unique ID for element
   */
  generateId(prefix = 'aria'): string {
    let id: string;
    do {
      id = `${prefix}-${Math.random().toString(36).substr(2, 9)}`;
    } while (document.getElementById(id) || this.generatedIds.has(id));
    
    this.generatedIds.add(id);
    return id;
  }

  /**
   * Ensure element has an ID, generating one if necessary
   */
  ensureId(element: HTMLElement, prefix = 'aria'): string {
    if (!element.id) {
      element.id = this.generateId(prefix);
    }
    return element.id;
  }

  /**
   * Create label relationship
   */
  createLabel(element: HTMLElement, labelText: string, labelId?: string): HTMLElement {
    const labelElement = document.createElement('span');
    labelElement.textContent = labelText;
    labelElement.id = labelId || this.generateId('label');
    labelElement.className = 'sr-only'; // Screen reader only
    
    // Insert label before the element
    element.parentNode?.insertBefore(labelElement, element);
    
    // Set aria-labelledby relationship
    this.setAttribute(element, 'aria-labelledby', labelElement.id);
    
    return labelElement;
  }

  /**
   * Create description relationship
   */
  createDescription(element: HTMLElement, descriptionText: string, descriptionId?: string): HTMLElement {
    const descriptionElement = document.createElement('span');
    descriptionElement.textContent = descriptionText;
    descriptionElement.id = descriptionId || this.generateId('desc');
    descriptionElement.className = 'sr-only'; // Screen reader only
    
    // Insert description after the element
    if (element.nextSibling) {
      element.parentNode?.insertBefore(descriptionElement, element.nextSibling);
    } else {
      element.parentNode?.appendChild(descriptionElement);
    }
    
    // Set aria-describedby relationship
    const existingDescribedBy = element.getAttribute('aria-describedby');
    const newDescribedBy = existingDescribedBy 
      ? `${existingDescribedBy} ${descriptionElement.id}`
      : descriptionElement.id;
    
    this.setAttribute(element, 'aria-describedby', newDescribedBy);
    
    return descriptionElement;
  }

  /**
   * Set up combobox relationships
   */
  setupCombobox(
    combobox: HTMLElement,
    listbox: HTMLElement,
    options: HTMLElement[]
  ): void {
    // Ensure IDs
    const comboboxId = this.ensureId(combobox, 'combobox');
    const listboxId = this.ensureId(listbox, 'listbox');
    
    // Set up combobox
    this.setRole(combobox, 'combobox');
    this.setAttribute(combobox, 'aria-expanded', false);
    this.setAttribute(combobox, 'aria-controls', listboxId);
    this.setAttribute(combobox, 'aria-autocomplete', 'list');
    
    // Set up listbox
    this.setRole(listbox, 'listbox');
    this.setAttribute(listbox, 'aria-labelledby', comboboxId);
    
    // Set up options
    options.forEach((option, index) => {
      this.ensureId(option, `option-${index}`);
      this.setRole(option, 'option');
      this.setAttribute(option, 'aria-selected', false);
    });
  }

  /**
   * Set up tabs relationships
   */
  setupTabs(
    tablist: HTMLElement,
    tabs: HTMLElement[],
    tabpanels: HTMLElement[]
  ): void {
    // Set up tablist
    this.setRole(tablist, 'tablist');
    
    // Set up tabs and panels
    tabs.forEach((tab, index) => {
      const tabId = this.ensureId(tab, `tab-${index}`);
      const panelId = this.ensureId(tabpanels[index], `panel-${index}`);
      
      // Set up tab
      this.setRole(tab, 'tab');
      this.setAttribute(tab, 'aria-selected', index === 0);
      this.setAttribute(tab, 'aria-controls', panelId);
      this.setAttribute(tab, 'tabindex', index === 0 ? 0 : -1);
      
      // Set up panel
      this.setRole(tabpanels[index], 'tabpanel');
      this.setAttribute(tabpanels[index], 'aria-labelledby', tabId);
      this.setAttribute(tabpanels[index], 'aria-hidden', index !== 0);
    });
  }

  /**
   * Set up dialog relationships
   */
  setupDialog(
    dialog: HTMLElement,
    titleElement?: HTMLElement,
    descriptionElement?: HTMLElement
  ): void {
    // Set up dialog
    this.setRole(dialog, 'dialog');
    this.setAttribute(dialog, 'aria-modal', true);
    
    // Set up title relationship
    if (titleElement) {
      const titleId = this.ensureId(titleElement, 'dialog-title');
      this.setAttribute(dialog, 'aria-labelledby', titleId);
    }
    
    // Set up description relationship
    if (descriptionElement) {
      const descId = this.ensureId(descriptionElement, 'dialog-desc');
      this.setAttribute(dialog, 'aria-describedby', descId);
    }
  }

  /**
   * Validate element's ARIA attributes
   */
  validateElement(element: HTMLElement): AriaValidationResult {
    const result: AriaValidationResult = {
      errors: [],
      warnings: [],
      suggestions: []
    };

    // Get element's role
    const role = element.getAttribute('role');
    
    // Validate role-specific requirements
    if (role && ARIA_ROLES[role as keyof typeof ARIA_ROLES]) {
      const roleRequirements = ARIA_ROLES[role as keyof typeof ARIA_ROLES];
      this.validateRoleRequirements(element, role, roleRequirements, result);
    }

    // Validate all ARIA attributes
    Array.from(element.attributes).forEach(attr => {
      if (attr.name.startsWith('aria-')) {
        const validation = this.validateAttributeValue(attr.name, attr.value);
        if (!validation.isValid) {
          result.errors.push(`Invalid ${attr.name}: ${validation.message}`);
        }
      }
    });

    // Check for accessibility improvements
    this.suggestImprovements(element, result);

    return result;
  }

  /**
   * Check if attribute is a valid ARIA attribute
   */
  private isValidAriaAttribute(attribute: string): boolean {
    return attribute in ARIA_ATTRIBUTES || attribute === 'role';
  }

  /**
   * Check if role is valid
   */
  private isValidRole(role: string): boolean {
    return role in ARIA_ROLES;
  }

  /**
   * Validate attribute value
   */
  private validateAttributeValue(
    attribute: string,
    value: string | boolean | number
  ): { isValid: boolean; message?: string } {
    const attrDef = ARIA_ATTRIBUTES[attribute as keyof typeof ARIA_ATTRIBUTES];
    if (!attrDef) {
      return { isValid: false, message: 'Unknown ARIA attribute' };
    }

    const stringValue = String(value);

    switch (attrDef.type) {
      case 'boolean':
        if (!['true', 'false'].includes(stringValue)) {
          return { isValid: false, message: 'Must be "true" or "false"' };
        }
        break;

      case 'tristate':
        if (attrDef.values && !attrDef.values.includes(stringValue)) {
          return { isValid: false, message: `Must be one of: ${attrDef.values.join(', ')}` };
        }
        break;

      case 'token':
        if (attrDef.values && !attrDef.values.includes(stringValue)) {
          return { isValid: false, message: `Must be one of: ${attrDef.values.join(', ')}` };
        }
        break;

      case 'integer':
        if (!/^\d+$/.test(stringValue)) {
          return { isValid: false, message: 'Must be an integer' };
        }
        break;

      case 'number':
        if (isNaN(Number(stringValue))) {
          return { isValid: false, message: 'Must be a number' };
        }
        break;

      case 'idref':
        if (!document.getElementById(stringValue)) {
          return { isValid: false, message: 'Referenced element does not exist' };
        }
        break;

      case 'idref_list':
        const ids = stringValue.split(/\s+/);
        for (const id of ids) {
          if (id && !document.getElementById(id)) {
            return { isValid: false, message: `Referenced element "${id}" does not exist` };
          }
        }
        break;
    }

    return { isValid: true };
  }

  /**
   * Track relationship between elements
   */
  private trackRelationship(element: HTMLElement, attribute: string, value: string): void {
    const ids = value.split(/\s+/);
    const elementId = this.ensureId(element);
    
    ids.forEach(id => {
      const target = document.getElementById(id);
      if (target) {
        const relationship: AriaRelationship = {
          source: element,
          target: target,
          relationship: attribute
        };
        
        if (!this.relationships.has(elementId)) {
          this.relationships.set(elementId, []);
        }
        this.relationships.get(elementId)!.push(relationship);
      }
    });
  }

  /**
   * Remove relationship tracking
   */
  private removeRelationship(element: HTMLElement, attribute: string): void {
    const elementId = element.id;
    if (elementId && this.relationships.has(elementId)) {
      const relationships = this.relationships.get(elementId)!;
      const filtered = relationships.filter(rel => rel.relationship !== attribute);
      
      if (filtered.length === 0) {
        this.relationships.delete(elementId);
      } else {
        this.relationships.set(elementId, filtered);
      }
    }
  }

  /**
   * Check if attribute creates relationships
   */
  private isRelationshipAttribute(attribute: string): boolean {
    return ['aria-labelledby', 'aria-describedby', 'aria-controls', 'aria-activedescendant'].includes(attribute);
  }

  /**
   * Validate role requirements
   */
  private validateRoleRequirements(
    element: HTMLElement,
    role: string,
    roleDefinition: { required: string[]; optional: string[] },
    result?: AriaValidationResult
  ): void {
    // Check required attributes
    roleDefinition.required.forEach(requiredAttr => {
      if (!element.hasAttribute(requiredAttr)) {
        const message = `Role "${role}" requires attribute "${requiredAttr}"`;
        if (result) {
          result.errors.push(message);
        } else {
          console.warn(message);
        }
      }
    });
  }

  /**
   * Suggest accessibility improvements
   */
  private suggestImprovements(element: HTMLElement, result: AriaValidationResult): void {
    // Check for missing labels
    if (this.needsLabel(element) && !this.hasLabel(element)) {
      result.suggestions.push('Consider adding aria-label or aria-labelledby');
    }

    // Check for missing descriptions
    if (this.couldBenefitFromDescription(element) && !element.hasAttribute('aria-describedby')) {
      result.suggestions.push('Consider adding aria-describedby for additional context');
    }

    // Check for keyboard accessibility
    if (this.isInteractive(element) && !this.isKeyboardAccessible(element)) {
      result.warnings.push('Interactive element may not be keyboard accessible');
    }
  }

  /**
   * Check if element needs a label
   */
  private needsLabel(element: HTMLElement): boolean {
    const role = element.getAttribute('role');
    const tagName = element.tagName.toLowerCase();
    
    return (
      ['button', 'link', 'checkbox', 'radio', 'textbox', 'combobox'].includes(role || tagName) ||
      ['input', 'button', 'select', 'textarea'].includes(tagName)
    );
  }

  /**
   * Check if element has a label
   */
  private hasLabel(element: HTMLElement): boolean {
    return !!(
      element.getAttribute('aria-label') ||
      element.getAttribute('aria-labelledby') ||
      element.textContent?.trim() ||
      (element.tagName === 'INPUT' && element.getAttribute('placeholder')) ||
      document.querySelector(`label[for="${element.id}"]`)
    );
  }

  /**
   * Check if element could benefit from description
   */
  private couldBenefitFromDescription(element: HTMLElement): boolean {
    const role = element.getAttribute('role');
    return ['button', 'link', 'dialog', 'alertdialog'].includes(role || element.tagName.toLowerCase());
  }

  /**
   * Check if element is interactive
   */
  private isInteractive(element: HTMLElement): boolean {
    const interactiveTags = ['button', 'a', 'input', 'select', 'textarea'];
    const interactiveRoles = ['button', 'link', 'checkbox', 'radio', 'textbox', 'combobox', 'menuitem', 'tab'];
    
    return (
      interactiveTags.includes(element.tagName.toLowerCase()) ||
      interactiveRoles.includes(element.getAttribute('role') || '') ||
      element.hasAttribute('onclick') ||
      element.tabIndex >= 0
    );
  }

  /**
   * Check if element is keyboard accessible
   */
  private isKeyboardAccessible(element: HTMLElement): boolean {
    return (
      element.tabIndex >= 0 ||
      ['A', 'BUTTON', 'INPUT', 'SELECT', 'TEXTAREA'].includes(element.tagName) ||
      element.hasAttribute('onclick') ||
      element.hasAttribute('onkeydown')
    );
  }

  /**
   * Get all relationships for debugging
   */
  getRelationships(): Map<string, AriaRelationship[]> {
    return new Map(this.relationships);
  }

  /**
   * Clean up generated IDs and relationships
   */
  cleanup(): void {
    this.relationships.clear();
    this.generatedIds.clear();
  }
}

/**
 * Utility functions for common ARIA patterns
 */

/**
 * Make element accessible as a button
 */
export function makeAccessibleButton(element: HTMLElement, label?: string): void {
  const ariaManager = new AriaAttributeManager();
  
  ariaManager.setRole(element, 'button');
  element.setAttribute('tabindex', '0');
  
  if (label) {
    ariaManager.setAttribute(element, 'aria-label', label);
  }
  
  // Add keyboard event handling
  element.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      element.click();
    }
  });
}

/**
 * Make element accessible as a link
 */
export function makeAccessibleLink(element: HTMLElement, href?: string, label?: string): void {
  const ariaManager = new AriaAttributeManager();
  
  if (href) {
    (element as HTMLAnchorElement).href = href;
  }
  
  if (!element.tagName === 'A') {
    ariaManager.setRole(element, 'link');
    element.setAttribute('tabindex', '0');
  }
  
  if (label) {
    ariaManager.setAttribute(element, 'aria-label', label);
  }
  
  // Add keyboard event handling for non-anchor elements
  if (element.tagName !== 'A') {
    element.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') {
        event.preventDefault();
        element.click();
      }
    });
  }
}

/**
 * Set up live region for announcements
 */
export function setupLiveRegion(element: HTMLElement, politeness: 'polite' | 'assertive' = 'polite'): void {
  const ariaManager = new AriaAttributeManager();
  
  ariaManager.setAttribute(element, 'aria-live', politeness);
  ariaManager.setAttribute(element, 'aria-atomic', true);
  
  // Hide from visual display but keep for screen readers
  element.className = 'sr-only';
}

/**
 * Create skip link for keyboard navigation
 */
export function createSkipLink(targetId: string, text = 'Skip to main content'): HTMLElement {
  const ariaManager = new AriaAttributeManager();
  
  const skipLink = document.createElement('a');
  skipLink.href = `#${targetId}`;
  skipLink.textContent = text;
  skipLink.className = 'skip-link sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50';
  
  // Ensure target exists and is focusable
  const target = document.getElementById(targetId);
  if (target) {
    if (!target.hasAttribute('tabindex')) {
      target.setAttribute('tabindex', '-1');
    }
  }
  
  return skipLink;
}

/**
 * Ensure proper heading hierarchy
 */
export function validateHeadingHierarchy(container: HTMLElement = document.body): string[] {
  const issues: string[] = [];
  const headings = container.querySelectorAll('h1, h2, h3, h4, h5, h6, [role="heading"]');
  
  let previousLevel = 0;
  
  headings.forEach((heading, index) => {
    let currentLevel: number;
    
    if (heading.hasAttribute('role') && heading.getAttribute('role') === 'heading') {
      const ariaLevel = heading.getAttribute('aria-level');
      currentLevel = ariaLevel ? parseInt(ariaLevel, 10) : 1;
    } else {
      currentLevel = parseInt(heading.tagName.charAt(1), 10);
    }
    
    if (index === 0 && currentLevel !== 1) {
      issues.push(`First heading should be level 1, found level ${currentLevel}`);
    } else if (index > 0 && currentLevel > previousLevel + 1) {
      issues.push(`Heading level jumped from ${previousLevel} to ${currentLevel}. Consider using level ${previousLevel + 1} instead.`);
    }
    
    previousLevel = currentLevel;
  });
  
  return issues;
}