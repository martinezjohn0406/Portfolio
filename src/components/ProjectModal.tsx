import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  ExternalLink, 
  Github, 
  CheckCircle2, 
  Terminal, 
  Database, 
  BarChart2, 
  Copy, 
  Check, 
  Play, 
  Sliders, 
  Layers, 
  FileCode, 
  TrendingUp, 
  ShieldCheck,
  Zap,
  ArrowRight
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  ComposedChart, 
  LineChart, 
  BarChart, 
  AreaChart, 
  Line, 
  Bar, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend 
} from 'recharts';
import { Project } from '../types';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
  onAskData?: (project: Project) => void;
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'interactive' | 'code' | 'pipeline'>('overview');
  const [copiedCode, setCopiedCode] = useState(false);
  const [interactiveSliderVal, setInteractiveSliderVal] = useState(25);
  const [sqlExecuted, setSqlExecuted] = useState(false);
  const [isExecutingSql, setIsExecutingSql] = useState(false);

  if (!project) return null;

  const handleCopyCode = () => {
    if (project.codeSnippet) {
      navigator.clipboard.writeText(project.codeSnippet.code);
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 2000);
    }
  };

  const handleRunSql = () => {
    setIsExecutingSql(true);
    setTimeout(() => {
      setIsExecutingSql(false);
      setSqlExecuted(true);
    }, 450);
  };

  // Adjust interactive chart data dynamically if user tweaks the slider
  const dynamicChartData = project.interactiveData.map((item, idx) => {
    const factor = (interactiveSliderVal - 25) / 100;
    return {
      ...item,
      predicted: item.predicted ? Math.max(0, Number((item.predicted * (1 + factor * (idx + 1) * 0.1)).toFixed(1))) : undefined,
      actual: item.actual ? Math.max(0, Number((item.actual * (1 + factor * 0.05)).toFixed(1))) : undefined,
    };
  });

  return (
    <AnimatePresence>
      <div 
        id="project-modal-backdrop"
        className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md overflow-y-auto"
        onClick={(e) => {
          if (e.target === e.currentTarget) onClose();
        }}
      >
        <motion.div
          id="project-modal-dialog"
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="bg-white dark:bg-[#171513] border border-stone-300 dark:border-white/20 rounded-sm sm:rounded-sm shadow-none max-w-4xl w-full max-h-[92vh] flex flex-col overflow-hidden my-auto text-stone-800 dark:text-[#E2E4E9]"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Modal Header */}
          <div className="shrink-0 px-6 py-5 border-b border-stone-300 dark:border-white/20 flex items-start justify-between gap-4 bg-stone-50 dark:bg-[#15181E] relative overflow-hidden">

            <div className="relative z-10 flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className="px-2.5 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider bg-[#D4B892]/15 text-[#8E795E] dark:text-[#D4B892] border border-[#D4B892]/30 font-bold">
                  {project.domain}
                </span>
                <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-stone-200/70 dark:bg-white/5 text-stone-700 dark:text-white/80 border border-stone-300 dark:border-white/20">
                  Impact: <strong className="text-[#8E795E] dark:text-[#D4B892]">{project.impactMetric}</strong> {project.impactLabel}
                </span>
                <span className="text-xs text-stone-500 dark:text-white/40 font-mono">
                  {project.completionDate}
                </span>
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl italic text-stone-900 dark:text-[#E2E4E9] tracking-tight">
                {project.title}
              </h2>
              <p className="text-xs sm:text-sm text-stone-600 dark:text-white/60 mt-1 font-light">
                {project.tagline}
              </p>
            </div>

            <div className="flex items-center gap-2 relative z-10">
              <button
                id="modal-close-button"
                type="button"
                onClick={onClose}
                className="p-2 rounded-full text-stone-500 dark:text-white/60 hover:text-stone-900 dark:hover:text-white bg-stone-200/60 dark:bg-white/5 hover:bg-stone-200 dark:hover:bg-white/10 border border-stone-300 dark:border-white/20 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Modal Tabs Navigation */}
          <div className="shrink-0 px-6 border-b border-stone-300 dark:border-white/20 bg-stone-50/80 dark:bg-[#171513] flex items-center gap-2 overflow-x-auto scrollbar-none">
            {[
              { id: 'overview', label: 'Executive Summary & Findings', icon: Layers },
              { id: 'code', label: 'Code & Methodology', icon: FileCode },
              { id: 'pipeline', label: 'Pipeline Architecture', icon: Zap },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  id={`modal-tab-${tab.id}`}
                  type="button"
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center gap-2 py-3 px-3.5 border-b-2 text-xs sm:text-sm font-medium whitespace-nowrap transition-colors cursor-pointer ${
                    isActive
                      ? 'border-[#D4B892] text-[#8E795E] dark:text-[#D4B892] font-semibold'
                      : 'border-transparent text-stone-500 dark:text-white/40 hover:text-stone-900 dark:hover:text-white'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Modal Scrollable Body */}
          <div className="p-6 overflow-y-auto flex-1 space-y-6 bg-white dark:bg-[#171513]">
            
            {/* TAB 1: OVERVIEW & IMPACT */}
            {activeTab === 'overview' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-6"
              >
                {/* Problem & Solution Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-5 rounded-sm bg-stone-50 dark:bg-[#15181E] border border-stone-300 dark:border-white/20">
                    <div className="text-[11px] font-mono text-rose-600 dark:text-rose-400 uppercase tracking-wider mb-1.5 flex items-center gap-1.5 font-bold">
                      <span className="w-2 h-2 rounded-full bg-rose-500"></span>
                      The Business Challenge
                    </div>
                    <p className="text-xs sm:text-sm text-stone-600 dark:text-white/70 leading-relaxed font-light">
                      {project.businessProblem}
                    </p>
                  </div>

                  <div className="p-5 rounded-sm bg-stone-50 dark:bg-[#15181E] border border-stone-300 dark:border-white/20">
                    <div className="text-[11px] font-mono text-[#8E795E] dark:text-[#D4B892] uppercase tracking-wider mb-1.5 flex items-center gap-1.5 font-bold">
                      <span className="w-2 h-2 rounded-full bg-[#D4B892]"></span>
                      Analytics Solution Delivered
                    </div>
                    <p className="text-xs sm:text-sm text-stone-600 dark:text-white/70 leading-relaxed font-light">
                      {project.solutionOverview}
                    </p>
                  </div>
                </div>

                {/* Key Findings List */}
                <div>
                  <h4 className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#8E795E] dark:text-[#D4B892] mb-3 font-semibold">
                    Key Data Discoveries & Business Outcomes
                  </h4>
                  <div className="space-y-2.5">
                    {project.keyFindings.map((finding, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-3 p-3.5 rounded-sm bg-stone-50 dark:bg-[#15181E] border border-stone-300 dark:border-white/20"
                      >
                        <CheckCircle2 className="w-4 h-4 text-[#8E795E] dark:text-[#D4B892] shrink-0 mt-0.5" />
                        <span className="text-xs sm:text-sm text-stone-700 dark:text-white/80 leading-relaxed font-light">
                          {finding}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tech Stack Pills */}
                <div>
                  <h4 className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#8E795E] dark:text-[#D4B892] mb-2.5 font-semibold">
                    Technologies & Libraries
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 rounded-full text-xs font-mono bg-stone-100 dark:bg-white/5 text-stone-700 dark:text-white/70 border border-stone-300 dark:border-white/20"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Performance Benchmarks (if available) */}
                {project.modelMetrics && project.modelMetrics.length > 0 && (
                  <div>
                    <h4 className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#8E795E] dark:text-[#D4B892] mb-2.5 font-semibold">
                      Model Validation & SLA Metrics
                    </h4>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      {project.modelMetrics.map((metric, idx) => (
                        <div
                          key={idx}
                          className="p-4 rounded-sm bg-stone-50 dark:bg-[#15181E] border border-stone-300 dark:border-white/20"
                        >
                          <div className="text-[10px] font-mono uppercase tracking-wider text-stone-500 dark:text-white/40">
                            {metric.metric}
                          </div>
                          <div className="text-lg font-bold text-stone-900 dark:text-[#E2E4E9] mt-0.5">
                            {metric.value}
                          </div>
                          <div className="text-[10px] text-[#8E795E] dark:text-[#D4B892] mt-0.5 font-mono font-semibold">
                            {metric.benchmark}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            )}

            {/* TAB 3: CODE & METHODOLOGY */}
            {activeTab === 'code' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-6"
              >
                {/* Code Snippet Box */}
                {project.codeSnippet && (
                  <div className="rounded-sm overflow-hidden border border-stone-300 dark:border-white/20 bg-stone-900 dark:bg-[#141311] text-white/90 shadow-none">
                    <div className="px-4 py-3 bg-stone-800/80 dark:bg-white/5 border-b border-stone-800 dark:border-white/20 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <FileCode className="w-4 h-4 text-[#D4B892]" />
                        <span className="text-xs font-mono text-white/90 font-semibold">
                          {project.codeSnippet.title}
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={handleCopyCode}
                        className="flex items-center gap-1 px-3 py-1 rounded-full text-xs font-mono bg-white/10 hover:bg-white/20 text-white/80 border border-white/10 transition-colors cursor-pointer"
                      >
                        {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>{copiedCode ? 'Copied' : 'Copy'}</span>
                      </button>
                    </div>
                    <pre className="p-4 text-xs font-mono leading-relaxed overflow-x-auto text-stone-200">
                      <code>{project.codeSnippet.code}</code>
                    </pre>
                  </div>
                )}

                {/* Step-by-Step Methodology */}
                <div>
                  <h4 className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#8E795E] dark:text-[#D4B892] mb-3 font-semibold">
                    Implementation Methodology
                  </h4>
                  <div className="space-y-3">
                    {project.methodology.map((m) => (
                      <div
                        key={m.step}
                        className="p-4 rounded-sm bg-stone-50 dark:bg-[#15181E] border border-stone-300 dark:border-white/20 flex flex-col sm:flex-row sm:items-start gap-3"
                      >
                        <div className="px-2.5 py-1 rounded-full bg-[#D4B892] text-[#141311] font-mono text-xs font-bold self-start">
                          {m.step}
                        </div>
                        <div className="space-y-1 flex-1">
                          <h5 className="font-serif text-sm italic text-stone-900 dark:text-[#E2E4E9]">
                            {m.title}
                          </h5>
                          <p className="text-xs text-stone-600 dark:text-white/60 font-light">
                            {m.description}
                          </p>
                          <div className="flex flex-wrap gap-1.5 pt-1">
                            {m.toolsUsed.map((t) => (
                              <span key={t} className="text-[10px] font-mono px-2 py-0.5 rounded bg-stone-200/70 dark:bg-white/5 text-stone-700 dark:text-white/60 border border-stone-300 dark:border-white/20">
                                {t}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {/* TAB 4: PIPELINE ARCHITECTURE */}
            {activeTab === 'pipeline' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-6"
              >
                <div className="p-5 rounded-sm bg-stone-50 dark:bg-[#15181E] border border-stone-300 dark:border-white/20">
                  <h4 className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#8E795E] dark:text-[#D4B892] mb-3 font-semibold">
                    End-to-End Data Pipeline Stages
                  </h4>

                  <div className="relative pl-6 space-y-6 before:absolute before:left-2.5 before:top-3 before:bottom-3 before:w-0.5 before:bg-stone-200 dark:before:bg-white/10">
                    {(project.pipelineFlow || [
                      { stage: 'Data Ingestion', tool: 'Excel / CSV / APIs', description: 'Structured intake & schema validation', duration: 'Instant' },
                      { stage: 'Data Cleaning & Modeling', tool: 'Formulas & Scripts', description: 'Normalization, lookup tables & error-checking', duration: '< 1 min' },
                      { stage: 'Reporting & Analysis', tool: 'Pivot & Summary Models', description: 'Automated executive aggregates', duration: 'Real-time' },
                      { stage: 'Presentation Layer', tool: 'Responsive Web UI / Dashboards', description: 'Stakeholder visuals & cross-device layouts', duration: 'Interactive' },
                    ]).map((pipe, idx) => (
                      <div key={idx} className="relative">
                        <div className="absolute -left-[27px] top-1 w-3.5 h-3.5 rounded-full bg-[#D4B892] ring-4 ring-stone-100 dark:ring-[#15181E]" />
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                          <span className="text-xs font-bold text-stone-900 dark:text-[#E2E4E9]">
                            {pipe.stage} <span className="text-[#8E795E] dark:text-[#D4B892] font-mono text-[11px]">({pipe.tool})</span>
                          </span>
                          <span className="text-[10px] font-mono text-stone-500 dark:text-white/40">
                            Latency: {pipe.duration}
                          </span>
                        </div>
                        <p className="text-xs text-stone-600 dark:text-white/60 mt-0.5 font-light">
                          {pipe.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

          </div>

          {/* Modal Footer CTA */}
          <div className="shrink-0 px-6 py-4 border-t border-stone-300 dark:border-white/20 bg-stone-50 dark:bg-[#15181E] flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-4">
              {project.dashboardDemoUrl && (
                <a
                  href={project.dashboardDemoUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-mono text-stone-700 dark:text-white/70 hover:text-[#8E795E] dark:hover:text-[#D4B892] transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>Live App / Preview</span>
                </a>
              )}
            </div>

            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-full text-xs font-mono text-stone-800 dark:text-white/80 bg-stone-200/80 hover:bg-stone-300 dark:bg-white/10 dark:hover:bg-white/20 border border-stone-300 dark:border-white/20 transition-colors cursor-pointer"
            >
              Close Viewer
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
