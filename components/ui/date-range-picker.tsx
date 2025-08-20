import * as React from 'react';
import { DayPicker, DateRange } from 'react-day-picker';
import { format } from 'date-fns';
import { cn } from './utils';
import { Button } from './button';
// Input component not needed for this component
import { Calendar, X } from 'lucide-react';
import 'react-day-picker/style.css';

export interface DateRangePickerProps {
  value?: DateRange;
  onChange?: (range: DateRange | undefined) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  calendarClassName?: string;
  minDate?: Date;
  maxDate?: Date;
  presets?: {
    label: string;
    value: DateRange;
  }[];
  showPresets?: boolean;
  allowSingleDate?: boolean;
  format?: string;
}

function DateRangePicker({
  value,
  onChange,
  placeholder = 'Select date range',
  disabled = false,
  className,
  calendarClassName,
  minDate,
  maxDate,
  presets = [
    {
      label: 'Today',
      value: { from: new Date(), to: new Date() },
    },
    {
      label: 'Yesterday',
      value: {
        from: new Date(Date.now() - 24 * 60 * 60 * 1000),
        to: new Date(Date.now() - 24 * 60 * 60 * 1000),
      },
    },
    {
      label: 'Last 7 days',
      value: {
        from: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000),
        to: new Date(),
      },
    },
    {
      label: 'Last 30 days',
      value: {
        from: new Date(Date.now() - 29 * 24 * 60 * 60 * 1000),
        to: new Date(),
      },
    },
    {
      label: 'This month',
      value: {
        from: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
        to: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0),
      },
    },
    {
      label: 'Last month',
      value: {
        from: new Date(new Date().getFullYear(), new Date().getMonth() - 1, 1),
        to: new Date(new Date().getFullYear(), new Date().getMonth(), 0),
      },
    },
  ],
  showPresets = true,
  allowSingleDate = false,
  format: dateFormat = 'MMM dd, yyyy',
}: DateRangePickerProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [selectedRange, setSelectedRange] = React.useState<DateRange | undefined>(value);
  const triggerRef = React.useRef<HTMLButtonElement>(null);
  const popoverRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    setSelectedRange(value);
  }, [value]);

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popoverRef.current &&
        !popoverRef.current.contains(event.target as Node) &&
        triggerRef.current &&
        !triggerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
    
    // Return undefined when isOpen is false
    return undefined;
  }, [isOpen]);

  const handleSelect = (range: DateRange | undefined) => {
    setSelectedRange(range);
    if (allowSingleDate && range?.from && !range?.to) {
      onChange?.(range);
      setIsOpen(false);
    } else if (range?.from && range?.to) {
      onChange?.(range);
      setIsOpen(false);
    }
  };

  const handlePresetSelect = (preset: DateRange) => {
    setSelectedRange(preset);
    onChange?.(preset);
    setIsOpen(false);
  };

  const handleClear = () => {
    setSelectedRange(undefined);
    onChange?.(undefined);
  };

  const formatDateRange = (range: DateRange | undefined) => {
    if (!range?.from) return '';
    
    if (!range.to) {
      return format(range.from, dateFormat);
    }
    
    if (range.from.getTime() === range.to.getTime()) {
      return format(range.from, dateFormat);
    }
    
    return `${format(range.from, dateFormat)} - ${format(range.to, dateFormat)}`;
  };

  const displayValue = formatDateRange(selectedRange);

  return (
    <div className={cn('relative', className)}>
      <Button
        ref={triggerRef}
        variant="outline"
        className={cn(
          'w-full justify-start text-left font-normal',
          !displayValue && 'text-muted-foreground'
        )}
        onClick={() => setIsOpen(!isOpen)}
        disabled={disabled}
      >
        <Calendar className="mr-2 h-4 w-4" />
        {displayValue || placeholder}
        {displayValue && (
          <X
            className="ml-auto h-4 w-4 opacity-50 hover:opacity-100"
            onClick={(e) => {
              e.stopPropagation();
              handleClear();
            }}
          />
        )}
      </Button>

      {isOpen && (
        <div
          ref={popoverRef}
          className={cn(
            'absolute top-full left-0 z-50 mt-2 rounded-md border bg-popover p-0 text-popover-foreground shadow-md',
            'animate-in fade-in-0 zoom-in-95',
            showPresets ? 'w-auto' : 'w-fit',
            calendarClassName
          )}
        >
          <div className="flex">
            {showPresets && (
              <div className="border-r border-border p-3">
                <div className="space-y-1">
                  {presets.map((preset, index) => (
                    <Button
                      key={index}
                      variant="ghost"
                      size="sm"
                      className="w-full justify-start font-normal"
                      onClick={() => handlePresetSelect(preset.value)}
                    >
                      {preset.label}
                    </Button>
                  ))}
                </div>
              </div>
            )}
            <div className="p-3">
              <DayPicker
                mode="range"
                selected={selectedRange}
                onSelect={handleSelect}
                disabled={(date) => {
                  if (minDate && date < minDate) return true;
                  if (maxDate && date > maxDate) return true;
                  return false;
                }}
                numberOfMonths={2}
                classNames={{
                  months: 'flex space-x-4',
                  month: 'space-y-4',
                  caption: 'flex justify-center pt-1 relative items-center',
                  caption_label: 'text-sm font-medium',
                  nav: 'space-x-1 flex items-center',
                  nav_button: cn(
                    'inline-flex items-center justify-center rounded-md text-sm font-medium',
                    'ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground',
                    'h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100'
                  ),
                  nav_button_previous: 'absolute left-1',
                  nav_button_next: 'absolute right-1',
                  table: 'w-full border-collapse space-y-1',
                  head_row: 'flex',
                  head_cell: 'text-muted-foreground rounded-md w-9 font-normal text-[0.8rem]',
                  row: 'flex w-full mt-2',
                  cell: 'text-center text-sm p-0 relative [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20',
                  day: cn(
                    'inline-flex items-center justify-center rounded-md text-sm font-normal',
                    'ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground',
                    'h-9 w-9 p-0 font-normal aria-selected:opacity-100'
                  ),
                  day_selected: 'bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground',
                  day_today: 'bg-accent text-accent-foreground',
                  day_outside: 'text-muted-foreground opacity-50',
                  day_disabled: 'text-muted-foreground opacity-50',
                  day_range_middle: 'aria-selected:bg-accent aria-selected:text-accent-foreground',
                  day_hidden: 'invisible',
                }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export { DateRangePicker, type DateRange };