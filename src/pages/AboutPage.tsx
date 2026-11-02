import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Globe, CheckCircle2 } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import { ServicesSection } from '../components/home/ServicesSection';
import { ScrollReveal } from '../components/ui/ScrollReveal';

export const AboutPage: React.FC = () => {
  const { data: portfolioData } = usePortfolio();
  return (
    <div className="pt-24 pb-16 sm:pt-32 sm:pb-24 px-4 sm:px-6 md:px-12 max-w-7xl mx-auto space-y-12 sm:space-y-24">
      {/* Top Bio & Portrait Grid */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
        {/* Left Column: Portrait */}
        <div className="lg:col-span-5 flex justify-center">
          <ScrollReveal direction="right">
            <div className="relative rounded-2xl overflow-hidden border-2 border-[#0D0D0D] bg-white aspect-[4/3] sm:aspect-[4/5] max-w-[280px] sm:max-w-none w-full shadow-2xl group">
              <img
                src={portfolioData.profileImage || "/profile.jpg"}
                alt={`${portfolioData.brandName} - ${portfolioData.profession}`}
                style={{ objectPosition: 'center 32%' }}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D0D]/90 via-transparent to-transparent" />

              {/* Pin-style Brutalist Top Stamp */}
              <div className="absolute top-4 left-4 px-2 py-0.5 bg-[#E63E26] text-white font-mono text-[10px] font-bold uppercase tracking-wider rounded">
                DVS X2X4
              </div>

              <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 right-4 sm:right-6 space-y-1">
                <span className="font-display font-black text-lg sm:text-xl text-white block">
                  {portfolioData.brandName}
                </span>
                <span className="text-[10px] sm:text-xs font-mono text-[#E63E26] block uppercase font-bold">
                  {portfolioData.profession}
                </span>
                <div className="flex items-center gap-1.5 text-[10px] sm:text-xs font-mono text-neutral-300 pt-0.5">
                  <Globe className="w-3.5 h-3.5 text-white" />
                  <span>{portfolioData.contact.location}</span>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>

        {/* Right Column: Bio & Philosophy */}
        <div className="lg:col-span-7 space-y-5 sm:space-y-8">
          <div>
            <ScrollReveal direction="down">
              <span className="font-mono text-xs text-[#E63E26] tracking-widest uppercase block mb-1.5 sm:mb-2 font-bold">
                ABOUT {portfolioData.brandName.toUpperCase()}
              </span>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <h1 className="text-3xl sm:text-6xl md:text-7xl font-display font-black uppercase tracking-tight text-[#0D0D0D] leading-[1.12]">
                TURNING RAW FOOTAGE <br />
                <span className="text-[#0D0D0D]/60">
                  INTO IMPACT.
                </span>
              </h1>
            </ScrollReveal>
          </div>

          <div className="space-y-3 sm:space-y-4">
            {portfolioData.bio.map((para, i) => (
              <ScrollReveal key={i} delay={0.08 * (i + 1)}>
                <p className="text-xs sm:text-lg text-[#0D0D0D]/75 font-sans font-light leading-relaxed">
                  {para}
                </p>
              </ScrollReveal>
            ))}
          </div>

          {/* Core Values: 2-columns on mobile (2x2 grid) */}
          <ScrollReveal delay={0.3}>
            <div className="pt-4 sm:pt-6 border-t border-[#0D0D0D]/10 grid grid-cols-2 gap-2 sm:gap-4 text-[10px] sm:text-xs font-mono text-[#0D0D0D]">
              <div className="flex items-center gap-2 p-2.5 sm:p-3.5 bg-white border border-[#0D0D0D]/10 rounded-xl hover:border-[#E63E26] transition-colors shadow-sm">
                <CheckCircle2 className="w-3.5 sm:w-4 h-3.5 sm:h-4 text-[#E63E26] shrink-0" />
                <span className="truncate font-bold">Retention Pacing</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 sm:p-3.5 bg-white border border-[#0D0D0D]/10 rounded-xl hover:border-[#E63E26] transition-colors shadow-sm">
                <CheckCircle2 className="w-3.5 sm:w-4 h-3.5 sm:h-4 text-[#E63E26] shrink-0" />
                <span className="truncate font-bold">DaVinci Science</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 sm:p-3.5 bg-white border border-[#0D0D0D]/10 rounded-xl hover:border-[#E63E26] transition-colors shadow-sm">
                <CheckCircle2 className="w-3.5 sm:w-4 h-3.5 sm:h-4 text-[#E63E26] shrink-0" />
                <span className="truncate font-bold">Spatial Audio Mix</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 sm:p-3.5 bg-white border border-[#0D0D0D]/10 rounded-xl hover:border-[#E63E26] transition-colors shadow-sm">
                <CheckCircle2 className="w-3.5 sm:w-4 h-3.5 sm:h-4 text-[#E63E26] shrink-0" />
                <span className="truncate font-bold">24-48H Turnaround</span>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Editing Philosophy */}
      <section className="bg-white border border-[#0D0D0D]/10 rounded-xl sm:rounded-2xl p-4 sm:p-12 md:p-16 space-y-4 sm:space-y-8 shadow-sm">
        <div className="space-y-1 sm:space-y-2 max-w-2xl">
          <span className="font-mono text-xs text-[#E63E26] tracking-widest uppercase font-bold">
            THE EDITING PHILOSOPHY
          </span>
          <h2 className="text-xl sm:text-4xl font-display font-black text-[#0D0D0D] uppercase">
            WHY EDITING MATTERS MORE THAN GEAR.
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-8 pt-3 sm:pt-4 border-t border-[#0D0D0D]/10 text-xs sm:text-sm text-[#0D0D0D]/70 font-sans leading-relaxed">
          <div className="space-y-1 sm:space-y-2">
            <span className="font-mono text-[11px] sm:text-xs text-[#E63E26] block uppercase font-bold">
              01 / The First 3 Seconds
            </span>
            <p>
              In digital video, the hook, pattern interrupt, and opening audio cue must grab viewers instantly.
            </p>
          </div>

          <div className="space-y-1 sm:space-y-2">
            <span className="font-mono text-[11px] sm:text-xs text-[#E63E26] block uppercase font-bold">
              02 / Rhythm Over Flash
            </span>
            <p>
              Great editing is musical: knowing when to speed up the cut, when to let a quiet frame breathe, and when to drop the bass.
            </p>
          </div>

          <div className="space-y-1 sm:space-y-2">
            <span className="font-mono text-[11px] sm:text-xs text-[#E63E26] block uppercase font-bold">
              03 / Uncompromising Delivery
            </span>
            <p>
              Full color grading, matched sound design, custom subtitle graphics, and clean 4K/UHD master exports.
            </p>
          </div>
        </div>
      </section>

      {/* Services Breakdown */}
      <ServicesSection />

      {/* Bottom CTA */}
      <section className="text-center py-8 sm:py-16 space-y-4 sm:space-y-6 border-t border-[#0D0D0D]/10">
        <h3 className="text-2xl sm:text-4xl font-display font-black text-[#0D0D0D]">
          LET'S WORK TOGETHER.
        </h3>
        <p className="text-xs sm:text-sm text-[#0D0D0D]/70 max-w-md mx-auto">
          Have raw footage ready to transform? Let's discuss your project scope directly on WhatsApp or Gmail.
        </p>
        <div className="pt-2 sm:pt-4">
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-6 sm:px-8 py-3.5 sm:py-4 bg-[#0D0D0D] hover:bg-[#E63E26] text-white font-mono font-bold text-[10px] sm:text-xs uppercase tracking-wider rounded-xl transition-all shadow-xl hover:scale-[1.02]"
          >
            <span>START A PROJECT</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
};
