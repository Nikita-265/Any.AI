'use client';

import { useState, useRef, useEffect, forwardRef, useImperativeHandle } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Loader2, Sparkles } from 'lucide-react';

interface ChatInputProps {
  onSubmit: (message: string) => void;
  isLoading?: boolean;
  placeholder?: string;
  initialValue?: string;
}

export interface ChatInputHandle {
  setValue: (value: string) => void;
  focus: () => void;
  submit: () => void;
}

export const ChatInput = forwardRef<ChatInputHandle, ChatInputProps>(
  ({ onSubmit, isLoading = false, placeholder = "Describe what you want to build...", initialValue = '' }, ref) => {
    const [value, setValue] = useState(initialValue);
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    useImperativeHandle(ref, () => ({
      setValue: (newValue: string) => {
        setValue(newValue);
        // Auto-resize after setting value
        setTimeout(() => {
          if (textareaRef.current) {
            textareaRef.current.style.height = 'auto';
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
          }
        }, 0);
      },
      focus: () => {
        textareaRef.current?.focus();
      },
      submit: () => {
        if (value.trim() && !isLoading) {
          onSubmit(value.trim());
          setValue('');
          if (textareaRef.current) {
            textareaRef.current.style.height = 'auto';
          }
        }
      },
    }));

    useEffect(() => {
      if (initialValue) {
        setValue(initialValue);
      }
    }, [initialValue]);

    // Auto-resize textarea
    useEffect(() => {
      const textarea = textareaRef.current;
      if (textarea) {
        textarea.style.height = 'auto';
        textarea.style.height = `${textarea.scrollHeight}px`;
      }
    }, [value]);

    const handleSubmit = () => {
      if (value.trim() && !isLoading) {
        onSubmit(value.trim());
        setValue('');
        if (textareaRef.current) {
          textareaRef.current.style.height = 'auto';
        }
      }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        handleSubmit();
      }
    };

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative"
      >
        <div className="relative bg-card border border-border rounded-2xl overflow-hidden focus-within:border-accent-muted/50 transition-smooth">
          {/* Gradient border effect on focus */}
          <div className="absolute inset-0 opacity-0 focus-within:opacity-100 pointer-events-none">
            <div className="absolute inset-0 bg-gradient-to-r from-accent/10 via-transparent to-accent/10" />
          </div>

          <div className="relative flex items-end gap-2 p-4">
            {/* AI indicator */}
            <div className="flex-shrink-0 pb-2">
              <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center">
                <Sparkles size={16} className="text-accent" />
              </div>
            </div>

            {/* Textarea */}
            <textarea
              ref={textareaRef}
              value={value}
              onChange={(e) => setValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={placeholder}
              disabled={isLoading}
              rows={1}
              className="flex-1 bg-transparent text-foreground placeholder:text-accent-muted/50 resize-none focus:outline-none min-h-[40px] max-h-[200px] py-2"
            />

            {/* Submit button */}
            <button
              onClick={handleSubmit}
              disabled={!value.trim() || isLoading}
              className={`
                flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center
                transition-smooth
                ${
                  value.trim() && !isLoading
                    ? 'bg-accent text-background hover:bg-accent/90'
                    : 'bg-card-hover text-accent-muted cursor-not-allowed'
                }
              `}
            >
              <AnimatePresence mode="wait">
                {isLoading ? (
                  <motion.div
                    key="loading"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                  >
                    <Loader2 size={18} className="animate-spin" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="send"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                  >
                    <Send size={18} />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>

        {/* Helper text */}
        <p className="text-xs text-accent-muted mt-2 text-center">
          Press <kbd className="px-1.5 py-0.5 bg-card rounded text-foreground">Enter</kbd> to send, <kbd className="px-1.5 py-0.5 bg-card rounded text-foreground">Shift + Enter</kbd> for new line
        </p>
      </motion.div>
    );
  }
);

ChatInput.displayName = 'ChatInput';

