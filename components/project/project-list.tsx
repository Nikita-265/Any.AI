'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Folder, 
  Clock, 
  MoreVertical, 
  Trash2, 
  ExternalLink,
  Search,
  FolderOpen
} from 'lucide-react';
import { formatDistanceToNow } from '@/lib/utils';

interface Project {
  id: string;
  name: string;
  description: string | null;
  prompt: string | null;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}

interface ProjectListProps {
  projects: Project[];
}

export function ProjectList({ projects: initialProjects }: ProjectListProps) {
  const router = useRouter();
  const [projects, setProjects] = useState(initialProjects);
  const [searchQuery, setSearchQuery] = useState('');
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const filteredProjects = projects.filter((project) =>
    project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    project.prompt?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDelete = async (projectId: string) => {
    setDeletingId(projectId);
    try {
      const response = await fetch(`/api/projects/${projectId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setProjects((prev) => prev.filter((p) => p.id !== projectId));
      }
    } catch (error) {
      console.error('Failed to delete project:', error);
    } finally {
      setDeletingId(null);
    }
  };

  const handleOpen = (projectId: string) => {
    router.push(`/dashboard/project/${projectId}`);
  };

  if (projects.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center py-16"
      >
        <div className="w-20 h-20 mx-auto mb-6 bg-card rounded-2xl flex items-center justify-center border border-border">
          <FolderOpen size={32} className="text-accent-muted" />
        </div>
        <h3 className="text-xl font-semibold text-foreground mb-2">
          No projects yet
        </h3>
        <p className="text-accent-muted mb-6">
          Start building something amazing!
        </p>
        <button
          onClick={() => router.push('/dashboard')}
          className="px-6 py-3 bg-accent text-background rounded-lg font-medium hover:bg-accent/90 transition-colors"
        >
          Create Your First Project
        </button>
      </motion.div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Search */}
      <div className="relative">
        <Search
          size={18}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-accent-muted"
        />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search projects..."
          className="w-full pl-12 pr-4 py-3 bg-card border border-border rounded-xl text-foreground placeholder:text-accent-muted/50 focus:border-accent-muted focus:outline-none transition-colors"
        />
      </div>

      {/* Project List */}
      <AnimatePresence>
        {filteredProjects.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12 text-accent-muted"
          >
            No projects match your search
          </motion.div>
        ) : (
          <motion.div layout className="space-y-3">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ delay: index * 0.05 }}
                className="group bg-card border border-border rounded-xl p-5 hover:border-accent-muted/30 transition-colors cursor-pointer"
                onClick={() => handleOpen(project.id)}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-4 flex-1 min-w-0">
                    <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Folder size={20} className="text-accent" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-foreground truncate mb-1">
                        {project.name}
                      </h3>
                      {project.prompt && (
                        <p className="text-sm text-accent-muted line-clamp-2">
                          {project.prompt}
                        </p>
                      )}
                      <div className="flex items-center gap-2 mt-2 text-xs text-accent-muted">
                        <Clock size={12} />
                        <span>
                          Updated {formatDistanceToNow(new Date(project.updatedAt))}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleOpen(project.id);
                      }}
                      className="p-2 hover:bg-card-hover rounded-lg transition-colors"
                      title="Open project"
                    >
                      <ExternalLink size={16} className="text-accent-muted" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(project.id);
                      }}
                      disabled={deletingId === project.id}
                      className="p-2 hover:bg-red-500/10 rounded-lg transition-colors"
                      title="Delete project"
                    >
                      <Trash2
                        size={16}
                        className={`${
                          deletingId === project.id
                            ? 'text-accent-muted animate-pulse'
                            : 'text-red-400'
                        }`}
                      />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

