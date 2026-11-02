import React, { createContext, useContext, useState, useEffect } from 'react';
import { portfolioData as defaultData } from '../data/portfolioData';
import type { SiteConfig, Project, TestimonialItem } from '../types/portfolio';
import { getAllStoredVideos, deleteStoredVideo } from '../utils/videoStorage';

const STORAGE_KEY = 'editfolio_custom_config';
const UPLOADED_IMAGES_KEY = 'editfolio_uploaded_images';

export interface UploadedImage {
  id: string;
  name: string;
  dataUrl: string;
  suggestedPath: string;
}

interface PortfolioContextType {
  data: SiteConfig;
  hasUnsavedChanges: boolean;
  uploadedImages: UploadedImage[];
  updateData: (updater: (prev: SiteConfig) => SiteConfig) => void;
  updateField: <K extends keyof SiteConfig>(field: K, value: SiteConfig[K]) => void;
  updateProject: (index: number, project: Project) => void;
  addProject: (project: Project) => void;
  removeProject: (index: number) => void;
  reorderProjects: (fromIndex: number, toIndex: number) => void;
  addTestimonial: (item: TestimonialItem) => void;
  updateTestimonial: (index: number, item: TestimonialItem) => void;
  removeTestimonial: (index: number) => void;
  addUploadedImage: (image: UploadedImage) => void;
  saveChanges: () => Promise<void>;
  syncToDisk: (customData?: SiteConfig) => Promise<boolean>;
  diskSyncTime: string | null;
  resetToDefaults: () => void;
  generateConfigFileContent: () => string;
  exportJsonConfig: () => void;
  importJsonConfig: (jsonString: string) => { success: boolean; error?: string };
}

const PortfolioContext = createContext<PortfolioContextType | null>(null);

export const PortfolioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [data, setData] = useState<SiteConfig>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && typeof parsed === 'object' && parsed.brandName) {
          if (parsed.testimonials && parsed.testimonials.some((t: any) => t.author === 'David Chen' || t.clientName === 'David Chen' || t.author === 'Elena Rostova' || t.clientName === 'Elena Rostova')) {
            parsed.testimonials = defaultData.testimonials;
            try {
              localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...defaultData, ...parsed }));
            } catch {
              // ignore
            }
          }
          return { ...defaultData, ...parsed };
        }
      }
    } catch (e) {
      console.warn('Failed to load saved portfolio config from localStorage', e);
    }
    return defaultData;
  });

  const [hasUnsavedChanges, setHasUnsavedChanges] = useState<boolean>(false);
  const [uploadedImages, setUploadedImages] = useState<UploadedImage[]>(() => {
    try {
      const saved = localStorage.getItem(UPLOADED_IMAGES_KEY);
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return [];
  });

  const isSelfSyncing = React.useRef<boolean>(false);

  // Auto-reload whenever src/data/portfolioData.ts file on disk is updated by external editor
  useEffect(() => {
    if (isSelfSyncing.current) {
      isSelfSyncing.current = false;
      return;
    }
    setData(defaultData);
    setHasUnsavedChanges(false);
  }, [defaultData]);

  // Auto-sync across browser tabs
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY && e.newValue) {
        try {
          const fresh = JSON.parse(e.newValue);
          setData((prev) => ({ ...prev, ...fresh }));
        } catch {
          // ignore
        }
      }
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // Update data and immediately persist to localStorage so edits are never lost across tabs or refreshes
  const updateData = (updater: (prev: SiteConfig) => SiteConfig) => {
    setData((prev) => {
      const next = updater(prev);
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch (e) {
        console.warn('Failed to auto-save to localStorage', e);
      }
      setHasUnsavedChanges(true);
      return next;
    });
  };

  const updateField = <K extends keyof SiteConfig>(field: K, value: SiteConfig[K]) => {
    updateData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const updateProject = (index: number, updated: Project) => {
    updateData((prev) => {
      const projects = [...prev.projects];
      projects[index] = updated;
      return { ...prev, projects };
    });
  };

  const addProject = (project: Project) => {
    updateData((prev) => ({
      ...prev,
      projects: [project, ...prev.projects],
    }));
  };

  const removeProject = (index: number) => {
    updateData((prev) => {
      const proj = prev.projects[index];
      if (proj) {
        deleteStoredVideo(proj.id).catch(() => {});
      }
      const projects = prev.projects.filter((_, i) => i !== index);
      return { ...prev, projects };
    });
  };

  const reorderProjects = (fromIndex: number, toIndex: number) => {
    updateData((prev) => {
      if (fromIndex < 0 || toIndex < 0 || fromIndex >= prev.projects.length || toIndex >= prev.projects.length) {
        return prev;
      }
      const projects = [...prev.projects];
      const [moved] = projects.splice(fromIndex, 1);
      projects.splice(toIndex, 0, moved);
      return { ...prev, projects };
    });
  };

  const addTestimonial = (item: TestimonialItem) => {
    updateData((prev) => ({
      ...prev,
      testimonials: [...(prev.testimonials || []), item],
    }));
  };

  const updateTestimonial = (index: number, updated: TestimonialItem) => {
    updateData((prev) => {
      const list = [...(prev.testimonials || [])];
      list[index] = updated;
      return { ...prev, testimonials: list };
    });
  };

  const removeTestimonial = (index: number) => {
    updateData((prev) => ({
      ...prev,
      testimonials: (prev.testimonials || []).filter((_, i) => i !== index),
    }));
  };

  const addUploadedImage = (image: UploadedImage) => {
    setUploadedImages((prev) => {
      const filtered = prev.filter((img) => img.name !== image.name);
      const next = [image, ...filtered];
      try {
        localStorage.setItem(UPLOADED_IMAGES_KEY, JSON.stringify(next.slice(0, 20))); // keep max 20 images
      } catch (e) {
        console.warn('Storage limit for uploaded images', e);
      }
      return next;
    });
  };

  const [diskSyncTime, setDiskSyncTime] = useState<string | null>(null);

  const syncToDisk = async (customData?: SiteConfig): Promise<boolean> => {
    if (!import.meta.env.DEV) return false;
    try {
      isSelfSyncing.current = true;
      const target = customData || data;

      // If profileImage is a base64 dataUrl, persist it to public/profile.jpg first
      if (target.profileImage?.startsWith('data:')) {
        try {
          await fetch('/api/save-image', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ filename: 'profile.jpg', base64: target.profileImage }),
          });
        } catch (e) {
          console.warn('Failed to save profile image to disk', e);
        }
      }

      const sanitized = {
        ...target,
        profileImage: target.profileImage?.startsWith('data:') ? '/profile.jpg' : target.profileImage,
        projects: target.projects.map((p) => {
          const defaultFilename = `${(p.slug || p.id || 'project').toLowerCase().replace(/[^a-z0-9_.-]/g, '-')}.mp4`;
          const defaultThumb = `${(p.slug || p.id || 'project').toLowerCase().replace(/[^a-z0-9_.-]/g, '-')}-thumb.jpg`;
          return {
            ...p,
            posterImage: p.posterImage?.startsWith('data:') ? `/${defaultThumb}` : (p.posterImage || ''),
            previewVideoUrl: p.previewVideoUrl?.startsWith('blob:') ? `/${defaultFilename}` : (p.previewVideoUrl || ''),
            videoUrl: p.videoUrl?.startsWith('blob:') ? `/${defaultFilename}` : (p.videoUrl || ''),
          };
        }),
      };

      const res = await fetch('/api/save-config', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(sanitized),
      });
      if (res.ok) {
        setDiskSyncTime(new Date().toLocaleTimeString());
        return true;
      }
    } catch {
      // ignore if not running with custom dev middleware
    }
    return false;
  };

  const saveChanges = async () => {
    try {
      let currentData = data;
      // If photo was uploaded as data: URL, update in-memory path with timestamp after saving to avoid browser cache lock
      if (data.profileImage?.startsWith('data:')) {
        const timestamped = `/profile.jpg?t=${Date.now()}`;
        currentData = { ...data, profileImage: timestamped };
        setData(currentData);
      }
      localStorage.setItem(STORAGE_KEY, JSON.stringify(currentData));
      setHasUnsavedChanges(false);
      await syncToDisk(data);
    } catch (e) {
      console.error('Failed to save to localStorage', e);
      alert('Local storage is full or disabled. Please click "Export Configuration" to download your config file.');
    }
  };

  const resetToDefaults = () => {
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(UPLOADED_IMAGES_KEY);
    if (typeof window !== 'undefined' && window.indexedDB) {
      try {
        window.indexedDB.deleteDatabase('EditfolioVideoDB');
      } catch {
        // ignore
      }
    }
    setData(defaultData);
    setUploadedImages([]);
    setHasUnsavedChanges(false);
    if (import.meta.env.DEV) {
      syncToDisk(defaultData);
    }
  };

  const generateConfigFileContent = (): string => {
    // Sanitize any base64 data URLs so the exported file remains tiny, clean, and never bloated
    const sanitizedData = {
      ...data,
      profileImage: data.profileImage?.startsWith('data:') ? '/profile.jpg' : data.profileImage,
      projects: data.projects.map((p) => {
        const defaultFilename = `${(p.slug || p.id || 'project').toLowerCase().replace(/[^a-z0-9_.-]/g, '-')}.mp4`;
        const defaultThumb = `${(p.slug || p.id || 'project').toLowerCase().replace(/[^a-z0-9_.-]/g, '-')}-thumb.jpg`;
        return {
          ...p,
          posterImage: p.posterImage?.startsWith('data:') ? `/${defaultThumb}` : (p.posterImage || ''),
          previewVideoUrl: p.previewVideoUrl?.startsWith('blob:') ? `/${defaultFilename}` : (p.previewVideoUrl || ''),
          videoUrl: p.videoUrl?.startsWith('blob:') ? `/${defaultFilename}` : (p.videoUrl || ''),
        };
      }),
    };
    const jsonStr = JSON.stringify(sanitizedData, null, 2);
    return `import type { SiteConfig } from '../types/portfolio';

/**
 * Editfolio Master Configuration
 * Generated via Editfolio Local Customizer
 */
export const portfolioData: SiteConfig = ${jsonStr};
`;
  };

  const exportJsonConfig = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(data, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', 'editfolio-config.json');
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const importJsonConfig = (jsonString: string): { success: boolean; error?: string } => {
    try {
      const parsed = JSON.parse(jsonString);
      if (!parsed.brandName || !parsed.projects) {
        return { success: false, error: 'Invalid configuration format: Missing brandName or projects.' };
      }
      setData({ ...defaultData, ...parsed });
      setHasUnsavedChanges(true);
      return { success: true };
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'JSON parse error';
      return { success: false, error: msg };
    }
  };

  // Hydrate any uploaded device videos stored in IndexedDB so they play across page refreshes
  useEffect(() => {
    getAllStoredVideos()
      .then((stored) => {
        if (!stored || !stored.length) return;
        setData((prev) => {
          const updatedProjects = prev.projects.map((p) => {
            const match = stored.find((s) => s.id === p.id);
            if (match) {
              const blobUrl = URL.createObjectURL(match.blob);
              return {
                ...p,
                videoUrl: blobUrl,
                previewVideoUrl: blobUrl,
                videoSourceType: 'local' as const,
              };
            }
            return p;
          });
          return { ...prev, projects: updatedProjects };
        });
      })
      .catch((err) => console.warn('Could not hydrate stored videos', err));
  }, []);

  // Keep document title synced
  useEffect(() => {
    if (data.brandName && data.profession) {
      document.title = `${data.brandName} — ${data.profession}`;
    }
  }, [data.brandName, data.profession]);

  return (
    <PortfolioContext.Provider
      value={{
        data,
        hasUnsavedChanges,
        uploadedImages,
        updateData,
        updateField,
        updateProject,
        addProject,
        removeProject,
        reorderProjects,
        addTestimonial,
        updateTestimonial,
        removeTestimonial,
        addUploadedImage,
        saveChanges,
        syncToDisk,
        diskSyncTime,
        resetToDefaults,
        generateConfigFileContent,
        exportJsonConfig,
        importJsonConfig,
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
};

export const usePortfolio = () => {
  const ctx = useContext(PortfolioContext);
  if (!ctx) {
    // If used outside provider, return default static data
    return {
      data: defaultData,
      hasUnsavedChanges: false,
      uploadedImages: [],
      updateData: () => {},
      updateField: () => {},
      updateProject: () => {},
      addProject: () => {},
      removeProject: () => {},
      reorderProjects: () => {},
      addTestimonial: () => {},
      updateTestimonial: () => {},
      removeTestimonial: () => {},
      addUploadedImage: () => {},
      saveChanges: async () => {},
      syncToDisk: async () => false,
      diskSyncTime: null,
      resetToDefaults: () => {},
      generateConfigFileContent: () => '',
      exportJsonConfig: () => {},
      importJsonConfig: () => ({ success: false, error: 'Context not loaded' }),
    };
  }
  return ctx;
};
