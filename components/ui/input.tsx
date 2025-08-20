import * as React from 'react';
import { cn, focusRing } from './utils';
import { AlertCircle, Check } from 'lucide-react';

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
  success?: boolean;
  label?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      type,
      error,
      success,
      label,
      helperText,
      leftIcon,
      rightIcon,
      id,
      ...props
    },
    ref
  ) => {
    const generatedId = React.useId();
    const inputId = id || generatedId;
    const hasError = !!error;
    const hasSuccess = success && !hasError;

    const inputClasses = cn(
      // Base styles
      'flex h-10 w-full rounded-md border bg-background px-3 py-2 text-sm',
      'ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium',
      'placeholder:text-muted-foreground',
      focusRing,
      'disabled:cursor-not-allowed disabled:opacity-50',
      // State styles
      {
        'border-input': !hasError && !hasSuccess,
        'border-destructive text-destructive focus-visible:ring-destructive': hasError,
        'border-green-500 text-green-700 focus-visible:ring-green-500': hasSuccess,
        'pl-10': leftIcon,
        'pr-10': rightIcon || hasError || hasSuccess,
      },
      className
    );

    const getStateIcon = () => {
      if (hasError) return <AlertCircle className="h-4 w-4 text-destructive" />;
      if (hasSuccess) return <Check className="h-4 w-4 text-green-500" />;
      return rightIcon;
    };

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={inputId}
            className={cn(
              'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
              hasError ? 'text-destructive' : 'text-foreground'
            )}
          >
            {label}
          </label>
        )}
        <div className="relative">
          {leftIcon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2">
              {leftIcon}
            </div>
          )}
          <input
            type={type}
            className={inputClasses}
            ref={ref}
            id={inputId}
            aria-invalid={hasError ? 'true' : 'false'}
            aria-describedby={
              error ? `${inputId}-error` : helperText ? `${inputId}-helper` : undefined
            }
            {...props}
          />
          {(rightIcon || hasError || hasSuccess) && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2">
              {getStateIcon()}
            </div>
          )}
        </div>
        {error && (
          <p
            id={`${inputId}-error`}
            className="mt-1 text-sm text-destructive"
            role="alert"
          >
            {error}
          </p>
        )}
        {helperText && !error && (
          <p
            id={`${inputId}-helper`}
            className="mt-1 text-sm text-muted-foreground"
          >
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export { Input };