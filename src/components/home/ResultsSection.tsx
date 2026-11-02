import React, { useRef, useState, useEffect } from 'react';
import { useInView } from 'framer-motion';
import { usePortfolio } from '../../context/PortfolioContext';
import { ScrollReveal } from '../ui/ScrollReveal';

const AnimatedCounter: React.FC<{ value: string }> = ({ value }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-40px' });
  const [current, setCurrent] = useState<string>(() => {
    if (value.includes('100')) return '0+';
    if (value.includes('4K')) return '0K';
    if (value.includes('45')) return '+0%';
    if (value.includes('24-48')) return '0-0h';
    return '0';
  });

  useEffect(() => {
    if (!isInView) return;

    let startTime: number | null = null;
    const duration = 1800; // 1.8 seconds smooth count

    if (value === '100+') {
      const step = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / duration, 1);
        const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
        const count = Math.round(ease * 100);
        setCurrent(`${count}+`);
        if (progress < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    } else if (value === '4K') {
      const step = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / duration, 1);
        const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
        const count = Math.round(ease * 4);
        setCurrent(`${count}K`);
        if (progress < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    } else if (value === '+45%') {
      const step = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / duration, 1);
        const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
        const count = Math.round(ease * 45);
        setCurrent(`+${count}%`);
        if (progress < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    } else if (value.includes('24-48')) {
      const step = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / duration, 1);
        const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
        const start = Math.round(ease * 24);
        const end = Math.round(ease * 48);
        setCurrent(`${start}-${end}h`);
        if (progress < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    } else {
      const match = value.match(/\d+/);
      if (match) {
        const target = parseInt(match[0], 10);
        const prefix = value.slice(0, match.index);
        const suffix = value.slice((match.index || 0) + match[0].length);
        const step = (timestamp: number) => {
          if (!startTime) startTime = timestamp;
          const progress = Math.min((timestamp - startTime) / duration, 1);
          const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
          const count = Math.round(ease * target);
          setCurrent(`${prefix}${count}${suffix}`);
          if (progress < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
      } else {
        setCurrent(value);
      }
    }
  }, [isInView, value]);

  return <span ref={ref}>{current}</span>;
};

export const ResultsSection: React.FC = () => {
  const { data: portfolioData } = usePortfolio();
  if (!portfolioData.metrics || portfolioData.metrics.length === 0) {
    return null;
  }

  return (
    <section className="py-12 sm:py-20 md:py-32 px-4 sm:px-6 md:px-12 max-w-7xl mx-auto border-t border-[#0D0D0D]/10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 sm:gap-6 mb-8 sm:mb-16">
        <div>
          <ScrollReveal direction="down">
            <span className="font-mono text-xs text-[#E63E26] tracking-widest uppercase block mb-1.5 sm:mb-2 font-bold">
              05 / RESULTS & RETENTION
            </span>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <h2 className="text-2xl sm:text-5xl md:text-6xl font-display font-black uppercase tracking-tight text-[#0D0D0D] leading-[1.12]">
              EDITING THAT DOES MORE.
            </h2>
          </ScrollReveal>
        </div>

        <ScrollReveal delay={0.2}>
          <p className="text-xs sm:text-sm md:text-base text-[#0D0D0D]/70 max-w-md font-sans">
            Measurable engagement growth and audience retention improvements across client video campaigns.
          </p>
        </ScrollReveal>
      </div>

      {/* Metrics Grid with Animated Numbers */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-6">
        {portfolioData.metrics.map((metric, index) => (
          <ScrollReveal key={metric.label} delay={0.06 * index}>
            <div className="bg-white border border-[#0D0D0D]/10 rounded-xl sm:rounded-2xl p-4 sm:p-8 space-y-1 sm:space-y-2 hover:border-[#E63E26] hover:shadow-xl transition-all duration-300 group relative">
              <span className="font-display font-black text-2xl sm:text-4xl md:text-5xl text-[#0D0D0D] group-hover:text-[#E63E26] transition-colors block tabular-nums">
                <AnimatedCounter value={metric.value} />
              </span>
              <span className="font-mono text-[10px] sm:text-xs font-bold text-[#0D0D0D] tracking-wider uppercase block pt-0.5 sm:pt-1 truncate">
                {metric.label}
              </span>
              {metric.detail && (
                <span className="text-[10px] sm:text-[11px] font-sans text-[#0D0D0D]/60 block pt-0.5 sm:pt-1 line-clamp-2">
                  {metric.detail}
                </span>
              )}
            </div>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
};
