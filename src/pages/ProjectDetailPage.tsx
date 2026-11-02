import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ExternalLink, HardDrive, ChevronLeft, ChevronRight } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import { VideoPlayer } from '../components/ui/VideoPlayer';
import { BeforeAfterSlider } from '../components/ui/BeforeAfterSlider';
import { ScrollReveal } from '../components/ui/ScrollReveal';

export const ProjectDetailPage: React.FC = () => {
  const { data: portfolioData } = usePortfolio();
  const { slug } = useParams<{ slug: string }>();

  const currentIndex = portfolioData.projects.findIndex((p) => p.slug === slug);
  const project = portfolioData.projects[currentIndex];

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [slug]);

  if (!project) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center px-6 text-center space-y-6">
        <h1 className="text-3xl font-display font-black text-[#0D0D0D]">PROJECT NOT FOUND</h1>
        <p className="text-sm text-[#0D0D0D]/70">The requested project case study could not be located.</p>
        <Link
          to="/work"
          className="inline-flex items-center gap-2 px-6 py-3 bg-[#0D0D0D] hover:bg-[#E63E26] text-white font-mono text-xs font-bold uppercase rounded-xl transition-colors shadow-lg"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>RETURN TO WORK ARCHIVE</span>
        </Link>
      </div>
    );
  }

  const prevProject = currentIndex > 0 ? portfolioData.projects[currentIndex - 1] : null;
  const nextProject = currentIndex < portfolioData.projects.length - 1 ? portfolioData.projects[currentIndex + 1] : null;

  return (
    <article className="pt-32 pb-24 px-6 md:px-12 max-w-7xl mx-auto space-y-16">
      {/* Top Back Nav & Quick Info */}
      <div className="flex items-center justify-between">
        <Link
          to="/work"
          className="inline-flex items-center gap-2 text-xs font-mono text-[#0D0D0D]/70 hover:text-[#E63E26] transition-colors group font-bold"
        >
          <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
          <span>ALL VIDEO EDITS</span>
        </Link>

        <div className="flex items-center gap-2">
          <span className="px-2.5 py-1 bg-white border border-[#0D0D0D]/15 rounded font-mono text-xs text-[#0D0D0D] font-bold shadow-sm">
            PROJECT {project.number}
          </span>
          <span className="px-2.5 py-1 bg-white border border-[#0D0D0D]/10 rounded font-mono text-xs text-[#0D0D0D]/70 shadow-sm">
            {project.category} / {project.year}
          </span>
        </div>
      </div>

      {/* Project Title Header */}
      <header className="space-y-4 max-w-4xl">
        <ScrollReveal delay={0.1}>
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-display font-black uppercase tracking-tight text-[#0D0D0D]">
            {project.title}
          </h1>
        </ScrollReveal>
        <ScrollReveal delay={0.2}>
          <p className="text-base sm:text-xl text-[#0D0D0D]/70 font-sans font-light leading-relaxed">
            {project.shortDescription}
          </p>
        </ScrollReveal>
      </header>

      {/* Large Featured Video Player (Vertical 9:16 Centered) */}
      <section className="max-w-md mx-auto rounded-2xl overflow-hidden bg-white border-2 border-[#0D0D0D] p-2 sm:p-4 shadow-2xl">
        <VideoPlayer
          videoUrl={project.videoUrl}
          googleDriveUrl={project.googleDriveUrl}
          previewVideoUrl={project.previewVideoUrl}
          posterImage={project.posterImage}
          title={project.title}
          sourceType={project.videoSourceType}
          aspectRatio="vertical"
          showDriveCta={true}
        />
      </section>

      {/* Case Study Meta Breakdown */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 pt-8 border-t border-[#0D0D0D]/10">
        {/* Left 8 Cols: About, Challenge, Solution */}
        <div className="lg:col-span-8 space-y-12">
          <div className="space-y-4">
            <span className="font-mono text-xs text-[#E63E26] tracking-widest uppercase block font-bold">
              ABOUT THE EDIT
            </span>
            <p className="text-base sm:text-lg text-[#0D0D0D]/85 font-sans leading-relaxed">
              {project.fullDescription}
            </p>
          </div>

          {(project.challenge || project.solution) && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-4">
              {project.challenge && (
                <div className="bg-white border border-[#0D0D0D]/10 rounded-xl p-6 space-y-2 shadow-sm">
                  <span className="text-xs font-mono text-[#E63E26] uppercase block font-bold">THE CHALLENGE</span>
                  <p className="text-xs sm:text-sm text-[#0D0D0D]/70 leading-relaxed">{project.challenge}</p>
                </div>
              )}
              {project.solution && (
                <div className="bg-white border border-[#0D0D0D]/10 rounded-xl p-6 space-y-2 shadow-sm">
                  <span className="text-xs font-mono text-[#E63E26] uppercase block font-bold">THE EDITING SOLUTION</span>
                  <p className="text-xs sm:text-sm text-[#0D0D0D]/70 leading-relaxed">{project.solution}</p>
                </div>
              )}
            </div>
          )}

          {/* Before/After Transformation Slider if available */}
          {project.beforeAfter && (
            <div className="space-y-4 pt-6">
              <span className="font-mono text-xs text-[#E63E26] tracking-widest uppercase block font-bold">
                COLOR GRADE & FINISHING PASS
              </span>
              <BeforeAfterSlider
                rawImage={project.beforeAfter.rawImage}
                finalImage={project.beforeAfter.finalImage}
                rawLabel="BEFORE (S-LOG3 / RAW)"
                finalLabel="AFTER (FINAL MASTER)"
                description={project.beforeAfter.description}
              />
            </div>
          )}
        </div>

        {/* Right 4 Cols: Role, Tools, Client, Drive CTA */}
        <div className="lg:col-span-4 space-y-8">
          {/* Client & Year */}
          {project.client && (
            <div className="bg-white border border-[#0D0D0D]/10 rounded-xl p-5 space-y-1 shadow-sm">
              <span className="text-[10px] font-mono text-[#E63E26] uppercase block font-bold">PROJECT / CLIENT</span>
              <span className="text-sm font-display font-black text-[#0D0D0D] block">{project.client}</span>
            </div>
          )}

          {/* My Role */}
          <div className="bg-white border border-[#0D0D0D]/10 rounded-xl p-5 space-y-3 shadow-sm">
            <span className="text-xs font-mono text-[#0D0D0D] uppercase block tracking-wider font-bold">
              ROLE & SERVICES
            </span>
            <div className="flex flex-wrap gap-2">
              {project.role.map((r) => (
                <span
                  key={r}
                  className="px-3 py-1 bg-neutral-100 border border-[#0D0D0D]/10 rounded-md text-xs font-mono text-[#0D0D0D] font-semibold"
                >
                  {r}
                </span>
              ))}
            </div>
          </div>

          {/* Tools Used */}
          <div className="bg-white border border-[#0D0D0D]/10 rounded-xl p-5 space-y-3 shadow-sm">
            <span className="text-xs font-mono text-[#0D0D0D] uppercase block tracking-wider font-bold">
              SOFTWARE ENGINE
            </span>
            <div className="flex flex-wrap gap-2">
              {project.tools.map((t) => (
                <span
                  key={t}
                  className="px-3 py-1 bg-neutral-100 border border-[#0D0D0D]/10 rounded-md text-xs font-mono text-[#0D0D0D]/80"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Google Drive Full-Quality Link */}
          {project.googleDriveUrl && (
            <div className="bg-white border-2 border-[#0D0D0D] rounded-xl p-6 space-y-4 shadow-xl">
              <div className="flex items-center gap-2 text-xs font-mono text-[#0D0D0D] font-bold">
                <HardDrive className="w-4 h-4 text-[#E63E26]" />
                <span>GOOGLE DRIVE 4K MASTER</span>
              </div>
              <p className="text-xs text-[#0D0D0D]/70 font-sans">
                Stream or download the uncompressed 4K master export and timeline deliverables directly on Google Drive.
              </p>
              <a
                href={project.googleDriveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 py-3 bg-[#0D0D0D] hover:bg-[#E63E26] text-white font-mono text-xs font-bold uppercase rounded-lg transition-colors shadow-md"
              >
                <span>WATCH MASTER ON DRIVE →</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          )}
        </div>
      </section>

      {/* Prev / Next Case Study Navigation */}
      <nav className="pt-16 border-t border-[#0D0D0D]/10 grid grid-cols-1 sm:grid-cols-2 gap-6">
        {prevProject ? (
          <Link
            to={`/work/${prevProject.slug}`}
            className="p-6 bg-white hover:bg-neutral-50 border border-[#0D0D0D]/10 hover:border-[#E63E26] rounded-xl transition-all group space-y-1 shadow-sm"
          >
            <div className="flex items-center gap-1.5 text-xs font-mono text-[#0D0D0D]/60 group-hover:text-[#E63E26] font-bold">
              <ChevronLeft className="w-4 h-4" />
              <span>PREVIOUS EDIT</span>
            </div>
            <span className="block font-display font-black text-lg text-[#0D0D0D] group-hover:text-[#E63E26] transition-colors">
              {prevProject.title}
            </span>
          </Link>
        ) : (
          <div />
        )}

        {nextProject ? (
          <Link
            to={`/work/${nextProject.slug}`}
            className="p-6 bg-white hover:bg-neutral-50 border border-[#0D0D0D]/10 hover:border-[#E63E26] rounded-xl transition-all group space-y-1 text-left sm:text-right shadow-sm"
          >
            <div className="flex items-center sm:justify-end gap-1.5 text-xs font-mono text-[#0D0D0D]/60 group-hover:text-[#E63E26] font-bold">
              <span>NEXT EDIT</span>
              <ChevronRight className="w-4 h-4" />
            </div>
            <span className="block font-display font-black text-lg text-[#0D0D0D] group-hover:text-[#E63E26] transition-colors">
              {nextProject.title}
            </span>
          </Link>
        ) : (
          <div />
        )}
      </nav>
    </article>
  );
};
