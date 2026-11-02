import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Sparkles, Video, Flame, Play, Palette, MessageSquare, CheckCircle2, ChevronDown } from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';
import { ScrollReveal } from '../ui/ScrollReveal';

export const ServicesSection: React.FC = () => {
  const { data: portfolioData } = usePortfolio();
  const contact = portfolioData.contact || ({} as any);
  const cleanWhatsAppNumber = (contact.whatsappNumber || contact.whatsapp || '').replace(/[^0-9]/g, '') || '15550192834';
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const serviceIcons = [
    {
      icon: Video,
      bullet: '4K Master Cut & Sound Mix',
      turnaround: '2-4 Days Turnaround'
    },
    {
      icon: Flame,
      bullet: 'Hook-Optimized 9:16 Pacing',
      turnaround: '24-48h Fast Delivery'
    },
    {
      icon: Play,
      bullet: 'High-Converting Direct Response',
      turnaround: '24-48h Fast Delivery'
    },
    {
      icon: Palette,
      bullet: 'DaVinci Resolve Color Science',
      turnaround: '2-3 Days Turnaround'
    }
  ];

  return (
    <section id="services" className="py-14 sm:py-24 md:py-32 px-4 sm:px-6 md:px-12 max-w-7xl mx-auto border-t border-[#0D0D0D]/10 relative bg-[#ECEBE8]">
      {/* Header */}
      <div className="mb-8 sm:mb-12 relative space-y-4 sm:space-y-6">
        <ScrollReveal direction="down">
          <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-3.5 py-1 sm:py-1.5 bg-[#E63E26]/10 border border-[#E63E26]/30 rounded-full text-[11px] sm:text-xs font-mono text-[#E63E26] font-bold">
            <Sparkles className="w-3.5 h-3.5 text-[#E63E26]" />
            <span>03 / CORE EDITING SERVICES</span>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <h2 className="text-xl sm:text-3xl md:text-5xl lg:text-6xl font-display font-black uppercase tracking-tight text-[#0D0D0D] leading-[1.08]">
            <span className="block whitespace-nowrap">SPECIALIZED POST-PRODUCTION</span>
            <span className="block text-[#E63E26] whitespace-nowrap">TAILORED FOR IMPACT.</span>
          </h2>
        </ScrollReveal>

        {/* Well-placed description row with comfortable width & visual balance */}
        <ScrollReveal delay={0.2}>
          <div className="pt-1 sm:pt-2 border-l-2 border-[#E63E26] pl-4 sm:pl-5">
            <p className="text-xs sm:text-sm md:text-base text-[#4A4A4F] font-sans leading-relaxed max-w-2xl">
              High-converting short-form, cinematic commercials, performance UGC ads, and surgical DaVinci color grading designed to retain viewers and scale brand authority.
            </p>
          </div>
        </ScrollReveal>
      </div>

      {/* Horizontal Compact Services Accordion Boxes */}
      <div className="space-y-3 sm:space-y-4 relative">
        {portfolioData.services.map((service, index) => {
          const config = serviceIcons[index] || serviceIcons[0];
          const IconComponent = config.icon;
          const isOpen = openIndex === index;

          return (
            <ScrollReveal key={service.number} delay={0.05 * index}>
              <div 
                className={`group rounded-xl sm:rounded-2xl border transition-all duration-300 bg-white shadow-sm overflow-hidden ${
                  isOpen 
                    ? 'border-[#E63E26] shadow-md' 
                    : 'border-[#0D0D0D]/15 hover:border-[#E63E26]/60 hover:shadow-md'
                }`}
              >
                {/* Horizontal Header Box - Click to Open / Close */}
                <div
                  role="button"
                  tabIndex={0}
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setOpenIndex(isOpen ? null : index);
                    }
                  }}
                  className="w-full flex items-center justify-between p-3.5 sm:p-5 cursor-pointer select-none"
                >
                  {/* Left: Icon + Number + Title & Subtitle */}
                  <div className="flex items-center gap-3 sm:gap-4 min-w-0">
                    <div 
                      className={`w-9 h-9 sm:w-11 sm:h-11 rounded-lg sm:rounded-xl flex items-center justify-center shrink-0 transition-all duration-300 ${
                        isOpen 
                          ? 'bg-[#E63E26] text-white shadow-sm' 
                          : 'bg-[#0D0D0D] text-white group-hover:bg-[#E63E26]'
                      }`}
                    >
                      <IconComponent className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-center gap-0.5 sm:gap-3 min-w-0">
                      <span className="font-mono text-[10px] sm:text-xs font-bold text-[#E63E26] shrink-0">
                        SERVICE #{service.number}
                      </span>
                      <h3 className="text-sm sm:text-lg md:text-xl font-display font-black text-[#0D0D0D] group-hover:text-[#E63E26] transition-colors uppercase tracking-tight truncate">
                        {service.title}
                      </h3>
                      <span className="hidden lg:inline-block text-xs font-mono text-[#76767D] font-medium truncate">
                        — {service.subtitle}
                      </span>
                    </div>
                  </div>

                  {/* Right: Turnaround Pill + Arrow Open Feature */}
                  <div className="flex items-center gap-2 sm:gap-3 shrink-0 ml-2">
                    <span className="hidden sm:inline-block px-2.5 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-[11px] font-mono font-bold tracking-wider uppercase border border-[#0D0D0D]/12 bg-[#ECEBE8] text-[#0D0D0D]">
                      {config.turnaround}
                    </span>

                    <div 
                      className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center border transition-all duration-300 ${
                        isOpen 
                          ? 'bg-[#E63E26] border-[#E63E26] text-white rotate-180' 
                          : 'bg-[#ECEBE8] border-[#0D0D0D]/15 text-[#0D0D0D] group-hover:border-[#E63E26] group-hover:text-[#E63E26]'
                      }`}
                    >
                      <ChevronDown className="w-4 h-4 sm:w-4.5 sm:h-4.5 transition-transform duration-300" />
                    </div>
                  </div>
                </div>

                {/* Collapsible Content - Opens smoothly with arrow */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key={`content-${service.number}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.28, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <div className="px-3.5 sm:px-5 pb-4 sm:pb-6 pt-2 border-t border-[#0D0D0D]/10 space-y-4">
                        {/* Subtitle visible on smaller screens */}
                        <p className="lg:hidden text-[11px] font-mono text-[#E63E26] font-bold uppercase">
                          {service.subtitle}
                        </p>

                        {/* Description */}
                        <p className="text-xs sm:text-sm md:text-base text-[#4A4A4F] font-sans leading-relaxed">
                          {service.description}
                        </p>

                        {/* Bullet highlight + Tags */}
                        <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
                          <div className="inline-flex items-center gap-2 text-[11px] sm:text-xs font-mono text-[#0D0D0D] bg-[#ECEBE8] border border-[#0D0D0D]/10 px-3 py-1.5 rounded-lg font-semibold">
                            <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#E63E26] shrink-0" />
                            <span>{config.bullet}</span>
                          </div>

                          <div className="flex flex-wrap gap-1.5 sm:gap-2">
                            {service.tags.map((tag) => (
                              <span
                                key={tag}
                                className="text-[10px] sm:text-[11px] font-mono font-semibold px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-md border border-[#0D0D0D]/10 bg-[#ECEBE8] text-[#0D0D0D]"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Card Footer: WhatsApp Direct Link */}
                        <div className="pt-3 sm:pt-4 border-t border-[#0D0D0D]/10 flex items-center justify-between">
                          <span className="text-[10px] sm:text-[11px] font-mono text-[#76767D] font-bold tracking-wider uppercase">
                            4K MASTER • {config.turnaround}
                          </span>

                          <a
                            href={`https://wa.me/${cleanWhatsAppNumber}?text=Hi%20${encodeURIComponent(portfolioData.brandName)}%2C%20I%20am%20interested%20in%20your%20${encodeURIComponent(service.title)}%20service!`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 px-3 sm:px-4 py-2 rounded-lg bg-[#0D0D0D] hover:bg-[#E63E26] text-white text-[11px] sm:text-xs font-mono font-bold tracking-wider uppercase transition-all duration-200 shadow-sm"
                          >
                            <MessageSquare className="w-3.5 h-3.5" />
                            <span>BOOK SERVICE</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </a>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </ScrollReveal>
          );
        })}
      </div>
    </section>
  );
};
