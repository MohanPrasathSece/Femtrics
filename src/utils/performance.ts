import { lazy, Suspense } from 'react';

// Lazy load components for better performance
export const lazyLoad = <T extends React.ComponentType<any>>(
  importFunc: () => Promise<{ default: T }>,
  fallback: React.ReactNode = <div>Loading...</div>
) => {
  const LazyComponent = lazy(importFunc);
  
  return (props: React.ComponentProps<T>) => (
    <Suspense fallback={fallback}>
      <LazyComponent {...props} />
    </Suspense>
  );
};

// Image optimization utilities
export const optimizeImage = (
  src: string,
  options: {
    width?: number;
    height?: number;
    quality?: number;
    format?: 'webp' | 'avif' | 'auto';
  } = {}
) => {
  const { width, height, quality = 80, format = 'auto' } = options;
  
  let optimizedSrc = src;
  
  // Add size parameters if specified
  if (width || height) {
    const sizeParams = [];
    if (width) sizeParams.push(`w=${width}`);
    if (height) sizeParams.push(`h=${height}`);
    optimizedSrc += `?${sizeParams.join('&')}`;
  }
  
  // Add quality parameter
  if (quality !== 80) {
    optimizedSrc += optimizedSrc.includes('?') ? '&q=' : '?q=';
    optimizedSrc += quality;
  }
  
  // Add format parameter
  if (format !== 'auto') {
    optimizedSrc += optimizedSrc.includes('?') ? '&f=' : '?f=';
    optimizedSrc += format;
  }
  
  return optimizedSrc;
};

// Performance monitoring utilities
export const measurePerformance = (name: string, fn: () => void) => {
  if (typeof window !== 'undefined' && 'performance' in window) {
    const start = performance.now();
    fn();
    const end = performance.now();
    console.log(`${name} took ${end - start} milliseconds`);
  } else {
    fn();
  }
};

// Intersection Observer for lazy loading
export const createIntersectionObserver = (
  callback: IntersectionObserverCallback,
  options: IntersectionObserverInit = {}
) => {
  const defaultOptions: IntersectionObserverInit = {
    root: null,
    rootMargin: '50px',
    threshold: 0.1,
    ...options
  };
  
  return new IntersectionObserver(callback, defaultOptions);
};

// Preload critical resources
export const preloadResource = (href: string, as: string) => {
  if (typeof document !== 'undefined') {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.href = href;
    link.as = as;
    document.head.appendChild(link);
  }
};

// Prefetch non-critical resources
export const prefetchResource = (href: string) => {
  if (typeof document !== 'undefined') {
    const link = document.createElement('link');
    link.rel = 'prefetch';
    link.href = href;
    document.head.appendChild(link);
  }
};

// Critical CSS inlining helper
export const inlineCriticalCSS = (css: string) => {
  if (typeof document !== 'undefined') {
    const style = document.createElement('style');
    style.textContent = css;
    style.setAttribute('data-critical', 'true');
    document.head.appendChild(style);
  }
};

// Font optimization
export const optimizeFonts = () => {
  if (typeof document !== 'undefined') {
    // Preconnect to Google Fonts
    const preconnect1 = document.createElement('link');
    preconnect1.rel = 'preconnect';
    preconnect1.href = 'https://fonts.googleapis.com';
    document.head.appendChild(preconnect1);

    const preconnect2 = document.createElement('link');
    preconnect2.rel = 'preconnect';
    preconnect2.href = 'https://fonts.gstatic.com';
    preconnect2.crossOrigin = 'anonymous';
    document.head.appendChild(preconnect2);
  }
};

// Service Worker registration for PWA capabilities
export const registerServiceWorker = async () => {
  if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
    try {
      const registration = await navigator.serviceWorker.register('/sw.js');
      console.log('Service Worker registered successfully:', registration);
    } catch (error) {
      console.error('Service Worker registration failed:', error);
    }
  }
};

// Web Vitals monitoring
export const reportWebVitals = (onPerfEntry?: (metric: any) => void) => {
  if (typeof window !== 'undefined' && onPerfEntry) {
    import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      getCLS(onPerfEntry);
      getFID(onPerfEntry);
      getFCP(onPerfEntry);
      getLCP(onPerfEntry);
      getTTFB(onPerfEntry);
    });
  }
};

// Debounce utility for performance optimization
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout;
  
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

// Throttle utility for performance optimization
export const throttle = <T extends (...args: any[]) => any>(
  func: T,
  limit: number
): ((...args: Parameters<T>) => void) => {
  let inThrottle: boolean;
  
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
};

// Memoization utility for expensive computations
export const memoize = <T extends (...args: any[]) => any>(
  func: T
): ((...args: Parameters<T>) => ReturnType<T>) => {
  const cache = new Map();
  
  return (...args: Parameters<T>): ReturnType<T> => {
    const key = JSON.stringify(args);
    
    if (cache.has(key)) {
      return cache.get(key);
    }
    
    const result = func(...args);
    cache.set(key, result);
    return result;
  };
};

// Virtual scrolling helper for large lists
export const createVirtualScrollConfig = (
  itemHeight: number,
  containerHeight: number,
  totalItems: number
) => {
  const visibleCount = Math.ceil(containerHeight / itemHeight);
  const bufferSize = Math.min(5, visibleCount);
  
  return {
    itemHeight,
    visibleCount,
    bufferSize,
    totalHeight: totalItems * itemHeight,
    getVisibleRange: (scrollTop: number) => {
      const startIndex = Math.max(0, Math.floor(scrollTop / itemHeight) - bufferSize);
      const endIndex = Math.min(
        totalItems - 1,
        startIndex + visibleCount + bufferSize * 2
      );
      return { startIndex, endIndex };
    }
  };
};
