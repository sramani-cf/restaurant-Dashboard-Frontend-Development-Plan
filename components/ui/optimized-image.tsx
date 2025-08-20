'use client';

import Image, { ImageProps } from 'next/image';
import { useState, forwardRef, useCallback, useMemo } from 'react';
import { cn } from '@/lib/utils';

// Extended props for our optimized image component
interface OptimizedImageProps extends Omit<ImageProps, 'src' | 'alt'> {
  src: string;
  alt: string;
  fallbackSrc?: string;
  showLoadingSpinner?: boolean;
  loadingClassName?: string;
  errorClassName?: string;
  aspectRatio?: 'square' | '16/9' | '4/3' | '3/2' | '2/1' | string;
  objectFit?: 'cover' | 'contain' | 'fill' | 'scale-down' | 'none';
  overlay?: React.ReactNode;
  lazy?: boolean;
  quality?: number;
  unoptimized?: boolean;
  performance?: 'eager' | 'lazy' | 'auto';
}

// Default fallback images for different contexts
const DEFAULT_FALLBACKS = {
  food: '/images/fallback/food-placeholder.svg',
  user: '/images/fallback/user-placeholder.svg',
  restaurant: '/images/fallback/restaurant-placeholder.svg',
  general: '/images/fallback/image-placeholder.svg',
} as const;

// Loading spinner component
const LoadingSpinner = ({ className }: { className?: string }) => (
  <div className={cn(
    'absolute inset-0 flex items-center justify-center bg-muted/50 backdrop-blur-sm',
    className
  )}>
    <div className="animate-spin rounded-full h-8 w-8 border-2 border-primary border-t-transparent" />
  </div>
);

// Error state component
const ErrorState = ({ 
  className, 
  retry 
}: { 
  className?: string; 
  retry?: () => void 
}) => (
  <div className={cn(
    'absolute inset-0 flex flex-col items-center justify-center bg-muted/80 text-muted-foreground',
    className
  )}>
    <div className="text-2xl mb-2">📷</div>
    <div className="text-sm text-center mb-2">Failed to load image</div>
    {retry && (
      <button
        onClick={retry}
        className="text-xs text-primary hover:text-primary/80 underline"
      >
        Try again
      </button>
    )}
  </div>
);

/**
 * Optimized Image Component with advanced features:
 * - Automatic format selection (AVIF/WebP/fallback)
 * - Loading states and error handling
 * - Aspect ratio maintenance
 * - Performance optimizations
 * - Lazy loading with intersection observer
 * - Retry mechanism
 * - Overlay support
 */
export const OptimizedImage = forwardRef<HTMLDivElement, OptimizedImageProps>(
  ({
    src,
    alt,
    fallbackSrc,
    showLoadingSpinner = true,
    loadingClassName,
    errorClassName,
    aspectRatio,
    objectFit = 'cover',
    overlay,
    lazy = true,
    quality = 85,
    className,
    performance = 'auto',
    unoptimized = false,
    sizes,
    width,
    height,
    fill,
    priority,
    onLoad,
    onError,
    ...props
  }, ref) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [currentSrc, setCurrentSrc] = useState(src);
    const [retryCount, setRetryCount] = useState(0);

    // Determine loading strategy
    const shouldLazyLoad = useMemo(() => {
      if (priority) return false;
      if (performance === 'eager') return false;
      if (performance === 'lazy') return true;
      return lazy;
    }, [priority, performance, lazy]);

    // Handle successful image load
    const handleLoad = useCallback((event: any) => {
      setLoading(false);
      setError(false);
      onLoad?.(event);
    }, [onLoad]);

    // Handle image load error with retry logic
    const handleError = useCallback((event: any) => {
      console.error(`[OptimizedImage] Failed to load image: ${currentSrc}`);
      
      if (retryCount < 2) {
        // Retry with slight delay
        setTimeout(() => {
          setRetryCount(prev => prev + 1);
          setCurrentSrc(`${src}?retry=${retryCount + 1}`);
        }, 1000 * Math.pow(2, retryCount));
        return;
      }

      // Use fallback image if available
      if (fallbackSrc && currentSrc !== fallbackSrc) {
        setCurrentSrc(fallbackSrc);
        setRetryCount(0);
        return;
      }

      // Show error state
      setLoading(false);
      setError(true);
      onError?.(event);
    }, [currentSrc, src, fallbackSrc, retryCount, onError]);

    // Manual retry function
    const handleRetry = useCallback(() => {
      setError(false);
      setLoading(true);
      setRetryCount(0);
      setCurrentSrc(src);
    }, [src]);

    // Generate responsive sizes if not provided
    const responsiveSizes = useMemo(() => {
      if (sizes) return sizes;
      
      // Default responsive sizes based on common layouts
      if (fill) {
        return '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw';
      }
      
      return '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw';
    }, [sizes, fill]);

    // Aspect ratio styles
    const aspectRatioStyles = useMemo(() => {
      if (!aspectRatio) return {};
      
      const ratios: Record<string, string> = {
        'square': '1 / 1',
        '16/9': '16 / 9',
        '4/3': '4 / 3',
        '3/2': '3 / 2',
        '2/1': '2 / 1',
      };
      
      return {
        aspectRatio: ratios[aspectRatio] || aspectRatio,
      };
    }, [aspectRatio]);

    // Container classes
    const containerClasses = cn(
      'relative overflow-hidden',
      {
        'w-full': fill || (!width && !height),
      },
      className
    );

    // Image classes
    const imageClasses = cn(
      'transition-opacity duration-300',
      {
        'opacity-0': loading,
        'opacity-100': !loading && !error,
        'w-full h-full': fill,
      }
    );

    // Image style with object-fit
    const imageStyle = {
      objectFit,
      ...aspectRatioStyles,
    };

    return (
      <div ref={ref} className={containerClasses} style={aspectRatioStyles}>
        {!error && (
          <Image
            src={currentSrc}
            alt={alt}
            width={width}
            height={height}
            fill={fill}
            sizes={responsiveSizes}
            quality={quality}
            priority={!shouldLazyLoad}
            loading={shouldLazyLoad ? 'lazy' : 'eager'}
            unoptimized={unoptimized}
            className={imageClasses}
            style={imageStyle}
            onLoad={handleLoad}
            onError={handleError}
            {...props}
          />
        )}

        {/* Loading state */}
        {loading && showLoadingSpinner && (
          <LoadingSpinner className={loadingClassName} />
        )}

        {/* Error state */}
        {error && (
          <ErrorState
            className={errorClassName}
            retry={handleRetry}
          />
        )}

        {/* Overlay content */}
        {overlay && !loading && !error && (
          <div className="absolute inset-0 flex items-end">
            {overlay}
          </div>
        )}
      </div>
    );
  }
);

OptimizedImage.displayName = 'OptimizedImage';

// Preset components for common use cases
export const FoodImage = forwardRef<HTMLDivElement, Omit<OptimizedImageProps, 'fallbackSrc'>>(
  (props, ref) => (
    <OptimizedImage
      ref={ref}
      {...props}
      fallbackSrc={DEFAULT_FALLBACKS.food}
      aspectRatio="square"
      objectFit="cover"
    />
  )
);

FoodImage.displayName = 'FoodImage';

export const UserAvatar = forwardRef<HTMLDivElement, Omit<OptimizedImageProps, 'fallbackSrc' | 'aspectRatio'>>(
  (props, ref) => (
    <OptimizedImage
      ref={ref}
      {...props}
      fallbackSrc={DEFAULT_FALLBACKS.user}
      aspectRatio="square"
      objectFit="cover"
      className={cn('rounded-full', props.className)}
    />
  )
);

UserAvatar.displayName = 'UserAvatar';

export const RestaurantLogo = forwardRef<HTMLDivElement, Omit<OptimizedImageProps, 'fallbackSrc'>>(
  (props, ref) => (
    <OptimizedImage
      ref={ref}
      {...props}
      fallbackSrc={DEFAULT_FALLBACKS.restaurant}
      objectFit="contain"
      performance="eager"
      priority
    />
  )
);

RestaurantLogo.displayName = 'RestaurantLogo';

export const HeroImage = forwardRef<HTMLDivElement, OptimizedImageProps>(
  (props, ref) => (
    <OptimizedImage
      ref={ref}
      {...props}
      aspectRatio="16/9"
      objectFit="cover"
      performance="eager"
      priority
      quality={90}
      sizes="100vw"
    />
  )
);

HeroImage.displayName = 'HeroImage';

// Gallery component for multiple images with lazy loading
interface ImageGalleryProps {
  images: Array<{
    src: string;
    alt: string;
    caption?: string;
  }>;
  columns?: number;
  aspectRatio?: OptimizedImageProps['aspectRatio'];
  className?: string;
  onImageClick?: (index: number) => void;
}

export const ImageGallery = ({
  images,
  columns = 3,
  aspectRatio = 'square',
  className,
  onImageClick,
}: ImageGalleryProps) => {
  const gridCols = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 sm:grid-cols-2',
    3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
    5: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5',
    6: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6',
  }[Math.min(columns, 6)] || 'grid-cols-3';

  return (
    <div className={cn('grid gap-4', gridCols, className)}>
      {images.map((image, index) => (
        <div key={index} className="group cursor-pointer">
          <OptimizedImage
            src={image.src}
            alt={image.alt}
            aspectRatio={aspectRatio}
            className="transition-transform duration-200 group-hover:scale-105"
            onClick={() => onImageClick?.(index)}
            lazy={index > 6} // Load first 6 images eagerly
            overlay={
              image.caption && (
                <div className="absolute inset-x-0 bottom-0 bg-black/50 text-white p-2 text-sm">
                  {image.caption}
                </div>
              )
            }
          />
        </div>
      ))}
    </div>
  );
};

// Utility function to preload critical images
export const preloadImage = (src: string, priority: 'high' | 'low' = 'low'): void => {
  if (typeof window === 'undefined') return;

  const link = document.createElement('link');
  link.rel = 'preload';
  link.as = 'image';
  link.href = src;
  link.fetchPriority = priority;
  
  document.head.appendChild(link);
  
  // Clean up after image loads or fails
  const cleanup = () => {
    document.head.removeChild(link);
  };
  
  link.onload = cleanup;
  link.onerror = cleanup;
};

// Utility function to check if WebP is supported
export const isWebPSupported = (): Promise<boolean> => {
  return new Promise((resolve) => {
    const webP = new Image();
    webP.onload = webP.onerror = () => {
      resolve(webP.height === 2);
    };
    webP.src = 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
  });
};

// Utility function to check if AVIF is supported
export const isAVIFSupported = (): Promise<boolean> => {
  return new Promise((resolve) => {
    const avif = new Image();
    avif.onload = avif.onerror = () => {
      resolve(avif.height === 2);
    };
    avif.src = 'data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAAB0AAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAIAAAACAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQ0MAAAAABNjb2xybmNseAACAAIAAYAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAACVtZGF0EgAKCBgABogQEAwgMg8f8D///8WfhwB8+ErK42A=';
  });
};