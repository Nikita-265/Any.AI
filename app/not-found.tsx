'use client';

import { motion } from 'framer-motion';
import { Home, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { Logo } from '@/components/ui/logo';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className="min-h-screen dotted-bg flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <Logo size="lg" />
        
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="my-12"
        >
          <h1 className="text-8xl font-bold text-accent mb-4">404</h1>
          <p className="text-2xl text-foreground mb-2">Page Not Found</p>
          <p className="text-accent-muted">
            The page you&apos;re looking for doesn&apos;t exist or has been moved.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link href="/">
            <Button variant="primary" leftIcon={<Home size={18} />}>
              Go Home
            </Button>
          </Link>
          <Button
            variant="outline"
            leftIcon={<ArrowLeft size={18} />}
            onClick={() => window.history.back()}
          >
            Go Back
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
}

