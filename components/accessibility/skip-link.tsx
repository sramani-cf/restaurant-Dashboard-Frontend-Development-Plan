/**
 * Skip Link Component
 * 
 * Provides keyboard navigation skip links for WCAG 2.1 AA compliance.
 * Skip links allow keyboard users to quickly navigate to main content areas.
 */

'use client';

import React from 'react';
import { cn } from '@/utils';

/**
 * Skip link configuration
 */
export interface SkipLinkConfig {
  href: string;
  text: string;
  title?: string;
}

/**
 * Skip links component props
 */
export interface SkipLinksProps {
  links?: SkipLinkConfig[];
  className?: string;
  children?: React.ReactNode;
}

/**
 * Individual skip link props
 */
export interface SkipLinkProps {
  href: string;
  title?: string;
  className?: string;
  onClick?: (event: React.MouseEvent<HTMLAnchorElement>) => void;
  children: React.ReactNode;
}

/**
 * Default skip links configuration
 */
const DEFAULT_SKIP_LINKS: SkipLinkConfig[] = [
  {
    href: '#main-content',
    text: 'Skip to main content',
    title: 'Skip directly to the main content of the page',
  },
  {
    href: '#main-navigation',
    text: 'Skip to navigation',
    title: 'Skip to the main navigation menu',
  },
  {
    href: '#page-footer',
    text: 'Skip to footer',
    title: 'Skip to the page footer',
  },
];

/**
 * Individual Skip Link Component
 */
export const SkipLink: React.FC<SkipLinkProps> = ({
  href,
  title,
  className,
  onClick,
  children,
}) => {
  const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    // Call custom click handler if provided
    if (onClick) {
      onClick(event);
    }

    // Ensure target element is focusable
    const target = document.querySelector(href);
    if (target && target instanceof HTMLElement) {
      // Add tabindex if element is not naturally focusable
      if (!target.hasAttribute('tabindex') && 
          !['A', 'BUTTON', 'INPUT', 'SELECT', 'TEXTAREA'].includes(target.tagName)) {
        target.setAttribute('tabindex', '-1');
      }

      // Focus the target element
      setTimeout(() => {
        target.focus();
        
        // Scroll target into view smoothly
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
          inline: 'nearest',
        });
      }, 100);
    }
  };

  return (
    <a
      href={href}
      title={title}
      onClick={handleClick}
      suppressHydrationWarning
      className={cn(
        // Base styles - hidden by default
        'absolute left-4 top-4 z-50',
        'px-4 py-2',
        'bg-primary text-primary-foreground',
        'border border-primary-foreground/20',
        'rounded-md shadow-lg',
        'font-medium text-sm',
        'transition-all duration-200',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
        
        // Screen reader only by default
        'sr-only',
        
        // Show on focus
        'focus:not-sr-only focus:fixed focus:left-4 focus:top-4',
        
        // Hover effects when visible
        'hover:bg-primary/90 hover:text-primary-foreground',
        'hover:shadow-xl hover:scale-105',
        
        // High contrast mode support
        'contrast-more:border-2 contrast-more:border-current',
        
        className
      )}
    >
      {children}
    </a>
  );
};

/**
 * Skip Links Container Component
 * 
 * Renders multiple skip links for common page landmarks
 */
export const SkipLinks: React.FC<SkipLinksProps> = ({
  links = DEFAULT_SKIP_LINKS,
  className,
  children,
}) => {
  return (
    <nav
      role="navigation"
      aria-label="Skip links"
      className={cn('skip-links-container', className)}
      suppressHydrationWarning
    >
      {/* Default skip links */}
      {links.map((link, index) => (
        <SkipLink
          key={link.href}
          href={link.href}
          title={link.title}
        >
          {link.text}
        </SkipLink>
      ))}
      
      {/* Custom skip links */}
      {children}
    </nav>
  );
};

/**
 * Skip to Main Content Component
 * 
 * Simple component for the most common skip link
 */
export const SkipToMain: React.FC<{
  href?: string;
  text?: string;
  className?: string;
}> = ({
  href = '#main-content',
  text = 'Skip to main content',
  className,
}) => {
  return (
    <SkipLink
      href={href}
      title="Skip directly to the main content of the page"
      className={className}
    >
      {text}
    </SkipLink>
  );
};

/**
 * Skip Navigation Component
 * 
 * Provides skip links for complex navigation scenarios
 */
export const SkipNavigation: React.FC<{
  sections: Array<{
    id: string;
    label: string;
    title?: string;
  }>;
  className?: string;
}> = ({ sections, className }) => {
  if (sections.length === 0) {
    return null;
  }

  return (
    <nav
      role="navigation"
      aria-label="Skip navigation"
      className={cn('skip-navigation', className)}
    >
      {sections.map((section) => (
        <SkipLink
          key={section.id}
          href={`#${section.id}`}
          title={section.title || `Skip to ${section.label}`}
        >
          Skip to {section.label}
        </SkipLink>
      ))}
    </nav>
  );
};

/**
 * Table of Contents Skip Links
 * 
 * Automatically generates skip links for headings in content
 */
export const TableOfContentsSkipLinks: React.FC<{
  containerId?: string;
  headingLevels?: string[];
  maxItems?: number;
  className?: string;
}> = ({
  containerId = 'main-content',
  headingLevels = ['h2', 'h3'],
  maxItems = 5,
  className,
}) => {
  const [headings, setHeadings] = React.useState<Array<{
    id: string;
    text: string;
    level: number;
  }>>([]);

  React.useEffect(() => {
    const container = containerId ? document.getElementById(containerId) : document;
    if (!container) return;

    const selector = headingLevels.join(', ');
    const headingElements = container.querySelectorAll(selector);
    
    const headingData = Array.from(headingElements)
      .slice(0, maxItems)
      .map((heading) => {
        const element = heading as HTMLHeadingElement;
        let id = element.id;
        
        // Generate ID if not present
        if (!id) {
          const text = element.textContent || '';
          id = text
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/^-|-$/g, '');
          
          // Ensure uniqueness
          let counter = 1;
          let uniqueId = id;
          while (document.getElementById(uniqueId)) {
            uniqueId = `${id}-${counter}`;
            counter++;
          }
          
          element.id = uniqueId;
          id = uniqueId;
        }
        
        return {
          id,
          text: element.textContent || '',
          level: parseInt(element.tagName.charAt(1), 10),
        };
      });

    setHeadings(headingData);
  }, [containerId, headingLevels, maxItems]);

  if (headings.length === 0) {
    return null;
  }

  return (
    <nav
      role="navigation"
      aria-label="Table of contents skip links"
      className={cn('toc-skip-links', className)}
    >
      {headings.map((heading) => (
        <SkipLink
          key={heading.id}
          href={`#${heading.id}`}
          title={`Skip to section: ${heading.text}`}
          className={cn(
            // Indent based on heading level
            heading.level === 3 && 'ml-4',
            heading.level === 4 && 'ml-8',
            heading.level === 5 && 'ml-12',
            heading.level === 6 && 'ml-16'
          )}
        >
          {heading.text}
        </SkipLink>
      ))}
    </nav>
  );
};

/**
 * Data Table Skip Links
 * 
 * Provides skip links for large data tables
 */
export const DataTableSkipLinks: React.FC<{
  tableId: string;
  sections?: Array<{
    selector: string;
    label: string;
  }>;
  className?: string;
}> = ({
  tableId,
  sections = [
    { selector: 'thead', label: 'table headers' },
    { selector: 'tbody', label: 'table data' },
    { selector: 'tfoot', label: 'table footer' },
  ],
  className,
}) => {
  const [availableSections, setAvailableSections] = React.useState<Array<{
    id: string;
    label: string;
  }>>([]);

  React.useEffect(() => {
    const table = document.getElementById(tableId);
    if (!table) return;

    const found: Array<{ id: string; label: string }> = [];

    sections.forEach((section) => {
      const element = table.querySelector(section.selector);
      if (element) {
        let id = element.id;
        if (!id) {
          id = `${tableId}-${section.selector}`;
          element.id = id;
        }
        found.push({ id, label: section.label });
      }
    });

    setAvailableSections(found);
  }, [tableId, sections]);

  if (availableSections.length === 0) {
    return null;
  }

  return (
    <nav
      role="navigation"
      aria-label="Table navigation skip links"
      className={cn('table-skip-links', className)}
    >
      {availableSections.map((section) => (
        <SkipLink
          key={section.id}
          href={`#${section.id}`}
          title={`Skip to ${section.label}`}
        >
          Skip to {section.label}
        </SkipLink>
      ))}
    </nav>
  );
};

/**
 * Form Skip Links
 * 
 * Provides skip links for complex forms
 */
export const FormSkipLinks: React.FC<{
  formId: string;
  sections?: Array<{
    selector: string;
    label: string;
  }>;
  className?: string;
}> = ({
  formId,
  sections = [
    { selector: 'fieldset', label: 'form sections' },
    { selector: '.form-actions, .form-buttons', label: 'form actions' },
  ],
  className,
}) => {
  const [formSections, setFormSections] = React.useState<Array<{
    id: string;
    label: string;
  }>>([]);

  React.useEffect(() => {
    const form = document.getElementById(formId);
    if (!form) return;

    const found: Array<{ id: string; label: string }> = [];

    sections.forEach((section) => {
      const elements = form.querySelectorAll(section.selector);
      elements.forEach((element, index) => {
        let id = element.id;
        if (!id) {
          id = `${formId}-${section.selector.replace(/[^a-z0-9]/gi, '-')}-${index}`;
          element.id = id;
        }
        
        // Get section title from legend or heading
        const legend = element.querySelector('legend');
        const heading = element.querySelector('h2, h3, h4, h5, h6');
        const title = legend?.textContent || heading?.textContent || `${section.label} ${index + 1}`;
        
        found.push({ id, label: title });
      });
    });

    setFormSections(found);
  }, [formId, sections]);

  if (formSections.length === 0) {
    return null;
  }

  return (
    <nav
      role="navigation"
      aria-label="Form section skip links"
      className={cn('form-skip-links', className)}
    >
      {formSections.map((section) => (
        <SkipLink
          key={section.id}
          href={`#${section.id}`}
          title={`Skip to ${section.label}`}
        >
          {section.label}
        </SkipLink>
      ))}
    </nav>
  );
};

/**
 * Hook for managing skip link visibility and behavior
 */
export const useSkipLinks = () => {
  const [isSkipLinkActive, setIsSkipLinkActive] = React.useState(false);

  React.useEffect(() => {
    const handleFocus = (event: FocusEvent) => {
      const target = event.target as HTMLElement;
      if (target && target.closest('.skip-links-container')) {
        setIsSkipLinkActive(true);
      } else {
        setIsSkipLinkActive(false);
      }
    };

    document.addEventListener('focusin', handleFocus);
    return () => document.removeEventListener('focusin', handleFocus);
  }, []);

  const announceSkipLinkUsage = (targetId: string) => {
    const target = document.querySelector(targetId);
    if (target) {
      const targetName = target.getAttribute('aria-label') || 
                        target.textContent?.slice(0, 50) || 
                        'content area';
      
      // Create announcement
      const announcement = `Skipped to ${targetName}`;
      
      // Use live region for announcement
      const announcer = document.querySelector('[role="status"]') || 
                       document.querySelector('[aria-live="polite"]');
      
      if (announcer) {
        announcer.textContent = announcement;
        setTimeout(() => {
          announcer.textContent = '';
        }, 1000);
      }
    }
  };

  return {
    isSkipLinkActive,
    announceSkipLinkUsage,
  };
};

// Export default as SkipLinks for convenience
export default SkipLinks;