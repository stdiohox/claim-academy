import { useRef } from 'react';
import { useInView } from 'framer-motion';

export const useScrollReveal = (options: Parameters<typeof useInView>[1] = {}) => {
  const ref = useRef<HTMLElement | null>(null);
  const isInView = useInView(ref, { once: true, margin: '-8% 0px', ...options });
  return { ref, isInView };
};

export const shouldAnimate = () =>
  typeof window !== 'undefined' &&
  !window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export const isMobile = () =>
  typeof window !== 'undefined' && window.matchMedia('(max-width: 768px)').matches;

export const isTouch = () =>
  typeof window !== 'undefined' && 'ontouchstart' in window;

export const MOTION_VALUES = {
  y_offset: typeof window !== 'undefined' && isMobile() ? 30 : 60,
  duration: typeof window !== 'undefined' && isMobile() ? 0.6 : 0.9,
  stagger: typeof window !== 'undefined' && isMobile() ? 0.05 : 0.08,
};
