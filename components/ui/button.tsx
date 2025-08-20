import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cn, focusRing, disabledStyles } from './utils';
import { Loader2 } from 'lucide-react';

const buttonVariants = {
  variant: {
    primary: 'bg-primary text-primary-foreground hover:bg-primary/90',
    secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
    danger: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
    ghost: 'hover:bg-accent hover:text-accent-foreground',
    outline: 'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
    link: 'text-primary underline-offset-4 hover:underline',
  },
  size: {
    sm: 'h-9 rounded-md px-3 text-sm',
    md: 'h-10 px-4 py-2',
    lg: 'h-11 rounded-md px-8 text-base',
    icon: 'h-10 w-10',
  },
} as const;

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: keyof typeof buttonVariants.variant;
  size?: keyof typeof buttonVariants.size;
  asChild?: boolean;
  loading?: boolean;
  loadingText?: string;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = 'primary',
      size = 'md',
      asChild = false,
      loading = false,
      loadingText,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : 'button';
    
    const buttonClasses = cn(
      // Base styles
      'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium',
      'ring-offset-background transition-colors',
      focusRing,
      disabledStyles,
      // Variant styles
      buttonVariants.variant[variant],
      // Size styles  
      buttonVariants.size[size],
      className
    );

    const isDisabled = disabled || loading;

    return (
      <Comp
        className={buttonClasses}
        ref={ref}
        disabled={isDisabled}
        {...props}
      >
        {loading && (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        )}
        {loading && loadingText ? loadingText : children}
      </Comp>
    );
  }
);

Button.displayName = 'Button';

export { Button, buttonVariants };