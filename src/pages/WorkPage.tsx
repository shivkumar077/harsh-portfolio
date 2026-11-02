import React, { useState, useMemo } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { ProjectCard } from '../components/ui/ProjectCard';
import { ScrollReveal } from '../components/ui/ScrollReveal';
import { Film, ArrowRight, HardDrive } from 'lucide-react';

export const WorkPage: React.FC = () => {
  const { data: portfolioData } = usePortfolio();
  const contact = portfolioData.contact || ({} as any);
  const cleanWhatsAppNumber = (contact.whatsappNumber || contact.whatsapp || '').replace(/[^0-9]/g, '') || '15550192834';
  const displayEmail = contact.email || 'alex.rivera.edits@gmail.com';
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');

  const categories = useMemo(() => {
    const cats = Array.from(new Set(portfolioData.projects.map((p) => p.category.toUpperCase())));
    return ['ALL', ...cats];
  }, [portfolioData.projects]);

  const filteredProjects = useMemo(() => {
    if (selectedCategory === 'ALL') {
      return portfolioData.projects;
    }
    return portfolioData.projects.filter(
      (p) => p.category.toUpperCase() === selectedCategory.toUpperCase()
    );
  }, [selectedCategory, portfolioData.projects]);

  return (
    <div className="pt-24 pb-16 sm:pt-32 sm:pb-24 px-4 sm:px-6 md:px-12 max-w-7xl mx-auto">
      {/* Page Header */}
      <div className="space-y-4 sm:space-y-6 max-w-4xl mb-8 sm:mb-12">
        <ScrollReveal direction="down">
          <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-3.5 py-1 sm:py-1.5 bg-[#0D0D0D] text-white rounded-full text-[11px] sm:text-xs font-mono">
            <Film className="w-3.5 h-3.5 text-[#E63E26]" />
            <span>PORTFOLIO & VERTICAL PREVIEWS</span>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <h1 className="text-3xl sm:text-6xl md:text-7xl font-display font-black uppercase tracking-tight text-[#0D0D0D] leading-[1.12]">
            ALL VIDEO EDITS.
          </h1>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <div className="space-y-4 sm:space-y-6">
            <p className="text-xs sm:text-lg text-[#0D0D0D]/70 font-sans font-light leading-relaxed max-w-2xl">
              Live uncompressed video deliverables. Filter by category or explore the entire raw archive directly on Google Drive.
            </p>

            <div>
              <a
                href={portfolioData.masterDriveFolder || "https://drive.google.com/drive/folders/1-fAPohvDgHQ8tLt3TJAOscRYUVtHhLlL?usp=drive_link"}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative inline-flex items-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3.5 bg-[#0D0D0D] hover:bg-[#E63E26] text-white font-mono font-bold text-[10px] sm:text-xs uppercase tracking-wider rounded-xl transition-all duration-300 shadow-xl hover:scale-[1.02] active:scale-95"
              >
                <HardDrive className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#E63E26] group-hover:text-white transition-colors" />
                <span>MASTER DRIVE VAULT</span>
                <ArrowRight className="w-3.5 h-3.5 text-white group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>
        </ScrollReveal>
      </div>

      {/* Filter Tabs */}
      <ScrollReveal delay={0.3}>
        <div className="flex flex-wrap items-center gap-2 pb-10 border-b border-[#0D0D0D]/10 mb-12">
          {categories.map((cat) => {
            const count =
              cat === 'ALL'
                ? portfolioData.projects.length
                : portfolioData.projects.filter(
                    (p) => p.category.toUpperCase() === cat.toUpperCase()
                  ).length;

            return (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-mono uppercase tracking-wider transition-all duration-200 flex items-center gap-2 ${
                  selectedCategory === cat
                    ? 'bg-[#0D0D0D] text-white font-bold shadow-md'
                    : 'bg-white text-[#0D0D0D] hover:text-[#E63E26] border border-[#0D0D0D]/10 hover:border-[#E63E26]'
                }`}
              >
                <span>{cat}</span>
                <span className={`text-[10px] ${selectedCategory === cat ? 'text-neutral-400' : 'text-[#0D0D0D]/50'}`}>
                  ({count})
                </span>
              </button>
            );
          })}
        </div>
      </ScrollReveal>

      {/* Vertical Projects Grid: 2-columns on mobile, 4 on desktop */}
      {filteredProjects.length > 0 ? (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-6">
          {filteredProjects.map((project, index) => (
            <ScrollReveal key={project.id} delay={0.06 * (index % 4)}>
              <ProjectCard project={project} />
            </ScrollReveal>
          ))}
        </div>
      ) : (
        <div className="py-20 text-center space-y-4 bg-white border border-[#0D0D0D]/10 rounded-2xl">
          <p className="text-sm font-mono text-[#0D0D0D]/70">
            No projects found in this category.
          </p>
          <button
            type="button"
            onClick={() => setSelectedCategory('ALL')}
            className="px-5 py-2 bg-[#0D0D0D] text-white text-xs font-mono font-bold uppercase rounded-xl shadow-md hover:bg-[#E63E26] transition-colors"
          >
            SHOW ALL PROJECTS
          </button>
        </div>
      )}

      {/* Bottom Conversion CTA */}
      <div className="mt-12 sm:mt-24 pt-8 sm:pt-16 border-t border-[#0D0D0D]/10 text-center space-y-4 sm:space-y-6">
        <ScrollReveal delay={0.2}>
          <h3 className="text-xl sm:text-4xl font-display font-black text-[#0D0D0D]">
            HAVE A VIDEO PROJECT IN MIND?
          </h3>
          <p className="text-xs sm:text-base text-[#0D0D0D]/70 max-w-lg mx-auto pt-1 sm:pt-2">
            Let's discuss footage requirements, style, and timeline directly on WhatsApp or Gmail.
          </p>
          <div className="pt-4 sm:pt-6 grid grid-cols-2 sm:flex sm:flex-row items-center justify-center gap-2 sm:gap-4">
            <a
              href={`https://wa.me/${cleanWhatsAppNumber}?text=Hi%20${encodeURIComponent(portfolioData.brandName)}%2C%20I%20saw%20your%20video%20portfolio%20and%20would%20like%20to%20discuss%20a%20project!`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-1.5 sm:gap-2.5 px-3 sm:px-8 py-3 sm:py-4 bg-[#0D0D0D] hover:bg-[#E63E26] text-white font-mono font-bold text-[10px] sm:text-xs uppercase tracking-wider rounded-xl transition-all shadow-xl hover:scale-[1.02] active:scale-95 text-center"
            >
              <span className="truncate">WHATSAPP</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>

            <a
              href={`https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(displayEmail)}&su=Video%20Editing%20Project%20Inquiry%20-%20${encodeURIComponent(portfolioData.brandName)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-8 py-3 sm:py-4 bg-white hover:bg-neutral-50 text-[#0D0D0D] font-mono font-bold text-[10px] sm:text-xs uppercase tracking-wider rounded-xl border border-[#0D0D0D]/15 transition-all shadow-md hover:scale-[1.02] active:scale-95 text-center hover:border-[#E63E26]"
            >
              <span className="truncate">EMAIL</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
};
