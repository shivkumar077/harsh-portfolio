import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Globe } from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';
import { ScrollReveal } from '../ui/ScrollReveal';

export const AboutTeaser: React.FC = () => {
  const { data: portfolioData } = usePortfolio();
  return (
    <section className="py-24 md:py-32 px-6 md:px-12 max-w-7xl mx-auto border-t border-white/8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        {/* Left Column: Portrait */}
        <div className="lg:col-span-5">
          <ScrollReveal direction="right">
            <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-[#111115] aspect-[4/5] shadow-2xl group">
              <img
                src={portfolioData.profileImage || "/profile.jpg"}
                alt={`${portfolioData.brandName} - ${portfolioData.profession}`}
                loading="lazy"
                style={{ objectPosition: 'center 32%' }}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

              <div className="absolute bottom-6 left-6 right-6 space-y-1">
                <span className="font-display font-bold text-lg text-[#F4F4F5] block">
                  {portfolioData.brandName}
                </span>
                <div className="flex items-center gap-2 text-xs font-mono text-white">
                  <Globe className="w-3.5 h-3.5" />
                  <span>{portfolioData.contact.location}</span>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>

        {/* Right Column: Bio */}
        <div className="lg:col-span-7 space-y-8">
          <div>
            <ScrollReveal direction="down">
              <span className="font-mono text-xs text-white tracking-widest uppercase block mb-2 font-semibold">
                09 / ABOUT {portfolioData.brandName.toUpperCase()}
              </span>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <h2 className="text-3xl sm:text-5xl md:text-6xl font-display font-extrabold uppercase tracking-tight text-[#F4F4F5]">
                BEHIND <br />
                <span className="text-white">THE EDIT.</span>
              </h2>
            </ScrollReveal>
          </div>

          <div className="space-y-4">
            {portfolioData.bio.map((para, i) => (
              <ScrollReveal key={i} delay={0.15 * (i + 1)}>
                <p className="text-base sm:text-lg text-[#A1A1AA] font-sans font-light leading-relaxed">
                  {para}
                </p>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal delay={0.4}>
            <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <Link
                to="/about"
                className="group inline-flex items-center justify-center gap-3 px-7 py-3.5 bg-[#17171C] hover:bg-white text-[#F4F4F5] hover:text-black font-mono font-bold text-xs uppercase tracking-widest rounded-full border border-white/10 hover:border-white transition-all duration-300"
              >
                <span>READ FULL STORY & PHILOSOPHY</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};
