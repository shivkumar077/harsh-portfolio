import React, { useState } from 'react';
import { Sparkles, Wand2, Volume2, Film } from 'lucide-react';
import { BeforeAfterSlider } from '../ui/BeforeAfterSlider';
import { ScrollReveal } from '../ui/ScrollReveal';

export const BeforeAfterSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'cinematic' | 'streetwear' | 'commercial'>('cinematic');

  const comparisons = {
    cinematic: {
      raw: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=1400&auto=format&fit=crop&sat=-85&con=-30&bri=-10',
      final: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=1400&auto=format&fit=crop',
      title: 'Cinematic Mountain Expedition',
      tags: ['S-Log3 to Film Emulation', 'DaVinci Resolve Grade', 'Dynamic Contrast Lift'],
    },
    streetwear: {
      raw: 'https://images.unsplash.com/photo-1516251193007-45ef944ab0c6?q=80&w=1400&auto=format&fit=crop&sat=-90&con=-20',
      final: 'https://images.unsplash.com/photo-1516251193007-45ef944ab0c6?q=80&w=1400&auto=format&fit=crop',
      title: 'Urban Streetwear Campaign',
      tags: ['High-Contrast Split Tone', 'Kinetic Motion VFX', 'Punchy Shadow Curve'],
    },
    commercial: {
      raw: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1400&auto=format&fit=crop&sat=-80',
      final: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1400&auto=format&fit=crop',
      title: 'Acoustic Product Commercial',
      tags: ['Commercial Studio Grade', 'Surface Detail Isolation', 'Warm Accent Balance'],
    },
  };

  const current = comparisons[activeTab];

  return (
    <section className="py-14 sm:py-24 md:py-32 px-4 sm:px-6 md:px-12 max-w-7xl mx-auto border-t border-[#0D0D0D]/10 bg-[#ECEBE8]">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 sm:gap-6 mb-6 sm:mb-12">
        <div>
          <ScrollReveal direction="down">
            <span className="font-mono text-xs text-[#E63E26] tracking-widest uppercase block mb-1.5 sm:mb-2 font-bold">
              02 / POST-PRODUCTION FINISH
            </span>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <h2 className="text-2xl sm:text-5xl md:text-6xl font-display font-black uppercase tracking-tight text-[#0D0D0D] leading-[1.08]">
              RAW FOOTAGE <br />
              <span className="text-[#0D0D0D]/50">TO MASTER CUT.</span>
            </h2>
          </ScrollReveal>
        </div>

        {/* Tab Selection */}
        <ScrollReveal delay={0.2}>
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 bg-white p-1 sm:p-1.5 rounded-full border border-[#0D0D0D]/15 shadow-xs">
            {(['cinematic', 'streetwear', 'commercial'] as const).map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                className={`px-3.5 sm:px-4 py-1 sm:py-1.5 rounded-full text-[10px] sm:text-xs font-mono uppercase tracking-wider transition-all ${
                  activeTab === tab
                    ? 'bg-[#0D0D0D] text-white font-bold shadow-sm'
                    : 'text-[#0D0D0D]/70 hover:text-[#E63E26]'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </ScrollReveal>
      </div>

      {/* Interactive Draggable Slider */}
      <ScrollReveal delay={0.2}>
        <BeforeAfterSlider
          rawImage={current.raw}
          finalImage={current.final}
          rawLabel="RAW FLAT FOOTAGE (S-LOG)"
          finalLabel="FINAL DAVINCI COLOR & POLISH"
          description="Good editing isn't about adding noise. It's knowing exactly what to amplify."
        />
      </ScrollReveal>

      {/* Breakdown Pillars: 2-columns on mobile (2x2 grid) */}
      <ScrollReveal delay={0.3}>
        <div className="mt-6 sm:mt-12 grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-6 pt-6 sm:pt-8 border-t border-[#0D0D0D]/10">
          <div className="bg-white border border-[#0D0D0D]/15 p-3.5 sm:p-5 rounded-xl space-y-1.5 sm:space-y-2 shadow-xs hover:border-[#E63E26] transition-colors">
            <div className="flex items-center gap-1.5 sm:gap-2 text-[#0D0D0D] text-[11px] sm:text-xs font-mono font-bold">
              <Film className="w-3.5 sm:w-4 h-3.5 sm:h-4 text-[#E63E26] shrink-0" />
              <span className="truncate">COLOR SCIENCE</span>
            </div>
            <p className="text-[11px] sm:text-xs text-[#52525B] leading-relaxed line-clamp-3 sm:line-clamp-none">
              Precision LUTs, skin-tone isolation, gamut mapping, and custom film print emulation.
            </p>
          </div>

          <div className="bg-white border border-[#0D0D0D]/15 p-3.5 sm:p-5 rounded-xl space-y-1.5 sm:space-y-2 shadow-xs hover:border-[#E63E26] transition-colors">
            <div className="flex items-center gap-1.5 sm:gap-2 text-[#0D0D0D] text-[11px] sm:text-xs font-mono font-bold">
              <Volume2 className="w-3.5 sm:w-4 h-3.5 sm:h-4 text-[#E63E26] shrink-0" />
              <span className="truncate">SPATIAL AUDIO</span>
            </div>
            <p className="text-[11px] sm:text-xs text-[#52525B] leading-relaxed line-clamp-3 sm:line-clamp-none">
              Multi-layer risers, impacts, foley, vocal de-essing, ambient soundscapes, and beat-locked dynamics.
            </p>
          </div>

          <div className="bg-white border border-[#0D0D0D]/15 p-3.5 sm:p-5 rounded-xl space-y-1.5 sm:space-y-2 shadow-xs hover:border-[#E63E26] transition-colors">
            <div className="flex items-center gap-1.5 sm:gap-2 text-[#0D0D0D] text-[11px] sm:text-xs font-mono font-bold">
              <Wand2 className="w-3.5 sm:w-4 h-3.5 sm:h-4 text-[#E63E26] shrink-0" />
              <span className="truncate">AI MOTION & VFX</span>
            </div>
            <p className="text-[11px] sm:text-xs text-[#52525B] leading-relaxed line-clamp-3 sm:line-clamp-none">
              Custom kinetic subtitles, 3D object tracking, screen mockups, and seamless speed ramps.
            </p>
          </div>

          <div className="bg-white border border-[#0D0D0D]/15 p-3.5 sm:p-5 rounded-xl space-y-1.5 sm:space-y-2 shadow-xs hover:border-[#E63E26] transition-colors">
            <div className="flex items-center gap-1.5 sm:gap-2 text-[#0D0D0D] text-[11px] sm:text-xs font-mono font-bold">
              <Sparkles className="w-3.5 sm:w-4 h-3.5 sm:h-4 text-[#E63E26] shrink-0" />
              <span className="truncate">RETENTION PACING</span>
            </div>
            <p className="text-[11px] sm:text-xs text-[#52525B] leading-relaxed line-clamp-3 sm:line-clamp-none">
              Cut dead air, fast hook construction, visual pattern interrupts, and rhythm that retains viewers.
            </p>
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
};
