import { notFound } from 'next/navigation';
import { getAuthSession } from '@/lib/auth';
import { db } from '@/lib/db';
import { ProjectWorkspace } from '@/components/project/project-workspace';

async function getProject(id: string, userId: string) {
  const project = await db.project.findFirst({
    where: { id, userId },
    include: {
      messages: {
        orderBy: { createdAt: 'asc' },
      },
    },
  });

  return project;
}

export default async function ProjectPage({
  params,
}: {
  params: { id: string };
}) {
  const session = await getAuthSession();
  const project = await getProject(params.id, session!.user.id);

  if (!project) {
    notFound();
  }

  return <ProjectWorkspace project={project} />;
}

