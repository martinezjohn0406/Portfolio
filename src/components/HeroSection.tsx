import { motion } from 'motion/react';
import { 
  ArrowDown, 
  Zap,
  Mail, 
  Phone, 
  MapPin, 
  FileText
} from 'lucide-react';
import { profileData } from '../data/profileData';

interface HeroSectionProps {
  onOpenResume: () => void;
}

export function HeroSection({ onOpenResume }: HeroSectionProps) {
  const highlights = [
    { label: 'Degree', value: "B.S. Data Analytics · WGU", sub: 'Projected Early 2028' },
    { label: 'Core Competency', value: 'Data Wrangling & Cleaning', sub: 'Advanced parsing & structuring' },
    { label: 'Statistical Rigor', value: 'Expected Values & Outliers', sub: 'Precision modeling' },
    { label: 'Technical Tooling', value: 'Relational DBs & Excel', cross: false, sub: 'Data mapping & forecasting' },
  ];

  return (
    <section id="hero" className="relative pt-24 pb-12 sm:pt-32 sm:pb-16 md:pt-36 md:pb-20 overflow-hidden bg-[#F4F1EB] dark:bg-[#141311] transition-colors">

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Centered Hero Banner */}
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          
          {/* Status Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm text-xs font-mono tracking-widest uppercase bg-stone-200/60 dark:bg-white/5 text-stone-800 dark:text-[#D4B892] border border-stone-300/70 dark:border-white/20 mb-5 font-semibold">
            <span>{profileData.status}</span>
          </div>

          {/* Headline */}
          <div className="space-y-3">
            <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl italic font-normal tracking-tight text-stone-900 dark:text-[#E2E4E9] leading-tight sm:leading-[1.15]">
              <span className="text-stone-900 dark:text-[#E2E4E9] py-2 px-4 -mx-4 inline-block">{profileData.name}</span>
            </h1>
            <p className="text-lg sm:text-2xl font-light text-stone-700 dark:text-[#E2E4E9]/90 tracking-tight max-w-2xl mx-auto leading-snug">
              {profileData.title}
            </p>
          </div>

          {/* Bio Description */}
          <p className="mt-4 text-sm md:text-base text-stone-600 dark:text-white/70 max-w-2xl mx-auto leading-relaxed font-light">
            {profileData.bio}
          </p>

          {/* Primary Action Buttons */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <button
              id="hero-resume-modal-btn"
              type="button"
              onClick={onOpenResume}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-sm font-bold text-xs uppercase tracking-widest text-[#141311] bg-[#D4B892] hover:bg-[#B39B7D] transition-colors cursor-pointer"
            >
              <FileText className="w-4 h-4" />
              <span>View Full Resume</span>
            </button>

            <a
              id="hero-explore-projects-btn"
              href="#projects"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-sm font-semibold text-xs uppercase tracking-widest text-stone-700 dark:text-white/80 bg-white dark:bg-white/5 border border-stone-300 dark:border-white/20 hover:border-stone-400 dark:hover:border-white/40 transition-colors cursor-pointer"
            >
              <span>Case Studies</span>
              <ArrowDown className="w-4 h-4 text-[#8E795E] dark:text-[#D4B892]" />
            </a>
          </div>

          {/* Quick Contact Line */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.45, delay: 0.3 }}
            className="mt-6 flex flex-wrap items-center justify-center gap-3 sm:gap-5 text-xs text-stone-500 dark:text-white/50"
          >
            <a
              id="hero-email-link"
              href={`mailto:${profileData.email}`}
              className="flex items-center gap-1.5 hover:text-[#8E795E] dark:hover:text-[#D4B892] transition-colors"
            >
              <Mail className="w-3.5 h-3.5 text-[#8E795E] dark:text-[#D4B892]" />
              <span>{profileData.email}</span>
            </a>
            <span>·</span>
            <a
              id="hero-phone-link"
              href="tel:3164520406"
              className="flex items-center gap-1.5 hover:text-[#8E795E] dark:hover:text-[#D4B892] transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-[#8E795E] dark:text-[#D4B892]" />
              <span>{profileData.phone}</span>
            </a>
            <span>·</span>
            <span className="flex items-center gap-1 font-mono">
              <MapPin className="w-3.5 h-3.5 text-[#8E795E] dark:text-[#D4B892]" />
              {profileData.location}
            </span>
          </motion.div>

        </div>

        {/* 4-Item Responsive Highlights Row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.45, delay: 0.35 }}
          className="mt-10 sm:mt-12 grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4"
        >
          {highlights.map((item, idx) => (
            <div
              key={idx}
              className="bg-white dark:bg-[#1C1A17] p-3.5 sm:p-4 rounded-sm border border-stone-300/80 dark:border-white/20 shadow-none hover:border-[#D4B892]/50 transition-all flex flex-col justify-between"
            >
              <div className="text-[10px] font-mono uppercase tracking-wider text-stone-400 dark:text-white/40 font-semibold">
                {item.label}
              </div>
              <div className="text-xs sm:text-sm font-bold text-stone-900 dark:text-[#E2E4E9] mt-1 line-clamp-1">
                {item.value}
              </div>
              <div className="text-[11px] text-[#8E795E] dark:text-[#D4B892] font-medium mt-0.5">
                {item.sub}
              </div>
            </div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}

