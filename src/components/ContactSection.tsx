import { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Mail, 
  Copy, 
  Check, 
  Linkedin, 
  Sparkles, 
  Clock, 
  MapPin, 
  Phone,
  ArrowUpRight,
  Send,
  MessageCircle,
  FileText
} from 'lucide-react';
import { profileData } from '../data/profileData';

export function ContactSection() {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(profileData.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleCopyPhone = () => {
    navigator.clipboard.writeText(profileData.phone);
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2000);
  };

  return (
    <section id="contact" className="py-20 md:py-28 bg-[#F4F1EB] dark:bg-[#141311] border-t border-stone-300/80 dark:border-white/20 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-mono tracking-wider bg-stone-200/60 dark:bg-white/5 text-[#8E795E] dark:text-[#D4B892] border border-stone-300/60 dark:border-white/20 mb-4 font-semibold">
            <Mail className="w-3.5 h-3.5" />
            <span>Direct Communication</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl italic text-stone-900 dark:text-[#E2E4E9] tracking-tight">
            Get In Touch & Connect<span className="text-[#8E795E] dark:text-[#D4B892]">.</span>
          </h2>
          <p className="text-sm sm:text-base text-stone-600 dark:text-white/60 mt-3 font-light leading-relaxed">
            Feel free to reach out directly via email, phone, or LinkedIn to discuss entry-level data analyst roles, internships, or analytics projects.
          </p>
        </div>

        {/* Contact Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          
          {/* Card 1: Direct Email */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3 }}
            className="bg-stone-50 dark:bg-[#15181E] p-6 rounded-sm border border-stone-300 dark:border-white/20 shadow-none dark:shadow-none space-y-4 relative overflow-hidden flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="p-2.5 rounded-sm bg-[#D4B892]/15 text-[#8E795E] dark:text-[#D4B892] border border-[#D4B892]/30">
                  <Mail className="w-5 h-5" />
                </div>
                <button
                  id="contact-copy-email-btn"
                  type="button"
                  onClick={handleCopyEmail}
                  className="flex items-center gap-1 px-3 py-1 rounded-full text-xs font-mono bg-white dark:bg-white/5 hover:bg-stone-200 dark:hover:bg-white/10 text-stone-700 dark:text-white/80 border border-stone-300 dark:border-white/20 shadow-xs transition-colors cursor-pointer"
                  title="Copy email to clipboard"
                >
                  {copiedEmail ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>

              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-stone-500 dark:text-white/40">Email Address</span>
                <h3 className="font-serif text-lg italic text-stone-900 dark:text-[#E2E4E9] break-all mt-0.5">
                  {profileData.email}
                </h3>
                <p className="text-xs text-stone-600 dark:text-white/60 font-light mt-1">
                  Primary channel for recruitment, interview scheduling, and technical inquiries.
                </p>
              </div>
            </div>

            <a
              href={`mailto:${profileData.email}`}
              className="inline-flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-sm text-xs font-semibold text-[#141311] bg-[#D4B892] hover:bg-[#D4B892] shadow-none transition-all"
            >
              <span>Compose Email</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </motion.div>

          {/* Card 2: Direct Phone */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="bg-stone-50 dark:bg-[#15181E] p-6 rounded-sm border border-stone-300 dark:border-white/20 shadow-none dark:shadow-none space-y-4 relative overflow-hidden flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="p-2.5 rounded-sm bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                  <Phone className="w-5 h-5" />
                </div>
                <button
                  id="contact-copy-phone-btn"
                  type="button"
                  onClick={handleCopyPhone}
                  className="flex items-center gap-1 px-3 py-1 rounded-full text-xs font-mono bg-white dark:bg-white/5 hover:bg-stone-200 dark:hover:bg-white/10 text-stone-700 dark:text-white/80 border border-stone-300 dark:border-white/20 shadow-xs transition-colors cursor-pointer"
                  title="Copy phone to clipboard"
                >
                  {copiedPhone ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>

              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-stone-500 dark:text-white/40">Direct Phone</span>
                <h3 className="font-serif text-lg italic text-stone-900 dark:text-[#E2E4E9] mt-0.5">
                  {profileData.phone}
                </h3>
                <p className="text-xs text-stone-600 dark:text-white/60 font-light mt-1">
                  Available for phone screens, recruiter calls, and direct consultations.
                </p>
              </div>
            </div>

            <a
              href={`tel:${profileData.phone}`}
              className="inline-flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-sm text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-500 shadow-none shadow-emerald-600/25 border border-emerald-500 hover:shadow-none transition-all active:scale-98"
            >
              <span>Call / Dial</span>
              <Phone className="w-3.5 h-3.5" />
            </a>
          </motion.div>

          {/* Card 3: Professional Network (LinkedIn Only) */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: 0.2 }}
            className="bg-stone-50 dark:bg-[#15181E] p-6 rounded-sm border border-stone-300 dark:border-white/20 shadow-none dark:shadow-none space-y-4 relative overflow-hidden flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="p-2.5 rounded-sm bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20">
                  <Linkedin className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-700/40 font-semibold">
                  Verified Profile
                </span>
              </div>

              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-stone-500 dark:text-white/40">Professional Network</span>
                <h3 className="font-serif text-lg italic text-stone-900 dark:text-[#E2E4E9] mt-0.5">
                  LinkedIn Profile
                </h3>
                <p className="text-xs text-stone-600 dark:text-white/60 font-light mt-1">
                  Connect for networking, endorsements, and verified career milestones.
                </p>
              </div>
            </div>

            <a
              href={profileData.linkedin}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-sm text-xs font-semibold text-white bg-[#0A66C2] hover:bg-[#004182] shadow-none transition-all"
            >
              <span>View LinkedIn Profile</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </motion.div>

        </div>

        {/* Secondary Info Strip: Location, Availability & Response SLA */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-6xl mx-auto">
          
          <div className="p-4 rounded-sm bg-stone-50 dark:bg-[#15181E] border border-stone-300 dark:border-white/20 flex items-center gap-3.5">
            <div className="p-2 rounded-sm bg-sky-500/10 text-sky-600 dark:text-sky-400 border border-sky-500/20 shrink-0">
              <MapPin className="w-4 h-4" />
            </div>
            <div>
              <div className="text-[10px] font-mono uppercase tracking-wider text-stone-500 dark:text-white/40">Location</div>
              <div className="text-xs sm:text-sm font-semibold text-stone-900 dark:text-[#E2E4E9]">
                {profileData.location}
              </div>
            </div>
          </div>

          <div className="p-4 rounded-sm bg-stone-50 dark:bg-[#15181E] border border-stone-300 dark:border-white/20 flex items-center gap-3.5">
            <div className="p-2 rounded-sm bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 shrink-0">
              <Clock className="w-4 h-4" />
            </div>
            <div>
              <div className="text-[10px] font-mono uppercase tracking-wider text-stone-500 dark:text-white/40">Response SLA</div>
              <div className="text-xs sm:text-sm font-semibold text-stone-900 dark:text-[#E2E4E9]">
                Within 12–24 Hours
              </div>
            </div>
          </div>

          <div className="p-4 rounded-sm bg-stone-50 dark:bg-[#15181E] border border-stone-300 dark:border-white/20 flex items-center gap-3.5">
            <div className="p-2 rounded-sm bg-[#D4B892]/15 text-[#8E795E] dark:text-[#D4B892] border border-[#D4B892]/30 shrink-0">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <div className="text-[10px] font-mono uppercase tracking-wider text-stone-500 dark:text-white/40">Status</div>
              <div className="text-xs sm:text-sm font-semibold text-[#8E795E] dark:text-[#D4B892]">
                Open for Hire & Freelance
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
