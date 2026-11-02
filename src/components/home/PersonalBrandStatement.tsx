import React from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { ScrollReveal } from '../ui/ScrollReveal';

export const PersonalBrandStatement: React.FC = () => {
  const { data: portfolioData } = usePortfolio();
  return (
    <section className="py-24 md:py-36 px-6 md:px-12 max-w-7xl mx-auto border-t border-white/8 text-center relative overflow-hidden">
      {/* AI Glow highlight */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[320px] bg-[#00F0FF]/10 rounded-full blur-[150px] pointer-events-none -z-10" />

      <div className="max-w-4xl mx-auto space-y-8">
        <ScrollReveal delay={0.1}>
          <h2 className="text-3xl sm:text-5xl md:text-7xl font-display font-black uppercase tracking-tighter text-[#F5F5F7] leading-[1.0]">
            {portfolioData.brandStatement}
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <p className="text-lg sm:text-2xl md:text-3xl text-[#94A3B8] font-sans font-light leading-relaxed max-w-2xl mx-auto">
            {portfolioData.brandSubtext}
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
};
