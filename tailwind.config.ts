import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}',
    './contexts/**/*.{js,ts,jsx,tsx,mdx}',
    './hooks/**/*.{js,ts,jsx,tsx,mdx}',
    './utils/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  
  // Dark mode configuration
  darkMode: ['class'],
  
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      colors: {
        // Brand colors from CSS variables
        primary: {
          50: 'hsl(var(--color-primary-50))',
          100: 'hsl(var(--color-primary-100))',
          200: 'hsl(var(--color-primary-200))',
          300: 'hsl(var(--color-primary-300))',
          400: 'hsl(var(--color-primary-400))',
          500: 'hsl(var(--color-primary-500))',
          600: 'hsl(var(--color-primary-600))',
          700: 'hsl(var(--color-primary-700))',
          800: 'hsl(var(--color-primary-800))',
          900: 'hsl(var(--color-primary-900))',
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        
        // Semantic colors
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        
        // Success, warning, error colors
        success: {
          50: 'hsl(var(--color-success-50))',
          100: 'hsl(var(--color-success-100))',
          200: 'hsl(var(--color-success-200))',
          300: 'hsl(var(--color-success-300))',
          400: 'hsl(var(--color-success-400))',
          500: 'hsl(var(--color-success-500))',
          600: 'hsl(var(--color-success-600))',
          700: 'hsl(var(--color-success-700))',
          800: 'hsl(var(--color-success-800))',
          900: 'hsl(var(--color-success-900))',
        },
        warning: {
          50: 'hsl(var(--color-warning-50))',
          100: 'hsl(var(--color-warning-100))',
          200: 'hsl(var(--color-warning-200))',
          300: 'hsl(var(--color-warning-300))',
          400: 'hsl(var(--color-warning-400))',
          500: 'hsl(var(--color-warning-500))',
          600: 'hsl(var(--color-warning-600))',
          700: 'hsl(var(--color-warning-700))',
          800: 'hsl(var(--color-warning-800))',
          900: 'hsl(var(--color-warning-900))',
        },
        error: {
          50: 'hsl(var(--color-error-50))',
          100: 'hsl(var(--color-error-100))',
          200: 'hsl(var(--color-error-200))',
          300: 'hsl(var(--color-error-300))',
          400: 'hsl(var(--color-error-400))',
          500: 'hsl(var(--color-error-500))',
          600: 'hsl(var(--color-error-600))',
          700: 'hsl(var(--color-error-700))',
          800: 'hsl(var(--color-error-800))',
          900: 'hsl(var(--color-error-900))',
        },

        // Chart colors
        chart: {
          '1': 'hsl(var(--chart-1))',
          '2': 'hsl(var(--chart-2))',
          '3': 'hsl(var(--chart-3))',
          '4': 'hsl(var(--chart-4))',
          '5': 'hsl(var(--chart-5))',
        },

        // Accessibility-specific colors
        focus: {
          ring: 'hsl(var(--ring))',
          indicator: 'hsl(var(--focus-indicator, 210 100% 50%))',
        },
        'high-contrast': {
          background: 'hsl(var(--high-contrast-bg, 0 0% 100%))',
          foreground: 'hsl(var(--high-contrast-fg, 0 0% 0%))',
          border: 'hsl(var(--high-contrast-border, 0 0% 0%))',
        },
      },
      
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      
      fontFamily: {
        sans: ['var(--font-geist-sans)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-geist-mono)', 'Consolas', 'monospace'],
      },

      // Accessibility-focused font sizes and line heights
      fontSize: {
        'a11y-xs': ['0.75rem', { lineHeight: '1.6', letterSpacing: '0.025em' }],
        'a11y-sm': ['0.875rem', { lineHeight: '1.6', letterSpacing: '0.025em' }],
        'a11y-base': ['1rem', { lineHeight: '1.6', letterSpacing: '0.025em' }],
        'a11y-lg': ['1.125rem', { lineHeight: '1.6', letterSpacing: '0.025em' }],
        'a11y-xl': ['1.25rem', { lineHeight: '1.6', letterSpacing: '0.025em' }],
        'a11y-2xl': ['1.5rem', { lineHeight: '1.6', letterSpacing: '0.025em' }],
      },
      
      spacing: {
        'sidebar': 'var(--sidebar-width)',
        'header': 'var(--header-height)',
        'kds-header': 'var(--kds-header-height)',
        // Accessibility-focused spacing
        'touch-target': '44px', // Minimum touch target size (WCAG)
        'focus-offset': '2px',  // Focus ring offset
      },

      // Accessibility-focused min dimensions
      minWidth: {
        'touch': '44px',
        'clickable': '44px',
      },
      minHeight: {
        'touch': '44px',
        'clickable': '44px',
      },
      
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'fade-out': {
          '0%': { opacity: '1' },
          '100%': { opacity: '0' },
        },
        'slide-in-from-top': {
          '0%': { transform: 'translateY(-100%)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        'slide-in-from-right': {
          '0%': { transform: 'translateX(100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        'slide-in-from-bottom': {
          '0%': { transform: 'translateY(100%)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        'slide-in-from-left': {
          '0%': { transform: 'translateX(-100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        'shimmer': {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        // Accessibility-focused animations
        'focus-ring': {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '50%': { transform: 'scale(1.05)', opacity: '0.6' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        'reduced-motion-fade': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
      
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'fade-in': 'fade-in 0.2s ease-out',
        'fade-out': 'fade-out 0.2s ease-out',
        'slide-in-from-top': 'slide-in-from-top 0.3s ease-out',
        'slide-in-from-right': 'slide-in-from-right 0.3s ease-out',
        'slide-in-from-bottom': 'slide-in-from-bottom 0.3s ease-out',
        'slide-in-from-left': 'slide-in-from-left 0.3s ease-out',
        'shimmer': 'shimmer 1.5s infinite',
        // Accessibility-focused animations
        'focus-ring': 'focus-ring 0.15s ease-out',
        'reduced-motion-fade': 'reduced-motion-fade 0.1s ease-out',
      },
      
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'shimmer-gradient': 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent)',
      },
      
      boxShadow: {
        'inner-lg': 'inset 0 2px 4px 0 rgb(0 0 0 / 0.05)',
        // Accessibility-focused shadows
        'focus': '0 0 0 2px hsl(var(--ring))',
        'focus-visible': '0 0 0 2px hsl(var(--ring)), 0 0 0 4px hsl(var(--ring) / 0.1)',
      },

      // Outline utilities for focus indicators
      outlineWidth: {
        '3': '3px',
      },
      outlineOffset: {
        '3': '3px',
      },
      
      screens: {
        'xs': '475px',
        '3xl': '1600px',
        '4xl': '1920px',
        // Accessibility-focused breakpoints
        'motion-safe': { raw: '(prefers-reduced-motion: no-preference)' },
        'motion-reduce': { raw: '(prefers-reduced-motion: reduce)' },
        'contrast-more': { raw: '(prefers-contrast: high)' },
        'contrast-less': { raw: '(prefers-contrast: low)' },
      },
    },
  },
  
  plugins: [
    // Add Tailwind CSS plugins
    require('@tailwindcss/forms')({
      strategy: 'class', // Use class-based strategy for better control
    }),
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/container-queries'),
    
    // Custom utilities plugin with accessibility enhancements
    function({ addUtilities, addComponents, addVariant, theme }) {
      // Add custom variants for accessibility
      addVariant('motion-safe', '@media (prefers-reduced-motion: no-preference)');
      addVariant('motion-reduce', '@media (prefers-reduced-motion: reduce)');
      addVariant('contrast-more', '@media (prefers-contrast: high)');
      addVariant('contrast-less', '@media (prefers-contrast: low)');
      addVariant('forced-colors', '@media (forced-colors: active)');
      addVariant('hocus', ['&:hover', '&:focus']);
      addVariant('group-hocus', ['.group:hover &', '.group:focus &']);

      // Accessibility-focused utilities
      addUtilities({
        // Screen reader utilities
        '.sr-only': {
          position: 'absolute',
          width: '1px',
          height: '1px',
          padding: '0',
          margin: '-1px',
          overflow: 'hidden',
          clip: 'rect(0, 0, 0, 0)',
          whiteSpace: 'nowrap',
          border: '0',
        },
        '.not-sr-only': {
          position: 'static',
          width: 'auto',
          height: 'auto',
          padding: 'inherit',
          margin: 'inherit',
          overflow: 'visible',
          clip: 'auto',
          whiteSpace: 'normal',
          border: 'inherit',
        },
        
        // Focus utilities
        '.focus-visible-only:focus:not(:focus-visible)': {
          outline: 'none',
        },
        '.focus-ring': {
          '@apply outline-none ring-2 ring-ring ring-offset-2 ring-offset-background': {},
        },
        '.focus-ring-inset': {
          '@apply outline-none ring-2 ring-inset ring-ring': {},
        },
        
        // Skip link utilities
        '.skip-link': {
          transform: 'translateY(-100%)',
          transition: 'transform 0.2s ease-in-out',
        },
        '.skip-link:focus': {
          transform: 'translateY(0)',
        },
        
        // Touch target utilities
        '.touch-target': {
          minWidth: theme('spacing.touch-target'),
          minHeight: theme('spacing.touch-target'),
        },
        '.clickable-area': {
          minWidth: theme('spacing.clickable'),
          minHeight: theme('spacing.clickable'),
        },
        
        // Text utilities for accessibility
        '.text-balance': {
          'text-wrap': 'balance',
        },
        '.text-pretty': {
          'text-wrap': 'pretty',
        },
        
        // Motion utilities
        '.motion-safe': {
          '@media (prefers-reduced-motion: no-preference)': {
            // Normal animations
          },
        },
        '.motion-reduce': {
          '@media (prefers-reduced-motion: reduce)': {
            animationDuration: '0.01ms !important',
            animationIterationCount: '1 !important',
            transitionDuration: '0.01ms !important',
            scrollBehavior: 'auto !important',
          },
        },
        
        // High contrast utilities
        '.high-contrast': {
          '@media (prefers-contrast: high)': {
            filter: 'contrast(150%)',
          },
        },
        
        // Scrollbar utilities
        '.scrollbar-hide': {
          '-ms-overflow-style': 'none',
          'scrollbar-width': 'none',
          '&::-webkit-scrollbar': {
            display: 'none',
          },
        },
        '.scrollbar-default': {
          '-ms-overflow-style': 'auto',
          'scrollbar-width': 'auto',
          '&::-webkit-scrollbar': {
            display: 'block',
          },
        },
        
        // Force color utilities for Windows High Contrast mode
        '.forced-color-adjust-auto': {
          'forced-color-adjust': 'auto',
        },
        '.forced-color-adjust-none': {
          'forced-color-adjust': 'none',
        },
      });

      // Accessibility-focused components
      addComponents({
        // Button variants with proper accessibility
        '.btn': {
          '@apply inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium transition-colors': {},
          '@apply focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2': {},
          '@apply disabled:pointer-events-none disabled:opacity-50': {},
          '@apply touch-target': {},
        },
        '.btn-primary': {
          '@apply btn bg-primary text-primary-foreground hover:bg-primary/90': {},
        },
        '.btn-secondary': {
          '@apply btn bg-secondary text-secondary-foreground hover:bg-secondary/80': {},
        },
        '.btn-destructive': {
          '@apply btn bg-destructive text-destructive-foreground hover:bg-destructive/90': {},
        },
        '.btn-outline': {
          '@apply btn border border-input bg-background hover:bg-accent hover:text-accent-foreground': {},
        },
        '.btn-ghost': {
          '@apply btn hover:bg-accent hover:text-accent-foreground': {},
        },
        '.btn-link': {
          '@apply btn text-primary underline-offset-4 hover:underline': {},
        },

        // Input variants with accessibility
        '.input': {
          '@apply flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm': {},
          '@apply ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium': {},
          '@apply placeholder:text-muted-foreground': {},
          '@apply focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2': {},
          '@apply disabled:cursor-not-allowed disabled:opacity-50': {},
        },
        '.input-error': {
          '@apply input border-destructive focus-visible:ring-destructive': {},
        },

        // Card components
        '.card': {
          '@apply rounded-lg border bg-card text-card-foreground shadow-sm': {},
        },
        '.card-header': {
          '@apply flex flex-col space-y-1.5 p-6': {},
        },
        '.card-title': {
          '@apply text-2xl font-semibold leading-none tracking-tight': {},
        },
        '.card-description': {
          '@apply text-sm text-muted-foreground': {},
        },
        '.card-content': {
          '@apply p-6 pt-0': {},
        },
        '.card-footer': {
          '@apply flex items-center p-6 pt-0': {},
        },

        // Loading and skeleton states
        '.skeleton': {
          '@apply animate-pulse rounded-md bg-muted': {},
        },
        '.loading': {
          '@apply animate-spin': {},
        },

        // Focus indicators
        '.focus-indicator': {
          '@apply relative': {},
          '&:focus-visible::after': {
            content: '""',
            '@apply absolute inset-0 rounded border-2 border-ring': {},
          },
        },

        // Landmark regions
        '.landmark': {
          '@apply focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2': {},
        },

        // Skip navigation
        '.skip-nav': {
          '@apply sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50': {},
          '@apply bg-background px-4 py-2 text-foreground': {},
          '@apply rounded-md border border-border shadow-lg': {},
        },

        // Live regions
        '.live-region': {
          '@apply sr-only': {},
        },

        // High contrast mode adjustments
        '@media (forced-colors: active)': {
          '.btn': {
            'border': '1px solid ButtonText',
          },
          '.input': {
            'border': '1px solid ButtonText',
          },
          '.focus-visible': {
            'outline': '2px solid Highlight',
          },
        },
      });
    },
  ],
  
  // Performance optimizations
  corePlugins: {
    // Enable accessibility-related plugins
    backdropBlur: true,
    backdropBrightness: false,
    backdropContrast: true, // Keep for high contrast support
    backdropGrayscale: false,
    backdropHueRotate: false,
    backdropInvert: false,
    backdropOpacity: true,
    backdropSaturate: false,
    backdropSepia: false,
  },
  
  // Future-proof configuration
  future: {
    hoverOnlyWhenSupported: true,
    respectDefaultRingColorOpacity: true,
  },

  // Safelist for accessibility classes that might be added dynamically
  safelist: [
    'sr-only',
    'not-sr-only',
    'focus:not-sr-only',
    'skip-link',
    'touch-target',
    'focus-ring',
    'high-contrast',
    'motion-reduce',
    'motion-safe',
    'contrast-more',
    'contrast-less',
    // Dynamic font sizes
    'text-a11y-xs',
    'text-a11y-sm',
    'text-a11y-base',
    'text-a11y-lg',
    'text-a11y-xl',
    'text-a11y-2xl',
    // Dynamic spacing
    'p-touch-target',
    'm-touch-target',
    // Focus states
    'focus-visible:ring-2',
    'focus-visible:ring-ring',
    'focus-visible:ring-offset-2',
  ],
};

export default config;