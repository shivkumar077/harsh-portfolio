/**
 * Robust video source parser and validator for Google Drive, YouTube, Vimeo, and Direct Video
 */

export interface ParsedVideo {
  type: 'google-drive' | 'youtube' | 'vimeo' | 'direct' | 'unknown';
  embedUrl: string;
  driveUrl?: string;
  sourceUrl: string;
  directPlayUrl?: string;
  thumbnailUrl?: string;
  isValid: boolean;
  message?: string;
}

export function extractGoogleDriveId(url: string): string | null {
  if (!url) return null;
  
  const matchFileD = url.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
  if (matchFileD && matchFileD[1]) return matchFileD[1];

  const matchFolderD = url.match(/\/folders\/([a-zA-Z0-9_-]+)/);
  if (matchFolderD && matchFolderD[1]) return matchFolderD[1];

  const matchIdParam = url.match(/[?&]id=([a-zA-Z0-9_-]+)/);
  if (matchIdParam && matchIdParam[1]) return matchIdParam[1];

  return null;
}

export function getGoogleDriveThumbnail(urlOrId?: string): string {
  if (!urlOrId || urlOrId === '#') return '';
  const fileId = extractGoogleDriveId(urlOrId) || (urlOrId.length > 15 && !urlOrId.includes('/') ? urlOrId : null);
  if (!fileId) return '';
  return `https://lh3.googleusercontent.com/d/${fileId}=w1080`;
}

export function getGoogleDriveDirectStreamUrl(urlOrId?: string): string {
  if (!urlOrId || urlOrId === '#') return '';
  const fileId = extractGoogleDriveId(urlOrId) || (urlOrId.length > 15 && !urlOrId.includes('/') ? urlOrId : null);
  if (!fileId) return '';
  return `https://drive.usercontent.google.com/download?id=${fileId}&export=download&confirm=t`;
}

export function extractYouTubeId(url: string): string | null {
  if (!url) return null;
  const regExp = /(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=|shorts\/))([a-zA-Z0-9_-]{11})/;
  const match = url.match(regExp);
  return match && match[1] ? match[1] : null;
}

export function extractVimeoId(url: string): string | null {
  if (!url) return null;
  const match = url.match(/(?:vimeo\.com\/)(?:channels\/(?:\w+\/)?|groups\/([^/]*)\/videos\/|album\/(?:\d+)\/video\/|video\/|)(\d+)(?:$|\/|\?)/);
  return match && match[2] ? match[2] : null;
}

export function parseVideoSource(url?: string): ParsedVideo {
  if (!url || !url.trim()) {
    return {
      type: 'unknown',
      embedUrl: '',
      sourceUrl: '',
      isValid: false,
      message: 'No video URL provided.',
    };
  }

  const cleanUrl = url.trim();

  // 1. YouTube
  const ytId = extractYouTubeId(cleanUrl);
  if (ytId) {
    return {
      type: 'youtube',
      embedUrl: `https://www.youtube-nocookie.com/embed/${ytId}?autoplay=0&rel=0`,
      sourceUrl: cleanUrl,
      thumbnailUrl: `https://img.youtube.com/vi/${ytId}/maxresdefault.jpg`,
      isValid: true,
      message: 'YouTube video detected.',
    };
  }

  // 2. Vimeo
  const vimeoId = extractVimeoId(cleanUrl);
  if (vimeoId) {
    return {
      type: 'vimeo',
      embedUrl: `https://player.vimeo.com/video/${vimeoId}?title=0&byline=0&portrait=0`,
      sourceUrl: cleanUrl,
      isValid: true,
      message: 'Vimeo video detected.',
    };
  }

  // 3. Google Drive
  const driveId = extractGoogleDriveId(cleanUrl);
  if (driveId) {
    const directStream = getGoogleDriveDirectStreamUrl(driveId);
    return {
      type: 'google-drive',
      embedUrl: `https://drive.google.com/file/d/${driveId}/preview`,
      driveUrl: cleanUrl,
      sourceUrl: cleanUrl,
      directPlayUrl: directStream,
      thumbnailUrl: getGoogleDriveThumbnail(driveId),
      isValid: true,
      message: "Google Drive video detected. Make sure sharing is set to 'Anyone with the link can view'.",
    };
  }

  // 4. Direct video file (mp4, webm, mov, blob URL, or relative public path)
  if (cleanUrl.match(/\.(mp4|webm|mov)($|\?)/i) || cleanUrl.startsWith('/') || cleanUrl.startsWith('blob:') || cleanUrl.startsWith('data:video')) {
    return {
      type: 'direct',
      embedUrl: cleanUrl,
      sourceUrl: cleanUrl,
      directPlayUrl: cleanUrl,
      isValid: true,
      message: 'Direct video file detected.',
    };
  }

  // Fallback / external link
  return {
    type: 'unknown',
    embedUrl: cleanUrl,
    sourceUrl: cleanUrl,
    isValid: true,
    message: 'External link detected.',
  };
}
