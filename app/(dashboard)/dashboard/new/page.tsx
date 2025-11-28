'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function NewProjectPage() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to dashboard to start a new project
    router.push('/dashboard');
  }, [router]);

  return (
    <div className="h-full flex items-center justify-center">
      <div className="text-accent-muted">Redirecting...</div>
    </div>
  );
}

