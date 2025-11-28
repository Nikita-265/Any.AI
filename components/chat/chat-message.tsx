'use client';

import { motion } from 'framer-motion';
import { User, Sparkles, Copy, Check } from 'lucide-react';
import { useState } from 'react';

interface ChatMessageProps {
  role: 'user' | 'assistant';
  content: string;
  isTyping?: boolean;
}

export function ChatMessage({ role, content, isTyping = false }: ChatMessageProps) {
  const [copied, setCopied] = useState(false);
  const isUser = role === 'user';

  const handleCopy = async () => {
    await navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`flex gap-4 ${isUser ? 'flex-row-reverse' : ''}`}
    >
      {/* Avatar */}
      <div
        className={`
          flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center
          ${isUser ? 'bg-accent/20' : 'bg-gradient-to-br from-accent to-accent-muted'}
        `}
      >
        {isUser ? (
          <User size={18} className="text-accent" />
        ) : (
          <Sparkles size={18} className="text-background" />
        )}
      </div>

      {/* Message Content */}
      <div
        className={`
          flex-1 max-w-[80%] rounded-2xl px-5 py-4
          ${isUser ? 'bg-accent text-background' : 'bg-card border border-border'}
        `}
      >
        {isTyping ? (
          <div className="flex gap-1">
            <span className="w-2 h-2 bg-accent-muted rounded-full typing-dot" />
            <span className="w-2 h-2 bg-accent-muted rounded-full typing-dot" />
            <span className="w-2 h-2 bg-accent-muted rounded-full typing-dot" />
          </div>
        ) : (
          <div className="relative group">
            <p
              className={`text-sm leading-relaxed whitespace-pre-wrap ${
                isUser ? 'text-background' : 'text-foreground'
              }`}
            >
              {content}
            </p>
            
            {/* Copy button for assistant messages */}
            {!isUser && (
              <button
                onClick={handleCopy}
                className="absolute -right-2 -top-2 opacity-0 group-hover:opacity-100 p-2 bg-card-hover rounded-lg border border-border transition-opacity"
              >
                {copied ? (
                  <Check size={14} className="text-green-400" />
                ) : (
                  <Copy size={14} className="text-accent-muted" />
                )}
              </button>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
}

