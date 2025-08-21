'use client';

import * as React from 'react';
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react';
import { cn } from './utils';

export interface TabItem {
  key: string;
  label: string;
  content: React.ReactNode;
  disabled?: boolean;
  badge?: string | number;
  icon?: React.ReactNode;
}

export interface TabsProps {
  items: TabItem[];
  defaultTab?: string;
  selectedTab?: string;
  onTabChange?: (tabKey: string) => void;
  variant?: 'default' | 'pills' | 'underline' | 'minimal';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  tabListClassName?: string;
  tabPanelClassName?: string;
  orientation?: 'horizontal' | 'vertical';
}

function Tabs({
  items,
  defaultTab,
  selectedTab,
  onTabChange,
  variant = 'default',
  size = 'md',
  className,
  tabListClassName,
  tabPanelClassName,
  orientation = 'horizontal',
}: TabsProps) {
  // Early return if no items
  if (!items || items.length === 0) {
    return <div className="text-muted-foreground text-sm">No tabs available</div>;
  }

  const [internalSelectedIndex, setInternalSelectedIndex] = React.useState(() => {
    const initialTab = selectedTab || defaultTab || items?.[0]?.key;
    return items?.findIndex(item => item.key === initialTab) || 0;
  });

  const selectedIndex = React.useMemo(() => {
    if (selectedTab && items) {
      const index = items.findIndex(item => item.key === selectedTab);
      return index >= 0 ? index : 0;
    }
    return internalSelectedIndex;
  }, [selectedTab, items, internalSelectedIndex]);

  const handleChange = (index: number) => {
    const selectedItem = items?.[index];
    if (selectedItem && !selectedItem.disabled) {
      setInternalSelectedIndex(index);
      onTabChange?.(selectedItem.key);
    }
  };

  const getTabVariantClasses = (selected: boolean, disabled: boolean) => {
    const baseClasses = cn(
      'relative inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-all',
      'focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
      {
        'opacity-50 cursor-not-allowed': disabled,
        'cursor-pointer': !disabled,
      }
    );

    const sizeClasses = {
      sm: 'px-3 py-1.5 text-xs',
      md: 'px-4 py-2 text-sm',
      lg: 'px-6 py-3 text-base',
    };

    const variantClasses = {
      default: selected
        ? 'bg-background text-foreground shadow-sm border border-border rounded-md'
        : 'text-muted-foreground hover:text-foreground hover:bg-muted rounded-md',
      pills: selected
        ? 'bg-primary text-primary-foreground rounded-full'
        : 'text-muted-foreground hover:text-foreground hover:bg-muted rounded-full',
      underline: selected
        ? 'text-foreground border-b-2 border-primary'
        : 'text-muted-foreground hover:text-foreground border-b-2 border-transparent',
      minimal: selected
        ? 'text-primary'
        : 'text-muted-foreground hover:text-foreground',
    };

    return cn(baseClasses, sizeClasses[size], variantClasses[variant]);
  };

  const getTabListClasses = () => {
    const baseClasses = 'flex';
    
    const orientationClasses = {
      horizontal: 'flex-row',
      vertical: 'flex-col',
    };

    const variantClasses = {
      default: 'bg-muted p-1 rounded-lg',
      pills: 'space-x-1',
      underline: 'border-b border-border',
      minimal: 'space-x-6',
    };

    const spacingClasses = {
      horizontal: {
        default: '',
        pills: 'space-x-1',
        underline: 'space-x-6',
        minimal: 'space-x-6',
      },
      vertical: {
        default: '',
        pills: 'space-y-1',
        underline: 'space-y-2',
        minimal: 'space-y-2',
      },
    };

    return cn(
      baseClasses,
      orientationClasses[orientation],
      variantClasses[variant],
      spacingClasses[orientation][variant]
    );
  };

  return (
    <div className={cn('w-full', className)}>
      <TabGroup
        selectedIndex={selectedIndex}
        onChange={handleChange}
        vertical={orientation === 'vertical'}
      >
        <TabList className={cn(getTabListClasses(), tabListClassName)}>
          {items?.map((item, _index) => (
            <Tab
              key={item.key}
              disabled={item.disabled}
              className={({ selected }) =>
                getTabVariantClasses(selected, !!item.disabled)
              }
            >
              <div className="flex items-center space-x-2">
                {item.icon && (
                  <span className="flex-shrink-0">{item.icon}</span>
                )}
                <span>{item.label}</span>
                {item.badge && (
                  <span className="ml-2 bg-muted text-muted-foreground rounded-full px-2 py-0.5 text-xs font-medium">
                    {item.badge}
                  </span>
                )}
              </div>
            </Tab>
          ))}
        </TabList>

        <TabPanels className={cn('mt-4', tabPanelClassName)}>
          {items?.map((item) => (
            <TabPanel
              key={item.key}
              className="focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded-md"
            >
              {item.content}
            </TabPanel>
          ))}
        </TabPanels>
      </TabGroup>
    </div>
  );
}

// Simplified tabs component for basic use cases
export interface SimpleTabsProps {
  tabs: {
    label: string;
    content: React.ReactNode;
    disabled?: boolean;
  }[];
  defaultIndex?: number;
  className?: string;
}

function SimpleTabs({ tabs, defaultIndex = 0, className }: SimpleTabsProps) {
  const tabItems: TabItem[] = tabs.map((tab, index) => ({
    key: index.toString(),
    label: tab.label,
    content: tab.content,
    disabled: tab.disabled,
  }));

  return (
    <Tabs
      items={tabItems}
      defaultTab={defaultIndex.toString()}
      className={className}
    />
  );
}

// Controlled tabs component
export interface ControlledTabsProps {
  tabs: TabItem[];
  activeTab: string;
  onTabChange: (tabKey: string) => void;
  variant?: 'default' | 'pills' | 'underline' | 'minimal';
  className?: string;
}

function ControlledTabs({
  tabs,
  activeTab,
  onTabChange,
  variant = 'default',
  className,
}: ControlledTabsProps) {
  return (
    <Tabs
      items={tabs}
      selectedTab={activeTab}
      onTabChange={onTabChange}
      variant={variant}
      className={className}
    />
  );
}

export { Tabs, SimpleTabs, ControlledTabs };