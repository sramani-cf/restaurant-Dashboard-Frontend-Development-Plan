import * as React from 'react';
import { cn } from './utils';
import { Info } from 'lucide-react';

export interface TooltipProps {
  content: React.ReactNode;
  side?: 'top' | 'right' | 'bottom' | 'left';
  align?: 'start' | 'center' | 'end';
  delayDuration?: number;
  children: React.ReactNode;
  disabled?: boolean;
  className?: string;
  contentClassName?: string;
}

function Tooltip({
  content,
  side = 'top',
  align = 'center',
  delayDuration = 700,
  children,
  disabled = false,
  className,
  contentClassName,
}: TooltipProps) {
  const [isVisible, setIsVisible] = React.useState(false);
  const [timeoutId, setTimeoutId] = React.useState<NodeJS.Timeout | null>(null);
  const triggerRef = React.useRef<HTMLDivElement>(null);
  const contentRef = React.useRef<HTMLDivElement>(null);

  const showTooltip = React.useCallback(() => {
    if (disabled) return;
    
    const id = setTimeout(() => {
      setIsVisible(true);
    }, delayDuration);
    setTimeoutId(id);
  }, [disabled, delayDuration]);

  const hideTooltip = React.useCallback(() => {
    if (timeoutId) {
      clearTimeout(timeoutId);
      setTimeoutId(null);
    }
    setIsVisible(false);
  }, [timeoutId]);

  React.useEffect(() => {
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [timeoutId]);

  const getPositionClasses = () => {
    const positions = {
      top: {
        start: 'bottom-full left-0 mb-2',
        center: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
        end: 'bottom-full right-0 mb-2',
      },
      right: {
        start: 'left-full top-0 ml-2',
        center: 'left-full top-1/2 -translate-y-1/2 ml-2',
        end: 'left-full bottom-0 ml-2',
      },
      bottom: {
        start: 'top-full left-0 mt-2',
        center: 'top-full left-1/2 -translate-x-1/2 mt-2',
        end: 'top-full right-0 mt-2',
      },
      left: {
        start: 'right-full top-0 mr-2',
        center: 'right-full top-1/2 -translate-y-1/2 mr-2',
        end: 'right-full bottom-0 mr-2',
      },
    };

    return positions[side][align];
  };

  const getArrowClasses = () => {
    const arrows = {
      top: 'top-full left-1/2 -translate-x-1/2 border-l-transparent border-r-transparent border-b-transparent border-t-popover',
      right: 'right-full top-1/2 -translate-y-1/2 border-t-transparent border-b-transparent border-l-transparent border-r-popover',
      bottom: 'bottom-full left-1/2 -translate-x-1/2 border-l-transparent border-r-transparent border-t-transparent border-b-popover',
      left: 'left-full top-1/2 -translate-y-1/2 border-t-transparent border-b-transparent border-r-transparent border-l-popover',
    };

    return arrows[side];
  };

  return (
    <div
      ref={triggerRef}
      className={cn('relative inline-block', className)}
      onMouseEnter={showTooltip}
      onMouseLeave={hideTooltip}
      onFocus={showTooltip}
      onBlur={hideTooltip}
    >
      {children}
      {isVisible && content && (
        <div
          ref={contentRef}
          role="tooltip"
          className={cn(
            'absolute z-50 px-3 py-1.5 text-sm font-medium',
            'bg-popover text-popover-foreground rounded-md border shadow-md',
            'animate-in fade-in-0 zoom-in-95',
            getPositionClasses(),
            contentClassName
          )}
        >
          {content}
          {/* Arrow */}
          <div
            className={cn(
              'absolute h-0 w-0 border-4',
              getArrowClasses()
            )}
          />
        </div>
      )}
    </div>
  );
}

// Shorthand components for common tooltip patterns
export function InfoTooltip({ 
  children, 
  ...props 
}: Omit<TooltipProps, 'children'> & { children: React.ReactNode }) {
  return (
    <Tooltip {...props}>
      <div className="inline-flex items-center">
        <Info className="h-4 w-4 text-muted-foreground hover:text-foreground transition-colors cursor-help" />
        {children}
      </div>
    </Tooltip>
  );
}

export function HelpTooltip(props: Omit<TooltipProps, 'children'>) {
  return (
    <Tooltip {...props}>
      <button
        type="button"
        className="inline-flex items-center justify-center w-4 h-4 text-xs font-medium text-muted-foreground bg-muted rounded-full hover:bg-muted/80 transition-colors"
        aria-label="Help"
      >
        ?
      </button>
    </Tooltip>
  );
}

export { Tooltip };