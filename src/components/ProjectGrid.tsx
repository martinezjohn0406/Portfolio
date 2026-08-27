import { motion } from 'motion/react';
import { 
  ArrowUpRight, 
  TrendingUp,
  Sparkles,
  ChevronRight
} from 'lucide-react';
import { projectsData } from '../data/projectsData';
import { Project } from '../types';

interface ProjectGridProps {
  onSelectProject: (project: Project) => void;
}

export function ProjectGrid({
  onSelectProject,
}: ProjectGridProps) {
  return (
    <section id="projects" className="py-16 md:py-24 bg-[#F4F1EB] dark:bg-[#141311] border-t border-stone-300/80 dark:border-white/20 transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-mono tracking-wider bg-stone-200/60 dark:bg-white/5 text-[#8E795E] dark:text-[#D4B892] border border-stone-300/60 dark:border-white/20 mb-3 font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Portfolios & Case Studies</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl italic text-stone-900 dark:text-[#E2E4E9] tracking-tight">
              <span className="text-stone-900 dark:text-[#E2E4E9]">Featured Work & Projects</span><span className="text-[#8E795E] dark:text-[#D4B892]">.</span>
            </h2>
          </div>
        </div>

        {/* Project Editorial List Layout */}
        <div className="space-y-6">
          {projectsData.map((project, index) => (
            <motion.div
              key={project.id}
              id={`project-card-${project.id}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "0px 0px -100px 0px" }}
              transition={{ duration: 0.3 }}
              onClick={() => onSelectProject(project)}
              className="group cursor-pointer bg-white dark:bg-[#1C1A17] rounded-sm border border-stone-300/80 dark:border-white/20 hover:border-[#D4B892]/50 dark:hover:border-[#D4B892]/40 shadow-none hover:shadow-none transition-all duration-300 overflow-hidden"
            >
              <div className="flex flex-col lg:flex-row">
                
                {/* Left Column: Title & Context */}
                <div className="lg:w-2/5 p-6 sm:p-8 lg:p-10 lg:border-r border-stone-100 dark:border-white/5 flex flex-col justify-between bg-stone-50/50 dark:bg-[#141311]/30">
                  <div>
                    <span className="inline-block mb-4 text-[10px] font-mono text-[#8E795E] dark:text-[#D4B892] uppercase tracking-[0.2em] font-semibold">
                      {project.domain}
                    </span>
                    <h3 className="font-serif text-2xl sm:text-3xl italic text-stone-900 dark:text-[#E2E4E9] group-hover:text-[#8E795E] dark:group-hover:text-[#D4B892] transition-colors leading-tight mb-3">
                      {project.title}
                    </h3>
                    <p className="text-sm text-stone-500 dark:text-white/50 font-light leading-relaxed">
                      {project.tagline}
                    </p>
                  </div>
                  
                  <div className="mt-8 flex items-center gap-2 text-xs font-mono font-medium text-stone-600 dark:text-white/60 group-hover:text-stone-900 dark:group-hover:text-white transition-colors">
                    <span className="bg-white dark:bg-white/5 px-3 py-1.5 rounded-sm border border-stone-300 dark:border-white/20 shadow-none group-hover:border-[#D4B892] dark:group-hover:border-[#D4B892]/50 transition-colors flex items-center gap-1.5 text-[#8E795E] dark:text-[#D4B892]">
                      View Data Transformations <ChevronRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>

                {/* Right Column: Details & Impact */}
                <div className="lg:w-3/5 p-6 sm:p-8 lg:p-10 flex flex-col justify-center">
                  
                  <div className="mb-6 inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-mono font-medium text-emerald-800 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200/60 dark:border-emerald-800/30">
                    <TrendingUp className="w-4 h-4" />
                    <span>Verified Impact: {project.impactMetric}</span>
                  </div>

                  <p className="text-sm sm:text-base text-stone-700 dark:text-white/80 leading-relaxed font-light mb-8 max-w-2xl">
                    {project.summary}
                  </p>

                  <div>
                    <span className="block text-[10px] font-mono text-stone-400 dark:text-white/40 uppercase tracking-widest mb-3">
                      Core Technologies
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-2.5 py-1 bg-stone-100 dark:bg-[#23201D] rounded-md text-[11px] font-mono border border-stone-300/80 dark:border-white/5 text-stone-700 dark:text-white/60"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
