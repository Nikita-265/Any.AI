'use client';

import { useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { signOut, useSession } from 'next-auth/react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Home,
  PlusCircle,
  History,
  Settings,
  User,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Sparkles,
} from 'lucide-react';
import { Logo } from '@/components/ui/logo';

interface NavItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  href?: string;
  onClick?: () => void;
}

export function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { data: session } = useSession();

  const mainNavItems: NavItem[] = [
    {
      id: 'home',
      label: 'Home',
      icon: <Home size={20} />,
      href: '/dashboard',
    },
    {
      id: 'new-project',
      label: 'New Project',
      icon: <PlusCircle size={20} />,
      href: '/dashboard/new',
    },
    {
      id: 'history',
      label: 'History',
      icon: <History size={20} />,
      href: '/dashboard/history',
    },
  ];

  const bottomNavItems: NavItem[] = [
    {
      id: 'settings',
      label: 'Settings',
      icon: <Settings size={20} />,
      href: '/dashboard/settings',
    },
    {
      id: 'profile',
      label: 'Profile',
      icon: <User size={20} />,
      href: '/dashboard/profile',
    },
    {
      id: 'logout',
      label: 'Logout',
      icon: <LogOut size={20} />,
      onClick: () => signOut({ callbackUrl: '/auth/signin' }),
    },
  ];

  const handleNavClick = (item: NavItem) => {
    if (item.onClick) {
      item.onClick();
    } else if (item.href) {
      router.push(item.href);
    }
  };

  const isActive = (item: NavItem) => {
    if (!item.href) return false;
    if (item.href === '/dashboard') {
      return pathname === '/dashboard';
    }
    return pathname.startsWith(item.href);
  };

  const sidebarVariants = {
    expanded: { width: 260 },
    collapsed: { width: 72 },
  };

  const NavButton = ({ item }: { item: NavItem }) => {
    const active = isActive(item);

    return (
      <motion.button
        onClick={() => handleNavClick(item)}
        className={`
          w-full flex items-center gap-3 px-3 py-2.5 rounded-lg
          transition-smooth group relative
          ${
            active
              ? 'bg-accent/10 text-accent'
              : 'text-accent-muted hover:bg-card-hover hover:text-foreground'
          }
        `}
        whileHover={{ x: 4 }}
        whileTap={{ scale: 0.98 }}
      >
        {/* Active indicator */}
        {active && (
          <motion.div
            layoutId="activeIndicator"
            className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-accent rounded-r-full"
            initial={false}
            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
          />
        )}

        <span className="flex-shrink-0">{item.icon}</span>
        
        <AnimatePresence>
          {!isCollapsed && (
            <motion.span
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: 'auto' }}
              exit={{ opacity: 0, width: 0 }}
              className="text-sm font-medium whitespace-nowrap overflow-hidden"
            >
              {item.label}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>
    );
  };

  return (
    <motion.aside
      variants={sidebarVariants}
      animate={isCollapsed ? 'collapsed' : 'expanded'}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className="h-screen bg-card border-r border-border flex flex-col relative"
    >
      {/* Toggle Button */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute -right-3 top-8 z-10 w-6 h-6 bg-card border border-border rounded-full flex items-center justify-center text-accent-muted hover:text-foreground hover:bg-card-hover transition-smooth"
      >
        {isCollapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
      </button>

      {/* Logo */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-accent to-accent-muted rounded-xl flex items-center justify-center flex-shrink-0">
            <Sparkles size={20} className="text-background" />
          </div>
          <AnimatePresence>
            {!isCollapsed && (
              <motion.div
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: 'auto' }}
                exit={{ opacity: 0, width: 0 }}
                className="overflow-hidden"
              >
                <Logo size="sm" animate={false} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
        {mainNavItems.map((item) => (
          <NavButton key={item.id} item={item} />
        ))}
      </nav>

      {/* User Section */}
      <div className="p-3 border-t border-border space-y-1">
        {bottomNavItems.map((item) => (
          <NavButton key={item.id} item={item} />
        ))}

        {/* User Info */}
        {session?.user && (
          <div className="mt-3 pt-3 border-t border-border">
            <div className="flex items-center gap-3 px-3 py-2">
              <div className="w-8 h-8 bg-accent/20 rounded-full flex items-center justify-center flex-shrink-0">
                {session.user.image ? (
                  <img
                    src={session.user.image}
                    alt={session.user.name || ''}
                    className="w-8 h-8 rounded-full"
                  />
                ) : (
                  <User size={16} className="text-accent" />
                )}
              </div>
              <AnimatePresence>
                {!isCollapsed && (
                  <motion.div
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: 1, width: 'auto' }}
                    exit={{ opacity: 0, width: 0 }}
                    className="overflow-hidden"
                  >
                    <p className="text-sm font-medium text-foreground truncate max-w-[140px]">
                      {session.user.name}
                    </p>
                    <p className="text-xs text-accent-muted truncate max-w-[140px]">
                      {session.user.email}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        )}
      </div>
    </motion.aside>
  );
}

