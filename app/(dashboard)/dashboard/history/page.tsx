import { Suspense } from 'react';
import { getAuthSession } from '@/lib/auth';
import { db } from '@/lib/db';
import { ProjectList } from '@/components/project/project-list';

async function getProjects(userId: string) {
  return db.project.findMany({
    where: { userId },
    orderBy: { updatedAt: 'desc' },
    select: {
      id: true,
      name: true,
      description: true,
      prompt: true,
      status: true,
      createdAt: true,
      updatedAt: true,
    },
  });
}

function LoadingSkeleton() {
  return (
    <div className="space-y-4">
      {[...Array(5)].map((_, i) => (
        <div
          key={i}
          className="bg-card border border-border rounded-xl p-6 animate-pulse"
        >
          <div className="h-5 bg-card-hover rounded w-1/3 mb-3" />
          <div className="h-4 bg-card-hover rounded w-2/3" />
        </div>
      ))}
    </div>
  );
}

export default async function HistoryPage() {
  const session = await getAuthSession();
  const projects = await getProjects(session!.user.id);

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Project History</h1>
        <p className="text-accent-muted">
          Browse and manage your previous projects
        </p>
      </div>

      <Suspense fallback={<LoadingSkeleton />}>
        <ProjectList projects={projects} />
      </Suspense>
    </div>
  );
}

