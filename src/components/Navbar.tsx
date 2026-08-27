import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sun, 
  Moon, 
  Menu, 
  X, 
  FileText, 
  Database, 
  TrendingUp, 
  Send,
  Terminal,
  ExternalLink
} from 'lucide-react';
import { profileData } from '../data/profileData';

interface NavbarProps {
  darkMode: boolean;
  setDarkMode: (val: boolean) => void;
  onOpenResume: () => void;
}

export function Navbar({ darkMode, setDarkMode, onOpenResume }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const sections = ['projects', 'skills', 'contact'];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      const scrollPos = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section);
            return;
          }
        }
      }
      if (window.scrollY < 300) {
        setActiveSection('hero');
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Projects', href: '#projects', id: 'projects' },
    { name: 'Skills & Stack', href: '#skills', id: 'skills' },
    { name: 'Contact', href: '#contact', id: 'contact' },
  ];

  return (
    <header
      id="main-navbar"
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
        isScrolled
          ? 'bg-white/5 dark:bg-black/5 backdrop-blur-md py-3 shadow-none'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand / Logo */}
        <a 
          href="#"
          id="nav-logo-link"
          className="flex items-center gap-3 group focus:outline-none"
        >
          <div className="w-8 h-8 rounded-full flex items-center justify-center bg-[#D4B892] text-[#141311] group- transition-transform duration-300">
            <span className="font-serif font-bold italic text-sm">JM</span>
          </div>
          <div className="flex flex-col">
            <span className="font-medium tracking-wide text-stone-900 dark:text-[#E2E4E9] text-sm uppercase">
              John<span className="text-[#D4B892]"> Martinez</span>
            </span>
            <p className="text-[10px] text-stone-500 dark:text-white/40 font-mono tracking-widest hidden sm:block uppercase">
              Data Analyst
            </p>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav id="desktop-nav" className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <a
                key={link.name}
                id={`nav-link-${link.id}`}
                href={link.href}
                className={`relative py-1.5 text-xs font-semibold uppercase tracking-widest transition-colors duration-200 ${
                  isActive
                    ? 'text-[#D4B892]'
                    : 'text-stone-500 dark:text-white/50 hover:text-stone-900 dark:hover:text-white'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeNavPill"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#D4B892]"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{link.name}</span>
              </a>
            );
          })}
        </nav>

        {/* Right CTA Actions: Theme Toggle, Resume & Contact */}
        <div className="flex items-center gap-2.5">
          {/* Theme Toggle Button */}
          <button
            id="theme-toggle-button"
            type="button"
            aria-label="Toggle theme mode"
            onClick={() => setDarkMode(!darkMode)}
            className="flex items-center justify-center p-2 rounded-full hover:bg-stone-200/50 dark:hover:bg-white/5 text-stone-600 dark:text-white/60 transition-colors focus:outline-none cursor-pointer"
          >
            {darkMode ? (
              <Sun className="w-4 h-4 text-[#D4B892]" />
            ) : (
              <Moon className="w-4 h-4 text-[#8E795E]" />
            )}
          </button>

          {/* View Resume Button */}
          <button
            id="nav-resume-btn"
            type="button"
            onClick={onOpenResume}
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold uppercase tracking-widest text-stone-600 dark:text-white/60 hover:text-[#D4B892] dark:hover:text-[#D4B892] transition-colors cursor-pointer"
          >
            <span>Resume</span>
          </button>

          {/* Get In Touch Button */}
          <a
            id="nav-contact-cta"
            href="#contact"
            className="hidden lg:inline-flex items-center gap-2 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-[#141311] bg-[#D4B892] hover:bg-[#B39B7D] transition-colors"
          >
            <span>Contact</span>
          </a>

          {/* Mobile Menu Trigger */}
          <button
            id="mobile-menu-toggle"
            type="button"
            aria-label="Open mobile navigation menu"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-stone-700 dark:text-white/70 bg-stone-200/60 dark:bg-white/5 hover:bg-stone-300/70 dark:hover:bg-white/10 border border-stone-300/70 dark:border-white/20 focus:outline-none"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            id="mobile-nav-drawer"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white dark:bg-[#171513] border-b border-stone-300 dark:border-white/20 px-4 pt-3 pb-6 shadow-none"
          >
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-4 py-2.5 rounded-sm text-sm font-medium transition-colors ${
                    activeSection === link.id
                      ? 'bg-[#D4B892] text-[#141311] font-bold'
                      : 'text-stone-700 dark:text-white/70 hover:bg-stone-100 dark:hover:bg-white/5'
                  }`}
                >
                  {link.name}
                </a>
              ))}
              <div className="pt-2 mt-2 border-t border-stone-300 dark:border-white/20 flex flex-col gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenResume();
                  }}
                  className="flex items-center justify-center gap-2 w-full py-2.5 rounded-sm text-sm font-semibold text-stone-700 dark:text-white/80 bg-stone-100 dark:bg-white/5 border border-stone-300 dark:border-white/20"
                >
                  <FileText className="w-4 h-4 text-[#D4B892]" />
                  <span>View Full Resume</span>
                </button>
                <a
                  href="#contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-center gap-2 w-full py-2.5 rounded-sm text-sm font-bold text-[#141311] bg-[#D4B892] hover:bg-[#D4B892]"
                >
                  <Send className="w-4 h-4" />
                  <span>Contact John</span>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
