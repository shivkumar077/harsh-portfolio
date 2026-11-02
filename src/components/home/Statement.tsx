import React from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { ScrollReveal } from '../ui/ScrollReveal';

export const Statement: React.FC = () => {
  const { data: portfolioData } = usePortfolio();
  return (
    <section id="statement" className="py-28 md:py-36 px-6 md:px-12 max-w-7xl mx-auto border-t border-white/8 relative">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Editorial Index Number */}
        <div className="lg:col-span-3">
          <ScrollReveal direction="down">
            <span className="font-mono text-xs text-white tracking-widest uppercase block font-semibold">
              EDITORIAL STATEMENT
            </span>
            <span className="font-display text-4xl md:text-5xl font-bold text-white/10 block mt-2">
              00
            </span>
          </ScrollReveal>
        </div>

        {/* Large Statement Headline & Body */}
        <div className="lg:col-span-9 space-y-8">
          <ScrollReveal delay={0.1}>
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-display font-extrabold uppercase tracking-tight text-[#F4F4F5] leading-[1.05]">
              {portfolioData.editorialStatement}
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <p className="text-base sm:text-xl md:text-2xl text-[#A1A1AA] font-sans font-light leading-relaxed max-w-3xl">
              {portfolioData.editorialParagraph}
            </p>
          </ScrollReveal>

          {/* Core Pillars */}
          <ScrollReveal delay={0.3}>
            <div className="pt-8 grid grid-cols-2 sm:grid-cols-4 gap-6 border-t border-white/10 text-xs font-mono text-[#F4F4F5]">
              <div className="p-4 bg-[#111115] border border-white/5 rounded-xl">
                <span className="text-white block mb-1 font-bold">01 / RHYTHM</span>
                <span className="text-[#A1A1AA]">Dynamic pacing tuned to human attention spans.</span>
              </div>
              <div className="p-4 bg-[#111115] border border-white/5 rounded-xl">
                <span className="text-white block mb-1 font-bold">02 / COLOR</span>
                <span className="text-[#A1A1AA]">Surgical DaVinci grade & filmic tonality.</span>
              </div>
              <div className="p-4 bg-[#111115] border border-white/5 rounded-xl">
                <span className="text-white block mb-1 font-bold">03 / AUDIO</span>
                <span className="text-[#A1A1AA]">Layered SFX & crisp spatial sound mix.</span>
              </div>
              <div className="p-4 bg-[#111115] border border-white/5 rounded-xl">
                <span className="text-white block mb-1 font-bold">04 / UGC & ADS</span>
                <span className="text-[#A1A1AA]">High-converting creator and commercial performance.</span>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};
