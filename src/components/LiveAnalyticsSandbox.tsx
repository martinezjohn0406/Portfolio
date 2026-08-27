import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  FileJson, 
  Check, 
  Copy, 
  Download, 
  Terminal, 
  Sparkles,
  TrendingUp,
  Layers,
  Cpu,
  Database,
  CheckCircle2,
  FileCode,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';
import { analyticsProjectsDataset } from '../data/analyticsDataset';
import { Project } from '../types';

interface LiveAnalyticsSandboxProps {
  onAskData?: (project: Project) => void;
}

export function LiveAnalyticsSandbox({ onAskData }: LiveAnalyticsSandboxProps = {}) {
  const [selectedProjectId, setSelectedProjectId] = useState<string>(analyticsProjectsDataset[0].id);
  const [viewMode, setViewMode] = useState<'case' | 'json'>('case');
  const [copiedJson, setCopiedJson] = useState<boolean>(false);

  const activeProject = analyticsProjectsDataset.find(p => p.id === selectedProjectId) || analyticsProjectsDataset[0];

  const formattedJsonData = {
    Title: activeProject.title,
    "Business Problem": activeProject.businessProblem,
    "Dataset Description": activeProject.datasetDescription,
    Methodology: activeProject.methodology,
    "Key Metrics Impacted": activeProject.keyMetricsImpacted,
    "Tools Used": activeProject.toolsUsed
  };

  const fullDatasetJson = analyticsProjectsDataset.map(project => ({
    Title: project.title,
    "Business Problem": project.businessProblem,
    "Dataset Description": project.datasetDescription,
    Methodology: project.methodology,
    "Key Metrics Impacted": project.keyMetricsImpacted,
    "Tools Used": project.toolsUsed
  }));

  const handleCopyJson = (dataToCopy: object) => {
    navigator.clipboard.writeText(JSON.stringify(dataToCopy, null, 2));
    setCopiedJson(true);
    setTimeout(() => setCopiedJson(false), 2000);
  };

  const handleDownloadJson = () => {
    const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(
      JSON.stringify(fullDatasetJson, null, 2)
    )}`;
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', jsonString);
    downloadAnchor.setAttribute('download', 'analytics_projects_dataset.json');
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <section id="sandbox" className="py-20 md:py-28 bg-[#F4F1EB] dark:bg-[#141311] border-t border-stone-300/80 dark:border-white/20 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Apple-Style Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-mono tracking-wider bg-stone-200/60 dark:bg-white/5 text-[#8E795E] dark:text-[#D4B892] border border-stone-300/60 dark:border-white/20 mb-4 font-semibold">
            <Database className="w-3.5 h-3.5" />
            <span>Structured Analytics Case Studies</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl italic text-stone-900 dark:text-[#E2E4E9] tracking-tight">
            Analytics Project Case Studies & Data<span className="text-[#8E795E] dark:text-[#D4B892]">.</span>
          </h2>
          <p className="text-sm sm:text-base text-stone-600 dark:text-white/60 mt-3 font-light leading-relaxed">
            Curated enterprise analytics case studies detailing verified business problem statements, data architecture, execution methodologies, and measured KPI outcomes.
          </p>

          {/* Centered Large Apple-Style Ask the Data Button */}
          {onAskData && (
            <div className="mt-7 flex justify-center">
              <button
                id="sandbox-ask-data-btn"
                type="button"
                onClick={() => {
                  onAskData({
                    id: activeProject.id,
                    title: activeProject.title,
                    domain: 'Data Analysis',
                    tagline: activeProject.datasetDescription,
                    summary: activeProject.businessProblem,
                    businessContext: activeProject.businessProblem,
                    chartType: 'bar',
                    impactMetric: activeProject.keyMetricsImpacted[0] ? activeProject.keyMetricsImpacted[0].split(' ')[0] : 'High Impact',
                    impactLabel: activeProject.keyMetricsImpacted[0] || 'Verified Business Outcome',
                    technologies: activeProject.toolsUsed,
                    completionDate: '2024',
                    featured: true,
                    businessProblem: activeProject.businessProblem,
                    solutionOverview: activeProject.methodology,
                    keyFindings: activeProject.keyMetricsImpacted,
                    methodology: [
                      {
                        step: '01',
                        title: 'Methodological Framework',
                        description: activeProject.methodology,
                        toolsUsed: activeProject.toolsUsed
                      }
                    ],
                    interactiveData: [],
                    modelMetrics: activeProject.keyMetricsImpacted.map((metricStr, idx) => ({
                      metric: `KPI 0${idx + 1}`,
                      value: metricStr,
                      benchmark: 'Verified Result',
                      status: 'optimal' as const
                    }))
                  });
                }}
                className="relative group px-8 py-3.5 sm:px-10 sm:py-4 rounded-full text-sm sm:text-base font-semibold tracking-wide text-white bg-gradient-to-r from-indigo-500 via-purple-500 to-amber-500 hover:from-indigo-600 hover:via-purple-600 hover:to-amber-600 shadow-none shadow-indigo-500/25 dark:shadow-purple-500/20 hover:shadow-none hover:shadow-indigo-500/35 active:scale-[0.98] transition-all duration-300 cursor-pointer"
              >
                <span>Ask the Data</span>
              </button>
            </div>
          )}
        </div>

        {/* Apple-Style Segmented Navigation Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8 bg-white dark:bg-[#1C1A17] p-2 sm:p-2.5 rounded-sm border border-stone-300/80 dark:border-white/20 shadow-xs">
          
          {/* Segmented Case Selector */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto p-1 bg-stone-100 dark:bg-white/5 rounded-sm border border-stone-300/60 dark:border-white/5 scrollbar-none">
            {analyticsProjectsDataset.map((proj, idx) => {
              const isSelected = proj.id === selectedProjectId;
              return (
                <button
                  key={proj.id}
                  id={`dataset-proj-tab-${idx + 1}`}
                  type="button"
                  onClick={() => setSelectedProjectId(proj.id)}
                  className={`relative px-3.5 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-all duration-200 cursor-pointer flex items-center gap-2 ${
                    isSelected
                      ? 'text-[#141311] dark:text-[#141311] font-bold shadow-xs'
                      : 'text-stone-600 dark:text-white/60 hover:text-stone-900 dark:hover:text-white'
                  }`}
                >
                  {isSelected && (
                    <motion.div
                      layoutId="activeSandboxTab"
                      className="absolute inset-0 bg-[#D4B892] rounded-lg"
                      transition={{ type: 'spring', stiffness: 450, damping: 35 }}
                    />
                  )}
                  <span className={`relative z-10 w-4 h-4 rounded-full flex items-center justify-center font-mono text-[10px] ${
                    isSelected ? 'bg-black/20 text-[#141311]' : 'bg-stone-200 dark:bg-white/10 text-stone-600 dark:text-white/60'
                  }`}>
                    {idx + 1}
                  </span>
                  <span className="relative z-10 truncate max-w-[140px] sm:max-w-[190px]">
                    {proj.title}
                  </span>
                </button>
              );
            })}
          </div>

          {/* View Mode Toggle & Action Controls */}
          <div className="flex items-center gap-2 w-full md:w-auto justify-end">
            <div className="flex items-center p-1 bg-stone-100 dark:bg-white/5 rounded-sm border border-stone-300/60 dark:border-white/5">
              <button
                id="view-mode-case-btn"
                type="button"
                onClick={() => setViewMode('case')}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                  viewMode === 'case'
                    ? 'bg-white dark:bg-[#23201D] text-stone-900 dark:text-[#D4B892] font-semibold shadow-2xs'
                    : 'text-stone-600 dark:text-white/60 hover:text-stone-900 dark:hover:text-white'
                }`}
              >
                Case Overview
              </button>
              <button
                id="view-mode-json-btn"
                type="button"
                onClick={() => setViewMode('json')}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                  viewMode === 'json'
                    ? 'bg-white dark:bg-[#23201D] text-stone-900 dark:text-[#D4B892] font-semibold shadow-2xs'
                    : 'text-stone-600 dark:text-white/60 hover:text-stone-900 dark:hover:text-white'
                }`}
              >
                Structured JSON
              </button>
            </div>

            <button
              id="dataset-download-json-btn"
              type="button"
              onClick={handleDownloadJson}
              className="p-2 rounded-sm text-stone-600 dark:text-white/70 hover:text-stone-900 dark:hover:text-white bg-stone-100 dark:bg-white/5 hover:bg-stone-200 dark:hover:bg-white/10 border border-stone-300/60 dark:border-white/20 transition-colors cursor-pointer"
              title="Download Full Dataset (.json)"
            >
              <Download className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Main Bento Content Area */}
        <AnimatePresence mode="wait">
          {viewMode === 'json' ? (
            /* CLEAN JSON INSPECTOR VIEW */
            <motion.div
              key="json-view"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="bg-white dark:bg-[#1C1A17] rounded-sm border border-stone-300/80 dark:border-white/20 shadow-xs overflow-hidden"
            >
              <div className="px-6 py-4 bg-stone-50/70 dark:bg-[#15181E] border-b border-stone-300/80 dark:border-white/20 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <FileCode className="w-4 h-4 text-[#8E795E] dark:text-[#D4B892]" />
                  <span className="font-mono text-xs text-stone-700 dark:text-[#E2E4E9] font-medium">
                    dataset_record.json
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => handleCopyJson(formattedJsonData)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono bg-white dark:bg-white/5 hover:bg-stone-100 dark:hover:bg-white/10 text-stone-700 dark:text-white/80 border border-stone-300 dark:border-white/20 transition-colors cursor-pointer"
                >
                  {copiedJson ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                      <span>Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy JSON</span>
                    </>
                  )}
                </button>
              </div>

              <div className="p-6 overflow-x-auto bg-[#171513] text-stone-200 font-mono text-xs leading-relaxed max-h-[500px]">
                <pre className="text-emerald-400">
                  <code>{JSON.stringify(formattedJsonData, null, 2)}</code>
                </pre>
              </div>
            </motion.div>
          ) : (
            /* APPLE-STYLE BENTO CASE OVERVIEW */
            <motion.div
              key="case-view"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="space-y-5"
            >
              {/* Primary Case Banner */}
              <div className="bg-white dark:bg-[#1C1A17] p-6 sm:p-8 rounded-sm border border-stone-300/80 dark:border-white/20 shadow-xs relative overflow-hidden">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono uppercase tracking-widest text-[#8E795E] dark:text-[#D4B892] font-bold">
                        Case Study Artifact
                      </span>
                      <span className="text-xs text-stone-300 dark:text-white/20">·</span>
                      <span className="text-xs font-mono text-stone-500 dark:text-white/40">
                        {activeProject.toolsUsed.length} Analytical Tools Deployed
                      </span>
                    </div>
                    <h3 className="font-serif text-2xl sm:text-3xl italic text-stone-900 dark:text-[#E2E4E9]">
                      {activeProject.title}
                    </h3>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleCopyJson(formattedJsonData)}
                    className="self-start md:self-auto inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-mono bg-stone-100 dark:bg-white/5 hover:bg-stone-200 dark:hover:bg-white/10 text-stone-700 dark:text-white/80 border border-stone-300 dark:border-white/20 transition-colors cursor-pointer"
                  >
                    {copiedJson ? <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedJson ? 'Copied' : 'Copy Case Data'}</span>
                  </button>
                </div>

                {/* 2-Column Bento: Problem & Dataset */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                  
                  {/* Card: Business Problem Statement */}
                  <div className="p-5 rounded-sm bg-stone-50 dark:bg-[#161921] border border-stone-300/60 dark:border-white/5 space-y-2.5">
                    <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-stone-800 dark:text-white/90 font-semibold">
                      <span className="w-2 h-2 rounded-full bg-[#D4B892]"></span>
                      <span>Problem Statement</span>
                    </div>
                    <p className="text-xs sm:text-sm text-stone-600 dark:text-white/70 leading-relaxed font-light">
                      {activeProject.businessProblem}
                    </p>
                  </div>

                  {/* Card: Dataset & Scope */}
                  <div className="p-5 rounded-sm bg-stone-50 dark:bg-[#161921] border border-stone-300/60 dark:border-white/5 space-y-2.5">
                    <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-stone-800 dark:text-white/90 font-semibold">
                      <span className="w-2 h-2 rounded-full bg-stone-400 dark:bg-stone-500"></span>
                      <span>Dataset Architecture & Scope</span>
                    </div>
                    <p className="text-xs sm:text-sm text-stone-600 dark:text-white/70 leading-relaxed font-light">
                      {activeProject.datasetDescription}
                    </p>
                  </div>

                </div>

                {/* Methodology Full Width Card */}
                <div className="p-5 rounded-sm bg-stone-50 dark:bg-[#161921] border border-stone-300/60 dark:border-white/5 space-y-2.5 mt-4">
                  <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-stone-800 dark:text-white/90 font-semibold">
                    <Layers className="w-3.5 h-3.5 text-[#8E795E] dark:text-[#D4B892]" />
                    <span>Analytical Methodology</span>
                  </div>
                  <p className="text-xs sm:text-sm text-stone-600 dark:text-white/70 leading-relaxed font-light">
                    {activeProject.methodology}
                  </p>
                </div>

                {/* 2-Column Bento: Impact Outcomes & Tools Used */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 mt-4">
                  
                  {/* Key Metrics Impacted (7 cols) */}
                  <div className="md:col-span-7 p-5 rounded-sm bg-stone-50 dark:bg-[#161921] border border-stone-300/60 dark:border-white/5 space-y-3">
                    <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-emerald-700 dark:text-emerald-400 font-semibold">
                      <TrendingUp className="w-3.5 h-3.5" />
                      <span>Measured Impact & Business Outcomes</span>
                    </div>
                    <div className="space-y-2">
                      {activeProject.keyMetricsImpacted.map((metric, mIdx) => (
                        <div key={mIdx} className="flex items-start gap-2 text-xs sm:text-sm text-stone-700 dark:text-white/80">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                          <span className="font-light">{metric}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Tools Used (5 cols) */}
                  <div className="md:col-span-5 p-5 rounded-sm bg-stone-50 dark:bg-[#161921] border border-stone-300/60 dark:border-white/5 space-y-3 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-stone-800 dark:text-white/90 font-semibold mb-3">
                        <Cpu className="w-3.5 h-3.5 text-[#8E795E] dark:text-[#D4B892]" />
                        <span>Tools & Technologies</span>
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {activeProject.toolsUsed.map((tool) => (
                          <span
                            key={tool}
                            className="px-2.5 py-1 rounded-md text-[11px] font-mono bg-white dark:bg-white/5 text-stone-700 dark:text-white/80 border border-stone-300/80 dark:border-white/20"
                          >
                            {tool}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="pt-3 border-t border-stone-300/60 dark:border-white/5 flex items-center justify-between text-[11px] font-mono text-stone-500 dark:text-white/40">
                      <span className="flex items-center gap-1">
                        <ShieldCheck className="w-3 h-3 text-emerald-600" />
                        <span>Methodology Verified</span>
                      </span>
                    </div>
                  </div>

                </div>

              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
