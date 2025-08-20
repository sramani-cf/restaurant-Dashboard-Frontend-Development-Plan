/**
 * Accessibility Settings Page
 * 
 * Provides comprehensive accessibility settings and preferences management
 * for WCAG 2.1 AA compliance and user customization.
 */

'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import {
  useAccessibilityPreferences,
  useMediaPreferences,
  useColorContrast,
  useAccessibilityTest,
} from '@/hooks/useAccessibility';
import { AnnouncerProvider, useAnnouncer } from '@/components/accessibility/announcer';
import { SkipLinks } from '@/components/accessibility/skip-link';
import { KeyboardShortcutsProvider, ShortcutsSummary } from '@/components/accessibility/keyboard-shortcuts';

/**
 * Settings section component
 */
const SettingsSection: React.FC<{
  title: string;
  description?: string;
  children: React.ReactNode;
}> = ({ title, description, children }) => (
  <section
    className="space-y-4 p-6 border rounded-lg bg-card"
    aria-labelledby={`section-${title.toLowerCase().replace(/\s+/g, '-')}`}
  >
    <div>
      <h2
        id={`section-${title.toLowerCase().replace(/\s+/g, '-')}`}
        className="text-xl font-semibold text-foreground"
      >
        {title}
      </h2>
      {description && (
        <p className="text-sm text-muted-foreground mt-1">
          {description}
        </p>
      )}
    </div>
    {children}
  </section>
);

/**
 * Toggle setting component
 */
const ToggleSetting: React.FC<{
  id: string;
  label: string;
  description?: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
}> = ({ id, label, description, checked, onChange, disabled }) => {
  const { announce } = useAnnouncer();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.checked;
    onChange(newValue);
    announce(`${label} ${newValue ? 'enabled' : 'disabled'}`, 'polite');
  };

  return (
    <div className="flex items-start space-x-3">
      <div className="flex items-center">
        <input
          type="checkbox"
          id={id}
          checked={checked}
          onChange={handleChange}
          disabled={disabled}
          className={cn(
            'w-4 h-4 text-primary bg-background border-2 border-input rounded',
            'focus:ring-2 focus:ring-ring focus:ring-offset-2',
            'disabled:opacity-50 disabled:cursor-not-allowed'
          )}
          aria-describedby={description ? `${id}-description` : undefined}
        />
      </div>
      <div className="flex-1 min-w-0">
        <label
          htmlFor={id}
          className="text-sm font-medium text-foreground cursor-pointer"
        >
          {label}
        </label>
        {description && (
          <p
            id={`${id}-description`}
            className="text-sm text-muted-foreground mt-1"
          >
            {description}
          </p>
        )}
      </div>
    </div>
  );
};

/**
 * Select setting component
 */
const SelectSetting: React.FC<{
  id: string;
  label: string;
  description?: string;
  value: string;
  options: Array<{ value: string; label: string }>;
  onChange: (value: string) => void;
}> = ({ id, label, description, value, options, onChange }) => {
  const { announce } = useAnnouncer();

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newValue = event.target.value;
    onChange(newValue);
    const selectedOption = options.find(opt => opt.value === newValue);
    announce(`${label} changed to ${selectedOption?.label || newValue}`, 'polite');
  };

  return (
    <div className="space-y-2">
      <label
        htmlFor={id}
        className="text-sm font-medium text-foreground block"
      >
        {label}
      </label>
      {description && (
        <p className="text-sm text-muted-foreground">
          {description}
        </p>
      )}
      <select
        id={id}
        value={value}
        onChange={handleChange}
        className={cn(
          'w-full px-3 py-2 text-sm bg-background border border-input rounded-md',
          'focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent'
        )}
        aria-describedby={description ? `${id}-description` : undefined}
      >
        {options.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

/**
 * Contrast test component
 */
const ContrastTest: React.FC = () => {
  const { issues, validateContainer, setLevel } = useColorContrast();
  const [isValidating, setIsValidating] = React.useState(false);
  const [selectedLevel, setSelectedLevel] = React.useState<'AA' | 'AAA'>('AA');
  const { announce } = useAnnouncer();

  const runContrastTest = async () => {
    setIsValidating(true);
    announce('Running color contrast validation', 'polite');
    
    try {
      setLevel(selectedLevel);
      await validateContainer();
      
      const issueCount = issues.length;
      announce(
        issueCount === 0 
          ? `Contrast validation complete. No issues found.`
          : `Contrast validation complete. ${issueCount} issue${issueCount > 1 ? 's' : ''} found.`,
        'polite'
      );
    } catch (error) {
      announce('Contrast validation failed', 'assertive');
    } finally {
      setIsValidating(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <SelectSetting
          id="contrast-level"
          label="WCAG Level"
          value={selectedLevel}
          options={[
            { value: 'AA', label: 'WCAG AA (4.5:1)' },
            { value: 'AAA', label: 'WCAG AAA (7:1)' },
          ]}
          onChange={(value) => setSelectedLevel(value as 'AA' | 'AAA')}
        />
        <button
          onClick={runContrastTest}
          disabled={isValidating}
          className={cn(
            'px-4 py-2 bg-primary text-primary-foreground rounded-md',
            'hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-ring',
            'disabled:opacity-50 disabled:cursor-not-allowed'
          )}
        >
          {isValidating ? 'Validating...' : 'Test Contrast'}
        </button>
      </div>

      {issues.length > 0 && (
        <div
          role="region"
          aria-labelledby="contrast-issues-title"
          className="border border-destructive/50 rounded-md p-4 bg-destructive/5"
        >
          <h3
            id="contrast-issues-title"
            className="font-medium text-destructive mb-2"
          >
            Contrast Issues Found ({issues.length})
          </h3>
          <ul className="space-y-2 text-sm">
            {issues.slice(0, 5).map((issue, index) => (
              <li key={index} className="text-muted-foreground">
                <span className="font-medium">Ratio {issue.ratio.toFixed(2)}:</span> {issue.message}
              </li>
            ))}
            {issues.length > 5 && (
              <li className="text-muted-foreground italic">
                And {issues.length - 5} more issues...
              </li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

/**
 * Accessibility test component
 */
const AccessibilityTest: React.FC = () => {
  const { runAudit, isLoading, results } = useAccessibilityTest();
  const { announce } = useAnnouncer();

  const handleRunTest = async () => {
    announce('Running accessibility audit', 'polite');
    const auditResults = await runAudit();
    
    if (auditResults) {
      const violationCount = auditResults.violations?.length || 0;
      announce(
        violationCount === 0 
          ? 'Accessibility audit complete. No violations found.'
          : `Accessibility audit complete. ${violationCount} violation${violationCount > 1 ? 's' : ''} found.`,
        'polite'
      );
    }
  };

  return (
    <div className="space-y-4">
      <button
        onClick={handleRunTest}
        disabled={isLoading}
        className={cn(
          'px-4 py-2 bg-primary text-primary-foreground rounded-md',
          'hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-ring',
          'disabled:opacity-50 disabled:cursor-not-allowed'
        )}
      >
        {isLoading ? 'Running Audit...' : 'Run Accessibility Audit'}
      </button>

      {results && (
        <div
          role="region"
          aria-labelledby="audit-results-title"
          className="border rounded-md p-4 bg-muted/50"
        >
          <h3
            id="audit-results-title"
            className="font-medium mb-2"
          >
            Audit Results
          </h3>
          {results.violations ? (
            <div className="space-y-2 text-sm">
              <p>
                <span className="font-medium">Violations:</span> {results.violations.length}
              </p>
              <p>
                <span className="font-medium">Passes:</span> {results.passes?.length || 0}
              </p>
              <p>
                <span className="font-medium">Incomplete:</span> {results.incomplete?.length || 0}
              </p>
            </div>
          ) : results.passes !== undefined ? (
            <p className="text-sm text-green-600">
              Test completed successfully. {results.passes ? 'Passed' : 'Issues found'}
            </p>
          ) : (
            <p className="text-sm text-muted-foreground">
              Unable to parse audit results
            </p>
          )}
        </div>
      )}
    </div>
  );
};

/**
 * Main accessibility settings content
 */
const AccessibilitySettingsContent: React.FC = () => {
  const {
    preferences,
    updatePreference,
    updatePreferences,
    resetPreferences,
  } = useAccessibilityPreferences();
  
  const mediaPreferences = useMediaPreferences();
  const { announce } = useAnnouncer();

  const handleResetSettings = () => {
    resetPreferences();
    announce('Accessibility settings reset to defaults', 'polite');
  };

  // Apply preferences to DOM
  React.useEffect(() => {
    const root = document.documentElement;
    
    // Apply CSS classes based on preferences
    root.classList.toggle('reduce-motion', preferences.reduceMotion);
    root.classList.toggle('high-contrast', preferences.highContrast);
    root.classList.toggle('focus-rings-visible', preferences.focusRings);
    
    // Apply font size
    root.classList.remove('font-small', 'font-medium', 'font-large', 'font-extra-large');
    root.classList.add(`font-${preferences.fontSize}`);
    
    // Apply color scheme
    if (preferences.colorScheme !== 'auto') {
      root.classList.toggle('dark', preferences.colorScheme === 'dark');
    }
  }, [preferences]);

  return (
    <div className="space-y-8">
      {/* Display Preferences */}
      <SettingsSection
        title="Display Preferences"
        description="Customize visual appearance and layout options"
      >
        <div className="space-y-4">
          <ToggleSetting
            id="reduce-motion"
            label="Reduce Motion"
            description="Minimize animations and transitions"
            checked={preferences.reduceMotion}
            onChange={(checked) => updatePreference('reduceMotion', checked)}
          />
          
          <ToggleSetting
            id="high-contrast"
            label="High Contrast Mode"
            description="Increase contrast for better visibility"
            checked={preferences.highContrast}
            onChange={(checked) => updatePreference('highContrast', checked)}
          />
          
          <ToggleSetting
            id="focus-rings"
            label="Visible Focus Indicators"
            description="Show focus outlines on interactive elements"
            checked={preferences.focusRings}
            onChange={(checked) => updatePreference('focusRings', checked)}
          />

          <SelectSetting
            id="font-size"
            label="Text Size"
            description="Adjust text size for better readability"
            value={preferences.fontSize}
            options={[
              { value: 'small', label: 'Small' },
              { value: 'medium', label: 'Medium' },
              { value: 'large', label: 'Large' },
              { value: 'extra-large', label: 'Extra Large' },
            ]}
            onChange={(value) => updatePreference('fontSize', value as any)}
          />

          <SelectSetting
            id="color-scheme"
            label="Color Scheme"
            description="Choose between light, dark, or system preference"
            value={preferences.colorScheme}
            options={[
              { value: 'auto', label: 'System Preference' },
              { value: 'light', label: 'Light Mode' },
              { value: 'dark', label: 'Dark Mode' },
            ]}
            onChange={(value) => updatePreference('colorScheme', value as any)}
          />
        </div>
      </SettingsSection>

      {/* Navigation Preferences */}
      <SettingsSection
        title="Navigation Preferences"
        description="Configure keyboard and screen reader behavior"
      >
        <div className="space-y-4">
          <SelectSetting
            id="screen-reader-level"
            label="Screen Reader Verbosity"
            description="Control how much information is announced"
            value={preferences.screenReaderLevel}
            options={[
              { value: 'minimal', label: 'Minimal' },
              { value: 'moderate', label: 'Moderate' },
              { value: 'verbose', label: 'Verbose' },
            ]}
            onChange={(value) => updatePreference('screenReaderLevel', value as any)}
          />

          <SelectSetting
            id="keyboard-mode"
            label="Keyboard Navigation Mode"
            description="Choose standard or enhanced keyboard shortcuts"
            value={preferences.keyboardMode}
            options={[
              { value: 'standard', label: 'Standard' },
              { value: 'enhanced', label: 'Enhanced' },
            ]}
            onChange={(value) => updatePreference('keyboardMode', value as any)}
          />

          <SelectSetting
            id="contrast-level"
            label="Color Contrast Standard"
            description="WCAG compliance level for color contrast"
            value={preferences.contrastLevel}
            options={[
              { value: 'AA', label: 'WCAG AA' },
              { value: 'AAA', label: 'WCAG AAA' },
            ]}
            onChange={(value) => updatePreference('contrastLevel', value as any)}
          />
        </div>
      </SettingsSection>

      {/* System Preferences (Read-only) */}
      <SettingsSection
        title="System Preferences"
        description="Detected system accessibility preferences"
      >
        <div className="space-y-4">
          <div className="text-sm space-y-2">
            <p className="flex justify-between">
              <span>Prefers Reduced Motion:</span>
              <span className={mediaPreferences.prefersReducedMotion ? 'text-green-600' : 'text-muted-foreground'}>
                {mediaPreferences.prefersReducedMotion ? 'Yes' : 'No'}
              </span>
            </p>
            <p className="flex justify-between">
              <span>Prefers High Contrast:</span>
              <span className={mediaPreferences.prefersHighContrast ? 'text-green-600' : 'text-muted-foreground'}>
                {mediaPreferences.prefersHighContrast ? 'Yes' : 'No'}
              </span>
            </p>
            <p className="flex justify-between">
              <span>Prefers Dark Mode:</span>
              <span className={mediaPreferences.prefersDarkMode ? 'text-green-600' : 'text-muted-foreground'}>
                {mediaPreferences.prefersDarkMode ? 'Yes' : 'No'}
              </span>
            </p>
          </div>
        </div>
      </SettingsSection>

      {/* Color Contrast Testing */}
      <SettingsSection
        title="Color Contrast Testing"
        description="Test and validate color contrast ratios"
      >
        <ContrastTest />
      </SettingsSection>

      {/* Accessibility Testing */}
      <SettingsSection
        title="Accessibility Testing"
        description="Run comprehensive accessibility audits"
      >
        <AccessibilityTest />
      </SettingsSection>

      {/* Keyboard Shortcuts */}
      <SettingsSection
        title="Available Keyboard Shortcuts"
        description="Quick reference for keyboard navigation"
      >
        <div className="space-y-4">
          <ShortcutsSummary categoryId="accessibility" limit={5} />
          <p className="text-sm text-muted-foreground">
            Press <kbd className="px-2 py-1 bg-muted border rounded text-xs">Alt + /</kbd> to view all shortcuts
          </p>
        </div>
      </SettingsSection>

      {/* Reset Settings */}
      <SettingsSection
        title="Reset Settings"
        description="Restore default accessibility preferences"
      >
        <button
          onClick={handleResetSettings}
          className={cn(
            'px-4 py-2 bg-destructive text-destructive-foreground rounded-md',
            'hover:bg-destructive/90 focus:outline-none focus:ring-2 focus:ring-ring'
          )}
        >
          Reset All Settings
        </button>
      </SettingsSection>
    </div>
  );
};

/**
 * Main accessibility settings page
 */
export default function AccessibilityPage() {
  return (
    <AnnouncerProvider debugMode={false}>
      <KeyboardShortcutsProvider>
        <div className="min-h-screen bg-background">
          {/* Skip Links */}
          <SkipLinks />

          <div className="container mx-auto px-4 py-8">
            {/* Page Header */}
            <header className="mb-8">
              <h1 className="text-3xl font-bold text-foreground mb-2">
                Accessibility Settings
              </h1>
              <p className="text-lg text-muted-foreground">
                Configure accessibility preferences and test WCAG compliance
              </p>
            </header>

            {/* Main Content */}
            <main id="main-content" tabIndex={-1}>
              <AccessibilitySettingsContent />
            </main>

            {/* Footer */}
            <footer className="mt-12 pt-8 border-t">
              <div className="text-center text-sm text-muted-foreground">
                <p>
                  For additional accessibility support, please contact{' '}
                  <a
                    href="mailto:accessibility@restaurant-dashboard.com"
                    className="text-primary hover:underline focus:outline-none focus:ring-2 focus:ring-ring rounded"
                  >
                    accessibility@restaurant-dashboard.com
                  </a>
                </p>
              </div>
            </footer>
          </div>
        </div>
      </KeyboardShortcutsProvider>
    </AnnouncerProvider>
  );
}