'use client';

import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';
import Link from 'next/link';
import { Logo } from '@/components/ui/logo';
import { Button } from '@/components/ui/button';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen dotted-bg flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center max-w-md"
      >
        <Logo size="lg" />

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="my-12"
        >
          <div className="w-20 h-20 mx-auto mb-6 bg-red-500/10 rounded-2xl flex items-center justify-center">
            <AlertTriangle size={40} className="text-red-400" />
          </div>
          <h1 className="text-2xl font-bold text-foreground mb-2">
            Something went wrong!
          </h1>
          <p className="text-accent-muted">
            An unexpected error occurred. Please try again or contact support if
            the problem persists.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Button
            variant="primary"
            leftIcon={<RefreshCw size={18} />}
            onClick={() => reset()}
          >
            Try Again
          </Button>
          <Link href="/">
            <Button variant="outline" leftIcon={<Home size={18} />}>
              Go Home
            </Button>
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}

