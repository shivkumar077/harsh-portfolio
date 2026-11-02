import React, { useState, useRef, useEffect } from 'react';
import type { Project } from '../../types/portfolio';
import { parseVideoSource, getGoogleDriveThumbnail } from '../../utils/videoUtils';
import { ExternalLink, Play, Film } from 'lucide-react';

interface ProjectCardProps {
  project: Project;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const containerRef = useRef<HTMLElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const rawVideoLink = project.videoUrl || project.googleDriveUrl || project.youtubeUrl || project.vimeoUrl || '';
  const parsed = parseVideoSource(rawVideoLink);
  const driveLink = rawVideoLink || '#';

  const isYouTube = parsed.type === 'youtube' && !!parsed.embedUrl;
  const isVimeo = parsed.type === 'vimeo' && !!parsed.embedUrl;
  const isGoogleDrive = parsed.type === 'google-drive';

  // Specific video to stream:
  // 1. Explicit preview video (e.g. /commercial-video.mp4 or uploaded blob:...)
  // 2. Direct MP4/WebM file or relative path
  // 3. Google Drive direct stream fallback
  const activeDirectVideo = 
    (project.previewVideoUrl ? project.previewVideoUrl : '') ||
    (project.videoUrl?.startsWith('blob:') || project.videoUrl?.startsWith('/') ? project.videoUrl : '') ||
    (project.videoUrl?.match(/\.(mp4|webm|mov)($|\?)/i) ? project.videoUrl : '') ||
    (parsed.type === 'direct' ? parsed.sourceUrl : '') || 
    (isGoogleDrive && parsed.directPlayUrl ? parsed.directPlayUrl : '');

  const thumbnail = 
    (project.posterImage && !project.posterImage.includes('1574717024653') ? project.posterImage : '') || 
    parsed.thumbnailUrl || 
    (rawVideoLink ? getGoogleDriveThumbnail(rawVideoLink) : '') ||
    '';

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    // Use IntersectionObserver so only visible cards actively mount & decode video frames
    // This keeps active hardware video decoders to ~6-8, ensuring buttery 60fps scrolling
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      {
        threshold: 0.05,
        rootMargin: '100px 30px 100px 30px',
      }
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (isInView) {
      video.play().catch(() => {});
    } else {
      video.pause();
    }
  }, [isInView]);

  return (
    <article 
      ref={containerRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative w-full aspect-[9/16] rounded-2xl sm:rounded-3xl overflow-hidden cursor-pointer shadow-md hover:shadow-2xl transition-all duration-500 bg-black"
    >
      {/* Clickable Full-Bleed Link to Google Drive Master / Video Link */}
      <a
        href={driveLink}
        target="_blank"
        rel="noopener noreferrer"
        className="absolute inset-0 w-full h-full block"
      >
        {/* Play exact video: YouTube, Vimeo, Direct/Uploaded MP4, or Clean Drive Frame Poster */}
        {isYouTube && isInView ? (
          <div className="w-full h-full overflow-hidden relative pointer-events-none">
            <iframe
              src={`${parsed.embedUrl}&autoplay=1&mute=1&loop=1&playlist=${parsed.embedUrl.match(/\/embed\/([a-zA-Z0-9_-]{11})/)?.[1] || ''}&controls=0&playsinline=1&modestbranding=1`}
              className="w-full h-full object-cover scale-[1.35] transition-all duration-700"
              allow="autoplay; encrypted-media"
              title={project.title}
            />
          </div>
        ) : isVimeo && isInView ? (
          <div className="w-full h-full overflow-hidden relative pointer-events-none">
            <iframe
              src={`${parsed.embedUrl}?autoplay=1&muted=1&loop=1&background=1&controls=0`}
              className="w-full h-full object-cover scale-[1.35] transition-all duration-700"
              allow="autoplay; encrypted-media"
              title={project.title}
            />
          </div>
        ) : activeDirectVideo && !videoError && isInView ? (
          <video
            ref={(el) => {
              videoRef.current = el;
              if (el) {
                el.muted = true;
                el.defaultMuted = true;
                if (el.paused) {
                  el.play().catch(() => {});
                }
              }
            }}
            src={activeDirectVideo}
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            poster={thumbnail}
            onError={() => setVideoError(true)}
            className={`w-full h-full object-cover transition-all duration-700 ${
              isHovered ? 'scale-105 brightness-105' : 'brightness-95'
            }`}
          >
            <source src={activeDirectVideo} type="video/mp4" />
          </video>
        ) : thumbnail ? (
          <img
            src={thumbnail}
            alt={project.title}
            className={`w-full h-full object-cover transition-all duration-700 ${
              isHovered ? 'scale-105 brightness-105' : 'brightness-95'
            }`}
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full bg-[#18181B] flex flex-col items-center justify-center p-6 text-center space-y-2">
            <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white/70">
              <Film className="w-6 h-6" />
            </div>
            <span className="font-mono text-xs font-bold text-white uppercase tracking-wider">
              {project.title || 'Video Deliverable'}
            </span>
            <span className="font-mono text-[10px] text-neutral-400 uppercase">
              {project.category}
            </span>
          </div>
        )}

        {/* Cinematic Vignette Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-black/30 pointer-events-none transition-opacity duration-300 group-hover:via-black/10 group-hover:to-black/20" />

        {/* Top Badges */}
        <div className="absolute top-2.5 sm:top-3.5 left-2.5 sm:left-3.5 right-2.5 sm:right-3.5 flex items-center justify-between pointer-events-none z-10">
          <span className="font-mono text-[9px] sm:text-[10px] font-bold px-2 py-0.5 rounded-full bg-black/70 backdrop-blur-md border border-white/20 text-white uppercase tracking-wider">
            {project.category}
          </span>
          <span className="font-mono text-[9px] sm:text-[10px] text-white/80 font-bold px-1.5 py-0.5 rounded bg-black/40 backdrop-blur-sm border border-white/10">
            {project.year || '2026'}
          </span>
        </div>

        {/* Center Hover Play Icon */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 scale-90 group-hover:scale-100 pointer-events-none z-10">
          <div className="w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-[#E63E26] text-white flex items-center justify-center shadow-2xl backdrop-blur-sm">
            <Play className="w-4 h-4 sm:w-5 sm:h-5 fill-current ml-0.5" />
          </div>
        </div>

        {/* Bottom Details Overlay */}
        <div className="absolute bottom-0 inset-x-0 p-3 sm:p-4 text-white z-10 pointer-events-none flex flex-col justify-end space-y-1 sm:space-y-1.5">
          <div className="flex items-center gap-1.5 text-[9px] sm:text-[10px] font-mono text-[#E63E26] font-bold">
            <Film className="w-3 h-3 text-[#E63E26]" />
            <span className="tracking-wider uppercase truncate">
              {project.client || (isYouTube ? 'YOUTUBE' : isVimeo ? 'VIMEO' : isGoogleDrive ? 'GOOGLE DRIVE 4K' : 'DIRECT STREAM')}
            </span>
          </div>

          <h3 className="font-display font-black text-xs sm:text-sm uppercase tracking-tight line-clamp-1 leading-snug group-hover:text-[#E63E26] transition-colors">
            {project.title}
          </h3>

          <div className="pt-0.5 flex items-center justify-between text-[9px] sm:text-[10px] font-mono text-neutral-300">
            <span className="truncate max-w-[130px] sm:max-w-[150px] text-neutral-400">
              {project.shortDescription || 'Deliverable'}
            </span>
            <span className="inline-flex items-center gap-1 text-white font-bold group-hover:text-[#E63E26] shrink-0">
              <span>WATCH</span>
              <ExternalLink className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
            </span>
          </div>
        </div>
      </a>
    </article>
  );
};
