'use client';

import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { AlertCircle } from 'lucide-react';
import { Logo } from '@/components/ui/logo';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

export default function AuthErrorPage() {
  const searchParams = useSearchParams();
  const error = searchParams.get('error');

  const errorMessages: Record<string, string> = {
    Configuration: 'There is a problem with the server configuration.',
    AccessDenied: 'You do not have permission to sign in.',
    Verification: 'The verification token has expired or has already been used.',
    Default: 'An error occurred during authentication.',
  };

  const errorMessage = errorMessages[error || 'Default'] || errorMessages.Default;

  return (
    <div className="min-h-screen dotted-bg flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <Card variant="bordered" className="w-full max-w-md text-center">
          <div className="space-y-6">
            <Logo size="lg" />
            
            <div className="flex justify-center">
              <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center">
                <AlertCircle className="w-8 h-8 text-red-400" />
              </div>
            </div>

            <div>
              <h1 className="text-xl font-semibold text-foreground mb-2">
                Authentication Error
              </h1>
              <p className="text-accent-muted">{errorMessage}</p>
            </div>

            <div className="flex flex-col gap-3">
              <Button
                variant="primary"
                onClick={() => (window.location.href = '/auth/signin')}
              >
                Try Again
              </Button>
              <Button
                variant="ghost"
                onClick={() => (window.location.href = '/')}
              >
                Go Home
              </Button>
            </div>
          </div>
        </Card>
      </motion.div>
    </div>
  );
}

