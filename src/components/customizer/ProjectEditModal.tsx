import React, { useState, useRef } from 'react';
import type { Project, ProjectCategory } from '../../types/portfolio';
import { parseVideoSource, getGoogleDriveThumbnail } from '../../utils/videoUtils';
import { storeVideoFile, captureVideoFrame } from '../../utils/videoStorage';
import { 
  X, 
  Upload, 
  CheckCircle2, 
  AlertCircle, 
  Film, 
  Video,
  Play,
  Volume2,
  VolumeX,
  Link2,
  FileVideo,
  Loader2
} from 'lucide-react';

interface ProjectEditModalProps {
  project: Project;
  onSave: (updated: Project) => void;
  onClose: () => void;
}

const CATEGORY_PRESETS: ProjectCategory[] = [
  'SHORT-FORM',
  'COMMERCIAL',
  'UGC',
  'YOUTUBE',
  'CINEMATIC',
  'MOTION',
  'SOCIAL MEDIA',
];

export const ProjectEditModal: React.FC<ProjectEditModalProps> = ({ project, onSave, onClose }) => {
  const [form, setForm] = useState<Project>({ ...project });
  const [customCategory, setCustomCategory] = useState<string>('');
  const [isCustomCategory, setIsCustomCategory] = useState<boolean>(
    !CATEGORY_PRESETS.includes(project.category as any)
  );
  const [previewMuted, setPreviewMuted] = useState<boolean>(true);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoFileInputRef = useRef<HTMLInputElement>(null);

  const [videoLoadError, setVideoLoadError] = useState(false);

  const rawVideo = form.videoUrl || form.googleDriveUrl || form.youtubeUrl || form.vimeoUrl || form.previewVideoUrl || '';
  const hasRawVideo = !!rawVideo.trim();
  const videoValidation = parseVideoSource(rawVideo);

  // Playback identification according to whatever link the customer pasted
  const isYouTube = hasRawVideo && videoValidation.type === 'youtube' && !!videoValidation.embedUrl;
  const isVimeo = hasRawVideo && videoValidation.type === 'vimeo' && !!videoValidation.embedUrl;
  const isGoogleDrive = hasRawVideo && videoValidation.type === 'google-drive';

  // Only consider activeDirectVideo if a video link was actually provided or a video file was uploaded
  const activeDirectVideo = 
    (form.previewVideoUrl ? form.previewVideoUrl : '') ||
    (form.videoUrl?.startsWith('blob:') || form.videoUrl?.startsWith('/') ? form.videoUrl : '') ||
    (form.videoUrl?.match(/\.(mp4|webm|mov)($|\?)/i) ? form.videoUrl : '') || 
    (hasRawVideo && videoValidation.type === 'direct' ? videoValidation.sourceUrl : '') || 
    (hasRawVideo && videoValidation.type === 'google-drive' && videoValidation.directPlayUrl ? videoValidation.directPlayUrl : '');

  const handleThumbnailUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = reader.result as string;
      setForm((prev) => ({
        ...prev,
        posterImage: dataUrl,
      }));

      if (import.meta.env.DEV) {
        const thumbName = `${(form.slug || form.id || 'project').toLowerCase().replace(/[^a-z0-9_.-]/g, '-')}-thumb.jpg`;
        fetch('/api/save-image', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ filename: thumbName, base64: dataUrl }),
        }).catch(() => {});
      }
    };
    reader.readAsDataURL(file);
  };

  const [videoInputMethod, setVideoInputMethod] = useState<'upload' | 'link'>(() => {
    if (project.videoSourceType === 'local' || project.videoUrl?.startsWith('blob:')) {
      return 'upload';
    }
    return (project.videoUrl || project.googleDriveUrl || project.youtubeUrl || project.vimeoUrl) ? 'link' : 'upload';
  });

  const [uploadedFileName, setUploadedFileName] = useState<string>(() => {
    if (project.videoSourceType === 'local' && project.videoUrl?.startsWith('blob:')) {
      return `${project.slug || 'project'}.mp4`;
    }
    return '';
  });

  const [isProcessingVideo, setIsProcessingVideo] = useState(false);

  const processVideoFile = async (file: File) => {
    if (!file) return;
    setIsProcessingVideo(true);
    setVideoLoadError(false);

    try {
      const blobUrl = await storeVideoFile(form.id, file, file.name);
      setUploadedFileName(file.name);

      const capturedThumb = await captureVideoFrame(file);

      // Auto-stream video to public/ directory in local development
      if (import.meta.env.DEV) {
        const cleanVideoName = `${(form.slug || form.id || 'project').toLowerCase().replace(/[^a-z0-9_.-]/g, '-')}.mp4`;
        fetch(`/api/save-video?name=${cleanVideoName}`, {
          method: 'POST',
          body: file,
        }).catch(() => {});

        if (capturedThumb) {
          const thumbName = `${(form.slug || form.id || 'project').toLowerCase().replace(/[^a-z0-9_.-]/g, '-')}-thumb.jpg`;
          fetch('/api/save-image', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ filename: thumbName, base64: capturedThumb }),
          }).catch(() => {});
        }
      }

      setForm((prev) => ({
        ...prev,
        videoUrl: blobUrl,
        previewVideoUrl: blobUrl,
        videoSourceType: 'local',
        title: prev.title || file.name.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' '),
        posterImage: prev.posterImage || capturedThumb,
      }));
    } catch (e) {
      console.warn('Fallback to standard object URL', e);
      const fallbackUrl = URL.createObjectURL(file);
      setForm((prev) => ({
        ...prev,
        videoUrl: fallbackUrl,
        previewVideoUrl: fallbackUrl,
        videoSourceType: 'local',
      }));
    } finally {
      setIsProcessingVideo(false);
    }
  };

  const handleVideoUrlChange = (url: string) => {
    setVideoLoadError(false);
    const parsed = parseVideoSource(url);

    const updated: Partial<Project> = {
      videoUrl: url,
    };

    if (parsed.type === 'youtube') {
      updated.videoSourceType = 'youtube';
      updated.youtubeUrl = url;
      updated.previewVideoUrl = '';
      if (!form.posterImage && parsed.thumbnailUrl) {
        updated.posterImage = parsed.thumbnailUrl;
      }
    } else if (parsed.type === 'vimeo') {
      updated.videoSourceType = 'vimeo';
      updated.vimeoUrl = url;
      updated.previewVideoUrl = '';
    } else if (parsed.type === 'google-drive') {
      updated.videoSourceType = 'google-drive';
      updated.googleDriveUrl = url;
      updated.previewVideoUrl = parsed.directPlayUrl || '';
      if (!form.posterImage && parsed.thumbnailUrl) {
        updated.posterImage = parsed.thumbnailUrl;
      }
    } else if (parsed.type === 'direct') {
      updated.videoSourceType = 'local';
      updated.previewVideoUrl = url;
    } else {
      updated.previewVideoUrl = '';
    }

    setForm((prev) => ({ ...prev, ...updated }));
  };

  const handleSave = () => {
    if (!form.title.trim()) {
      alert('Please enter a project title.');
      return;
    }
    const finalCategory = isCustomCategory ? (customCategory.trim().toUpperCase() || 'GENERAL') : form.category;

    onSave({
      ...form,
      category: finalCategory,
      slug: form.slug || form.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-[#ECEBE8] border-2 border-[#0D0D0D] rounded-3xl shadow-2xl overflow-hidden my-8">
        {/* Modal Header */}
        <div className="px-6 py-4 bg-[#0D0D0D] text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Film className="w-5 h-5 text-[#E63E26]" />
            <h3 className="font-display font-black text-base sm:text-lg uppercase tracking-tight">
              {project.id.startsWith('new-') ? 'Add New Project' : `Edit Project: ${project.title}`}
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 text-neutral-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
          {/* Title & Category */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono font-bold text-[#0D0D0D] uppercase mb-1.5">
                Project Title *
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  placeholder="e.g. Nike Commercial Spec"
                  className="w-full px-3.5 py-2.5 bg-white border border-[#0D0D0D]/20 rounded-xl text-xs sm:text-sm font-sans font-medium text-[#0D0D0D] focus:outline-none focus:border-[#E63E26] pr-8 select-text"
                />
                {form.title && (
                  <button
                    type="button"
                    onClick={() => setForm({ ...form, title: '' })}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-black p-0.5"
                    title="Clear text"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono font-bold text-[#0D0D0D] uppercase mb-1.5">
                Category *
              </label>
              {!isCustomCategory ? (
                <div className="flex gap-2">
                  <select
                    value={form.category}
                    onChange={(e) => {
                      setForm((prev) => ({
                        ...prev,
                        category: e.target.value,
                      }));
                    }}
                    className="w-full px-3.5 py-2.5 bg-white border border-[#0D0D0D]/20 rounded-xl text-xs sm:text-sm font-mono text-[#0D0D0D] focus:outline-none focus:border-[#E63E26]"
                  >
                    {CATEGORY_PRESETS.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                  <button
                    type="button"
                    onClick={() => setIsCustomCategory(true)}
                    className="px-2.5 text-xs font-mono font-bold text-[#E63E26] hover:underline whitespace-nowrap"
                  >
                    Custom
                  </button>
                </div>
              ) : (
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={customCategory}
                    onChange={(e) => setCustomCategory(e.target.value)}
                    placeholder="e.g. DOCUMENTARY"
                    className="w-full px-3.5 py-2.5 bg-white border border-[#0D0D0D]/20 rounded-xl text-xs font-mono uppercase text-[#0D0D0D] focus:outline-none focus:border-[#E63E26]"
                  />
                  <button
                    type="button"
                    onClick={() => setIsCustomCategory(false)}
                    className="px-2.5 text-xs font-mono text-neutral-600 hover:underline whitespace-nowrap"
                  >
                    Presets
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* VIDEO SOURCE SELECTION: DUAL OPTION (UPLOAD DIRECTLY OR PASTE LINK) */}
          <div className="p-4 bg-white border border-[#0D0D0D]/15 rounded-2xl space-y-4 shadow-sm">
            <div className="flex items-center justify-between">
              <label className="text-xs font-mono font-bold text-[#0D0D0D] uppercase flex items-center gap-2">
                <Video className="w-4 h-4 text-[#E63E26]" />
                <span>Project Video Source *</span>
              </label>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-neutral-100 text-neutral-700 uppercase font-bold border border-neutral-200">
                {form.videoSourceType === 'local' || form.videoUrl?.startsWith('blob:') ? 'DEVICE FILE' : videoValidation.type.toUpperCase()}
              </span>
            </div>

            {/* TWO CLEAR OPTIONS BUTTONS */}
            <div className="grid grid-cols-2 gap-2 p-1 bg-[#ECEBE8] rounded-xl border border-[#0D0D0D]/15">
              <button
                type="button"
                onClick={() => setVideoInputMethod('upload')}
                className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg text-xs font-mono font-bold uppercase transition-all ${
                  videoInputMethod === 'upload'
                    ? 'bg-[#0D0D0D] text-white shadow-md'
                    : 'text-[#0D0D0D]/70 hover:text-[#0D0D0D] hover:bg-black/5'
                }`}
              >
                <Upload className="w-4 h-4 text-[#E63E26]" />
                <span>1. Upload from Device</span>
              </button>

              <button
                type="button"
                onClick={() => setVideoInputMethod('link')}
                className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg text-xs font-mono font-bold uppercase transition-all ${
                  videoInputMethod === 'link'
                    ? 'bg-[#0D0D0D] text-white shadow-md'
                    : 'text-[#0D0D0D]/70 hover:text-[#0D0D0D] hover:bg-black/5'
                }`}
              >
                <Link2 className="w-4 h-4 text-[#E63E26]" />
                <span>2. Paste Video Link</span>
              </button>
            </div>

            {/* OPTION 1: UPLOAD FROM DEVICE */}
            {videoInputMethod === 'upload' && (
              <div className="space-y-3">
                <input
                  ref={videoFileInputRef}
                  type="file"
                  accept="video/mp4,video/webm,video/quicktime"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) processVideoFile(file);
                  }}
                  className="hidden"
                />

                {(form.videoSourceType === 'local' && (form.videoUrl?.startsWith('blob:') || form.previewVideoUrl?.startsWith('blob:'))) ? (
                  <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-9 h-9 rounded-lg bg-emerald-600 text-white flex items-center justify-center shrink-0">
                        <FileVideo className="w-5 h-5" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs font-mono font-bold text-emerald-950 truncate">
                          {uploadedFileName || 'Device Video Loaded'}
                        </p>
                        <p className="text-[10px] text-emerald-700 font-sans mt-0.5">
                          ✓ Auto-frame captured as thumbnail • Autoplaying in live preview
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        type="button"
                        onClick={() => videoFileInputRef.current?.click()}
                        className="px-2.5 py-1.5 bg-white border border-emerald-300 hover:bg-emerald-100 text-emerald-900 text-xs font-mono font-bold rounded-lg transition-colors"
                      >
                        Change
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setUploadedFileName('');
                          setForm((prev) => ({
                            ...prev,
                            videoUrl: '',
                            previewVideoUrl: '',
                            videoSourceType: 'local',
                          }));
                        }}
                        className="p-1.5 text-neutral-400 hover:text-red-600 transition-colors"
                        title="Remove uploaded video"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ) : (
                  <div
                    onClick={() => videoFileInputRef.current?.click()}
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={(e) => {
                      e.preventDefault();
                      const file = e.dataTransfer.files?.[0];
                      if (file && file.type.startsWith('video/')) {
                        processVideoFile(file);
                      }
                    }}
                    className="group border-2 border-dashed border-[#0D0D0D]/25 hover:border-[#E63E26] rounded-2xl p-6 text-center cursor-pointer bg-[#F4F4F5] hover:bg-white transition-all space-y-2"
                  >
                    <div className="w-12 h-12 rounded-full bg-white group-hover:bg-[#E63E26] text-[#0D0D0D] group-hover:text-white flex items-center justify-center mx-auto shadow-sm transition-all duration-300">
                      <Upload className="w-6 h-6" />
                    </div>
                    <div>
                      <span className="font-mono text-xs font-bold text-[#0D0D0D] block group-hover:text-[#E63E26] transition-colors">
                        Click or Drag & Drop Video File (.mp4, .webm, .mov)
                      </span>
                      <span className="text-[11px] text-neutral-500 font-sans block mt-1">
                        Select any video from your computer. It will automatically load and autoplay below.
                      </span>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* OPTION 2: PASTE VIDEO LINK */}
            {videoInputMethod === 'link' && (
              <div className="space-y-3">
                <div className="relative">
                  <input
                    type="text"
                    value={form.videoUrl || form.googleDriveUrl || form.youtubeUrl || form.vimeoUrl || ''}
                    onChange={(e) => handleVideoUrlChange(e.target.value)}
                    placeholder="Paste link: Google Drive, YouTube, Vimeo, or https://.../video.mp4"
                    className="w-full px-3.5 py-2.5 bg-[#F4F4F5] border border-[#0D0D0D]/20 rounded-xl text-xs font-mono text-[#0D0D0D] focus:outline-none focus:border-[#E63E26] focus:bg-white pr-8 select-text"
                  />
                  {(form.videoUrl || form.googleDriveUrl || form.youtubeUrl || form.vimeoUrl) && (
                    <button
                      type="button"
                      onClick={() => handleVideoUrlChange('')}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-black p-0.5"
                      title="Clear video link"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                {hasRawVideo && videoValidation.isValid ? (
                  <div className="flex items-start gap-2 p-2.5 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-900 text-xs font-sans">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold">{videoValidation.message}</p>
                    </div>
                  </div>
                ) : hasRawVideo ? (
                  <div className="flex items-start gap-2 p-2.5 bg-amber-50 border border-amber-200 rounded-xl text-amber-900 text-xs font-sans">
                    <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                    <p>Paste any valid video URL above to preview and autoplay below.</p>
                  </div>
                ) : null}
              </div>
            )}

            {/* LIVE PREVIEW OF CUSTOMER'S VIDEO */}
            <div className="pt-2">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-mono font-bold uppercase text-neutral-500 flex items-center gap-1.5">
                  <Play className="w-3 h-3 text-[#E63E26] fill-current" />
                  <span>Live Video Autoplay Preview:</span>
                </span>
                {!isYouTube && !isVimeo && activeDirectVideo && (
                  <button
                    type="button"
                    onClick={() => setPreviewMuted(!previewMuted)}
                    className="text-[10px] font-mono font-bold text-neutral-600 hover:text-black inline-flex items-center gap-1"
                  >
                    {previewMuted ? <VolumeX className="w-3 h-3" /> : <Volume2 className="w-3 h-3 text-[#E63E26]" />}
                    <span>{previewMuted ? 'Muted' : 'Unmuted'}</span>
                  </button>
                )}
              </div>

              <div className="relative w-full h-48 sm:h-60 bg-black rounded-2xl overflow-hidden border border-[#0D0D0D]/20 flex items-center justify-center shadow-inner">
                {isProcessingVideo ? (
                  <div className="text-center p-6 text-white font-mono text-xs flex flex-col items-center justify-center space-y-2">
                    <Loader2 className="w-8 h-8 animate-spin text-[#E63E26]" />
                    <span className="font-bold text-white">PROCESSING VIDEO FILE...</span>
                    <span className="text-[11px] text-neutral-400">Extracting frame and preparing autoplay loop</span>
                  </div>
                ) : isYouTube ? (
                  <iframe
                    key={videoValidation.embedUrl}
                    src={`${videoValidation.embedUrl}&autoplay=1&mute=1&loop=1&playlist=${videoValidation.embedUrl.match(/\/embed\/([a-zA-Z0-9_-]{11})/)?.[1] || ''}&controls=0&playsinline=1`}
                    className="w-full h-full object-cover scale-[1.25] pointer-events-none"
                    allow="autoplay; encrypted-media"
                    title="Live YouTube Preview"
                  />
                ) : isVimeo ? (
                  <iframe
                    key={videoValidation.embedUrl}
                    src={`${videoValidation.embedUrl}?autoplay=1&muted=1&loop=1&background=1&controls=0`}
                    className="w-full h-full object-cover scale-[1.25] pointer-events-none"
                    allow="autoplay; encrypted-media"
                    title="Live Vimeo Preview"
                  />
                ) : activeDirectVideo && !videoLoadError ? (
                  <video
                    key={activeDirectVideo}
                    src={activeDirectVideo}
                    autoPlay
                    loop
                    muted={previewMuted}
                    playsInline
                    poster={form.posterImage || videoValidation.thumbnailUrl || (form.videoUrl ? getGoogleDriveThumbnail(form.videoUrl) : '')}
                    onError={() => setVideoLoadError(true)}
                    className="w-full h-full object-cover"
                    ref={(el) => {
                      if (el) {
                        el.muted = previewMuted;
                        el.defaultMuted = previewMuted;
                        if (el.paused) el.play().catch(() => {});
                      }
                    }}
                  >
                    <source src={activeDirectVideo} type="video/mp4" />
                  </video>
                ) : isGoogleDrive ? (
                  <div className="relative w-full h-full">
                    <img
                      src={form.posterImage || videoValidation.thumbnailUrl || (form.videoUrl ? getGoogleDriveThumbnail(form.videoUrl) : '')}
                      alt="Google Drive Preview"
                      className="w-full h-full object-cover brightness-90"
                    />
                    <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center p-4 text-center">
                      <div className="w-12 h-12 rounded-full bg-[#E63E26] text-white flex items-center justify-center shadow-lg mb-2">
                        <Play className="w-5 h-5 fill-current ml-0.5" />
                      </div>
                      <span className="text-xs font-mono font-bold text-white uppercase tracking-wider">
                        Google Drive Master Attached
                      </span>
                      <span className="text-[10px] text-neutral-300 font-sans mt-0.5 max-w-xs">
                        {videoLoadError ? 'Sharing must be set to "Anyone with the link" to stream in browser.' : 'Opens full 4K stream on click.'}
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="text-center p-6 text-neutral-400 font-mono text-xs flex flex-col items-center justify-center space-y-2">
                    <Film className="w-10 h-10 opacity-30 text-white" />
                    <span className="font-bold text-neutral-300">NO VIDEO ATTACHED</span>
                    <span className="text-[11px] text-neutral-500 max-w-xs">
                      Choose "Upload from Device" above or "Paste Video Link" to preview and autoplay immediately.
                    </span>
                  </div>
                )}

                <div className="absolute top-2 left-2 z-10 px-2 py-0.5 rounded bg-black/80 backdrop-blur-md border border-white/20 text-white font-mono text-[9px] font-bold">
                  {isProcessingVideo ? 'PROCESSING...' : isYouTube ? 'YOUTUBE AUTOPLAY' : isVimeo ? 'VIMEO AUTOPLAY' : (form.videoSourceType === 'local' && (form.videoUrl?.startsWith('blob:') || form.previewVideoUrl?.startsWith('blob:'))) ? 'DEVICE VIDEO AUTOPLAY' : (isGoogleDrive && !videoLoadError) ? 'GOOGLE DRIVE AUTOPLAY' : isGoogleDrive ? 'GOOGLE DRIVE 4K' : activeDirectVideo ? 'VIDEO AUTOPLAY' : 'NO VIDEO'}
                </div>
              </div>
            </div>
          </div>

          {/* Thumbnail / Poster Image */}
          <div className="p-4 bg-white border border-[#0D0D0D]/15 rounded-2xl space-y-3">
            <label className="block text-xs font-mono font-bold text-[#0D0D0D] uppercase">
              Project Thumbnail / Poster Image
            </label>

            <div className="flex items-center gap-4">
              <div className="relative w-24 aspect-[9/14] bg-black rounded-xl overflow-hidden border border-black shrink-0 shadow-md flex items-center justify-center">
                {form.posterImage || videoValidation.thumbnailUrl ? (
                  <img
                    src={form.posterImage || videoValidation.thumbnailUrl}
                    alt="Thumbnail preview"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <Film className="w-6 h-6 text-neutral-600" />
                )}
              </div>

              <div className="space-y-2 flex-1">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="inline-flex items-center gap-2 px-3.5 py-2 bg-[#0D0D0D] hover:bg-[#E63E26] text-white text-xs font-mono font-bold uppercase rounded-xl transition-colors shadow-sm"
                >
                  <Upload className="w-3.5 h-3.5" />
                  <span>Choose Thumbnail File</span>
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleThumbnailUpload}
                  className="hidden"
                />

                <div className="relative">
                  <input
                    type="text"
                    value={form.posterImage || ''}
                    onChange={(e) => setForm({ ...form, posterImage: e.target.value })}
                    placeholder="/thumb.jpg or remote image URL"
                    className="w-full px-3 py-1.5 bg-[#F4F4F5] border border-[#0D0D0D]/15 rounded-lg text-xs font-mono text-[#0D0D0D] focus:outline-none focus:border-[#E63E26] pr-7 select-text"
                  />
                  {form.posterImage && (
                    <button
                      type="button"
                      onClick={() => setForm({ ...form, posterImage: '' })}
                      className="absolute right-2 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-black p-0.5"
                      title="Clear image URL"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  )}
                </div>
                <span className="text-[11px] font-sans text-neutral-500 block">
                  Leave blank to auto-generate thumbnail from Google Drive or YouTube!
                </span>
              </div>
            </div>
          </div>

          {/* Descriptions & Details */}
          <div className="space-y-3">
            <div>
              <label className="block text-xs font-mono font-bold text-[#0D0D0D] uppercase mb-1">
                Short Description (Card Overlay)
              </label>
              <input
                type="text"
                value={form.shortDescription}
                onChange={(e) => setForm({ ...form, shortDescription: e.target.value })}
                placeholder="e.g. High-Retention Fast Paced Reel Cut"
                className="w-full px-3.5 py-2 bg-white border border-[#0D0D0D]/20 rounded-xl text-xs sm:text-sm font-sans text-[#0D0D0D] focus:outline-none focus:border-[#E63E26] select-text"
              />
            </div>

            <div>
              <label className="block text-xs font-mono font-bold text-[#0D0D0D] uppercase mb-1">
                Full Description (Project Case Study)
              </label>
              <textarea
                rows={3}
                value={form.fullDescription}
                onChange={(e) => setForm({ ...form, fullDescription: e.target.value })}
                placeholder="Detailed case study explanation..."
                className="w-full px-3.5 py-2 bg-white border border-[#0D0D0D]/20 rounded-xl text-xs sm:text-sm font-sans text-[#0D0D0D] focus:outline-none focus:border-[#E63E26] select-text"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-mono font-bold text-[#0D0D0D] uppercase mb-1">
                  Client / Brand (Optional)
                </label>
                <input
                  type="text"
                  value={form.client || ''}
                  onChange={(e) => setForm({ ...form, client: e.target.value })}
                  placeholder="e.g. Apex Media"
                  className="w-full px-3.5 py-2 bg-white border border-[#0D0D0D]/20 rounded-xl text-xs font-sans text-[#0D0D0D] focus:outline-none focus:border-[#E63E26] select-text"
                />
              </div>

              <div>
                <label className="block text-xs font-mono font-bold text-[#0D0D0D] uppercase mb-1">
                  Year
                </label>
                <input
                  type="text"
                  value={form.year}
                  onChange={(e) => setForm({ ...form, year: e.target.value })}
                  placeholder="2026"
                  className="w-full px-3.5 py-2 bg-white border border-[#0D0D0D]/20 rounded-xl text-xs font-sans text-[#0D0D0D] focus:outline-none focus:border-[#E63E26] select-text"
                />
              </div>
            </div>

            {/* Featured Project Checkbox */}
            <div className="pt-2 flex items-center gap-2">
              <input
                id="featured-checkbox"
                type="checkbox"
                checked={!!form.featured}
                onChange={(e) => setForm({ ...form, featured: e.target.checked })}
                className="w-4 h-4 rounded text-[#E63E26] focus:ring-[#E63E26]"
              />
              <label htmlFor="featured-checkbox" className="text-xs font-mono font-bold text-[#0D0D0D] cursor-pointer">
                Feature on Homepage Showreel & Marquee
              </label>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 bg-neutral-100 border-t border-[#0D0D0D]/10 flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-mono font-bold text-[#0D0D0D] hover:bg-neutral-200 rounded-xl transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="px-6 py-2 bg-[#E63E26] hover:bg-black text-white text-xs font-mono font-bold uppercase rounded-xl transition-colors shadow-md"
          >
            Save Project
          </button>
        </div>
      </div>
    </div>
  );
};
