/**
 * Keyboard Shortcuts Component
 * 
 * Provides discoverable keyboard shortcuts overlay and management
 * to enhance keyboard navigation accessibility.
 */

'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { FocusTrap } from './focus-trap';

/**
 * Keyboard shortcut definition
 */
export interface KeyboardShortcut {
  /** Unique identifier */
  id: string;
  /** Shortcut key combination */
  keys: string[];
  /** Human-readable description */
  description: string;
  /** Category for grouping */
  category?: string;
  /** Handler function */
  handler: (event: KeyboardEvent) => void;
  /** Whether shortcut is enabled */
  enabled?: boolean;
  /** Whether shortcut should prevent default */
  preventDefault?: boolean;
  /** Context where shortcut is active */
  context?: string;
  /** Platform-specific variations */
  platforms?: {
    mac?: string[];
    windows?: string[];
    linux?: string[];
  };
}

/**
 * Shortcut category definition
 */
export interface ShortcutCategory {
  id: string;
  name: string;
  description?: string;
  priority?: number;
}

/**
 * Keyboard shortcuts provider props
 */
export interface KeyboardShortcutsProviderProps {
  shortcuts?: KeyboardShortcut[];
  categories?: ShortcutCategory[];
  globalShortcuts?: boolean;
  showHelp?: boolean;
  helpKey?: string[];
  children: React.ReactNode;
}

/**
 * Keyboard shortcuts context
 */
export interface KeyboardShortcutsContextValue {
  shortcuts: KeyboardShortcut[];
  categories: ShortcutCategory[];
  registerShortcut: (shortcut: KeyboardShortcut) => () => void;
  unregisterShortcut: (id: string) => void;
  updateShortcut: (id: string, updates: Partial<KeyboardShortcut>) => void;
  toggleShortcut: (id: string, enabled?: boolean) => void;
  showHelp: () => void;
  hideHelp: () => void;
  isHelpVisible: boolean;
}

const KeyboardShortcutsContext = React.createContext<KeyboardShortcutsContextValue | null>(null);

/**
 * Hook to use keyboard shortcuts
 */
export const useKeyboardShortcuts = (): KeyboardShortcutsContextValue => {
  const context = React.useContext(KeyboardShortcutsContext);
  if (!context) {
    throw new Error('useKeyboardShortcuts must be used within a KeyboardShortcutsProvider');
  }
  return context;
};

/**
 * Default categories
 */
const DEFAULT_CATEGORIES: ShortcutCategory[] = [
  { id: 'navigation', name: 'Navigation', priority: 1 },
  { id: 'actions', name: 'Actions', priority: 2 },
  { id: 'editing', name: 'Editing', priority: 3 },
  { id: 'view', name: 'View', priority: 4 },
  { id: 'accessibility', name: 'Accessibility', priority: 5 },
];

/**
 * Default global shortcuts
 */
const DEFAULT_SHORTCUTS: KeyboardShortcut[] = [
  {
    id: 'skip-to-main',
    keys: ['Alt', '1'],
    description: 'Skip to main content',
    category: 'navigation',
    handler: () => {
      const main = document.querySelector('#main-content, main, [role="main"]');
      if (main) {
        (main as HTMLElement).focus();
        main.scrollIntoView({ behavior: 'smooth' });
      }
    },
  },
  {
    id: 'skip-to-nav',
    keys: ['Alt', '2'],
    description: 'Skip to navigation',
    category: 'navigation',
    handler: () => {
      const nav = document.querySelector('#main-navigation, nav, [role="navigation"]');
      if (nav) {
        (nav as HTMLElement).focus();
        nav.scrollIntoView({ behavior: 'smooth' });
      }
    },
  },
  {
    id: 'toggle-help',
    keys: ['Alt', '/'],
    description: 'Show keyboard shortcuts help',
    category: 'accessibility',
    handler: () => {
      // This will be handled by the provider
    },
  },
  {
    id: 'close-modal',
    keys: ['Escape'],
    description: 'Close modal or dialog',
    category: 'navigation',
    handler: () => {
      const modal = document.querySelector('[role="dialog"]:not([aria-hidden="true"])');
      if (modal) {
        const closeButton = modal.querySelector('[data-close], [aria-label*="close" i]');
        if (closeButton) {
          (closeButton as HTMLElement).click();
        }
      }
    },
  },
];

/**
 * Utility to detect platform
 */
const getPlatform = (): 'mac' | 'windows' | 'linux' => {
  if (typeof window === 'undefined') return 'windows';
  
  const platform = window.navigator.platform.toLowerCase();
  if (platform.includes('mac')) return 'mac';
  if (platform.includes('linux')) return 'linux';
  return 'windows';
};

/**
 * Utility to normalize key combination
 */
const normalizeKeys = (keys: string[]): string[] => {
  const platform = getPlatform();
  const keyMap: Record<string, string> = {
    'Mod': platform === 'mac' ? 'Cmd' : 'Ctrl',
    'Command': 'Cmd',
    'Control': 'Ctrl',
    'Option': 'Alt',
    'Meta': platform === 'mac' ? 'Cmd' : 'Win',
  };

  return keys.map(key => keyMap[key] || key);
};

/**
 * Utility to format key combination for display
 */
const formatKeyCombo = (keys: string[]): string => {
  const normalized = normalizeKeys(keys);
  const platform = getPlatform();
  
  if (platform === 'mac') {
    return normalized
      .map(key => {
        const symbols: Record<string, string> = {
          'Cmd': '⌘',
          'Ctrl': '⌃',
          'Alt': '⌥',
          'Shift': '⇧',
          'Enter': '↵',
          'Space': '␣',
          'Tab': '⇥',
          'Escape': '⎋',
          'Backspace': '⌫',
          'Delete': '⌦',
          'ArrowUp': '↑',
          'ArrowDown': '↓',
          'ArrowLeft': '←',
          'ArrowRight': '→',
        };
        return symbols[key] || key;
      })
      .join('');
  }
  
  return normalized.join(' + ');
};

/**
 * Utility to check if key combination matches event
 */
const matchesKeyEvent = (keys: string[], event: KeyboardEvent): boolean => {
  const normalized = normalizeKeys(keys);
  const eventKeys: string[] = [];
  
  if (event.ctrlKey) eventKeys.push('Ctrl');
  if (event.altKey) eventKeys.push('Alt');
  if (event.shiftKey) eventKeys.push('Shift');
  if (event.metaKey) eventKeys.push(getPlatform() === 'mac' ? 'Cmd' : 'Win');
  
  eventKeys.push(event.key);
  
  return eventKeys.length === normalized.length && 
         eventKeys.every(key => normalized.includes(key));
};

/**
 * Keyboard Shortcuts Provider Component
 */
export const KeyboardShortcutsProvider: React.FC<KeyboardShortcutsProviderProps> = ({
  shortcuts: initialShortcuts = [],
  categories: initialCategories = DEFAULT_CATEGORIES,
  globalShortcuts = true,
  showHelp: showHelpProp = true,
  helpKey = ['Alt', '/'],
  children,
}) => {
  const [shortcuts, setShortcuts] = React.useState<KeyboardShortcut[]>(() => [
    ...(globalShortcuts ? DEFAULT_SHORTCUTS : []),
    ...initialShortcuts,
  ]);
  const [categories] = React.useState<ShortcutCategory[]>(initialCategories);
  const [isHelpVisible, setIsHelpVisible] = React.useState(false);

  /**
   * Register a new shortcut
   */
  const registerShortcut = React.useCallback((shortcut: KeyboardShortcut) => {
    setShortcuts(prev => {
      const existing = prev.find(s => s.id === shortcut.id);
      if (existing) {
        console.warn(`Shortcut with id "${shortcut.id}" already exists`);
        return prev;
      }
      return [...prev, { ...shortcut, enabled: shortcut.enabled !== false }];
    });

    // Return unregister function
    return () => unregisterShortcut(shortcut.id);
  }, []);

  /**
   * Unregister a shortcut
   */
  const unregisterShortcut = React.useCallback((id: string) => {
    setShortcuts(prev => prev.filter(s => s.id !== id));
  }, []);

  /**
   * Update a shortcut
   */
  const updateShortcut = React.useCallback((id: string, updates: Partial<KeyboardShortcut>) => {
    setShortcuts(prev => 
      prev.map(shortcut => 
        shortcut.id === id ? { ...shortcut, ...updates } : shortcut
      )
    );
  }, []);

  /**
   * Toggle shortcut enabled state
   */
  const toggleShortcut = React.useCallback((id: string, enabled?: boolean) => {
    setShortcuts(prev => 
      prev.map(shortcut => 
        shortcut.id === id 
          ? { ...shortcut, enabled: enabled !== undefined ? enabled : !shortcut.enabled }
          : shortcut
      )
    );
  }, []);

  /**
   * Show help overlay
   */
  const showHelp = React.useCallback(() => {
    setIsHelpVisible(true);
  }, []);

  /**
   * Hide help overlay
   */
  const hideHelp = React.useCallback(() => {
    setIsHelpVisible(false);
  }, []);

  /**
   * Handle keyboard events
   */
  React.useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Check for help shortcut first
      if (showHelpProp && matchesKeyEvent(helpKey, event)) {
        event.preventDefault();
        setIsHelpVisible(prev => !prev);
        return;
      }

      // Skip if help is visible (let help handle its own shortcuts)
      if (isHelpVisible) return;

      // Find matching shortcut
      const matchingShortcut = shortcuts.find(shortcut => 
        shortcut.enabled !== false && 
        matchesKeyEvent(shortcut.keys, event)
      );

      if (matchingShortcut) {
        if (matchingShortcut.preventDefault !== false) {
          event.preventDefault();
          event.stopPropagation();
        }

        try {
          matchingShortcut.handler(event);
        } catch (error) {
          console.error(`Error executing shortcut "${matchingShortcut.id}":`, error);
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown, true);
    return () => document.removeEventListener('keydown', handleKeyDown, true);
  }, [shortcuts, isHelpVisible, showHelpProp, helpKey]);

  const contextValue: KeyboardShortcutsContextValue = React.useMemo(() => ({
    shortcuts,
    categories,
    registerShortcut,
    unregisterShortcut,
    updateShortcut,
    toggleShortcut,
    showHelp,
    hideHelp,
    isHelpVisible,
  }), [
    shortcuts,
    categories,
    registerShortcut,
    unregisterShortcut,
    updateShortcut,
    toggleShortcut,
    showHelp,
    hideHelp,
    isHelpVisible,
  ]);

  return (
    <KeyboardShortcutsContext.Provider value={contextValue}>
      {children}
      {showHelpProp && (
        <KeyboardShortcutsHelp
          isVisible={isHelpVisible}
          onClose={hideHelp}
        />
      )}
    </KeyboardShortcutsContext.Provider>
  );
};

/**
 * Keyboard Shortcuts Help Component
 */
const KeyboardShortcutsHelp: React.FC<{
  isVisible: boolean;
  onClose: () => void;
}> = ({ isVisible, onClose }) => {
  const { shortcuts, categories } = useKeyboardShortcuts();

  // Group shortcuts by category
  const groupedShortcuts = React.useMemo(() => {
    const groups: Record<string, KeyboardShortcut[]> = {};
    
    shortcuts
      .filter(shortcut => shortcut.enabled !== false)
      .forEach(shortcut => {
        const categoryId = shortcut.category || 'other';
        if (!groups[categoryId]) {
          groups[categoryId] = [];
        }
        groups[categoryId].push(shortcut);
      });

    return groups;
  }, [shortcuts]);

  // Sort categories by priority
  const sortedCategories = React.useMemo(() => {
    const categoriesWithShortcuts = categories.filter(cat => 
      groupedShortcuts[cat.id] && groupedShortcuts[cat.id].length > 0
    );
    
    return categoriesWithShortcuts.sort((a, b) => (a.priority || 999) - (b.priority || 999));
  }, [categories, groupedShortcuts]);

  if (!isVisible) return null;

  return (
    <FocusTrap
      active={isVisible}
      config={{
        autoFocus: true,
        restoreFocus: true,
        preventScroll: true,
        initialFocus: '[data-close-help]',
      }}
      onEscapeAttempt={onClose}
    >
      <div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
        role="dialog"
        aria-modal="true"
        aria-labelledby="shortcuts-title"
        aria-describedby="shortcuts-description"
        onClick={(e) => e.target === e.currentTarget && onClose()}
      >
        <div className="bg-background rounded-lg shadow-xl border max-w-2xl w-full max-h-[90vh] overflow-hidden mx-4">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b">
            <div>
              <h2 id="shortcuts-title" className="text-xl font-semibold">
                Keyboard Shortcuts
              </h2>
              <p id="shortcuts-description" className="text-sm text-muted-foreground mt-1">
                Navigate faster with these keyboard shortcuts
              </p>
            </div>
            <button
              data-close-help
              onClick={onClose}
              className="p-2 rounded-md hover:bg-muted focus:outline-none focus:ring-2 focus:ring-ring"
              aria-label="Close shortcuts help"
            >
              <span aria-hidden="true" className="text-xl">×</span>
            </button>
          </div>

          {/* Content */}
          <div className="p-6 overflow-y-auto max-h-[calc(90vh-8rem)]">
            <div className="space-y-6">
              {sortedCategories.map(category => {
                const categoryShortcuts = groupedShortcuts[category.id];
                if (!categoryShortcuts?.length) return null;

                return (
                  <div key={category.id}>
                    <h3 className="text-lg font-medium mb-3 text-foreground">
                      {category.name}
                    </h3>
                    {category.description && (
                      <p className="text-sm text-muted-foreground mb-3">
                        {category.description}
                      </p>
                    )}
                    <div className="space-y-2">
                      {categoryShortcuts.map(shortcut => (
                        <div
                          key={shortcut.id}
                          className="flex items-center justify-between py-2 px-3 rounded-md hover:bg-muted/50"
                        >
                          <span className="text-sm text-foreground">
                            {shortcut.description}
                          </span>
                          <div className="flex items-center gap-1">
                            {shortcut.keys.map((key, index) => (
                              <React.Fragment key={index}>
                                {index > 0 && (
                                  <span className="text-xs text-muted-foreground mx-1">
                                    +
                                  </span>
                                )}
                                <kbd className="px-2 py-1 text-xs bg-muted border border-border rounded">
                                  {formatKeyCombo([key])}
                                </kbd>
                              </React.Fragment>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}

              {/* Other shortcuts (uncategorized) */}
              {groupedShortcuts.other && (
                <div>
                  <h3 className="text-lg font-medium mb-3">Other</h3>
                  <div className="space-y-2">
                    {groupedShortcuts.other.map(shortcut => (
                      <div
                        key={shortcut.id}
                        className="flex items-center justify-between py-2 px-3 rounded-md hover:bg-muted/50"
                      >
                        <span className="text-sm">{shortcut.description}</span>
                        <kbd className="px-2 py-1 text-xs bg-muted border border-border rounded">
                          {formatKeyCombo(shortcut.keys)}
                        </kbd>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Footer */}
          <div className="p-6 border-t bg-muted/50">
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <span>Press {formatKeyCombo(['Escape'])} to close</span>
              <span>{shortcuts.filter(s => s.enabled !== false).length} shortcuts available</span>
            </div>
          </div>
        </div>
      </div>
    </FocusTrap>
  );
};

/**
 * Hook to register component-specific shortcuts
 */
export const useShortcut = (
  keys: string[],
  handler: (event: KeyboardEvent) => void,
  options: {
    description: string;
    category?: string;
    enabled?: boolean;
    preventDefault?: boolean;
    context?: string;
  }
) => {
  const { registerShortcut } = useKeyboardShortcuts();
  const shortcutId = React.useRef<string>();

  React.useEffect(() => {
    const id = `shortcut-${Math.random().toString(36).substr(2, 9)}`;
    shortcutId.current = id;

    const unregister = registerShortcut({
      id,
      keys,
      handler,
      ...options,
    });

    return unregister;
  }, [keys.join(','), handler, options.description, options.category, options.enabled, options.preventDefault, options.context, registerShortcut]);
};

/**
 * Shortcut Display Component
 * 
 * Shows a keyboard shortcut inline
 */
export const ShortcutDisplay: React.FC<{
  keys: string[];
  className?: string;
}> = ({ keys, className }) => {
  return (
    <div className={cn('flex items-center gap-1', className)}>
      {keys.map((key, index) => (
        <React.Fragment key={index}>
          {index > 0 && (
            <span className="text-xs text-muted-foreground">+</span>
          )}
          <kbd className="px-1.5 py-0.5 text-xs bg-muted border border-border rounded">
            {formatKeyCombo([key])}
          </kbd>
        </React.Fragment>
      ))}
    </div>
  );
};

/**
 * Shortcuts Summary Component
 * 
 * Shows a compact list of available shortcuts
 */
export const ShortcutsSummary: React.FC<{
  categoryId?: string;
  limit?: number;
  className?: string;
}> = ({ categoryId, limit, className }) => {
  const { shortcuts } = useKeyboardShortcuts();

  const relevantShortcuts = React.useMemo(() => {
    let filtered = shortcuts.filter(s => s.enabled !== false);
    
    if (categoryId) {
      filtered = filtered.filter(s => s.category === categoryId);
    }
    
    if (limit) {
      filtered = filtered.slice(0, limit);
    }
    
    return filtered;
  }, [shortcuts, categoryId, limit]);

  if (relevantShortcuts.length === 0) {
    return null;
  }

  return (
    <div className={cn('space-y-1', className)}>
      {relevantShortcuts.map(shortcut => (
        <div key={shortcut.id} className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">{shortcut.description}</span>
          <ShortcutDisplay keys={shortcut.keys} />
        </div>
      ))}
    </div>
  );
};

// Export default as KeyboardShortcutsProvider
export default KeyboardShortcutsProvider;