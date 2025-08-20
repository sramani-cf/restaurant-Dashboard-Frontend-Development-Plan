import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Utility function to merge class names with tailwind-merge
 * Combines clsx and tailwind-merge for optimal class name handling
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Create a variant utility for component styling
 * Used to define consistent styling patterns across components
 */
export type VariantProps<T> = {
  [K in keyof T]: keyof T[K];
};

/**
 * Focus ring utility classes for accessibility
 */
export const focusRing = 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2';

/**
 * Disabled state utility classes
 */
export const disabledStyles = 'disabled:pointer-events-none disabled:opacity-50';

/**
 * Animation utility classes
 */
export const transitions = {
  fast: 'transition-fast',
  base: 'transition-base',
  slow: 'transition-slow',
} as const;