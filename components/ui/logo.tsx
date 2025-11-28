'use client';

import { motion } from 'framer-motion';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  animate?: boolean;
}

export function Logo({ size = 'md', animate = true }: LogoProps) {
  const sizes = {
    sm: 'text-xl',
    md: 'text-3xl',
    lg: 'text-5xl',
  };

  const content = (
    <span className={`font-bold ${sizes[size]} tracking-tight`}>
      <span className="text-accent">any</span>
      <span className="text-accent-muted">.</span>
      <span className="bg-gradient-to-r from-accent via-accent-muted to-accent bg-clip-text text-transparent">
        AI
      </span>
    </span>
  );

  if (!animate) {
    return <div className="flex items-center gap-2">{content}</div>;
  }

  return (
    <motion.div
      className="flex items-center gap-2"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      <motion.div
        className="relative"
        whileHover={{ scale: 1.05 }}
        transition={{ type: 'spring', stiffness: 400, damping: 10 }}
      >
        {/* Glowing background effect */}
        <motion.div
          className="absolute inset-0 blur-xl opacity-30 bg-accent rounded-full"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.3, 0.2],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        {content}
      </motion.div>
    </motion.div>
  );
}

