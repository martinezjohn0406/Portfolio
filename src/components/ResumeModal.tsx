import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
// @ts-ignore
import domtoimage from 'dom-to-image-more';
import jsPDF from 'jspdf';
import { 
  X, 
  Download, 
  Printer, 
  Briefcase, 
  Award, 
  GraduationCap, 
  Code, 
  Mail, 
  MapPin, 
  Phone,
  Globe,
  FileText,
  CheckCircle2,
  ChevronDown
} from 'lucide-react';
import { projectsData } from '../data/projectsData';
import { profileData, skillsCategories, experiencesData, certificationsData, educationData } from '../data/profileData';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ResumeModal({ isOpen, onClose }: ResumeModalProps) {
  const [showOptions, setShowOptions] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowOptions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (!isOpen) return null;

  const handleNativePrint = () => {
    setShowOptions(false);
    window.print();
  };

  const handleDownloadPDF = async () => {
    setShowOptions(false);
    const element = document.getElementById('resume-printable-area');
    if (!element) return;
    
    try {
      // Force light mode for PDF generation
      const htmlEl = document.documentElement;
      const wasDark = htmlEl.classList.contains('dark');
      if (wasDark) htmlEl.classList.remove('dark');
      
      // Allow browser to repaint
      await new Promise(resolve => setTimeout(resolve, 50));

      // We set a white background to avoid transparent issues.
      const dataUrl = await domtoimage.toJpeg(element, { quality: 0.98, bgcolor: '#ffffff' });
      
      if (wasDark) htmlEl.classList.add('dark');
      
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'in',
        format: 'letter'
      });
      
      const imgProps = pdf.getImageProperties(dataUrl);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      // Calculate height maintaining aspect ratio
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      
      pdf.addImage(dataUrl, 'JPEG', 0, 0, pdfWidth, pdfHeight);
      pdf.save('John_Martinez_Resume.pdf');
    } catch (error) {
      console.error('Error generating PDF:', error);
      // Fallback to native print if dom-to-image fails
      window.print();
    }
  };

  return (
    <AnimatePresence>
      <div
        id="resume-modal-backdrop"
        className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md overflow-y-auto"
        onClick={(e) => {
          if (e.target === e.currentTarget) onClose();
        }}
      >
        <motion.div
          id="resume-modal-content"
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="bg-white dark:bg-[#171513] border border-stone-300 dark:border-white/20 rounded-sm shadow-none max-w-3xl w-full max-h-[92vh] flex flex-col overflow-hidden my-auto text-stone-800 dark:text-[#E2E4E9]"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header Controls */}
          <div className="px-6 py-4 border-b border-stone-300 dark:border-white/20 flex items-center justify-between bg-stone-50 dark:bg-[#15181E]">
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-[#8E795E] dark:text-[#D4B892]" />
              <span className="text-xs sm:text-sm font-serif italic text-stone-900 dark:text-[#E2E4E9]">
                John Martinez — Resume Preview
              </span>
            </div>

            <div className="flex items-center gap-2">
              <div className="relative" ref={dropdownRef}>
                <button
                  type="button"
                  onClick={() => setShowOptions(!showOptions)}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-mono text-stone-700 dark:text-white/80 bg-stone-200/70 dark:bg-white/5 border border-stone-300 dark:border-white/20 hover:bg-stone-300 dark:hover:bg-white/10 hover:text-[#8E795E] dark:hover:text-[#D4B892] transition-colors cursor-pointer"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print / Save PDF</span>
                  <ChevronDown className="w-3 h-3 opacity-60" />
                </button>

                <AnimatePresence>
                  {showOptions && (
                    <motion.div
                      initial={{ opacity: 0, y: 5, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 5, scale: 0.95 }}
                      transition={{ duration: 0.15 }}
                      className="absolute top-full right-0 mt-2 w-48 bg-white dark:bg-[#15181E] border border-stone-300 dark:border-white/20 rounded-sm shadow-none overflow-hidden z-50"
                    >
                      <div className="p-1">
                        <button
                          onClick={handleNativePrint}
                          className="w-full flex items-center gap-2 px-3 py-2.5 text-xs text-left rounded-lg text-stone-700 dark:text-white/80 hover:bg-stone-100 dark:hover:bg-white/5 hover:text-[#8E795E] dark:hover:text-[#D4B892] transition-colors cursor-pointer"
                        >
                          <Printer className="w-4 h-4" />
                          <span>Print Document</span>
                        </button>
                        <button
                          onClick={handleDownloadPDF}
                          className="w-full flex items-center gap-2 px-3 py-2.5 text-xs text-left rounded-lg text-stone-700 dark:text-white/80 hover:bg-stone-100 dark:hover:bg-white/5 hover:text-[#8E795E] dark:hover:text-[#D4B892] transition-colors cursor-pointer"
                        >
                          <Download className="w-4 h-4" />
                          <span>Download as PDF</span>
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <button
                type="button"
                onClick={onClose}
                className="p-1.5 rounded-full text-stone-500 dark:text-white/60 hover:text-stone-900 dark:hover:text-white bg-stone-200/60 dark:bg-white/5 hover:bg-stone-200 dark:hover:bg-white/10 border border-stone-300 dark:border-white/20 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Resume Printable Paper Body */}
          <div id="resume-printable-area" className="p-6 sm:p-10 overflow-y-auto space-y-8 bg-white dark:bg-[#171513] text-stone-700 dark:text-white/80 font-sans">
            
            {/* Header Resume Bio */}
            <div className="border-b border-stone-300 dark:border-white/20 pb-6">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                <div>
                  <h1 className="font-serif text-3xl sm:text-4xl italic text-stone-900 dark:text-[#E2E4E9] tracking-tight">
                    {profileData.name}
                  </h1>
                  <p className="text-xs font-mono text-[#8E795E] dark:text-[#D4B892] uppercase tracking-wider mt-1 font-semibold">
                    {profileData.title}
                  </p>
                </div>
                <div className="text-xs font-mono text-stone-600 dark:text-white/60 space-y-1 sm:text-right">
                  <div className="flex items-center sm:justify-end gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-[#8E795E] dark:text-[#D4B892]" />
                    <span>{profileData.address}</span>
                  </div>
                  <div className="flex items-center sm:justify-end gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-[#8E795E] dark:text-[#D4B892]" />
                    <span>{profileData.phone}</span>
                  </div>
                  <div className="flex items-center sm:justify-end gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-[#8E795E] dark:text-[#D4B892]" />
                    <span>{profileData.email}</span>
                  </div>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-stone-600 dark:text-white/70 mt-4 leading-relaxed font-light">
                {profileData.bio}
              </p>
            </div>

            {/* Education Section */}
            <div className="space-y-3">
              <h2 className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#8E795E] dark:text-[#D4B892] font-semibold flex items-center gap-1.5">
                <GraduationCap className="w-3.5 h-3.5" />
                <span>Education</span>
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {educationData.map((edu, idx) => (
                  <div key={idx} className="p-4 rounded-sm bg-stone-50 dark:bg-[#15181E] border border-stone-300 dark:border-white/20 space-y-1">
                    <h3 className="font-serif text-base italic text-stone-900 dark:text-[#E2E4E9]">
                      {edu.institution}
                    </h3>
                    <div className="text-xs font-semibold text-[#8E795E] dark:text-[#D4B892]">
                      {edu.credential}
                    </div>
                    <div className="text-[11px] font-mono text-stone-500 dark:text-white/50 flex justify-between pt-1">
                      <span>{edu.location}</span>
                      <span>{edu.period}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

                        {/* Featured Projects Section */}
            <div className="space-y-3">
              <h2 className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#8E795E] dark:text-[#D4B892] font-semibold flex items-center gap-1.5">
                <Briefcase className="w-3.5 h-3.5" />
                <span>Featured Data Projects</span>
              </h2>
              <div className="space-y-3">
                {projectsData.map((project, idx) => (
                  <div key={idx} className="p-4 rounded-sm bg-stone-50 dark:bg-[#15181E] border border-stone-300 dark:border-white/20 space-y-2">
                    <div className="flex items-center justify-between">
                      <strong className="font-serif text-base italic text-stone-900 dark:text-[#E2E4E9]">
                        {project.title}
                      </strong>
                      <span className="text-[11px] font-mono text-[#8E795E] dark:text-[#D4B892] bg-[#D4B892]/15 px-2 py-0.5 rounded-full border border-[#D4B892]/30 font-bold">
                        {project.completionDate}
                      </span>
                    </div>
                    <p className="text-xs text-stone-700 dark:text-white/80 font-medium">
                      Objective: <span className="font-light text-stone-600 dark:text-white/70">{project.tagline}</span>
                    </p>
                    <p className="text-xs text-stone-600 dark:text-white/70 leading-relaxed font-light">
                      {project.summary}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Skills & Languages */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2 border-t border-stone-300 dark:border-white/20">
              <div className="space-y-2 p-4 rounded-sm bg-stone-50 dark:bg-[#15181E] border border-stone-300 dark:border-white/20">
                <h2 className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#8E795E] dark:text-[#D4B892] font-semibold flex items-center gap-1.5">
                  <Code className="w-3.5 h-3.5" />
                  <span>Skills</span>
                </h2>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {profileData.coreStrengths.map((s) => (
                    <span
                      key={s}
                      className="px-2.5 py-1 rounded-full text-xs bg-stone-200/70 dark:bg-white/5 text-stone-800 dark:text-white/80 border border-stone-300 dark:border-white/20"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              <div className="space-y-2 p-4 rounded-sm bg-stone-50 dark:bg-[#15181E] border border-stone-300 dark:border-white/20">
                <h2 className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#8E795E] dark:text-[#D4B892] font-semibold flex items-center gap-1.5">
                  <Globe className="w-3.5 h-3.5" />
                  <span>Languages</span>
                </h2>
                <div className="space-y-2 text-xs text-stone-800 dark:text-white/80 pt-1">
                  <div className="flex items-center justify-between p-2 rounded-sm bg-white dark:bg-white/5 border border-stone-300 dark:border-white/20 shadow-xs">
                    <span className="font-medium text-stone-900 dark:text-[#E2E4E9]">English</span>
                    <span className="text-[11px] font-mono text-[#8E795E] dark:text-[#D4B892] font-bold">Fluent / Native</span>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded-sm bg-white dark:bg-white/5 border border-stone-300 dark:border-white/20 shadow-xs">
                    <span className="font-medium text-stone-900 dark:text-[#E2E4E9]">Spanish</span>
                    <span className="text-[11px] font-mono text-[#8E795E] dark:text-[#D4B892] font-bold">Bilingual / Fluent</span>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Footer Close Button */}
          <div className="px-6 py-4 border-t border-stone-300 dark:border-white/20 bg-stone-50 dark:bg-[#15181E] flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2 rounded-full text-xs font-mono text-stone-800 dark:text-white/80 bg-stone-200/80 hover:bg-stone-300 dark:bg-white/10 dark:hover:bg-white/20 border border-stone-300 dark:border-white/20 transition-colors cursor-pointer"
            >
              Close Preview
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

