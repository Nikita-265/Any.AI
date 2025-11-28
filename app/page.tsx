import { redirect } from 'next/navigation';
import { getAuthSession } from '@/lib/auth';
import { LandingPage } from '@/components/landing/landing-page';

export default async function Home() {
  const session = await getAuthSession();

  if (session) {
    redirect('/dashboard');
  }

  return <LandingPage />;
}

