export type VideoPlatform = 'youtube' | 'tiktok' | 'instagram' | 'gdrive' | 'unknown';

export interface VideoEmbed {
  platform: VideoPlatform;
  embedUrl: string;
  originalUrl: string;
}

export function detectVideoPlatform(url: string): VideoPlatform {
  if (!url) return 'unknown';
  const u = url.toLowerCase();
  if (u.includes('youtube.com') || u.includes('youtu.be')) return 'youtube';
  if (u.includes('tiktok.com')) return 'tiktok';
  if (u.includes('instagram.com')) return 'instagram';
  if (u.includes('drive.google.com')) return 'gdrive';
  return 'unknown';
}

export function getVideoEmbed(url: string): VideoEmbed {
  const platform = detectVideoPlatform(url);
  let embedUrl = url;

  try {
    if (platform === 'youtube') {
      let id = '';
      if (url.includes('youtu.be/')) {
        id = url.split('youtu.be/')[1].split(/[?&]/)[0];
      } else if (url.includes('watch?v=')) {
        id = new URL(url).searchParams.get('v') || '';
      } else if (url.includes('/embed/')) {
        id = url.split('/embed/')[1].split(/[?&]/)[0];
      } else if (url.includes('/shorts/')) {
        id = url.split('/shorts/')[1].split(/[?&]/)[0];
      }
      if (id) embedUrl = `https://www.youtube.com/embed/${id}`;
    } else if (platform === 'gdrive') {
      // Convert /file/d/ID/view to /file/d/ID/preview
      const m = url.match(/\/file\/d\/([^/]+)/);
      if (m) embedUrl = `https://drive.google.com/file/d/${m[1]}/preview`;
    } else if (platform === 'tiktok') {
      // Extract video id from /video/{id}
      const m = url.match(/\/video\/(\d+)/);
      if (m) embedUrl = `https://www.tiktok.com/embed/v2/${m[1]}`;
    } else if (platform === 'instagram') {
      // Post embed
      const m = url.match(/\/(p|reel)\/([^/?]+)/);
      if (m) embedUrl = `https://www.instagram.com/${m[1]}/${m[2]}/embed`;
    }
  } catch {}

  return { platform, embedUrl, originalUrl: url };
}

/**
 * Extract auto-thumbnail URL from a video URL.
 * Returns null for platforms that don't expose public thumbnails (TikTok/Instagram).
 */
export function getVideoThumbnail(url: string): string | null {
  if (!url) return null;
  const platform = detectVideoPlatform(url);

  try {
    if (platform === 'youtube') {
      let id = '';
      if (url.includes('youtu.be/')) {
        id = url.split('youtu.be/')[1].split(/[?&]/)[0];
      } else if (url.includes('watch?v=')) {
        id = new URL(url).searchParams.get('v') || '';
      } else if (url.includes('/embed/')) {
        id = url.split('/embed/')[1].split(/[?&]/)[0];
      } else if (url.includes('/shorts/')) {
        id = url.split('/shorts/')[1].split(/[?&]/)[0];
      }
      if (id) return `https://img.youtube.com/vi/${id}/hqdefault.jpg`;
    } else if (platform === 'gdrive') {
      const m = url.match(/\/file\/d\/([^/]+)/);
      if (m) return `https://drive.google.com/thumbnail?id=${m[1]}&sz=w1200`;
    }
  } catch {}

  return null;
}
