import * as React from 'react';
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/react';
import { cn } from './utils';
import { ChevronDown, Check } from 'lucide-react';
import { Button } from './button';

export interface DropdownItem {
  key: string;
  label: string;
  icon?: React.ReactNode;
  disabled?: boolean;
  onClick?: () => void;
  href?: string;
  target?: string;
  shortcut?: string;
  danger?: boolean;
  divider?: boolean;
}

export interface DropdownProps {
  items: DropdownItem[];
  trigger?: React.ReactNode;
  label?: string;
  placeholder?: string;
  align?: 'start' | 'end';
  side?: 'bottom' | 'top';
  className?: string;
  menuClassName?: string;
  disabled?: boolean;
  loading?: boolean;
}

function Dropdown({
  items,
  trigger,
  label,
  placeholder = 'Select option',
  align = 'start',
  side = 'bottom',
  className,
  menuClassName,
  disabled = false,
  loading = false,
}: DropdownProps) {
  const getAlignmentClasses = () => {
    const alignClasses = {
      start: 'origin-top-left left-0',
      end: 'origin-top-right right-0',
    };
    
    const sideClasses = {
      bottom: 'top-full mt-1',
      top: 'bottom-full mb-1',
    };
    
    return cn(alignClasses[align], sideClasses[side]);
  };

  const renderTrigger = () => {
    if (trigger) return trigger;
    
    return (
      <Button
        variant="outline"
        className="justify-between"
        disabled={disabled || loading}
      >
        {label || placeholder}
        <ChevronDown className="ml-2 h-4 w-4" />
      </Button>
    );
  };

  return (
    <Menu as="div" className={cn('relative inline-block text-left', className)}>
      <MenuButton as={React.Fragment}>
        {renderTrigger()}
      </MenuButton>

      <MenuItems
        className={cn(
          'absolute z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md',
          'transition ease-out duration-100 transform data-[closed]:opacity-0 data-[closed]:scale-95',
          getAlignmentClasses(),
          menuClassName
        )}
      >
          {items.map((item) => {
            if (item.divider) {
              return (
                <div
                  key={item.key}
                  className="my-1 h-px bg-border"
                />
              );
            }

            return (
              <MenuItem key={item.key} disabled={item.disabled}>
                {({ active, disabled: itemDisabled }) => {
                  const content = (
                    <div
                      className={cn(
                        'relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors',
                        {
                          'bg-accent text-accent-foreground': active && !itemDisabled,
                          'text-muted-foreground cursor-not-allowed opacity-50': itemDisabled,
                          'text-destructive focus:text-destructive': item.danger && !itemDisabled,
                        }
                      )}
                      onClick={item.onClick}
                    >
                      {item.icon && (
                        <span className="mr-2 h-4 w-4 flex-shrink-0">
                          {item.icon}
                        </span>
                      )}
                      <span className="flex-1">{item.label}</span>
                      {item.shortcut && (
                        <span className="ml-auto text-xs tracking-widest opacity-60">
                          {item.shortcut}
                        </span>
                      )}
                    </div>
                  );

                  if (item.href) {
                    return (
                      <a
                        href={item.href}
                        target={item.target}
                        className="block"
                      >
                        {content}
                      </a>
                    );
                  }

                  return content;
                }}
              </MenuItem>
            );
          })}
        </MenuItems>
    </Menu>
  );
}

// Action dropdown with common actions
export interface ActionDropdownProps {
  onEdit?: () => void;
  onDelete?: () => void;
  onDuplicate?: () => void;
  onView?: () => void;
  customActions?: DropdownItem[];
  disabled?: boolean;
  className?: string;
}

function ActionDropdown({
  onEdit,
  onDelete,
  onDuplicate,
  onView,
  customActions = [],
  disabled = false,
  className,
}: ActionDropdownProps) {
  const defaultActions: DropdownItem[] = [
    ...(onView ? [{
      key: 'view',
      label: 'View',
      onClick: onView,
    }] : []),
    ...(onEdit ? [{
      key: 'edit',
      label: 'Edit',
      onClick: onEdit,
    }] : []),
    ...(onDuplicate ? [{
      key: 'duplicate',
      label: 'Duplicate',
      onClick: onDuplicate,
    }] : []),
    ...customActions,
    ...(onDelete ? [
      { key: 'divider-1', label: '', divider: true },
      {
        key: 'delete',
        label: 'Delete',
        onClick: onDelete,
        danger: true,
      }
    ] : []),
  ];

  return (
    <Dropdown
      items={defaultActions}
      trigger={
        <Button variant="ghost" size="icon" disabled={disabled}>
          <span className="sr-only">Open menu</span>
          <svg
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zM12 13a1 1 0 110-2 1 1 0 010 2zM12 20a1 1 0 110-2 1 1 0 010 2z"
            />
          </svg>
        </Button>
      }
      align="end"
      className={className}
    />
  );
}

// Select dropdown for form inputs
export interface SelectDropdownProps {
  options: {
    value: string;
    label: string;
    disabled?: boolean;
  }[];
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  error?: boolean;
}

function SelectDropdown({
  options,
  value,
  onChange,
  placeholder = 'Select option',
  disabled = false,
  className,
  error = false,
}: SelectDropdownProps) {
  const selectedOption = options.find(option => option.value === value);
  
  const items: DropdownItem[] = options.map(option => ({
    key: option.value,
    label: option.label,
    disabled: option.disabled,
    onClick: () => onChange?.(option.value),
    icon: value === option.value ? <Check className="h-4 w-4" /> : undefined,
  }));

  return (
    <Dropdown
      items={items}
      trigger={
        <Button
          variant="outline"
          className={cn(
            'w-full justify-between',
            error && 'border-destructive',
            className
          )}
          disabled={disabled}
        >
          {selectedOption ? selectedOption.label : placeholder}
          <ChevronDown className="ml-2 h-4 w-4 opacity-50" />
        </Button>
      }
      align="start"
      menuClassName="w-full"
    />
  );
}

export { Dropdown, ActionDropdown, SelectDropdown };