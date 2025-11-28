'use client';

import { forwardRef, HTMLAttributes, ReactNode } from 'react';
import { motion, Variants } from 'framer-motion';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'glass' | 'bordered';
  hover?: boolean;
  children: ReactNode;
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ variant = 'default', hover = false, children, className = '', ...props }, ref) => {
    const variants = {
      default: 'bg-card',
      glass: 'glass',
      bordered: 'bg-card border border-border',
    };

    const hoverStyles = hover
      ? 'hover:bg-card-hover hover:border-accent-muted/30 cursor-pointer'
      : '';

    return (
      <div
        ref={ref}
        className={`
          rounded-xl p-6 transition-smooth
          ${variants[variant]}
          ${hoverStyles}
          ${className}
        `}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';

// Animated card with motion
const cardVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export const MotionCard = motion(Card);

export function AnimatedCard({
  children,
  delay = 0,
  className = '',
  ...props
}: CardProps & { delay?: number }) {
  return (
    <MotionCard
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      transition={{ duration: 0.4, delay, ease: 'easeOut' }}
      className={className}
      {...props}
    >
      {children}
    </MotionCard>
  );
}

