'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { cn } from '@/lib/utils';

interface Message {
  id: string;
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
}

interface QuickAction {
  label: string;
  query: string;
  icon: React.ReactNode;
  gradient: string;
}

const quickActions: QuickAction[] = [
  { 
    label: 'Find Jobs', 
    query: 'Show me available job positions', 
    icon: <BriefcaseIcon />,
    gradient: 'from-violet-500 to-purple-500'
  },
  { 
    label: 'My Applications', 
    query: 'How can I check my application status?', 
    icon: <ClipboardIcon />,
    gradient: 'from-cyan-500 to-blue-500'
  },
  { 
    label: 'Resume Help', 
    query: 'Give me tips for improving my resume', 
    icon: <DocumentIcon />,
    gradient: 'from-emerald-500 to-teal-500'
  },
  { 
    label: 'Interview Tips', 
    query: 'How should I prepare for an interview?', 
    icon: <SparklesIcon />,
    gradient: 'from-amber-500 to-orange-500'
  },
];

const botResponses: Record<string, string> = {
  greeting: "Hey there! 👋 I'm your AI career companion. Ready to help you land your dream job!\n\nWhat can I help you with today?",
  jobs: "Hot opportunities waiting for you! 🔥\n\n**Engineering** → 12 roles\n**Design** → 8 roles\n**Marketing** → 5 roles\n**Operations** → 4 roles\n\nWant me to filter by location or experience level?",
  status: "Track your journey:\n\n**1.** Sign in to your account\n**2.** Head to Dashboard → Applications\n**3.** See real-time updates\n\nYou'll see: Applied • Reviewing • Interview • Offer • Decision\n\nAnything else I can help with?",
  resume: "Pro tips for a winning resume ✨\n\n**→** Mirror keywords from job posts\n**→** Quantify wins (\"Grew revenue 40%\")\n**→** Clean, scannable format\n**→** Customize for each role\n**→** Zero typos policy\n\nWant me to dive deeper into any of these?",
  interview: "Ace your interview! 🎯\n\n**Research** — Know our mission & culture\n**STAR Method** — Structure your stories\n**Practice** — Common Q&A prep\n**Questions** — Have 3-5 ready\n**Tech Check** — Test video setup\n\nNeed tips for technical or behavioral rounds?",
  default: "I'm here to help! Here's what I can do:\n\n🔍 **Job Search** — Find perfect matches\n📊 **Applications** — Track your progress\n📝 **Resume** — Optimization tips\n🎤 **Interviews** — Prep strategies\n\nWhat interests you?",
};

function getBotResponse(message: string): string {
  const lower = message.toLowerCase();
  if (lower.includes('hello') || lower.includes('hi') || lower.includes('hey') || lower.includes('start')) {
    return botResponses.greeting;
  }
  if (lower.includes('job') || lower.includes('position') || lower.includes('opening') || lower.includes('career') || lower.includes('find')) {
    return botResponses.jobs;
  }
  if (lower.includes('status') || lower.includes('application') || lower.includes('track') || lower.includes('my')) {
    return botResponses.status;
  }
  if (lower.includes('resume') || lower.includes('cv') || lower.includes('tip') || lower.includes('help')) {
    return botResponses.resume;
  }
  if (lower.includes('interview') || lower.includes('prepare') || lower.includes('prep')) {
    return botResponses.interview;
  }
  return botResponses.default;
}

export function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setIsTyping(true);
      setTimeout(() => {
        setMessages([{
          id: '1',
          type: 'bot',
          content: botResponses.greeting,
          timestamp: new Date(),
        }]);
        setIsTyping(false);
      }, 600);
    }
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen, messages.length]);

  const sendMessage = useCallback((content: string) => {
    if (!content.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: content.trim(),
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    setTimeout(() => {
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        content: getBotResponse(content),
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 800 + Math.random() * 400);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(inputValue);
  };

  return (
    <>
      {/* Floating Action Button */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-4">
        {/* Tooltip */}
        <div className={cn(
          "transition-all duration-300 transform",
          !isOpen ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4 pointer-events-none"
        )}>
          <div className="bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-sm font-medium px-4 py-2 rounded-2xl shadow-xl flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            Need help? Chat with us!
          </div>
        </div>

        {/* Main Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={cn(
            "group relative w-16 h-16 rounded-2xl shadow-2xl transition-all duration-500 overflow-hidden",
            "bg-gradient-to-br from-violet-600 via-purple-600 to-indigo-600",
            "hover:shadow-violet-500/50 hover:scale-105 active:scale-95",
            isOpen && "rounded-full w-14 h-14"
          )}
          aria-label={isOpen ? 'Close chat' : 'Open chat'}
        >
          {/* Animated background */}
          <div className="absolute inset-0 bg-gradient-to-br from-violet-400 via-purple-500 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          
          {/* Shine effect */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
            <div className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          </div>

          {/* Icon */}
          <div className="relative z-10 flex items-center justify-center h-full">
            <div className={cn(
              "transition-all duration-500",
              isOpen ? "rotate-0 scale-100" : "rotate-0 scale-100"
            )}>
              {isOpen ? (
                <XIcon className="w-6 h-6 text-white" />
              ) : (
                <ChatBubbleIcon className="w-7 h-7 text-white" />
              )}
            </div>
          </div>

          {/* Pulse rings */}
          {!isOpen && (
            <>
              <span className="absolute inset-0 rounded-2xl animate-ping bg-violet-500 opacity-20" style={{ animationDuration: '2s' }} />
              <span className="absolute inset-[-4px] rounded-2xl animate-pulse bg-gradient-to-br from-violet-500/20 to-purple-500/20" style={{ animationDuration: '3s' }} />
            </>
          )}
        </button>
      </div>

      {/* Chat Window */}
      <div
        className={cn(
          "fixed z-50 transition-all duration-500 ease-out",
          // Mobile: full screen with padding
          "bottom-0 right-0 left-0 top-0 sm:bottom-28 sm:right-6 sm:left-auto sm:top-auto",
          "sm:w-[400px] sm:max-w-[calc(100vw-48px)]",
          isOpen
            ? "opacity-100 translate-y-0 scale-100 pointer-events-auto"
            : "opacity-0 translate-y-4 scale-95 pointer-events-none sm:translate-y-8"
        )}
      >
        <div className={cn(
          "h-full sm:h-[600px] sm:max-h-[calc(100vh-160px)] flex flex-col",
          "bg-white dark:bg-slate-900",
          "sm:rounded-3xl overflow-hidden",
          "shadow-2xl shadow-slate-900/20 dark:shadow-black/40",
          "border-0 sm:border border-slate-200/80 dark:border-slate-700/80"
        )}>
          {/* Header */}
          <div className="relative overflow-hidden">
            {/* Gradient Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-violet-600 via-purple-600 to-indigo-700" />
            <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2220%22%20height%3D%2220%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath%20d%3D%22M0%200h20v20H0z%22%20fill%3D%22%23fff%22%20fill-opacity%3D%22.03%22%2F%3E%3C%2Fsvg%3E')] opacity-50" />
            
            {/* Floating orbs */}
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
            <div className="absolute -bottom-8 -left-8 w-24 h-24 bg-indigo-400/20 rounded-full blur-xl" />

            <div className="relative p-5 flex items-center gap-4">
              {/* Avatar */}
              <div className="relative">
                <div className="w-14 h-14 rounded-2xl bg-white/15 backdrop-blur-sm flex items-center justify-center border border-white/20 shadow-lg">
                  <div className="text-3xl">🤖</div>
                </div>
                <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-emerald-400 rounded-full border-[3px] border-purple-600 flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                </div>
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <h3 className="text-white font-bold text-lg tracking-tight">ArianBot</h3>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="text-emerald-300 text-sm font-medium">Online</span>
                  <span className="text-white/40">•</span>
                  <span className="text-violet-200 text-sm">AI Career Assistant</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setIsMinimized(!isMinimized)}
                  className="p-2.5 rounded-xl hover:bg-white/10 transition-colors hidden sm:flex"
                  aria-label="Minimize"
                >
                  <MinusIcon className="w-5 h-5 text-white/80" />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2.5 rounded-xl hover:bg-white/10 transition-colors"
                  aria-label="Close chat"
                >
                  <XIcon className="w-5 h-5 text-white/80" />
                </button>
              </div>
            </div>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-800/50">
            <div className="p-4 space-y-4">
              {messages.map((message, index) => (
                <MessageBubble key={message.id} message={message} index={index} />
              ))}
              {isTyping && <TypingIndicator />}
              <div ref={messagesEndRef} />
            </div>
          </div>

          {/* Quick Actions */}
          {messages.length <= 1 && !isTyping && (
            <div className="px-4 py-3 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800">
              <p className="text-xs font-medium text-slate-400 dark:text-slate-500 mb-3 uppercase tracking-wider">Quick Actions</p>
              <div className="grid grid-cols-2 gap-2">
                {quickActions.map((action) => (
                  <button
                    key={action.label}
                    onClick={() => sendMessage(action.query)}
                    className="group relative flex items-center gap-3 p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-100 dark:border-slate-700/50 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg"
                  >
                    <div className={cn(
                      "w-10 h-10 rounded-xl bg-gradient-to-br flex items-center justify-center text-white shadow-lg transition-transform group-hover:scale-110",
                      action.gradient
                    )}>
                      {action.icon}
                    </div>
                    <span className="text-sm font-medium text-slate-700 dark:text-slate-200">{action.label}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input Area */}
          <div className="p-4 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800">
            <form onSubmit={handleSubmit} className="flex gap-3">
              <div className="flex-1 relative">
                <input
                  ref={inputRef}
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Ask me anything..."
                  className={cn(
                    "w-full px-5 py-3.5 rounded-2xl text-sm",
                    "bg-slate-100 dark:bg-slate-800",
                    "text-slate-900 dark:text-white",
                    "placeholder-slate-400 dark:placeholder-slate-500",
                    "border-2 border-transparent",
                    "focus:outline-none focus:border-violet-500/50 focus:bg-white dark:focus:bg-slate-800",
                    "transition-all duration-300"
                  )}
                />
              </div>
              <button
                type="submit"
                disabled={!inputValue.trim() || isTyping}
                className={cn(
                  "relative w-12 h-12 rounded-2xl transition-all duration-300 overflow-hidden",
                  "bg-gradient-to-br from-violet-600 to-purple-600",
                  "hover:from-violet-500 hover:to-purple-500",
                  "disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:from-violet-600 disabled:hover:to-purple-600",
                  "active:scale-90",
                  "shadow-lg shadow-violet-500/30 hover:shadow-violet-500/50",
                  "flex items-center justify-center"
                )}
              >
                <SendIcon className="w-5 h-5 text-white" />
              </button>
            </form>
            <p className="text-center text-xs text-slate-400 dark:text-slate-500 mt-3">
              Powered by <span className="font-semibold text-violet-500">ArianTalent AI</span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}


function MessageBubble({ message, index }: { message: Message; index: number }) {
  const isBot = message.type === 'bot';

  return (
    <div
      className={cn(
        "flex gap-3 animate-fade-in",
        isBot ? "justify-start" : "justify-end"
      )}
      style={{ animationDelay: `${index * 50}ms` }}
    >
      {isBot && (
        <div className="flex-shrink-0">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center shadow-lg shadow-violet-500/25">
            <span className="text-base">🤖</span>
          </div>
        </div>
      )}
      <div
        className={cn(
          "max-w-[85%] px-4 py-3 text-sm leading-relaxed",
          isBot
            ? "bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 rounded-2xl rounded-tl-md shadow-sm border border-slate-100 dark:border-slate-700"
            : "bg-gradient-to-br from-violet-600 to-purple-600 text-white rounded-2xl rounded-tr-md shadow-lg shadow-violet-500/25"
        )}
      >
        <FormattedMessage content={message.content} isBot={isBot} />
      </div>
      {!isBot && (
        <div className="flex-shrink-0">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-slate-700 to-slate-800 flex items-center justify-center shadow-lg">
            <UserIcon className="w-4 h-4 text-white" />
          </div>
        </div>
      )}
    </div>
  );
}

function FormattedMessage({ content, isBot }: { content: string; isBot: boolean }) {
  const formatText = (text: string) => {
    return text.split('\n').map((line, i) => {
      // Bold text
      let formatted = line.replace(
        /\*\*(.*?)\*\*/g, 
        `<strong class="font-semibold ${isBot ? 'text-violet-600 dark:text-violet-400' : 'text-white'}">$1</strong>`
      );
      
      // Arrow bullets
      if (line.startsWith('**→**') || line.startsWith('→')) {
        const cleanLine = line.replace(/^\*\*→\*\*\s*/, '').replace(/^→\s*/, '');
        return (
          <div key={i} className="flex gap-2 my-1.5 items-start">
            <span className={cn("mt-0.5", isBot ? "text-violet-500" : "text-violet-200")}>→</span>
            <span dangerouslySetInnerHTML={{ __html: cleanLine.replace(/\*\*(.*?)\*\*/g, `<strong class="font-semibold ${isBot ? 'text-violet-600 dark:text-violet-400' : 'text-white'}">$1</strong>`) }} />
          </div>
        );
      }
      
      // Bullet points
      if (line.startsWith('• ') || line.startsWith('- ')) {
        return (
          <div key={i} className="flex gap-2 my-1.5 items-start">
            <span className={cn("mt-1 w-1.5 h-1.5 rounded-full flex-shrink-0", isBot ? "bg-violet-500" : "bg-violet-200")} />
            <span dangerouslySetInnerHTML={{ __html: formatted.slice(2) }} />
          </div>
        );
      }
      
      // Numbered lists
      const numberedMatch = line.match(/^\*\*(\d+)\.\*\*\s*/);
      if (numberedMatch) {
        return (
          <div key={i} className="flex gap-2 my-1.5 items-start">
            <span className={cn(
              "w-5 h-5 rounded-lg text-xs font-bold flex items-center justify-center flex-shrink-0",
              isBot ? "bg-violet-100 dark:bg-violet-900/50 text-violet-600 dark:text-violet-400" : "bg-white/20 text-white"
            )}>
              {numberedMatch[1]}
            </span>
            <span dangerouslySetInnerHTML={{ __html: formatted.slice(numberedMatch[0].length) }} />
          </div>
        );
      }
      
      return (
        <p key={i} className={line ? 'my-1' : 'my-2'} dangerouslySetInnerHTML={{ __html: formatted || '&nbsp;' }} />
      );
    });
  };

  return <div className="space-y-0.5">{formatText(content)}</div>;
}

function TypingIndicator() {
  return (
    <div className="flex gap-3 justify-start animate-fade-in">
      <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center shadow-lg shadow-violet-500/25">
        <span className="text-base">🤖</span>
      </div>
      <div className="bg-white dark:bg-slate-800 px-5 py-4 rounded-2xl rounded-tl-md shadow-sm border border-slate-100 dark:border-slate-700">
        <div className="flex gap-1.5 items-center">
          <div className="flex gap-1">
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className="w-2 h-2 bg-gradient-to-br from-violet-500 to-purple-500 rounded-full animate-bounce"
                style={{ animationDelay: `${i * 150}ms`, animationDuration: '0.8s' }}
              />
            ))}
          </div>
          <span className="text-xs text-slate-400 dark:text-slate-500 ml-2">Thinking...</span>
        </div>
      </div>
    </div>
  );
}

// Icons
function ChatBubbleIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
    </svg>
  );
}

function XIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
  );
}

function MinusIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12h-15" />
    </svg>
  );
}

function SendIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
    </svg>
  );
}

function UserIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
    </svg>
  );
}

function BriefcaseIcon() {
  return (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0M12 12.75h.008v.008H12v-.008z" />
    </svg>
  );
}

function ClipboardIcon() {
  return (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" />
    </svg>
  );
}

function DocumentIcon() {
  return (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
    </svg>
  );
}

function SparklesIcon() {
  return (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
    </svg>
  );
}

export default ChatBot;
