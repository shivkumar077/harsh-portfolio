import React from 'react';
import { Film, Cpu } from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';
import { ScrollReveal } from '../ui/ScrollReveal';

export const ToolsSection: React.FC = () => {
  const { data: portfolioData } = usePortfolio();
  const software = portfolioData.tools.filter((t) => t.category === 'Software');
  const skills = portfolioData.tools.filter((t) => t.category === 'Skill');

  return (
    <section className="py-24 md:py-32 px-6 md:px-12 max-w-7xl mx-auto border-t border-white/8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
        <div>
          <ScrollReveal direction="down">
            <span className="font-mono text-xs text-white tracking-widest uppercase block mb-2 font-semibold">
              06 / TOOLS & TECH
            </span>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-display font-extrabold uppercase tracking-tight text-[#F4F4F5]">
              THE TOOLS BEHIND <br />
              <span className="text-white">THE EDIT</span>
            </h2>
          </ScrollReveal>
        </div>

        <ScrollReveal delay={0.2}>
          <p className="text-sm md:text-base text-[#A1A1AA] max-w-md font-sans">
            Industry-standard post-production stack combined with disciplined workflow automation.
          </p>
        </ScrollReveal>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Software Suite */}
        <div className="lg:col-span-5 bg-[#111115] border border-white/10 rounded-2xl p-6 sm:p-8 space-y-6">
          <div className="flex items-center gap-2 text-xs font-mono text-white tracking-wider uppercase font-bold">
            <Cpu className="w-4 h-4" />
            <span>PRIMARY SOFTWARE SUITE</span>
          </div>

          <div className="space-y-3">
            {software.map((tool) => (
              <div
                key={tool.name}
                className="flex items-center justify-between p-3.5 bg-[#17171C] border border-white/5 rounded-xl hover:border-white/20 transition-colors"
              >
                <span className="font-mono text-sm text-[#F4F4F5] font-medium">
                  {tool.name}
                </span>
                <span className="text-[10px] font-mono font-bold text-white bg-white/10 px-2.5 py-0.5 rounded border border-white/10">
                  PRO
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Core Post-Production Disciplines */}
        <div className="lg:col-span-7 bg-[#111115] border border-white/10 rounded-2xl p-6 sm:p-8 space-y-6 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-xs font-mono text-white tracking-wider uppercase font-bold">
              <Film className="w-4 h-4" />
              <span>CORE EDITING DISCIPLINES</span>
            </div>
            <p className="text-xs sm:text-sm text-[#A1A1AA] font-sans">
              Mastery across the full spectrum of video post-production, from fast-twitch social retention hooks to cinematic long-form documentaries and high-converting UGC.
            </p>
          </div>

          <div className="flex flex-wrap gap-2.5">
            {skills.map((skill) => (
              <span
                key={skill.name}
                className="px-4 py-2.5 bg-[#17171C] border border-white/10 hover:border-white/40 rounded-xl text-xs font-mono tracking-wider text-[#F4F4F5] hover:text-white transition-all"
              >
                {skill.name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
