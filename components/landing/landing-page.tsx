'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Zap, Shield, Code2, Layers, Rocket } from 'lucide-react';
import Link from 'next/link';
import { Logo } from '@/components/ui/logo';
import { Button } from '@/components/ui/button';

const features = [
  {
    icon: <Sparkles size={24} />,
    title: 'AI-Powered',
    description: 'Describe what you want, and let AI build it for you in seconds.',
  },
  {
    icon: <Code2 size={24} />,
    title: 'Full-Stack Ready',
    description: 'Generate complete applications with frontend, backend, and database.',
  },
  {
    icon: <Zap size={24} />,
    title: 'Lightning Fast',
    description: 'Go from idea to working prototype in minutes, not days.',
  },
  {
    icon: <Shield size={24} />,
    title: 'Secure by Default',
    description: 'Built with security best practices and modern authentication.',
  },
  {
    icon: <Layers size={24} />,
    title: 'Modular Design',
    description: 'Clean, reusable components that you can customize and extend.',
  },
  {
    icon: <Rocket size={24} />,
    title: 'Deploy Instantly',
    description: 'One-click deployment to your favorite cloud platform.',
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

export function LandingPage() {
  return (
    <div className="min-h-screen dotted-bg overflow-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Logo size="md" />
          <div className="flex items-center gap-4">
            <Link
              href="/auth/signin"
              className="text-accent-muted hover:text-foreground transition-colors"
            >
              Sign In
            </Link>
            <Link href="/auth/signup">
              <Button variant="primary" size="sm">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6">
        {/* Background effects */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-accent/5 rounded-full blur-3xl"
            animate={{
              x: [0, 50, 0],
              y: [0, 30, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
          <motion.div
            className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-accent-muted/5 rounded-full blur-3xl"
            animate={{
              x: [0, -30, 0],
              y: [0, -50, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        </div>

        <div className="max-w-5xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-card rounded-full border border-border mb-8"
          >
            <Sparkles size={16} className="text-accent" />
            <span className="text-sm text-accent-muted">
              AI-Powered Development Platform
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-5xl md:text-7xl font-bold text-foreground mb-6 leading-tight"
          >
            Build anything with{' '}
            <span className="bg-gradient-to-r from-accent via-accent-muted to-accent bg-clip-text text-transparent">
              any.AI
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-xl text-accent-muted max-w-2xl mx-auto mb-10"
          >
            Transform your ideas into fully functional applications. Just describe
            what you want, and watch AI bring it to life.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link href="/auth/signup">
              <Button variant="primary" size="lg" rightIcon={<ArrowRight size={18} />}>
                Start Building for Free
              </Button>
            </Link>
            <Link href="/auth/signin">
              <Button variant="outline" size="lg">
                Sign In
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Demo Section */}
      <section className="py-20 px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-5xl mx-auto"
        >
          <div className="relative rounded-2xl overflow-hidden border border-border bg-card">
            <div className="absolute top-0 left-0 right-0 h-10 bg-card-hover flex items-center px-4 gap-2 border-b border-border">
              <div className="w-3 h-3 rounded-full bg-red-400" />
              <div className="w-3 h-3 rounded-full bg-yellow-400" />
              <div className="w-3 h-3 rounded-full bg-green-400" />
              <span className="ml-4 text-xs text-accent-muted">any.AI Dashboard</span>
            </div>
            <div className="pt-10 p-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent to-accent-muted flex items-center justify-center">
                  <Sparkles size={24} className="text-background" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Build a Netflix clone</h3>
                  <p className="text-sm text-accent-muted">
                    Creating streaming platform with authentication...
                  </p>
                </div>
              </div>
              <div className="space-y-3">
                <div className="h-4 bg-card-hover rounded w-full shimmer" />
                <div className="h-4 bg-card-hover rounded w-4/5 shimmer" />
                <div className="h-4 bg-card-hover rounded w-3/5 shimmer" />
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Everything you need to build faster
            </h2>
            <p className="text-accent-muted max-w-2xl mx-auto">
              Powerful features designed to help you create amazing applications
              without the complexity.
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                variants={itemVariants}
                className="p-6 rounded-2xl bg-card border border-border hover:border-accent-muted/30 transition-colors group"
              >
                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center text-accent mb-4 group-hover:bg-accent group-hover:text-background transition-colors">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {feature.title}
                </h3>
                <p className="text-accent-muted text-sm">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center"
        >
          <div className="p-12 rounded-3xl bg-gradient-to-br from-accent/10 via-card to-accent-muted/10 border border-border">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Ready to build something amazing?
            </h2>
            <p className="text-accent-muted mb-8 max-w-xl mx-auto">
              Join thousands of developers who are already building faster with any.AI
            </p>
            <Link href="/auth/signup">
              <Button variant="primary" size="lg" rightIcon={<ArrowRight size={18} />}>
                Get Started for Free
              </Button>
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-border">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <Logo size="sm" animate={false} />
          <p className="text-sm text-accent-muted">
            © {new Date().getFullYear()} any.AI. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

