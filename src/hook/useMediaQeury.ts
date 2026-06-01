// hooks/useResponsive.ts
"use client";

import { useEffect, useMemo, useState } from "react";

// ─── Breakpoint Configuration (Tailwind-aligned) ───────────────
export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536,
} as const;

export type Breakpoint = keyof typeof BREAKPOINTS;

// ─── Hook Options ──────────────────────────────────────────────
export interface UseResponsiveOptions {
  /** Initial value for SSR (prevents hydration mismatch) */
  defaultValue?: boolean;
  /** Only subscribe to specific breakpoints (performance) */
  only?: Breakpoint[];
}

// ─── Return Type ───────────────────────────────────────────────
export interface ResponsiveState {
  // Current dimensions
  width: number;
  height: number;
  
  // Breakpoint flags (Tailwind-style)
  isSm: boolean;  // >= 640px
  isMd: boolean;  // >= 768px
  isLg: boolean;  // >= 1024px
  isXl: boolean;  // >= 1280px
  is2xl: boolean; // >= 1536px
  
  // Convenience aliases
  isMobile: boolean;   // < 768px
  isTablet: boolean;   // 768px - 1023px
  isDesktop: boolean;  // >= 1024px
  
  // Utility methods (chainable)
  up: (bp: Breakpoint) => boolean;    // >= breakpoint
  down: (bp: Breakpoint) => boolean;  // < breakpoint
  between: (min: Breakpoint, max: Breakpoint) => boolean;
  only: (bp: Breakpoint) => boolean;  // exactly this range
  
  // Raw access
  current: Breakpoint; // Largest matching breakpoint
}

export function useResponsive(options?: UseResponsiveOptions): ResponsiveState {
  const { defaultValue = false, only } = options || {};
  
  // SSR-safe initial state
  const [dimensions, setDimensions] = useState({
    width: typeof window !== "undefined" ? window.innerWidth : 0,
    height: typeof window !== "undefined" ? window.innerHeight : 0,
  });

  // Track which media queries are active
  const [matches, setMatches] = useState<Record<string, boolean>>({});

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Initial dimensions
    setDimensions({
      width: window.innerWidth,
      height: window.innerHeight,
    });

    // Create media query listeners for each breakpoint
    const queries = Object.entries(BREAKPOINTS).map(([bp, value]) => {
      // Skip if not in `only` filter
      if (only && !only.includes(bp as Breakpoint)) return null;
      
      const query = window.matchMedia(`(min-width: ${value}px)`);
      
      const handler = (e: MediaQueryListEvent) => {
        setMatches(prev => ({ ...prev, [bp]: e.matches }));
      };
      
      // Initial value
      setMatches(prev => ({ ...prev, [bp]: query.matches }));
      
      // Listen for changes (modern browsers)
      if (query.addEventListener) {
        query.addEventListener("change", handler);
      } else {
        // Fallback for older browsers
        query.addListener(handler);
      }
      
      return () => {
        if (query.removeEventListener) {
          query.removeEventListener("change", handler);
        } else {
          query.removeListener(handler);
        }
      };
    }).filter(Boolean) as (() => void)[];

    // Resize listener for dimensions (debounced)
    let resizeTimeout: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        setDimensions({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      }, 100);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      clearTimeout(resizeTimeout);
      window.removeEventListener("resize", handleResize);
      queries.forEach(cleanup => cleanup?.());
    };
  }, [only]);

  // Memoize all computations
  return useMemo(() => {
    const { width, height } = dimensions;
    
    // Breakpoint flags (>= value)
    const isSm = width >= BREAKPOINTS.sm;
    const isMd = width >= BREAKPOINTS.md;
    const isLg = width >= BREAKPOINTS.lg;
    const isXl = width >= BREAKPOINTS.xl;
    const is2xl = width >= BREAKPOINTS["2xl"];
    
    // Convenience aliases
    const isMobile = width < BREAKPOINTS.md;
    const isTablet = width >= BREAKPOINTS.md && width < BREAKPOINTS.lg;
    const isDesktop = width >= BREAKPOINTS.lg;
    
    // Current largest matching breakpoint
    const current: Breakpoint = 
      is2xl ? "2xl" : isXl ? "xl" : isLg ? "lg" : isMd ? "md" : "sm";
    
    // Utility methods
    const up = (bp: Breakpoint) => width >= BREAKPOINTS[bp];
    const down = (bp: Breakpoint) => width < BREAKPOINTS[bp];
    const between = (min: Breakpoint, max: Breakpoint) => 
      width >= BREAKPOINTS[min] && width < BREAKPOINTS[max];
    const only = (bp: Breakpoint) => {
      const values = Object.values(BREAKPOINTS);
      const idx = values.indexOf(BREAKPOINTS[bp]);
      const next = values[idx + 1];
      return width >= BREAKPOINTS[bp] && (!next || width < next);
    };
    
    return {
      width,
      height,
      isSm,
      isMd,
      isLg,
      isXl,
      is2xl,
      isMobile,
      isTablet,
      isDesktop,
      current,
      up,
      down,
      between,
      only,
    };
  }, [dimensions, matches]);
}