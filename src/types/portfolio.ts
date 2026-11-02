export type VideoSourceType = 'local' | 'google-drive' | 'youtube' | 'vimeo' | 'external';

export type ProjectCategory = 
  | 'SHORT-FORM' 
  | 'COMMERCIAL' 
  | 'YOUTUBE' 
  | 'LONG-FORM' 
  | 'CINEMATIC' 
  | 'UGC' 
  | 'ADVERTISEMENT' 
  | 'MOTION' 
  | 'SOCIAL MEDIA'
  | (string & {});

export interface ProjectResult {
  metric: string;
  label: string;
}

export interface Project {
  id: string;
  slug: string;
  number: string;
  title: string;
  category: ProjectCategory;
  year: string;
  client?: string;
  shortDescription: string;
  fullDescription: string;
  challenge?: string;
  solution?: string;
  role: string[];
  tools: string[];
  videoSourceType: VideoSourceType;
  videoUrl?: string;
  previewVideoUrl?: string;
  googleDriveUrl?: string;
  youtubeUrl?: string;
  vimeoUrl?: string;
  posterImage: string;
  beforeAfter?: {
    rawImage: string;
    finalImage: string;
    rawVideo?: string;
    finalVideo?: string;
    description: string;
  };
  results?: ProjectResult[];
  testimonial?: {
    quote: string;
    author: string;
    role: string;
  };
  featured?: boolean;
}

export interface ServiceItem {
  number: string;
  title: string;
  subtitle: string;
  description: string;
  tags: string[];
}

export interface ProcessStep {
  number?: string;
  step?: string;
  title: string;
  description: string;
  details?: string[];
}

export interface ToolItem {
  name: string;
  category: string;
  icon?: string;
}

export interface MetricItem {
  value: string;
  label: string;
  detail?: string;
}

export interface TestimonialItem {
  id: string;
  quote?: string;
  content?: string;
  author?: string;
  clientName?: string;
  role?: string;
  clientRole?: string;
  company?: string;
  avatar?: string;
  projectSlug?: string;
  metric?: string;
}

export interface ContactInfo {
  email: string;
  whatsapp: string;
  whatsappNumber: string;
  instagram: string;
  instagramUrl: string;
  linkedin: string;
  linkedinUrl: string;
  youtube?: string;
  youtubeUrl?: string;
  location: string;
  availability: string;
}

export interface SiteConfig {
  brandName: string;
  profession: string;
  tagline: string;
  heroStatement: string;
  editorialStatement: string;
  editorialParagraph: string;
  brandStatement: string;
  brandSubtext: string;
  bio: string[];
  profileImage?: string;
  contact: ContactInfo;
  masterDriveFolder?: string;
  showreel: {
    title: string;
    subtitle: string;
    description: string;
    videoSourceType: VideoSourceType;
    videoUrl: string;
    previewVideoUrl?: string;
    googleDriveUrl?: string;
    posterImage: string;
    tags: string[];
  };
  services: ServiceItem[];
  process: ProcessStep[];
  tools: ToolItem[];
  metrics: MetricItem[];
  testimonials: TestimonialItem[];
  projects: Project[];
}
