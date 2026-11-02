import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, MessageSquare, Mail, Sparkles } from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';
import { ScrollReveal } from '../ui/ScrollReveal';

export const AboutIntroduction: React.FC = () => {
  const { data: portfolioData } = usePortfolio();
  const contact = portfolioData.contact || ({} as any);
  const rawWhatsAppDigits = (contact.whatsappNumber || contact.whatsapp || '').replace(/[^0-9]/g, '');
  const cleanWhatsAppNumber = rawWhatsAppDigits || '15550192834';
  const displayEmail = contact.email || 'alex.rivera.edits@gmail.com';

  return (
    <section 
      id="about-intro" 
      className="relative w-full overflow-hidden border-t border-[#0D0D0D]/10 bg-[#0D0D0D] text-white py-14 sm:py-24 md:py-28 px-4 sm:px-6 md:px-12 flex items-end sm:items-center min-h-[680px] sm:min-h-[680px]"
    >
      {/* PHOTO BACKGROUND:
          On mobile: full-bleed background, anchored at the face (32% vertical)
          On desktop: positioned on the right half (sm:w-1/2 lg:w-3/5 right-0) so the face and upper body remain fully visible beside the text */}
      <div className="absolute inset-0 sm:left-auto sm:right-0 sm:w-1/2 lg:w-3/5 z-0 overflow-hidden pointer-events-none flex items-center justify-center sm:justify-end">
        <img
          src={portfolioData.profileImage || "/profile.jpg"}
          alt={`${portfolioData.brandName} - ${portfolioData.profession}`}
          loading="eager"
          style={{ objectPosition: 'center 32%' }}
          className="w-full h-full object-cover brightness-95 sm:brightness-100 contrast-[1.04]"
        />
        {/* Soft edge-only shading on desktop, bottom-fade on mobile so the face stays completely clear */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D0D] via-[#0D0D0D]/85 via-50% to-transparent sm:from-[#0D0D0D] sm:via-transparent sm:to-[#0D0D0D]/40 pointer-events-none" />
        <div className="hidden sm:block absolute inset-y-0 left-0 w-2/5 bg-gradient-to-r from-[#0D0D0D] to-transparent pointer-events-none" />
      </div>

      {/* Precision Corner Crosshairs */}
      <span className="absolute top-6 left-6 sm:left-12 font-mono text-sm text-white/40 pointer-events-none z-10">+</span>
      <span className="absolute top-6 right-6 sm:right-12 font-mono text-sm text-white/40 pointer-events-none z-10">+</span>

      {/* FOREGROUND CONTENT:
          pt-60 on mobile pushes all headline, bio text, and buttons below the face
          left-aligned on desktop */}
      <div className="relative z-10 max-w-7xl mx-auto w-full pt-56 sm:pt-0">
        <div className="max-w-lg text-left">
          {/* Header Status & Approach Tag */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-2.5 mb-3 sm:mb-4">
            <ScrollReveal direction="down">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-black/80 backdrop-blur-md border border-white/20 rounded-full text-[10px] sm:text-xs font-mono text-white shadow-md">
                <span className="w-2 h-2 rounded-full bg-[#E63E26] animate-pulse" />
                <span className="font-bold uppercase tracking-wider">AVAILABLE FOR PROJECTS</span>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/10 backdrop-blur-md border border-white/15 rounded-full text-[10px] sm:text-xs font-mono text-neutral-300">
                <Sparkles className="w-3 h-3 text-[#E63E26]" />
                <span>ABOUT & APPROACH</span>
              </div>
            </ScrollReveal>
          </div>

          {/* Headline: "BEHIND THE EDIT." */}
          <ScrollReveal delay={0.15}>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-black uppercase tracking-tight text-white leading-tight mb-3 sm:mb-4 drop-shadow-md">
              BEHIND <span className="text-[#E63E26]">THE EDIT.</span>
            </h2>
          </ScrollReveal>

          {/* Bio Text */}
          <div className="space-y-2 mb-5 sm:mb-6">
            <ScrollReveal delay={0.2}>
              <p className="text-xs sm:text-sm md:text-base text-neutral-100 font-sans font-medium leading-relaxed drop-shadow-sm">
                I'm <strong className="text-white font-extrabold underline decoration-[#E63E26] underline-offset-4">{portfolioData.brandName}</strong> — a {portfolioData.profession.toLowerCase()} helping creators, agencies, and brands turn raw footage into high-retention visual stories and commercial edits.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.25}>
              <p className="text-[11px] sm:text-xs md:text-sm text-neutral-300 font-sans font-light leading-relaxed">
                I focus on what actually moves metrics: fast 24-48h turnarounds, clean DaVinci color grading, retention-first pacing, and surgical audio design.
              </p>
            </ScrollReveal>
          </div>

          {/* Action Buttons Directly Below Bio Text */}
          <ScrollReveal delay={0.3}>
            <div className="flex flex-wrap items-center gap-2 sm:gap-2.5">
              <a
                href={`https://wa.me/${cleanWhatsAppNumber}?text=Hi%20${encodeURIComponent(portfolioData.brandName)}%2C%20I%20saw%20your%20portfolio%20and%20want%20to%20collaborate%20on%20a%20video%20project!`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-1.5 px-4 sm:px-5 py-2.5 bg-[#E63E26] hover:bg-white text-white hover:text-black font-mono font-bold text-[10px] sm:text-xs uppercase tracking-wider rounded-full transition-all shadow-lg hover:scale-105 active:scale-95"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>CHAT ON WHATSAPP</span>
              </a>

              <a
                href={`https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(displayEmail)}&su=Video%20Editing%20Inquiry%20-%20${encodeURIComponent(portfolioData.brandName)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-1.5 px-4 sm:px-5 py-2.5 bg-white/10 hover:bg-white text-white hover:text-black font-mono font-bold text-[10px] sm:text-xs uppercase tracking-wider rounded-full border border-white/20 hover:border-white transition-all shadow-md hover:scale-105 active:scale-95 backdrop-blur-sm"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>SEND GMAIL</span>
              </a>

              <Link
                to="/about"
                className="inline-flex items-center gap-1.5 px-2.5 py-2 text-[10px] sm:text-xs font-mono font-bold text-neutral-300 hover:text-[#E63E26] transition-colors"
              >
                <span>FULL PHILOSOPHY</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};
