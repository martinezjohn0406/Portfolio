import { motion } from 'motion/react';
import { 
  Briefcase, 
  Award, 
  Sparkles, 
  Calendar, 
  MapPin, 
  CheckCircle2, 
  GraduationCap,
  ChevronRight
} from 'lucide-react';
import { experiencesData, certificationsData, educationData } from '../data/profileData';

export function ExperienceSection() {
  return (
    <section id="experience" className="py-20 md:py-28 bg-[#F4F1EB] dark:bg-[#141311] border-t border-stone-300/80 dark:border-white/20 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-mono tracking-wider bg-stone-200/60 dark:bg-white/5 text-[#8E795E] dark:text-[#D4B892] border border-stone-300/60 dark:border-white/20 mb-4 font-semibold">
            <Briefcase className="w-3.5 h-3.5" />
            <span>Professional & Academic Trajectory</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl italic text-stone-900 dark:text-[#E2E4E9] tracking-tight">
            Experience, Certifications & Education<span className="text-[#8E795E] dark:text-[#D4B892]">.</span>
          </h2>
          <p className="text-sm sm:text-base text-stone-600 dark:text-white/60 mt-3 font-light leading-relaxed">
            Demonstrated accomplishments across B.S. Data Analytics coursework at WGU, certified Microsoft Office data modeling, interface testing, and foundational programming.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Work Experience Timeline (Left 7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <h3 className="text-xs font-mono uppercase tracking-[0.2em] text-[#8E795E] dark:text-[#D4B892] font-semibold flex items-center gap-2 mb-6">
              <Briefcase className="w-3.5 h-3.5" />
              <span>Experience & Practical Accomplishments</span>
            </h3>

            <div className="relative pl-6 space-y-8 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-stone-200 dark:before:bg-white/10">
              {experiencesData.map((exp, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.1 }}
                  className="relative space-y-3"
                >
                  {/* Timeline Dot */}
                  <div className="absolute -left-[29px] top-1.5 w-4 h-4 rounded-full bg-[#D4B892] ring-4 ring-[#F8F9FA] dark:ring-[#141311]" />

                  {/* Role & Company Card */}
                  <div className="bg-white dark:bg-[#15181E] p-6 rounded-sm border border-stone-300 dark:border-white/20 shadow-none hover:shadow-none dark:shadow-none space-y-3 relative overflow-hidden transition-all">

                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 relative z-10">
                      <div>
                        <h4 className="font-serif text-lg italic text-stone-900 dark:text-[#E2E4E9]">
                          {exp.role}
                        </h4>
                        <div className="text-xs font-semibold text-[#8E795E] dark:text-[#D4B892]">
                          {exp.company} · <span className="text-stone-500 dark:text-white/50 font-normal">{exp.location}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-1.5 text-xs font-mono text-stone-600 dark:text-white/50 bg-stone-100 dark:bg-white/5 px-2.5 py-1 rounded-full border border-stone-300 dark:border-white/20 self-start sm:self-auto">
                        <Calendar className="w-3 h-3 text-[#8E795E] dark:text-[#D4B892]" />
                        <span>{exp.period}</span>
                      </div>
                    </div>

                    {/* Highlights List */}
                    <ul className="space-y-2 text-xs sm:text-sm text-stone-600 dark:text-white/70 relative z-10">
                      {exp.highlights.map((bullet, bIdx) => (
                        <li key={bIdx} className="flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#8E795E] dark:text-[#D4B892] shrink-0 mt-0.5" />
                          <span className="leading-relaxed">{bullet}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Tech Tags */}
                    <div className="flex flex-wrap gap-1.5 pt-2 border-t border-stone-100 dark:border-white/5 relative z-10">
                      {exp.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-0.5 rounded text-[10px] font-mono bg-stone-100 dark:bg-white/5 text-stone-600 dark:text-white/50 border border-stone-300 dark:border-white/20"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Certifications & Education (Right 5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <h3 className="text-xs font-mono uppercase tracking-[0.2em] text-[#8E795E] dark:text-[#D4B892] font-semibold flex items-center gap-2 mb-6">
              <Award className="w-3.5 h-3.5" />
              <span>Verified Certifications</span>
            </h3>

            <div className="space-y-3.5">
              {certificationsData.map((cert, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: idx * 0.1 }}
                  className="bg-white dark:bg-[#15181E] p-4 rounded-sm border border-stone-300 dark:border-white/20 flex items-start justify-between gap-3 group hover:border-[#D4B892] dark:hover:border-[#D4B892]/50 transition-colors shadow-xs"
                >
                  <div className="space-y-1">
                    <h4 className="text-xs sm:text-sm font-bold text-stone-900 dark:text-[#E2E4E9] group-hover:text-[#8E795E] dark:group-hover:text-[#D4B892] transition-colors">
                      {cert.name}
                    </h4>
                    <p className="text-xs text-stone-500 dark:text-white/50">
                      Issued by <strong className="font-semibold text-stone-700 dark:text-white/80">{cert.issuer}</strong>
                    </p>
                    <div className="flex items-center gap-2 pt-1 font-mono text-[10px] text-stone-400 dark:text-white/40">
                      <span>ID: {cert.credentialId}</span>
                      <span>·</span>
                      <span>{cert.issueDate}</span>
                    </div>
                  </div>

                  <div className="p-2 rounded-sm bg-[#D4B892]/10 text-[#8E795E] dark:text-[#D4B892] border border-[#D4B892]/20 shrink-0">
                    <Award className="w-4 h-4" />
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Academic Background */}
            <div className="space-y-3 pt-2">
              <h3 className="text-xs font-mono uppercase tracking-[0.2em] text-[#8E795E] dark:text-[#D4B892] font-semibold flex items-center gap-2">
                <GraduationCap className="w-3.5 h-3.5" />
                <span>Education Background</span>
              </h3>

              <div className="space-y-3">
                {educationData.map((edu, idx) => (
                  <div key={idx} className="bg-white dark:bg-[#15181E] p-5 rounded-sm border border-stone-300 dark:border-white/20 space-y-1.5 shadow-none dark:shadow-none">
                    <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#8E795E] dark:text-[#D4B892] font-bold block">
                      {edu.period}
                    </span>
                    <h4 className="font-serif text-base italic text-stone-900 dark:text-[#E2E4E9]">
                      {edu.institution}
                    </h4>
                    <p className="text-xs text-[#8E795E] dark:text-[#D4B892] font-medium">
                      {edu.credential} · <span className="text-stone-500 dark:text-white/50 font-normal">{edu.location}</span>
                    </p>
                    <p className="text-xs text-stone-600 dark:text-white/60 leading-relaxed pt-1 font-light">
                      {edu.details}
                    </p>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
