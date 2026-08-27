import { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { ProjectGrid } from './components/ProjectGrid';
import { SkillsSection } from './components/SkillsSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { ProjectModal } from './components/ProjectModal';
import { ResumeModal } from './components/ResumeModal';
import { Project } from './types';

export default function App() {
  // Theme state defaulting strictly to light mode on visit
  const [darkMode, setDarkMode] = useState<boolean>(false);

  // Active project for modal viewer
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  // Active project for Ask the Data drawer

  // Resume modal state
  const [isResumeOpen, setIsResumeOpen] = useState<boolean>(false);

  // Sync dark class on document root
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme_preference', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme_preference', 'light');
    }
  }, [darkMode]);

  return (
    <div className="min-h-screen bg-[#F4F1EB] dark:bg-[#141311] text-stone-900 dark:text-[#E2E4E9] selection:bg-[#D4B892] selection:text-[#141311] transition-colors duration-200 flex flex-col font-sans">
      {/* Top Fixed Header Navigation */}
      <Navbar
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        onOpenResume={() => setIsResumeOpen(true)}
      />

      {/* Main Content Body */}
      <main className="flex-1">
        {/* 1. Hero Section with Bio & Stats */}
        <HeroSection
          onOpenResume={() => setIsResumeOpen(true)}
        />

        {/* 2. Project List Layout */}
        <ProjectGrid
          onSelectProject={(project) => setActiveProject(project)}
        />

        {/* 4. Skills & Analytics Tech Stack Matrix */}
        <SkillsSection />

        {/* 5. Career Experience Timeline & Certifications */}

        {/* 6. Contact Form */}
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Interactive Project Case Study Modal Viewer */}
      <ProjectModal
        project={activeProject}
        onClose={() => setActiveProject(null)}
      />

      {/* Executive Resume Modal */}
      <ResumeModal
        isOpen={isResumeOpen}
        onClose={() => setIsResumeOpen(false)}
      />
    </div>
  );
}
