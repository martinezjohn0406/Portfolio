import { ArrowUp, Database } from 'lucide-react';
import { profileData } from '../data/profileData';

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-stone-50 dark:bg-[#141311] border-t border-stone-300 dark:border-white/20 py-12 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          
          {/* Brand and Description */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#D4B892] flex items-center justify-center text-[#141311] font-bold text-sm shadow-none shadow-[#D4B892]/20">
              <Database className="w-4 h-4" />
            </div>
            <div>
              <div className="font-serif italic text-stone-900 dark:text-[#E2E4E9] text-base">
                {profileData.name} <span className="text-[#8E795E] dark:text-[#D4B892] font-sans text-xs">· Portfolio</span>
              </div>
              <p className="text-[11px] font-mono text-stone-500 dark:text-white/40">
                B.S. Data Analytics (WGU '28) · Certified Excel & Word · BI Specialist
              </p>
            </div>
          </div>

          {/* Quick Anchor Links */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-xs font-mono tracking-wider text-stone-600 dark:text-white/60">
            <a href="#projects" className="hover:text-[#8E795E] dark:hover:text-[#D4B892] transition-colors">
              Case Studies
            </a>
            <a href="#skills" className="hover:text-[#8E795E] dark:hover:text-[#D4B892] transition-colors">
              Tech Stack
            </a>
            <a href="#contact" className="hover:text-[#8E795E] dark:hover:text-[#D4B892] transition-colors">
              Contact
            </a>
          </div>

          {/* Back to top button */}
          <div className="flex items-center gap-3">
            <button
              id="back-to-top-btn"
              type="button"
              onClick={scrollToTop}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-mono text-stone-700 dark:text-white/70 bg-stone-200/70 dark:bg-white/5 border border-stone-300 dark:border-white/20 hover:text-stone-900 dark:hover:text-white hover:border-stone-400 dark:hover:border-white/30 transition-colors cursor-pointer"
            >
              <span>Top</span>
              <ArrowUp className="w-3 h-3 text-[#8E795E] dark:text-[#D4B892]" />
            </button>
          </div>

        </div>

        {/* Bottom divider with attribution */}
        <div className="mt-8 pt-8 border-t border-stone-300/80 dark:border-white/5 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500 dark:text-white/40 gap-3">
          <p className="font-light">
            © {new Date().getFullYear()} {profileData.name}. Wichita, KS.
          </p>
          <div className="flex items-center gap-2">
            <p className="font-mono text-[11px] font-bold text-stone-900 dark:text-[#E2E4E9]">
              Thank you for your consideration.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
