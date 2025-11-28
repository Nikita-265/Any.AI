'use client';

import { motion } from 'framer-motion';
import { Tv, LayoutDashboard, KanbanSquare, ArrowRight } from 'lucide-react';

interface Suggestion {
  id: string;
  title: string;
  description: string;
  prompt: string;
  icon: React.ReactNode;
  gradient: string;
}

interface SuggestionBoxProps {
  onSelect: (prompt: string) => void;
}

const suggestions: Suggestion[] = [
  {
    id: 'netflix',
    title: 'Build a Netflix clone',
    description: 'Create a streaming platform with user authentication, video catalog, and playback features',
    prompt: 'Build a Netflix clone with user authentication, a video catalog with categories, search functionality, video playback, watchlist feature, and a responsive dark-themed UI. Include user profiles and continue watching functionality.',
    icon: <Tv size={24} />,
    gradient: 'from-red-500/20 to-rose-500/20',
  },
  {
    id: 'admin',
    title: 'Build an admin dashboard',
    description: 'Design a comprehensive admin panel with analytics, user management, and data visualization',
    prompt: 'Build an admin dashboard with user management, analytics charts, data tables with sorting/filtering, role-based access control, activity logs, settings panel, and a clean professional UI with dark mode support.',
    icon: <LayoutDashboard size={24} />,
    gradient: 'from-blue-500/20 to-cyan-500/20',
  },
  {
    id: 'kanban',
    title: 'Build a kanban board',
    description: 'Develop a project management tool with drag-and-drop, task cards, and team collaboration',
    prompt: 'Build a kanban board with drag-and-drop functionality, multiple columns (To Do, In Progress, Done), task cards with details, due dates, assignees, labels, search and filter, and real-time collaboration features.',
    icon: <KanbanSquare size={24} />,
    gradient: 'from-purple-500/20 to-violet-500/20',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export function SuggestionBox({ onSelect }: SuggestionBoxProps) {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 md:grid-cols-3 gap-4"
    >
      {suggestions.map((suggestion) => (
        <motion.button
          key={suggestion.id}
          variants={itemVariants}
          onClick={() => onSelect(suggestion.prompt)}
          className={`
            group relative p-6 rounded-2xl border border-border
            bg-gradient-to-br ${suggestion.gradient}
            hover:border-accent-muted/50 transition-smooth
            text-left overflow-hidden
          `}
          whileHover={{ scale: 1.02, y: -4 }}
          whileTap={{ scale: 0.98 }}
        >
          {/* Background glow effect */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity">
            <div className={`absolute inset-0 bg-gradient-to-br ${suggestion.gradient} blur-2xl`} />
          </div>

          <div className="relative z-10">
            {/* Icon */}
            <div className="w-12 h-12 rounded-xl bg-card/80 border border-border flex items-center justify-center text-accent mb-4">
              {suggestion.icon}
            </div>

            {/* Content */}
            <h3 className="text-lg font-semibold text-foreground mb-2 flex items-center gap-2">
              {suggestion.title}
              <ArrowRight
                size={16}
                className="opacity-0 group-hover:opacity-100 transform translate-x-0 group-hover:translate-x-1 transition-all"
              />
            </h3>
            <p className="text-sm text-accent-muted line-clamp-2">
              {suggestion.description}
            </p>
          </div>
        </motion.button>
      ))}
    </motion.div>
  );
}

