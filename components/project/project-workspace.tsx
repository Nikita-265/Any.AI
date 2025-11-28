'use client';

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Code, MessageSquare, Copy, Check, Download } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { ChatInput, ChatInputHandle } from '@/components/chat/chat-input';
import { ChatMessage } from '@/components/chat/chat-message';

interface Message {
  id: string;
  role: string;
  content: string;
  createdAt: Date;
}

interface Project {
  id: string;
  name: string;
  description: string | null;
  prompt: string | null;
  content: string | null;
  status: string;
  createdAt: Date;
  updatedAt: Date;
  messages: Message[];
}

interface ProjectWorkspaceProps {
  project: Project;
}

export function ProjectWorkspace({ project }: ProjectWorkspaceProps) {
  const router = useRouter();
  const [messages, setMessages] = useState<Message[]>(project.messages);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'chat' | 'code'>('chat');
  const [copied, setCopied] = useState(false);
  const chatInputRef = useRef<ChatInputHandle>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (content: string) => {
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content,
      createdAt: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const response = await fetch(`/api/projects/${project.id}/messages`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content }),
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }

      const data = await response.json();

      // Add assistant response
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.response,
        createdAt: new Date(),
      };
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: 'Sorry, I encountered an error. Please try again.',
        createdAt: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopyCode = async () => {
    if (project.content) {
      await navigator.clipboard.writeText(project.content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <header className="bg-card border-b border-border px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => router.push('/dashboard')}
              className="p-2 hover:bg-card-hover rounded-lg transition-colors"
            >
              <ArrowLeft size={20} className="text-accent-muted" />
            </button>
            <div>
              <h1 className="font-semibold text-foreground">{project.name}</h1>
              <p className="text-xs text-accent-muted">
                Created {new Date(project.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex items-center gap-1 bg-background rounded-lg p-1">
            <button
              onClick={() => setActiveTab('chat')}
              className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'chat'
                  ? 'bg-card text-foreground'
                  : 'text-accent-muted hover:text-foreground'
              }`}
            >
              <MessageSquare size={16} />
              Chat
            </button>
            <button
              onClick={() => setActiveTab('code')}
              className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'code'
                  ? 'bg-card text-foreground'
                  : 'text-accent-muted hover:text-foreground'
              }`}
            >
              <Code size={16} />
              Code
            </button>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="flex-1 overflow-hidden">
        {activeTab === 'chat' ? (
          <div className="h-full flex flex-col">
            {/* Messages */}
            <div className="flex-1 overflow-auto p-6">
              <div className="max-w-3xl mx-auto space-y-6">
                {/* Initial prompt */}
                {project.prompt && (
                  <ChatMessage
                    role="user"
                    content={project.prompt}
                  />
                )}

                {/* Conversation */}
                {messages.map((message) => (
                  <ChatMessage
                    key={message.id}
                    role={message.role as 'user' | 'assistant'}
                    content={message.content}
                  />
                ))}

                {isLoading && (
                  <ChatMessage role="assistant" content="" isTyping />
                )}

                <div ref={messagesEndRef} />
              </div>
            </div>

            {/* Input */}
            <div className="p-6 border-t border-border bg-card">
              <div className="max-w-3xl mx-auto">
                <ChatInput
                  ref={chatInputRef}
                  onSubmit={handleSubmit}
                  isLoading={isLoading}
                  placeholder="Continue the conversation..."
                />
              </div>
            </div>
          </div>
        ) : (
          <div className="h-full flex flex-col p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-foreground">
                Generated Code
              </h2>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleCopyCode}
                  className="flex items-center gap-2 px-3 py-1.5 bg-card border border-border rounded-lg text-sm text-accent-muted hover:text-foreground transition-colors"
                >
                  {copied ? (
                    <>
                      <Check size={14} className="text-green-400" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy size={14} />
                      Copy
                    </>
                  )}
                </button>
                <button className="flex items-center gap-2 px-3 py-1.5 bg-accent text-background rounded-lg text-sm font-medium hover:bg-accent/90 transition-colors">
                  <Download size={14} />
                  Download
                </button>
              </div>
            </div>

            <div className="flex-1 bg-card border border-border rounded-xl overflow-auto">
              {project.content ? (
                <pre className="p-6 text-sm text-foreground font-mono whitespace-pre-wrap">
                  {project.content}
                </pre>
              ) : (
                <div className="h-full flex items-center justify-center text-accent-muted">
                  <div className="text-center">
                    <Code size={48} className="mx-auto mb-4 opacity-50" />
                    <p>No code generated yet</p>
                    <p className="text-sm mt-1">
                      Continue the conversation to generate code
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

