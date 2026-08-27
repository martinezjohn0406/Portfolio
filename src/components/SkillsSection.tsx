import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Database, 
  BarChart3, 
  Terminal, 
  BrainCircuit, 
  Sparkles, 
  Layers,
  Search,
  Check
} from 'lucide-react';
import { skillsCategories } from '../data/profileData';

export function SkillsSection() {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [skillSearch, setSkillSearch] = useState('');

  const getIcon = (name: string) => {
    switch (name) {
      case 'Database': return Database;
      case 'BarChart3': return BarChart3;
      case 'Terminal': return Terminal;
      case 'BrainCircuit': return BrainCircuit;
      case 'Sparkles': return Sparkles;
      default: return Layers;
    }
  };

  const allSkillsList = useMemo(() => {
    const list: {
      index: number;
      name: string;
      level: number;
      yearsExp: string;
      highlight?: boolean;
      category: string;
      iconName: string;
    }[] = [];

    let count = 1;
    skillsCategories.forEach((cat) => {
      cat.skills.forEach((skill) => {
        list.push({
          index: count++,
          ...skill,
          category: cat.category,
          iconName: cat.iconName
        });
      });
    });
    return list;
  }, []);

  const filteredSkillsList = useMemo(() => {
    return allSkillsList.filter((item) => {
      const matchesCategory = activeCategory === 'All' || item.category === activeCategory;
      const q = skillSearch.toLowerCase().trim();
      const matchesSearch = !q || item.name.toLowerCase().includes(q) || item.category.toLowerCase().includes(q);
      return matchesCategory && matchesSearch;
    });
  }, [allSkillsList, activeCategory, skillSearch]);

  return (
    <section id="skills" className="py-12 sm:py-16 md:py-20 bg-[#F4F1EB] dark:bg-[#141311] border-t border-stone-300/80 dark:border-white/20 transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6 sm:mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-mono tracking-wider bg-stone-200/60 dark:bg-white/5 text-[#8E795E] dark:text-[#D4B892] border border-stone-300/60 dark:border-white/20 mb-2.5 font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Core Skills & Stack</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-4xl italic text-stone-900 dark:text-[#E2E4E9] tracking-tight">
              Technical Competencies<span className="text-[#8E795E] dark:text-[#D4B892]">.</span>
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 dark:text-white/60 mt-1 max-w-xl font-light">
              Certified spreadsheet modeling, SQL queries, algorithmic programming, and bilingual communication.
            </p>
          </div>

          {/* Quick Search */}
          <div className="relative w-full sm:w-64 shrink-0">
            <Search className="w-3.5 h-3.5 text-stone-400 dark:text-white/40 absolute left-3 top-1/2 -transtone-y-1/2" />
            <input
              id="skills-search-input"
              type="text"
              value={skillSearch}
              onChange={(e) => setSkillSearch(e.target.value)}
              placeholder="Filter skills..."
              className="w-full pl-8 pr-3.5 py-1.5 rounded-sm text-xs bg-white dark:bg-[#1C1A17] text-stone-900 dark:text-[#E2E4E9] placeholder-stone-400 dark:placeholder-white/30 border border-stone-300/80 dark:border-white/20 focus:outline-none focus:border-[#D4B892] shadow-none"
            />
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-3 mb-5 scrollbar-none">
          <button
            id="skill-filter-all"
            type="button"
            onClick={() => setActiveCategory('All')}
            className={`px-3 py-1.5 rounded-sm text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer flex items-center gap-1.5 ${
              activeCategory === 'All'
                ? 'bg-[#D4B892] text-[#141311] font-bold shadow-none'
                : 'bg-white dark:bg-[#1C1A17] text-stone-600 dark:text-white/60 hover:text-stone-900 dark:hover:text-white border border-stone-300/80 dark:border-white/20'
            }`}
          >
            <span>All</span>
            <span className={`px-1.5 py-0.2 rounded-full text-[9px] font-mono ${
              activeCategory === 'All' ? 'bg-[#141311]/20 text-[#141311]' : 'bg-stone-100 dark:bg-white/10 text-stone-600 dark:text-white/60'
            }`}>
              {allSkillsList.length}
            </span>
          </button>

          {skillsCategories.map((cat) => {
            const isSelected = activeCategory === cat.category;
            return (
              <button
                key={cat.category}
                id={`skill-filter-${cat.category.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
                type="button"
                onClick={() => setActiveCategory(cat.category)}
                className={`px-3 py-1.5 rounded-sm text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer flex items-center gap-1.5 ${
                  isSelected
                    ? 'bg-[#D4B892] text-[#141311] font-bold shadow-none'
                    : 'bg-white dark:bg-[#1C1A17] text-stone-600 dark:text-white/60 hover:text-stone-900 dark:hover:text-white border border-stone-300/80 dark:border-white/20'
                }`}
              >
                <span>{cat.category.split('&')[0].trim()}</span>
                <span className={`px-1.5 py-0.2 rounded-full text-[9px] font-mono ${
                  isSelected ? 'bg-[#141311]/20 text-[#141311]' : 'bg-stone-100 dark:bg-white/10 text-stone-600 dark:text-white/60'
                }`}>
                  {cat.skills.length}
                </span>
              </button>
            );
          })}
        </div>

        {/* Clean Responsive Skills Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4"
        >
          <AnimatePresence mode="popLayout">
            {filteredSkillsList.map((skill) => (
              <motion.div
                key={skill.name}
                layout
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.2 }}
                className="bg-white dark:bg-[#1C1A17] p-4 rounded-sm border border-stone-300/80 dark:border-white/20 hover:border-[#D4B892]/50 shadow-none hover:shadow-none transition-all flex flex-col justify-between space-y-2.5 group"
              >
                {/* Header: Name, Core Pill & Exp */}
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1.5 min-w-0">
                    <h4 className="font-semibold text-xs sm:text-sm text-stone-900 dark:text-[#E2E4E9] group-hover:text-[#8E795E] dark:group-hover:text-[#D4B892] transition-colors truncate">
                      {skill.name}
                    </h4>
                    {skill.highlight && (
                      <span className="inline-flex items-center gap-0.5 text-[9px] font-mono text-[#8E795E] dark:text-[#D4B892] bg-[#D4B892]/10 px-1.5 py-0.2 rounded-full shrink-0">
                        <Check className="w-2.5 h-2.5" />
                        <span>Core</span>
                      </span>
                    )}
                  </div>

                  <span className="text-[10px] font-mono text-stone-400 dark:text-white/40 shrink-0">
                    {skill.yearsExp}
                  </span>
                </div>

                {/* Progress Bar */}
                <div className="space-y-1">
                  <div className="flex justify-between text-[10px] font-mono text-stone-400 dark:text-white/40">
                    <span>Proficiency</span>
                    <span className="font-bold text-stone-700 dark:text-white/70">{skill.level}%</span>
                  </div>
                  <div className="w-full h-1 bg-stone-100 dark:bg-white/5 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, ease: 'easeOut' }}
                      className="h-full bg-gradient-to-r from-[#D4B892] to-[#D4B892] rounded-full"
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

      </div>
    </section>
  );
}
