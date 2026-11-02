import React from 'react';
import { ArrowRight, HardDrive } from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';
import { VideoPlayer } from '../ui/VideoPlayer';
import { ScrollReveal } from '../ui/ScrollReveal';

export const ShowreelSection: React.FC = () => {
  const { data: portfolioData } = usePortfolio();
  return (
    <section id="showreel" className="py-24 md:py-32 px-6 md:px-12 max-w-7xl mx-auto border-t border-white/8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <ScrollReveal direction="down">
            <span className="font-mono text-xs text-white tracking-widest uppercase block mb-2 font-semibold">
              01 / SHOWREEL
            </span>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-display font-extrabold uppercase tracking-tight text-[#F4F4F5]">
              {portfolioData.showreel.subtitle}
            </h2>
          </ScrollReveal>
        </div>

        <ScrollReveal delay={0.2}>
          <p className="text-sm md:text-base text-[#A1A1AA] max-w-md font-sans">
            {portfolioData.showreel.description}
          </p>
        </ScrollReveal>
      </div>

      {/* Featured Large Video Player */}
      <ScrollReveal delay={0.3}>
        <div className="relative max-w-md mx-auto rounded-2xl overflow-hidden bg-[#111115] border border-white/10 p-2 sm:p-4 shadow-2xl">
          <VideoPlayer
            videoUrl={portfolioData.showreel.videoUrl}
            googleDriveUrl={portfolioData.showreel.googleDriveUrl}
            previewVideoUrl={portfolioData.showreel.previewVideoUrl}
            posterImage={portfolioData.showreel.posterImage}
            title={portfolioData.showreel.title}
            sourceType="google-drive"
            aspectRatio="vertical"
            showDriveCta={true}
          />
        </div>
      </ScrollReveal>

      {/* Tags & Full Reel Drive Link */}
      <ScrollReveal delay={0.4}>
        <div className="mt-8 pt-6 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-wrap items-center gap-2 sm:gap-3 justify-center md:justify-start">
            {portfolioData.showreel.tags.map((tag) => (
              <span
                key={tag}
                className="px-3.5 py-1.5 bg-[#17171C] border border-white/10 rounded-full text-[11px] font-mono tracking-wider text-[#F4F4F5]"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <a
              href={portfolioData.masterDriveFolder || portfolioData.showreel.googleDriveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2.5 px-7 py-3.5 bg-white hover:bg-neutral-200 text-black font-mono font-bold text-xs uppercase tracking-widest rounded-xl border border-white transition-all duration-300 shadow-xl hover:scale-[1.02] active:scale-95"
            >
              <HardDrive className="w-4 h-4 text-black" />
              <span>EXPLORE ALL FILES ON DRIVE</span>
              <ArrowRight className="w-3.5 h-3.5 text-black group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
};
