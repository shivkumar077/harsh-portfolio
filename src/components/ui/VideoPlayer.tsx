import React from 'react';
import { ExternalLink, Play } from 'lucide-react';
import { parseVideoSource, getGoogleDriveThumbnail } from '../../utils/videoUtils';

interface VideoPlayerProps {
  videoUrl?: string;
  previewVideoUrl?: string;
  googleDriveUrl?: string;
  posterImage?: string;
  title?: string;
  sourceType?: string;
  autoPlay?: boolean;
  loop?: boolean;
  muted?: boolean;
  aspectRatio?: 'video' | 'vertical' | 'square' | 'wide';
  className?: string;
  showDriveCta?: boolean;
}

export const VideoPlayer: React.FC<VideoPlayerProps> = ({
  videoUrl,
  previewVideoUrl,
  googleDriveUrl,
  posterImage,
  title = 'Video Player',
  aspectRatio = 'video',
  className = '',
}) => {
  const parsed = parseVideoSource(videoUrl || googleDriveUrl);
  const targetDriveLink = googleDriveUrl || videoUrl || '#';
  const resolvedPoster = posterImage || parsed.thumbnailUrl || getGoogleDriveThumbnail(googleDriveUrl || videoUrl);

  const ratioClass = {
    video: 'aspect-video', // 16:9
    vertical: 'aspect-[9/16]', // 9:16 vertical
    square: 'aspect-square',
    wide: 'aspect-[21/9]',
  }[aspectRatio];

  // Direct MP4 / WebM / Blob, previewVideoUrl, or Google Drive Direct Stream
  const directVideoSrc = 
    previewVideoUrl || 
    (parsed.type === 'direct' ? parsed.sourceUrl : '') || 
    (videoUrl?.startsWith('blob:') || videoUrl?.startsWith('/') ? videoUrl : '') ||
    (parsed.type === 'google-drive' && parsed.directPlayUrl ? parsed.directPlayUrl : '');

  if (directVideoSrc && !parsed.type.includes('youtube') && !parsed.type.includes('vimeo')) {
    return (
      <div className={`relative overflow-hidden rounded-xl bg-black border-2 border-[#0D0D0D] ${ratioClass} ${className} shadow-2xl`}>
        <video
          src={directVideoSrc}
          controls
          playsInline
          poster={resolvedPoster}
          className="w-full h-full object-cover"
        />
      </div>
    );
  }

  const isYouTubeOrVimeo = parsed.type === 'youtube' || parsed.type === 'vimeo';

  if (isYouTubeOrVimeo) {
    return (
      <div className={`relative overflow-hidden rounded-xl bg-black border border-white/10 ${ratioClass} ${className} shadow-2xl`}>
        <iframe
          src={parsed.embedUrl}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
          allowFullScreen
          className="w-full h-full border-0 absolute inset-0 bg-black"
        />
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden rounded-xl bg-black border-2 border-[#0D0D0D] ${ratioClass} ${className} shadow-2xl group`}>
      {/* Visual Poster Cover */}
      <a
        href={targetDriveLink}
        target="_blank"
        rel="noopener noreferrer"
        className="relative w-full h-full block cursor-pointer"
      >
        <img
          src={resolvedPoster}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 brightness-90 group-hover:brightness-100"
          loading="lazy"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).src = '/commercial-thumb.jpg';
          }}
        />

        {/* Gradient Scrim */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/60 pointer-events-none" />

        {/* Center Play Action */}
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center p-4">
          {/* White Circular Play Button */}
          <div className="w-16 h-16 rounded-full bg-white text-[#0D0D0D] flex items-center justify-center shadow-xl group-hover:scale-105 group-hover:bg-[#E63E26] group-hover:text-white transition-all duration-300">
            <Play className="w-7 h-7 fill-current ml-0.5" />
          </div>

          {/* Subdued Watch on Drive Pill */}
          <span className="mt-3.5 px-4 py-1.5 bg-[#0D0D0D]/90 backdrop-blur-md rounded-full font-mono text-xs font-bold uppercase tracking-wider text-white border border-white/15 shadow-md group-hover:border-[#E63E26] group-hover:text-[#E63E26] transition-colors">
            WATCH ON DRIVE
          </span>
        </div>

        {/* Bottom Quick Indicator */}
        <div className="absolute bottom-3 left-3 right-3 z-20 flex items-center justify-between text-[11px] font-mono text-neutral-400 pointer-events-none">
          <span className="px-2.5 py-1 bg-[#0D0D0D]/90 rounded backdrop-blur-sm border border-white/10 text-white font-bold">
            CLICK TO STREAM
          </span>
          <span className="text-white font-semibold inline-flex items-center gap-1">
            <span className="text-[#E63E26]">DRIVE</span>
            <ExternalLink className="w-3 h-3 text-[#E63E26]" />
          </span>
        </div>
      </a>
    </div>
  );
};
