import { useEffect, useRef, useState, type ReactNode, type ElementType } from 'react';
import { motion, useInView, type Variants } from 'framer-motion';
import { useScrollReveal } from './hooks';

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;

interface RevealSectionProps {
  children: ReactNode;
  delay?: number;
  className?: string;
}

export function RevealSection({ children, delay = 0, className }: RevealSectionProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(ref, { once: true, margin: '-8% 0px' });
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ y: 60, opacity: 0, scale: 0.97 }}
      animate={isInView ? { y: 0, opacity: 1, scale: 1 } : undefined}
      transition={{ duration: 0.8, ease: EASE_OUT_EXPO, delay }}
    >
      {children}
    </motion.div>
  );
}

interface StaggerContainerProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

const staggerParentVariants: Variants = {
  hidden: {},
  visible: (delay: number = 0) => ({
    transition: { staggerChildren: 0.08, delayChildren: delay },
  }),
};

export function StaggerContainer({ children, className, delay = 0 }: StaggerContainerProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(ref, { once: true, margin: '-8% 0px' });
  return (
    <motion.div
      ref={ref}
      className={className}
      variants={staggerParentVariants}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      custom={delay}
    >
      {children}
    </motion.div>
  );
}

const staggerItemVariants: Variants = {
  hidden: { y: 40, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.6, ease: EASE_OUT_EXPO },
  },
};

interface StaggerItemProps {
  children: ReactNode;
  className?: string;
}

export function StaggerItem({ children, className }: StaggerItemProps) {
  return (
    <motion.div className={className} variants={staggerItemVariants}>
      {children}
    </motion.div>
  );
}

interface AnimatedHeadlineProps {
  text: string;
  className?: string;
  delay?: number;
  as?: 'h1' | 'h2' | 'h3';
}

export function AnimatedHeadline({
  text,
  className,
  delay = 0.3,
  as = 'h1',
}: AnimatedHeadlineProps) {
  const ref = useRef<HTMLElement | null>(null);
  const isInView = useInView(ref, { once: true, margin: '-8% 0px' });
  const Tag = as as ElementType;
  const words = text.split(' ');
  return (
    <Tag ref={ref as never} className={className}>
      {words.map((word, i) => (
        <span
          key={`${word}-${i}`}
          style={{
            display: 'inline-block',
            overflow: 'hidden',
            verticalAlign: 'top',
            paddingBottom: '0.1em',
          }}
        >
          <motion.span
            style={{ display: 'inline-block', willChange: 'transform' }}
            initial={{ y: '110%', opacity: 0 }}
            animate={isInView ? { y: '0%', opacity: 1 } : undefined}
            transition={{
              duration: 0.8,
              ease: EASE_OUT_EXPO,
              delay: delay + i * 0.06,
            }}
          >
            {word}
            {i < words.length - 1 ? ' ' : ''}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}

interface CounterStatProps {
  target: number;
  suffix?: string;
  duration?: number;
  className?: string;
}

export function CounterStat({
  target,
  suffix = '',
  duration = 2,
  className,
}: CounterStatProps) {
  const { ref, isInView } = useScrollReveal();
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!isInView) return;
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const elapsed = (now - start) / 1000;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(target * eased));
      if (progress < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [isInView, target, duration]);
  return (
    <span ref={ref as never} className={className}>
      {value}{suffix}
    </span>
  );
}

// Legacy exports for compatibility with existing components
export { RevealSection as Reveal };
export { StaggerContainer as Stagger };
export { staggerItemVariants };
export const FadeIn = RevealSection;
