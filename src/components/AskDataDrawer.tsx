import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  Sparkles, 
  Send, 
  Bot, 
  User, 
  Copy, 
  Check, 
  TrendingUp, 
  Layers, 
  Cpu, 
  Database, 
  HelpCircle,
  RefreshCw,
  CornerDownLeft,
  ArrowRight
} from 'lucide-react';
import Markdown from 'react-markdown';
import { Project } from '../types';

interface AskDataDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  project: Project | null;
}

interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  modelUsed?: string;
  suggestedFollowUps?: string[];
}

export function AskDataDrawer({ isOpen, onClose, project }: AskDataDrawerProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputQuery, setInputQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Initialize or reset chat when project changes
  useEffect(() => {
    if (isOpen && project) {
      setMessages([
        {
          id: 'welcome',
          sender: 'assistant',
          text: `👋 **Hello! I am John's AI Analytics Assistant.**\n\nI have loaded all data artifacts, methodologies, formulas, and performance metrics for **"${project.title}"**.\n\nYou can ask any question about how John engineered this solution, the quantifiable results, formulas, or architecture.`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          modelUsed: 'AI Analytics Engine',
          suggestedFollowUps: [
            "What was the business problem and measurable impact?",
            "What formulas or algorithms were used?",
            "How does this demonstrate John's analytical rigor?"
          ]
        }
      ]);
      setTimeout(() => {
        inputRef.current?.focus();
      }, 300);
    }
  }, [isOpen, project?.id]);

  // Scroll to bottom on message update
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  // Handle ESC key to close drawer
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const handleSendMessage = async (queryText?: string) => {
    const textToSend = queryText || inputQuery;
    if (!textToSend.trim() || !project || isLoading) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: textToSend.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputQuery('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/ask-data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          projectTitle: project.title,
          domain: project.domain,
          question: textToSend.trim(),
          businessProblem: project.businessProblem,
          solutionOverview: project.solutionOverview,
          keyFindings: project.keyFindings,
          methodology: project.methodology,
          technologies: project.technologies,
          modelMetrics: project.modelMetrics,
          datasetDescription: project.tagline,
          sampleData: project.interactiveData
        }),
      });

      if (!response.ok) {
        throw new Error(`Server returned status ${response.status}`);
      }

      const data = await response.json();

      const assistantMsg: ChatMessage = {
        id: `assistant-${Date.now()}`,
        sender: 'assistant',
        text: data.answer || "No response received from the analytics engine.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        modelUsed: data.modelUsed || 'AI Analytics Engine',
        suggestedFollowUps: data.suggestedFollowUps || []
      };

      setMessages(prev => [...prev, assistantMsg]);
    } catch (err: any) {
      console.error("Failed to query analytics engine backend:", err);
      const errorMsg: ChatMessage = {
        id: `err-${Date.now()}`,
        sender: 'assistant',
        text: `**Executive Summary for ${project.title}:**\n\n• **Core Impact:** ${project.impactMetric} (${project.impactLabel})\n• **Solution Summary:** ${project.summary}\n• **Tech Stack:** ${project.technologies.join(', ')}\n\n*(Note: Ensure your API Key is configured in settings for dynamic multi-turn Q&A).*`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        modelUsed: 'local-analytics-cache',
        suggestedFollowUps: [
          "What formulas and logic were implemented?",
          "How did this solve the business bottleneck?"
        ]
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopyMessage = (text: string, idx: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(idx);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  if (!isOpen || !project) return null;

  return (
    <AnimatePresence>
      {/* Outer Click-to-Dismiss Overlay with Apple Glass subtle blur */}
      <div 
        onClick={onClose}
        className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-3 sm:p-5 bg-black/30 dark:bg-black/45 backdrop-blur-[3px] transition-all"
      >
        {/* Centered Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 8 }}
          transition={{ type: 'spring', damping: 28, stiffness: 360 }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-lg max-h-[82vh] bg-white/95 dark:bg-[#1C1A17]/95 backdrop-blur-xl rounded-sm sm:rounded-sm border border-stone-300/90 dark:border-white/20 shadow-none shadow-black/25 flex flex-col overflow-hidden font-sans z-10"
        >
          {/* Subtle Ambient Apple Glow Line */}
          <div className="h-0.5 w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-amber-500 opacity-90" />

          {/* Modal Header */}
          <div className="px-5 py-3.5 bg-stone-50/80 dark:bg-[#16181F]/80 border-b border-stone-300/70 dark:border-white/20 shrink-0">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2.5 min-w-0">
                {/* Glowing Apple Intelligence Style Badge */}
                <div className="w-8 h-8 rounded-sm bg-gradient-to-tr from-indigo-500 via-purple-500 to-amber-400 p-[1.5px] shadow-xs shrink-0">
                  <div className="w-full h-full bg-white dark:bg-[#1C1A17] rounded-[10px] flex items-center justify-center">
                    <Sparkles className="w-3.5 h-3.5 text-purple-600 dark:text-purple-300" />
                  </div>
                </div>

                <div className="min-w-0">
                  <h3 className="font-semibold text-sm sm:text-base text-stone-900 dark:text-[#F5F5F7] tracking-tight truncate">
                    {project.title}
                  </h3>
                  <p className="text-[11px] text-stone-500 dark:text-white/50 tracking-normal truncate">
                    Ask any question about this project, methodology, or metrics.
                  </p>
                </div>
              </div>

              {/* Apple-Style Round Close Button */}
              <button
                id="close-ask-data-drawer"
                type="button"
                onClick={onClose}
                className="w-7 h-7 rounded-full flex items-center justify-center text-stone-500 dark:text-white/60 bg-stone-200/70 dark:bg-white/10 hover:bg-stone-300 dark:hover:bg-white/20 hover:text-stone-900 dark:hover:text-white transition-all cursor-pointer shrink-0"
                title="Close (Esc or click outside)"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Chat Messages Body */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-3.5 scrollbar-thin">
            {messages.map((msg, idx) => {
              const isUser = msg.sender === 'user';

              return (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.18 }}
                  className={`flex gap-2.5 ${isUser ? 'justify-end' : 'justify-start'}`}
                >
                  {!isUser && (
                    <div className="w-6 h-6 rounded-lg bg-gradient-to-tr from-indigo-500 via-purple-500 to-amber-400 flex items-center justify-center text-white shadow-xs shrink-0 mt-0.5">
                      <Sparkles className="w-3 h-3 text-white" />
                    </div>
                  )}

                  <div className={`max-w-[88%] sm:max-w-[85%] space-y-1.5`}>
                    <div
                      className={`p-3.5 rounded-sm text-xs sm:text-[13px] leading-relaxed tracking-normal ${
                        isUser
                          ? 'bg-gradient-to-r from-indigo-600 via-purple-600 to-amber-600 text-white font-medium rounded-tr-xs shadow-xs'
                          : 'bg-stone-100/90 dark:bg-[#181A22] text-stone-800 dark:text-[#E2E4E9] border border-stone-300/80 dark:border-white/20 rounded-tl-xs shadow-xs'
                      }`}
                    >
                      {isUser ? (
                        <p className="whitespace-pre-wrap">{msg.text}</p>
                      ) : (
                        <div className="prose prose-sm dark:prose-invert max-w-none space-y-2">
                          <Markdown>{msg.text}</Markdown>
                        </div>
                      )}
                    </div>

                    {/* Assistant Meta: Timestamp & Copy Action */}
                    {!isUser && (
                      <div className="flex items-center justify-between gap-2 px-1 text-[10px] font-mono text-stone-400 dark:text-white/40">
                        <div className="flex items-center gap-1.5">
                          <span>{msg.timestamp}</span>
                          {msg.modelUsed && (
                            <span className="bg-stone-200/60 dark:bg-white/5 px-1.5 py-0.2 rounded border border-stone-300/60 dark:border-white/20 text-stone-600 dark:text-white/60">
                              {msg.modelUsed}
                            </span>
                          )}
                        </div>
                        <button
                          type="button"
                          onClick={() => handleCopyMessage(msg.text, idx)}
                          className="inline-flex items-center gap-1 hover:text-stone-700 dark:hover:text-white transition-colors cursor-pointer"
                        >
                          {copiedIndex === idx ? (
                            <>
                              <Check className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                              <span>Copied</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3 h-3" />
                              <span>Copy</span>
                            </>
                          )}
                        </button>
                      </div>
                    )}

                    {/* Suggested Follow-Ups */}
                    {!isUser && msg.suggestedFollowUps && msg.suggestedFollowUps.length > 0 && (
                      <div className="pt-1.5 space-y-1.5">
                        <span className="text-[10px] font-mono uppercase tracking-wider text-stone-400 dark:text-white/40 flex items-center gap-1 font-semibold">
                          <HelpCircle className="w-3 h-3 text-[#8E795E] dark:text-[#D4B892]" />
                          <span>Suggested Inquiries</span>
                        </span>
                        <div className="flex flex-col gap-1">
                          {msg.suggestedFollowUps.map((prompt, pIdx) => (
                            <button
                              key={pIdx}
                              type="button"
                              onClick={() => handleSendMessage(prompt)}
                              disabled={isLoading}
                              className="text-left text-xs px-3 py-1.5 rounded-sm bg-white dark:bg-white/5 hover:bg-stone-100 dark:hover:bg-white/10 text-stone-700 dark:text-white/80 border border-stone-300/80 dark:border-white/20 transition-colors flex items-center justify-between group cursor-pointer"
                            >
                              <span className="truncate pr-2">{prompt}</span>
                              <ArrowRight className="w-3 h-3 text-[#8E795E] dark:text-[#D4B892] opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {isUser && (
                    <div className="w-6 h-6 rounded-lg bg-stone-800 dark:bg-white/15 flex items-center justify-center text-white shrink-0 mt-0.5">
                      <User className="w-3 h-3" />
                    </div>
                  )}
                </motion.div>
              );
            })}

            {/* Loading Indicator */}
            {isLoading && (
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex gap-2.5 justify-start"
              >
                <div className="w-6 h-6 rounded-lg bg-gradient-to-tr from-indigo-500 via-purple-500 to-amber-400 flex items-center justify-center text-white shadow-xs shrink-0">
                  <Sparkles className="w-3 h-3 animate-spin" />
                </div>
                <div className="p-3.5 rounded-sm bg-stone-100/90 dark:bg-[#181A22] border border-stone-300/80 dark:border-white/20 rounded-tl-xs space-y-2">
                  <div className="flex items-center gap-2 text-xs font-mono text-[#8E795E] dark:text-[#D4B892]">
                    <RefreshCw className="w-3 h-3 animate-spin" />
                    <span>Synthesizing project data & metrics...</span>
                  </div>
                  <div className="h-1.5 w-40 bg-stone-200 dark:bg-white/10 rounded-full animate-pulse" />
                  <div className="h-1.5 w-28 bg-stone-200 dark:bg-white/10 rounded-full animate-pulse" />
                </div>
              </motion.div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input & Form Control Footer */}
          <div className="p-3.5 bg-stone-50/90 dark:bg-[#16181F]/90 border-t border-stone-300/70 dark:border-white/20 shrink-0 space-y-1.5">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="flex items-center gap-2"
            >
              <input
                ref={inputRef}
                type="text"
                value={inputQuery}
                onChange={(e) => setInputQuery(e.target.value)}
                placeholder="Ask any question about this project..."
                disabled={isLoading}
                className="flex-1 px-3.5 py-2 rounded-sm text-xs sm:text-sm bg-white dark:bg-[#171513] text-stone-900 dark:text-[#E2E4E9] placeholder-stone-400 dark:placeholder-white/30 border border-stone-300 dark:border-white/20 focus:outline-none focus:border-purple-500 dark:focus:border-purple-400 focus:ring-1 focus:ring-purple-500/20 shadow-xs"
              />

              <button
                id="send-ask-data-query"
                type="submit"
                disabled={!inputQuery.trim() || isLoading}
                className={`p-2.5 rounded-sm font-bold transition-all cursor-pointer flex items-center justify-center ${
                  inputQuery.trim() && !isLoading
                    ? 'bg-gradient-to-r from-indigo-500 via-purple-500 to-amber-500 hover:opacity-95 text-white shadow-none shadow-indigo-500/20'
                    : 'bg-stone-200 dark:bg-white/5 text-stone-400 dark:text-white/30 cursor-not-allowed'
                }`}
                title="Send Question (Enter)"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>

            <div className="flex items-center justify-between text-[10px] font-mono text-stone-400 dark:text-white/40 px-1">
              <span>Ask any question</span>
              <span className="flex items-center gap-1">
                <span>Press</span>
                <kbd className="px-1 py-0.2 bg-stone-200/80 dark:bg-white/10 rounded border border-stone-300/80 dark:border-white/20 text-[9px]">
                  ↵ Enter
                </kbd>
                <span>to submit</span>
              </span>
            </div>
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
}
