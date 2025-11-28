import type { Metadata } from 'next';
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import './globals.css';
import { Providers } from '@/components/providers';

export const metadata: Metadata = {
  title: 'any.AI - Build Anything with AI',
  description: 'Build amazing applications with the power of AI. Create Netflix clones, admin dashboards, kanban boards, and more.',
  keywords: ['AI', 'web development', 'code generation', 'Next.js', 'React'],
  authors: [{ name: 'any.AI' }],
  openGraph: {
    title: 'any.AI - Build Anything with AI',
    description: 'Build amazing applications with the power of AI',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body className="antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

