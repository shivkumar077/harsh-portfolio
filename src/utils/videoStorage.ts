/**
 * IndexedDB storage for local video files uploaded directly from device
 * Allows uploaded MP4/WebM videos to persist across refreshes and play seamlessly
 */

const DB_NAME = 'EditfolioVideoDB';
const DB_VERSION = 1;
const STORE_NAME = 'project_videos';

interface StoredVideoRecord {
  id: string;
  blob: Blob;
  name: string;
  type: string;
  size: number;
  updatedAt: number;
}

function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined' || !window.indexedDB) {
      reject(new Error('IndexedDB not supported'));
      return;
    }

    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'id' });
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

export async function storeVideoFile(projectId: string, file: File | Blob, filename?: string): Promise<string> {
  try {
    const db = await openDB();
    const record: StoredVideoRecord = {
      id: projectId,
      blob: file,
      name: filename || (file instanceof File ? file.name : `video-${projectId}.mp4`),
      type: file.type || 'video/mp4',
      size: file.size,
      updatedAt: Date.now(),
    };

    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      const store = tx.objectStore(STORE_NAME);
      const req = store.put(record);
      req.onsuccess = () => {
        const blobUrl = URL.createObjectURL(file);
        resolve(blobUrl);
      };
      req.onerror = () => reject(req.error);
    });
  } catch (err) {
    console.warn('Failed to store video in IndexedDB, fallback to memory URL', err);
    return URL.createObjectURL(file);
  }
}

export async function getStoredVideoBlob(projectId: string): Promise<Blob | null> {
  try {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readonly');
      const store = tx.objectStore(STORE_NAME);
      const req = store.get(projectId);
      req.onsuccess = () => {
        const record = req.result as StoredVideoRecord | undefined;
        resolve(record ? record.blob : null);
      };
      req.onerror = () => reject(req.error);
    });
  } catch {
    return null;
  }
}

export async function getStoredVideoBlobUrl(projectId: string): Promise<string | null> {
  const blob = await getStoredVideoBlob(projectId);
  if (!blob) return null;
  return URL.createObjectURL(blob);
}

export async function deleteStoredVideo(projectId: string): Promise<void> {
  try {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      const store = tx.objectStore(STORE_NAME);
      const req = store.delete(projectId);
      req.onsuccess = () => resolve();
      req.onerror = () => reject(req.error);
    });
  } catch {
    // ignore
  }
}

export async function getAllStoredVideos(): Promise<StoredVideoRecord[]> {
  try {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readonly');
      const store = tx.objectStore(STORE_NAME);
      const req = store.getAll();
      req.onsuccess = () => resolve((req.result as StoredVideoRecord[]) || []);
      req.onerror = () => reject(req.error);
    });
  } catch {
    return [];
  }
}

/**
 * Capture high-quality first/second frame of video file to use as instant poster/thumbnail
 */
export function captureVideoFrame(fileOrBlob: File | Blob): Promise<string> {
  return new Promise((resolve) => {
    if (typeof window === 'undefined') {
      resolve('');
      return;
    }

    const blobUrl = URL.createObjectURL(fileOrBlob);
    const video = document.createElement('video');
    video.src = blobUrl;
    video.muted = true;
    video.playsInline = true;
    video.crossOrigin = 'anonymous';

    let timeoutId: ReturnType<typeof setTimeout>;

    const cleanup = () => {
      clearTimeout(timeoutId);
      URL.revokeObjectURL(blobUrl);
      video.remove();
    };

    // Timeout safety
    timeoutId = setTimeout(() => {
      cleanup();
      resolve('');
    }, 4000);

    video.onloadedmetadata = () => {
      // Seek to 0.5s or 1s to get a good dynamic frame
      video.currentTime = Math.min(1.0, video.duration > 0.5 ? video.duration / 3 : 0.1);
    };

    video.onseeked = () => {
      try {
        const canvas = document.createElement('canvas');
        canvas.width = video.videoWidth || 720;
        canvas.height = video.videoHeight || 1280;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
          const dataUrl = canvas.toDataURL('image/jpeg', 0.85);
          cleanup();
          resolve(dataUrl);
          return;
        }
      } catch (e) {
        console.warn('Frame capture failed', e);
      }
      cleanup();
      resolve('');
    };

    video.onerror = () => {
      cleanup();
      resolve('');
    };
  });
}
