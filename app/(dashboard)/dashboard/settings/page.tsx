'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Settings, Moon, Bell, Shield, Palette } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    darkMode: true,
    notifications: true,
    soundEffects: false,
    autoSave: true,
  });

  const handleToggle = (key: keyof typeof settings) => {
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const settingsSections = [
    {
      title: 'Appearance',
      icon: <Palette size={20} />,
      items: [
        {
          key: 'darkMode' as const,
          label: 'Dark Mode',
          description: 'Use dark theme throughout the app',
        },
      ],
    },
    {
      title: 'Notifications',
      icon: <Bell size={20} />,
      items: [
        {
          key: 'notifications' as const,
          label: 'Push Notifications',
          description: 'Receive notifications about project updates',
        },
        {
          key: 'soundEffects' as const,
          label: 'Sound Effects',
          description: 'Play sounds for actions and notifications',
        },
      ],
    },
    {
      title: 'Privacy & Security',
      icon: <Shield size={20} />,
      items: [
        {
          key: 'autoSave' as const,
          label: 'Auto-save Projects',
          description: 'Automatically save project changes',
        },
      ],
    },
  ];

  return (
    <div className="max-w-2xl mx-auto px-6 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-8"
      >
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Settings</h1>
          <p className="text-accent-muted">
            Customize your any.AI experience
          </p>
        </div>

        {settingsSections.map((section, sectionIndex) => (
          <motion.div
            key={section.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: sectionIndex * 0.1 }}
            className="bg-card border border-border rounded-xl p-6"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center text-accent">
                {section.icon}
              </div>
              <h2 className="text-lg font-semibold text-foreground">
                {section.title}
              </h2>
            </div>

            <div className="space-y-4">
              {section.items.map((item) => (
                <div
                  key={item.key}
                  className="flex items-center justify-between py-3 border-b border-border last:border-0"
                >
                  <div>
                    <p className="font-medium text-foreground">{item.label}</p>
                    <p className="text-sm text-accent-muted">
                      {item.description}
                    </p>
                  </div>
                  <button
                    onClick={() => handleToggle(item.key)}
                    className={`
                      relative w-12 h-6 rounded-full transition-colors
                      ${settings[item.key] ? 'bg-accent' : 'bg-border'}
                    `}
                  >
                    <motion.div
                      className="absolute top-1 w-4 h-4 bg-white rounded-full"
                      animate={{
                        left: settings[item.key] ? 'calc(100% - 20px)' : '4px',
                      }}
                      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                    />
                  </button>
                </div>
              ))}
            </div>
          </motion.div>
        ))}

        <div className="flex justify-end gap-3">
          <Button variant="outline">Reset to Defaults</Button>
          <Button variant="primary">Save Changes</Button>
        </div>
      </motion.div>
    </div>
  );
}

