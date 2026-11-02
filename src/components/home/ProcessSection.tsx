import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, FileVideo, Scissors, Palette, Send, ArrowRight } from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';
import { ScrollReveal } from '../ui/ScrollReveal';

export const ProcessSection: React.FC = () => {
  const { data: portfolioData } = usePortfolio();
  const contact = portfolioData.contact || ({} as any);
  const cleanWhatsAppNumber = (contact.whatsappNumber || contact.whatsapp || '').replace(/[^0-9]/g, '') || '15550192834';
  const stepIcons = [FileVideo, Scissors, Palette, Send];

  return (
    <section className="py-14 sm:py-24 md:py-32 px-4 sm:px-6 md:px-12 max-w-7xl mx-auto border-t border-[#0D0D0D]/10 bg-[#ECEBE8]">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 sm:gap-6 mb-8 sm:mb-16">
        <div>
          <ScrollReveal direction="down">
            <span className="font-mono text-xs text-[#E63E26] tracking-widest uppercase block mb-1.5 sm:mb-2 font-bold">
              04 / POST-PRODUCTION WORKFLOW
            </span>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <h2 className="text-2xl sm:text-5xl md:text-6xl font-display font-black uppercase tracking-tight text-[#0D0D0D] leading-[1.08]">
              HOW I WORK.
            </h2>
          </ScrollReveal>
        </div>

        <ScrollReveal delay={0.2}>
          <p className="text-xs sm:text-sm md:text-base text-[#4A4A4F] max-w-md font-sans">
            A structured, frictionless post-production workflow engineered for fast turnarounds, crystal-clear communication, and spotless quality.
          </p>
        </ScrollReveal>
      </div>

      {/* Process 4-Step Cards with Motion Effects */}
      <div className="relative">
        {/* Animated Connector Line for Desktop */}
        <div className="hidden lg:block absolute top-12 left-12 right-12 h-[2px] bg-gradient-to-r from-[#E63E26]/20 via-[#E63E26]/60 to-[#E63E26]/20 pointer-events-none -z-0" />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 relative z-10">
          {portfolioData.process.map((step, index) => {
            const StepIcon = stepIcons[index] || stepIcons[0];

            return (
              <ScrollReveal key={step.number || step.step || index} delay={0.06 * index}>
                <motion.div
                  whileHover={{ y: -6 }}
                  transition={{ duration: 0.25, ease: 'easeOut' }}
                  className="h-full bg-white border border-[#0D0D0D]/12 hover:border-[#E63E26] rounded-xl sm:rounded-2xl p-5 sm:p-6 flex flex-col justify-between space-y-4 sm:space-y-6 transition-all duration-300 hover:shadow-xl group relative overflow-hidden"
                >
                  {/* Subtle Accent Glow on Hover */}
                  <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-[#E63E26]/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                  <div className="space-y-3 sm:space-y-4 relative">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="w-8 h-8 rounded-lg bg-[#0D0D0D] group-hover:bg-[#E63E26] text-white flex items-center justify-center transition-colors shadow-xs">
                          <StepIcon className="w-4 h-4" />
                        </span>
                        <span className="font-mono text-base sm:text-xl font-black text-[#E63E26]">
                          {step.number || step.step || `0${index + 1}`}
                        </span>
                      </div>
                      <span className="w-2 h-2 rounded-full bg-[#0D0D0D]/20 group-hover:bg-[#E63E26] group-hover:scale-125 transition-all" />
                    </div>

                    <h3 className="text-sm sm:text-base font-display font-black text-[#0D0D0D] group-hover:text-[#E63E26] transition-colors uppercase leading-snug">
                      {step.title}
                    </h3>

                    <p className="text-xs sm:text-[13px] text-[#4A4A4F] font-sans leading-relaxed">
                      {step.description}
                    </p>
                  </div>

                  {/* Step Key Checklist */}
                  {step.details && step.details.length > 0 && (
                    <div className="pt-3 sm:pt-4 border-t border-[#0D0D0D]/10 space-y-1.5 sm:space-y-2 relative">
                      {step.details.map((detail) => (
                        <div key={detail} className="flex items-start gap-1.5 text-[10px] sm:text-[11px] font-mono text-[#0D0D0D]">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#E63E26] shrink-0 mt-0.5" />
                          <span className="truncate">{detail}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </motion.div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>

      {/* Bottom Process Guarantee Strip */}
      <div className="mt-8 sm:mt-12 p-4 sm:p-5 rounded-xl sm:rounded-2xl bg-white/70 border border-[#0D0D0D]/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
        <div className="flex items-center gap-2.5">
          <div className="w-2 h-2 rounded-full bg-[#E63E26] animate-ping" />
          <span className="font-mono text-[11px] sm:text-xs font-bold text-[#0D0D0D] uppercase tracking-wide">
            RAPID DELIVERY PIPELINE • 24-48H TURNAROUNDS • DIRECT GOOGLE DRIVE MASTERING
          </span>
        </div>
        <a
          href={`https://wa.me/${cleanWhatsAppNumber}?text=Hi%20${encodeURIComponent(portfolioData.brandName)}%2C%20let%27s%20discuss%20a%20project%20workflow!`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 font-mono text-xs font-bold text-[#0D0D0D] hover:text-[#E63E26] transition-colors"
        >
          <span>START PROJECT</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </a>
      </div>
    </section>
  );
};
