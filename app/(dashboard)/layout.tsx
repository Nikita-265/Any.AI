import { redirect } from 'next/navigation';
import { getAuthSession } from '@/lib/auth';
import { Sidebar } from '@/components/sidebar/sidebar';

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getAuthSession();

  if (!session) {
    redirect('/auth/signin');
  }

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <main className="flex-1 overflow-auto dotted-bg">{children}</main>
    </div>
  );
}

