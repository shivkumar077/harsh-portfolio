import React, { useState } from 'react';
import { Star, CheckCircle, MessageSquare } from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';
import { ScrollReveal } from '../ui/ScrollReveal';

export const TestimonialsSection: React.FC = () => {
  const { data: portfolioData } = usePortfolio();
  const [isPaused, setIsPaused] = useState(false);

  if (!portfolioData.testimonials || portfolioData.testimonials.length === 0) {
    return null;
  }

  // Duplicate items so there is continuous, gapless looping across any display
  const marqueeList = [
    ...portfolioData.testimonials,
    ...portfolioData.testimonials,
    ...portfolioData.testimonials
  ];

  return (
    <section id="testimonials" className="py-14 sm:py-24 md:py-32 overflow-hidden border-t border-[#0D0D0D]/10 bg-[#ECEBE8]">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 flex flex-col md:flex-row md:items-end justify-between gap-4 sm:gap-6 mb-8 sm:mb-12">
        <div>
          <ScrollReveal direction="down">
            <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-3.5 py-1 sm:py-1.5 bg-[#0D0D0D] text-white rounded-full text-[11px] sm:text-xs font-mono mb-2 sm:mb-3">
              <MessageSquare className="w-3.5 h-3.5 text-[#E63E26]" />
              <span>06 / CLIENT VOICES & RESULTS</span>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <h2 className="text-2xl sm:text-5xl md:text-6xl font-display font-black uppercase tracking-tight text-[#0D0D0D] leading-tight">
              WORDS FROM <br />
              <span className="text-[#E63E26]">CLIENTS & CREATORS.</span>
            </h2>
          </ScrollReveal>
        </div>

        <ScrollReveal delay={0.2}>
          <p className="text-xs sm:text-sm md:text-base text-[#0D0D0D]/70 max-w-md font-sans leading-relaxed">
            Direct feedback and campaign outcomes from collaborating creators, brand founders, and creative directors. Hover to pause.
          </p>
        </ScrollReveal>
      </div>

      {/* Continuous Left-to-Right Sliding Track with Small Boxes */}
      <div className="relative w-full overflow-hidden py-2 select-none">
        {/* Soft Edge Blurs */}
        <div className="absolute top-0 bottom-0 left-0 w-8 sm:w-20 bg-gradient-to-r from-[#ECEBE8] to-transparent z-10 pointer-events-none" />
        <div className="absolute top-0 bottom-0 right-0 w-8 sm:w-20 bg-gradient-to-l from-[#ECEBE8] to-transparent z-10 pointer-events-none" />

        <div
          className="w-full overflow-hidden"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={() => setIsPaused(true)}
          onTouchEnd={() => setIsPaused(false)}
        >
          <div
            className={`flex gap-3.5 sm:gap-5 w-max animate-marquee-reviews ${
              isPaused ? 'paused' : ''
            }`}
          >
            {marqueeList.map((test, index) => {
              const authorName = test.author || test.clientName || 'Client';
              const authorRole = test.clientRole || test.role || '';
              const quoteText = test.quote || test.content || '';
              const initials = authorName
                .split(' ')
                .map((n) => n[0])
                .join('')
                .slice(0, 2);

              return (
                <div
                  key={`test-${test.id || index}-${index}`}
                  className="w-[280px] sm:w-[320px] md:w-[350px] shrink-0 bg-white border border-[#0D0D0D]/12 hover:border-[#E63E26] rounded-xl sm:rounded-2xl p-4 sm:p-5 flex flex-col justify-between space-y-3.5 sm:space-y-4 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 group"
                >
                  <div className="space-y-2.5">
                    {/* Top Bar: Stars + Metric */}
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-0.5 text-[#E63E26]">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-[#E63E26] text-[#E63E26]" />
                        ))}
                      </div>

                      {test.metric && (
                        <span className="px-2 py-0.5 bg-[#0D0D0D]/5 border border-[#0D0D0D]/10 rounded-md text-[9px] sm:text-[10px] font-mono font-bold text-[#0D0D0D]">
                          {test.metric}
                        </span>
                      )}
                    </div>

                    {/* Quote Text */}
                    <p className="text-xs sm:text-[13px] text-[#0D0D0D]/85 font-sans leading-relaxed line-clamp-3">
                      "{quoteText}"
                    </p>
                  </div>

                  {/* Author Row */}
                  <div className="pt-2.5 border-t border-[#0D0D0D]/10 flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#0D0D0D] text-white flex items-center justify-center font-display font-bold text-[10px] sm:text-[11px] group-hover:bg-[#E63E26] transition-colors shrink-0">
                        {initials}
                      </div>
                      <div className="min-w-0">
                        <h4 className="font-display font-bold text-xs text-[#0D0D0D] truncate">
                          {authorName}
                        </h4>
                        <p className="text-[9px] sm:text-[10px] font-mono text-[#0D0D0D]/60 truncate">
                          {authorRole}
                        </p>
                      </div>
                    </div>

                    <div className="inline-flex items-center gap-1 text-[10px] font-mono text-[#0D0D0D]/60 shrink-0">
                      <CheckCircle className="w-3 h-3 text-[#E63E26]" />
                      <span className="hidden xs:inline">Verified</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
