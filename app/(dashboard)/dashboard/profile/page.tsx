'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { motion } from 'framer-motion';
import { User, Mail, Camera, Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function ProfilePage() {
  const { data: session, update } = useSession();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: session?.user?.name || '',
    email: session?.user?.email || '',
  });
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setSuccess(false);

    try {
      const response = await fetch('/api/user/profile', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        await update({ name: formData.name });
        setSuccess(true);
        setTimeout(() => setSuccess(false), 3000);
      }
    } catch (error) {
      console.error('Failed to update profile:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-6 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-8"
      >
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Profile</h1>
          <p className="text-accent-muted">
            Manage your account information
          </p>
        </div>

        <div className="bg-card border border-border rounded-xl p-6">
          {/* Avatar */}
          <div className="flex items-center gap-6 mb-8 pb-8 border-b border-border">
            <div className="relative">
              <div className="w-24 h-24 rounded-2xl bg-accent/10 flex items-center justify-center overflow-hidden">
                {session?.user?.image ? (
                  <img
                    src={session.user.image}
                    alt={session.user.name || ''}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <User size={40} className="text-accent" />
                )}
              </div>
              <button className="absolute -bottom-2 -right-2 w-8 h-8 bg-accent text-background rounded-lg flex items-center justify-center hover:bg-accent/90 transition-colors">
                <Camera size={16} />
              </button>
            </div>
            <div>
              <h2 className="text-xl font-semibold text-foreground">
                {session?.user?.name || 'User'}
              </h2>
              <p className="text-accent-muted">{session?.user?.email}</p>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <Input
              label="Full Name"
              type="text"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              leftIcon={<User size={18} />}
            />
            <Input
              label="Email Address"
              type="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              leftIcon={<Mail size={18} />}
              disabled
            />

            {success && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-3 bg-green-500/10 border border-green-500/20 rounded-lg text-green-400 text-sm text-center"
              >
                Profile updated successfully!
              </motion.div>
            )}

            <div className="flex justify-end">
              <Button
                type="submit"
                variant="primary"
                isLoading={isLoading}
                leftIcon={<Save size={16} />}
              >
                Save Changes
              </Button>
            </div>
          </form>
        </div>

        {/* Danger Zone */}
        <div className="bg-card border border-red-500/20 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-foreground mb-2">
            Danger Zone
          </h3>
          <p className="text-accent-muted text-sm mb-4">
            Once you delete your account, there is no going back. Please be certain.
          </p>
          <Button variant="outline" className="border-red-500/50 text-red-400 hover:bg-red-500/10">
            Delete Account
          </Button>
        </div>
      </motion.div>
    </div>
  );
}

