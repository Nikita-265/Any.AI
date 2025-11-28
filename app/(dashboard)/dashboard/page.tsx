'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { Logo } from '@/components/ui/logo';
import { SuggestionBox } from '@/components/chat/suggestion-box';
import { ChatInput, ChatInputHandle } from '@/components/chat/chat-input';
import { ChatMessage } from '@/components/chat/chat-message';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

export default function DashboardPage() {
  const router = useRouter();
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const chatInputRef = useRef<ChatInputHandle>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSuggestionSelect = (prompt: string) => {
    chatInputRef.current?.setValue(prompt);
    chatInputRef.current?.focus();
    
    // Auto-scroll to input
    setTimeout(() => {
      const inputElement = document.querySelector('[data-chat-input]');
      inputElement?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 100);
  };

  const handleSubmit = async (content: string) => {
    setHasStarted(true);
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content,
    };
    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
      // Create a new project with this prompt
      const response = await fetch('/api/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: content.slice(0, 50) + (content.length > 50 ? '...' : ''),
          prompt: content,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create project');
      }

      const project = await response.json();

      // Add assistant response
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: `I've created a new project for you! I'm now working on: "${content.slice(0, 100)}${content.length > 100 ? '...' : ''}"

Here's what I'll build:
• Setting up the project structure
• Creating the necessary components
• Implementing the core functionality
• Adding styling and animations

Let me start generating the code for you. You'll see the results in the project workspace.`,
      };
      
      setMessages((prev) => [...prev, assistantMessage]);

      // Redirect to project page after a short delay
      setTimeout(() => {
        router.push(`/dashboard/project/${project.id}`);
      }, 2000);

    } catch (error) {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: 'Sorry, I encountered an error creating your project. Please try again.',
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-full flex flex-col">
      {/* Main Content Area */}
      <div className="flex-1 overflow-auto">
        <div className="max-w-4xl mx-auto px-6 py-12">
          <AnimatePresence mode="wait">
            {!hasStarted ? (
              <motion.div
                key="welcome"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-12"
              >
                {/* Hero Section */}
                <div className="text-center space-y-6">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                  >
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-card rounded-full border border-border mb-6">
                      <Sparkles size={16} className="text-accent" />
                      <span className="text-sm text-accent-muted">AI-Powered Development</span>
                    </div>
                  </motion.div>

                  <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-4xl md:text-5xl font-bold text-foreground"
                  >
                    Build something with{' '}
                    <span className="text-accent">any.AI</span>
                  </motion.h1>

                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="text-lg text-accent-muted max-w-2xl mx-auto"
                  >
                    Describe what you want to build and let AI create it for you.
                    From simple components to full-stack applications.
                  </motion.p>
                </div>

                {/* Suggestions */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <h2 className="text-lg font-medium text-foreground mb-4 text-center">
                    Try one of these prompts
                  </h2>
                  <SuggestionBox onSelect={handleSuggestionSelect} />
                </motion.div>

                {/* Or custom prompt */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="relative"
                >
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-border" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="px-4 text-accent-muted bg-background">
                      or describe your own project
                    </span>
                  </div>
                </motion.div>
              </motion.div>
            ) : (
              <motion.div
                key="chat"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-6 pb-32"
              >
                {/* Messages */}
                {messages.map((message) => (
                  <ChatMessage
                    key={message.id}
                    role={message.role}
                    content={message.content}
                  />
                ))}

                {/* Typing indicator */}
                {isLoading && (
                  <ChatMessage role="assistant" content="" isTyping />
                )}

                <div ref={messagesEndRef} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Chat Input - Fixed at bottom */}
      <div className="sticky bottom-0 bg-gradient-to-t from-background via-background to-transparent pt-8 pb-6 px-6">
        <div className="max-w-4xl mx-auto" data-chat-input>
          <ChatInput
            ref={chatInputRef}
            onSubmit={handleSubmit}
            isLoading={isLoading}
            placeholder="Describe what you want to build..."
          />
        </div>
      </div>
    </div>
  );
}

